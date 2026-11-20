const DEFAULT_SITE_URL = "http://localhost:3000";

function stripTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function resolveSiteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    DEFAULT_SITE_URL;

  try {
    const normalized = new URL(configured).toString();
    return stripTrailingSlash(normalized);
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "Thirana's Personal Blog",
  description:
    "Thirana Embuldeniya engineers secure software systems for people, from cloud platforms and servers to the networks that connect them. Projects and writing.",
  url: resolveSiteUrl(),
  authorName: "Thirana Embuldeniya",
  authorHandle: "@_Thirana",
} as const;

/** Main pages, shared by the header nav and the footer index. */
export const mainNav = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

export function absoluteUrl(pathname = "/") {
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.url}${normalizedPath}`;
}
