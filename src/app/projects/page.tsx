import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
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
  return (
    <div className="space-y-8">
      <PageIntro
        title="Projects"
        lede="System-focused work that highlights architecture decisions, reliability controls, and measurable outcomes."
      />

      <Seam />

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} headingLevel="h2" />
        ))}
      </div>
    </div>
  );
}
