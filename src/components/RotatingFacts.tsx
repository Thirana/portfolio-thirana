"use client";

import { useEffect, useState } from "react";
import { BookOpen, Briefcase, Clapperboard, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  work: { icon: Briefcase, color: "var(--gl-swatch-6)" },
  movie: { icon: Clapperboard, color: "var(--gl-swatch-5)" },
  read: { icon: BookOpen, color: "var(--gl-swatch-4)" },
  curious: { icon: Sparkles, color: "var(--gl-swatch-2)" },
  place: { icon: MapPin, color: "var(--gl-swatch-1)" },
} as const;

export type Fact = {
  kind: keyof typeof ICONS;
  label: string;
  value: string;
};

const INTERVAL_MS = 3400;

/** One-line ticker of short facts; static for reduced-motion visitors. */
export function RotatingFacts({
  facts,
  className,
}: {
  facts: Fact[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (facts.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % facts.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [facts.length, paused]);

  const fact = facts[index];
  const { icon: Icon, color } = ICONS[fact.kind];

  return (
    <div
      className={cn("font-sans text-[15px]", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ul className="sr-only">
        {facts.map((f) => (
          <li key={f.label}>
            {f.label}: {f.value}
          </li>
        ))}
      </ul>
      <p
        key={index}
        aria-hidden
        className="fact-in flex min-h-[22px] items-center gap-2.5"
      >
        <Icon className="size-4 shrink-0" style={{ color }} />
        <span className="shrink-0 whitespace-nowrap text-gl-text-muted">
          {fact.label}
        </span>
        <span className="h-px w-3 shrink-0 bg-gl-border-strong" />
        <span className="truncate text-gl-text">{fact.value}</span>
      </p>
    </div>
  );
}
