"use client";

import * as React from "react";
import { cn } from "@/components/app/imports";
import { useApp } from "@/lib/store";
import { toFurigana } from "@/lib/sections/shared";

/**
 * Renders a Japanese string with furigana readings above kanji.
 * Respects the user's furiganaMode preference (always | hover | never).
 */
export function Furigana({
  text,
  reading,
  className,
  onClick,
}: {
  text: string;
  reading?: string | null;
  className?: string;
  onClick?: () => void;
}) {
  const furiganaMode = useApp((s) => s.furiganaMode);
  const segments = React.useMemo(() => toFurigana(text, reading), [text, reading]);

  if (furiganaMode === "never" || !reading) {
    return (
      <span className={cn("font-jp", className)} onClick={onClick}>
        {text}
      </span>
    );
  }

  return (
    <span className={cn("font-jp inline-flex flex-wrap", className)} onClick={onClick}>
      {segments.map((seg, i) => {
        if (!seg.isKanji || !seg.reading) {
          return <span key={i}>{seg.text}</span>;
        }
        // Kanji segment with reading
        if (furiganaMode === "hover") {
          return (
            <ruby
              key={i}
              className="group relative cursor-help"
              title={seg.reading}
            >
              <span>{seg.text}</span>
              <rt
                className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 left-0 right-0 text-center text-[0.55em] leading-none text-primary"
              >
                {seg.reading}
              </rt>
            </ruby>
          );
        }
        // always
        return (
          <ruby key={i}>
            <span>{seg.text}</span>
            <rt className="text-[0.55em] leading-none text-primary/80">{seg.reading}</rt>
          </ruby>
        );
      })}
    </span>
  );
}
