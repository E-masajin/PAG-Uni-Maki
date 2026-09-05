import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { categorySlugs, getAllPosts, getAllTags } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: latestPostDate, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/dogs"), lastModified: latestPostDate, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/goods"), lastModified: latestPostDate, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: latestPostDate, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: latestPostDate, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/privacy"), lastModified: latestPostDate, changeFrequency: "yearly", priority: 0.3 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: post.featured ? 0.9 : 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: absoluteUrl(`/blog/category/${slug}`),
    lastModified: latestPostDate,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const tagPages: MetadataRoute.Sitemap = getAllTags().map(({ tag }) => ({
    url: absoluteUrl(`/blog/tag/${encodeURIComponent(tag)}`),
    lastModified: latestPostDate,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticPages, ...postPages, ...categoryPages, ...tagPages];
}
