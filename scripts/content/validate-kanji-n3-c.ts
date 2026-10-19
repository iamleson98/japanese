/**
 * Validator for kanji-n3-c.ts — "Kanji N3 set, part C" (78 characters).
 * Checks the entry list against scripts/content/targets-kanji-n3-c.txt and
 * scripts/content/exclude-kanji.txt (300 already-covered characters).
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-kanji-n3-c.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { KANJI_N3C } from "./kanji-n3-c";

const EXPECTED_COUNT = 78;

function readCharList(name: string): string[] {
  const p = path.join(import.meta.dir, name);
  const raw = fs.readFileSync(p, "utf8");
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

function main(): void {
  const targets = readCharList("targets-kanji-n3-c.txt");
  const excluded = readCharList("exclude-kanji.txt");

  const entries = KANJI_N3C;
  const errors: string[] = [];
  const push = (m: string) => errors.push(m);

  console.log(`entries: ${entries.length} | targets parsed: ${targets.length} | excluded parsed: ${excluded.length}`);

  // (b) no duplicate characters
  const seenChars = new Set<string>();
  for (const e of entries) {
    if (seenChars.has(e.character)) push(`duplicate character: ${e.character}`);
    seenChars.add(e.character);
  }

  // (c) no overlap with the 300-char exclusion set
  const excludeSet = new Set(excluded);
  if (excluded.length !== excludeSet.size) push("exclude-kanji.txt contains duplicate lines");
  for (const c of seenChars) {
    if (excludeSet.has(c)) push(`character already covered (in exclude-kanji.txt): ${c}`);
  }

  // (d) non-empty required fields, (e) strokeCount, (f) single-char, (g) level, kana formats
  const onyomiRe = /^[ァ-ヴー、\-]+$/u;
  const kunyomiRe = /^[ぁ-ゖ()、\-]+$/u;
  for (const e of entries) {
    if (typeof e.character !== "string" || Array.from(e.character).length !== 1) {
      push(`character is not a single char: "${String(e.character)}"`);
      continue;
    }
    const fields: Array<[string, string | undefined]> = [
      ["onyomi", e.onyomi],
      ["kunyomi", e.kunyomi],
      ["meaning", e.meaning],
      ["mnemonic", e.mnemonic],
      ["exampleWord", e.exampleWord],
      ["exampleRead", e.exampleRead],
      ["exampleMean", e.exampleMean],
    ];
    for (const [name, v] of fields) {
      if (typeof v !== "string" || v.trim().length === 0) {
        push(`${e.character}: field "${name}" is missing or empty`);
      }
    }
    if (!Number.isInteger(e.strokeCount) || e.strokeCount <= 0) {
      push(`${e.character}: bad strokeCount "${String(e.strokeCount)}"`);
    }
    if (e.level !== "N3") {
      push(`${e.character}: bad level "${String(e.level)}"`);
    }
    if (typeof e.onyomi === "string" && e.onyomi.trim().length > 0 && !onyomiRe.test(e.onyomi)) {
      push(`${e.character}: onyomi not katakana/"-": "${e.onyomi}"`);
    }
    if (typeof e.kunyomi === "string" && e.kunyomi.trim().length > 0 && !kunyomiRe.test(e.kunyomi)) {
      push(`${e.character}: kunyomi not hiragana/"-": "${e.kunyomi}"`);
    }
    if (typeof e.radical === "string" && e.radical.trim().length === 0) {
      push(`${e.character}: radical is empty string`);
    }
  }

  // (a) char set == target set EXACTLY (no missing, no extras)
  const targetSet = new Set(targets);
  if (targets.length !== targetSet.size) push("targets file contains duplicate lines");
  if (entries.length !== targetSet.size) {
    push(`entry count ${entries.length} != target count ${targetSet.size}`);
  }
  for (const t of targets) {
    if (!seenChars.has(t)) push(`missing target character: ${t}`);
  }
  for (const c of seenChars) {
    if (!targetSet.has(c)) push(`extra character not in targets: ${c}`);
  }

  // (h) orders exactly 1..78, unique
  const orderSeen = new Set<number>();
  for (const [i, e] of entries.entries()) {
    const o = e.order;
    if (typeof o !== "number" || !Number.isInteger(o)) {
      push(`entry ${i + 1} (${e.character}): order missing`);
      continue;
    }
    if (orderSeen.has(o)) push(`duplicate order: ${o}`);
    orderSeen.add(o);
    if (o < 1 || o > EXPECTED_COUNT) push(`order out of range 1..${EXPECTED_COUNT}: ${o}`);
  }
  for (let i = 1; i <= EXPECTED_COUNT; i++) {
    if (!orderSeen.has(i)) push(`order ${i} missing`);
  }

  // summary
  const strokes = entries.reduce((a, e) => a + (e.strokeCount ?? 0), 0);
  const withKun = entries.filter((e) => e.kunyomi && e.kunyomi !== "-").length;
  console.log(`level: N3=${entries.length} | entries with kunyomi: ${withKun} | total strokes: ${strokes}`);

  if (errors.length > 0) {
    console.error(`\nFAILED — ${errors.length} error(s):`);
    for (const m of errors) console.error(`  x ${m}`);
    process.exit(1);
  }

  console.log("\nOK — kanji-n3-c.ts passed all checks (a)-(h).");
}

main();
