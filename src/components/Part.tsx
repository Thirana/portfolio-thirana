import type { ReactNode } from "react";
import { Seam } from "@/components/Section";

type PartProps = {
  /** Anchor id for the part heading, e.g. "access-tokens". */
  id: string;
  number: number;
  total: number;
  title: string;
  /** Optional "In short" key points, written as a markdown list. */
  children?: ReactNode;
};

/**
 * Opens one part of a long post: a dashed seam, a "Part 2 of 4" line, the
 * part title, and a short list of key points so a skimming reader gets the
 * gist before the detail.
 */
export default function Part({
  id,
  number,
  total,
  title,
  children,
}: PartProps) {
  return (
    <div className="not-prose mt-16 mb-8">
      <Seam className="mb-10" />
      <p className="font-sans text-[13px] font-medium text-gl-text-faint tabular-nums">
        Part {number} of {total}
      </p>
      <h2
        id={id}
        // "!" beats the site-wide `.prose h2` size and margins.
        className="mt-1! mb-0! font-sans text-[26px]! leading-tight font-semibold tracking-[-0.025em]! text-gl-text"
      >
        {title}
      </h2>
      {children ? (
        <div className="mt-5 rounded-[14px] border border-gl-border bg-gl-bg-subtle px-5 py-4">
          <p className="font-sans text-[13px] font-semibold text-gl-text-muted">
            In short
          </p>
          <div className="mt-2 text-[16px] leading-[1.6] text-gl-text [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-gl-text-faint [&_li]:before:content-['-'] [&_ul]:space-y-1.5">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}
