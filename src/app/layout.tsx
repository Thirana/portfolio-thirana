import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StickyHeader from "@/components/StickyHeader";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", rel: "shortcut icon" },
    ],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.authorHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-gl-bg text-gl-text antialiased">
        <div className="relative">
          <BackgroundGrid />
          <StickyHeader />
          <div className="page flex min-h-screen flex-col pt-6 pb-10">
            <main className="flex-1">{children}</main>

            <footer className="mt-16 border-t border-gl-border/40 py-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[13px] font-bold text-gl-text">
                  Thirana Embuldeniya
                </span>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Thirana/personal-site"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] font-medium text-gl-text-muted transition-colors hover:text-gl-text"
                  >
                    GitHub
                  </a>
                  <Link
                    href="/blog"
                    className="text-[13px] font-medium text-gl-text-muted transition-colors hover:text-gl-text"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="text-[13px] font-medium text-gl-text-muted transition-colors hover:text-gl-text"
                  >
                    About
                  </Link>
                </div>
                <span className="text-[12px] text-gl-text-faint">© 2026</span>
              </div>
            </footer>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
