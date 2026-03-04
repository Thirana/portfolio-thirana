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
    "I am a curiosity driven software engineer who explores real world backend concepts through hands on learning. I am especially interested in backend systems, distributed systems, and system architecture. I follow a practical cycle: learn, implement, and validate in real working examples.",
  stats: [
    { label: "Interested In", value: "Backend systems" },
    { label: "Delivery Style", value: "Learn, build, validate" },
    { label: "Working Model", value: "Ownership with clear collaboration" },
  ],
};

export const aboutValueProps = [
  "Curious self learner who explores real world backend systems and architecture.",
  "Stays up to date with modern tools, technologies, and engineering concepts.",
  "Takes ownership of responsibilities and delivers with accountability.",
  "Works well with people and adapts quickly to changing situations.",
];

export const aboutProof: AboutProofItem[] = [
  {
    title: "Trimly URL Shortener",
    metric: "Handled 2.5x more clicks per second and cut redirect time from 638ms to 286ms.",
    note: "Performance and safety validated with before and after testing.",
    href: "/projects/url-shortener",
  },
  {
    title: "Caching Guide from a Real System",
    metric: "Documented request flow, cache strategy, and fallback behavior with measured p95 and p99 improvements.",
    note: "Technical depth explained in reader friendly language.",
    href: "/blog/url-shortener-caching",
  },
  {
    title: "Production Grade Portfolio Platform",
    metric: "Implemented static first publishing, controlled revalidation, and route level SEO automation.",
    note: "Shows delivery quality beyond basic UI implementation.",
    href: "/projects/personal-site",
  },
];

export const aboutPrinciples: AboutPrinciple[] = [
  {
    title: "Discover real world concepts",
    description:
      "I identify curious, high impact concepts and features from practical production systems.",
  },
  {
    title: "Learn deeply and intentionally",
    description:
      "I study how each concept works, why it exists, and where it creates real value.",
  },
  {
    title: "Implement and test independently",
    description:
      "I build self driven implementations to validate understanding through real behavior.",
  },
  {
    title: "Integrate with known foundations",
    description:
      "I connect new ideas with what I already know to grow stronger system thinking.",
  },
];

export const aboutCta: AboutCTA = {
  title: "Open to Conversations",
  message:
    "If you are hiring for backend focused roles, I am open to discussing project scope, ownership, and impact expectations.",
  links: [
    { label: "Email", href: "mailto:t.embuldeniya@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/thirana-embuldeniya/",
      external: true,
    },
  ],
};
