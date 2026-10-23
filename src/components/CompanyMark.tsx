import { getSwatchColor } from "@/lib/swatch";
import { cn } from "@/lib/utils";

function initials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  const first = words[0] ?? "";
  if (/^[A-Z0-9]{2,4}$/.test(first)) return first;
  const picked = words.length >= 3 ? words.slice(0, 4) : words.slice(0, 2);
  return picked.map((w) => w[0]?.toUpperCase() ?? "").join("");
}

/** Monogram tile standing in for a company logo. */
export function CompanyMark({
  name,
  size = 36,
  withTooltip = false,
  className,
}: {
  name: string;
  size?: number;
  withTooltip?: boolean;
  className?: string;
}) {
  const label = initials(name);
  return (
    <span
      role="img"
      aria-label={name}
      title={withTooltip ? name : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[22%] font-sans font-bold tracking-[-0.02em] text-white shadow-[inset_0_0_0_1px_rgba(23,21,15,0.08)]",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: getSwatchColor(name),
        fontSize: Math.max(11, Math.round(size * (label.length > 2 ? 0.3 : 0.38))),
        letterSpacing: label.length > 2 ? "-0.04em" : undefined,
      }}
    >
      {label}
    </span>
  );
}
