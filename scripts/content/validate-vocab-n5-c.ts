/**
 * Validator for vocab-n5-c.ts (task R1c — N5 vocabulary part C).
 * Usage: cd /home/z/my-project/japanese && bun scripts/content/validate-vocab-n5-c.ts
 *
 * Checks (from task spec):
 *  (a) word set == targets-n5.txt lines 501..end, EXACTLY
 *  (b) no internal duplicate words
 *  (c) every entry has non-empty exampleJp + exampleEn
 *  (d) no Latin letter runs of 3+ inside `word`
 *  (e) no forbidden simplified-Chinese-only characters in content
 *  (f) every entry level === "N5"
 *  (g) every pos === "verb" entry has a valid verbGroup
 *  (h) order values are unique and sequential 1..N
 *  (info) overlap with db-n5.txt (existing committed seed words) — reported, not fatal
 */
import * as fs from "fs";
import * as path from "path";
import { VOCAB_N5C } from "./vocab-n5-c";

const FORBIDDEN_SIMPLIFIED = "计证恶头说发变东车马鸟龙药钱风历让乡忆见书语汉习为监认类经线张样场职闻简复胜厅办门师运";
const VALID_VERB_GROUPS = new Set(["godan", "ichidan", "irregular"]);

const here =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(decodeURIComponent(new URL(import.meta.url).pathname));

// ---- load reference files ----
const targetLines = fs
  .readFileSync(path.join(here, "targets-n5.txt"), "utf-8")
  .split(/\r?\n/);
const targets = targetLines
  .slice(500) // lines 501..end (1-indexed)
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

const dbWords = new Set(
  fs
    .readFileSync(path.join(here, "db-n5.txt"), "utf-8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
);

const errors: string[] = [];
const warnings: string[] = [];

// ---- (b) internal duplicates ----
const words = VOCAB_N5C.map((e) => e.word);
const seen = new Set<string>();
for (const w of words) {
  if (seen.has(w)) errors.push(`(b) duplicate word in file: ${w}`);
  seen.add(w);
}
const wordSet = new Set(words);

// ---- (a) exact set equality with targets ----
for (const t of targets) {
  if (!wordSet.has(t)) errors.push(`(a) missing target word: ${t}`);
}
for (const w of wordSet) {
  if (!targets.includes(w)) errors.push(`(a) extra word not in targets: ${w}`);
}
if (targets.length !== VOCAB_N5C.length) {
  errors.push(
    `(a) count mismatch: targets=${targets.length}, entries=${VOCAB_N5C.length}`
  );
}

// ---- per-entry checks ----
VOCAB_N5C.forEach((e, i) => {
  const tag = `#${i + 1} (${e.word})`;

  // (c) examples
  if (!e.exampleJp || !e.exampleJp.trim()) errors.push(`(c) ${tag} empty exampleJp`);
  if (!e.exampleEn || !e.exampleEn.trim()) errors.push(`(c) ${tag} empty exampleEn`);

  // (d) Latin runs of 3+ in word
  if (/[A-Za-z]{3,}/.test(e.word)) errors.push(`(d) ${tag} Latin run of 3+ in word`);

  // (e) forbidden simplified chars
  const text = [e.word, e.reading, e.meaning, e.exampleJp ?? "", e.exampleEn ?? ""].join("|");
  for (const ch of FORBIDDEN_SIMPLIFIED) {
    if (text.includes(ch)) errors.push(`(e) ${tag} forbidden simplified char: ${ch}`);
  }

  // (f) level
  if (e.level !== "N5") errors.push(`(f) ${tag} level is ${e.level}, expected "N5"`);

  // (g) verbGroup for verbs
  if (e.pos === "verb") {
    if (!e.verbGroup || !VALID_VERB_GROUPS.has(e.verbGroup)) {
      errors.push(`(g) ${tag} pos=verb but verbGroup missing/invalid (${e.verbGroup ?? "none"})`);
    }
  } else if (e.verbGroup) {
    warnings.push(`${tag} has verbGroup "${e.verbGroup}" but pos is ${e.pos}`);
  }

  // light sanity (warnings only)
  if (!e.reading || !e.reading.trim()) warnings.push(`${tag} empty reading`);
  else if (!/^[\u3041-\u3096\u30fc]+$/.test(e.reading)) {
    warnings.push(`${tag} reading is not pure hiragana/long-vowel: ${e.reading}`);
  }
  if (!e.meaning || !e.meaning.trim()) warnings.push(`${tag} empty meaning`);
  if (!e.category || !e.category.trim()) warnings.push(`${tag} empty category`);
});

// ---- (h) orders unique + sequential 1..N ----
const orders = VOCAB_N5C.map((e) => e.order ?? -1);
const orderSeen = new Set<number>();
for (const o of orders) {
  if (orderSeen.has(o)) errors.push(`(h) duplicate order: ${o}`);
  orderSeen.add(o);
}
orders.forEach((o, i) => {
  if (o !== i + 1) {
    errors.push(`(h) order at index ${i} is ${o}, expected ${i + 1}`);
  }
});

// ---- (info) overlap with existing db-n5 seed ----
const overlap = words.filter((w) => dbWords.has(w));

// ---- report ----
const catCounts = new Map<string, number>();
for (const e of VOCAB_N5C) {
  catCounts.set(e.category, (catCounts.get(e.category) ?? 0) + 1);
}

console.log(`entries:            ${VOCAB_N5C.length}`);
console.log(`targets (501..end): ${targets.length}`);
console.log(`categories:         ${[...catCounts.entries()].map(([c, n]) => `${c}=${n}`).join(", ")}`);
console.log(`verbs:              ${VOCAB_N5C.filter((e) => e.pos === "verb").length}`);
console.log(`db-n5 overlap:      ${overlap.length === 0 ? "none" : overlap.join(", ")}`);
if (warnings.length > 0) {
  console.log(`\nwarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
if (errors.length > 0) {
  console.error(`\nFAILED — ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log("\nOK — vocab-n5-c.ts passed all checks (a)-(h).");
