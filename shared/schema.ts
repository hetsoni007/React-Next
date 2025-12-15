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
  thumbnail?: string;
  categories: string[];
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
