import { ImageResponse } from "next/og";
import { getProjectMetaBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const meta = await getProjectMetaBySlug(slug);

  const title = meta?.title ?? "Project";
  const summary = meta?.summary ?? siteConfig.description;
  const status = meta?.status ?? "Live";

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "-0.01em",
            color: "#767268",
          }}
        >
          Systems Portfolio
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid #e6e3dd",
            color: "#17150f",
            borderRadius: "9999px",
            padding: "8px 16px",
            fontSize: 18,
            letterSpacing: "-0.01em",
          }}
        >
          {status}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.08,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.35,
            color: "#6b6862",
          }}
        >
          {summary}
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
        {siteConfig.name}
      </div>
    </div>,
    size,
  );
}
