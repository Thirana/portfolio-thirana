import type { Metadata } from "next";
import Image from "next/image";
import {
  Briefcase,
  Compass,
  GraduationCap,
  Layers,
  MapPin,
  Phone,
  UserRound,
  Wrench,
} from "lucide-react";
import {
  aboutPrinciples,
  aboutSummary,
  heroBioPoints,
} from "@/content/about";
import { WORK_EXPERIENCE } from "@/content/experience";
import { profile } from "@/content/profile";
import {
  getBlogMetaBySlug,
  getProjectMetaBySlug,
  type ProjectMeta,
  type ContentMeta,
} from "@/lib/content";
import TechTabs from "@/components/TechTabs";
import FeaturedWorkTabs from "@/components/FeaturedWorkTabs";
import Section, { Seam } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer working across backend systems, frontend interfaces, and cloud infrastructure.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: `About | ${siteConfig.name}`,
    description:
      "Software engineer working across backend systems, frontend interfaces, and cloud infrastructure.",
  },
  twitter: {
    card: "summary",
    title: `About | ${siteConfig.name}`,
    description:
      "Software engineer working across backend systems, frontend interfaces, and cloud infrastructure.",
    creator: siteConfig.authorHandle,
  },
};

export default async function AboutPage() {
  const [growLogs, personalSite, sessionSecurity, safeOrder] =
    await Promise.all([
      getProjectMetaBySlug("grow-logs"),
      getProjectMetaBySlug("personal-site"),
      getBlogMetaBySlug("session-security-in-practice"),
      getBlogMetaBySlug("safe-order-creation-idempotency-transactions"),
    ]);

  const projects = [growLogs, personalSite].filter(
    (p): p is ProjectMeta => p != null,
  );
  const posts = [sessionSecurity, safeOrder].filter(
    (p): p is ContentMeta => p != null,
  );

  const currentEmployer = WORK_EXPERIENCE.find((e) => e.isCurrentEmployer);
  const currentTitle =
    currentEmployer?.role?.title ?? currentEmployer?.positions[0]?.title;

  const facts = [
    ...(currentTitle && currentEmployer
      ? [
          {
            icon: Briefcase,
            text: `${currentTitle} at ${currentEmployer.companyName}`,
          },
        ]
      : []),
    { icon: GraduationCap, text: "BSc (Hons) in Computer Engineering" },
    { icon: MapPin, text: "Colombo, Sri Lanka" },
    {
      icon: Phone,
      text: (
        <a
          href="tel:+94714594040"
          className="transition-colors hover:text-gl-text"
        >
          +94 71 459 4040
        </a>
      ),
    },
  ];

  return (
    <div className="space-y-7 sm:space-y-8">
      <header className="space-y-6">
        <div className="flex items-center gap-5">
          <Image
            src="/images/square.png"
            alt={profile.name}
            width={88}
            height={88}
            priority
            className="size-[72px] rounded-2xl object-cover object-top shadow-gl sm:size-[88px]"
          />
          <div className="space-y-1.5">
            <h1 className="font-sans text-[40px] leading-none font-semibold tracking-[-0.03em] text-gl-text sm:text-[52px]">
              About
            </h1>
            <p className="font-sans text-[14px] text-gl-text-muted">
              {profile.name}
            </p>
          </div>
        </div>
        <p className="text-[18px] leading-[1.6] text-gl-text">{aboutSummary}</p>
        <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {facts.map((fact, i) => {
            const Icon = fact.icon;
            return (
              <li
                key={i}
                className="flex items-center gap-2.5 font-sans text-[14px] text-gl-text-muted"
              >
                <Icon
                  className="size-4 shrink-0 text-gl-text-faint"
                  aria-hidden
                />
                <span>{fact.text}</span>
              </li>
            );
          })}
        </ul>
      </header>

      <Seam />

      <Section title="In short" icon={UserRound} tone="var(--gl-swatch-2)">
        <ul className="space-y-3">
          {heroBioPoints.map((point) => (
            <li
              key={point}
              className="flex gap-3 text-[17px] leading-[1.6] text-gl-text"
            >
              <span
                className="mt-[0.8em] h-px w-2.5 shrink-0 bg-gl-border-strong"
                aria-hidden
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Seam />

      <Section title="Technologies and tools" icon={Wrench} tone="var(--gl-swatch-4)">
        <TechTabs />
      </Section>

      <Seam />

      <Section title="Featured work" icon={Layers} tone="var(--gl-swatch-5)">
        <FeaturedWorkTabs projects={projects} posts={posts} />
      </Section>

      <Seam />

      <Section title="How I work" icon={Compass} tone="var(--gl-swatch-6)">
        <dl className="divide-y divide-gl-border border-y border-gl-border">
          {aboutPrinciples.map((item) => (
            <div
              key={item.title}
              className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6"
            >
              <dt className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-gl-text">
                {item.title}
              </dt>
              <dd className="text-[16px] leading-[1.55] text-gl-text-muted">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}
