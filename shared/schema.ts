import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactSubmissions.$inferSelect;

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletterSubscriptions.$inferSelect;

/** Tracks newest Medium article link seen by the blog RSS poller (for “new post” digest emails). */
export const blogDigestCursor = pgTable("blog_digest_cursor", {
  id: varchar("id").primaryKey().default("singleton"),
  lastTopArticleLink: text("last_top_article_link"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type BlogDigestCursor = typeof blogDigestCursor.$inferSelect;

// Analytics events for tracking page views and engagement
export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(), // 'page_view', 'engagement', 'cta_click', 'form_submit'
  page: text("page").notNull(),
  duration: integer("duration"), // seconds spent on page
  metadata: text("metadata"), // JSON string for additional data
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

// Portfolio projects (static data)
export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  duration?: string;
  displayType?: "default" | "3d-mockups";
  timeline: {
    discovery: string;
    design: string;
    development: string;
    testing: string;
    delivery: string;
  };
  outcome: {
    problem: string;
    result: string;
  };
  images: string[];
  pdfAsset?: string;
  showcaseContent?: {
    image: string;
    title: string;
    description: string;
  }[];
  roadmap?: {
    week: string;
    phase: string;
    title: string;
    description: string;
  }[];
  targetAudience?: {
    role: string;
    description: string;
  }[];
  features?: {
    number: string;
    title: string;
    description: string;
  }[];
  appLinks?: {
    android?: string;
    ios?: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

// Blog article from Medium
export interface BlogArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  fullContent?: string;
  thumbnail?: string;
  categories: string[];
  author?: string;
}

// Career milestone
export interface CareerMilestone {
  year: string;
  title: string;
  company?: string;
  description: string;
}

// Service offering
export interface Service {
  id: string;
  title: string;
  icon: string;
  problem: string;
  solution: string;
}

// Project Estimation Tool
export const projectEstimates = pgTable("project_estimates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(), // 'web', 'mobile', 'web_mobile', 'simple_website'
  projectPurpose: text("project_purpose").notNull(),
  features: text("features").notNull(), // JSON array of selected features
  planningDepth: text("planning_depth"), // 'quick' or 'detailed' - now optional for new 7-step wizard
  preferredTimeline: text("preferred_timeline"), // client-preferred timeline (user intent only)
  // Manual customization fields
  manualRequirements: text("manual_requirements"), // free-text custom requirements
  preferredTechStack: text("preferred_tech_stack"), // JSON array of user-specified technologies
  additionalNotes: text("additional_notes"), // any extra context from user
  // PDF upload and AI analysis fields
  uploadedDocument: text("uploaded_document"), // filename if uploaded
  extractedScope: text("extracted_scope"), // AI-extracted scope from PDF
  aiSummary: text("ai_summary"), // AI-generated summary of requirements
  aiFollowUpQuestions: text("ai_follow_up_questions"), // JSON array of AI-generated questions
  aiQuestionAnswers: text("ai_question_answers"), // JSON object of user answers to AI questions
  complexityLevel: text("complexity_level").notNull(), // 'simple', 'moderate', 'complex'
  estimationData: text("estimation_data").notNull(), // JSON with full estimation
  region: text("region"), // detected region for pricing
  currency: text("currency").notNull(),
  pdfSent: text("pdf_sent"), // whether PDF was emailed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProjectEstimateSchema = createInsertSchema(projectEstimates).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  planningDepth: z.string().optional(), // Now optional - not collected in new 7-step wizard
});

export type InsertProjectEstimate = z.infer<typeof insertProjectEstimateSchema>;
export type ProjectEstimate = typeof projectEstimates.$inferSelect;

// Inquiry form submissions (Quick, Modal, Exit Intent, Blog Question, Lead Magnet)
export const inquirySubmissions = pgTable("inquiry_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  formType: text("form_type").notNull(), // 'quick', 'full_inquiry', 'exit_intent', 'blog_question', 'lead_magnet'
  fullName: text("full_name"),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  country: text("country"),
  service: text("service"),
  description: text("description"),
  projectType: text("project_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  hasDesigns: text("has_designs"),
  hasCodebase: text("has_codebase"),
  commChannels: text("comm_channels"),
  howHeard: text("how_heard"),
  additionalInfo: text("additional_info"),
  postSlug: text("post_slug"),
  resourceType: text("resource_type"),
  status: text("status").default("unread"), // 'unread', 'read', 'archived'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquirySubmissions).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  email: z.string().email("Valid email required"),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquirySubmissions.$inferSelect;

// Estimation wizard types
export type FeatureCategoryType = 
  | 'user_experience' 
  | 'core_functionality' 
  | 'data_management' 
  | 'communication' 
  | 'integrations' 
  | 'intelligence'
  | 'design_branding'
  | 'content_media'
  | 'commerce'
  | 'security_compliance';

export interface EstimationFeature {
  id: string;
  name: string;
  category: FeatureCategoryType;
  helperText: string;
  complexityWeight: number; // 1-3
}

export interface RoadmapMilestone {
  name: string;
  description: string;
  durationWeeks: { min: number; max: number };
  deliverables: string[];
  activities: string[];
}

export interface TechStackRecommendation {
  category: string;
  technologies: string[];
  reasoning: string;
}

export interface RoadmapResult {
  projectType: string;
  projectPurpose: string;
  features: string[];
  complexityLevel: string;
  planningDepth: string;
  preferredTimeline: string;
  milestones: RoadmapMilestone[];
  totalDuration: { min: number; max: number };
  techStackRecommendations: TechStackRecommendation[];
  manualRequirements?: string;
  preferredTechStack?: string[];
}
