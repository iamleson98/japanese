export type Level = "N5" | "N4" | "N3" | "all";

export const LEVELS: Level[] = ["N5", "N4", "N3"];

export const LEVEL_LABEL: Record<string, string> = {
  N5: "N5 · Beginner",
  N4: "N4 · Elementary",
  N3: "N3 · Intermediate",
  all: "All Levels",
};

export const LEVEL_DESC: Record<string, string> = {
  N5: "First steps — hiragana, katakana, basic greetings, simple verbs and particles.",
  N4: "Elementary — everyday conversation, conditionals, giving & receiving, polite nuance.",
  N3: "Intermediate — conjecture, nominalizers, complex sentences, abstract vocabulary.",
};

// Tailwind class fragments for level badges
export const LEVEL_BADGE: Record<string, string> = {
  N5: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 ring-1 ring-emerald-300/50",
  N4: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 ring-1 ring-amber-300/50",
  N3: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 ring-1 ring-rose-300/50",
  all: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-slate-300/50",
};

export const LEVEL_DOT: Record<string, string> = {
  N5: "bg-emerald-500",
  N4: "bg-amber-500",
  N3: "bg-rose-500",
  all: "bg-slate-400",
};

export function levelColor(level: string) {
  if (level === "N5") return "emerald";
  if (level === "N4") return "amber";
  if (level === "N3") return "rose";
  return "slate";
}

// Japanese kana helpers
export const ROW_LABEL: Record<string, string> = {
  vowels: "Vowels あ行",
  k: "K か行",
  s: "S さ行",
  t: "T た行",
  n: "N な行",
  h: "H は行",
  m: "M ま行",
  y: "Y や行",
  r: "R ら行",
  w: "W わ行",
  "n-solo": "N ん",
  dakuten: "Dakuten 濁点 (゛)",
  handakuten: "Handakuten 半濁点 (゜)",
  yoon: "Yōon 拗音 (small ya/yu/yo)",
};

// Simple text-to-speech using the browser's SpeechSynthesis API
// Best-effort: tries Japanese voice; falls back gracefully.
// BUGFIX: voices often load asynchronously — we cache + refresh on 'voiceschanged'.
let _jpVoice: SpeechSynthesisVoice | null | undefined = undefined;
let _voicesBound = false;

function getJapaneseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const synth = window.speechSynthesis;
  if (_jpVoice !== undefined) return _jpVoice;
  const voices = synth.getVoices();
  // Prefer a native ja-JP voice
  _jpVoice =
    voices.find((v) => v.lang === "ja-JP" && v.localService) ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ja")) ||
    null;
  if (!_voicesBound && typeof window !== "undefined") {
    _voicesBound = true;
    // Re-resolve when voices become available
    synth.onvoiceschanged = () => {
      _jpVoice = undefined;
    };
  }
  return _jpVoice;
}

export function speakJapanese(text: string, rate = 0.9) {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = rate;
    const jp = getJapaneseVoice();
    if (jp) u.voice = jp;
    synth.speak(u);
  } catch {
    // no-op
  }
}

// Warm up voice loading on client mount (call once from a top-level client component)
export function warmupSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  // Trigger voice loading
  window.speechSynthesis.getVoices();
  getJapaneseVoice();
}

// Furigana rendering: parses a Japanese string with optional reading hints.
// Returns an array of segments: { text, reading? }
// We auto-detect kanji runs and attach a reading if provided via `reading`.
// `reading` is the full kana reading of `text` (e.g. text="食べる", reading="たべる").
// We align the kanji portion(s) to the reading by greedy longest-match from the start.
export type FuriganaSegment = { text: string; reading?: string; isKanji: boolean };

const KANJI_RE = /[\u4e00-\u9faf\u3400-\u4dbf]/;

export function toFurigana(text: string, reading?: string | null): FuriganaSegment[] {
  if (!text) return [];
  if (!reading) {
    // No reading — return as a single segment
    return [{ text, isKanji: KANJI_RE.test(text) }];
  }
  // Walk through text, grouping kanji runs and matching them to reading chunks.
  const segments: FuriganaSegment[] = [];
  let textIdx = 0;
  let readIdx = 0;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (KANJI_RE.test(ch)) {
      // Start of a kanji run. Find the end of the run.
      let runEnd = i;
      while (runEnd < text.length && KANJI_RE.test(text[runEnd])) runEnd++;
      const kanjiRun = text.slice(i, runEnd);
      // The kana that follows the kanji run in `text` tells us where the reading for the kanji ends.
      // Greedy approach: find the next kana in text after the kanji run, then locate it in reading starting from readIdx.
      let nextKanaInText = "";
      if (runEnd < text.length) {
        // collect the next kana run
        let k = runEnd;
        while (k < text.length && !KANJI_RE.test(text[k])) {
          nextKanaInText += text[k];
          k++;
        }
      }
      let kanjiReading: string;
      if (nextKanaInText && reading.indexOf(nextKanaInText, readIdx) >= 0) {
        const pos = reading.indexOf(nextKanaInText, readIdx);
        kanjiReading = reading.slice(readIdx, pos);
        readIdx = pos;
      } else {
        // No following kana — take the rest of the reading
        kanjiReading = reading.slice(readIdx);
        readIdx = reading.length;
      }
      segments.push({ text: kanjiRun, reading: kanjiReading, isKanji: true });
      i = runEnd;
      textIdx = runEnd;
    } else {
      // Kana/punctuation run
      let runEnd = i;
      while (runEnd < text.length && !KANJI_RE.test(text[runEnd])) runEnd++;
      const kanaRun = text.slice(i, runEnd);
      segments.push({ text: kanaRun, isKanji: false });
      readIdx += kanaRun.length;
      i = runEnd;
      textIdx = runEnd;
    }
  }
  return segments;
}

// YouTube URL -> thumbnail
export function youtubeThumb(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.searchParams.get("v")) {
        const id = u.searchParams.get("v")!;
        return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.searchParams.get("v")) {
        const id = u.searchParams.get("v")!;
        return `https://www.youtube.com/embed/${id}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}
