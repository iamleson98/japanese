"use client";

import * as React from "react";
import {
  cn,
  Flame,
  Brain,
  Layers3,
  CheckCircle2,
  Target,
  Sparkles,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Languages,
  Type,
  Calendar,
  Hash,
  Repeat,
  Route,
  ListChecks,
  Volume2,
} from "@/components/app/imports";
import { useApp } from "@/lib/store";
import { SectionHeader, StatCard, LevelPathCard } from "./_primitives";
import { LEVEL_DESC, speakJapanese } from "@/lib/sections/shared";
import { Furigana } from "@/components/app/furigana";

type Dash = {
  counts: { kana: number; vocabulary: number; grammar: number; kanji: number; counters: number; conjugations: number; resources: number };
  progress: { learned: number; due: number; totalReviewed: number; streak: number; byType: Record<string, number>; learnedByLevel: Record<string, number>; totalByLevel: Record<string, number> };
  activity: { date: string; count: number }[];
};

export function DashboardSection() {
  const setSection = useApp((s) => s.setSection);
  const startReview = useApp((s) => s.startReview);
  const [data, setData] = React.useState<Dash | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const learned = data?.progress.learned ?? 0;
  const due = data?.progress.due ?? 0;
  const totalReviewed = data?.progress.totalReviewed ?? 0;
  const streak = data?.progress.streak ?? 0;

  const learnedByLevel = data?.progress.learnedByLevel ?? { N5: 0, N4: 0, N3: 0 };
  const totalByLevel = data?.progress.totalByLevel ?? { N5: 0, N4: 0, N3: 0 };

  const pathCards = [
    {
      level: "N5" as const,
      learned: learnedByLevel.N5 ?? 0,
      total: totalByLevel.N5 ?? 0,
      description: LEVEL_DESC.N5,
      onStart: () => setSection("kana"),
      onReview: () => startReview("vocabulary", "N5"),
    },
    {
      level: "N4" as const,
      learned: learnedByLevel.N4 ?? 0,
      total: totalByLevel.N4 ?? 0,
      description: LEVEL_DESC.N4,
      onStart: () => setSection("grammar"),
      onReview: () => startReview("vocabulary", "N4"),
    },
    {
      level: "N3" as const,
      learned: learnedByLevel.N3 ?? 0,
      total: totalByLevel.N3 ?? 0,
      description: LEVEL_DESC.N3,
      onStart: () => setSection("grammar"),
      onReview: () => startReview("vocabulary", "N3"),
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card np-hero-grad mb-8">
        <div className="relative p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Your path from あ to intermediate Japanese
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
            Learn Japanese, <span className="font-jp">少しずつ</span>.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
            A complete N5 → N3 study companion — kana, vocabulary, grammar, kanji, and
            spaced-repetition flashcards, each linked to hand-picked YouTube lessons.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setSection("kana")}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition"
            >
              <Type className="h-4 w-4" />
              Start with Kana
            </button>
            <button
              onClick={() => startReview("vocabulary", null)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent transition"
            >
              <Layers3 className="h-4 w-4" />
              Review due cards {due > 0 && `(${due})`}
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <StatCard
          label="Cards learned"
          value={loading ? "—" : learned}
          hint="across all decks"
          icon={Brain}
          accent="primary"
        />
        <StatCard
          label="Due today"
          value={loading ? "—" : due}
          hint="ready to review"
          icon={Target}
          accent="rose"
        />
        <StatCard
          label="Total reviews"
          value={loading ? "—" : totalReviewed}
          hint="all time"
          icon={CheckCircle2}
          accent="emerald"
        />
        <StatCard
          label="Day streak"
          value={loading ? "—" : streak}
          hint="keep it alive"
          icon={Flame}
          accent="amber"
        />
      </section>

      {/* Activity chart */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Last 7 days
            </h2>
            <p className="text-sm text-muted-foreground">Cards reviewed per day</p>
          </div>
        </div>
        <ActivityChart data={data?.activity ?? []} />
      </section>

      {/* Learning path */}
      <section className="mb-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Learning path</h2>
            <p className="text-sm text-muted-foreground">JLPT levels, beginner to intermediate</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pathCards.map((p) => (
            <LevelPathCard key={p.level} {...p} />
          ))}
        </div>
      </section>

      {/* Word of the day + Quick links */}
      <section className="grid gap-4 lg:grid-cols-3 mb-8">
        <WordOfDay />
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          <QuickLink
            icon={Route}
            label="Lessons"
            jp="コース"
            desc="Guided study path N5→N3"
            onClick={() => setSection("lessons")}
          />
          <QuickLink
            icon={ListChecks}
            label="Quiz"
            jp="クイズ"
            desc="Test yourself JLPT-style"
            onClick={() => setSection("quiz")}
          />
          <QuickLink
            icon={Repeat}
            label="Conjugation"
            jp="活用"
            desc={`${data?.counts.conjugations ?? "—"} verb & adj paradigms`}
            onClick={() => setSection("conjugations")}
          />
          <QuickLink
            icon={Hash}
            label="Counters"
            jp="助数詞"
            desc={`${data?.counts.counters ?? "—"} counters with sound changes`}
            onClick={() => setSection("counters")}
          />
        </div>
      </section>

      {/* More content */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink
          icon={Type}
          label="Kana chart"
          jp="仮名"
          desc="Hiragana & katakana with audio"
          onClick={() => setSection("kana")}
        />
        <QuickLink
          icon={BookOpen}
          label="Vocabulary"
          jp="単語"
          desc={`${data?.counts.vocabulary ?? "—"} words across N5–N3`}
          onClick={() => setSection("vocabulary")}
        />
        <QuickLink
          icon={Languages}
          label="Grammar"
          jp="文法"
          desc={`${data?.counts.grammar ?? "—"} grammar points`}
          onClick={() => setSection("grammar")}
        />
        <QuickLink
          icon={GraduationCap}
          label="Kanji"
          jp="漢字"
          desc={`${data?.counts.kanji ?? "—"} characters`}
          onClick={() => setSection("kanji")}
        />
      </section>
    </div>
  );
}

function WordOfDay() {
  const [word, setWord] = React.useState<{
    word: string; reading: string; meaning: string; exampleJp: string | null; exampleEn: string | null; level: string;
  } | null>(null);

  React.useEffect(() => {
    fetch("/api/word-of-day")
      .then((r) => r.json())
      .then((d) => setWord(d.word ?? null))
      .catch(() => {});
  }, []);

  if (!word) {
    return <div className="rounded-xl border border-border bg-card p-4 animate-pulse h-40" />;
  }

  return (
    <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-amber-50/30 dark:from-primary/10 dark:to-amber-950/20 p-5">
      <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide mb-3">
        <Calendar className="h-3.5 w-3.5" />
        Word of the day
      </div>
      <div className="flex items-baseline gap-2">
        <Furigana text={word.word} reading={word.reading} className="text-3xl font-semibold" />
        <button
          onClick={() => speakJapanese(word.word)}
          className="text-muted-foreground hover:text-primary transition"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-1 text-sm text-foreground/90">{word.meaning}</p>
      {word.exampleJp && (
        <div className="mt-3 text-sm">
          <Furigana text={word.exampleJp} reading={word.reading} className="leading-snug" />
          {word.exampleEn && <p className="text-xs text-muted-foreground mt-1">{word.exampleEn}</p>}
        </div>
      )}
    </div>
  );
}

function QuickLink({
  icon: Icon,
  label,
  jp,
  desc,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  jp: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="font-semibold">{label}</h3>
        <span className="font-jp text-sm text-muted-foreground">{jp}</span>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
    </button>
  );
}

function ActivityChart({ data }: { data: { date: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d) => {
        const h = Math.round((d.count / max) * 100);
        const day = new Date(d.date + "T00:00:00");
        const label = day.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1);
        const today = new Date().toISOString().slice(0, 10) === d.date;
        return (
          <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="text-[11px] tabular-nums text-muted-foreground">
              {d.count > 0 ? d.count : ""}
            </div>
            <div className="w-full flex-1 flex items-end">
              <div
                className={cn(
                  "w-full rounded-md transition-all",
                  today ? "bg-primary" : "bg-primary/35 hover:bg-primary/55"
                )}
                style={{ height: `${Math.max(2, h)}%` }}
                title={`${d.date}: ${d.count} cards`}
              />
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
