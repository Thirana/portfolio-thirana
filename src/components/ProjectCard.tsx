"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProjectMeta } from "@/lib/content";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: ProjectMeta;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <Card
      className="group flex h-full cursor-pointer flex-col border-border/80 bg-panel/40 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-500/70 hover:shadow-[0_24px_50px_-32px_rgba(15,23,42,0.85)]"
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNavigate();
        }
      }}
    >
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg text-neutral-100 transition-colors group-hover:text-white">
            {project.title}
          </CardTitle>
          <StatusBadge status={project.status} />
        </div>
        <p className="min-h-[3rem] text-sm text-neutral-300">
          {project.summary}
        </p>
        {project.domains.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.domains.map((domain) => (
              <Tag key={domain} className="px-2 py-0.5 text-[10px] font-mono">
                {domain}
              </Tag>
            ))}
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {project.metrics.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {project.metrics.slice(0, 2).map((metric) => (
              <div
                key={`${metric.label}-${metric.value}`}
                className="rounded-md border border-border/70 bg-panel/35 px-2.5 py-2"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  {metric.label}
                </p>
                <p className="font-mono text-xs text-neutral-100">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        {project.constraints.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.constraints.slice(0, 3).map((constraint) => (
              <span
                key={constraint}
                className="rounded-md border border-border/70 bg-transparent px-2 py-1 font-mono text-[10px] text-neutral-300"
              >
                {constraint}
              </span>
            ))}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          asChild
          onClick={(event) => event.stopPropagation()}
        >
          <Link href={`/projects/${project.slug}`}>Details</Link>
        </Button>
        {project.links.live ? (
          <Button
            variant="outline"
            size="sm"
            asChild
            onClick={(event) => event.stopPropagation()}
          >
            <a href={project.links.live} target="_blank" rel="noreferrer">
              Live
            </a>
          </Button>
        ) : null}
        {project.links.code ? (
          <Button
            variant="outline"
            size="sm"
            asChild
            onClick={(event) => event.stopPropagation()}
          >
            <a href={project.links.code} target="_blank" rel="noreferrer">
              Code
            </a>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
