import { socials } from "@/content/profile";

export const contactHref =
  socials.find((s) => s.label === "Email")?.href ??
  "mailto:t.embuldeniya@gmail.com";
