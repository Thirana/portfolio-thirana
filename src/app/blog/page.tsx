import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import MetaStrip from "@/components/MetaStrip";
import BlogCard from "@/components/BlogCard";
import { PageIntro } from "@/components/PageIntro";
import { Seam } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on backend decisions, system trade-offs, and implementation patterns.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Technical writing on backend decisions, system trade-offs, and implementation patterns.",
  },
  twitter: {
    card: "summary",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Technical writing on backend decisions, system trade-offs, and implementation patterns.",
    creator: siteConfig.authorHandle,
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const trackCount = new Set(posts.map((post) => post.track).filter(Boolean))
    .size;

  return (
    <div className="space-y-8">
      <PageIntro
        title="Writing"
        lede="Technical writing focused on backend decisions, system trade-offs, and implementation patterns."
      >
        <MetaStrip
          items={[
            { label: "posts", value: `${posts.length}` },
            { label: "tracks", value: `${trackCount || 1}` },
            { label: "latest", value: posts[0]?.date ?? "n/a" },
          ]}
        />
      </PageIntro>

      <Seam />

      <div className="space-y-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
