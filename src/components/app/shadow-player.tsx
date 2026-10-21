"use client";

import * as React from "react";
import {
  cn,
  Play,
  Pause,
  Volume2,
  Star,
  Mic,
  ArrowRight,
  CheckCircle2,
  toast,
} from "@/components/app/imports";
import { useApp } from "@/lib/store";

// Speak with an onend callback (speechSynthesis utterance events)
function speakWithEnd(text: string, rate: number, onEnd: () => void) {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd();
      return;
    }
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = rate;
    const voices = synth.getVoices();
    const jp = voices.find((v) => v.lang?.toLowerCase().startsWith("ja"));
    if (jp) u.voice = jp;
    u.onend = onEnd;
    u.onerror = onEnd;
    synth.speak(u);
  } catch {
    onEnd();
  }
}

/**
 * Shadowing player — real-world practice backed by a 2025 systematic review
 * (44 studies): listen to a sentence, repeat it aloud immediately, then compare.
 * Trains the full loop: phoneme decoding -> phonological loop -> articulation -> self-monitoring.
 *
 * Props:
 *  - text: Japanese text (split into sentences at 。！？)
 *  - reading?: full kana reading (displayed as furigana-style assist)
 *  - translation: English translation of the whole text
 *  - translationVi?: Vietnamese translation
 *  - onDone?: called when the user finishes rating
 *  - mineable?: show star buttons to mine each sentence into the SRS deck
 *  - compact?: smaller layout for embedding in the daily session
 */
export function ShadowPlayer({
  text,
  reading,
  translation,
  translationVi,
  onDone,
  mineable = true,
  sourceId,
  compact = false,
}: {
  text: string;
  reading?: string | null;
  translation?: string | null;
  translationVi?: string | null;
  onDone?: (rating: "easy" | "ok" | "hard") => void;
  mineable?: boolean;
  sourceId?: string | null;
  compact?: boolean;
}) {
  const ttsRate = useApp((s) => s.ttsRate);
  const showVi = useApp((s) => s.showVietnamese);
  const [sentences] = React.useState(() => splitSentences(text));
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const [minedIdx, setMinedIdx] = React.useState<Set<number>>(new Set());
  const [rated, setRated] = React.useState<"easy" | "ok" | "hard" | null>(null);

  const current = sentences[idx] ?? "";
  const currentReading = React.useMemo(() => {
    if (!reading) return null;
    // Try to align: use the whole reading for single-sentence texts only
    if (sentences.length === 1) return reading;
    return null;
  }, [reading, sentences.length]);

  function play(s: string) {
    setPlaying(true);
    speakWithEnd(s, ttsRate, () => setPlaying(false));
  }

  React.useEffect(() => {
    // auto-play each sentence once when advancing
    if (current) {
      const t = setTimeout(() => play(current), 150);
      return () => clearTimeout(t);
    }
  }, [idx]);

  async function mineSentence(s: string, i: number) {
    if (minedIdx.has(i)) return;
    // Per-sentence translation not available — mine with the full translation as reference
    try {
      const r = await fetch("/api/sentences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textJp: s,
          textEn: translation ?? "(saved from shadowing practice)",
          textVi: translationVi ?? undefined,
          sourceType: "shadow",
          sourceId: sourceId ? `${sourceId}-${i}` : undefined,
        }),
      });
      const d = await r.json();
      setMinedIdx((m) => new Set(m).add(i));
      if (d.alreadyMined) toast("Already in your deck ✓");
      else toast("Sentence saved to your deck ⭐");
    } catch {
      toast("Could not save the sentence");
    }
  }

  if (rated) {
    return (
      <div className={cn("rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900 p-5 text-center", compact && "p-4")}>
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
        <p className="mt-2 font-semibold">Shadowing complete — shadow!</p>
        <p className="text-sm text-muted-foreground mt-1">
          You shadowed {sentences.length} sentence{sentences.length > 1 ? "s" : ""}. Self-rated: <b>{rated.toUpperCase()}</b>
        </p>
        {!compact && translation && (
          <p className="mt-2 text-xs text-muted-foreground">Translation: {translation}</p>
        )}
        {onDone && (
          <button
            onClick={() => onDone(rated)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", compact && "p-4")}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Mic className="h-4 w-4 text-primary" />
          Shadowing — listen, then say it aloud
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">
          {idx + 1} / {sentences.length}
        </span>
      </div>

      {/* Sentence display */}
      <div className="min-h-[72px] rounded-lg bg-muted/60 p-4 text-center">
        <p className="font-jp text-lg sm:text-xl leading-relaxed">{current}</p>
        {currentReading && (
          <p className="mt-1 text-xs text-muted-foreground font-jp">{currentReading}</p>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => (playing ? window.speechSynthesis.cancel() : play(current))}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {playing ? "Stop" : "Replay"}
        </button>
        {mineable && (
          <button
            onClick={() => mineSentence(current, idx)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition",
              minedIdx.has(idx)
                ? "border-amber-300 bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:border-amber-800"
                : "border-border hover:bg-accent"
            )}
            title="Save this sentence to your SRS deck"
          >
            <Star className={cn("h-4 w-4", minedIdx.has(idx) && "fill-amber-400 text-amber-500")} />
            {minedIdx.has(idx) ? "Saved" : "Mine"}
          </button>
        )}
        {translation && (
          <button
            onClick={() => setRevealed((r) => !r)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent transition"
          >
            <Volume2 className="h-4 w-4" />
            {revealed ? "Hide translation" : "Show translation"}
          </button>
        )}
      </div>
      {revealed && translation && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {translation}
          {showVi && translationVi ? ` · ${translationVi}` : ""}
        </p>
      )}

      {/* Advance */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground disabled:opacity-40 hover:bg-accent transition"
        >
          ← Back
        </button>
        {idx < sentences.length - 1 ? (
          <button
            onClick={() => {
              setRevealed(false);
              setIdx((i) => i + 1);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            I said it <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground mr-1">How was your rhythm?</span>
            {(["hard", "ok", "easy"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRated(r)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                  r === "hard" && "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
                  r === "ok" && "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
                  r === "easy" && "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                )}
              >
                {r === "hard" ? "Hard" : r === "ok" ? "OK" : "Easy"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function splitSentences(text: string): string[] {
  const parts = text
    .replace(/\r/g, "")
    .split(/(?<=[。！？!?])\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  // Merge fragments that don't end with terminal punctuation into the previous sentence
  const merged: string[] = [];
  for (const p of parts) {
    if (merged.length && !/[。！？!?]$/.test(merged[merged.length - 1])) {
      merged[merged.length - 1] += p;
    } else {
      merged.push(p);
    }
  }
  return merged.length ? merged : [text.trim()].filter(Boolean);
}
