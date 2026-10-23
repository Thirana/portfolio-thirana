import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
  dot?: string;
  className?: string;
};

export default function Tag({ children, icon, dot, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-gl-border bg-gl-surface px-2 py-[3px] font-sans text-[12.5px] font-medium leading-tight text-gl-text",
        className,
      )}
    >
      {dot ? (
        <span
          className="size-1.5 shrink-0 rounded-full"
          style={{ background: dot }}
          aria-hidden
        />
      ) : null}
      {icon ? <span className="text-gl-text-muted">{icon}</span> : null}
      {children}
    </span>
  );
}
