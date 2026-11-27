import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { loadOgFonts, loadOgMascot } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} - ${profile.headline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const INK = "#17150f";
const MUTED = "#6b6862";
const RUST = "#a45740";
const PAPER = "#faf9f7";
/** The three areas of the line, colored from the mascot: hair, cap, hoodie. */
const BROWN = "#7a4a2b";
const CAP_RED = "#b8302c";
const HOODIE_GREEN = "#2f6438";

/**
 * The share image for the home page: the name and a handwritten line on
 * the left, and the site's mascot saying hello on the right. The headline
 * is left out because it is already the card's description text.
 */
export default async function Image() {
  const [fonts, mascot] = await Promise.all([loadOgFonts(), loadOgMascot()]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        backgroundColor: PAPER,
        color: INK,
        fontFamily: "Satoshi",
      }}
    >
      {/* Name, signature line and the handwritten line */}
      <div style={{ display: "flex", flexDirection: "column", width: 740 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            fontWeight: 500,
            color: MUTED,
          }}
        >
          <span
            style={{
              width: 8,
              height: 28,
              borderRadius: 9999,
              backgroundColor: RUST,
            }}
          />
          {new URL(siteConfig.url).host}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.035em",
          }}
        >
          {profile.name}
        </div>
        {/* A loose pencil stroke under the name, like the footer signature */}
        <svg
          width="640"
          height="26"
          viewBox="0 0 560 26"
          style={{ marginTop: 8 }}
        >
          <path
            d="M4 16 C 120 6, 260 22, 380 12 S 520 8, 556 14"
            fill="none"
            stroke={RUST}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontFamily: "Caveat",
            fontSize: 46,
            fontWeight: 600,
            lineHeight: 1.2,
            flexDirection: "column",
          }}
        >
          <span style={{ color: BROWN }}>
            Designing secure software systems,
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ color: CAP_RED }}>from the platform</span>
            <span style={{ color: HOODIE_GREEN }}>to the application</span>
          </div>
        </div>
      </div>

      {/* The mascot, saying hello */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "10px 26px 14px",
            backgroundColor: "#ffffff",
            border: `3px solid ${INK}`,
            borderRadius: 28,
            fontFamily: "Caveat",
            fontSize: 40,
            fontWeight: 600,
            color: RUST,
            transform: "rotate(-4deg)",
          }}
        >
          hi, I&apos;m Thirana!
        </div>
        <img src={mascot} width={272} height={298} alt="" />
      </div>
    </div>,
    { ...size, fonts },
  );
}
