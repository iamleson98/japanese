"use client";

import { AppShell } from "@/components/app/app-shell";
import { useApp } from "@/lib/store";
import { DashboardSection } from "@/components/sections/dashboard";
import { KanaSection } from "@/components/sections/kana";
import { VocabularySection } from "@/components/sections/vocabulary";
import { GrammarSection } from "@/components/sections/grammar";
import { KanjiSection } from "@/components/sections/kanji";
import { FlashcardsSection } from "@/components/sections/flashcards";
import { ResourcesSection } from "@/components/sections/resources";

export default function Home() {
  const section = useApp((s) => s.section);

  return (
    <AppShell>
      <div key={section} className="np-fade-in">
        {section === "dashboard" && <DashboardSection />}
        {section === "kana" && <KanaSection />}
        {section === "vocabulary" && <VocabularySection />}
        {section === "grammar" && <GrammarSection />}
        {section === "kanji" && <KanjiSection />}
        {section === "flashcards" && <FlashcardsSection />}
        {section === "resources" && <ResourcesSection />}
      </div>
    </AppShell>
  );
}
