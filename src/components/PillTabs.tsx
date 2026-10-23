"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/** Pill-shaped tab row: the selected tab sits in a white outlined pill. */
export function PillTabsList({
  tabs,
  className,
}: {
  tabs: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className="-mx-1 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <TabsList
        className={cn(
          "h-auto min-w-max justify-start gap-1 rounded-none bg-transparent p-0",
          className,
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-full border border-transparent px-3.5 py-1.5 font-sans text-[13px] font-medium text-gl-text-muted shadow-none transition-colors hover:text-gl-text data-[state=active]:border-gl-border data-[state=active]:bg-gl-surface data-[state=active]:text-gl-text data-[state=active]:shadow-gl"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
