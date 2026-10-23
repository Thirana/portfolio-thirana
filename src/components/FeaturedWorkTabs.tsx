"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PillTabsList } from "@/components/PillTabs";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import type { ProjectMeta, ContentMeta } from "@/lib/content";

type FeaturedWorkTabsProps = {
  projects: ProjectMeta[];
  posts: ContentMeta[];
};

export default function FeaturedWorkTabs({
  projects,
  posts,
}: FeaturedWorkTabsProps) {
  return (
    <Tabs defaultValue="projects">
      <PillTabsList
        tabs={[
          { value: "projects", label: "Projects" },
          { value: "writing", label: "Writing" },
        ]}
      />

      <TabsContent value="projects" className="mt-5 space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </TabsContent>

      <TabsContent value="writing" className="mt-5 space-y-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
