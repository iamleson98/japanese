import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required for the PostgreSQL database connection.");
}

const globalForDb = globalThis as unknown as {
  _pool: Pool | undefined;
};

const pool = globalForDb._pool ?? new Pool({ connectionString });

if (process.env.NODE_ENV !== "production") globalForDb._pool = pool;

export const db = drizzle(pool, { schema });

export { schema };
