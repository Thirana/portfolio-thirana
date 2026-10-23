"use client";

import { use } from "react";
import { format, parseISO } from "date-fns";
import { Github } from "lucide-react";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Activity } from "@/components/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph";

export function GitHubContributions({
  contributions,
  githubProfileUrl,
  className,
  hideFooter = false,
  hideMonthLabels = false,
  blockSize = 9,
  blockMargin = 3,
}: {
  contributions: Promise<Activity[]>;
  githubProfileUrl: string;
  className?: string;
  hideFooter?: boolean;
  hideMonthLabels?: boolean;
  blockSize?: number;
  blockMargin?: number;
}) {
  const data = use(contributions);
  // When month labels are hidden the label-height row is dead space;
  // setting fontSize=0 collapses it (labelHeight = 0 + LABEL_MARGIN = 8px).
  const fontSize = hideMonthLabels ? 0 : 14;

  return (
    <TooltipProvider delayDuration={200}>
      <ContributionGraph
        className={cn("w-full gap-4", className)}
        data={data}
        blockSize={blockSize}
        blockMargin={blockMargin}
        blockRadius={2}
        fontSize={fontSize}
      >
        {!hideFooter && (
          <ContributionGraphTotalCount>
            {({ totalCount }) => (
              <div className="flex items-baseline justify-between gap-4 font-sans text-[14px] text-gl-text-muted">
                <p>
                  <span className="font-semibold text-gl-text tabular-nums">
                    {totalCount.toLocaleString("en")}
                  </span>{" "}
                  contributions since{" "}
                  {data.length > 0
                    ? format(parseISO(data[0].date), "MMM yyyy")
                    : "last year"}
                </p>
                <a
                  className="inline-flex items-center gap-1.5 text-[13px] transition-colors hover:text-gl-text"
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-3.5" aria-hidden />
                  Thirana
                </a>
              </div>
            )}
          </ContributionGraphTotalCount>
        )}

        <ContributionGraphCalendar
          className="no-scrollbar"
          title="GitHub contributions in the last year"
          hideMonthLabels={hideMonthLabels}
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent className="font-sans text-[12px]">
                <p>
                  {activity.count} contribution
                  {activity.count !== 1 ? "s" : ""} on{" "}
                  {format(new Date(activity.date), "dd MMM yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        {!hideFooter && (
          <ContributionGraphFooter className="justify-end font-sans text-[12px]">
            <ContributionGraphLegend />
          </ContributionGraphFooter>
        )}
      </ContributionGraph>
    </TooltipProvider>
  );
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-[160px] w-full items-center justify-center">
      <Spinner className="text-gl-text-faint" />
    </div>
  );
}
