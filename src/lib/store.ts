"use client";

import { create } from "zustand";

export type SectionId =
  | "dashboard"
  | "kana"
  | "vocabulary"
  | "grammar"
  | "kanji"
  | "flashcards"
  | "resources"
  | "counters"
  | "conjugations"
  | "lessons"
  | "quiz";

export type FuriganaMode = "always" | "hover" | "never";
export type RomajiMode = "always" | "after-review" | "never";

type AppState = {
  section: SectionId;
  setSection: (s: SectionId) => void;
  // secondary state for flashcards routing
  flashcardType: "vocabulary" | "kana" | "kanji" | "grammar";
  flashcardLevel: string | null;
  startReview: (
    type: "vocabulary" | "kana" | "kanji" | "grammar",
    level: string | null
  ) => void;
  // User learning preferences (persisted to localStorage)
  furiganaMode: FuriganaMode;
  romajiMode: RomajiMode;
  ttsRate: number; // 0.7 | 0.85 | 1.0 | 1.15
  setFuriganaMode: (m: FuriganaMode) => void;
  setRomajiMode: (m: RomajiMode) => void;
  setTtsRate: (r: number) => void;
};

const LS_KEY = "np-prefs-v1";
type Prefs = { furiganaMode?: FuriganaMode; romajiMode?: RomajiMode; ttsRate?: number };

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Prefs;
  } catch {
    return {};
  }
}

function savePrefs(p: Prefs) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(p));
  } catch {}
}

export const useApp = create<AppState>((set, get) => ({
  section: "dashboard",
  setSection: (s) => set({ section: s }),
  flashcardType: "vocabulary",
  flashcardLevel: null,
  startReview: (type, level) =>
    set({ flashcardType: type, flashcardLevel: level, section: "flashcards" }),
  furiganaMode: "always",
  romajiMode: "always",
  ttsRate: 0.9,
  setFuriganaMode: (m) => {
    set({ furiganaMode: m });
    const cur = loadPrefs();
    savePrefs({ ...cur, furiganaMode: m });
  },
  setRomajiMode: (m) => {
    set({ romajiMode: m });
    const cur = loadPrefs();
    savePrefs({ ...cur, romajiMode: m });
  },
  setTtsRate: (r) => {
    set({ ttsRate: r });
    const cur = loadPrefs();
    savePrefs({ ...cur, ttsRate: r });
  },
  // Initialize from localStorage on client
  ...((typeof window !== "undefined" ? loadPrefs() : {}) as Prefs),
}));
