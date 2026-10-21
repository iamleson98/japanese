/** Romaji→kana converter tests. */
import { romajiToKana, matchesReading } from "../src/lib/romaji";

const cases: [string, string][] = [
  ["a", "あ"],
  ["konnichiwa", "こんにちわ"],
  ["konnichiha", "こんにちは"],
  ["arigatou", "ありがとう"],
  ["sumimasen", "すみません"],
  ["nihongo", "にほんご"],
  ["toukyou", "とうきょう"],
  ["kyou", "きょう"],
  ["ryokou", "りょこう"],
  ["shinbun", "しんぶん"],
  ["ganbatte", "がんばって"],
  ["kippu", "きっぷ"],
  ["zasshi", "ざっし"],
  ["itchi", "いっち"],
  ["atchi", "あっち"],
  ["senpai", "せんぱい"],
  ["nihon", "にほん"],
  ["n'ko", "んこ"],
  ["nn", "ん"],
  ["sha", "しゃ"],
  ["shu", "しゅ"],
  ["ja", "じゃ"],
  ["cha", "ちゃ"],
  ["chu", "ちゅ"],
  ["cho", "ちょ"],
  ["desu", "です"],
  ["ohayou", "おはよう"],
  ["tsukue", "つくえ"],
  ["gakkou", "がっこう"],
  ["hyaku", "ひゃく"],
  ["byouin", "びょういん"],
  ["ryokou", "りょこう"],
  ["kon'nichiwa", "こんにちわ"],
  ["tempura", "てんぷら"],
  ["kanji", "かんじ"],
  ["onigiri", "おにぎり"],
  ["hiragana", "ひらがな"],
  ["katakana", "かたかな"],
  ["fuji", "ふじ"],
  ["hito", "ひと"],
];

let fails = 0;
for (const [romaji, kana] of cases) {
  const got = romajiToKana(romaji);
  const ok = got === kana;
  if (!ok) {
    fails++;
    console.log(`✗ romajiToKana("${romaji}") = "${got}" (expected "${kana}")`);
  }
}

// matchesReading checks
const matchCases: [string, string, boolean][] = [
  ["konnichiwa", "こんにちは", true], // particle は→わ
  ["konnichiha", "こんにちは", true],
  ["arigatou", "ありがとう", true],
  ["toukyou", "とうきょう", true],
  ["きょう", "きょう", true], // direct kana input
  ["wrong", "ありがとう", false],
  ["michi", "みち", true],
  ["e", "え", true],
  ["kouen", "こうえん", true],
  ["miti", "みち", true], // ti spelling
];
for (const [typed, expected, want] of matchCases) {
  const got = matchesReading(typed, expected);
  if (got !== want) {
    fails++;
    console.log(`✗ matchesReading("${typed}", "${expected}") = ${got} (want ${want})`);
  }
}

console.log(fails === 0 ? `✓ all ${cases.length + matchCases.length} romaji tests pass` : `${fails} failures`);
process.exitCode = fails === 0 ? 0 : 1;
