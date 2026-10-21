/**
 * Inspect Neon DB: row counts per table + column diff vs local schema.
 */
import { Pool } from "pg";

const raw = process.env.DATABASE_URL!;
let url = raw.replace(/([?&])channel_binding=[^&]*/g, "$1").replace(/\?&/, "?").replace(/\?$/, "");

const pool = new Pool({ connectionString: url, max: 2, connectionTimeoutMillis: 15000 });

(async () => {
  const tables = await pool.query(
    `select tablename from pg_tables where schemaname='public' order by tablename`
  );
  console.log("=== ROW COUNTS ===");
  for (const { tablename } of tables.rows as any[]) {
    try {
      const c = await pool.query(`select count(*)::int as n from "${tablename}"`);
      const cols = await pool.query(
        `select column_name from information_schema.columns where table_name='${tablename}' order by ordinal_position`
      );
      const colList = cols.rows.map((r: any) => r.column_name).join(", ");
      console.log(`${tablename.padEnd(24)} ${String(c.rows[0].n).padStart(7)}  cols: ${colList}`);
    } catch (e: any) {
      console.log(`${tablename}: ERR ${e.message}`);
    }
  }

  console.log("\n=== SAMPLE VOCAB (3) ===");
  try {
    const s = await pool.query(`select id, word, reading, romaji, meaning, level from vocabulary limit 3`);
    console.log(JSON.stringify(s.rows, null, 1));
  } catch (e: any) { console.log("vocab sample err:", e.message); }

  console.log("\n=== SAMPLE USERS (2) ===");
  try {
    const s = await pool.query(`select * from users limit 2`);
    console.log(JSON.stringify(s.rows, null, 1));
  } catch (e: any) { console.log("users err:", e.message); }

  await pool.end();
})();
