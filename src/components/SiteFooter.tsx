import Link from "next/link";
import { WorkWithMe } from "@/components/WorkWithMe";

export default function SiteFooter() {
  return (
    <footer className="mt-24 space-y-14">
      <WorkWithMe />
      <div className="flex flex-col gap-3 font-sans text-[13px] text-gl-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="text-gl-text">Thirana Embuldeniya</span>
        <div className="flex gap-5">
          <Link href="/blog" className="transition-colors hover:text-gl-text">
            Writing
          </Link>
          <Link href="/about" className="transition-colors hover:text-gl-text">
            About
          </Link>
          <a
            href="https://github.com/Thirana/personal-site"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gl-text"
          >
            Source
          </a>
        </div>
        <span className="tabular-nums">2026</span>
      </div>
    </footer>
  );
}
