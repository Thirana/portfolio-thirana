import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { LocalTime } from "@/components/LocalTime";
import { Seam } from "@/components/Section";
import { socials } from "@/content/profile";
import { contactHref } from "@/lib/contact";
import { mainNav, siteConfig } from "@/lib/site";

const linkClass =
  "font-sans text-[14px] text-gl-text-muted transition-colors hover:text-gl-text";

function IndexColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-sans text-[13px] font-medium text-gl-text-faint">
        {title}
      </h2>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

/**
 * The last page of the notebook: a handwritten sign-off and a small index in
 * the page column, then a hand-drawn sketch of Sri Lanka across the full
 * width along the bottom edge.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16">
      <div>
        <div className="page">
          <Seam className="mb-12" />
          {/* Signed by hand: the full name in Caveat over a rust pen stroke. */}
          <p className="inline-block">
            <span className="block font-signature text-[32px] leading-none text-gl-text sm:text-[36px]">
              {siteConfig.authorName}
            </span>
            <svg
              aria-hidden
              viewBox="0 0 240 14"
              preserveAspectRatio="none"
              className="mt-1 block h-3 w-full text-gl-primary"
            >
              <path
                d="M2 9 C 30 4, 58 12, 90 8 S 150 5, 182 8 S 222 9, 230 7 L 238 1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </p>

          {/* Three columns that start on one line: headings level, then text. */}
          <div className="mt-8 flex flex-col gap-10 sm:flex-row sm:justify-between">
            <div className="max-w-[18rem]">
              <h2 className="font-sans text-[13px] font-medium text-gl-text-faint">
                Contact
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-gl-text-muted">
                Found a mistake in a post or a work note?{" "}
                <a
                  href={contactHref}
                  className="text-gl-primary underline decoration-gl-primary/35 underline-offset-3 transition-colors hover:decoration-gl-primary"
                >
                  Email me
                </a>{" "}
                and I will fix it.
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-gl-text-muted">
                Hiring for a backend or platform role, or want to talk through a
                system?{" "}
                <a
                  href={contactHref}
                  className="text-gl-primary underline decoration-gl-primary/35 underline-offset-3 transition-colors hover:decoration-gl-primary"
                >
                  Send me a note
                </a>
                .
              </p>
              <p className="mt-3 font-sans text-[13px] text-gl-text-faint">
                <LocalTime />
              </p>
            </div>

            <nav
              aria-label="Footer"
              className="grid grid-cols-2 gap-x-6 sm:gap-x-14"
            >
              <IndexColumn title="Pages">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </IndexColumn>
              <IndexColumn title="Elsewhere">
                {socials.map((social) => {
                  const Icon = social.icon;
                  const external = social.href.startsWith("http");
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        {...(external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className={`${linkClass} inline-flex items-center gap-2`}
                      >
                        <Icon
                          className="size-3.5 text-gl-text-faint"
                          aria-hidden
                        />
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </IndexColumn>
            </nav>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 font-sans text-[13px] text-gl-text-faint">
            <span>
              © {year} {siteConfig.authorName}
            </span>
            <a
              href="#"
              className="group inline-flex items-center gap-1 transition-colors hover:text-gl-text"
            >
              Back to top
              <ArrowUp
                className="size-3.5 transition-transform group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>

        {/* The sketch spans the full width; on narrow screens it keeps a
            readable size and shows its left part, the hills to the Lotus Tower. */}
        <div aria-hidden className="mt-6 flex overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG sketch */}
          <img
            src="/diagrams/site/colombo.svg"
            alt=""
            width={1590}
            height={305}
            loading="lazy"
            decoding="async"
            className="h-auto w-[max(100%,600px)] max-w-none shrink-0"
          />
        </div>
      </div>
    </footer>
  );
}
