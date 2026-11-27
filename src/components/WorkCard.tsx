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
        <span className="sketch sketch-pill sketch-dashed rounded-full border border-dashed border-gl-border-strong px-2.5 py-0.5 text-[12px] text-gl-text-muted">
          Draft
        </span>
      ) : null}
    </div>
  );
}

/** Company and date on one line; the role is the same on every card. */
function CardByline({ work }: { work: WorkMeta }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[13px] text-gl-text-faint">
      <CompanyMark name={work.companyName} logo={work.companyLogo} size={20} />
      <span className="font-semibold text-gl-text">{work.companyName}</span>
      <span aria-hidden>·</span>
      <time dateTime={work.date} className="tabular-nums">
        {formatWorkDate(work.date)}
      </time>
      {work.draft ? (
        <span className="sketch sketch-pill sketch-dashed rounded-full border border-dashed border-gl-border-strong px-2.5 py-0.5 text-[12px] text-gl-text-muted">
          Draft
        </span>
      ) : null}
    </div>
  );
}

export function HighlightTags({
  work,
  limit,
  singleLine = false,
}: {
  work: WorkMeta;
  /** Show only the first few highlights. */
  limit?: number;
  /** Keep the tags on one row; whatever does not fit fades out at the edge. */
  singleLine?: boolean;
}) {
  const highlights = work.highlights.slice(0, limit);
  if (highlights.length === 0) return null;

  return (
    <ul
      className={
        singleLine
          ? "flex min-w-0 flex-nowrap gap-1.5 overflow-hidden py-px pr-px [mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)] max-sm:[&>li:nth-child(n+3)]:hidden [&>li]:shrink-0"
          : "flex flex-wrap gap-1.5"
      }
    >
      {highlights.map((highlight) => {
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

/**
 * A small hand-drawn sketch of what the note is about, in the same rough
 * style as the diagrams inside it, sitting on the card like a margin doodle.
 */
function CardMark({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG sketch
    <img
      src={src}
      alt=""
      aria-hidden
      width={56}
      height={56}
      loading="lazy"
      decoding="async"
      className="size-12 shrink-0 object-contain transition-transform duration-300 group-hover:-rotate-[8deg] sm:size-14"
    />
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
    <article className="card group relative p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <CardByline work={work} />
          <Heading
            title={work.cardTitle ? work.title : undefined}
            className="mt-3 text-[20px] leading-[1.3] font-semibold tracking-[-0.02em] text-gl-text sm:truncate sm:text-[21px]"
          >
            <Link
              href={href}
              className="after:absolute after:inset-0 after:rounded-[14px] after:content-['']"
            >
              {work.cardTitle ?? work.title}
            </Link>
          </Heading>
        </div>
        {work.mark ? <CardMark src={work.mark} /> : null}
      </div>

      <p className="mt-2 line-clamp-2 max-w-[38rem] text-[15px] leading-[1.6] text-gl-text-muted">
        {work.summary}
      </p>

      {/* Phones: the whole card is the link, so the tags get the full row
          and the Read label is left out. */}
      <div className="mt-4 flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <HighlightTags work={work} limit={3} singleLine />
        </div>
        <span className="link-arrow shrink-0 max-sm:hidden">
          Read<span className="sr-only"> the case study</span>
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}
