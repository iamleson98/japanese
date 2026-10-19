/**
 * Validator for VOCAB_N5B — N5 vocabulary part B.
 * Checks the entries against targets-n5.txt lines 251-500 and db-n5.txt.
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-vocab-n5-b.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { VOCAB_N5B } from "./vocab-n5-b.ts";

const here = path.dirname(fileURLToPath(import.meta.url));

// Targets: exactly lines 251-500 of targets-n5.txt
const targetLines = fs
  .readFileSync(path.join(here, "targets-n5.txt"), "utf8")
  .replace(/^\uFEFF/, "")
  .split(/\r?\n/);
const targets = targetLines.slice(250, 500).map((l) => l.trim()).filter((l) => l.length > 0);

// Words already present in the N5 database list (must not overlap)
const dbWords = new Set(
  fs
    .readFileSync(path.join(here, "db-n5.txt"), "utf8")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
);

// Simplified-Chinese-only characters that must never appear
const FORBIDDEN_CHARS = "计证恶头说发变东车马鸟龙药钱风历让乡忆见书语汉习为监认类经线张样场职闻简复胜厅办门师运".split("");

const errors: string[] = [];
const warnings: string[] = [];

// --- (b) internal duplicates ---
const seen = new Map<string, number>();
VOCAB_N5B.forEach((e, i) => {
  if (seen.has(e.word)) {
    errors.push(`dup: "${e.word}" appears at order ${seen.get(e.word)} and ${e.order} (index ${i})`);
  } else {
    seen.set(e.word, e.order ?? -1);
  }
});

// --- (a) word set == target set EXACTLY ---
const wordSet = new Set(VOCAB_N5B.map((e) => e.word));
const targetSet = new Set(targets);
const missing = targets.filter((t) => !wordSet.has(t));
const extra = [...wordSet].filter((w) => !targetSet.has(w));
if (missing.length > 0) errors.push(`missing ${missing.length} target words: ${missing.join(" | ")}`);
if (extra.length > 0) errors.push(`extra ${extra.length} words not in targets: ${extra.join(" | ")}`);
if (targets.length !== 250) warnings.push(`targets-n5.txt lines 251-500 parsed ${targets.length} words (expected 250)`);
if (VOCAB_N5B.length !== 250) errors.push(`entry count is ${VOCAB_N5B.length}, expected 250`);

// --- db overlap ---
const dbOverlap = [...wordSet].filter((w) => dbWords.has(w));
if (dbOverlap.length > 0) errors.push(`words already in db-n5.txt: ${dbOverlap.join(" | ")}`);

// --- per-entry checks ---
VOCAB_N5B.forEach((e) => {
  const label = `${e.word} (order ${e.order})`;
  // (c) examples
  if (!e.exampleJp || e.exampleJp.trim().length === 0) errors.push(`${label}: missing exampleJp`);
  if (!e.exampleEn || e.exampleEn.trim().length === 0) errors.push(`${label}: missing exampleEn`);
  // basic sanity
  if (!e.reading || e.reading.trim().length === 0) errors.push(`${label}: missing reading`);
  if (!e.meaning || e.meaning.trim().length === 0) errors.push(`${label}: missing meaning`);
  if (!e.category || e.category.trim().length === 0) errors.push(`${label}: missing category`);
  if (!e.pos || e.pos.trim().length === 0) errors.push(`${label}: missing pos`);
  // (d) Latin runs of 3+ inside word
  if (/[A-Za-z]{3,}/.test(e.word)) errors.push(`${label}: Latin run of 3+ in word`);
  // (e) forbidden simplified chars in Japanese-bearing fields
  for (const field of [e.word, e.reading, e.exampleJp ?? "", e.meaning]) {
    for (const ch of FORBIDDEN_CHARS) {
      if (field.includes(ch)) {
        errors.push(`${label}: forbidden simplified char "${ch}" in "${field.slice(0, 30)}"`);
        break;
      }
    }
  }
  // (f) level
  if (e.level !== "N5") errors.push(`${label}: level is "${e.level}", expected "N5"`);
  // (g) verbs need verbGroup
  if (e.pos === "verb") {
    if (!e.verbGroup) errors.push(`${label}: verb without verbGroup`);
    else if (!["godan", "ichidan", "irregular"].includes(e.verbGroup)) {
      errors.push(`${label}: invalid verbGroup "${e.verbGroup}"`);
    }
  } else if (e.verbGroup) {
    errors.push(`${label}: non-verb (pos "${e.pos}") has verbGroup "${e.verbGroup}"`);
  }
  // (h) order sanity per-entry
  if (typeof e.order !== "number") errors.push(`${label}: missing numeric order`);
});

// --- (h) orders exactly 1..250, unique ---
const orders = VOCAB_N5B.map((e) => e.order).filter((o): o is number => typeof o === "number");
const orderCounts = new Map<number, number>();
orders.forEach((o) => orderCounts.set(o, (orderCounts.get(o) ?? 0) + 1));
const dupOrders = [...orderCounts.entries()].filter(([, c]) => c > 1).map(([o]) => o);
if (dupOrders.length > 0) errors.push(`duplicate orders: ${dupOrders.join(", ")}`);
const expectedOrders = new Set(Array.from({ length: 250 }, (_, i) => i + 1));
const absentOrders = [...expectedOrders].filter((o) => !orderCounts.has(o));
if (absentOrders.length > 0) errors.push(`absent orders (1..250): ${absentOrders.join(", ")}`);
const outOfRangeOrders = orders.filter((o) => o < 1 || o > 250);
if (outOfRangeOrders.length > 0) errors.push(`orders out of range 1..250: ${outOfRangeOrders.join(", ")}`);

// --- report ---
console.log(`entries: ${VOCAB_N5B.length}`);
console.log(`targets parsed (lines 251-500): ${targets.length}`);
console.log(`db-n5 words loaded: ${dbWords.size}`);
console.log(`verbs: ${VOCAB_N5B.filter((e) => e.pos === "verb").length}`);
console.log(`categories: ${[...new Set(VOCAB_N5B.map((e) => e.category))].join(", ")}`);
if (warnings.length > 0) {
  console.log("\nWARNINGS:");
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length > 0) {
  console.error(`\nFAILED with ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log("\nPASS: vocab-n5-b.ts is valid (250 entries, matches targets 251-500 exactly).");
