import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DiagramProps = {
  /** Exported SVG under /public, e.g. /diagrams/work/<slug>/<name>.svg */
  src: string;
  /** Describe what the diagram shows, not what it looks like. */
  alt: string;
  /** Intrinsic size from the SVG viewBox, so the card reserves its height. */
  width: number;
  height: number;
  caption?: string;
};

/**
 * A hand-drawn (Excalidraw) diagram drawn straight on the page paper; its SVG
 * is exported without a background. On phones the inline copy is small, so
 * "Expand" opens it at full size to scroll and read.
 */
export default function Diagram({
  src,
  alt,
  width,
  height,
  caption,
}: DiagramProps) {
  return (
    <Dialog>
      <figure className="not-prose my-8">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG with inlined fonts */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto w-full max-w-[40rem]"
          />
          <div className="mt-2 flex justify-end sm:hidden">
            <DialogTrigger asChild>
              <button type="button" className="pill h-8 px-3">
                <Maximize2 className="size-3.5" aria-hidden />
                Expand
              </button>
            </DialogTrigger>
          </div>
        </div>
        {caption ? (
          <figcaption className="mt-2.5 text-center font-sans text-[13px] text-gl-text-faint">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      <DialogContent className="flex h-[85vh] max-h-[85vh] flex-col overflow-hidden">
        <DialogTitle className="sr-only">Expanded diagram</DialogTitle>
        <DialogDescription className="sr-only">{alt}</DialogDescription>
        <div className="border-b border-gl-border px-5 py-4 pr-14">
          <p className="font-sans text-[14px] font-medium text-gl-text">
            {caption ?? "Diagram"}
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-4 [scrollbar-width:thin]">
          {/* eslint-disable-next-line @next/next/no-img-element -- same SVG, full size */}
          <img
            src={src}
            alt=""
            width={width}
            height={height}
            className="block h-auto w-[40rem] max-w-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
