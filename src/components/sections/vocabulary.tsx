"use client";

import * as React from "react";
import {
  cn,
  Volume2,
  Search,
  Plus,
  Check,
  Layers3,
  BookOpen,
  toast,
} from "@/components/app/imports";
import { SectionHeader, LevelTabs, LevelBadge, EmptyState } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { Furigana } from "@/components/app/furigana";
import { useApp } from "@/lib/store";

type Vocab = {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  romaji: string | null;
  level: string;
  category: string;
  pos: string | null;
  verbGroup: string | null;
  pitchAccent: string | null;
  lesson: number | null;
  exampleJp: string | null;
  exampleEn: string | null;
  exampleJp2: string | null;
  exampleEn2: string | null;
  order: number;
};

export function VocabularySection() {
  const [level, setLevel] = React.useState("N5");
  const [category, setCategory] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");
  const [items, setItems] = React.useState<Vocab[]>([]);
  const [categories, setCategories] = React.useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [added, setAdded] = React.useState<Set<string>>(new Set());
  const startReview = useApp((s) => s.startReview);
  const romajiMode = useApp((s) => s.romajiMode);

  // Load vocab for the level
  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/vocabulary?level=${level}`)
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items ?? []);
        setCategories(d.categories ?? []);
      })
      .finally(() => setLoading(false));
  }, [level]);

  // BUGFIX: Load actual deck membership from server so "In deck" state is correct
  // even after navigating away and back.
  const loadDeck = React.useCallback(() => {
    fetch("/api/flashcards/deck?type=vocabulary")
      .then((r) => r.json())
      .then((d) => {
        const ids = (d.byType?.vocabulary ?? []) as string[];
        setAdded(new Set(ids));
      })
      .catch(() => {});
  }, []);
  React.useEffect(() => {
    loadDeck();
  }, [loadDeck]);

  const filtered = React.useMemo(() => {
    let out = items;
    if (category !== "all") out = out.filter((v) => v.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (v) =>
          v.word.toLowerCase().includes(q) ||
          v.reading.toLowerCase().includes(q) ||
          (v.romaji ?? "").toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q)
      );
    }
    return out;
  }, [items, category, query]);

  async function addToDeck(v: Vocab) {
    if (added.has(v.id)) return;
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", itemType: "vocabulary", itemIds: [v.id] }),
      });
      const d = await res.json();
      if (d.ok) {
        setAdded((s) => new Set(s).add(v.id));
        toast.success(`Added “${v.word}” to your flashcards`);
      }
    } catch {
      toast.error("Could not add to deck");
    }
  }

  async function addAllFiltered() {
    const ids = filtered.map((v) => v.id);
    if (!ids.length) return;
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", itemType: "vocabulary", itemIds: ids }),
      });
      const d = await res.json();
      if (d.ok) {
        setAdded((s) => {
          const n = new Set(s);
          ids.forEach((id) => n.add(id));
          return n;
        });
        toast.success(`Added ${d.added} cards to your deck`);
      }
    } catch {
      toast.error("Could not add to deck");
    }
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Words you'll actually use"
        title="Vocabulary"
        jp="単語"
        description="Browse vocabulary by JLPT level and category. Add cards to your spaced-repetition deck, then review them in the Flashcards section. Furigana appears above kanji (toggle in Settings)."
      >
        <button
          onClick={() => startReview("vocabulary", level)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <Layers3 className="h-4 w-4" />
          Review {level} cards
        </button>
      </SectionHeader>

      <div className="mb-5 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <LevelTabs value={level} onChange={setLevel} />
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search word, reading, meaning…"
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="np-scroll flex items-center gap-1.5 overflow-x-auto pb-1">
          <CategoryChip active={category === "all"} onClick={() => setCategory("all")} label="All" />
          {categories
            .sort((a, b) => b.count - a.count)
            .map((c) => (
              <CategoryChip
                key={c.name}
                active={category === c.name}
                onClick={() => setCategory(c.name)}
                label={`${c.name} (${c.count})`}
              />
            ))}
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {loading ? "Loading…" : `${filtered.length} words`}
          {added.size > 0 && <span className="ml-2">· {added.size} in deck</span>}
        </p>
        {filtered.length > 0 && (
          <button
            onClick={addAllFiltered}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Add all to deck
          </button>
        )}
      </div>

      {loading ? (
        <VocabSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No words match"
          description="Try a different level, category, or search term."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <VocabCard
              key={v.id}
              v={v}
              added={added.has(v.id)}
              onAdd={() => addToDeck(v)}
              showRomaji={romajiMode !== "never"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition capitalize",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

function VocabCard({
  v,
  added,
  onAdd,
  showRomaji,
}: {
  v: Vocab;
  added: boolean;
  onAdd: () => void;
  showRomaji: boolean;
}) {
  const [showExample2, setShowExample2] = React.useState(false);
  return (
    <div className="group rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <Furigana text={v.word} reading={v.reading} className="text-2xl font-semibold leading-tight" />
            <button
              onClick={() => speakJapanese(v.word)}
              className="text-muted-foreground hover:text-primary transition"
              title="Pronounce"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          {showRomaji && v.romaji && (
            <div className="text-xs text-muted-foreground/70 italic mt-0.5">{v.romaji}</div>
          )}
        </div>
        <LevelBadge level={v.level} />
      </div>

      <p className="mt-2 text-sm font-medium">{v.meaning}</p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {v.pos && (
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            {v.pos}
          </span>
        )}
        {v.verbGroup && (
          <span className="rounded bg-sky-50 dark:bg-sky-950/30 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-sky-700 dark:text-sky-300">
            {v.verbGroup}
          </span>
        )}
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground capitalize">
          {v.category}
        </span>
        {v.lesson && (
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-primary">
            L{v.lesson}
          </span>
        )}
      </div>

      {v.exampleJp && (
        <div className="mt-3 rounded-lg bg-muted/50 p-2.5 text-sm">
          <div className="flex items-start gap-2">
            <Furigana text={v.exampleJp} reading={v.reading} className="leading-snug flex-1" />
            <button
              onClick={() => speakJapanese(v.exampleJp!)}
              className="text-muted-foreground hover:text-primary transition shrink-0"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          </div>
          {v.exampleEn && <p className="text-xs text-muted-foreground mt-1">{v.exampleEn}</p>}
          {v.exampleJp2 && (
            <button
              onClick={() => setShowExample2((s) => !s)}
              className="mt-1.5 text-[11px] text-primary hover:underline"
            >
              {showExample2 ? "− Hide" : "+ Another example"}
            </button>
          )}
          {showExample2 && v.exampleJp2 && (
            <div className="mt-1.5 pt-1.5 border-t border-border/50">
              <div className="flex items-start gap-2">
                <Furigana text={v.exampleJp2} reading={v.reading} className="leading-snug flex-1 text-xs" />
              </div>
              {v.exampleEn2 && <p className="text-xs text-muted-foreground mt-1">{v.exampleEn2}</p>}
            </div>
          )}
        </div>
      )}

      <button
        onClick={onAdd}
        disabled={added}
        className={cn(
          "mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition",
          added
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            : "bg-muted text-foreground hover:bg-accent"
        )}
      >
        {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        {added ? "In deck" : "Add to deck"}
      </button>
    </div>
  );
}

function VocabSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-44 rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}
