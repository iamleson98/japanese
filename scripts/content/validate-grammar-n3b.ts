/**
 * validate-grammar-n3b.ts — structural validator for GRAMMAR_N3_B.
 *
 * Checks:
 *  (a) exactly 28 entries; orders 98–125, each unique (sequential coverage)
 *  (b) all text fields non-empty (title, chapter, structure, meaning, rule,
 *      conjugation, usage, commonMistake; every example jp/en; every
 *      exercise question/answer)
 *  (c) exactly 3 examples per entry, covering easy / medium / hard
 *  (d) 2–3 exercises per entry, at least one fill-blank AND one
 *      multiple-choice; MCQs have exactly 4 non-empty options with the
 *      answer among them; fill-blank questions contain ______
 *  (e) no forbidden simplified-Chinese characters anywhere in the data
 *  (f) level is always "N3" and lesson is within 19–25
 *
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-grammar-n3b.ts
 */

import { GRAMMAR_N3_B } from "./grammar-n3-b";

const FORBIDDEN_CHARS = "计证恶头说发变东车马鸟龙药钱风历让乡忆见书语汉习为监认类经线张样场职闻简复胜厅办门师运".split(
  ""
);

const errors: string[] = [];
const expectedCount = 28;
const startOrder = 98;
const endOrder = 125;

// ---------- (a) count & orders ----------
if (GRAMMAR_N3_B.length !== expectedCount) {
  errors.push(`Expected ${expectedCount} entries, got ${GRAMMAR_N3_B.length}.`);
}
const orderCounts = new Map<number, number>();
for (const g of GRAMMAR_N3_B) {
  orderCounts.set(g.order, (orderCounts.get(g.order) ?? 0) + 1);
}
for (let o = startOrder; o <= endOrder; o++) {
  const c = orderCounts.get(o) ?? 0;
  if (c !== 1) {
    errors.push(`Order ${o} appears ${c} time(s); expected exactly 1.`);
  }
}
for (const o of orderCounts.keys()) {
  if (o < startOrder || o > endOrder) {
    errors.push(`Order ${o} is outside the allowed range ${startOrder}–${endOrder}.`);
  }
}

// ---------- per-entry checks ----------
GRAMMAR_N3_B.forEach((g, idx) => {
  const tag = `[order ${g.order ?? "?"} / index ${idx}] ${g.title ?? "(no title)"}`;

  // (b) non-empty fields
  const textFields: [string, unknown][] = [
    ["title", g.title],
    ["chapter", g.chapter],
    ["structure", g.structure],
    ["meaning", g.meaning],
    ["rule", g.rule],
    ["conjugation", g.conjugation],
    ["usage", g.usage],
    ["commonMistake", g.commonMistake],
  ];
  for (const [name, value] of textFields) {
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(`${tag}: field "${name}" is missing or empty.`);
    }
  }
  if (!Array.isArray(g.examples) || g.examples.length === 0) {
    errors.push(`${tag}: examples array is missing or empty.`);
  }
  if (!Array.isArray(g.exercises) || g.exercises.length === 0) {
    errors.push(`${tag}: exercises array is missing or empty.`);
  }

  // (c) examples: exactly 3, easy/medium/hard, non-empty jp/en
  if (Array.isArray(g.examples)) {
    if (g.examples.length !== 3) {
      errors.push(`${tag}: expected exactly 3 examples, got ${g.examples.length}.`);
    }
    const diffs = g.examples.map((e) => e.difficulty).sort().join(",");
    if (diffs !== "easy,hard,medium") {
      errors.push(`${tag}: examples must cover easy/medium/hard exactly once each (got [${diffs}]).`);
    }
    g.examples.forEach((e, i) => {
      if (!e.jp || !e.jp.trim()) errors.push(`${tag}: example ${i + 1} has an empty jp.`);
      if (!e.en || !e.en.trim()) errors.push(`${tag}: example ${i + 1} has an empty en.`);
      if (e.note !== undefined && !e.note.trim()) {
        errors.push(`${tag}: example ${i + 1} has an empty note (omit it instead).`);
      }
    });
  }

  // (d) exercises: 2–3, ≥1 fill-blank, ≥1 MCQ, MCQ options rules, ______ rule
  if (Array.isArray(g.exercises)) {
    if (g.exercises.length < 2 || g.exercises.length > 3) {
      errors.push(`${tag}: expected 2–3 exercises, got ${g.exercises.length}.`);
    }
    let hasFill = false;
    let hasMcq = false;
    g.exercises.forEach((ex, i) => {
      const label = `${tag}: exercise ${i + 1}`;
      if (!ex.question || !ex.question.trim()) {
        errors.push(`${label} has an empty question.`);
      }
      if (!ex.answer || !ex.answer.trim()) {
        errors.push(`${label} has an empty answer.`);
      }
      if (ex.type === "fill-blank") {
        hasFill = true;
        if (!ex.question.includes("______")) {
          errors.push(`${label} (fill-blank) lacks the ______ blank marker.`);
        }
      } else if (ex.type === "multiple-choice") {
        hasMcq = true;
        const opts = ex.options ?? [];
        if (opts.length !== 4) {
          errors.push(`${label} (multiple-choice) has ${opts.length} options; expected exactly 4.`);
        }
        if (opts.some((o) => !o || !o.trim())) {
          errors.push(`${label} (multiple-choice) has an empty option.`);
        }
        if (!opts.includes(ex.answer)) {
          errors.push(`${label} (multiple-choice) answer "${ex.answer}" is not among the options.`);
        }
      } else {
        errors.push(`${label} has unknown type "${ex.type}".`);
      }
    });
    if (!hasFill) errors.push(`${tag}: no fill-blank exercise present.`);
    if (!hasMcq) errors.push(`${tag}: no multiple-choice exercise present.`);
  }

  // (e) forbidden simplified characters
  const allText = JSON.stringify(g);
  for (const ch of FORBIDDEN_CHARS) {
    if (allText.includes(ch)) {
      errors.push(`${tag}: contains forbidden simplified character "${ch}".`);
    }
  }

  // (f) level & lesson
  if (g.level !== "N3") {
    errors.push(`${tag}: level is "${g.level}"; expected "N3".`);
  }
  if (typeof g.lesson !== "number" || g.lesson < 19 || g.lesson > 25) {
    errors.push(`${tag}: lesson ${g.lesson} is outside 19–25.`);
  }
});

// ---------- report ----------
if (errors.length > 0) {
  console.error(`✗ VALIDATION FAILED — ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `✓ VALIDATION PASSED — ${GRAMMAR_N3_B.length} entries (orders ${startOrder}–${endOrder}), ` +
    `${GRAMMAR_N3_B.reduce((n, g) => n + g.examples.length, 0)} examples, ` +
    `${GRAMMAR_N3_B.reduce((n, g) => n + g.exercises.length, 0)} exercises. ` +
    `All structural, exercise, forbidden-character, level, and lesson checks clean.`
);
