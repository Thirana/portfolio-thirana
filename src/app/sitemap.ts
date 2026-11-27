import type { MetadataRoute } from "next";
import { getAllBlogPosts, getAllProjects, getAllWork } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects, work] = await Promise.all([
    getAllBlogPosts(),
    getAllProjects(),
    getAllWork(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: project.date ? new Date(project.date) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const workEntries: MetadataRoute.Sitemap = work.map((item) => ({
    url: absoluteUrl(`/work/${item.slug}`),
    lastModified: new Date(item.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...workEntries, ...blogEntries, ...projectEntries];
}
