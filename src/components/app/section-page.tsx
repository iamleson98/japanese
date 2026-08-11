"use client";

import { AppShell } from "@/components/app/app-shell";
import { ConjugationsSection } from "@/components/sections/conjugations";
import { CountersSection } from "@/components/sections/counters";
import { DashboardSection } from "@/components/sections/dashboard";
import { FlashcardsSection } from "@/components/sections/flashcards";
import { GrammarSection } from "@/components/sections/grammar";
import { KanaSection } from "@/components/sections/kana";
import { KanjiSection } from "@/components/sections/kanji";
import { LessonsSection } from "@/components/sections/lessons";
import { QuizSection } from "@/components/sections/quiz";
import { ResourcesSection } from "@/components/sections/resources";
import { VocabularySection } from "@/components/sections/vocabulary";
import type { SectionId } from "@/lib/store";

export function SectionPage({ section }: { section: SectionId }) {
  return (
    <AppShell section={section}>
      <div key={section} className="np-fade-in">
        {section === "dashboard" && <DashboardSection />}
        {section === "kana" && <KanaSection />}
        {section === "vocabulary" && <VocabularySection />}
        {section === "grammar" && <GrammarSection />}
        {section === "kanji" && <KanjiSection />}
        {section === "flashcards" && <FlashcardsSection />}
        {section === "resources" && <ResourcesSection />}
        {section === "counters" && <CountersSection />}
        {section === "conjugations" && <ConjugationsSection />}
        {section === "lessons" && <LessonsSection />}
        {section === "quiz" && <QuizSection />}
      </div>
    </AppShell>
  );
}