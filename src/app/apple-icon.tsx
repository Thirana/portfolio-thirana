import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icons can't be transparent, so the mascot sits on paper.
export default async function AppleIcon() {
  const head = await readFile(join(process.cwd(), "src/app/icon.png"));
  const src = `data:image/png;base64,${head.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#faf9f7",
      }}
    >
      <img src={src} width={148} height={148} alt="" />
    </div>,
    size,
  );
}
