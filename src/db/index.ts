import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

// better-sqlite3 is synchronous + works in Node runtime (Next.js dev server).
// Much lighter than Prisma Client and avoids OOM issues.
const DB_PATH = process.env.DATABASE_URL?.replace("file:", "") || "./db/custom.db";

const globalForDb = globalThis as unknown as {
  _db: ReturnType<typeof drizzle> | undefined;
};

export const db =
  globalForDb._db ??
  drizzle(new Database(DB_PATH), { schema });

if (process.env.NODE_ENV !== "production") globalForDb._db = db;

export { schema };
