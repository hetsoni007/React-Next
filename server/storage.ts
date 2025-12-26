import { 
  type User, type InsertUser, 
  type Contact, type InsertContact, 
  type Newsletter, type InsertNewsletter,
  type AnalyticsEvent, type InsertAnalyticsEvent,
  type ProjectEstimate, type InsertProjectEstimate,
  users, contactSubmissions, newsletterSubscriptions, analyticsEvents, projectEstimates
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, gte } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsSummary(): Promise<AnalyticsSummary>;
  createProjectEstimate(estimate: InsertProjectEstimate): Promise<ProjectEstimate>;
  getProjectEstimate(id: string): Promise<ProjectEstimate | undefined>;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueSessions: number;
  avgEngagementTime: number;
  topPages: { page: string; views: number }[];
  contactSubmissions: number;
  newsletterSubscriptions: number;
  recentEvents: AnalyticsEvent[];
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contactSubmissions).values(insertContact).returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db.insert(newsletterSubscriptions).values(insertNewsletter).returning();
    return newsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const [newsletter] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return newsletter || undefined;
  }

  async createAnalyticsEvent(insertEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [event] = await db.insert(analyticsEvents).values(insertEvent).returning();
    return event;
  }

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [pageViewsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, 'page_view'));

    const [uniqueSessionsResult] = await db
      .select({ count: sql<number>`count(distinct ${analyticsEvents.sessionId})` })
      .from(analyticsEvents);

    const [avgEngagementResult] = await db
      .select({ avg: sql<number>`coalesce(avg(${analyticsEvents.duration}), 0)` })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, 'engagement'));

    const topPagesResult = await db
      .select({ 
        page: analyticsEvents.page, 
        views: sql<number>`count(*)` 
      })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, 'page_view'))
      .groupBy(analyticsEvents.page)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    const [contactsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactSubmissions);

    const [newsletterCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(newsletterSubscriptions);

    const recentEvents = await db
      .select()
      .from(analyticsEvents)
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(20);

    return {
      totalPageViews: Number(pageViewsResult?.count || 0),
      uniqueSessions: Number(uniqueSessionsResult?.count || 0),
      avgEngagementTime: Math.round(Number(avgEngagementResult?.avg || 0)),
      topPages: topPagesResult.map(p => ({ page: p.page, views: Number(p.views) })),
      contactSubmissions: Number(contactsCount?.count || 0),
      newsletterSubscriptions: Number(newsletterCount?.count || 0),
      recentEvents,
    };
  }

  async createProjectEstimate(insertEstimate: InsertProjectEstimate): Promise<ProjectEstimate> {
    const [estimate] = await db.insert(projectEstimates).values(insertEstimate).returning();
    return estimate;
  }

  async getProjectEstimate(id: string): Promise<ProjectEstimate | undefined> {
    const [estimate] = await db.select().from(projectEstimates).where(eq(projectEstimates.id, id));
    return estimate || undefined;
  }
}

export const storage = new DatabaseStorage();
