import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertAnalyticsEventSchema, insertProjectEstimateSchema, type BlogArticle } from "@shared/schema";
import Parser from "rss-parser";
import { sendContactNotification, sendEstimationEmail } from "./email";
import multer from "multer";
import * as pdfParseModule from "pdf-parse";
import path from "path";
import fs from "fs";

const pdfParse = (pdfParseModule as any).default || pdfParseModule;

const upload = multer({
  dest: "/tmp/uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

const parser = new Parser({
  customFields: {
    item: [['content:encoded', 'contentEncoded']],
  },
});

const MEDIUM_RSS_URL = "https://medium.com/feed/@hetsoni9398";

let cachedBlogArticles: BlogArticle[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // POST /api/contact - Handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: result.error.flatten().fieldErrors 
        });
      }

      const contact = await storage.createContact(result.data);
      
      // Send email notification
      sendContactNotification({
        name: result.data.name,
        email: result.data.email,
        projectType: result.data.projectType,
        message: result.data.message
      }).catch(err => console.error('Email notification failed:', err));
      
      return res.status(201).json({ 
        message: "Thank you for reaching out! I'll get back to you soon.",
        contact 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  // GET /api/blog - Fetch and parse Medium RSS feed
  app.get("/api/blog", async (_req, res) => {
    try {
      const now = Date.now();
      
      // Return cached data if still valid
      if (cachedBlogArticles.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
        return res.json(cachedBlogArticles);
      }

      const feed = await parser.parseURL(MEDIUM_RSS_URL);
      
      const articles: BlogArticle[] = feed.items.map((item) => {
        // Extract thumbnail from content
        let thumbnail: string | undefined;
        const contentEncoded = (item as any).contentEncoded || item.content || "";
        const imgMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          thumbnail = imgMatch[1];
        }

        // Clean description - remove HTML and truncate
        let description = item.contentSnippet || item.content || "";
        description = description.replace(/<[^>]*>/g, "").substring(0, 200);
        if (description.length >= 200) {
          description = description.substring(0, description.lastIndexOf(" ")) + "...";
        }

        // Helper function to decode HTML entities
        const decodeHtmlEntities = (text: string): string => {
          return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&#x27;/g, "'")
            .replace(/&#x2019;/g, "'")
            .replace(/&#x2018;/g, "'")
            .replace(/&#x201C;/g, '"')
            .replace(/&#x201D;/g, '"')
            .replace(/&#x2014;/g, "—")
            .replace(/&#x2013;/g, "–")
            .replace(/&#x2026;/g, "...")
            .replace(/&ndash;/g, "–")
            .replace(/&mdash;/g, "—")
            .replace(/&hellip;/g, "...")
            .replace(/&lsquo;/g, "'")
            .replace(/&rsquo;/g, "'")
            .replace(/&ldquo;/g, '"')
            .replace(/&rdquo;/g, '"')
            .replace(/&nbsp;/g, " ")
            .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
            .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
        };

        // Get full content text (stripped of HTML for display)
        const fullContent = decodeHtmlEntities(
          contentEncoded
            .replace(/<figure[^>]*>[\s\S]*?<\/figure>/g, "")
            .replace(/<img[^>]*>/g, "")
            .replace(/<h3>/g, "\n\n## ")
            .replace(/<\/h3>/g, "\n")
            .replace(/<h4>/g, "\n\n### ")
            .replace(/<\/h4>/g, "\n")
            .replace(/<p>/g, "\n")
            .replace(/<\/p>/g, "\n")
            .replace(/<br\s*\/?>/g, "\n")
            .replace(/<li>/g, "\n- ")
            .replace(/<\/li>/g, "")
            .replace(/<[^>]*>/g, "")
            .replace(/\n{3,}/g, "\n\n")
            .trim()
        );

        return {
          title: item.title || "Untitled",
          link: item.link || "",
          pubDate: item.pubDate || new Date().toISOString(),
          description,
          fullContent,
          thumbnail,
          categories: item.categories || [],
          author: item.creator || "Het Soni",
        };
      });

      cachedBlogArticles = articles;
      lastFetchTime = now;

      return res.json(articles);
    } catch (error) {
      console.error("Blog fetch error:", error);
      // Return cached data even if stale, or empty array
      if (cachedBlogArticles.length > 0) {
        return res.json(cachedBlogArticles);
      }
      return res.status(500).json({ message: "Failed to fetch blog articles" });
    }
  });

  // POST /api/newsletter - Handle newsletter subscriptions
  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: result.error.flatten().fieldErrors 
        });
      }

      // Check if email already exists
      const existing = await storage.getNewsletterByEmail(result.data.email);
      if (existing) {
        return res.status(200).json({ 
          message: "You're already subscribed! Thank you for your continued interest." 
        });
      }

      const newsletter = await storage.createNewsletter(result.data);
      return res.status(201).json({ 
        message: "Welcome aboard! You'll receive updates on new projects and insights.",
        newsletter 
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  // POST /api/analytics - Track analytics events
  app.post("/api/analytics", async (req, res) => {
    try {
      const result = insertAnalyticsEventSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid event data" });
      }

      await storage.createAnalyticsEvent(result.data);
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error("Analytics error:", error);
      return res.status(500).json({ message: "Failed to track event" });
    }
  });

  // GET /api/analytics/summary - Get analytics summary for dashboard
  app.get("/api/analytics/summary", async (_req, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      return res.json(summary);
    } catch (error) {
      console.error("Analytics summary error:", error);
      return res.status(500).json({ message: "Failed to get analytics" });
    }
  });

  // POST /api/estimate - Handle project estimation submissions
  app.post("/api/estimate", async (req, res) => {
    try {
      // Validate payload size limits first
      const bodySize = JSON.stringify(req.body).length;
      if (bodySize > 50000) { // 50KB max payload
        return res.status(400).json({ message: "Request too large. Please simplify your submission." });
      }

      const result = insertProjectEstimateSchema.safeParse(req.body);
      
      if (!result.success) {
        console.error("Estimation validation failed:", result.error.flatten());
        return res.status(400).json({ 
          message: "Please fill in all required fields correctly.", 
          errors: result.error.flatten().fieldErrors 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(result.data.email)) {
        return res.status(400).json({ message: "Please provide a valid email address." });
      }

      // Validate name length
      if (result.data.name.length < 2 || result.data.name.length > 100) {
        return res.status(400).json({ message: "Please provide a valid name." });
      }

      // Validate features array size
      try {
        const features = JSON.parse(result.data.features);
        if (!Array.isArray(features) || features.length > 20) {
          return res.status(400).json({ message: "Invalid features selection." });
        }
      } catch {
        return res.status(400).json({ message: "Invalid features format." });
      }

      // Parse and validate estimation data structure
      let estimationData;
      try {
        estimationData = JSON.parse(result.data.estimationData);
        
        // Validate required estimation fields
        if (!estimationData.projectType || !estimationData.projectPurpose) {
          return res.status(400).json({ message: "Incomplete estimation data." });
        }
        if (!Array.isArray(estimationData.milestones) || estimationData.milestones.length === 0 || estimationData.milestones.length > 10) {
          return res.status(400).json({ message: "Invalid milestones data." });
        }
        if (!estimationData.totalCost || typeof estimationData.totalCost.min !== 'number') {
          return res.status(400).json({ message: "Invalid cost estimation data." });
        }
      } catch (parseError) {
        console.error("Failed to parse estimation data:", parseError);
        return res.status(400).json({ message: "Invalid estimation data format." });
      }

      // Persist the estimate to database
      const estimate = await storage.createProjectEstimate(result.data);

      // Send estimation email
      try {
        await sendEstimationEmail({
          name: result.data.name,
          email: result.data.email,
          estimation: estimationData,
        });
      } catch (emailError) {
        console.error('Estimation email failed:', emailError);
        return res.status(201).json({ 
          message: "Your estimation has been saved. You should receive an email shortly.",
          estimate,
          emailSent: false
        });
      }
      
      return res.status(201).json({ 
        message: "Your professional estimation has been sent to your email!",
        estimate,
        emailSent: true
      });
    } catch (error) {
      console.error("Estimation submission error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  // POST /api/estimate/upload-pdf - Handle PDF upload and analysis
  app.post("/api/estimate/upload-pdf", upload.single("document"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Please upload a PDF file." });
      }

      const filePath = req.file.path;
      const fileBuffer = fs.readFileSync(filePath);
      
      // Extract text from PDF
      let extractedText = "";
      try {
        const pdfData = await pdfParse(fileBuffer);
        extractedText = pdfData.text;
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        fs.unlinkSync(filePath); // Clean up
        return res.status(400).json({ message: "Unable to read PDF. Please ensure it contains readable text." });
      }

      // Clean up uploaded file
      fs.unlinkSync(filePath);

      if (extractedText.length < 50) {
        return res.status(400).json({ 
          message: "The PDF appears to have very little text content. Please upload a document with more details." 
        });
      }

      // Truncate if too long
      const truncatedText = extractedText.substring(0, 10000);

      // Generate AI analysis using OpenAI
      const aiAnalysis = await analyzeRequirementsWithAI(truncatedText);

      return res.status(200).json({
        success: true,
        filename: req.file.originalname,
        extractedText: truncatedText,
        analysis: aiAnalysis,
      });
    } catch (error) {
      console.error("PDF upload error:", error);
      return res.status(500).json({ message: "Failed to process PDF. Please try again." });
    }
  });

  // POST /api/estimate/analyze-text - Analyze manual requirements text
  app.post("/api/estimate/analyze-text", async (req, res) => {
    try {
      const { requirements } = req.body;
      
      if (!requirements || requirements.length < 20) {
        return res.status(400).json({ 
          message: "Please provide more details about your requirements (at least 20 characters)." 
        });
      }

      const truncatedText = requirements.substring(0, 5000);
      const aiAnalysis = await analyzeRequirementsWithAI(truncatedText);

      return res.status(200).json({
        success: true,
        analysis: aiAnalysis,
      });
    } catch (error) {
      console.error("Requirements analysis error:", error);
      return res.status(500).json({ message: "Failed to analyze requirements. Please try again." });
    }
  });

  return httpServer;
}

// AI analysis helper function
async function analyzeRequirementsWithAI(text: string): Promise<{
  summary: string;
  suggestedFeatures: string[];
  questions: { id: string; question: string; type: 'text' | 'choice'; options?: string[] }[];
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
  techStackSuggestions: string[];
}> {
  // Check for OpenAI API key
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // Return fallback analysis without AI
    return {
      summary: "We've received your requirements and will review them in detail.",
      suggestedFeatures: ["auth", "admin", "notifications"],
      questions: [
        { id: "q1", question: "What is your target launch date?", type: "text" },
        { id: "q2", question: "Who is your primary user audience?", type: "text" },
        { id: "q3", question: "Do you have existing branding or design assets?", type: "choice", options: ["Yes", "No", "Partially"] },
      ],
      estimatedComplexity: "moderate",
      techStackSuggestions: ["React / Next.js", "Node.js", "PostgreSQL"],
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a senior software consultant analyzing project requirements. Analyze the provided text and return a JSON object with:
            - summary: A 2-3 sentence summary of the project requirements
            - suggestedFeatures: Array of feature IDs from this list: auth, admin, payments, notifications, search, analytics, chat, api_integrations, ai, multilang
            - questions: Array of 3-5 follow-up questions to clarify requirements. Each question has: id (q1, q2, etc), question (string), type ("text" or "choice"), options (array of strings if type is "choice")
            - estimatedComplexity: "simple", "moderate", or "complex"
            - techStackSuggestions: Array of 3-5 recommended technologies
            
            Return only valid JSON, no markdown.`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in response");
    }

    const parsed = JSON.parse(content);
    return {
      summary: parsed.summary || "We've received your requirements.",
      suggestedFeatures: Array.isArray(parsed.suggestedFeatures) ? parsed.suggestedFeatures : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      estimatedComplexity: parsed.estimatedComplexity || "moderate",
      techStackSuggestions: Array.isArray(parsed.techStackSuggestions) ? parsed.techStackSuggestions : [],
    };
  } catch (error) {
    console.error("AI analysis error:", error);
    // Fallback response
    return {
      summary: "We've received your requirements and will review them in detail.",
      suggestedFeatures: ["auth", "admin"],
      questions: [
        { id: "q1", question: "What is your target launch date?", type: "text" },
        { id: "q2", question: "Who is your primary user audience?", type: "text" },
      ],
      estimatedComplexity: "moderate",
      techStackSuggestions: ["React / Next.js", "Node.js", "PostgreSQL"],
    };
  }
}
