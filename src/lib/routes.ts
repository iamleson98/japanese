import type { SectionId } from "@/lib/store";

export type FlashcardRouteType = "vocabulary" | "kana" | "kanji" | "grammar";

export const SECTION_IDS = [
  "dashboard",
  "kana",
  "vocabulary",
  "grammar",
  "kanji",
  "flashcards",
  "resources",
  "counters",
  "conjugations",
  "lessons",
  "quiz",
] as const satisfies readonly SectionId[];

const FLASHCARD_ROUTE_TYPES = ["vocabulary", "kana", "kanji", "grammar"] as const;

export function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}

export function getSectionHref(section: SectionId): string {
  return section === "dashboard" ? "/" : `/${section}`;
}

export function isFlashcardRouteType(value: string | null): value is FlashcardRouteType {
  return value !== null && (FLASHCARD_ROUTE_TYPES as readonly string[]).includes(value);
}

export function getFlashcardsHref(type: FlashcardRouteType, level: string | null): string {
  const params = new URLSearchParams({ type });

  if (level) {
    params.set("level", level);
  }

  return `${getSectionHref("flashcards")}?${params.toString()}`;
}