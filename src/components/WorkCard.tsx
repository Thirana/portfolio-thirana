import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  Cloud,
  DoorClosed,
  GitBranch,
  KeyRound,
  LockKeyhole,
  Route as RouteIcon,
  Server,
  ShieldCheck,
  Tag as TagIcon,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { WorkHighlightIcon, WorkMeta } from "@/lib/content";
import { getSwatchColor } from "@/lib/swatch";
import { CompanyMark } from "./CompanyMark";
import Tag from "./Tag";

export const HIGHLIGHT_ICONS: Record<WorkHighlightIcon, LucideIcon> = {
  shield: ShieldCheck,
  lock: LockKeyhole,
  key: KeyRound,
  "git-branch": GitBranch,
  route: RouteIcon,
  server: Server,
  cloud: Cloud,
  workflow: Workflow,
  tag: TagIcon,
  door: DoorClosed,
};

export function formatWorkDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Company, role and date on one line; wraps cleanly on narrow screens. */
export function WorkByline({ work }: { work: WorkMeta }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[13px] text-gl-text-faint">
      <span className="inline-flex items-center gap-2">
        <CompanyMark
          name={work.companyName}
          logo={work.companyLogo}
          size={20}
        />
        <span className="font-semibold text-gl-text">{work.companyName}</span>
      </span>
      <span aria-hidden>·</span>
      <span>{work.role}</span>
      <span aria-hidden>·</span>
      <time dateTime={work.date} className="tabular-nums">
        {formatWorkDate(work.date)}
      </time>
      {work.draft ? (
        <span className="rounded-full border border-dashed border-gl-border-strong px-2 py-px text-[12px] text-gl-text-muted">
          Draft
        </span>
      ) : null}
    </div>
  );
}

/** Two-line identity for cards: company on top, role and date beneath. */
function CardByline({ work }: { work: WorkMeta }) {
  return (
    <div className="flex items-center gap-2.5 font-sans">
      <CompanyMark name={work.companyName} logo={work.companyLogo} size={28} />
      <div className="min-w-0">
        <p className="text-[14px] leading-tight font-semibold text-gl-text">
          {work.companyName}
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[13px] leading-tight text-gl-text-faint">
          <span>{work.role}</span>
          <span aria-hidden>·</span>
          <time dateTime={work.date} className="tabular-nums">
            {formatWorkDate(work.date)}
          </time>
          {work.draft ? (
            <span className="ml-0.5 rounded-full border border-dashed border-gl-border-strong px-2 py-px text-[12px] text-gl-text-muted">
              Draft
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export function HighlightTags({ work }: { work: WorkMeta }) {
  if (work.highlights.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {work.highlights.map((highlight) => {
        const Icon = HIGHLIGHT_ICONS[highlight.icon];
        return (
          <li key={highlight.label}>
            <Tag
              icon={
                <Icon
                  className="size-3.5"
                  style={{ color: getSwatchColor(highlight.label) }}
                  aria-hidden
                />
              }
            >
              {highlight.label}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}

type WorkCardProps = {
  work: WorkMeta;
  /** h2 on the /work index, h3 inside a home-page section. */
  headingLevel?: "h2" | "h3";
};

export default function WorkCard({ work, headingLevel = "h3" }: WorkCardProps) {
  const Heading = headingLevel;
  const href = `/work/${work.slug}` as Route<string>;

  return (
    <article className="card relative flow-root p-5 sm:p-6">
      {work.cover ? (
        // Floats top-right and lifts past the card edge on desktop, so the
        // byline, title and summary wrap around it; stacks on top on phones.
        // pointer-events-none lets clicks reach the card's stretched link.
        <div className="pointer-events-none relative z-10 mb-4 overflow-hidden rounded-[10px] border border-gl-border bg-gl-bg shadow-gl sm:float-right sm:-mt-11 sm:-mr-2 sm:mb-3 sm:ml-4 sm:w-[12rem]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG with inlined fonts */}
          <img
            src={work.cover.src}
            alt={work.cover.alt}
            width={work.cover.width}
            height={work.cover.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      ) : null}

      <CardByline work={work} />

      <Heading className="mt-3.5 text-[22px] leading-[1.2] font-semibold tracking-[-0.025em] text-balance text-gl-text">
        <Link
          href={href}
          className="after:absolute after:inset-0 after:rounded-[14px] after:content-['']"
        >
          {work.title}
        </Link>
      </Heading>

      <p className="mt-2 max-w-[38rem] text-[15px] leading-[1.6] text-gl-text-muted">
        {work.summary}
      </p>

      <div className="mt-4">
        <HighlightTags work={work} />
      </div>

      <div className="mt-5">
        <span className="link-arrow">
          Read the case study
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}
