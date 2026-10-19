/**
 * Validator for VOCAB_N4B — N4 vocabulary part B.
 * Checks the entries against targets-n4.txt lines 251..end (~247 words) and db-n4.txt.
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-vocab-n4-b.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { VOCAB_N4B } from "./vocab-n4-b.ts";

const here = path.dirname(fileURLToPath(import.meta.url));

// Targets: exactly lines 251..end of targets-n4.txt (file has no trailing newline)
const targetLines = fs
  .readFileSync(path.join(here, "targets-n4.txt"), "utf8")
  .replace(/^\uFEFF/, "")
  .split(/\r?\n/);
const targets = targetLines.slice(250).map((l) => l.trim()).filter((l) => l.length > 0);

// Words already present in the N4 database list (must not overlap)
const dbWords = new Set(
  fs
    .readFileSync(path.join(here, "db-n4.txt"), "utf8")
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
VOCAB_N4B.forEach((e, i) => {
  if (seen.has(e.word)) {
    errors.push(`dup: "${e.word}" appears at order ${seen.get(e.word)} and ${e.order} (index ${i})`);
  } else {
    seen.set(e.word, e.order ?? -1);
  }
});

// --- (a) word set == target set EXACTLY ---
const wordSet = new Set(VOCAB_N4B.map((e) => e.word));
const targetSet = new Set(targets);
const missing = targets.filter((t) => !wordSet.has(t));
const extra = [...wordSet].filter((w) => !targetSet.has(w));
if (missing.length > 0) errors.push(`missing ${missing.length} target words: ${missing.join(" | ")}`);
if (extra.length > 0) errors.push(`extra ${extra.length} words not in targets: ${extra.join(" | ")}`);
if (targets.length < 240 || targets.length > 260) {
  warnings.push(`targets-n4.txt lines 251-end parsed ${targets.length} words (expected ~247)`);
}
if (VOCAB_N4B.length !== targets.length) {
  errors.push(`entry count is ${VOCAB_N4B.length}, expected ${targets.length}`);
}

// --- db overlap ---
const dbOverlap = [...wordSet].filter((w) => dbWords.has(w));
if (dbOverlap.length > 0) errors.push(`words already in db-n4.txt: ${dbOverlap.join(" | ")}`);

// --- per-entry checks ---
VOCAB_N4B.forEach((e) => {
  const label = `${e.word} (order ${e.order})`;
  // (c) examples
  if (!e.exampleJp || e.exampleJp.trim().length === 0) errors.push(`${label}: missing exampleJp`);
  if (!e.exampleEn || e.exampleEn.trim().length === 0) errors.push(`${label}: missing exampleEn`);
  // basic sanity
  if (!e.reading || e.reading.trim().length === 0) errors.push(`${label}: missing reading`);
  if (!e.meaning || e.meaning.trim().length === 0) errors.push(`${label}: missing meaning`);
  if (!e.category || e.category.trim().length === 0) errors.push(`${label}: missing category`);
  if (!/^[a-z][a-z0-9-]*$/.test(e.category ?? "")) errors.push(`${label}: category "${e.category}" is not snake-case`);
  if (!e.pos || e.pos.trim().length === 0) errors.push(`${label}: missing pos`);
  // (d) Latin runs of 3+ inside word
  if (/[A-Za-z]{3,}/.test(e.word)) errors.push(`${label}: Latin run of 3+ in word`);
  // (e) forbidden simplified chars in Japanese-bearing fields (and English fields, harmlessly)
  for (const field of [e.word, e.reading, e.exampleJp ?? "", e.meaning, e.exampleEn ?? "", e.romaji ?? ""]) {
    for (const ch of FORBIDDEN_CHARS) {
      if (field.includes(ch)) {
        errors.push(`${label}: forbidden simplified char "${ch}" in "${field.slice(0, 30)}"`);
        break;
      }
    }
  }
  // (f) level
  if (e.level !== "N4") errors.push(`${label}: level is "${e.level}", expected "N4"`);
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

// --- (h) orders exactly 1..N, unique ---
const N = VOCAB_N4B.length;
const orders = VOCAB_N4B.map((e) => e.order).filter((o): o is number => typeof o === "number");
const orderCounts = new Map<number, number>();
orders.forEach((o) => orderCounts.set(o, (orderCounts.get(o) ?? 0) + 1));
const dupOrders = [...orderCounts.entries()].filter(([, c]) => c > 1).map(([o]) => o);
if (dupOrders.length > 0) errors.push(`duplicate orders: ${dupOrders.join(", ")}`);
const expectedOrders = new Set(Array.from({ length: N }, (_, i) => i + 1));
const absentOrders = [...expectedOrders].filter((o) => !orderCounts.has(o));
if (absentOrders.length > 0) errors.push(`absent orders (1..${N}): ${absentOrders.join(", ")}`);
const outOfRangeOrders = orders.filter((o) => o < 1 || o > N);
if (outOfRangeOrders.length > 0) errors.push(`orders out of range 1..${N}: ${outOfRangeOrders.join(", ")}`);

// --- report ---
console.log(`entries: ${VOCAB_N4B.length}`);
console.log(`targets parsed (lines 251-end): ${targets.length}`);
console.log(`db-n4 words loaded: ${dbWords.size}`);
console.log(`verbs: ${VOCAB_N4B.filter((e) => e.pos === "verb").length}`);
console.log(`categories: ${[...new Set(VOCAB_N4B.map((e) => e.category))].join(", ")}`);
if (warnings.length > 0) {
  console.log("\nWARNINGS:");
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length > 0) {
  console.error(`\nFAILED with ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`\nPASS: vocab-n4-b.ts is valid (${N} entries, matches targets-n4.txt lines 251-end exactly).`);
