import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

// const { Pool } = pg;

// // Get database URL from environment
// function getDatabaseUrl(): string {
//   if (process.env.DATABASE_URL) {
//     return process.env.DATABASE_URL;
//   }

//   // Try to construct from individual PG* variables
//   const host = process.env.PGHOST;
//   const port = process.env.PGPORT || "5432";
//   const user = process.env.PGUSER;
//   const password = process.env.PGPASSWORD;
//   const database = process.env.PGDATABASE;

//   if (host && user && password && database) {
//     return `postgresql://${user}:${password}@${host}:${port}/${database}`;
//   }

//   console.error(
//     "DATABASE_URL must be set or individual PG* variables must be configured."
//   );
//   throw new Error(
//     "DATABASE_URL must be set. Did you forget to provision a database?"
//   );
// }

// const databaseUrl = getDatabaseUrl();
// console.log("Initializing database connection...");

// export const pool = new Pool({
//   connectionString: databaseUrl,
//   connectionTimeoutMillis: 10000,
//   idleTimeoutMillis: 30000,
//   max: 10,
// });

// // Handle pool errors
// pool.on("error", (err) => {
//   console.error("Unexpected database pool error:", err);
// });

// export const db = drizzle(pool, { schema });

const { Pool } = pg;

let db: ReturnType<typeof drizzle> | null = null;
let pool: pg.Pool | null = null;

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL not set, DB will be disabled");
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  db = drizzle(pool, { schema });
}

export { db, pool };

// export async function testDatabaseConnection(): Promise<boolean> {
//   try {
//     const client = await pool.connect();
//     await client.query("SELECT 1");
//     client.release();
//     console.log("Database connection successful");
//     return true;
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     return false;
//   }
// }
