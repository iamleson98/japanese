"use client";

import * as React from "react";
import { cn, Repeat, Volume2 } from "@/components/app/imports";
import { SectionHeader, LevelTabs, EmptyState } from "./_primitives";
import { speakJapanese } from "@/lib/sections/shared";

type Conjugation = {
  id: string;
  verb: string;
  reading: string;
  group: string; // godan | ichidan | irregular | i-adj | na-adj
  level: string;
  meaning: string;
  dict: string;
  masu: string;
  nai: string;
  ta: string;
  te: string;
  potential: string | null;
  passive: string | null;
  causative: string | null;
  volitional: string | null;
  conditional: string | null;
  imperative: string | null;
  order: number;
};

const GROUP_META: Record<string, { label: string; color: string }> = {
  godan: { label: "Godan (u-verb)", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" },
  ichidan: { label: "Ichidan (ru-verb)", color: "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300" },
  irregular: { label: "Irregular", color: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300" },
  "i-adj": { label: "i-adjective", color: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300" },
  "na-adj": { label: "na-adjective", color: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300" },
};

const GROUP_DESC: Record<string, string> = {
  godan: "5-dan verbs. The final vowel changes for each conjugation. Most Japanese verbs are Godan.",
  ichidan: "ru-verbs. Drop the final る to conjugate. Generally regular and easy.",
  irregular: "する (to do) and 来る (to come) — only two. Memorize their forms.",
  "i-adj": "Ends in い. Drop い → く (adverb), かった (past), くて (te-form).",
  "na-adj": "Add だ / です / じゃない / だった. Behaves like a noun.",
};

export function ConjugationsSection() {
  const [level, setLevel] = React.useState("N5");
  const [groupFilter, setGroupFilter] = React.useState<string>("all");
  const [items, setItems] = React.useState<Conjugation[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/conjugations?level=${level}`)
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .finally(() => setLoading(false));
  }, [level]);

  const filtered = groupFilter === "all" ? items : items.filter((c) => c.group === groupFilter);

  return (
    <div>
      <SectionHeader
        eyebrow="Verb & adjective forms"
        title="Conjugation"
        jp="活用"
        description="Conjugation is the backbone of Japanese grammar. Learn verb groups FIRST (Godan vs Ichidan vs Irregular) — then every form on this page follows a predictable pattern."
      />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <LevelTabs value={level} onChange={setLevel} />
      </div>

      {/* Group filter chips + descriptions */}
      <div className="mb-5 np-scroll flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setGroupFilter("all")}
          className={cn(
            "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
            groupFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
          )}
        >
          All groups
        </button>
        {Object.entries(GROUP_META).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => setGroupFilter(key)}
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition",
              groupFilter === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            {meta.label}
          </button>
        ))}
      </div>

      {/* Group explainer when a single group is selected */}
      {groupFilter !== "all" && GROUP_DESC[groupFilter] && (
        <div className="mb-4 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{GROUP_META[groupFilter].label}:</span>{" "}
          {GROUP_DESC[groupFilter]}
        </div>
      )}

      <div className="mb-3 text-sm text-muted-foreground">
        {loading ? "Loading…" : `${filtered.length} entries`}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Repeat} title="No conjugations found" />
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <ConjugationCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function ConjugationCard({ c }: { c: Conjugation }) {
  const group = GROUP_META[c.group] ?? GROUP_META.godan;
  // Build form rows: only show forms relevant to the group
  const forms: { label: string; value: string; desc: string }[] = [
    { label: "Dict", value: c.dict, desc: "dictionary form" },
    { label: "Polite", value: c.masu, desc: "〜ます" },
    { label: "Negative", value: c.nai, desc: "〜ない" },
    { label: "Past", value: c.ta, desc: "〜た" },
    { label: "Te-form", value: c.te, desc: "〜て" },
  ];
  if (c.group !== "i-adj" && c.group !== "na-adj") {
    if (c.potential) forms.push({ label: "Potential", value: c.potential, desc: "can do" });
    if (c.passive) forms.push({ label: "Passive", value: c.passive, desc: "be ~ed" });
    if (c.causative) forms.push({ label: "Causative", value: c.causative, desc: "make do" });
    if (c.volitional) forms.push({ label: "Volitional", value: c.volitional, desc: "let's" });
    if (c.conditional) forms.push({ label: "Conditional", value: c.conditional, desc: "if" });
    if (c.imperative) forms.push({ label: "Imperative", value: c.imperative, desc: "command" });
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 flex flex-wrap items-start gap-3">
        <button
          onClick={() => speakJapanese(c.dict)}
          className="flex items-center gap-2"
          title="Pronounce"
        >
          <span className="font-jp text-2xl font-semibold leading-tight">{c.dict}</span>
          <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary transition" />
        </button>
        <span className="font-jp text-sm text-muted-foreground self-center">{c.reading}</span>
        <span className="text-sm text-muted-foreground self-center">— {c.meaning}</span>
        <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", group.color)}>
          {group.label}
        </span>
      </div>
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {forms.map((f) => (
            <div key={f.label} className="rounded-lg bg-muted/40 p-2.5">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{f.label}</div>
              <button
                onClick={() => speakJapanese(f.value)}
                className="block w-full text-left font-jp text-sm font-medium hover:text-primary transition"
                title="Pronounce"
              >
                {f.value}
              </button>
              <div className="text-[9px] text-muted-foreground/70">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
