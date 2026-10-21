"use client";

import { create } from "zustand";

export type SectionId =
  | "dashboard"
  | "smart-study"
  | "kana"
  | "vocabulary"
  | "grammar"
  | "kanji"
  | "flashcards"
  | "resources"
  | "counters"
  | "conjugations"
  | "lessons"
  | "quiz"
  | "practice"
  | "mock-test";

export type FuriganaMode = "always" | "hover" | "never";
export type RomajiMode = "always" | "after-review" | "never";

type AppState = {
  // User learning preferences (persisted to localStorage)
  furiganaMode: FuriganaMode;
  romajiMode: RomajiMode;
  ttsRate: number; // 0.7 | 0.85 | 1.0 | 1.15
  showVietnamese: boolean; // display Vietnamese meanings alongside English
  dailyGoal: number; // reviews per day (persisted server-side too)
  desiredRetention: number; // FSRS target recall probability
  newPerDay: number; // new cards introduced per day (SRS research: 10-20 sustainable)
  reverseChallenge: boolean; // mature cards occasionally flip to EN->JP production recall
  setFuriganaMode: (m: FuriganaMode) => void;
  setRomajiMode: (m: RomajiMode) => void;
  setTtsRate: (r: number) => void;
  setShowVietnamese: (b: boolean) => void;
  setDailyGoal: (n: number) => void;
  setDesiredRetention: (r: number) => void;
  setNewPerDay: (n: number) => void;
  setReverseChallenge: (b: boolean) => void;
};

const LS_KEY = "np-prefs-v2";
type Prefs = {
  furiganaMode?: FuriganaMode;
  romajiMode?: RomajiMode;
  ttsRate?: number;
  showVietnamese?: boolean;
  dailyGoal?: number;
  desiredRetention?: number;
  newPerDay?: number;
  reverseChallenge?: boolean;
};

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) {
      // migrate v1 prefs if present
      const v1 = window.localStorage.getItem("np-prefs-v1");
      if (v1) {
        try {
          return { ...JSON.parse(v1), showVietnamese: true };
        } catch {}
      }
      return {};
    }
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
  furiganaMode: "always",
  romajiMode: "always",
  ttsRate: 0.9,
  showVietnamese: true,
  dailyGoal: 20,
  desiredRetention: 0.9,
  newPerDay: 10,
  reverseChallenge: true,
  setFuriganaMode: (m) => {
    set({ furiganaMode: m });
    savePrefs({ ...loadPrefs(), furiganaMode: m });
  },
  setRomajiMode: (m) => {
    set({ romajiMode: m });
    savePrefs({ ...loadPrefs(), romajiMode: m });
  },
  setTtsRate: (r) => {
    set({ ttsRate: r });
    savePrefs({ ...loadPrefs(), ttsRate: r });
  },
  setShowVietnamese: (b) => {
    set({ showVietnamese: b });
    savePrefs({ ...loadPrefs(), showVietnamese: b });
  },
  setDailyGoal: (n) => {
    set({ dailyGoal: n });
    savePrefs({ ...loadPrefs(), dailyGoal: n });
    // persist server-side (guest stats)
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "dailyGoal", value: n }),
    }).catch(() => {});
  },
  setDesiredRetention: (r) => {
    set({ desiredRetention: r });
    savePrefs({ ...loadPrefs(), desiredRetention: r });
  },
  setNewPerDay: (n) => {
    set({ newPerDay: n });
    savePrefs({ ...loadPrefs(), newPerDay: n });
  },
  setReverseChallenge: (b) => {
    set({ reverseChallenge: b });
    savePrefs({ ...loadPrefs(), reverseChallenge: b });
  },
  // Initialize from localStorage on client
  ...((typeof window !== "undefined" ? loadPrefs() : {}) as Prefs),
}));
