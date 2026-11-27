import Image from "./opengraph-image";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} - ${profile.headline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default Image;
