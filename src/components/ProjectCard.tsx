import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import type { ProjectMeta } from "@/lib/content";
import { getSwatchColor } from "@/lib/swatch";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";

type ProjectCardProps = {
  project: ProjectMeta;
};

function formatYear(iso: string): string {
  if (!iso) return "";
  return String(new Date(iso).getFullYear());
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const projectPath = `/projects/${project.slug}` as Route<string>;
  const tags = [...project.domains, ...project.tech].slice(0, 6);
  const year = formatYear(project.date);

  return (
    <article className="card group relative p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[13px] text-gl-text-faint">
        <StatusBadge status={project.status} />
        {year ? <span className="tabular-nums">{year}</span> : null}
      </div>

      <h3 className="mt-3 text-[22px] leading-[1.2] font-semibold tracking-[-0.025em] text-gl-text">
        <Link
          href={projectPath}
          className="after:absolute after:inset-0 after:rounded-[14px] after:content-['']"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-2 text-[15px] leading-[1.6] text-gl-text-muted">
        {project.summary}
      </p>

      {tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag dot={getSwatchColor(tag)}>{tag}</Tag>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="link-arrow">
          Read the overview
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
        {project.links.code ? (
          <a
            href={project.links.code}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center gap-1 font-sans text-[13px] text-gl-text-muted transition-colors hover:text-gl-text"
          >
            Code
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        ) : null}
        {project.links.live ? (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center gap-1 font-sans text-[13px] text-gl-text-muted transition-colors hover:text-gl-text"
          >
            Live
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  );
}
