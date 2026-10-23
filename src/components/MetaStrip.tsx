import { cn } from "@/lib/utils";

export type MetaStripItem = {
  label: string;
  value: string;
};

type MetaStripProps = {
  items: MetaStripItem[];
  className?: string;
};

export default function MetaStrip({ items, className }: MetaStripProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <dl
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-2 pt-1 font-sans text-[14px]",
        className,
      )}
    >
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="flex items-baseline gap-1.5">
          <dd className="font-semibold tabular-nums text-gl-text">{item.value}</dd>
          <dt className="text-gl-text-muted">{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}
