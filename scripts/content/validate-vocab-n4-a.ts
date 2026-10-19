/**
 * Validator for scripts/content/vocab-n4-a.ts (N4 vocabulary part A).
 *
 * Checks VOCAB_N4A against:
 *  - targets-n4.txt lines 1-250 (the exact target word list for this file)
 *  - db-n4.txt (already-committed N4 words; overlap must be 0)
 *
 * Rules checked:
 *  (a) word set == target set EXACTLY (no missing, no extra)
 *  (b) no internal duplicate words
 *  (c) every entry has non-empty exampleJp + exampleEn
 *  (d) no Latin-letter runs of 3+ inside word
 *  (e) no forbidden simplified-Chinese-only characters
 *  (f) all entries are level "N4"
 *  (g) every verb-pos entry has a valid verbGroup (godan|ichidan|irregular)
 *  (h) orders are exactly 1..250, unique and complete
 *
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-vocab-n4-a.ts
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { VOCAB_N4A } from "./vocab-n4-a";

const TARGET_COUNT = 250;

// Simplified-Chinese-only characters that must never appear in Japanese content.
const FORBIDDEN_CHARS = "计证恶头说发变东车马鸟龙药钱风历让乡忆见书语汉习为监认类经线张样场职闻简复胜厅办门师运".split("");

const VERB_GROUPS = new Set(["godan", "ichidan", "irregular"]);

// Normalize: fullwidth tilde (U+FF5E) -> wave dash (U+301C), trim whitespace.
const norm = (s: string): string => s.replace(/～/g, "〜").trim();

const dir = import.meta.dir;

const targetLines: string[] = readFileSync(join(dir, "targets-n4.txt"), "utf8")
  .split("\n")
  .map((l) => norm(l))
  .filter((l) => l.length > 0)
  .slice(0, TARGET_COUNT);

const dbWords = new Set(
  readFileSync(join(dir, "db-n4.txt"), "utf8")
    .split("\n")
    .map((l) => norm(l))
    .filter((l) => l.length > 0)
);

const errors: string[] = [];
const entries = VOCAB_N4A;

// --- entry count ---
if (entries.length !== TARGET_COUNT) {
  errors.push(`entry count is ${entries.length}, expected ${TARGET_COUNT}`);
}

// --- per-entry checks ---
const wordCount = new Map<string, number>();
for (const e of entries) {
  const w = norm(e.word);
  wordCount.set(w, (wordCount.get(w) ?? 0) + 1);

  // (c) examples required
  if (!e.exampleJp || e.exampleJp.trim().length === 0) {
    errors.push(`missing exampleJp: ${e.word}`);
  }
  if (!e.exampleEn || e.exampleEn.trim().length === 0) {
    errors.push(`missing exampleEn: ${e.word}`);
  }

  // (d) no Latin runs of 3+ in word
  if (/[A-Za-z]{3,}/.test(e.word)) {
    errors.push(`Latin-letter run (3+) in word: ${e.word}`);
  }

  // (e) forbidden simplified-Chinese chars (check all Japanese text fields)
  for (const ch of FORBIDDEN_CHARS) {
    for (const field of [e.word, e.reading, e.exampleJp ?? ""]) {
      if (field.includes(ch)) {
        errors.push(`forbidden simplified char '${ch}' in entry: ${e.word}`);
        break;
      }
    }
  }

  // (f) level must be N4
  if (e.level !== "N4") {
    errors.push(`level is not "N4": ${e.word}`);
  }

  // (g) verbs need a valid verbGroup
  if (e.pos === "verb" && !VERB_GROUPS.has(e.verbGroup ?? "")) {
    errors.push(`verb entry without valid verbGroup: ${e.word}`);
  }
}

// --- (b) internal duplicates ---
for (const [w, c] of wordCount) {
  if (c > 1) errors.push(`duplicate word appears ${c}x: ${w}`);
}

// --- (a) exact target set match ---
const targetSet = new Set(targetLines);
const entrySet = new Set(entries.map((e) => norm(e.word)));
const missing = targetLines.filter((t) => !entrySet.has(t));
const extra = [...entrySet].filter((w) => !targetSet.has(w));
if (missing.length > 0) errors.push(`missing targets (${missing.length}): ${missing.join(" ")}`);
if (extra.length > 0) errors.push(`extra words (${extra.length}): ${extra.join(" ")}`);
if (targetSet.size !== TARGET_COUNT) {
  errors.push(`target set has ${targetSet.size} unique words, expected ${TARGET_COUNT}`);
}

// --- (h) orders 1..250 unique + complete ---
const orders = entries.map((e) => e.order ?? -1);
const orderSeen = new Set<number>();
const dupOrders: number[] = [];
for (const o of orders) {
  if (orderSeen.has(o)) dupOrders.push(o);
  else orderSeen.add(o);
}
if (dupOrders.length > 0) errors.push(`duplicate orders: ${dupOrders.join(", ")}`);
for (let i = 1; i <= TARGET_COUNT; i++) {
  if (!orderSeen.has(i)) errors.push(`order ${i} is missing`);
}

// --- db-n4 overlap guard ---
const overlap = [...entrySet].filter((w) => dbWords.has(w));
if (overlap.length > 0) {
  errors.push(`words already in db-n4.txt: ${overlap.join(", ")}`);
}

// --- report ---
const verbs = entries.filter((e) => e.pos === "verb");
const categories = new Set(entries.map((e) => e.category));
const dupWordCount = [...wordCount.values()].filter((c) => c > 1).length;

console.log(`entries: ${entries.length}`);
console.log(`targets parsed: ${targetLines.length}`);
console.log(`db-n4 words loaded: ${dbWords.size}`);
console.log(`verbs: ${verbs.length}`);
console.log(`categories: ${categories.size} (${[...categories].sort().join(", ")})`);
console.log(`missing targets: ${missing.length}`);
console.log(`extra words: ${extra.length}`);
console.log(`internal duplicate words: ${dupWordCount}`);
console.log(`duplicate orders: ${dupOrders.length}`);
console.log(`db-n4 overlap: ${overlap.length}`);

if (errors.length > 0) {
  console.error("VALIDATION FAILED:");
  for (const err of errors) console.error(` - ${err}`);
  process.exit(1);
}

console.log("VALIDATION PASSED");
