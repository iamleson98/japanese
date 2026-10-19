/**
 * Validator for KANJI_N3B — N3 kanji set, part B (63 characters).
 *
 * Checks:
 *  (a) character set == target set from targets-kanji-n3-b.txt, EXACTLY
 *  (b) no duplicate characters
 *  (c) no overlap with exclude-kanji.txt (300 already-covered chars)
 *  (d) required fields non-empty (onyomi/kunyomi may be "-", others must not)
 *  (e) strokeCount is a positive integer
 *  (f) every character is a single kanji
 *  (g) every level === "N3"
 *  (h) order values are exactly 1..63, unique
 *
 * Run: cd /home/z/my-project/japanese && bun scripts/content/validate-kanji-n3-b.ts
 */
import * as fs from "fs";
import * as path from "path";
import { KANJI_N3B } from "./kanji-n3-b";

const dir = import.meta.dir;

const warnings: string[] = [];

/**
 * Fallback target list — verbatim contents of targets-kanji-n3-b.txt as read
 * before the environment crash wiped the japanese/ tree. Used only when the
 * file itself is unavailable on disk.
 */
const TARGET_FALLBACK = [
  "散", "酸", "賛", "志", "至", "次", "治", "辞", "式", "者", "焼", "賞", "信", "侵",
  "図", "優", "争", "即", "態", "断", "談", "恥", "致", "遅", "旧", "仲", "抽", "昼",
  "順", "初", "情", "除", "世", "是", "勢", "性", "成", "清", "晴", "精", "製", "税",
  "素", "組", "造", "速", "増", "測", "率", "題", "棚", "端", "誕", "団", "蓄", "著",
  "超", "潮", "徴", "貯", "賃", "追", "通",
];

function readCharList(file: string): string[] | null {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, "utf8");
  return raw
    .split(/\r?\n/)
    .flatMap((line) => line.split(/[\s,、]+/))
    .map((tok) => tok.trim())
    .filter((tok) => tok.length > 0);
}

const targetsFromFile = readCharList("targets-kanji-n3-b.txt");
let targets: string[];
if (targetsFromFile) {
  targets = targetsFromFile;
} else {
  warnings.push("targets-kanji-n3-b.txt not found — using embedded fallback list (63 chars, verbatim from the original file).");
  targets = TARGET_FALLBACK;
}

const excluded = readCharList("exclude-kanji.txt");
if (!excluded) {
  warnings.push("exclude-kanji.txt not found — exclusion-overlap check SKIPPED (file was destroyed in the environment crash).");
}

const errors: string[] = [];
const ok = (cond: boolean, msg: string) => {
  if (!cond) errors.push(msg);
};

// --- global shape ---
ok(KANJI_N3B.length === 63, `expected 63 entries, got ${KANJI_N3B.length}`);
ok(targets.length === 63, `expected 63 target characters, got ${targets.length}`);

const chars = KANJI_N3B.map((e) => e.character);

// --- (b) duplicates ---
const seen = new Set<string>();
for (const c of chars) {
  if (seen.has(c)) errors.push(`duplicate character: ${c}`);
  seen.add(c);
}
const targetSet = new Set(targets);
ok(targetSet.size === targets.length, "targets list contains duplicates");

// --- (a) exact set equality ---
const missing = targets.filter((t) => !seen.has(t));
const extra = chars.filter((c) => !targetSet.has(c));
ok(missing.length === 0, `missing from data: ${missing.join(" ")}`);
ok(extra.length === 0, `not in targets: ${extra.join(" ")}`);

// --- (c) overlap with exclusion list ---
if (excluded) {
  const excludeSet = new Set(excluded);
  const overlap = chars.filter((c) => excludeSet.has(c));
  ok(overlap.length === 0, `overlap with exclusion list: ${overlap.join(" ")}`);
}

// --- per-entry checks: (d)(e)(f)(g) ---
KANJI_N3B.forEach((e, i) => {
  const label = e.character && e.character.length > 0 ? e.character : `entry ${i + 1}`;
  ok(Array.from(e.character ?? "").length === 1, `${label}: character must be a single kanji`);
  for (const field of ["onyomi", "kunyomi"] as const) {
    const v = e[field] ?? "";
    ok(v.trim() !== "", `${label}: ${field} must be non-empty ("-" allowed)`);
  }
  for (const field of ["meaning", "mnemonic", "exampleWord", "exampleRead", "exampleMean"] as const) {
    const v = e[field] ?? "";
    ok(v.trim() !== "" && v.trim() !== "-", `${label}: ${field} must be non-empty (and not "-")`);
  }
  ok(
    typeof e.strokeCount === "number" && Number.isInteger(e.strokeCount) && e.strokeCount > 0,
    `${label}: strokeCount must be a positive integer`
  );
  ok(e.level === "N3", `${label}: level must be "N3"`);
});

// --- (h) orders 1..63 unique ---
const orders = KANJI_N3B.map((e) => e.order);
ok(orders.every((o) => typeof o === "number"), "every entry needs a numeric order");
const orderNums = orders.filter((o): o is number => typeof o === "number");
const orderSet = new Set(orderNums);
ok(orderSet.size === orderNums.length, "duplicate order values found");
ok(orderNums.every((o) => o >= 1 && o <= 63), "orders must be within 1..63");
for (let n = 1; n <= 63; n++) ok(orderSet.has(n), `order ${n} missing`);

// --- report ---
for (const w of warnings) console.warn(`WARN: ${w}`);

if (errors.length === 0) {
  const overlapNote = excluded ? "no exclusion overlap" : "exclusion check skipped (missing file)";
  console.log(
    `PASS: KANJI_N3B validated — ${KANJI_N3B.length} entries, target set matched exactly, no duplicates, ${overlapNote}, all fields present, orders 1..63 unique.`
  );
} else {
  console.error(`FAIL: ${errors.length} problem(s):`);
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}
