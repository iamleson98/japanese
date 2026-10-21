/**
 * Neon Postgres connection + capability probe.
 * Verifies: TLS handshake, current database, existing tables, latency.
 */
import { Pool } from "pg";

const raw = process.env.DATABASE_URL;
if (!raw) {
  console.error("DATABASE_URL not set — export it explicitly (platform env shadows .env)");
  process.exit(1);
}

// Try the URL exactly as provided first.
async function tryConnect(label: string, url: string) {
  const pool = new Pool({ connectionString: url, max: 2, connectionTimeoutMillis: 15000 });
  const t0 = Date.now();
  try {
    const v = await pool.query("select version() as v, current_database() as db");
    const tables = await pool.query(
      `select tablename from pg_tables where schemaname = 'public' order by tablename`
    );
    const latency = Date.now() - t0;
    console.log(`[OK] ${label} (${latency}ms)`);
    console.log(`     db=${v.rows[0].db}`);
    console.log(`     ${v.rows[0].v.split(",")[0]}`);
    console.log(`     existing tables: ${tables.rows.length === 0 ? "(none)" : tables.rows.map((r: any) => r.tablename).join(", ")}`);
    await pool.end();
    return true;
  } catch (e: any) {
    console.log(`[FAIL] ${label}: ${e.message}`);
    try { await pool.end(); } catch {}
    return false;
  }
}

(async () => {
  // Strip channel_binding for the pg driver (libpq param, not needed for node-postgres TLS).
  let url = raw.replace(/([?&])channel_binding=[^&]*/g, "$1").replace(/\?&/, "?").replace(/\?$/, "");
  // pg driver: sslmode=require via pg-connection-string => ssl:true (no verify). Works with Neon.
  const ok = await tryConnect("Neon (sslmode=require, no channel_binding)", url);
  if (!ok) {
    // Fallback: add uselibpqcompat to skip verify-full rewrite (not used by raw Pool anyway)
    const url2 = url.replace("sslmode=require", "sslmode=no-verify") || url;
    await tryConnect("Neon fallback sslmode=no-verify", url2);
  }
  process.exit(ok ? 0 : 2);
})();
