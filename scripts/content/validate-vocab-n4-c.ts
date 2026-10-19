/**
 * Validator for vocab-n4-c.ts (N4 vocabulary expansion — part C).
 *
 * Checks:
 *  (a) no duplicate words within the file
 *  (b) no duplicates vs exclude-n4-words.txt (523 covered N4 words) or db-n5.txt (187 N5 words)
 *  (c) every entry has non-empty exampleJp + exampleEn (plus word/reading/meaning/romaji/category/pos)
 *  (d) no Latin runs of 3+ characters in word
 *  (e) no forbidden simplified-Chinese characters in any string field
 *  (f) every entry has level "N4"
 *  (g) every verb-pos entry has a valid verbGroup (and non-verbs must not have one)
 *  (h) order values are unique and sequential 1..N
 */
import { readFileSync } from "node:fs";
import { VOCAB_N4C } from "./vocab-n4-c";

const FORBIDDEN = "计证恶头说发变东车马鸟龙药钱风历让乡忆见书语汉习为监认类经线张样场职闻简复胜厅办门师运";
const VALID_VERB_GROUPS = new Set(["godan", "ichidan", "irregular"]);

const errors: string[] = [];
const entries = VOCAB_N4C;

/** Load one word per line from an exclusion file (relative to this script). */
function loadWords(name: string): string[] {
  const text = readFileSync(`${import.meta.dir}/${name}`, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

const exclN4 = loadWords("exclude-n4-words.txt");
const exclN5 = loadWords("db-n5.txt");

// (a) duplicates within the file
const seen = new Map<string, number>();
for (const e of entries) {
  if (seen.has(e.word)) {
    errors.push(`(a) duplicate word within file: ${e.word} (orders ${seen.get(e.word)} and ${e.order})`);
  } else {
    seen.set(e.word, e.order ?? -1);
  }
}

// (b) duplicates vs exclusion lists (exact word match)
for (const e of entries) {
  if (exclN4.includes(e.word)) {
    errors.push(`(b) word already covered in exclude-n4-words.txt: ${e.word}`);
  }
  if (exclN5.includes(e.word)) {
    errors.push(`(b) word already covered in db-n5.txt: ${e.word}`);
  }
}

// (c) required non-empty fields
for (const e of entries) {
  if (!e.exampleJp || e.exampleJp.trim().length === 0) {
    errors.push(`(c) empty exampleJp: ${e.word}`);
  }
  if (!e.exampleEn || e.exampleEn.trim().length === 0) {
    errors.push(`(c) empty exampleEn: ${e.word}`);
  }
  for (const field of ["word", "reading", "meaning", "romaji", "category", "pos"] as const) {
    const value = e[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`(c) empty ${field}: ${e.word}`);
    }
  }
}

// (d) no Latin runs of 3+ in word
for (const e of entries) {
  if (/[A-Za-z]{3,}/.test(e.word)) {
    errors.push(`(d) Latin run of 3+ in word: ${e.word}`);
  }
}

// (e) no forbidden simplified-Chinese characters in any string field
const fieldsToCheck = ["word", "reading", "meaning", "exampleJp", "exampleEn"] as const;
for (const e of entries) {
  for (const field of fieldsToCheck) {
    const value = e[field] ?? "";
    for (const ch of value) {
      if (FORBIDDEN.includes(ch)) {
        errors.push(`(e) forbidden simplified char "${ch}" (U+${ch.codePointAt(0)!.toString(16)}) in ${field}: ${e.word}`);
      }
    }
  }
}

// (f) level must be "N4"
for (const e of entries) {
  if (e.level !== "N4") {
    errors.push(`(f) level is not "N4": ${e.word} (${e.level})`);
  }
}

// (g) verb-group consistency
let verbCount = 0;
for (const e of entries) {
  if (e.pos === "verb") {
    verbCount++;
    if (!e.verbGroup || !VALID_VERB_GROUPS.has(e.verbGroup)) {
      errors.push(`(g) verb without valid verbGroup: ${e.word} (verbGroup=${e.verbGroup})`);
    }
  } else if (e.verbGroup !== undefined) {
    errors.push(`(g) non-verb entry has verbGroup: ${e.word} (pos=${e.pos}, verbGroup=${e.verbGroup})`);
  }
}

// (h) orders unique and sequential 1..N
const orders = entries.map((e) => e.order);
const orderSet = new Set(orders);
if (orderSet.size !== orders.length) {
  errors.push(`(h) duplicate order values: ${orders.length - orderSet.size} duplicates`);
}
const sorted = [...orders].sort((a, b) => (a ?? 0) - (b ?? 0));
for (let i = 0; i < sorted.length; i++) {
  if (sorted[i] !== i + 1) {
    errors.push(`(h) orders are not sequential 1..${entries.length} (expected ${i + 1}, found ${sorted[i]})`);
    break;
  }
}

// ---- report ----
const byCategory = new Map<string, number>();
for (const e of entries) {
  byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + 1);
}
const categories = [...byCategory.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([name, count]) => `${name}:${count}`)
  .join(", ");

console.log(`entries: ${entries.length}`);
console.log(`exclusion lists loaded: exclude-n4=${exclN4.length}, db-n5=${exclN5.length}`);
console.log(`verbs (pos=verb): ${verbCount}`);
console.log(`categories (${byCategory.size}): ${categories}`);
if (errors.length > 0) {
  console.error(`\nVALIDATION FAILED — ${errors.length} issue(s):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log("\nVALIDATION PASSED");
}
