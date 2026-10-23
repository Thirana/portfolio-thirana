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

const GITHUB_USERNAME = "Thirana";
const GITHUB_PROFILE_URL = "https://github.com/Thirana";

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

  return (
    <div className="space-y-10 sm:space-y-12">
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
                  <CompanyMark name={exp.companyName} size={30} withTooltip />
                </li>
              ))}
            </ul>
          </div>
          <hr className="border-gl-border" />
        </div>

        {currentTitle && currentEmployer ? (
          <p className="flex items-start gap-2.5 font-sans text-[14px] text-gl-text-muted">
            <Briefcase
              className="mt-0.5 size-4 shrink-0 text-gl-text-faint"
              aria-hidden
            />
            <span>
              Currently {currentTitle} at{" "}
              <span className="text-gl-text">{currentEmployer.companyName}</span>
              , Colombo
            </span>
          </p>
        ) : null}
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
                <Icon className="size-3.5 shrink-0" aria-hidden />
                {social.label}
              </a>
            </li>
          );
        })}
      </ul>

      <Seam />

      <Section title="Contributions" icon={Github}>
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

      <Section title="Experience" icon={Briefcase}>
        <WorkExperience experiences={WORK_EXPERIENCE} />
      </Section>

      <Seam />

      <Section title="Projects" icon={FolderGit2}>
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

      <Section title="Writing" icon={BookOpen}>
        <PostList posts={recentPosts} />
        <Link href="/blog" className="link-arrow">
          All {allPosts.length} articles
          <ArrowRight className="size-3.5" />
        </Link>
      </Section>
    </div>
  );
}
