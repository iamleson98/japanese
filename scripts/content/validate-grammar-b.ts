/**
 * validate-grammar-b.ts — validator for GRAMMAR_N5_N4_B (grammar-n5-n4-b.ts).
 *
 * Checks:
 *  (a) 28 entries; orders 70–97, unique and sequential
 *  (b) every text field non-empty (title, structure, meaning, rule,
 *      conjugation, usage, commonMistake)
 *  (c) exactly 3 examples per entry covering easy/medium/hard exactly once,
 *      with non-empty jp and en
 *  (d) 2–3 exercises per entry; at least one fill-blank AND one
 *      multiple-choice; MCQs have exactly 4 non-empty options and the answer
 *      is among them; fill-blank questions contain ______ (6 underscores)
 *  (e) no forbidden simplified-Chinese characters anywhere in the entries
 *  (f) levels are only N5/N4 and lessons are within 1–18
 *  (g) bonus: exact lesson/chapter/level mapping per order matches the spec
 *
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-grammar-b.ts
 */

import { GRAMMAR_N5_N4_B } from "./grammar-n5-n4-b";

type Entry = (typeof GRAMMAR_N5_N4_B)[number];

const FORBIDDEN_CHARS = "计证恶头说发变东车马鸟龙药钱风历让乡忆见书语汉习为监认类经线张样场职闻简复胜厅办门师运".split("");

/** Exact spec mapping: order → { level, lesson, chapter } */
const SPEC: Record<number, { level: string; lesson: number; chapter: string }> = {
  70: { level: "N5", lesson: 2, chapter: "Greetings & Identification" },
  71: { level: "N5", lesson: 11, chapter: "Sentence-ending Particles" },
  72: { level: "N5", lesson: 11, chapter: "Sentence-ending Particles" },
  73: { level: "N5", lesson: 8, chapter: "Te-form Basics" },
  74: { level: "N5", lesson: 8, chapter: "Te-form Basics" },
  75: { level: "N5", lesson: 9, chapter: "Wanting Objects & Opinions" },
  76: { level: "N5", lesson: 9, chapter: "Comparisons" },
  77: { level: "N5", lesson: 6, chapter: "Comparisons" },
  78: { level: "N5", lesson: 7, chapter: "Polite Verbs" },
  79: { level: "N5", lesson: 9, chapter: "Wanting Objects & Opinions" },
  80: { level: "N4", lesson: 13, chapter: "Resultant States" },
  81: { level: "N4", lesson: 17, chapter: "Time Clauses" },
  82: { level: "N4", lesson: 14, chapter: "Verb Forms & Auxiliaries" },
  83: { level: "N4", lesson: 14, chapter: "Verb Forms & Auxiliaries" },
  84: { level: "N4", lesson: 14, chapter: "Verb Forms & Auxiliaries" },
  85: { level: "N4", lesson: 17, chapter: "Time Clauses" },
  86: { level: "N4", lesson: 16, chapter: "In-progress & Sequencing" },
  87: { level: "N4", lesson: 16, chapter: "In-progress & Sequencing" },
  88: { level: "N4", lesson: 16, chapter: "In-progress & Sequencing" },
  89: { level: "N4", lesson: 16, chapter: "In-progress & Sequencing" },
  90: { level: "N4", lesson: 15, chapter: "Passive & Causative" },
  91: { level: "N4", lesson: 15, chapter: "Passive & Causative" },
  92: { level: "N4", lesson: 15, chapter: "Passive & Causative" },
  93: { level: "N4", lesson: 14, chapter: "Verb Forms & Auxiliaries" },
  94: { level: "N4", lesson: 17, chapter: "Contrast & Purpose" },
  95: { level: "N4", lesson: 17, chapter: "Contrast & Purpose" },
  96: { level: "N4", lesson: 13, chapter: "Seems-like Patterns" },
  97: { level: "N4", lesson: 13, chapter: "Seems-like Patterns" },
};

/** Flatten every string in an entry for char scanning. */
function entryTexts(e: Entry): string[] {
  const out: string[] = [
    e.title,
    e.structure,
    e.meaning,
    e.rule,
    e.conjugation,
    e.usage,
    e.commonMistake,
    e.chapter,
  ];
  for (const ex of e.examples) {
    out.push(ex.jp, ex.en);
    if (ex.note !== undefined) out.push(ex.note);
  }
  for (const q of e.exercises) {
    out.push(q.question, q.answer);
    if (q.hint !== undefined) out.push(q.hint);
    if (q.options) out.push(...q.options);
  }
  return out;
}

const errors: string[] = [];
const warn: string[] = [];

// (a) count + orders 70–97 unique sequential
if (GRAMMAR_N5_N4_B.length !== 28) {
  errors.push(`entry count is ${GRAMMAR_N5_N4_B.length}, expected 28`);
}
const orders = GRAMMAR_N5_N4_B.map((e) => e.order);
const expectedOrders = Array.from({ length: 28 }, (_, i) => 70 + i);
const seen = new Set<number>();
for (const o of orders) {
  if (seen.has(o)) errors.push(`duplicate order ${o}`);
  seen.add(o);
}
for (const o of expectedOrders) {
  if (!seen.has(o)) errors.push(`missing order ${o}`);
}
const sortedOrders = [...orders].sort((a, b) => a - b);
const sequential =
  sortedOrders.length === 28 && sortedOrders.every((o, i) => o === 70 + i);
if (!sequential) warn.push("orders are not strictly sequential 70→97 as written");

// per-entry checks
const levels = new Set(["N5", "N4"]);
for (const e of GRAMMAR_N5_N4_B) {
  const tag = `order ${e.order} (${e.title.slice(0, 28)}…)`;

  // (b) non-empty text fields
  for (const [field, value] of Object.entries({
    title: e.title,
    structure: e.structure,
    meaning: e.meaning,
    rule: e.rule,
    conjugation: e.conjugation,
    usage: e.usage,
    commonMistake: e.commonMistake,
    chapter: e.chapter,
  })) {
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${tag}: empty field "${field}"`);
    }
  }

  // (c) exactly 3 examples, easy/medium/hard each once, jp+en non-empty
  if (e.examples.length !== 3) {
    errors.push(`${tag}: has ${e.examples.length} examples, expected 3`);
  }
  const diffs = e.examples.map((ex) => ex.difficulty).sort().join(",");
  if (diffs !== "easy,hard,medium") {
    errors.push(`${tag}: example difficulties are [${e.examples.map((x) => x.difficulty).join(", ")}], expected easy/medium/hard`);
  }
  e.examples.forEach((ex, i) => {
    if (!ex.jp || ex.jp.trim().length === 0) errors.push(`${tag}: example ${i + 1} has empty jp`);
    if (!ex.en || ex.en.trim().length === 0) errors.push(`${tag}: example ${i + 1} has empty en`);
  });

  // (d) exercises: 2–3, ≥1 fill-blank, ≥1 MCQ, MCQ shape, fill-blank marker
  const nEx = e.exercises.length;
  if (nEx < 2 || nEx > 3) {
    errors.push(`${tag}: has ${nEx} exercises, expected 2–3`);
  }
  const fillBlanks = e.exercises.filter((q) => q.type === "fill-blank");
  const mcqs = e.exercises.filter((q) => q.type === "multiple-choice");
  if (fillBlanks.length === 0) errors.push(`${tag}: no fill-blank exercise`);
  if (mcqs.length === 0) errors.push(`${tag}: no multiple-choice exercise`);
  if (fillBlanks.length + mcqs.length !== nEx) {
    errors.push(`${tag}: exercise type must be fill-blank or multiple-choice`);
  }
  for (const q of e.exercises) {
    const qTag = `${tag} [${q.type}]`;
    if (!q.question || q.question.trim().length === 0) errors.push(`${qTag}: empty question`);
    if (!q.answer || q.answer.trim().length === 0) errors.push(`${qTag}: empty answer`);
    if (q.type === "fill-blank") {
      if (!q.question.includes("______")) {
        errors.push(`${qTag}: question lacks ______ (6 underscores)`);
      }
    } else {
      const opts = q.options ?? [];
      if (opts.length !== 4) {
        errors.push(`${qTag}: has ${opts.length} options, expected exactly 4`);
      }
      if (opts.some((o) => !o || o.trim().length === 0)) {
        errors.push(`${qTag}: has an empty option`);
      }
      if (opts.length === 4 && !opts.includes(q.answer)) {
        errors.push(`${qTag}: answer "${q.answer}" not among options [${opts.join(" / ")}]`);
      }
    }
  }

  // (e) forbidden simplified characters
  const texts = entryTexts(e).join("\n");
  for (const ch of FORBIDDEN_CHARS) {
    if (texts.includes(ch)) {
      errors.push(`${tag}: contains forbidden simplified character "${ch}"`);
    }
  }

  // (f) level + lesson range
  if (!levels.has(e.level)) errors.push(`${tag}: level "${e.level}" is not N5/N4`);
  if (!Number.isInteger(e.lesson) || e.lesson < 1 || e.lesson > 18) {
    errors.push(`${tag}: lesson ${e.lesson} outside 1–18`);
  }

  // (g) exact spec mapping
  const spec = SPEC[e.order];
  if (spec) {
    if (e.level !== spec.level) errors.push(`${tag}: level "${e.level}" ≠ spec "${spec.level}"`);
    if (e.lesson !== spec.lesson) errors.push(`${tag}: lesson ${e.lesson} ≠ spec ${spec.lesson}`);
    if (e.chapter !== spec.chapter) errors.push(`${tag}: chapter "${e.chapter}" ≠ spec "${spec.chapter}"`);
  }
}

// summary
const n5 = GRAMMAR_N5_N4_B.filter((e) => e.level === "N5").length;
const n4 = GRAMMAR_N5_N4_B.filter((e) => e.level === "N4").length;
const totalExercises = GRAMMAR_N5_N4_B.reduce((a, e) => a + e.exercises.length, 0);
const totalExamples = GRAMMAR_N5_N4_B.reduce((a, e) => a + e.examples.length, 0);

console.log(`entries: ${GRAMMAR_N5_N4_B.length} (N5: ${n5}, N4: ${n4})`);
console.log(`orders: ${sortedOrders[0] ?? "-"} → ${sortedOrders[sortedOrders.length - 1] ?? "-"}`);
console.log(`examples: ${totalExamples} (3 per entry)`);
console.log(`exercises: ${totalExercises}`);
for (const w of warn) console.log(`WARN: ${w}`);
if (errors.length > 0) {
  console.log(`\n${errors.length} ERROR(S):`);
  for (const err of errors) console.log(`  ✗ ${err}`);
  process.exit(1);
}
console.log("\nVALIDATION PASSED");
