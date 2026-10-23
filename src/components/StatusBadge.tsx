import type { ProjectStatus } from "@/lib/content";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: ProjectStatus;
  className?: string;
};

const statusDot: Record<ProjectStatus, string> = {
  Live: "bg-gl-success",
  Ongoing: "bg-gl-swatch-4",
  WIP: "bg-gl-swatch-4",
  Paused: "bg-gl-text-faint",
  Completed: "bg-gl-swatch-6",
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gl-border px-2.5 py-[3px] font-sans text-[12px] font-medium text-gl-text-muted",
        className,
      )}
    >
      <span
        className={cn("size-1.5 rounded-full", statusDot[status])}
        aria-hidden
      />
      {status}
    </span>
  );
}
