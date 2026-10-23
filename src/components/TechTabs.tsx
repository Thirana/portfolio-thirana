"use client";

import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, BookOpen, FolderGit2 } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PillTabsList } from "@/components/PillTabs";
import Tag from "@/components/Tag";
import { techTabs } from "@/content/about";
import { getSwatchColor } from "@/lib/swatch";

export default function TechTabs() {
  return (
    <Tabs defaultValue={techTabs[0].value}>
      <PillTabsList
        tabs={techTabs.map((tab) => ({ value: tab.value, label: tab.label }))}
      />

      {techTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-5">
          <div className="card space-y-5 p-5 sm:p-6">
            <ul className="flex flex-wrap gap-1.5">
              {tab.tools.map((tool) => (
                <li key={tool}>
                  <Tag dot={getSwatchColor(tool)}>{tool}</Tag>
                </li>
              ))}
            </ul>

            {tab.highlights.length > 0 && (
              <ul className="space-y-2.5">
                {tab.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[16px] leading-[1.6] text-gl-text-muted"
                  >
                    <span
                      className="mt-[0.8em] h-px w-2.5 shrink-0 bg-gl-border-strong"
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab.related.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-gl-border pt-4">
                {tab.related.map((item) => {
                  const Icon = item.type === "blog" ? BookOpen : FolderGit2;
                  return (
                    <Link
                      key={item.href}
                      href={item.href as Route<string>}
                      className="pill group"
                    >
                      <Icon className="size-3.5 text-gl-text-muted" aria-hidden />
                      {item.label}
                      <ArrowRight
                        className="size-3 text-gl-text-faint transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
