/**
 * Validator for vocab-n5-a.ts (Task R1a).
 * Checks that the 250 entries exactly match targets-n5.txt lines 1-250,
 * with complete examples, correct level, verb groups, unique orders,
 * no forbidden simplified-Chinese characters, and no overlap with
 * already-committed db-n5.txt words.
 *
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-vocab-n5-a.ts
 */
import * as fs from "fs";
import * as path from "path";
import { VOCAB_N5A } from "./vocab-n5-a";

const FORBIDDEN = "计证恶头说发变东车马鸟龙药钱风历让乡忆见书语汉习为监认类经线张样场职闻简复胜厅办门师运";
const EXPECTED_COUNT = 250;

function readLines(file: string): string[] {
  return fs
    .readFileSync(path.join(import.meta.dir, file), "utf8")
    .replace(/^\uFEFF/, "")
    .split("\n")
    .map((l: string) => l.trim())
    .filter((l: string) => l.length > 0);
}

function main(): void {
  const errors: string[] = [];
  const warnings: string[] = [];

  const targets = readLines("targets-n5.txt").slice(0, EXPECTED_COUNT);
  const dbWords = new Set(readLines("db-n5.txt"));
  const entries = VOCAB_N5A;
  const words = entries.map((e) => e.word);

  if (targets.length !== EXPECTED_COUNT) {
    errors.push(`targets-n5.txt yielded ${targets.length} words (expected ${EXPECTED_COUNT})`);
  }

  // (a) word set == target set EXACTLY
  const targetSet = new Set(targets);
  const wordSet = new Set(words);
  const missing = targets.filter((t) => !wordSet.has(t));
  const extra = words.filter((w) => !targetSet.has(w));
  if (missing.length > 0) errors.push(`missing ${missing.length} target word(s): ${JSON.stringify(missing)}`);
  if (extra.length > 0) errors.push(`extra ${extra.length} word(s) not in targets: ${JSON.stringify(extra)}`);

  // (b) no internal duplicates
  const dupWords = words.filter((w, i) => words.indexOf(w) !== i);
  if (dupWords.length > 0) errors.push(`duplicate word(s): ${JSON.stringify([...new Set(dupWords)])}`);

  // db-n5.txt overlap (targets must be NEW words, not already committed)
  const overlap = words.filter((w) => dbWords.has(w));
  if (overlap.length > 0) warnings.push(`overlap with committed db-n5.txt (${overlap.length}): ${JSON.stringify(overlap)}`);

  // (c) every entry has non-empty exampleJp + exampleEn
  for (const e of entries) {
    if (!e.exampleJp || e.exampleJp.trim().length === 0) errors.push(`order ${e.order}: missing exampleJp (${e.word})`);
    if (!e.exampleEn || e.exampleEn.trim().length === 0) errors.push(`order ${e.order}: missing exampleEn (${e.word})`);
  }

  // (d) no Latin runs of 3+ letters in word
  for (const e of entries) {
    if (/[A-Za-z]{3,}/.test(e.word)) errors.push(`Latin run of 3+ letters in word: ${e.word}`);
  }

  // (e) no forbidden simplified-Chinese characters in any text field
  for (const e of entries) {
    const text = [e.word, e.reading, e.meaning, e.romaji ?? "", e.exampleJp ?? "", e.exampleEn ?? ""].join("|");
    for (const ch of FORBIDDEN) {
      if (text.includes(ch)) errors.push(`forbidden char '${ch}' in entry: ${e.word}`);
    }
  }

  // (f) all level "N5"
  for (const e of entries) {
    if (e.level !== "N5") errors.push(`level is not N5: ${e.word} -> ${e.level}`);
  }

  // (g) every verb-pos entry has verbGroup
  for (const e of entries) {
    if (e.pos === "verb" && !e.verbGroup) errors.push(`verb without verbGroup: ${e.word}`);
  }

  // (h) orders 1..250 unique
  const orders = entries.map((e) => e.order);
  if (orders.some((o) => typeof o !== "number")) {
    errors.push("entry with missing/non-numeric order");
  } else {
    const orderSet = new Set(orders);
    if (orderSet.size !== orders.length) {
      const dupOrders = orders.filter((o, i) => orders.indexOf(o) !== i);
      errors.push(`duplicate order(s): ${JSON.stringify([...new Set(dupOrders)])}`);
    }
    for (let i = 1; i <= EXPECTED_COUNT; i++) {
      if (!orderSet.has(i)) errors.push(`order missing: ${i}`);
    }
  }

  console.log(`entries: ${entries.length} (expected ${EXPECTED_COUNT})`);
  console.log(`missing targets: ${missing.length} | extra words: ${extra.length} | internal dups: ${words.length - wordSet.size}`);
  console.log(`db-n5.txt overlap: ${overlap.length} (expected 0)`);
  for (const w of warnings) console.warn(`WARN: ${w}`);
  if (errors.length > 0) {
    for (const e of errors) console.error(`ERROR: ${e}`);
    console.error(`FAILED with ${errors.length} error(s)`);
    process.exit(1);
  }
  console.log("VALIDATION PASSED");
}

main();
