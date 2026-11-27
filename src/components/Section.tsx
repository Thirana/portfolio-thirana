import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionProps = {
  title: string;
  icon?: LucideIcon;
  /** Icon color; any CSS color, usually a --gl-swatch token. */
  tone?: string;
  children: ReactNode;
  className?: string;
};

/**
 * A section opened like a notebook chapter: the title set large with its
 * swatch icon, underlined by a loose pen stroke in the same swatch ink.
 */
export default function Section({
  title,
  icon: Icon,
  tone = "var(--gl-text-faint)",
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("space-y-6 sm:space-y-7", className)}>
      <h2 className="flex items-center gap-2.5 font-sans text-[22px] leading-tight font-semibold tracking-[-0.02em] text-gl-text sm:text-[24px]">
        {Icon ? (
          <Icon
            className="size-5 shrink-0"
            style={{ color: tone }}
            strokeWidth={2}
            aria-hidden
          />
        ) : null}
        {/* The stroke is drawn under the words only, as if by marker. */}
        <span className="relative inline-block pb-2">
          {title}
          <svg
            aria-hidden
            viewBox="0 0 240 10"
            preserveAspectRatio="none"
            className="absolute inset-x-0 -bottom-0.5 h-2 w-full"
            style={{ color: tone }}
          >
            <path
              d="M3 6.5 C 50 4.5, 100 7.5, 150 5.8 S 215 5, 230 5.5 L 237 2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
      </h2>
      {children}
    </section>
  );
}

export function Seam({ className }: { className?: string }) {
  return <div aria-hidden className={cn("seam", className)} />;
}
