/** Dump exact column types + nullability + defaults from Neon for schema alignment. */
import { Pool } from "pg";

const raw = process.env.DATABASE_URL!;
const url = raw.replace(/([?&])channel_binding=[^&]*/g, "$1").replace(/\?&/, "?").replace(/\?$/, "");
const pool = new Pool({ connectionString: url, max: 2 });

(async () => {
  const cols = await pool.query(`
    select table_name, column_name, data_type, coalesce(character_maximum_length::text,'-') len, is_nullable, column_default
    from information_schema.columns
    where table_schema='public'
    order by table_name, ordinal_position`);
  let cur = "";
  for (const r of cols.rows as any[]) {
    if (r.table_name !== cur) { cur = r.table_name; console.log(`\n[${cur}]`); }
    const dflt = r.column_default ? ` def=${r.column_default}` : "";
    const len = r.len !== "-" ? `(${r.len})` : "";
    console.log(`  ${r.column_name.padEnd(20)} ${r.data_type}${len} null=${r.is_nullable}${dflt}`);
  }
  await pool.end();
})();
