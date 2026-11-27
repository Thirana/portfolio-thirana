import type { ReactNode } from "react";
import { Info, Target, TriangleAlert, type LucideIcon } from "lucide-react";

type CalloutTone = "success" | "warning" | "note";

const TONES: Record<
  CalloutTone,
  { box: string; label: string; icon: LucideIcon }
> = {
  success: {
    box: "border-gl-success/20 bg-gl-success-soft",
    label: "text-gl-success",
    icon: Target,
  },
  warning: {
    box: "border-gl-warning/20 bg-gl-warning-soft",
    label: "text-gl-warning",
    icon: TriangleAlert,
  },
  note: {
    box: "border-gl-border bg-gl-bg-subtle",
    label: "text-gl-text-muted",
    icon: Info,
  },
};

type CalloutProps = {
  /** Short label above the text, e.g. "The goal". */
  title?: string;
  tone?: CalloutTone;
  children: ReactNode;
};

/** A soft tinted box for the one sentence a reader should not miss. */
export default function Callout({
  title,
  tone = "success",
  children,
}: CalloutProps) {
  const style = TONES[tone];
  const Icon = style.icon;

  return (
    <aside
      className={`not-prose my-6 rounded-[14px] border px-5 py-4 ${style.box}`}
    >
      {title ? (
        <p
          className={`mb-1.5 flex items-center gap-1.5 font-sans text-[13px] font-semibold ${style.label}`}
        >
          <Icon className="size-4" aria-hidden />
          {title}
        </p>
      ) : null}
      <div className="text-[17px] leading-[1.65] text-gl-text [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
