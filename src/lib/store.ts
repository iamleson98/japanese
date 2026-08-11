"use client";

import { create } from "zustand";

export type SectionId =
  | "dashboard"
  | "kana"
  | "vocabulary"
  | "grammar"
  | "kanji"
  | "flashcards"
  | "resources";

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
};

export const useApp = create<AppState>((set) => ({
  section: "dashboard",
  setSection: (s) => set({ section: s }),
  flashcardType: "vocabulary",
  flashcardLevel: null,
  startReview: (type, level) =>
    set({ flashcardType: type, flashcardLevel: level, section: "flashcards" }),
}));
