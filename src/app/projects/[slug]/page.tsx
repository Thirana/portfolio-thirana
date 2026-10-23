import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Layers, ListChecks } from "lucide-react";
import {
  getAllProjects,
  getBlogsByProject,
  getProjectBySlug,
  getProjectMetaBySlug,
} from "@/lib/content";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import EvidenceLinks from "@/components/EvidenceLinks";
import RelatedBlogs from "@/components/RelatedBlogs";
import StatusBadge from "@/components/StatusBadge";
import ContentHero from "@/components/ContentHero";
import Section, { Seam } from "@/components/Section";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getProjectMetaBySlug(slug);

  if (!meta) {
    return {};
  }

  const canonicalPath = `/projects/${slug}`;

  return {
    title: meta.title,
    description: meta.summary,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date || undefined,
      tags: [...meta.tech, ...meta.domains],
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

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result) {
    notFound();
  }

  const { meta, Content } = result;
  const relatedPosts = await getBlogsByProject(meta.slug);
  const canonicalPath = `/projects/${meta.slug}`;
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: meta.title,
    description: meta.summary,
    datePublished: meta.date || undefined,
    codeRepository: meta.links.code || undefined,
    programmingLanguage: meta.tech,
    keywords: [...meta.tech, ...meta.domains],
    url: absoluteUrl(canonicalPath),
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.authorName,
    },
    sameAs: [meta.links.live, meta.links.code].filter(Boolean),
  };

  const projectCapabilityRows = (
    meta.domains.length > 0 ? meta.domains : ["System Design"]
  ).map((domain, index) => {
    const mappedConstraint =
      meta.constraints[index] ??
      meta.constraints[meta.constraints.length - 1] ??
      "Core system behavior documented in project notes.";
    const mappedMetric =
      meta.metrics[index] ?? meta.metrics[meta.metrics.length - 1];

    return {
      domain,
      focus: mappedConstraint,
      signal: mappedMetric
        ? `${mappedMetric.label}: ${mappedMetric.value}`
        : `Status: ${meta.status}`,
    };
  });

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <ContentHero
        back={{ href: "/projects", label: "All projects" }}
        title={meta.title}
        summary={meta.summary}
        meta={
          <>
            <StatusBadge status={meta.status} />
            {meta.date ? (
              <span className="tabular-nums">
                {new Date(meta.date).getFullYear()}
              </span>
            ) : null}
            {meta.links.code ? (
              <a
                href={meta.links.code}
                target="_blank"
                rel="noreferrer"
                className="pill py-1"
              >
                Repository
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ) : null}
            {meta.links.live ? (
              <a
                href={meta.links.live}
                target="_blank"
                rel="noreferrer"
                className="pill py-1"
              >
                Live
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ) : null}
          </>
        }
        chips={meta.tech}
      />

      <Seam />

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

      <Section title="Concepts and strategies" icon={Layers} tone="var(--gl-swatch-2)">
        <CapabilityMatrix rows={projectCapabilityRows} />
        <EvidenceLinks
          items={meta.evidence.filter((e) => e.label !== "Repository")}
        />
      </Section>

      <Seam />

      <article className="prose max-w-none content-with-hero">
        <Content />
      </article>

      <RelatedBlogs posts={relatedPosts} />
    </div>
  );
}
