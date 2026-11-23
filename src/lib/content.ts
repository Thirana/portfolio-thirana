import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";
import { WORK_EXPERIENCE } from "@/content/experience";

export type ContentMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  level?: string;
  track?: string;
  appliesTo: string[];
  takeaway?: string;
  project?: string;
  featured?: boolean;
  /** Small hand-drawn sketch shown on the card, a path under /public. */
  mark?: string;
  draft: boolean;
};

export type ProjectStatus = "Live" | "Ongoing" | "WIP" | "Paused" | "Completed";

export type ProjectLinks = {
  live?: string;
  code?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  status: ProjectStatus;
  tech: string[];
  links: ProjectLinks;
  featured: boolean;
  priority: number;
  domains: string[];
  constraints: string[];
  metrics: ProjectMetric[];
  evidence: ProjectEvidence[];
  outcomes: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectEvidence = {
  label: string;
  href: string;
};

/** Icons a work highlight may name in frontmatter; see WorkCard for the mapping. */
export const WORK_HIGHLIGHT_ICONS = [
  "shield",
  "lock",
  "key",
  "git-branch",
  "route",
  "server",
  "cloud",
  "workflow",
  "tag",
  "door",
] as const;

export type WorkHighlightIcon = (typeof WORK_HIGHLIGHT_ICONS)[number];

export type WorkHighlight = {
  icon: WorkHighlightIcon;
  label: string;
};

export type WorkGlanceRow = {
  label: string;
  value: string;
};

export type WorkMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  /** Matches an `id` in src/content/experience.ts; name, logo and role come from there. */
  company: string;
  companyName: string;
  companyLogo?: string;
  role: string;
  tech: string[];
  highlights: WorkHighlight[];
  glance: WorkGlanceRow[];
  outcomes: string[];
  /** Short title for cards; the full title is used everywhere else. */
  cardTitle?: string;
  /** Hand-drawn sketch shown on the card, e.g. /diagrams/work/<slug>/mark.svg. */
  mark?: string;
  featured: boolean;
  priority: number;
  draft: boolean;
};

const blogDir = path.join(process.cwd(), "content", "blog");
const projectsDir = path.join(process.cwd(), "content", "projects");
const workDir = path.join(process.cwd(), "content", "work");
const isProduction = process.env.NODE_ENV === "production";
const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

export const CONTENT_CACHE_TAGS = {
  blog: "content:blog",
  projects: "content:projects",
  work: "content:work",
} as const;

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function toProjectMetrics(value: unknown): ProjectMetric[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is Record<string, unknown> => {
      return !!item && typeof item === "object" && !Array.isArray(item);
    })
    .map((item) => ({
      label: typeof item.label === "string" ? item.label : "",
      value: typeof item.value === "string" ? item.value : "",
    }))
    .filter((item) => item.label.length > 0 && item.value.length > 0);
}

function toProjectEvidence(value: unknown): ProjectEvidence[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is Record<string, unknown> => {
      return !!item && typeof item === "object" && !Array.isArray(item);
    })
    .map((item) => ({
      label: typeof item.label === "string" ? item.label : "",
      href: typeof item.href === "string" ? item.href : "",
    }))
    .filter((item) => item.label.length > 0 && item.href.length > 0);
}

function normalizeMeta(
  slug: string,
  data: Record<string, unknown>,
): ContentMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "",
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: toStringArray(data.tags),
    level: typeof data.level === "string" ? data.level : undefined,
    track: typeof data.track === "string" ? data.track : undefined,
    appliesTo: toStringArray(data.appliesTo),
    takeaway: typeof data.takeaway === "string" ? data.takeaway : undefined,
    project: typeof data.project === "string" ? data.project : undefined,
    featured: typeof data.featured === "boolean" ? data.featured : false,
    mark:
      typeof data.mark === "string" && data.mark.startsWith("/")
        ? data.mark
        : undefined,
    draft: data.draft === true,
  };
}

function assertProjectField(
  condition: boolean,
  fileName: string,
  message: string,
) {
  if (!condition) {
    throw new Error(`[content/projects/${fileName}] ${message}`);
  }
}

function normalizeProjectMeta(
  slug: string,
  data: Record<string, unknown>,
  fileName: string,
): ProjectMeta {
  const title = data.title;
  const date = data.date;
  const summary = data.summary;
  const status = data.status;
  const tech = data.tech;
  const links = data.links;
  const featured = data.featured;
  const priority = data.priority;
  const domains = data.domains;
  const constraints = data.constraints;
  const metrics = data.metrics;
  const evidence = data.evidence;
  const outcomes = data.outcomes;
  const techArray = Array.isArray(tech) ? tech : [];
  const normalizedTech = techArray.filter(
    (item): item is string => typeof item === "string",
  );
  const normalizedTitle = typeof title === "string" ? title : slug;
  const normalizedDate = typeof date === "string" ? date : "";
  const normalizedSummary = typeof summary === "string" ? summary : "";
  const normalizedStatus = status as ProjectStatus;
  const normalizedPriority =
    typeof priority === "number" && Number.isFinite(priority) ? priority : 100;

  assertProjectField(typeof title === "string", fileName, "Missing title");
  assertProjectField(typeof date === "string", fileName, "Missing date");
  assertProjectField(typeof summary === "string", fileName, "Missing summary");
  assertProjectField(
    status === "Live" ||
      status === "Ongoing" ||
      status === "WIP" ||
      status === "Paused" ||
      status === "Completed",
    fileName,
    "Status must be Live, Ongoing, WIP, Paused, or Completed",
  );
  assertProjectField(Array.isArray(tech), fileName, "Missing tech array");
  assertProjectField(
    normalizedTech.length === techArray.length,
    fileName,
    "Tech must be an array of strings",
  );

  const normalizedLinks: ProjectLinks = {};
  if (links && typeof links === "object" && !Array.isArray(links)) {
    const live = (links as { live?: unknown }).live;
    const code = (links as { code?: unknown }).code;
    if (typeof live === "string") {
      normalizedLinks.live = live;
    }
    if (typeof code === "string") {
      normalizedLinks.code = code;
    }
  }

  return {
    slug,
    title: normalizedTitle,
    date: normalizedDate,
    summary: normalizedSummary,
    status: normalizedStatus,
    tech: normalizedTech,
    links: normalizedLinks,
    featured: typeof featured === "boolean" ? featured : false,
    priority: normalizedPriority,
    domains: toStringArray(domains),
    constraints: toStringArray(constraints),
    metrics: toProjectMetrics(metrics),
    evidence: toProjectEvidence(evidence),
    outcomes: toStringArray(outcomes),
  };
}

function assertWorkField(
  condition: boolean,
  fileName: string,
  message: string,
) {
  if (!condition) {
    throw new Error(`[content/work/${fileName}] ${message}`);
  }
}

function toRecords(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is Record<string, unknown> => {
    return !!item && typeof item === "object" && !Array.isArray(item);
  });
}

function normalizeWorkMeta(
  slug: string,
  data: Record<string, unknown>,
  fileName: string,
): WorkMeta {
  const { title, date, summary, company, role, tech, priority } = data;

  assertWorkField(typeof title === "string", fileName, "Missing title");
  assertWorkField(
    typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date),
    fileName,
    "date must be YYYY-MM-DD",
  );
  assertWorkField(typeof summary === "string", fileName, "Missing summary");
  assertWorkField(typeof company === "string", fileName, "Missing company");
  assertWorkField(Array.isArray(tech), fileName, "Missing tech array");

  const experience = WORK_EXPERIENCE.find((item) => item.id === company);
  assertWorkField(
    !!experience,
    fileName,
    `company "${String(company)}" is not an id in src/content/experience.ts`,
  );

  const highlights = toRecords(data.highlights).map((item) => {
    const icon = item.icon as WorkHighlightIcon;
    assertWorkField(
      WORK_HIGHLIGHT_ICONS.includes(icon),
      fileName,
      `highlight icon must be one of: ${WORK_HIGHLIGHT_ICONS.join(", ")}`,
    );
    assertWorkField(
      typeof item.label === "string",
      fileName,
      "Each highlight needs a label",
    );
    return { icon, label: item.label as string };
  });

  const glance = toRecords(data.glance).map((item) => {
    assertWorkField(
      typeof item.label === "string" && typeof item.value === "string",
      fileName,
      "Each glance row needs a label and a value",
    );
    return { label: item.label as string, value: item.value as string };
  });

  assertWorkField(
    data.cardTitle === undefined || typeof data.cardTitle === "string",
    fileName,
    "cardTitle must be a string",
  );
  assertWorkField(
    data.mark === undefined ||
      (typeof data.mark === "string" && data.mark.startsWith("/")),
    fileName,
    "mark must be a path starting with /",
  );

  const defaultRole =
    experience?.role?.title ?? experience?.positions[0]?.title ?? "";

  return {
    slug,
    title: title as string,
    date: date as string,
    summary: summary as string,
    company: company as string,
    companyName: experience?.companyName ?? (company as string),
    companyLogo: experience?.companyLogo,
    role: typeof role === "string" ? role : defaultRole,
    tech: toStringArray(tech),
    highlights,
    glance,
    outcomes: toStringArray(data.outcomes),
    cardTitle: data.cardTitle as string | undefined,
    mark: data.mark as string | undefined,
    featured: data.featured === true,
    priority:
      typeof priority === "number" && Number.isFinite(priority)
        ? priority
        : 100,
    draft: data.draft === true,
  };
}

async function readMdxMeta(dir: string) {
  const files = await fs.readdir(dir);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);
        return normalizeMeta(slug, data);
      }),
  );

  return entries
    .filter(isVisiblePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function readProjectMetaList() {
  const files = await fs.readdir(projectsDir);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(projectsDir, file), "utf8");
        const { data } = matter(raw);
        return normalizeProjectMeta(slug, data, file);
      }),
  );

  return entries.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }

    const byDate = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (byDate !== 0) {
      return byDate;
    }

    return a.title.localeCompare(b.title);
  });
}

/** Drafts render in `next dev` and are left out of production builds. */
function isVisibleWork(meta: WorkMeta) {
  return !meta.draft || !isProduction;
}

/** Draft posts are hidden everywhere, including `next dev`. */
function isVisiblePost(meta: ContentMeta) {
  return !meta.draft;
}

async function readWorkMetaList() {
  let files: string[];
  try {
    files = await fs.readdir(workDir);
  } catch {
    return [];
  }

  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(workDir, file), "utf8");
        const { data } = matter(raw);
        return normalizeWorkMeta(slug, data, file);
      }),
  );

  return entries.filter(isVisibleWork).sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }

    const byDate = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (byDate !== 0) {
      return byDate;
    }

    return a.title.localeCompare(b.title);
  });
}

async function readWorkMetaBySlug(slug: string) {
  try {
    const raw = await fs.readFile(path.join(workDir, `${slug}.mdx`), "utf8");
    const { data } = matter(raw);
    const meta = normalizeWorkMeta(slug, data, `${slug}.mdx`);
    return isVisibleWork(meta) ? meta : null;
  } catch (error) {
    if (
      error instanceof Error &&
      (error as Error & { code?: string }).code === "ENOENT"
    ) {
      return null;
    }

    throw error;
  }
}

async function readBlogMetaBySlug(slug: string) {
  try {
    const filePath = path.join(blogDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    const meta = normalizeMeta(slug, data as Record<string, unknown>);
    return isVisiblePost(meta) ? meta : null;
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const maybeCode = (error as Error & { code?: string }).code;
      if (maybeCode === "ENOENT") {
        return null;
      }
    }

    throw error;
  }
}

async function readProjectMetaBySlug(slug: string) {
  try {
    const filePath = path.join(projectsDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    return normalizeProjectMeta(
      slug,
      data as Record<string, unknown>,
      `${slug}.mdx`,
    );
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const maybeCode = (error as Error & { code?: string }).code;
      if (maybeCode === "ENOENT") {
        return null;
      }
    }

    throw error;
  }
}

const getAllBlogPostsCached = unstable_cache(
  async () => readMdxMeta(blogDir),
  ["content-blog-list"],
  { tags: [CONTENT_CACHE_TAGS.blog] },
);

const getAllProjectsCached = unstable_cache(
  async () => readProjectMetaList(),
  ["content-project-list"],
  { tags: [CONTENT_CACHE_TAGS.projects] },
);

const getBlogMetaBySlugCached = unstable_cache(
  async (slug: string) => readBlogMetaBySlug(slug),
  ["content-blog-by-slug"],
  { tags: [CONTENT_CACHE_TAGS.blog] },
);

const getProjectMetaBySlugCached = unstable_cache(
  async (slug: string) => readProjectMetaBySlug(slug),
  ["content-project-by-slug"],
  { tags: [CONTENT_CACHE_TAGS.projects] },
);

const getAllWorkCached = unstable_cache(
  async () => readWorkMetaList(),
  ["content-work-list"],
  { tags: [CONTENT_CACHE_TAGS.work] },
);

const getWorkMetaBySlugCached = unstable_cache(
  async (slug: string) => readWorkMetaBySlug(slug),
  ["content-work-by-slug"],
  { tags: [CONTENT_CACHE_TAGS.work] },
);

export async function getAllWork() {
  if (!isProduction || isProductionBuild) {
    return readWorkMetaList();
  }

  return getAllWorkCached();
}

export async function getFeaturedWork(limit = 3) {
  const work = await getAllWork();
  return work.filter((item) => item.featured).slice(0, limit);
}

export async function getWorkMetaBySlug(slug: string) {
  if (!isProduction || isProductionBuild) {
    return readWorkMetaBySlug(slug);
  }

  return getWorkMetaBySlugCached(slug);
}

export async function getWorkBySlug(slug: string) {
  const meta = await getWorkMetaBySlug(slug);
  if (!meta) {
    return null;
  }

  const { default: Content } = await import(`../../content/work/${slug}.mdx`);

  return { meta, Content };
}

export async function getAllBlogPosts() {
  if (!isProduction || isProductionBuild) {
    return readMdxMeta(blogDir);
  }

  return getAllBlogPostsCached();
}

export async function getFeaturedBlogPost(): Promise<ContentMeta | null> {
  const posts = await getAllBlogPosts();
  return posts.find((p) => p.featured) ?? null;
}

export async function getAllProjects() {
  if (!isProduction || isProductionBuild) {
    return readProjectMetaList();
  }

  return getAllProjectsCached();
}

export async function getFeaturedProjects(limit = 4) {
  const projects =
    isProduction && !isProductionBuild
      ? await getAllProjectsCached()
      : await readProjectMetaList();

  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getBlogMetaBySlug(slug: string) {
  if (!isProduction || isProductionBuild) {
    return readBlogMetaBySlug(slug);
  }

  return getBlogMetaBySlugCached(slug);
}

export async function getProjectMetaBySlug(slug: string) {
  if (!isProduction || isProductionBuild) {
    return readProjectMetaBySlug(slug);
  }

  return getProjectMetaBySlugCached(slug);
}

export async function getBlogsByProject(projectSlug: string) {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.project === projectSlug);
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const meta = await getBlogMetaBySlug(slug);
    if (!meta) {
      return null;
    }

    const { default: Content } = await import(`../../content/blog/${slug}.mdx`);

    return {
      meta,
      Content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const maybeCode = (error as Error & { code?: string }).code;
      if (maybeCode === "ENOENT") {
        return null;
      }
    }

    return null;
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const meta = await getProjectMetaBySlug(slug);
    if (!meta) {
      return null;
    }

    const { default: Content } = await import(
      `../../content/projects/${slug}.mdx`
    );

    return {
      meta,
      Content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const maybeCode = (error as Error & { code?: string }).code;
      if (maybeCode === "ENOENT") {
        return null;
      }
    }
    throw error;
  }
}
