import type { ReactNode } from "react";
import { BookOpen, ChevronDown } from "lucide-react";

type MoreDetailProps = {
  /** What the reader gets by opening it, e.g. "Background: why JWT". */
  title: string;
  children: ReactNode;
};

/**
 * Progressive disclosure for background or side detail in a long post.
 * Same card-and-trigger look as CodeToggle, built on native <details> so it
 * needs no client JavaScript and the content stays in the HTML. Only the
 * summary is not-prose, so the body keeps the article's prose styles.
 */
export default function MoreDetail({ title, children }: MoreDetailProps) {
  return (
    <details className="group card my-6 p-2">
      <summary className="not-prose flex cursor-pointer list-none items-start justify-between gap-2 rounded-[10px] px-3 py-2 font-sans text-[13px] font-medium text-gl-text-muted transition-colors hover:bg-gl-surface-2 hover:text-gl-text [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 flex-1 items-start gap-2">
          <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{title}</span>
        </span>
        <ChevronDown
          className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="px-3 pt-1 pb-2 text-[16px] [&>:first-child]:mt-3 [&>:last-child]:mb-1">
        {children}
      </div>
    </details>
  );
}
