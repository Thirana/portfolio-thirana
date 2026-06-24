import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

// All faces: viewBox="0 0 28 20", body rect(2,1,24,18,rx=3)
// Face center = y=10 = SVG center → items-center aligns correctly with text
// Left eye: cx=9, cy=7  |  Right eye: cx=19, cy=7  |  Mouth: y≈14–15

// About title — welcoming smile
export function ServerFaceHappy({ className }: Props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gl-primary shrink-0", className)}
    >
      <rect
        x="2"
        y="1"
        width="24"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="7" r="2" fill="currentColor" />
      <circle cx="19" cy="7" r="2" fill="currentColor" />
      <path
        d="M8 14 Q14 18 20 14"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// MO Marketplace (index 0) — grinding, determined, inward angry brows + rect eyes
export function ServerFaceDetermined({ className }: Props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gl-primary shrink-0", className)}
    >
      <rect
        x="2"
        y="1"
        width="24"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="5"
        y1="7"
        x2="12"
        y2="4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="4"
        x2="23"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="6" y="7" width="6" height="4" rx="1" fill="currentColor" />
      <rect x="16" y="7" width="6" height="4" rx="1" fill="currentColor" />
      <line
        x1="9"
        y1="15"
        x2="19"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ZOOMi Softlab (index 1) — square eyes with pupils, deep technical focus
export function ServerFaceFocused({ className }: Props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gl-primary shrink-0", className)}
    >
      <rect
        x="2"
        y="1"
        width="24"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="5.5"
        y="4.5"
        width="7"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="7.5" r="1.5" fill="currentColor" />
      <rect
        x="15.5"
        y="4.5"
        width="7"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="19" cy="7.5" r="1.5" fill="currentColor" />
      <line
        x1="9"
        y1="15"
        x2="19"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// LSEG (index 2) — past internship, comfortable and sleepy with tiny Z
export function ServerFaceSleepy({ className }: Props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gl-primary shrink-0", className)}
    >
      <rect
        x="2"
        y="1"
        width="24"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 8 Q9 4.5 12 8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M16 8 Q19 4.5 22 8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M21 3.5 L23.5 3.5 L21 5.5 L23.5 5.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M9 15 Q14 13 19 15"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Project index 0 — sunglasses + huge grin
export function ServerFaceCool({ className }: Props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gl-primary shrink-0", className)}
    >
      <rect
        x="2"
        y="1"
        width="24"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="3.5" y="5.5" width="9" height="4" rx="2" fill="currentColor" />
      <rect x="15.5" y="5.5" width="9" height="4" rx="2" fill="currentColor" />
      <line
        x1="12.5"
        y1="7.5"
        x2="15.5"
        y2="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M6 14 Q14 20 22 14"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Project index 1 — wide eyes + O mouth, surprised!
export function ServerFaceSurprised({ className }: Props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gl-primary shrink-0", className)}
    >
      <rect
        x="2"
        y="1"
        width="24"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="7" r="1" fill="currentColor" />
      <circle cx="19" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="7" r="1" fill="currentColor" />
      <ellipse
        cx="14"
        cy="15"
        rx="2.5"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Project index 2 + Writing section — raised brow, wavy mouth, thought bubbles
export function ServerFaceThinking({ className }: Props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gl-primary shrink-0", className)}
    >
      <rect
        x="2"
        y="1"
        width="24"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="6" r="2" fill="currentColor" />
      <circle cx="19" cy="8" r="2" fill="currentColor" />
      <path
        d="M6 3.5 Q9 1.5 12 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M8 15 Q11 13 14 15 Q17 17 20 15"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="23"
        cy="3.5"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <circle
        cx="25"
        cy="1.5"
        r="1"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}

// Project index 3 — winking, charming
export function ServerFaceWinking({ className }: Props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className={cn("text-gl-primary shrink-0", className)}
    >
      <rect
        x="2"
        y="1"
        width="24"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="9" cy="7" r="2" fill="currentColor" />
      <path
        d="M16 7 Q19 4.5 22 7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M8 14 Q14 18 20 14"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const EXPERIENCE_FACES = [
  ServerFaceDetermined,
  ServerFaceFocused,
  ServerFaceSleepy,
] as const;

export const PROJECT_FACES = [
  ServerFaceCool,
  ServerFaceSurprised,
  ServerFaceThinking,
  ServerFaceWinking,
  ServerFaceHappy,
] as const;
