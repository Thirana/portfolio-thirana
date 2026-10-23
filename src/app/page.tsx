import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FolderGit2,
  Github,
} from "lucide-react";
import { profile, socials } from "@/content/profile";
import { WORK_EXPERIENCE } from "@/content/experience";
import {
  getAllBlogPosts,
  getAllProjects,
  getFeaturedProjects,
} from "@/lib/content";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { Mascot } from "@/components/Mascot";
import ProjectCard from "@/components/ProjectCard";
import Section, { Seam } from "@/components/Section";
import { WorkExperience } from "@/components/work-experience";
import { CompanyMark } from "@/components/CompanyMark";
import { PostList } from "@/components/PostList";
import { RotatingFacts, type Fact } from "@/components/RotatingFacts";

const GITHUB_USERNAME = "Thirana";
const GITHUB_PROFILE_URL = "https://github.com/Thirana";

// Brand tints for the social pills; anything unlisted stays ink.
const SOCIAL_TONES: Record<string, string> = {
  LinkedIn: "#0a66c2",
  Email: "var(--gl-swatch-4)",
};

export default async function Home() {
  const [featuredProjects, allProjects, allPosts] = await Promise.all([
    getFeaturedProjects(3),
    getAllProjects(),
    getAllBlogPosts(),
  ]);
  const recentPosts = allPosts.slice(0, 4);

  const contributions = getCachedContributions(GITHUB_USERNAME);

  const currentEmployer = WORK_EXPERIENCE.find((e) => e.isCurrentEmployer);
  const currentTitle =
    currentEmployer?.role?.title ?? currentEmployer?.positions[0]?.title;

  const facts: Fact[] = [
    ...(currentTitle && currentEmployer
      ? [
          {
            kind: "work" as const,
            label: "Currently at",
            value: currentEmployer.companyName,
          },
        ]
      : []),
    { kind: "movie", label: "Winding down with", value: "a good movie" },
    { kind: "read", label: "Lost in", value: "another book" },
    { kind: "curious", label: "Curious about", value: "what's new in tech" },
    { kind: "place", label: "Based in", value: "Colombo, Sri Lanka" },
  ];

  return (
    <div className="space-y-7 sm:space-y-8">
      {/* Identity: mascot beside the handle */}
      <header className="space-y-7">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-6">
            <Mascot
              size={208}
              className="-my-6 -ml-8 max-sm:-mt-4 max-sm:-mb-3 max-sm:-ml-7 max-sm:size-[188px]!"
            />
            <div className="space-y-2.5">
              <h1 className="font-sans text-[48px] leading-none font-semibold tracking-[-0.03em] text-gl-text sm:text-[60px]">
                thirana
              </h1>
              <p className="flex flex-wrap items-baseline gap-x-1.5 text-[17px] text-gl-text-faint">
                <span aria-hidden className="text-gl-border-strong">
                  /
                </span>
                <span>{profile.name}</span>
                <span aria-hidden className="text-gl-border-strong">
                  /
                </span>
                <span className="italic">noun</span>
              </p>
            </div>
          </div>

          <p className="max-w-[34rem] text-[18px] leading-[1.625] text-gl-text-muted">
            {profile.headline}
          </p>
        </div>

        <div className="max-w-[30rem]">
          <hr className="border-gl-border" />
          <div className="flex flex-wrap items-center gap-3 py-4">
            <span className="font-sans text-[13px] text-gl-text-muted">
              I&apos;ve worked at:
            </span>
            <ul className="flex flex-wrap gap-1.5">
              {WORK_EXPERIENCE.map((exp) => (
                <li key={exp.id}>
                  <CompanyMark
                    name={exp.companyName}
                    logo={exp.companyLogo}
                    size={28}
                    withTooltip
                  />
                </li>
              ))}
            </ul>
          </div>
          <hr className="border-gl-border" />
        </div>

        <RotatingFacts facts={facts} />
      </header>

      <Seam />

      <ul className="flex flex-wrap gap-2">
        {socials.map((social) => {
          const Icon = social.icon;
          const external = social.href.startsWith("http");
          return (
            <li key={social.label}>
              <a
                href={social.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="pill"
              >
                <Icon
                  className="size-3.5 shrink-0"
                  style={{ color: SOCIAL_TONES[social.label] }}
                  aria-hidden
                />
                {social.label}
              </a>
            </li>
          );
        })}
      </ul>

      <Seam />

      <Section title="Contributions" icon={Github} tone="var(--gl-swatch-1)">
        <div className="card p-5 pb-6">
          <Suspense fallback={<GitHubContributionsFallback />}>
            <GitHubContributions
              contributions={contributions}
              githubProfileUrl={GITHUB_PROFILE_URL}
            />
          </Suspense>
        </div>
      </Section>

      <Seam />

      <Section title="Experience" icon={Briefcase} tone="var(--gl-swatch-6)">
        <WorkExperience experiences={WORK_EXPERIENCE} />
      </Section>

      <Seam />

      <Section title="Projects" icon={FolderGit2} tone="var(--gl-swatch-5)">
        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link href="/projects" className="link-arrow">
          All {allProjects.length} projects
          <ArrowRight className="size-3.5" />
        </Link>
      </Section>

      <Seam />

      <Section title="Writing" icon={BookOpen} tone="var(--gl-swatch-2)">
        <PostList posts={recentPosts} />
        <Link href="/blog" className="link-arrow">
          All {allPosts.length} articles
          <ArrowRight className="size-3.5" />
        </Link>
      </Section>
    </div>
  );
}
