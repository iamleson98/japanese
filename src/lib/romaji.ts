/**
 * Romaji → hiragana converter for typing (production) drills.
 * Implements standard IME-style rules:
 *  - greedy longest-syllable matching (3 → 2 → 1 chars)
 *  - sokuon っ from doubled consonants (kk, ss, tt, pp…) and "tch"
 *  - syllabic ん: "n" before a consonant, "nn", or "n'"
 *  - alternative spellings: shi/si, chi/ti, tsu/tu, ji/zi, fu/hu, sha/sya, cha/tya, ja/jya…
 */

const DIGRAPHS: Record<string, string> = {
  kya: "きゃ", kyu: "きゅ", kyo: "きょ",
  gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",
  sha: "しゃ", shu: "しゅ", sho: "しょ",
  sya: "しゃ", syu: "しゅ", syo: "しょ",
  ja: "じゃ", ju: "じゅ", jo: "じょ",
  jya: "じゃ", jyu: "じゅ", jyo: "じょ",
  zya: "じゃ", zyu: "じゅ", zyo: "じょ",
  cha: "ちゃ", chu: "ちゅ", cho: "ちょ",
  cya: "ちゃ", cyu: "ちゅ", cyo: "ちょ",
  tya: "ちゃ", tyu: "ちゅ", tyo: "ちょ",
  nya: "にゃ", nyu: "にゅ", nyo: "にょ",
  hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ",
  bya: "びゃ", byu: "びゅ", byo: "びょ",
  pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",
  mya: "みゃ", myu: "みゅ", myo: "みょ",
  rya: "りゃ", ryu: "りゅ", ryo: "りょ",
  fa: "ふぁ", fi: "ふぃ", fe: "ふぇ", fo: "ふぉ",
};

const SYLLABLES: Record<string, string> = {
  a: "あ", i: "い", u: "う", e: "え", o: "お",
  ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",
  sa: "さ", shi: "し", si: "し", su: "す", se: "せ", so: "そ",
  ta: "た", chi: "ち", ti: "ち", tsu: "つ", tu: "つ", te: "て", to: "と",
  na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の",
  ha: "は", hi: "ひ", fu: "ふ", hu: "ふ", he: "へ", ho: "ほ",
  ma: "ま", mi: "み", mu: "む", me: "め", mo: "も",
  ya: "や", yu: "ゆ", yo: "よ",
  ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ",
  wa: "わ", wo: "を",
  ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",
  za: "ざ", ji: "じ", zi: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",
  da: "だ", di: "ぢ", du: "づ", de: "で", do: "ど",
  ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ",
  pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",
  vu: "ゔ",
};

const VOWELS = new Set(["a", "i", "u", "e", "o"]);

function isConsonant(c: string): boolean {
  return /[bcdfghjklmnpqrstvwxyz]/.test(c);
}

/** Convert a romaji string to hiragana. Unknown chars are dropped. */
export function romajiToKana(input: string): string {
  const s = input.toLowerCase().replace(/[^a-z']/g, "");
  let out = "";
  let i = 0;

  while (i < s.length) {
    // "n'" → ん
    if (s[i] === "n" && s[i + 1] === "'") {
      out += "ん";
      i += 2;
      continue;
    }
    // "nn" at end of input → single ん
    if (s[i] === "n" && s[i + 1] === "n" && i + 2 >= s.length) {
      out += "ん";
      i += 2;
      continue;
    }
    // "nn" followed by more → ん then the next n starts ni/na/…
    if (s[i] === "n" && s[i + 1] === "n") {
      out += "ん";
      i += 1;
      continue;
    }
    // "n" before a consonant → ん
    if (s[i] === "n" && (i + 1 >= s.length || (isConsonant(s[i + 1]) && s[i + 1] !== "y" && s[i + 1] !== "n"))) {
      out += "ん";
      i += 1;
      continue;
    }
    // Hepburn "m" before b/p/m → ん (e.g. tempura, shimbun)
    if (s[i] === "m" && (s[i + 1] === "b" || s[i + 1] === "p" || s[i + 1] === "m")) {
      out += "ん";
      i += 1;
      continue;
    }
    // "t" before "chi" → sokuon っ, then ち matches naturally (itchi → いっち)
    if (s[i] === "t" && s.startsWith("chi", i + 1)) {
      out += "っ";
      i += 1;
      continue;
    }
    // sokuon: doubled consonant → っ
    const c = s[i];
    if (isConsonant(c) && c !== "n" && s[i + 1] === c) {
      out += "っ";
      i += 1;
      continue;
    }

    // greedy syllable match: 3 → 2 → 1
    const three = s.slice(i, i + 3);
    const two = s.slice(i, i + 2);
    const one = s.slice(i, i + 1);
    if (DIGRAPHS[three]) {
      out += DIGRAPHS[three];
      i += 3;
    } else if (SYLLABLES[three]) { // 3-char syllables: chi, tsu, shi
      out += SYLLABLES[three];
      i += 3;
    } else if (SYLLABLES[two]) {
      out += SYLLABLES[two];
      i += 2;
    } else if (SYLLABLES[one]) {
      out += SYLLABLES[one];
      i += 1;
    } else {
      // unknown cluster — skip one char
      i += 1;
    }
  }
  return out;
}

const KANA_NORMALIZE_RE = /[\s\-_.、。,.'"・ー]/g;

export function normalizeKana(s: string): string {
  return s.replace(KANA_NORMALIZE_RE, "").trim();
}

/**
 * Check a typed answer against an expected kana reading.
 * Accepts: exact kana match, romaji→kana match, or particle-orthography
 * equivalence (は≈わ, へ≈え, を≈お) so "konnichiwa" matches こんにちは.
 */
export function matchesReading(typed: string, expectedKana: string): boolean {
  const expected = normalizeKana(expectedKana);
  let typedKana: string;
  if (/[\u3040-\u30ff]/.test(typed)) {
    typedKana = normalizeKana(typed); // user typed kana directly
  } else {
    typedKana = romajiToKana(typed); // romaji input
  }
  if (typedKana === expected) return true;
  // particle pronunciation fallbacks
  const variants = [
    expected.replace(/は/g, "わ"),
    expected.replace(/へ/g, "え"),
    expected.replace(/を/g, "お"),
    expected.replace(/は/g, "わ").replace(/を/g, "お"),
  ];
  return variants.includes(typedKana);
}
