export type TechRelatedItem = {
  label: string;
  href: string;
  type: "project" | "blog" | "work";
};

export type TechTab = {
  value: string;
  label: string;
  tools: string[];
  highlights: string[];
  related: TechRelatedItem[];
};

export const techTabs: TechTab[] = [
  {
    value: "web",
    label: "Web Development",
    tools: [
      "NestJS",
      "Express",
      "Node.js",
      "React",
      "Next.js",
      "TanStack Query",
      "Zod",
    ],
    highlights: [
      "Built this personal portfolio site with Next.js using static generation, tag based on demand revalidation, and automated social card generation per route.",
      "Built a production NestJS bootstrap sequence with env validation, global exception filter, request ID middleware, and structured logging interceptor.",
    ],
    related: [
      {
        label: "Personal Site",
        href: "/projects/personal-site",
        type: "project",
      },
    ],
  },
  {
    value: "data",
    label: "Data",
    tools: ["PostgreSQL", "Prisma", "Redis", "MongoDB"],
    highlights: [
      "Implemented cursor based pagination using a composite PostgreSQL index on (created_at, id) with a tie breaker to prevent record skipping under concurrent writes.",
      "Built a Redis cache aside layer that cut redirect latency from 638ms to 286ms and handled 2.5x more requests per second.",
      "Used SHA256 fingerprinting stored in PostgreSQL to make order creation idempotent under retries and duplicate submissions.",
    ],
    related: [],
  },
  {
    value: "auth",
    label: "Auth & Security",
    tools: [
      "JWT (RS256)",
      "Refresh token rotation",
      "HttpOnly cookies",
      "CORS",
      "RBAC",
    ],
    highlights: [
      "Rebuilt session management at MO Marketplace: short-lived RS256 access tokens and rotating refresh tokens with reuse detection, so a stolen copy ends that session.",
      "Made sessions endable on the server - one device on logout, every device on a ban or password change - and shipped the change without logging anyone out.",
      "Moved the website's refresh token into an HttpOnly cookie, behind a strict CORS allowlist and an origin check on refresh and logout.",
    ],
    related: [
      {
        label: "Session management, part 1",
        href: "/work/session-management-backend",
        type: "work",
      },
      {
        label: "Session Security in Practice",
        href: "/blog/session-security-in-practice",
        type: "blog",
      },
      {
        label: "How CORS and Cookies Work Together",
        href: "/blog/cors-and-cookies-in-practice",
        type: "blog",
      },
    ],
  },
  {
    value: "infra",
    label: "Infrastructure",
    tools: [
      "AWS EKS",
      "Kubernetes",
      "Terraform",
      "Helm",
      "Argo CD",
      "Karpenter",
      "Docker",
    ],
    highlights: [
      "Migrated customers from EC2 to multi tenant AWS EKS with namespace isolation using Argo CD and Helm.",
      "Implemented Karpenter autoscaling achieving approximately 40% infrastructure cost reduction.",
      "Reduced tenant provisioning time from around 4 minutes to 2 minutes with automated GitOps onboarding.",
    ],
    related: [],
  },
];

export const aboutSummary =
  "I am a software engineer who works across backend systems, frontend interfaces, and cloud infrastructure. I enjoy studying how real production platforms are built and validated, then applying those patterns through self-driven projects and professional work.";

export const heroBioPoints = [
  "Software engineer with 1.5 years of industry experience and a BSc (Hons) in Computer Engineering from the University of Sri Jayewardenepura.",
  "Currently engineering MO Marketplace's backend platform end-to-end, spanning NestJS APIs, PostgreSQL, GCP Cloud Run deployments, CI/CD pipelines, and production observability.",
  "Experienced across cloud-native infrastructure and DevOps - AWS EKS, Kubernetes, Terraform, and GitOps-driven multi-tenant platform delivery.",
];

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

export const aboutPrinciples: AboutPrinciple[] = [
  {
    title: "Discover real-world concepts",
    description:
      "I identify high-impact patterns from real production systems and research how they work at scale.",
  },
  {
    title: "Learn deeply and intentionally",
    description:
      "I study the why behind each concept - the tradeoffs, failure modes, and conditions where it applies.",
  },
  {
    title: "Implement and validate independently",
    description:
      "I build self-driven implementations to validate understanding through real, observable behavior.",
  },
  {
    title: "Integrate with existing foundations",
    description:
      "I connect new ideas to what I already know, growing a stronger and more coherent mental model of systems.",
  },
];

export const aboutCta: AboutCTA = {
  title: "Open to Conversations",
  message:
    "If you are hiring for software engineering roles, I am open to discussing project scope, ownership expectations, and technical fit.",
  links: [
    { label: "Email", href: "mailto:t.embuldeniya@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/thirana-embuldeniya/",
      external: true,
    },
  ],
};
