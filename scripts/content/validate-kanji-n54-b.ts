/**
 * Validator for KANJI_N54B — Kanji N5 gap-fill + N4 set, part B (62 chars).
 * Checks the entries against targets-kanji-n54-b.txt (exact char set).
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-kanji-n54-b.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { KANJI_N54B } from "./kanji-n54-b.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const EXPECTED = 62;

// Targets: exactly the 62 lines of targets-kanji-n54-b.txt
const targets = fs
  .readFileSync(path.join(here, "targets-kanji-n54-b.txt"), "utf8")
  .replace(/^\uFEFF/, "")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

// Simplified-Chinese-only characters that must never appear in Japanese fields
const FORBIDDEN_CHARS = "车东见语书马历让乡发变证恶头说线张样场职闻简复胜厅办门师运铁钱风".split("");

const errors: string[] = [];
const warnings: string[] = [];

// --- (b) internal duplicate characters ---
const seen = new Map<string, number>();
KANJI_N54B.forEach((e, i) => {
  if (seen.has(e.character)) {
    errors.push(`dup: "${e.character}" appears at order ${seen.get(e.character)} and ${e.order} (index ${i})`);
  } else {
    seen.set(e.character, e.order ?? -1);
  }
});

// --- (a) character set == target set EXACTLY ---
const charSet = new Set(KANJI_N54B.map((e) => e.character));
const targetSet = new Set(targets);
const missing = targets.filter((t) => !charSet.has(t));
const extra = [...charSet].filter((c) => !targetSet.has(c));
if (missing.length > 0) errors.push(`missing ${missing.length} target chars: ${missing.join(" | ")}`);
if (extra.length > 0) errors.push(`extra ${extra.length} chars not in targets: ${extra.join(" | ")}`);
if (targets.length !== EXPECTED) warnings.push(`targets-kanji-n54-b.txt parsed ${targets.length} chars (expected ${EXPECTED})`);
if (KANJI_N54B.length !== EXPECTED) errors.push(`entry count is ${KANJI_N54B.length}, expected ${EXPECTED}`);

// --- per-entry checks ---
const katakanaRe = /^[ァ-ヴー、]+$/;
const hiraganaRe = /^[ぁ-んー()、]+$/;
KANJI_N54B.forEach((e) => {
  const label = `${e.character} (order ${e.order})`;
  // (c) all fields non-empty
  for (const [field, val] of Object.entries({
    character: e.character, onyomi: e.onyomi, kunyomi: e.kunyomi, meaning: e.meaning,
    radical: e.radical, mnemonic: e.mnemonic, exampleWord: e.exampleWord,
    exampleRead: e.exampleRead, exampleMean: e.exampleMean,
  })) {
    if (!val || String(val).trim().length === 0) errors.push(`${label}: missing ${field}`);
  }
  // (d) stroke count positive
  if (typeof e.strokeCount !== "number" || e.strokeCount <= 0) errors.push(`${label}: strokeCount must be > 0`);
  // (e) single-character character
  if (typeof e.character !== "string" || [...e.character].length !== 1) errors.push(`${label}: character must be exactly one char`);
  // (f) level only N5/N4
  if (e.level !== "N5" && e.level !== "N4") errors.push(`${label}: level "${e.level}" must be "N5" or "N4"`);
  // readings format
  if (e.onyomi !== "-" && !katakanaRe.test(e.onyomi)) errors.push(`${label}: onyomi "${e.onyomi}" must be katakana (、-separated) or "-"`);
  if (e.kunyomi !== "-" && !hiraganaRe.test(e.kunyomi)) errors.push(`${label}: kunyomi "${e.kunyomi}" must be hiragana with (okurigana) or "-"`);
  // forbidden simplified chars in Japanese-bearing fields
  for (const field of [e.character, e.exampleWord ?? "", e.kunyomi]) {
    for (const ch of FORBIDDEN_CHARS) {
      if (field.includes(ch)) {
        errors.push(`${label}: forbidden simplified char "${ch}" in "${field.slice(0, 30)}"`);
        break;
      }
    }
  }
  // order must be numeric
  if (typeof e.order !== "number") errors.push(`${label}: missing numeric order`);
});

// --- (g) orders exactly 1..62, unique ---
const orders = KANJI_N54B.map((e) => e.order).filter((o): o is number => typeof o === "number");
const orderCounts = new Map<number, number>();
orders.forEach((o) => orderCounts.set(o, (orderCounts.get(o) ?? 0) + 1));
const dupOrders = [...orderCounts.entries()].filter(([, c]) => c > 1).map(([o]) => o);
if (dupOrders.length > 0) errors.push(`duplicate orders: ${dupOrders.join(", ")}`);
const expectedOrders = new Set(Array.from({ length: EXPECTED }, (_, i) => i + 1));
const absentOrders = [...expectedOrders].filter((o) => !orderCounts.has(o));
if (absentOrders.length > 0) errors.push(`absent orders (1..${EXPECTED}): ${absentOrders.join(", ")}`);
const outOfRangeOrders = orders.filter((o) => o < 1 || o > EXPECTED);
if (outOfRangeOrders.length > 0) errors.push(`orders out of range 1..${EXPECTED}: ${outOfRangeOrders.join(", ")}`);

// --- report ---
console.log(`entries: ${KANJI_N54B.length}`);
console.log(`targets parsed: ${targets.length}`);
console.log(`N5: ${KANJI_N54B.filter((e) => e.level === "N5").length}, N4: ${KANJI_N54B.filter((e) => e.level === "N4").length}`);
console.log(`example words present: ${KANJI_N54B.filter((e) => e.exampleWord && e.exampleRead && e.exampleMean).length}`);
if (warnings.length > 0) {
  console.log("\nWARNINGS:");
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length > 0) {
  console.error(`\nFAILED with ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`\nPASS: kanji-n54-b.ts is valid (${EXPECTED} entries, matches targets-kanji-n54-b.txt exactly).`);
