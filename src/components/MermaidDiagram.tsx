"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type MermaidDiagramProps = {
  chart: string;
  className?: string;
};

type MermaidCanvasProps = {
  chart: string;
  renderId: string;
  ariaLabel: string;
  className?: string;
};

let mermaidConfigured = false;

async function getMermaid() {
  const mermaid = (await import("mermaid")).default;

  if (!mermaidConfigured) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables: {
        fontSize: "15px",
        fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
        lineColor: "#a39e94",
        textColor: "#17150f",
        primaryColor: "#ffffff",
        primaryTextColor: "#17150f",
        primaryBorderColor: "#cdc8bf",
        secondaryColor: "#f3f1ed",
        tertiaryColor: "#faf9f7",
        background: "#ffffff",
        mainBkg: "#ffffff",
        nodeBorder: "#cdc8bf",
        actorBkg: "#faf9f7",
        actorBorder: "#cdc8bf",
        noteBkgColor: "#f6ebe5",
        noteBorderColor: "#e3c9bc",
      },
    });
    mermaidConfigured = true;
  }

  return mermaid;
}

function MermaidCanvas({
  chart,
  renderId,
  ariaLabel,
  className,
}: MermaidCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      try {
        const mermaid = await getMermaid();
        const { svg } = await mermaid.render(renderId, chart);

        if (cancelled) {
          return;
        }

        container.innerHTML = svg;
        setError(null);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Failed to render diagram.",
        );
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, renderId]);

  if (error) {
    return (
      <div className="space-y-3">
        <p className="font-sans text-xs text-gl-danger">Mermaid render failed: {error}</p>
        <pre className="overflow-x-auto rounded-xl border border-gl-border bg-gl-bg p-4 text-xs text-gl-text-muted">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} aria-label={ariaLabel} />
  );
}

export default function MermaidDiagram({
  chart,
  className,
}: MermaidDiagramProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const renderBaseId = useMemo(
    () => `mermaid-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [id],
  );
  const isSequenceDiagram = useMemo(
    () => /\bsequenceDiagram\b/.test(chart),
    [chart],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className={cn("not-prose my-6", className)}>
        <div className="card p-4">
          <div className="mb-3 flex justify-end">
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="pill h-8 px-3 shadow-none"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Expand
              </Button>
            </DialogTrigger>
          </div>
          <div className="overflow-x-auto">
            <MermaidCanvas
              chart={chart}
              renderId={`${renderBaseId}-inline`}
              ariaLabel="Mermaid diagram"
              className="[&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:max-w-none [&_svg]:min-w-[760px] md:[&_svg]:min-w-0"
            />
          </div>
        </div>
      </div>

      <DialogContent className="flex h-[85vh] max-h-[85vh] flex-col overflow-hidden">
        <DialogTitle className="sr-only">Expanded Mermaid diagram</DialogTitle>
        <DialogDescription className="sr-only">
          Larger view of the current Mermaid diagram.
        </DialogDescription>

        <div className="border-b border-gl-border px-5 py-4 pr-14">
          <p className="font-sans text-[14px] font-medium text-gl-text">
            Expanded diagram
          </p>
        </div>

        <div className="min-h-0 flex-1 p-4 sm:p-6">
          {open ? (
            <div className="h-full overflow-auto overscroll-contain rounded-[14px] bg-gl-surface p-4 shadow-gl [scrollbar-width:thin]">
              <MermaidCanvas
                chart={chart}
                renderId={`${renderBaseId}-dialog`}
                ariaLabel="Expanded Mermaid diagram"
                className={cn(
                  "w-max min-w-full [&_svg]:block [&_svg]:h-auto [&_svg]:max-w-none [&_svg]:min-w-[960px]",
                  isSequenceDiagram &&
                    "flex min-h-full items-center justify-center [&_svg]:mx-auto",
                )}
              />
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
