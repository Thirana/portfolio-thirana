type GuideMapItem = {
  /** In-page anchor, e.g. "#access-tokens". */
  href: string;
  title: string;
  summary: string;
};

type GuideMapProps = {
  items: GuideMapItem[];
  title?: string;
};

/**
 * A small map of a long post's parts, shown near the top so readers can see
 * the shape of the piece and jump to the part they need. Rows follow the
 * post-list style: hairline-ruled, ink title, Erode summary, white on hover.
 */
export default function GuideMap({
  items,
  title = "In this guide",
}: GuideMapProps) {
  return (
    <nav aria-label={title} className="not-prose card my-8 px-3 py-3 sm:px-4">
      <p className="px-3 pt-1 pb-2 font-sans text-[13px] font-semibold text-gl-text-muted">
        {title}
      </p>
      <ol>
        {items.map((item, index) => (
          <li key={item.href} className="border-t border-gl-border">
            <a
              href={item.href}
              // "!" opts the row out of the site-wide `.prose a` link style.
              className="flex gap-4 rounded-[10px] px-3 py-3 text-inherit! no-underline! transition-colors hover:bg-gl-bg-subtle"
            >
              <span className="mt-[3px] w-4 shrink-0 font-sans text-[13px] text-gl-text-faint tabular-nums">
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-sans text-[15px] font-semibold text-gl-text">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-[15px] leading-[1.55] text-gl-text-muted">
                  {item.summary}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
