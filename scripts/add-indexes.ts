import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  // Safety indexes (additive, no prompts). Guest-mode app queries by these keys.
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS stats_key_uidx ON stats (key)`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS daily_activity_date_uidx ON daily_activity (date)`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS lesson_progress_lesson_uidx ON lesson_progress (lesson_id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS flashcard_progress_item_uidx ON flashcard_progress (item_type, item_id)`);
  await pool.query(`CREATE INDEX IF NOT EXISTS vocabulary_level_order_idx ON vocabulary (level, "order")`);
  await pool.query(`CREATE INDEX IF NOT EXISTS kanji_level_order_idx ON kanji (level, "order")`);
  await pool.query(`CREATE INDEX IF NOT EXISTS flashcard_due_idx ON flashcard_progress (due_at)`);
  const check = await pool.query(`
    select column_name, data_type from information_schema.columns
    where table_name='flashcard_progress' and column_name in ('stability','difficulty','user_id')`);
  console.log("flashcard_progress new cols:", check.rows);
  const tables = await pool.query(`select tablename from pg_tables where schemaname='public' order by 1`);
  console.log("tables:", tables.rows.map((r: any) => r.tablename).join(", "));
  await pool.end();
})();
