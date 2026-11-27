import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import type { ContentMeta } from "@/lib/content";
import { getSwatchColor } from "@/lib/swatch";
import Tag from "@/components/Tag";

type BlogCardProps = {
  post: ContentMeta;
  /** h2 on the /blog index, h3 inside a page section. */
  headingLevel?: "h2" | "h3";
  /**
   * Short card for the home page: main title and summary only, with the
   * date and the Read link sharing the last row.
   */
  compact?: boolean;
};

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Main title: subtitle" becomes a title line and a quieter second line. */
function splitTitle(title: string): [string, string | null] {
  const at = title.indexOf(": ");
  if (at === -1) return [title, null];
  return [title.slice(0, at), title.slice(at + 2)];
}

function PostMeta({ post }: { post: ContentMeta }) {
  return (
    <p className="font-sans text-[13px] text-gl-text-faint">
      <time dateTime={post.date} className="tabular-nums">
        {formatDate(post.date)}
      </time>
      {post.level ? (
        <>
          <span aria-hidden> · </span>
          {post.level}
        </>
      ) : null}
    </p>
  );
}

/**
 * A small hand-drawn sketch of what the post is about, like the marks on the
 * work cards.
 */
function PostMark({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG sketch
    <img
      src={src}
      alt=""
      aria-hidden
      width={56}
      height={56}
      loading="lazy"
      decoding="async"
      className="h-12 w-auto max-w-20 shrink-0 object-contain transition-transform duration-300 group-hover:-rotate-[8deg] sm:h-14 sm:max-w-24"
    />
  );
}

function ReadLink({ className = "" }: { className?: string }) {
  return (
    <span className={`link-arrow shrink-0 ${className}`}>
      Read<span className="sr-only"> the article</span>
      <ArrowRight className="size-3.5" aria-hidden />
    </span>
  );
}

const titleClass =
  "text-[20px] leading-[1.3] font-semibold tracking-[-0.02em] text-gl-text sm:text-[21px]";
const coverLinkClass =
  "after:absolute after:inset-0 after:rounded-[14px] after:content-['']";
const summaryClass =
  "line-clamp-2 max-w-[38rem] text-[15px] leading-[1.6] text-gl-text-muted";

export default function BlogCard({
  post,
  headingLevel = "h3",
  compact = false,
}: BlogCardProps) {
  const Heading = headingLevel;
  const href = `/blog/${post.slug}` as Route<string>;
  const [title, subtitle] = splitTitle(post.title);

  if (compact) {
    return (
      <article className="card group relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Heading className={titleClass}>
              <Link href={href} className={coverLinkClass}>
                {title}
              </Link>
            </Heading>
            <p className={`mt-2 ${summaryClass}`}>{post.summary}</p>
          </div>
          {post.mark ? <PostMark src={post.mark} /> : null}
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <PostMeta post={post} />
          <ReadLink />
        </div>
      </article>
    );
  }

  return (
    <article className="card group relative p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <PostMeta post={post} />
          <Heading className={`mt-3 ${titleClass}`}>
            <Link href={href} className={coverLinkClass}>
              {title}
              {subtitle ? (
                <>
                  <span className="sr-only">: </span>
                  <span className="mt-1 block font-sans text-[15px] leading-[1.4] font-medium tracking-[-0.01em] text-gl-text-muted">
                    {subtitle}
                  </span>
                </>
              ) : null}
            </Link>
          </Heading>
        </div>
        {post.mark ? <PostMark src={post.mark} /> : null}
      </div>

      <p className={`mt-3 ${summaryClass}`}>{post.summary}</p>

      {/* Phones: the whole card is the link, so the tags get the full row
          and the Read label is left out. */}
      <div className="mt-4 flex items-center gap-4">
        <ul className="flex min-w-0 flex-1 flex-nowrap gap-1.5 overflow-hidden py-px pr-px [mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)] max-sm:[&>li:nth-child(n+3)]:hidden [&>li]:shrink-0">
          {post.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Tag dot={getSwatchColor(tag)}>{tag}</Tag>
            </li>
          ))}
        </ul>
        <ReadLink className="max-sm:hidden" />
      </div>
    </article>
  );
}
