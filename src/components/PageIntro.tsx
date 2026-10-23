import type { ReactNode } from "react";

/** Title block for index pages: large Satoshi title, Erode lede. */
export function PageIntro({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="space-y-4">
      <h1 className="font-sans text-[40px] leading-none font-semibold tracking-[-0.03em] text-gl-text sm:text-[52px]">
        {title}
      </h1>
      <p className="max-w-[34rem] text-[18px] leading-[1.625] text-gl-text-muted">
        {lede}
      </p>
      {children}
    </header>
  );
}
