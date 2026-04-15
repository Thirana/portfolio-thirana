export type BlogCaptionCoverTone = "offset" | "cursor";

export type BlogCaptionCoverComparisonRow = {
  label: string;
  tone: BlogCaptionCoverTone;
  barFill: number;
  calloutStrong: string;
  calloutSoft?: string;
};

export type BlogCaptionCoverPreset = {
  eyebrow: string;
  displayTitle?: string;
  displaySummary?: string;
  accentWords?: string[];
  comparisonRows: BlogCaptionCoverComparisonRow[];
  chips: string[];
  footerHost: string;
};

export const blogCaptionCoverPresets = {
  "cursor-pagination-product-listing-api": {
    eyebrow: "Production Engineering",
    displayTitle: "Cursor Pagination at Scale",
    displaySummary:
      "How production systems page through millions of records without wasted database work",
    accentWords: ["Pagination"],
    comparisonRows: [
      {
        label: "OFFSET APPROACH",
        tone: "offset",
        barFill: 86,
        calloutStrong: "950 rows scanned",
        calloutSoft: "to return 50",
      },
      {
        label: "CURSOR APPROACH",
        tone: "cursor",
        barFill: 6,
        calloutStrong: "Jumps directly",
        calloutSoft: "to position",
      },
    ],
    chips: [
      "Stable continuation",
      "Index-aware queries",
      "Opaque cursors",
      "PostgreSQL",
    ],
    footerHost: "portfolio-thirana.vercel.app",
  },
} satisfies Record<string, BlogCaptionCoverPreset>;

export type BlogCaptionCoverSlug = keyof typeof blogCaptionCoverPresets;

export function getBlogCaptionCoverPreset(slug: string) {
  return blogCaptionCoverPresets[slug as BlogCaptionCoverSlug] ?? null;
}

export function getBlogCaptionCoverSlugs() {
  return Object.keys(blogCaptionCoverPresets);
}
