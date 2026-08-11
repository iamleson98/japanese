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
export function speakJapanese(text: string) {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.9;
    // Prefer a Japanese voice if available
    const voices = synth.getVoices();
    const jp = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ja"));
    if (jp) u.voice = jp;
    synth.speak(u);
  } catch {
    // no-op
  }
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
