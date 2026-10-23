import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import type { ContentMeta } from "@/lib/content";
import { getSwatchColor } from "@/lib/swatch";
import Tag from "@/components/Tag";

type BlogCardProps = {
  post: ContentMeta;
};

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card relative p-5 sm:p-6">
      <p className="font-sans text-[13px] tabular-nums text-gl-text-faint">
        {formatDate(post.date)}
        {post.level ? <span> · {post.level}</span> : null}
      </p>
      <h2 className="mt-2 text-[22px] leading-[1.2] font-semibold tracking-[-0.025em] text-gl-text">
        <Link
          href={`/blog/${post.slug}` as Route<string>}
          className="after:absolute after:inset-0 after:rounded-[14px] after:content-['']"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-[15px] leading-[1.6] text-gl-text-muted">
        {post.summary}
      </p>
      {post.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Tag dot={getSwatchColor(tag)}>{tag}</Tag>
            </li>
          ))}
        </ul>
      ) : null}
      <span className="link-arrow mt-5">
        Read article
        <ArrowRight className="size-3.5" aria-hidden />
      </span>
    </article>
  );
}
