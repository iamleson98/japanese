"use client";

import * as React from "react";
import { cn, Star, toast } from "@/components/app/imports";

/**
 * Sentence-mining button — saves a real sentence into the personal SRS deck.
 * Real-world immersion practice: cards mined from content you actually met
 * are far stickier than abstract word lists.
 */
export function MineButton({
  textJp,
  textEn,
  textVi,
  reading,
  sourceType,
  sourceId,
  className,
}: {
  textJp: string;
  textEn: string;
  textVi?: string | null;
  reading?: string | null;
  sourceType: string;
  sourceId?: string;
  className?: string;
}) {
  const [saved, setSaved] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  async function mine() {
    if (saved || busy) return;
    setBusy(true);
    try {
      const r = await fetch("/api/sentences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textJp, textEn, textVi: textVi ?? undefined, reading: reading ?? undefined, sourceType, sourceId }),
      });
      const d = await r.json();
      if (d.ok) {
        setSaved(true);
        toast(d.alreadyMined ? "Already in your deck ⭐" : "Saved to your sentence deck ⭐");
      } else {
        toast(d.error ?? "Could not save sentence");
      }
    } catch {
      toast("Could not save the sentence");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={mine}
      disabled={busy}
      title="Mine this sentence — save it to your SRS deck"
      className={cn(
        "transition shrink-0 disabled:opacity-50",
        saved ? "text-amber-500" : "text-muted-foreground hover:text-amber-500",
        className
      )}
    >
      <Star className={cn("h-3.5 w-3.5", saved && "fill-amber-400 text-amber-500")} />
    </button>
  );
}
