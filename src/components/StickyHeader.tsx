"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Nav from "./Nav";

export default function StickyHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,box-shadow] duration-300",
        scrolled
          ? "bg-gl-bg/90 shadow-[0_1px_0_var(--gl-border)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="page flex items-center justify-between gap-3 py-3.5">
        <Link
          href="/"
          aria-label="Home"
          className={cn(
            "font-sans text-[17px] font-semibold tracking-[-0.03em] text-gl-text transition-opacity",
            isHome && !scrolled ? "pointer-events-none opacity-0" : "opacity-100",
          )}
          tabIndex={isHome && !scrolled ? -1 : 0}
        >
          thirana
        </Link>
        <Nav />
      </div>
    </header>
  );
}
