export type AboutStat = {
  label: string;
  value: string;
};

export type AboutIntro = {
  eyebrow: string;
  title: string;
  summary: string;
  stats: AboutStat[];
};

export type AboutProofItem = {
  title: string;
  metric: string;
  note: string;
  href: string;
};

export type AboutPrinciple = {
  title: string;
  description: string;
};

export type AboutCTALink = {
  label: string;
  href: string;
  external?: boolean;
};

export type AboutCTA = {
  title: string;
  message: string;
  links: AboutCTALink[];
};

export const aboutIntro: AboutIntro = {
  eyebrow: "Candidate Snapshot",
  title: "About",
  summary:
    "I build backend systems that stay reliable when traffic grows and edge cases appear. My focus is simple: ship features that are fast for users, safe in production, and easy for teams to operate.",
  stats: [
    { label: "Primary Focus", value: "Backend reliability" },
    { label: "Delivery Style", value: "Measure, then improve" },
    { label: "Working Model", value: "Clear ownership and communication" },
  ],
};

export const aboutValueProps = [
  "Reliable backend delivery under real-world constraints.",
  "Measurable improvements backed by evidence, not guesswork.",
  "Clear communication with strong operational ownership.",
];

export const aboutProof: AboutProofItem[] = [
  {
    title: "Trimly URL Shortener",
    metric: "Handled 2.5x more clicks per second and cut redirect time from 638ms to 286ms.",
    note: "Performance and safety validated with before-and-after testing.",
    href: "/projects/url-shortener",
  },
  {
    title: "Caching Guide from a Real System",
    metric: "Documented request flow, cache strategy, and fallback behavior with measured p95 and p99 improvements.",
    note: "Technical depth explained in reader-friendly language.",
    href: "/blog/url-shortener-caching",
  },
  {
    title: "Production-Grade Portfolio Platform",
    metric: "Implemented static-first publishing, controlled revalidation, and route-level SEO automation.",
    note: "Shows delivery quality beyond basic UI implementation.",
    href: "/projects/personal-site",
  },
];

export const aboutPrinciples: AboutPrinciple[] = [
  {
    title: "Start from user impact",
    description:
      "I prioritize what users feel first, then choose architecture that protects that experience.",
  },
  {
    title: "Measure before and after",
    description:
      "I baseline behavior, apply improvements, and compare results with clear numbers.",
  },
  {
    title: "Design for failure safety",
    description:
      "I add graceful fallback paths so outages in one layer do not break the full journey.",
  },
  {
    title: "Keep systems explainable",
    description:
      "I favor clear contracts and readable decisions so teams can operate and extend confidently.",
  },
];

export const aboutCta: AboutCTA = {
  title: "Open to Conversations",
  message:
    "If you are hiring for backend-focused roles, I am open to discussing project scope, ownership, and impact expectations.",
  links: [
    { label: "Email", href: "mailto:t.embuldeniya@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/thirana-embuldeniya/",
      external: true,
    },
  ],
};
