/**
 * Validator for kanji-n54-c.ts — regenerated "Kanji N5 gap-fill + N4 set, part C".
 * Checks the entry list against scripts/content/targets-kanji-n54-c.txt.
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-kanji-n54-c.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { KANJI_N54C } from "./kanji-n54-c";

const EXPECTED_COUNT = 62;

function main(): void {
  const targetsPath = path.join(import.meta.dir, "targets-kanji-n54-c.txt");
  const raw = fs.readFileSync(targetsPath, "utf8");
  const targets = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const entries = KANJI_N54C;
  const errors: string[] = [];
  const push = (m: string) => errors.push(m);

  console.log(`entries: ${entries.length} | targets parsed: ${targets.length}`);

  // (b) no duplicate characters
  const seenChars = new Set<string>();
  for (const e of entries) {
    if (seenChars.has(e.character)) push(`duplicate character: ${e.character}`);
    seenChars.add(e.character);
  }

  // (e) single-char characters, (c) non-empty required fields, (d) strokeCount, (f) level
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
    if (e.level !== "N5" && e.level !== "N4") {
      push(`${e.character}: bad level "${String(e.level)}"`);
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

  // (g) orders exactly 1..62, unique
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
  const n5 = entries.filter((e) => e.level === "N5").length;
  const n4 = entries.filter((e) => e.level === "N4").length;
  const strokes = entries.reduce((a, e) => a + (e.strokeCount ?? 0), 0);
  console.log(`levels: N5=${n5}, N4=${n4} | total strokes: ${strokes}`);

  if (errors.length > 0) {
    console.error(`\nFAILED — ${errors.length} error(s):`);
    for (const m of errors) console.error(`  x ${m}`);
    process.exit(1);
  }

  console.log("\nOK — kanji-n54-c.ts passed all checks (a)-(g).");
}

main();
