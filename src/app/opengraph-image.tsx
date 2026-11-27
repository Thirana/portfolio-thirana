import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { mainNav, siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} - ${profile.headline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/** The share image for the home page, in the same style as the others. */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#faf9f7",
        color: "#17150f",
        padding: "56px",
        fontFamily: "Satoshi, ui-sans-serif, system-ui",
      }}
    >
      <div style={{ display: "flex", fontSize: 22, color: "#767268" }}>
        {mainNav.map((item) => item.label).join("  ·  ")}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "900px",
            fontSize: 30,
            lineHeight: 1.35,
            color: "#6b6862",
          }}
        >
          {profile.headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: 22,
          color: "#767268",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "32px",
            borderRadius: "9999px",
            backgroundColor: "#a45740",
          }}
        />
        {new URL(siteConfig.url).host}
      </div>
    </div>,
    size,
  );
}
