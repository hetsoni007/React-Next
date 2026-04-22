import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "newsletter-subscribers.json");

type SubscriberRecord = {
  email: string;
  createdAt: string;
};

type StoreFile = {
  version: 1;
  subscribers: SubscriberRecord[];
};

const emptyStore = (): StoreFile => ({ version: 1, subscribers: [] });

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as StoreFile;
    if (!parsed || !Array.isArray(parsed.subscribers)) return emptyStore();
    return parsed;
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: StoreFile): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** @returns "created" | "exists" */
export async function addNewsletterSubscriber(
  email: string,
): Promise<"created" | "exists"> {
  const normalized = normalizeEmail(email);
  const store = await readStore();
  if (store.subscribers.some((s) => s.email === normalized)) {
    return "exists";
  }
  store.subscribers.push({
    email: normalized,
    createdAt: new Date().toISOString(),
  });
  await writeStore(store);
  return "created";
}

export async function getAllNewsletterEmails(): Promise<string[]> {
  const store = await readStore();
  return store.subscribers.map((s) => s.email);
}

export async function getNewsletterSubscriberCount(): Promise<number> {
  const store = await readStore();
  return store.subscribers.length;
}
