"use client";

import { Children, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ExpandableChipsProps = {
  children: ReactNode;
  /** How many chips phones show before the "+N more" chip. */
  visible?: number;
  "aria-label"?: string;
  className?: string;
};

/**
 * A wrapping row of chips. On phones only the first few show, followed by a
 * "+N more" chip that reveals the rest in place; from `sm` up every chip
 * shows.
 */
export function ExpandableChips({
  children,
  visible = 3,
  "aria-label": ariaLabel,
  className,
}: ExpandableChipsProps) {
  const [open, setOpen] = useState(false);
  const items = Children.toArray(children);
  const hidden = items.length - visible;
  const folded = !open && hidden > 0;

  return (
    <ul
      className={cn("flex flex-wrap gap-1.5", className)}
      aria-label={ariaLabel}
    >
      {items.map((item, i) => (
        <li key={i} className={folded && i >= visible ? "max-sm:hidden" : ""}>
          {item}
        </li>
      ))}
      {folded ? (
        <li className="sm:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            className="sketch sketch-dashed inline-flex items-center rounded-md border border-dashed border-gl-border-strong px-2.5 py-[5px] font-sans text-[12.5px] leading-tight font-medium text-gl-text-muted"
          >
            +{hidden} more
          </button>
        </li>
      ) : null}
    </ul>
  );
}
