import type { BlogArticle } from "@shared/schema";
import { storage } from "./storage";
import { getAllNewsletterEmails } from "./newsletterLocalStore";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Server-side EmailJS (REST). Set the same IDs as VITE_EMAILJS_* on the client, or use EMAILJS_*.
 * Your EmailJS template should use template params (e.g. to_email, subject, message_html, reply_to).
 */
async function sendBlogDigestEmail(
  toEmail: string,
  subject: string,
  htmlContent: string,
): Promise<void> {
  const serviceId =
    process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId =
    process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY;
  const replyTo =
    process.env.BLOG_DIGEST_REPLY_TO ||
    process.env.OWNER_EMAIL ||
    "noreply@example.com";

  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      "[blog-digest] Missing EMAILJS_SERVICE_ID / EMAILJS_TEMPLATE_ID / EMAILJS_PUBLIC_KEY — skipping send.",
    );
    return;
  }

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        message_html: htmlContent,
        subject,
        to_email: toEmail,
        reply_to: replyTo,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`EmailJS ${res.status}: ${body}`);
  }
}

function buildDigestHtml(articles: BlogArticle[]): string {
  const items = articles
    .map(
      (a) => `
      <div style="margin-bottom:20px;padding:16px;border:1px solid #e5e5e5;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:18px;">${escapeHtml(a.title)}</h3>
        <p style="margin:0 0 12px 0;color:#555;font-size:14px;line-height:1.5;">${escapeHtml(
          a.description,
        )}</p>
        <a href="${escapeHtml(a.link)}" style="color:#2563eb;font-weight:600;">Read on Medium →</a>
      </div>`,
    )
    .join("");

  return `
  <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
    <h2 style="margin:0 0 16px 0;">New on the blog</h2>
    <p style="color:#555;margin:0 0 20px 0;">Here ${articles.length === 1 ? "is a post" : "are posts"} you may have missed:</p>
    ${items}
    <p style="font-size:12px;color:#888;margin-top:24px;">You received this because you subscribed via the website footer.</p>
  </div>`;
}

const MAX_NEW_POSTS_PER_DIGEST = 5;

/**
 * Compares the latest RSS fetch to the stored cursor; emails “Stay Updated” subscribers when Medium has newer posts.
 * First run only initializes the cursor (no blast of old articles).
 */
export async function notifyBlogSubscribersIfNeeded(
  articles: BlogArticle[],
): Promise<void> {
  try {
    if (!articles.length) return;

    const cursor = await storage.getBlogDigestCursor();

    if (cursor === null) {
      await storage.setBlogDigestCursor(articles[0].link);
      console.log(
        "[blog-digest] Cursor initialized from RSS; no historical emails sent.",
      );
      return;
    }

    if (articles[0].link === cursor) {
      return;
    }

    const newPosts: BlogArticle[] = [];
    for (const article of articles) {
      if (article.link === cursor) break;
      newPosts.push(article);
    }

    if (!newPosts.length) {
      await storage.setBlogDigestCursor(articles[0].link);
      return;
    }

    const batch = newPosts.slice(0, MAX_NEW_POSTS_PER_DIGEST);
    const subscribers = await getAllNewsletterEmails();

    if (!subscribers.length) {
      await storage.setBlogDigestCursor(articles[0].link);
      console.log("[blog-digest] No newsletter subscribers; cursor updated only.");
      return;
    }

    const subject =
      batch.length === 1
        ? `New blog post: ${batch[0].title}`
        : `${batch.length} new blog posts`;
    const html = buildDigestHtml(batch);

    for (const email of subscribers) {
      await sendBlogDigestEmail(email, subject, html);
      await new Promise((r) => setTimeout(r, 400));
    }

    await storage.setBlogDigestCursor(articles[0].link);

    console.log(
      `[blog-digest] Sent digest to ${subscribers.length} subscriber(s) (${batch.length} post(s)).`,
    );
  } catch (err) {
    console.error("[blog-digest] Error:", err);
  }
}
