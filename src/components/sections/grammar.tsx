"use client";

import * as React from "react";
import {
  cn,
  Plus,
  Check,
  Languages,
  Lightbulb,
  Volume2,
  Layers3,
  AlertCircle,
} from "@/components/app/imports";
import { SectionHeader, LevelTabs, LevelBadge, EmptyState } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { Furigana } from "@/components/app/furigana";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

type Grammar = {
  id: string;
  title: string;
  level: string;
  structure: string;
  meaning: string;
  explanation: string;
  exampleJp: string;
  exampleEn: string;
  exampleJp2: string | null;
  exampleEn2: string | null;
  note: string | null;
  commonMistake: string | null;
  lesson: number | null;
  order: number;
};

export function GrammarSection() {
  const [level, setLevel] = React.useState("N5");
  const [items, setItems] = React.useState<Grammar[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [added, setAdded] = React.useState<Set<string>>(new Set());
  const [open, setOpen] = React.useState<Set<string>>(new Set());
  const startReview = useApp((s) => s.startReview);

  React.useEffect(() => {
    setLoading(true);
    setOpen(new Set());
    fetch(`/api/grammar?level=${level}`)
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .finally(() => setLoading(false));
  }, [level]);

  // BUGFIX: Load actual deck membership from server
  React.useEffect(() => {
    fetch("/api/flashcards/deck?type=grammar")
      .then((r) => r.json())
      .then((d) => {
        const ids = (d.byType?.grammar ?? []) as string[];
        setAdded(new Set(ids));
      })
      .catch(() => {});
  }, []);

  function toggle(id: string) {
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  async function addToDeck(g: Grammar) {
    if (added.has(g.id)) return;
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", itemType: "grammar", itemIds: [g.id] }),
      });
      const d = await res.json();
      if (d.ok) {
        setAdded((s) => new Set(s).add(g.id));
        toast.success(`Added “${g.title}” to your deck`);
      }
    } catch {
      toast.error("Could not add to deck");
    }
  }

  return (
    <div>
      <SectionHeader
        eyebrow="The skeleton of the language"
        title="Grammar"
        jp="文法"
        description="Grammar points by JLPT level with structure, meaning, plain-language explanation, and example sentences. Tap a card to expand — includes common-mistake warnings where they matter."
      >
        <button
          onClick={() => startReview("grammar", level)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <Layers3 className="h-4 w-4" />
          Review {level} grammar
        </button>
      </SectionHeader>

      <div className="mb-5">
        <LevelTabs value={level} onChange={setLevel} />
      </div>

      {loading ? (
        <GrammarSkeleton />
      ) : items.length === 0 ? (
        <EmptyState icon={Languages} title="No grammar points" />
      ) : (
        <div className="space-y-3">
          {items.map((g) => {
            const isOpen = open.has(g.id);
            return (
              <div
                key={g.id}
                className={cn(
                  "rounded-xl border border-border bg-card transition",
                  isOpen && "ring-1 ring-primary/30"
                )}
              >
                <button
                  onClick={() => toggle(g.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start gap-3"
                >
                  <LevelBadge level={g.level} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3 className="font-jp font-semibold text-base sm:text-lg leading-tight">
                        {g.title}
                      </h3>
                      {g.commonMistake && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                          <AlertCircle className="h-3 w-3" />
                          common mistake
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{g.meaning}</p>
                    <code className="mt-2 inline-block rounded bg-muted px-2 py-1 text-xs font-mono text-foreground/80">
                      {g.structure}
                    </code>
                  </div>
                  <Plus
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform shrink-0 mt-1",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 -mt-1 np-fade-in">
                    <p className="text-sm leading-relaxed text-foreground/90">{g.explanation}</p>

                    <div className="mt-4 space-y-2.5">
                      <Example jp={g.exampleJp} en={g.exampleEn} />
                      {g.exampleJp2 && <Example jp={g.exampleJp2} en={g.exampleEn2 ?? ""} />}
                    </div>

                    {g.note && (
                      <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-sm">
                        <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-amber-900 dark:text-amber-200">{g.note}</p>
                      </div>
                    )}

                    {g.commonMistake && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 p-3 text-sm">
                        <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-rose-700 dark:text-rose-300 mb-0.5">Watch out!</p>
                          <p className="text-rose-900 dark:text-rose-200">{g.commonMistake}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => addToDeck(g)}
                        disabled={added.has(g.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition",
                          added.has(g.id)
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-muted text-foreground hover:bg-accent"
                        )}
                      >
                        {added.has(g.id) ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        {added.has(g.id) ? "In deck" : "Add to deck"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Example({ jp, en }: { jp: string; en: string }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <div className="flex items-start gap-2">
        <Furigana text={jp} className="text-sm leading-snug flex-1" />
        <button
          onClick={() => speakJapanese(jp)}
          className="text-muted-foreground hover:text-primary transition shrink-0"
          title="Pronounce"
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{en}</p>
    </div>
  );
}

function GrammarSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}
