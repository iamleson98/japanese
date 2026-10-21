"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  Headphones,
  Trophy,
  Zap,
  Gauge,
  Keyboard,
  Clock,
} from "@/components/app/imports";
import { StatCard, LevelPathCard } from "./_primitives";
import { LEVEL_DESC, speakJapanese } from "@/lib/sections/shared";
import { Furigana } from "@/components/app/furigana";
import { getFlashcardsHref, getSectionHref } from "@/lib/routes";

type Dash = {
  counts: { kana: number; vocabulary: number; grammar: number; kanji: number; counters: number; conjugations: number; resources: number; passages: number };
  progress: {
    learned: number; due: number; totalReviewed: number; streak: number;
    xp: number; dailyGoal: number; todayActivity: number;
    byType: Record<string, number>;
    learnedByLevel: Record<string, number>; totalByLevel: Record<string, number>;
    trueRetention: number | null; avgRecall: number | null;
  };
  forecast: { day: number; label: string; count: number }[];
  activity: { date: string; count: number }[];
  recentMock: { level: string; totalScore: number; passed: boolean; createdAt: string }[];
};

const LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;

function xpLevel(xp: number): { level: number; into: number; span: number } {
  // each level costs 100 XP more than the last: L1=0, L2=100, L3=300, L4=600…
  let level = 1;
  let remaining = xp;
  let span = 100;
  while (remaining >= span) {
    remaining -= span;
    level++;
    span += 100;
  }
  return { level, into: remaining, span };
}

export function DashboardSection() {
  const router = useRouter();
  const [data, setData] = React.useState<Dash | null>(null);
  const [session, setSession] = React.useState<{
    minutes: number;
    reviews: number;
    newCards: number;
    completed: boolean;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
    fetch("/api/smart-session?newPerDay=10")
      .then((r) => r.json())
      .then((d) =>
        setSession({
          minutes: d?.plan?.minutes ?? 12,
          reviews: Math.min(d?.plan?.reviews?.total ?? 0, 40),
          newCards: d?.plan?.newCards?.count ?? 0,
          completed: Boolean(d?.today?.completed),
        }),
      )
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const learned = data?.progress.learned ?? 0;
  const due = data?.progress.due ?? 0;
  const totalReviewed = data?.progress.totalReviewed ?? 0;
  const streak = data?.progress.streak ?? 0;
  const xp = data?.progress.xp ?? 0;
  const goal = data?.progress.dailyGoal ?? 20;
  const todayActivity = data?.progress.todayActivity ?? 0;
  const xpInfo = xpLevel(xp);
  const goalPct = Math.min(100, Math.round((todayActivity / Math.max(1, goal)) * 100));

  const learnedByLevel = data?.progress.learnedByLevel ?? {};
  const totalByLevel = data?.progress.totalByLevel ?? {};

  const pathCards = LEVELS.map((level) => ({
    level,
    learned: learnedByLevel[level] ?? 0,
    total: totalByLevel[level] ?? 0,
    description: LEVEL_DESC[level] ?? "",
    onStart: () =>
      router.push(
        level === "N5" ? getSectionHref("kana") : level === "N4" ? getSectionHref("grammar") : getSectionHref("grammar"),
      ),
    onReview: () => router.push(getFlashcardsHref("vocabulary", level)),
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card np-hero-grad mb-8">
        <div className="relative p-6 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Your path from あ to advanced Japanese — FSRS-powered
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
            Learn Japanese, <span className="font-jp">少しずつ</span>.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl">
            A complete N5 → N1 study companion — {data?.counts.vocabulary.toLocaleString() ?? "—"} words,{" "}
            {data?.counts.grammar ?? "—"} grammar points, {data?.counts.kanji ?? "—"} kanji, listening &amp; reading
            dojo, and a state-of-the-art spaced-repetition scheduler.
          </p>
          {/* Smart session summary chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 dark:bg-background/40 border border-border px-3 py-1 font-medium">
              <Brain className="h-3.5 w-3.5 text-primary" />
              {session ? `${session.reviews} reviews` : "— reviews"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 dark:bg-background/40 border border-border px-3 py-1 font-medium">
              <Layers3 className="h-3.5 w-3.5 text-primary" />
              {session ? `${session.newCards} new` : "— new"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 dark:bg-background/40 border border-border px-3 py-1 font-medium">
              <Languages className="h-3.5 w-3.5 text-primary" />
              grammar · dojo · quiz
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 dark:bg-background/40 border border-border px-3 py-1 font-medium">
              <Clock className="h-3.5 w-3.5 text-primary" />
              ~{session ? session.minutes : 12} min
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => router.push(getSectionHref("smart-study"))}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition"
            >
              <Zap className="h-5 w-5" />
              {session?.completed ? "Study more" : "Start today's session"}
              {due > 0 && !session?.completed ? ` · ${due} due` : ""}
            </button>
            <button
              onClick={() => router.push(getFlashcardsHref("vocabulary", null))}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent transition"
            >
              <Layers3 className="h-4 w-4" />
              Review due cards {due > 0 && `(${due})`}
            </button>
            <button
              onClick={() => router.push(getSectionHref("mock-test"))}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent transition"
            >
              <Trophy className="h-4 w-4" />
              JLPT Mock Test
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground max-w-xl">
            One guided session — reviews, new words, grammar, listening with shadowing, and a quiz, interleaved in the order memory research says works best.
          </p>
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

      {/* Daily goal + XP + forecast */}
      <section className="grid gap-4 lg:grid-cols-3 mb-8">
        {/* Goal ring */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex items-center gap-5">
          <div className="relative h-28 w-28 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                className={goalPct >= 100 ? "text-emerald-500" : "text-primary"}
                strokeDasharray={`${(goalPct / 100) * 264} 264`}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center rotate-0">
              <div className="text-center">
                <div className="text-2xl font-bold tabular-nums leading-none">{goalPct}%</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-0.5">daily goal</div>
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold flex items-center gap-1.5">
              <Target className="h-4 w-4 text-primary" />
              Today&apos;s goal
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground tabular-nums">{todayActivity}</span> / {goal} reviews today
            </p>
            {goalPct >= 100 ? (
              <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-300">
                Goal complete — えらい！ Great work.
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                {Math.max(0, goal - todayActivity)} more to go — {due > 0 ? `${due} due now` : "learn new cards"}
              </p>
            )}
          </div>
        </div>

        {/* XP / level */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              Level {xpInfo.level}
            </h3>
            <span className="text-sm text-muted-foreground tabular-nums">{xp.toLocaleString()} XP</span>
          </div>
          <div className="mt-3 h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all"
              style={{ width: `${(xpInfo.into / xpInfo.span) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {xpInfo.span - xpInfo.into} XP to level {xpInfo.level + 1} · earn XP from reviews, quizzes, dojo &amp; mock
            tests
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Gauge className="h-3.5 w-3.5" />
            {data?.progress.avgRecall != null
              ? `Predicted recall of your deck: ${Math.round((data.progress.avgRecall ?? 0) * 100)}%`
              : "Start reviewing to see memory predictions"}
            {data?.progress.trueRetention != null && (
              <span className="ml-1">
                · actual: {Math.round((data.progress.trueRetention ?? 0) * 100)}%
              </span>
            )}
          </div>
        </div>

        {/* Forecast */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-semibold flex items-center gap-1.5 mb-1">
            <Calendar className="h-4 w-4 text-primary" />
            Review forecast
          </h3>
          <p className="text-xs text-muted-foreground mb-3">Cards coming due, next 7 days</p>
          <ForecastChart data={data?.forecast ?? []} />
        </div>
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
            <p className="text-sm text-muted-foreground">JLPT levels, beginner to advanced</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
            icon={Headphones}
            label="Listening & Reading"
            jp="聴読"
            desc={`${data?.counts.passages ?? "—"} graded passages with questions`}
            onClick={() => router.push(getSectionHref("practice"))}
          />
          <QuickLink
            icon={Trophy}
            label="Mock Test"
            jp="模試"
            desc="Timed 3-section JLPT exam, 180 pts"
            onClick={() => router.push(getSectionHref("mock-test"))}
          />
          <QuickLink
            icon={Route}
            label="Lessons"
            jp="コース"
            desc="Guided study path N5→N3"
            onClick={() => router.push(getSectionHref("lessons"))}
          />
          <QuickLink
            icon={Keyboard}
            label="Quiz + Typing"
            jp="クイズ"
            desc="MCQ or type-the-answer drills"
            onClick={() => router.push(getSectionHref("quiz"))}
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
          onClick={() => router.push(getSectionHref("kana"))}
        />
        <QuickLink
          icon={BookOpen}
          label="Vocabulary"
          jp="単語"
          desc={`${data?.counts.vocabulary.toLocaleString() ?? "—"} words N5–N1`}
          onClick={() => router.push(getSectionHref("vocabulary"))}
        />
        <QuickLink
          icon={Languages}
          label="Grammar"
          jp="文法"
          desc={`${data?.counts.grammar ?? "—"} grammar points`}
          onClick={() => router.push(getSectionHref("grammar"))}
        />
        <QuickLink
          icon={GraduationCap}
          label="Kanji"
          jp="漢字"
          desc={`${data?.counts.kanji ?? "—"} characters`}
          onClick={() => router.push(getSectionHref("kanji"))}
        />
      </section>
    </div>
  );
}

function WordOfDay() {
  const [word, setWord] = React.useState<{
    word: string; reading: string; meaning: string; viMeaning?: string | null; exampleJp: string | null; exampleEn: string | null; level: string;
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
      {word.viMeaning && <p className="text-xs text-muted-foreground italic mt-0.5">{word.viMeaning}</p>}
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

function ForecastChart({ data }: { data: { day: number; label: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex items-end gap-1.5 h-24">
      {data.map((d) => {
        const h = Math.round((d.count / max) * 100);
        return (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-[10px] tabular-nums text-muted-foreground">{d.count > 0 ? d.count : ""}</div>
            <div className="w-full flex-1 flex items-end">
              <div
                className={cn(
                  "w-full rounded transition-all",
                  d.day === 0 ? "bg-rose-400" : "bg-sky-300 dark:bg-sky-700 hover:bg-sky-400"
                )}
                style={{ height: `${Math.max(2, h)}%` }}
                title={`${d.day === 0 ? "Today" : d.label}: ${d.count} due`}
              />
            </div>
            <div className="text-[10px] font-medium text-muted-foreground">
              {d.day === 0 ? "Today" : d.label.slice(0, 2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
