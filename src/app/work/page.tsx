import type { Metadata } from "next";
import { getAllWork } from "@/lib/content";
import WorkCard from "@/components/WorkCard";
import { PageIntro } from "@/components/PageIntro";
import { Seam } from "@/components/Section";
import { siteConfig } from "@/lib/site";

const description =
  "Case studies from production systems I have designed and run: the problem, the decisions and trade-offs, and what changed.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    url: "/work",
    title: `Work | ${siteConfig.name}`,
    description,
  },
  twitter: {
    card: "summary",
    title: `Work | ${siteConfig.name}`,
    description,
    creator: siteConfig.authorHandle,
  },
};

export default async function WorkPage() {
  const work = await getAllWork();

  return (
    <div className="space-y-8">
      <PageIntro
        title="Work"
        lede="Case studies from production systems I have designed and run - the problem, the decisions, and what changed."
      />

      <Seam />

      {work.length > 0 ? (
        <div className="space-y-4">
          {work.map((item) => (
            <WorkCard key={item.slug} work={item} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <p className="text-[17px] text-gl-text-muted">
          The first case study is being written.
        </p>
      )}
    </div>
  );
}
