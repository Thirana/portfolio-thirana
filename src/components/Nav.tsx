"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const getLinkClasses = (isActive: boolean) =>
    cn(
      "transition-colors hover:text-neutral-100",
      isActive ? "text-neutral-100" : "text-neutral-400"
    );

  return (
    <>
      <nav className="hidden items-center gap-5 text-sm sm:flex">
        {links.map((link) => {
          const isHome = link.href === "/";
          const isActive = isHome
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn("relative pb-1", getLinkClasses(isActive))}
            >
              {link.label}
              {isActive ? (
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-neutral-100" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="sm:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 w-9 border-border/80 bg-panel/30 text-neutral-200 hover:bg-panel/50 hover:text-neutral-100"
          aria-label="Open navigation menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 sm:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className={cn(
            "absolute inset-0 bg-black/55 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        <aside
          className={cn(
            "absolute top-0 right-0 h-full w-full border-l border-border/80 bg-panel/95 transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-border/80 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-300">
              Navigation
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-neutral-200 hover:text-neutral-100"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="grid gap-1 p-3 text-base">
            {links.map((link) => {
              const isHome = link.href === "/";
              const isActive = isHome
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-4 py-3",
                    getLinkClasses(isActive),
                    isActive ? "bg-neutral-800/80" : "hover:bg-neutral-800/40"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
}
