import Link from "next/link";
import type { Route } from "next";
import type { ContentMeta } from "@/lib/content";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/** Ruled list of articles: title and summary on the left, date on the right. */
export function PostList({
  posts,
  showSummary = true,
  className,
}: {
  posts: ContentMeta[];
  showSummary?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("divide-y divide-gl-border border-y border-gl-border", className)}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}` as Route<string>}
            className="group -mx-3 flex flex-col gap-1 rounded-xl px-3 py-4 transition-colors hover:bg-gl-surface sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span className="min-w-0 flex-1 space-y-1">
              <span className="block font-sans text-[15px] leading-snug font-semibold tracking-[-0.01em] text-gl-text">
                {post.title}
              </span>
              {showSummary && post.summary ? (
                <span className="line-clamp-2 block text-[15px] leading-[1.6] text-gl-text-muted">
                  {post.summary}
                </span>
              ) : null}
            </span>
            <span className="order-first shrink-0 font-sans text-[13px] tabular-nums text-gl-text-faint sm:order-none">
              {formatDate(post.date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
