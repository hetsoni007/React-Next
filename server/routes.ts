import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertAnalyticsEventSchema, insertProjectEstimateSchema, type BlogArticle } from "@shared/schema";
import Parser from "rss-parser";
import { sendContactNotification, sendEstimationEmail } from "./email";

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

  return httpServer;
}
