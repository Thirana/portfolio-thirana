import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Fonts and pictures for the share (Open Graph) images. ImageResponse
 * cannot read woff2 or variable fonts, so `src/assets/og` holds static TTF
 * copies of the site's fonts, and a PNG of the mascot cut from its sprite.
 */
const root = process.cwd();

function read(path: string) {
  return readFile(join(root, path));
}

export async function loadOgFonts() {
  const [satoshiBold, satoshiMedium, erode, caveat] = await Promise.all([
    read("src/assets/og/Satoshi-Bold.ttf"),
    read("src/assets/og/Satoshi-Medium.ttf"),
    read("src/assets/og/Erode-Regular.ttf"),
    read("src/assets/og/Caveat-SemiBold.ttf"),
  ]);

  return [
    { name: "Satoshi", data: satoshiBold, weight: 700 as const },
    { name: "Satoshi", data: satoshiMedium, weight: 500 as const },
    { name: "Erode", data: erode, weight: 400 as const },
    { name: "Caveat", data: caveat, weight: 600 as const },
  ].map((font) => ({ ...font, style: "normal" as const }));
}

/** The front-facing mascot, the same frame the site shows at rest. */
export async function loadOgMascot() {
  const mascot = await read("src/assets/og/mascot.png");
  return `data:image/png;base64,${mascot.toString("base64")}`;
}
