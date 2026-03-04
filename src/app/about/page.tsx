import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  aboutCta,
  aboutIntro,
  aboutPrinciples,
  aboutProof,
  aboutValueProps,
} from "@/content/about";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Proof first profile focused on reliable backend delivery, measurable outcomes, and production ownership.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: `About | ${siteConfig.name}`,
    description:
      "Proof first profile focused on reliable backend delivery, measurable outcomes, and production ownership.",
  },
  twitter: {
    card: "summary",
    title: `About | ${siteConfig.name}`,
    description:
      "Proof first profile focused on reliable backend delivery, measurable outcomes, and production ownership.",
    creator: siteConfig.authorHandle,
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-border/80 bg-panel/35 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-neutral-400">
          {aboutIntro.eyebrow}
        </p>
        <h1 className="text-3xl font-semibold text-neutral-100">{aboutIntro.title}</h1>
        <p className="max-w-2xl text-sm leading-7 text-neutral-300">
          {aboutIntro.summary}
        </p>
        <div className="grid overflow-hidden rounded-xl border border-border/70 bg-panel/25 sm:grid-cols-3">
          {aboutIntro.stats.map((item) => (
            <div
              key={item.label}
              className="space-y-1 border-b border-border/60 px-4 py-3 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                {item.label}
              </p>
              <p className="font-mono text-xs text-neutral-100">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-border/70 bg-panel/25 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          What You Get
        </h2>
        <ul className="space-y-2 text-sm text-neutral-200">
          {aboutValueProps.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-2xl border border-border/80 bg-panel/30 p-5 sm:p-6">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Selected Proof
          </h2>
          <p className="text-sm text-neutral-300">
            Highlights chosen for fast review. Each item links to detailed evidence.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {aboutProof.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex h-full min-h-[180px] flex-col justify-between rounded-xl border border-border/80 bg-panel/40 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-500/70 hover:shadow-[0_24px_50px_-32px_rgba(15,23,42,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
            >
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-neutral-100 transition-colors group-hover:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-neutral-200">{item.metric}</p>
                <p className="text-xs leading-5 text-neutral-400">{item.note}</p>
              </div>
              <span className="mt-4 inline-flex min-h-11 items-center gap-1 font-mono text-xs uppercase tracking-[0.16em] text-emerald-300">
                View evidence
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border/70 bg-panel/25 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          My Continuous Learning
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {aboutPrinciples.map((item, index) => (
            <article
              key={item.title}
              className="space-y-1 rounded-lg border border-border/70 bg-panel/20 p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                {`0${index + 1}`}
              </p>
              <h3 className="text-sm font-semibold text-neutral-100">{item.title}</h3>
              <p className="text-sm leading-6 text-neutral-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-border/80 bg-panel/35 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {aboutCta.title}
        </h2>
        <p className="text-sm leading-7 text-neutral-200">{aboutCta.message}</p>
        <div className="flex flex-wrap gap-2">
          {aboutCta.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border/80 bg-panel/35 px-4 text-sm font-medium text-neutral-100 transition-colors hover:border-neutral-500/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
