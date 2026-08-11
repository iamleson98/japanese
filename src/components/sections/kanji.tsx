"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  cn,
  Plus,
  Check,
  GraduationCap,
  Volume2,
  Layers3,
  Lightbulb,
} from "@/components/app/imports";
import { Modal } from "@/components/app/modal";
import { SectionHeader, LevelTabs, LevelBadge, EmptyState } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";
import { getFlashcardsHref } from "@/lib/routes";
import { toast } from "sonner";

type Kanji = {
  id: string;
  character: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  level: string;
  strokeCount: number;
  jlpt: string;
  radical: string | null;
  mnemonic: string | null;
  set: number | null;
  exampleWord: string | null;
  exampleRead: string | null;
  exampleMean: string | null;
  order: number;
};

export function KanjiSection() {
  const router = useRouter();
  const [level, setLevel] = React.useState("N5");
  const [activeSet, setActiveSet] = React.useState<number>(1);
  const [allItems, setAllItems] = React.useState<Kanji[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [added, setAdded] = React.useState<Set<string>>(new Set());
  const [selected, setSelected] = React.useState<Kanji | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setActiveSet(1);
    fetch(`/api/kanji?level=${level}`)
      .then((r) => r.json())
      .then((d) => setAllItems(d.items ?? []))
      .finally(() => setLoading(false));
  }, [level]);

  // Compute sets (10 per set) from the fetched items
  const sets = React.useMemo(() => {
    const map: Record<number, Kanji[]> = {};
    for (const k of allItems) {
      const s = k.set ?? Math.floor(((k.order ?? 0) - 1) / 10) + 1;
      if (!map[s]) map[s] = [];
      map[s].push(k);
    }
    return Object.entries(map)
      .map(([setNum, items]) => ({ set: Number(setNum), items }))
      .sort((a, b) => a.set - b.set);
  }, [allItems]);

  const items = sets.find((s) => s.set === activeSet)?.items ?? [];
  const totalSets = sets.length;

  // BUGFIX: Load actual deck membership from server
  React.useEffect(() => {
    fetch("/api/flashcards/deck?type=kanji")
      .then((r) => r.json())
      .then((d) => {
        const ids = (d.byType?.kanji ?? []) as string[];
        setAdded(new Set(ids));
      })
      .catch(() => {});
  }, []);

  async function addToDeck(k: Kanji) {
    if (added.has(k.id)) return;
    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", itemType: "kanji", itemIds: [k.id] }),
      });
      const d = await res.json();
      if (d.ok) {
        setAdded((s) => new Set(s).add(k.id));
        toast.success(`Added “${k.character}” to your deck`);
      }
    } catch {
      toast.error("Could not add to deck");
    }
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Characters with meaning"
        title="Kanji"
        jp="漢字"
        description="Browse kanji by JLPT level. Tap any character to see its readings, meanings, stroke count, radical, a mnemonic, and a common example word."
      >
        <button
          onClick={() => router.push(getFlashcardsHref("kanji", level))}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <Layers3 className="h-4 w-4" />
          Review {level} kanji
        </button>
      </SectionHeader>

      <div className="mb-5">
        <LevelTabs value={level} onChange={setLevel} />
      </div>

      {/* Set selector — smaller learning sessions of ~10 kanji */}
      {totalSets > 1 && (
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-muted-foreground">Set:</span>
          {sets.map((s) => (
            <button
              key={s.set}
              onClick={() => setActiveSet(s.set)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition tabular-nums",
                activeSet === s.set
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {s.set} · {s.items.length}
            </button>
          ))}
        </div>
      )}

      <div className="mb-3 text-sm text-muted-foreground">
        {loading ? "Loading…" : `${items.length} kanji in set ${activeSet}` + (added.size > 0 ? ` · ${added.size} in deck total` : "")}
      </div>

      {loading ? (
        <KanjiSkeleton />
      ) : items.length === 0 ? (
        <EmptyState icon={GraduationCap} title="No kanji found" />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2.5">
          {items.map((k) => (
            <KanjiTile
              key={k.id}
              k={k}
              added={added.has(k.id)}
              onOpen={() => setSelected(k)}
              onAdd={() => addToDeck(k)}
            />
          ))}
        </div>
      )}

      {selected && (
        <KanjiDetail
          k={selected}
          added={added.has(selected.id)}
          onClose={() => setSelected(null)}
          onAdd={() => addToDeck(selected)}
        />
      )}
    </div>
  );
}

function KanjiTile({
  k,
  added,
  onOpen,
  onAdd,
}: {
  k: Kanji;
  added: boolean;
  onOpen: () => void;
  onAdd: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="group relative rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-sm transition">
      <button
        onClick={onOpen}
        className="w-full aspect-square flex flex-col items-center justify-center p-2"
      >
        <span className="kanji-glyph text-4xl sm:text-5xl font-medium leading-none">{k.character}</span>
        <span className="mt-1 text-[11px] text-muted-foreground line-clamp-1">{k.meaning}</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAdd(e);
        }}
        className={cn(
          "absolute top-1.5 right-1.5 grid h-6 w-6 place-items-center rounded-full transition opacity-0 group-hover:opacity-100",
          added
            ? "bg-emerald-500 text-white opacity-100"
            : "bg-background/90 border border-border hover:bg-accent"
        )}
        title={added ? "In deck" : "Add to deck"}
      >
        {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      </button>
      <div
        className={cn(
          "absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full",
          k.level === "N5" ? "bg-emerald-500" : k.level === "N4" ? "bg-amber-500" : "bg-rose-500"
        )}
        title={k.level}
      />
    </div>
  );
}

function KanjiDetail({
  k,
  added,
  onClose,
  onAdd,
}: {
  k: Kanji;
  added: boolean;
  onClose: () => void;
  onAdd: () => void;
}) {
  return (
    <Modal open onClose={onClose} className="max-w-lg">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 pr-12">
        <div className="flex items-center gap-2">
          <LevelBadge level={k.level} />
          <span className="text-sm text-muted-foreground">{k.strokeCount} strokes</span>
          {k.radical && (
            <span className="text-sm text-muted-foreground">
              · radical <span className="font-jp text-foreground">{k.radical}</span>
            </span>
          )}
        </div>
      </div>
        <div className="p-6">
          <div className="flex items-start gap-5">
            <button
              onClick={() => speakJapanese(k.character)}
              className="group relative grid h-32 w-32 shrink-0 place-items-center rounded-2xl border border-border bg-muted/30 hover:bg-muted/60 transition"
              title="Pronounce"
            >
              <span className="kanji-glyph text-7xl font-medium leading-none">{k.character}</span>
              <Volume2 className="absolute bottom-2 right-2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
            </button>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold">{k.meaning}</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted-foreground">On'yomi</dt>
                  <dd className="font-jp font-medium">{k.onyomi}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted-foreground">Kun'yomi</dt>
                  <dd className="font-jp font-medium">{k.kunyomi}</dd>
                </div>
              </dl>
            </div>
          </div>

          {k.mnemonic && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-violet-50 dark:bg-violet-950/30 p-3 text-sm">
              <Lightbulb className="h-4 w-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-violet-700 dark:text-violet-300 mb-0.5">Mnemonic</p>
                <p className="text-violet-900 dark:text-violet-200">{k.mnemonic}</p>
              </div>
            </div>
          )}

          {k.exampleWord && (
            <div className="mt-4 rounded-lg bg-muted/50 p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Common word
              </div>
              <div className="flex items-center gap-2">
                <span className="font-jp text-xl font-semibold">{k.exampleWord}</span>
                <button
                  onClick={() => speakJapanese(k.exampleWord!)}
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                <span className="font-jp text-sm text-muted-foreground">— {k.exampleRead}</span>
              </div>
              {k.exampleMean && (
                <p className="mt-1 text-sm text-foreground/80">{k.exampleMean}</p>
              )}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button
              onClick={onAdd}
              disabled={added}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition",
                added
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              )}
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {added ? "In deck" : "Add to flashcards"}
            </button>
          </div>
        </div>
    </Modal>
  );
}

function KanjiSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2.5">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}
