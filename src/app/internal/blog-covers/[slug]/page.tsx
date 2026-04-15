import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCaptionCoverDownload from "@/components/BlogCaptionCoverDownload";
import { getBlogMetaBySlug } from "@/lib/content";
import {
  getBlogCaptionCoverPreset,
  getBlogCaptionCoverSlugs,
} from "@/lib/blog-cover-presets";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Internal Blog Cover Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return getBlogCaptionCoverSlugs().map((slug) => ({ slug }));
}

export default async function InternalBlogCoverPage({ params }: PageProps) {
  const { slug } = await params;
  const preset = getBlogCaptionCoverPreset(slug);

  if (!preset) {
    notFound();
  }

  const meta = await getBlogMetaBySlug(slug);

  if (!meta) {
    notFound();
  }

  return (
    <BlogCaptionCoverDownload
      slug={slug}
      title={meta.title}
      summary={meta.summary}
      preset={preset}
    />
  );
}
