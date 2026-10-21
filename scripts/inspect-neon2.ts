/**
 * Deep inspect Neon: constraints, vi_meaning fill, grammar titles, comprehension content,
 * and overlap with local corpus.
 */
import { Pool } from "pg";

const raw = process.env.DATABASE_URL!;
let url = raw.replace(/([?&])channel_binding=[^&]*/g, "$1").replace(/\?&/, "?").replace(/\?$/, "");
const pool = new Pool({ connectionString: url, max: 2, connectionTimeoutMillis: 15000 });

(async () => {
  console.log("=== NOT NULL / user_id constraints ===");
  const nn = await pool.query(`
    select table_name, column_name, is_nullable, data_type
    from information_schema.columns
    where table_name in ('flashcard_progress','daily_activity','lesson_progress','stats','vocabulary','kanji','comprehension_passage')
    and column_name in ('user_id','vi_meaning','example_vi','han_viet','questions','audio_text','date','key')
    order by table_name, column_name`);
  for (const r of nn.rows as any[]) console.log(`${r.table_name}.${r.column_name} nullable=${r.is_nullable} type=${r.data_type}`);

  console.log("\n=== vi fill rates ===");
  const v = await pool.query(`select
      count(*)::int total,
      count(vi_meaning)::int vi,
      count(example_vi)::int ex_vi
    from vocabulary`);
  console.log("vocabulary:", v.rows[0]);
  const k = await pool.query(`select
      count(*)::int total, count(han_viet)::int han_viet, count(vi_meaning)::int vi
    from kanji`);
  console.log("kanji:", k.rows[0]);

  console.log("\n=== vocab levels ===");
  const lv = await pool.query(`select level, count(*)::int n from vocabulary group by level order by level`);
  console.log(lv.rows);
  const glv = await pool.query(`select level, count(*)::int n from grammar group by level order by level`);
  console.log("grammar:", glv.rows);
  const klv = await pool.query(`select level, count(*)::int n from kanji group by level order by level`);
  console.log("kanji levels:", klv.rows);

  console.log("\n=== stats rows ===");
  const st = await pool.query(`select * from stats`);
  console.log(st.rows);

  console.log("\n=== grammar titles (all 78) ===");
  const g = await pool.query(`select level, lesson, title from grammar order by "order"`);
  console.log(g.rows.map((r: any) => `${r.level}-L${r.lesson}-${r.title}`).join(" | "));

  console.log("\n=== comprehension passages (19) ===");
  const cp = await pool.query(`select type, level, lesson, title, difficulty, duration_sec, length(jp) jp_len, questions is not null as has_q, length(audio_text) audio_len from comprehension_passage order by "order"`);
  for (const r of cp.rows as any[]) console.log(JSON.stringify(r));

  console.log("\n=== one full passage ===");
  const one = await pool.query(`select * from comprehension_passage order by "order" limit 1`);
  const p: any = one.rows[0];
  console.log("title:", p.title, "| type:", p.type, "| level:", p.level);
  console.log("jp:", p.jp?.slice(0, 120));
  console.log("reading:", p.reading?.slice(0, 80));
  console.log("en:", p.en?.slice(0, 80));
  console.log("vi:", p.vi?.slice(0, 80));
  console.log("audio_text:", p.audio_text?.slice(0, 80));
  console.log("questions:", typeof p.questions === 'string' ? p.questions.slice(0, 300) : JSON.stringify(p.questions)?.slice(0, 300));

  console.log("\n=== resource sample ===");
  const rs = await pool.query(`select type, level, topic, title from resource order by "order" limit 10`);
  console.log(rs.rows);

  await pool.end();
})().catch(e => { console.error(e); process.exit(1); });
