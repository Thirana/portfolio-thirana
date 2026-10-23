import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import MetaStrip from "@/components/MetaStrip";
import ProjectCard from "@/components/ProjectCard";
import { PageIntro } from "@/components/PageIntro";
import { Seam } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "System-focused project writeups covering architecture decisions, reliability controls, and measurable outcomes.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: "/projects",
    title: `Projects | ${siteConfig.name}`,
    description:
      "System-focused project writeups covering architecture decisions, reliability controls, and measurable outcomes.",
  },
  twitter: {
    card: "summary",
    title: `Projects | ${siteConfig.name}`,
    description:
      "System-focused project writeups covering architecture decisions, reliability controls, and measurable outcomes.",
    creator: siteConfig.authorHandle,
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const activeProjects = projects.filter(
    (project) => project.status === "Live" || project.status === "WIP",
  ).length;
  const backendOrInfra = projects.filter((project) =>
    project.domains.some((domain) =>
      ["api", "data", "platform", "infra", "observability"].includes(
        domain.toLowerCase(),
      ),
    ),
  ).length;
  const evidenceCount = projects.reduce(
    (sum, project) => sum + project.evidence.length,
    0,
  );

  return (
    <div className="space-y-10">
      <PageIntro
        title="Projects"
        lede="System-focused work that highlights architecture decisions, reliability controls, and measurable outcomes."
      >
        <MetaStrip
          items={[
            { label: "systems", value: `${projects.length}` },
            { label: "active", value: `${activeProjects}` },
            { label: "backend or infra", value: `${backendOrInfra}` },
            { label: "evidence links", value: `${evidenceCount}` },
          ]}
        />
      </PageIntro>

      <Seam />

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
