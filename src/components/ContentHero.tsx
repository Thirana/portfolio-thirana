import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSwatchColor } from "@/lib/swatch";
import Tag from "@/components/Tag";

type ContentHeroProps = {
  back?: { href: string; label: string };
  title: string;
  summary?: string;
  meta?: ReactNode;
  chips?: string[];
  className?: string;
};

export default function ContentHero({
  back,
  title,
  summary,
  meta,
  chips,
  className,
}: ContentHeroProps) {
  return (
    <header className={cn("not-prose space-y-5", className)}>
      {back ? (
        <Link
          href={back.href as Route<string>}
          className="group inline-flex items-center gap-1.5 font-sans text-[13px] text-gl-text-muted transition-colors hover:text-gl-text"
        >
          <ArrowLeft
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          {back.label}
        </Link>
      ) : null}

      <h1 className="font-sans text-[34px] leading-[1.1] font-semibold tracking-[-0.028em] text-gl-text sm:text-[44px]">
        {title}
      </h1>

      {summary ? (
        <p className="text-[18px] leading-[1.6] text-gl-text-muted">{summary}</p>
      ) : null}

      {meta ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[13px] text-gl-text-faint">
          {meta}
        </div>
      ) : null}

      {chips && chips.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <li key={chip}>
              <Tag dot={getSwatchColor(chip)}>{chip}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
