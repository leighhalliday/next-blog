import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "posts");

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*.mdx`);

  return paths.map((postPath) => {
    const parts = postPath.split("/");
    const fileName = parts[parts.length - 1];
    const [slug, _ext] = fileName.split(".");
    return slug;
  });
};

export const getAllPosts = (): Post[] => {
  const posts = getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return 1;
      if (a.meta.date < b.meta.date) return -1;
      return 0;
    });
  posts.reverse();

  return posts;
};

interface ExcerptBuffer extends Buffer {
  excerpt: string;
  content: string;
}

export interface Post {
  content: string;
  meta: PostMeta;
}

export interface PostMeta {
  excerpt: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
}

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath);
  const { content, data, excerpt } = matter(source, {
    excerpt: (input: ExcerptBuffer): string => {
      return (input.excerpt = input.content.split("\n")[1]);
    },
  });

  return {
    content,
    meta: {
      excerpt,
      slug,
      title: data.title ?? slug,
      tags: data.tags || [],
      date: (data.date || new Date()).toString(),
    },
  };
};
