import {
  type User,
  type InsertUser,
  type Contact,
  type InsertContact,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  type ProjectEstimate,
  type InsertProjectEstimate,
  type Inquiry,
  type InsertInquiry,
  users,
  contactSubmissions,
  blogDigestCursor,
  analyticsEvents,
  projectEstimates,
  inquirySubmissions,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, sql, gte } from "drizzle-orm";
import { getNewsletterSubscriberCount } from "./newsletterLocalStore";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getBlogDigestCursor(): Promise<string | null>;
  setBlogDigestCursor(link: string): Promise<void>;
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsSummary(): Promise<AnalyticsSummary>;
  createProjectEstimate(
    estimate: InsertProjectEstimate
  ): Promise<ProjectEstimate>;
  getProjectEstimate(id: string): Promise<ProjectEstimate | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  updateInquiryStatus(id: string, status: string): Promise<void>;
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
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async getBlogDigestCursor(): Promise<string | null> {
    if (!db) return null;
    const [row] = await db
      .select()
      .from(blogDigestCursor)
      .where(eq(blogDigestCursor.id, "singleton"));
    return row?.lastTopArticleLink ?? null;
  }

  async setBlogDigestCursor(link: string): Promise<void> {
    if (!db) return;
    await db
      .insert(blogDigestCursor)
      .values({ id: "singleton", lastTopArticleLink: link })
      .onConflictDoUpdate({
        target: blogDigestCursor.id,
        set: { lastTopArticleLink: link, updatedAt: new Date() },
      });
  }

  async createAnalyticsEvent(
    insertEvent: InsertAnalyticsEvent
  ): Promise<AnalyticsEvent> {
    if (!db) {
      console.warn(
        "[storage] createAnalyticsEvent skipped: DATABASE_URL is not set",
      );
      return {
        id: randomUUID(),
        eventType: insertEvent.eventType,
        page: insertEvent.page,
        duration: insertEvent.duration ?? null,
        metadata: insertEvent.metadata ?? null,
        sessionId: insertEvent.sessionId ?? null,
        createdAt: new Date(),
      };
    }

    const [event] = await db
      .insert(analyticsEvents)
      .values(insertEvent)
      .returning();
    return event;
  }

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    const newsletterSubscriptions = await getNewsletterSubscriberCount();

    if (!db) {
      return {
        totalPageViews: 0,
        uniqueSessions: 0,
        avgEngagementTime: 0,
        topPages: [],
        contactSubmissions: 0,
        newsletterSubscriptions,
        recentEvents: [],
      };
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [pageViewsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, "page_view"));

    const [uniqueSessionsResult] = await db
      .select({
        count: sql<number>`count(distinct ${analyticsEvents.sessionId})`,
      })
      .from(analyticsEvents);

    const [avgEngagementResult] = await db
      .select({
        avg: sql<number>`coalesce(avg(${analyticsEvents.duration}), 0)`,
      })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, "engagement"));

    const topPagesResult = await db
      .select({
        page: analyticsEvents.page,
        views: sql<number>`count(*)`,
      })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, "page_view"))
      .groupBy(analyticsEvents.page)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    const [contactsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactSubmissions);

    const recentEvents = await db
      .select()
      .from(analyticsEvents)
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(20);

    return {
      totalPageViews: Number(pageViewsResult?.count || 0),
      uniqueSessions: Number(uniqueSessionsResult?.count || 0),
      avgEngagementTime: Math.round(Number(avgEngagementResult?.avg || 0)),
      topPages: topPagesResult.map((p) => ({
        page: p.page,
        views: Number(p.views),
      })),
      contactSubmissions: Number(contactsCount?.count || 0),
      newsletterSubscriptions,
      recentEvents,
    };
  }

  async createProjectEstimate(
    insertEstimate: InsertProjectEstimate
  ): Promise<ProjectEstimate> {
    const [estimate] = await db
      .insert(projectEstimates)
      .values(insertEstimate)
      .returning();
    return estimate;
  }

  async getProjectEstimate(id: string): Promise<ProjectEstimate | undefined> {
    const [estimate] = await db
      .select()
      .from(projectEstimates)
      .where(eq(projectEstimates.id, id));
    return estimate || undefined;
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [row] = await db
      .insert(inquirySubmissions)
      .values({ ...inquiry, status: "unread" })
      .returning();
    return row;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return db
      .select()
      .from(inquirySubmissions)
      .orderBy(desc(inquirySubmissions.createdAt));
  }

  async updateInquiryStatus(id: string, status: string): Promise<void> {
    await db
      .update(inquirySubmissions)
      .set({ status })
      .where(eq(inquirySubmissions.id, id));
  }
}

export const storage = new DatabaseStorage();
