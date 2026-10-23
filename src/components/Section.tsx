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

/** A section opened by a pill heading, as used across the site. */
export default function Section({
  title,
  icon: Icon,
  tone = "var(--gl-text-faint)",
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("space-y-5 sm:space-y-6", className)}>
      <h2 className="chip">
        {Icon ? (
          <Icon className="size-3.5" style={{ color: tone }} aria-hidden />
        ) : null}
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Seam({ className }: { className?: string }) {
  return <div aria-hidden className={cn("seam", className)} />;
}
