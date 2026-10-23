import { BookOpen } from "lucide-react";
import type { ContentMeta } from "@/lib/content";
import Section, { Seam } from "@/components/Section";
import { PostList } from "@/components/PostList";

type RelatedBlogsProps = {
  posts: ContentMeta[];
};

export default function RelatedBlogs({ posts }: RelatedBlogsProps) {
  if (posts.length === 0) return null;

  return (
    <>
      <Seam />
      <Section title="Related reading" icon={BookOpen} tone="var(--gl-swatch-2)">
        <PostList posts={posts} />
      </Section>
    </>
  );
}
