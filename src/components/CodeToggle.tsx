"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { ChevronDown, Code2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((m) => ({ default: m.Prism })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[60px] animate-pulse rounded-lg bg-gl-surface-2" />
    ),
  },
);

const githubLight: Record<string, CSSProperties> = {
  'code[class*="language-"]': {
    color: "#24292f",
    background: "none",
    fontStyle: "normal",
  },
  'pre[class*="language-"]': {
    color: "#24292f",
    background: "none",
    fontStyle: "normal",
  },
  comment: { color: "#6e7781", fontStyle: "normal" },
  prolog: { color: "#6e7781", fontStyle: "normal" },
  doctype: { color: "#6e7781", fontStyle: "normal" },
  cdata: { color: "#6e7781", fontStyle: "normal" },
  punctuation: { color: "#24292f" },
  property: { color: "#0550ae" },
  tag: { color: "#116329" },
  boolean: { color: "#0550ae" },
  number: { color: "#0550ae" },
  constant: { color: "#0550ae" },
  symbol: { color: "#8250df" },
  deleted: { color: "#cf222e" },
  selector: { color: "#116329" },
  "attr-name": { color: "#0550ae" },
  string: { color: "#0a3069" },
  char: { color: "#0a3069" },
  builtin: { color: "#116329" },
  inserted: { color: "#116329" },
  operator: { color: "#24292f" },
  entity: { color: "#24292f" },
  url: { color: "#0a3069" },
  variable: { color: "#953800" },
  atrule: { color: "#cf222e" },
  "attr-value": { color: "#0a3069" },
  function: { color: "#8250df" },
  "class-name": { color: "#953800" },
  keyword: { color: "#cf222e" },
  regex: { color: "#0a3069" },
  important: { color: "#cf222e", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "normal" },
  namespace: { opacity: "0.7" } as CSSProperties,
};

type CodeToggleProps = {
  title: string;
  code: string;
  language?: string;
  defaultOpen?: boolean;
};

export default function CodeToggle({
  title,
  code,
  language = "typescript",
  defaultOpen = false,
}: CodeToggleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="not-prose card my-4 p-2">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-auto w-full items-start justify-between rounded-[10px] border-0 bg-transparent px-3 py-2 text-left font-sans text-[13px] font-medium whitespace-normal text-gl-text-muted shadow-none hover:bg-gl-surface-2 hover:text-gl-text"
          >
            <span className="flex min-w-0 flex-1 items-start gap-2">
              <Code2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{title}</span>
            </span>
            <ChevronDown
              className={cn(
                "ml-2 mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="mt-2 overflow-x-auto rounded-[10px] border border-gl-border bg-gl-bg [scrollbar-width:thin]">
            <SyntaxHighlighter
              language={language}
              style={githubLight}
              customStyle={{
                margin: 0,
                padding: "1rem 1.25rem",
                borderRadius: "0.5rem",
                background: "transparent",
                fontSize: "0.8rem",
                lineHeight: "1.65",
                whiteSpace: "pre",
              }}
              codeTagProps={{
                style: {
                  fontFamily:
                    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
                  whiteSpace: "pre",
                  background: "transparent",
                  border: "0",
                  padding: "0",
                  display: "block",
                  fontStyle: "normal",
                },
              }}
              showLineNumbers={false}
              wrapLongLines={false}
            >
              {code.trim()}
            </SyntaxHighlighter>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
