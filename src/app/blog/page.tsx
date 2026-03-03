import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import MetaStrip from "@/components/MetaStrip";
import Tag from "@/components/Tag";
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
  const trackCount = new Set(posts.map((post) => post.track).filter(Boolean)).size;

  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-2xl border border-border/80 bg-panel/35 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-neutral-400">
          Engineering Notes
        </p>
        <h1 className="text-3xl font-semibold text-neutral-100">Blog</h1>
        <p className="max-w-2xl text-sm leading-7 text-neutral-300">
          Technical writing focused on backend decisions, system trade-offs, and
          implementation patterns.
        </p>
        <MetaStrip
          items={[
            { label: "Posts", value: `${posts.length}` },
            { label: "Tracks", value: `${trackCount || 1}` },
            {
              label: "Latest",
              value: posts[0]?.date ?? "n/a",
            },
            { label: "Style", value: "Backend-first notes" },
          ]}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block space-y-3 rounded-xl border border-border/80 bg-panel/40 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-500/70 hover:shadow-[0_24px_50px_-32px_rgba(15,23,42,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                {post.date}
              </p>
              {post.level ? (
                <Tag className="px-2 py-0.5 font-mono text-[10px]">{post.level}</Tag>
              ) : null}
              {post.track ? (
                <Tag className="px-2 py-0.5 font-mono text-[10px]">{post.track}</Tag>
              ) : null}
            </div>
            <h2 className="text-xl font-semibold text-neutral-100 transition-colors group-hover:text-white">
              {post.title}
            </h2>
            <p className="text-sm leading-7 text-neutral-300">{post.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Tag key={tag} className="px-2 py-0.5 text-[10px] font-mono">
                  {tag}
                </Tag>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
