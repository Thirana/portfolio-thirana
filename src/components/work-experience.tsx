"use client";

import { differenceInMonths, format, parse } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CompanyMark } from "@/components/CompanyMark";
import Tag from "@/components/Tag";
import { getSwatchColor } from "@/lib/swatch";
import { cn } from "@/lib/utils";

export type ExperiencePositionIconType =
  | "code"
  | "design"
  | "business"
  | "education";

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  /** Omit for project-style rows that don't represent a separate employment period */
  employmentPeriod?: {
    /** MM.YYYY or YYYY format */
    start: string;
    /** MM.YYYY or YYYY; omit for ongoing roles */
    end?: string;
  };
  employmentType?: string;
  description?: string;
  icon?: ExperiencePositionIconType;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  /**
   * Optional role context displayed as a meta line directly under the company
   * name. Use this when positions[] contains project-style rows (no period).
   */
  role?: {
    title: string;
    employmentPeriod: { start: string; end?: string };
    employmentType?: string;
  };
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

type Period = { start: string; end?: string };

export function WorkExperience({
  className,
  experiences,
}: {
  className?: string;
  experiences: ExperienceItemType[];
}) {
  return (
    <ol className={cn("relative", className)}>
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={experience.id}
          experience={experience}
          isLast={index === experiences.length - 1}
        />
      ))}
    </ol>
  );
}

function companyPeriod(experience: ExperienceItemType): Period | null {
  if (experience.role) return experience.role.employmentPeriod;
  const periods = experience.positions
    .map((p) => p.employmentPeriod)
    .filter((p): p is Period => !!p);
  if (periods.length === 0) return null;
  const byStart = [...periods].sort(
    (a, b) =>
      parsePeriodDate(a.start, "first").getTime() -
      parsePeriodDate(b.start, "first").getTime(),
  );
  const start = byStart[0].start;
  if (periods.some((p) => !p.end)) return { start };
  const byEnd = [...periods].sort(
    (a, b) =>
      parsePeriodDate(b.end!, "last").getTime() -
      parsePeriodDate(a.end!, "last").getTime(),
  );
  return { start, end: byEnd[0].end };
}

function ExperienceItem({
  experience,
  isLast,
}: {
  experience: ExperienceItemType;
  isLast: boolean;
}) {
  const period = companyPeriod(experience);
  const subtitle = experience.role
    ? experience.role.title
    : experience.positions.length === 1
      ? experience.positions[0].title
      : `${experience.positions.length} roles`;
  const hasDetails = experience.positions.some(
    (p) => p.description || (p.skills && p.skills.length > 0),
  );
  const showPositionTitles = !!experience.role || experience.positions.length > 1;

  return (
    <li className="relative pb-7 last:pb-0">
      {!isLast ? (
        <span
          aria-hidden
          className="absolute top-12 bottom-1 left-[17.5px] w-px bg-[repeating-linear-gradient(to_bottom,var(--gl-border-strong)_0,var(--gl-border-strong)_3px,transparent_3px,transparent_6px)]"
        />
      ) : null}
      <Collapsible defaultOpen={experience.isCurrentEmployer} disabled={!hasDetails}>
        <CollapsibleTrigger
          className={cn(
            "group flex w-full items-start gap-4 text-left",
            hasDetails ? "cursor-pointer" : "cursor-default",
          )}
        >
          <CompanyMark name={experience.companyName} size={36} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h3 className="font-sans text-[17px] leading-snug font-semibold tracking-[-0.015em] text-gl-text">
                {experience.companyName}
                {experience.isCurrentEmployer ? (
                  <span className="sr-only"> (current employer)</span>
                ) : null}
              </h3>
              <p className="font-sans text-[13px] text-gl-text-muted">
                {subtitle}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 pt-0.5 font-sans text-[13px] tabular-nums text-gl-text-muted">
              {period ? <PeriodLabel period={period} /> : null}
              {hasDetails ? (
                <ChevronDownIcon
                  className="size-4 text-gl-text-faint transition-transform duration-200 group-hover:text-gl-text group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              ) : null}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="space-y-6 pt-4 pl-[52px]">
            {experience.positions.map((position) => (
              <ExperiencePosition
                key={position.id}
                position={position}
                showTitle={showPositionTitles}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}

function ExperiencePosition({
  position,
  showTitle,
}: {
  position: ExperiencePositionItemType;
  showTitle: boolean;
}) {
  return (
    <div className="space-y-2">
      {showTitle ? (
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h4 className="font-sans text-[15px] font-semibold text-gl-text">
            {position.title}
          </h4>
          {position.employmentPeriod ? (
            <span className="font-sans text-[13px] tabular-nums text-gl-text-faint">
              <PeriodLabel period={position.employmentPeriod} />
            </span>
          ) : null}
        </div>
      ) : null}
      {position.description ? (
        <div className="space-y-2 text-[15px] leading-[1.7] text-gl-text-muted [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:top-[0.8em] [&_li]:before:left-0 [&_li]:before:h-px [&_li]:before:w-2 [&_li]:before:bg-gl-border-strong [&_ul]:space-y-1.5">
          <ReactMarkdown>{position.description}</ReactMarkdown>
        </div>
      ) : null}
      {position.skills && position.skills.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5 pt-1">
          {position.skills.map((skill) => (
            <li key={skill}>
              <Tag dot={getSwatchColor(skill)}>{skill}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function PeriodLabel({ period }: { period: Period }) {
  const duration = formatDuration(period.start, period.end);
  return (
    <span>
      {formatPeriodDate(period.start)} - {period.end ? formatPeriodDate(period.end) : "Present"}
      {duration ? <span className="text-gl-text-faint"> · {duration}</span> : null}
    </span>
  );
}

function formatPeriodDate(str: string): string {
  if (!str.includes(".")) return str;
  return format(parse(str, "MM.yyyy", new Date()), "MMM yyyy");
}

function formatDuration(start: string, end?: string): string {
  const startDate = parsePeriodDate(start, "first");
  const endDate = end ? parsePeriodDate(end, "last") : new Date();

  const totalMonths = differenceInMonths(endDate, startDate) + 1;
  if (totalMonths <= 0) return "";
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const y = years ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const m = months ? `${months} mo${months > 1 ? "s" : ""}` : "";
  return [y, m].filter(Boolean).join(" ");
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date());
  }
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date(),
  );
}
