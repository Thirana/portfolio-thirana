"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contactHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-[14px] transition-colors",
              isActive(link.href)
                ? "text-gl-text"
                : "text-gl-text-muted hover:text-gl-text",
            )}
          >
            {link.label}
          </Link>
        ))}
        <a href={contactHref} className="pill-ink ml-2">
          Work with me
        </a>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="pill size-10 justify-center p-0 sm:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[82vw] max-w-[320px] border-l border-gl-border bg-gl-bg text-gl-text shadow-gl-lg sm:hidden"
        >
          <SheetHeader className="pr-14">
            <SheetTitle className="font-sans text-[17px] font-semibold tracking-[-0.03em] normal-case">
              thirana
            </SheetTitle>
          </SheetHeader>

          <nav className="grid gap-1 px-3" aria-label="Main">
            {[{ href: "/", label: "Home" } as const, ...links].map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-3 text-[16px] transition-colors",
                    active
                      ? "bg-gl-surface text-gl-text shadow-gl"
                      : "text-gl-text-muted hover:text-gl-text",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-4">
            <a
              href={contactHref}
              className="pill-ink w-full justify-center py-3 text-[14px]"
            >
              Work with me
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
