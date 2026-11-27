"use client";

import { Mascot as PageMascot } from "page-mascot";
import { cn } from "@/lib/utils";

const DIRECTIONS = "/mascots/cap-directions.webp";
const REACTIONS = "/mascots/cap-reactions.webp";

export function Mascot({
  size = 168,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <PageMascot
      directions={DIRECTIONS}
      reactions={REACTIONS}
      size={size}
      label="Thirana's mascot"
      className={cn("rounded-2xl", className)}
    />
  );
}

/** Static, front-facing frame of the mascot for small decorative spots. */
export function MascotStamp({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("block shrink-0", className)}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${DIRECTIONS})`,
        backgroundSize: "300% 300%",
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
