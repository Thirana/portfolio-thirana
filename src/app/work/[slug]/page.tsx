import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListChecks, ScanEye } from "lucide-react";
import { getAllWork, getWorkBySlug, getWorkMetaBySlug } from "@/lib/content";
import ContentHero from "@/components/ContentHero";
import Section, { Seam } from "@/components/Section";
import { HighlightTags, WorkByline } from "@/components/WorkCard";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const work = await getAllWork();
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getWorkMetaBySlug(slug);

  if (!meta) {
    return {};
  }

  const canonicalPath = `/work/${slug}`;

  return {
    title: meta.title,
    description: meta.summary,
    alternates: {
      canonical: canonicalPath,
    },
    robots: meta.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date,
      tags: meta.tech,
      images: [
        {
          url: `${canonicalPath}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
      creator: siteConfig.authorHandle,
      images: [`${canonicalPath}/twitter-image`],
    },
  };
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getWorkBySlug(slug);

  if (!result) {
    notFound();
  }

  const { meta, Content } = result;
  const canonicalPath = `/work/${meta.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    keywords: meta.tech,
    url: absoluteUrl(canonicalPath),
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: absoluteUrl("/"),
    },
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ContentHero
        back={{ href: "/work", label: "All work" }}
        title={meta.title}
        summary={meta.summary}
        meta={<WorkByline work={meta} />}
        chips={meta.tech}
      />

      <Seam />

      {meta.glance.length > 0 ? (
        <Section title="At a glance" icon={ScanEye} tone="var(--gl-swatch-6)">
          <div className="card px-5 py-1 sm:px-6">
            <dl className="divide-y divide-gl-border">
              {meta.glance.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4"
                >
                  <dt className="font-sans text-[13px] font-medium text-gl-text-faint sm:pt-0.5">
                    {row.label}
                  </dt>
                  <dd className="text-[16px] leading-[1.55] text-gl-text">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <HighlightTags work={meta} />
        </Section>
      ) : null}

      {meta.outcomes.length > 0 ? (
        <Section title="Outcomes" icon={ListChecks} tone="var(--gl-swatch-1)">
          <ul className="space-y-2.5">
            {meta.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-3 text-[17px] leading-[1.6] text-gl-text"
              >
                <span
                  className="mt-[0.8em] h-px w-2.5 shrink-0 bg-gl-border-strong"
                  aria-hidden
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Seam />

      <article className="work-prose prose max-w-none">
        <Content />
      </article>
    </div>
  );
}
