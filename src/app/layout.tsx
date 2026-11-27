import type { Metadata } from "next";
import { Caveat, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StickyHeader from "@/components/StickyHeader";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// Satoshi and Erode are self-hosted from Fontshare (ITF Free Font License).
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

const erode = localFont({
  src: [
    {
      path: "./fonts/Erode-Variable.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/Erode-VariableItalic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-erode",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Handwriting, used only for the signature in the footer.
const caveat = Caveat({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    card: "summary_large_image",
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
      className={`${satoshi.variable} ${erode.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body className="bg-gl-bg text-gl-text">
        <StickyHeader />
        <div className="flex min-h-screen flex-col">
          <main className="page flex-1 pt-8 sm:pt-12">{children}</main>
          {/* Full-width band; its content keeps to the page column. */}
          <SiteFooter />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
