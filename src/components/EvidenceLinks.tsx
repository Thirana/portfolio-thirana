import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type EvidenceItem = {
  label: string;
  href: string;
};

type EvidenceLinksProps = {
  items: EvidenceItem[];
  className?: string;
};

export default function EvidenceLinks({
  items,
  className,
}: EvidenceLinksProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={`${item.label}-${item.href}`}>
          <a href={item.href} target="_blank" rel="noreferrer" className="pill">
            {item.label}
            <ArrowUpRight className="size-3.5 text-gl-text-muted" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
