import { ArrowUpRight } from "lucide-react";
import { MascotStamp } from "@/components/Mascot";
import { contactHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function WorkWithMe({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5",
        className,
      )}
    >
      <div className="flex items-start gap-4 sm:items-center">
        <span className="stamp shrink-0">
          <MascotStamp size={56} />
        </span>
        <div className="min-w-0 space-y-1">
          <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-gl-text">
            Work with me
          </h2>
          <p className="text-[15px] leading-[1.45] text-gl-text-muted">
            Hiring for a backend or platform role, or want to talk through a
            system? Tell me what you have in mind.
          </p>
        </div>
      </div>
      <a
        href={contactHref}
        className="pill-ink shrink-0 justify-center self-start px-4 py-2.5 sm:ml-auto sm:self-center"
      >
        Send me a note
        <ArrowUpRight className="size-3.5" />
      </a>
    </div>
  );
}
