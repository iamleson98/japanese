import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  // Smart Study + sentence mining safety indexes (additive, no prompts).
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS mined_sentence_source_uidx ON mined_sentence (source_type, source_id)`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS study_session_date_uidx ON study_session (date)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS study_session_created_idx ON study_session (created_at)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS mined_sentence_created_idx ON mined_sentence (created_at)`);

  const cols = await pool.query(`
    select column_name from information_schema.columns
    where table_name in ('mined_sentence','study_session') order by table_name, column_name`);
  console.log("new table columns:", cols.rows.map((r: any) => r.column_name).join(", "));
  const tables = await pool.query(`select tablename from pg_tables where schemaname='public' order by 1`);
  console.log("tables:", tables.rows.map((r: any) => r.tablename).join(", "));
  await pool.end();
})();
