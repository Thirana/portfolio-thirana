import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Seam } from "@/components/Section";
import { mainNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="space-y-8">
      <PageIntro
        title="Page not found"
        lede="There is nothing at this address. It may have moved, or the link may have a typo."
      />

      <Seam />

      <nav aria-label="Main pages">
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          <li>
            <Link href="/" className="link-arrow">
              Home
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </li>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link-arrow">
                {item.label}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
