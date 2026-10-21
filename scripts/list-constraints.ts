import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  const r = await pool.query(`
    select c.conname as conname, t.relname as tbl, pg_get_constraintdef(c.oid) as def
    from pg_constraint c join pg_class t on c.conrelid = t.oid
    where t.relname in ('stats','kana','kanji','vocabulary','users','daily_activity','lesson_progress','comprehension_passage')
    and c.contype in ('u','p')
    order by t.relname`);
  for (const row of r.rows as any[]) console.log(`${row.tbl}.${row.conname}: ${row.def}`);
  await pool.end();
})();
