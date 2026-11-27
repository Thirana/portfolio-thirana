import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import type { ProjectMeta } from "@/lib/content";
import Tag from "@/components/Tag";

type ProjectCardProps = {
  project: ProjectMeta;
  /** h2 on the /projects index, h3 inside a home-page section. */
  headingLevel?: "h2" | "h3";
};

/** Chip dots follow the project's order: fundamentals, cloud, the lab. */
const partColors = [
  "var(--gl-swatch-2)",
  "var(--gl-swatch-6)",
  "var(--gl-swatch-5)",
];

/** The summary with its key phrases marked, as if with a highlighter pen. */
function Highlighted({ text, phrases }: { text: string; phrases: string[] }) {
  const found = phrases.filter((phrase) => phrase && text.includes(phrase));
  if (found.length === 0) return text;
  const escaped = found.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  return parts.map((part, index) =>
    found.includes(part) ? (
      <mark key={index} className="marker">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

/**
 * A project card: a paper card with a pencil line traced loosely around it.
 * A screenshot of the project itself breaks out of the top edge, the text
 * wraps around it, and the project's parts follow as chips, in order.
 */
export default function ProjectCard({
  project,
  headingLevel = "h3",
}: ProjectCardProps) {
  const Heading = headingLevel;
  const projectPath = `/projects/${project.slug}` as Route<string>;

  return (
    <article className="sketch-card group flow-root p-6 max-sm:mt-10 sm:p-8">
      {project.preview ? (
        <div className="preview-shot relative z-[1] mx-auto -mt-12 mb-6 w-[84%] sm:float-right sm:-mt-14 sm:-mr-12 sm:mb-3 sm:ml-6 sm:w-[46%]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG drawing */}
          <img
            src={project.preview}
            alt={project.previewAlt ?? ""}
            width={300}
            height={244}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>
      ) : null}

      <Heading className="text-[22px] leading-[1.2] font-semibold tracking-[-0.025em] text-gl-text">
        <Link
          href={projectPath}
          className="after:absolute after:inset-0 after:z-10 after:rounded-[14px] after:content-['']"
        >
          {project.title}
        </Link>
      </Heading>
      <p className="mt-2 text-[15px] leading-[1.6] text-gl-text-muted">
        <Highlighted text={project.summary} phrases={project.highlights} />
      </p>

      {project.parts.length > 0 ? (
        <ol className="clear-both mt-5 flex flex-wrap gap-2">
          {project.parts.map((part, index) => (
            <li key={part.name}>
              <Tag dot={partColors[index % partColors.length]}>
                {part.name}
                {part.detail ? (
                  <span className="font-normal text-gl-text-muted">
                    <span aria-hidden> · </span>
                    <span className="sr-only">, </span>
                    {part.detail}
                  </span>
                ) : null}
              </Tag>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="clear-both mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="link-arrow">
          Read the overview
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
        {project.links.live ? (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="link-arrow relative z-20"
          >
            Live
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  );
}
