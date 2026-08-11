"use client";

import * as React from "react";
import { cn, Hash, Volume2, Lightbulb } from "@/components/app/imports";
import { SectionHeader, LevelTabs, EmptyState } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";

type Counter = {
  id: string;
  kanji: string;
  reading: string;
  meaning: string;
  level: string;
  one: string; two: string; three: string; four: string; five: string;
  six: string; seven: string; eight: string; nine: string; ten: string;
  exampleJp: string | null;
  exampleEn: string | null;
  note: string | null;
  order: number;
};

const NUMS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"] as const;
const NUM_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const NUM_KANJI = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

export function CountersSection() {
  const [level, setLevel] = React.useState("N5");
  const [items, setItems] = React.useState<Counter[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/counters?level=${level}`)
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .finally(() => setLoading(false));
  }, [level]);

  return (
    <div>
      <SectionHeader
        eyebrow="Counting things"
        title="Counters"
        jp="助数詞"
        description="Japanese uses different counters for different shapes/categories of objects. The biggest gotcha: sound changes. 本 → いっぽん / にほん / さんぼん. Learn the patterns once and you've got them forever."
      />
      <div className="mb-5">
        <LevelTabs value={level} onChange={setLevel} />
      </div>
      <div className="mb-3 text-sm text-muted-foreground">
        {loading ? "Loading…" : `${items.length} counters`}
      </div>
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-44 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={Hash} title="No counters found" />
      ) : (
        <div className="space-y-4">
          {items.map((c) => (
            <CounterCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function CounterCard({ c }: { c: Counter }) {
  const [showNote, setShowNote] = React.useState(false);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 sm:p-5 flex flex-wrap items-start gap-4">
        <div className="flex items-center gap-3 min-w-[140px]">
          <span className="font-jp text-4xl font-medium leading-none">{c.kanji}</span>
          <button
            onClick={() => speakJapanese(c.kanji + " " + c.reading)}
            className="text-muted-foreground hover:text-primary transition"
            title="Pronounce"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-jp text-lg font-semibold">{c.reading}</span>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">{c.level}</span>
          </div>
          <p className="text-sm text-foreground/80">{c.meaning}</p>
        </div>
        {c.note && (
          <button
            onClick={() => setShowNote((s) => !s)}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition",
              showNote ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" : "bg-muted hover:bg-accent"
            )}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            Note
          </button>
        )}
      </div>

      {/* Sound-change grid */}
      <div className="px-4 sm:px-5 pb-3">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {NUMS.map((key, i) => {
            const val = c[key];
            // Detect sound change (highlight if reading differs from base reading pattern)
            const changed = i === 0 || i === 2 || i === 5 || i === 7 || i === 9; // 1, 3, 6, 8, 10 commonly change
            return (
              <div
                key={key}
                className={cn(
                  "rounded-lg p-2 text-center border",
                  changed
                    ? "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800"
                    : "bg-muted/40 border-border"
                )}
              >
                <div className="text-[10px] text-muted-foreground">{NUM_KANJI[i]}</div>
                <button
                  onClick={() => speakJapanese(val)}
                  className="block w-full font-jp text-sm font-medium hover:text-primary transition"
                  title="Pronounce"
                >
                  {val}
                </button>
                <div className="text-[9px] text-muted-foreground">{NUM_LABELS[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {showNote && c.note && (
        <div className="mx-4 sm:mx-5 mb-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-sm np-fade-in">
          <p className="text-amber-900 dark:text-amber-200">{c.note}</p>
        </div>
      )}

      {c.exampleJp && (
        <div className="mx-4 sm:mx-5 mb-4 rounded-lg bg-muted/50 p-3">
          <div className="flex items-start gap-2">
            <p className="font-jp text-sm leading-snug flex-1">{c.exampleJp}</p>
            <button
              onClick={() => speakJapanese(c.exampleJp!)}
              className="text-muted-foreground hover:text-primary transition shrink-0"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          {c.exampleEn && <p className="text-xs text-muted-foreground mt-1">{c.exampleEn}</p>}
        </div>
      )}
    </div>
  );
}
