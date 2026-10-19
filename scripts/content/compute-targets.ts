// Compute regeneration targets: inventory minus committed (seeded) content.
// Run AFTER baseline seed. Writes target lists to scripts/content/targets-*.txt
import { Pool } from "pg";
import { readFileSync, writeFileSync } from "fs";
import { N5_WORDS } from "./inventory-n5";
import { N4_WORDS } from "./inventory-n4";
import { N3_WORDS } from "./inventory-n3";
import { KANJI_COVERED } from "./inventory-kanji";

const pool = new Pool({ connectionString: "postgres://postgres@localhost:5433/japanese" });

const [v, k] = await Promise.all([
  pool.query("SELECT word, level FROM vocabulary"),
  pool.query("SELECT character FROM kanji"),
]);
await pool.end();

const dbN5 = new Set(v.rows.filter((r: any) => r.level === "N5").map((r: any) => r.word));
const dbN4 = new Set(v.rows.filter((r: any) => r.level === "N4").map((r: any) => r.word));
const dbN3 = new Set(v.rows.filter((r: any) => r.level === "N3").map((r: any) => r.word));
const dbKanji = new Set(k.rows.map((r: any) => r.character));

const t5 = N5_WORDS.filter((w) => !dbN5.has(w));
const t4 = N4_WORDS.filter((w) => !dbN4.has(w));
const t3 = N3_WORDS.filter((w) => !dbN3.has(w));
const tk = [...KANJI_COVERED].filter((c) => !dbKanji.has(c));

const dir = "/home/z/my-project/japanese/scripts/content";
writeFileSync(`${dir}/targets-n5.txt`, t5.join("\n"), "utf-8");
writeFileSync(`${dir}/targets-n4.txt`, t4.join("\n"), "utf-8");
writeFileSync(`${dir}/targets-n3.txt`, t3.join("\n"), "utf-8");
writeFileSync(`${dir}/targets-kanji.txt`, tk.join("\n"), "utf-8");
writeFileSync(`${dir}/exclude-kanji.txt`, [...KANJI_COVERED].join("\n"), "utf-8");
writeFileSync(`${dir}/exclude-n3-words.txt`, N3_WORDS.join("\n"), "utf-8");
writeFileSync(`${dir}/exclude-n4-words.txt`, N4_WORDS.join("\n"), "utf-8");

console.log(`N5 targets: ${t5.length} (of ${N5_WORDS.length}, committed ${dbN5.size})`);
console.log(`N4 targets: ${t4.length} (of ${N4_WORDS.length}, committed ${dbN4.size})`);
console.log(`N3 targets: ${t3.length} (of ${N3_WORDS.length}, committed ${dbN3.size})`);
console.log(`Kanji targets: ${tk.length} (of ${KANJI_COVERED.length}, committed ${dbKanji.size})`);

// Also dump current DB words for validators to import
writeFileSync(`${dir}/db-n5.txt`, [...dbN5].join("\n"), "utf-8");
writeFileSync(`${dir}/db-n4.txt`, [...dbN4].join("\n"), "utf-8");
writeFileSync(`${dir}/db-n3.txt`, [...dbN3].join("\n"), "utf-8");
console.log("target files written");
