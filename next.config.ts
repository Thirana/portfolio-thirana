import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeTableLabels from "./src/lib/rehype-table-labels";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-light",
  keepBackground: false,
  defaultLang: "plaintext",
};

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    // rehype-slug gives every heading an id, so sections can be deep-linked.
    // rehypeTableLabels names each table cell after its column, for phones.
    rehypePlugins: [
      rehypeSlug,
      rehypeTableLabels,
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
});

/**
 * Posts that were public and are drafts again. They redirect to Writing
 * with a temporary (307) redirect, so publishing one again only means
 * removing it from this list.
 */
const unpublishedPosts = [
  "cursor-pagination-product-listing-api",
  "idempotency-in-api-design",
  "production-style-nestjs-backend",
  "rendering-techniques-nextjs-portfolio",
  "safe-order-creation-idempotency-transactions",
  "url-shortener-caching",
];

/** Projects that were public and have been removed for good. */
const removedProjects = [
  "grow-logs",
  "marketplace-service",
  "personal-site",
  "url-shortener",
];

/**
 * Sent with every response. There is no full Content-Security-Policy yet:
 * Next.js inline scripts would need nonces. These directives are the ones
 * that are safe without them.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value:
      "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    qualities: [100, 75],
  },
  async redirects() {
    return [
      ...unpublishedPosts.map((slug) => ({
        source: `/blog/${slug}`,
        destination: "/blog",
        permanent: false,
      })),
      ...removedProjects.map((slug) => ({
        source: `/projects/${slug}`,
        destination: "/projects",
        permanent: true,
      })),
      // The About page is hidden for now and may come back.
      { source: "/about", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  typedRoutes: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default withMDX(nextConfig);
