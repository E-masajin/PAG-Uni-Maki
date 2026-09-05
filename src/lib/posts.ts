import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { categories, isCategorySlug, type CategorySlug } from "@/lib/categories";

export const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

// カテゴリ定義は fs に依存しない categories.ts に置き、ここから再エクスポートする
export { categories, categorySlugs, isCategorySlug } from "@/lib/categories";
export type { CategorySlug } from "@/lib/categories";

export type PostFrontmatter = {
  title: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  /** 加筆修正した日。指定があれば記事に表示する */
  updated?: string;
  category: CategorySlug;
  tags: string[];
  /** /public からの相対パス。未設定なら自動生成のプレースホルダーを使う */
  cover?: string;
  coverAlt?: string;
  /** アフィリエイトリンク・提供を含む記事。景品表示法の運用基準に合わせて必ず明示する */
  pr: boolean;
  /** true の記事は本番ビルドから除外する */
  draft: boolean;
  /** トップページのおすすめ枠に出す */
  featured: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  /** 目安の読了時間（分） */
  readingMinutes: number;
};

export type PostWithContent = Post & {
  html: string;
  headings: { id: string; text: string; depth: number }[];
};

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim() !== "") return [value];
  return [];
}

/** 日本語は単語区切りが無いので、文字数ベースで読了時間を見積もる（約 600 字/分） */
function estimateReadingMinutes(body: string): number {
  const characters = body.replace(/\s/g, "").length;
  return Math.max(1, Math.round(characters / 600));
}

function parseFile(fileName: string): { post: Post; body: string } | null {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const category = typeof data.category === "string" && isCategorySlug(data.category) ? data.category : "diary";

  const post: Post = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    category,
    tags: toStringArray(data.tags),
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    pr: data.pr === true,
    draft: data.draft === true,
    featured: data.featured === true,
    readingMinutes: estimateReadingMinutes(content),
  };

  return { post, body: content };
}

/** 公開記事の一覧を新しい順に返す */
export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => parseFile(file))
    .filter((parsed): parsed is { post: Post; body: string } => parsed !== null)
    .map(({ post }) => post)
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getPostsByCategory = cache((category: CategorySlug): Post[] =>
  getAllPosts().filter((post) => post.category === category),
);

export const getPostsByTag = cache((tag: string): Post[] =>
  getAllPosts().filter((post) => post.tags.includes(tag)),
);

/** タグを使用数の多い順に返す */
export const getAllTags = cache((): { tag: string; count: number }[] => {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));
});

export const getFeaturedPosts = cache((limit = 3): Post[] => {
  const featured = getAllPosts().filter((post) => post.featured);
  return (featured.length > 0 ? featured : getAllPosts()).slice(0, limit);
});

/** 同カテゴリを優先しつつ、足りなければ新着で埋める */
export function getRelatedPosts(current: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((post) => post.slug !== current.slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  // 見出しに id を振る。記事内の目次から #id で飛べるようにするため
  .use(rehypeSlug)
  .use(rehypeStringify);

/** 見出しを目次用に抜き出す（h2 / h3 のみ） */
function extractHeadings(body: string) {
  const headings: { id: string; text: string; depth: number }[] = [];
  const lines = body.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "");
    headings.push({
      // rehype-slug と同じ規則で id を作る
      id: text
        .toLowerCase()
        .replace(/[\s]+/g, "-")
        .replace(/[^\p{Letter}\p{Number}\-_]/gu, ""),
      text,
      depth: match[1].length,
    });
  }

  return headings;
}

export async function getPost(slug: string): Promise<PostWithContent | null> {
  const candidates = [`${slug}.md`, `${slug}.mdx`];
  const fileName = candidates.find((file) => fs.existsSync(path.join(POSTS_DIR, file)));
  if (!fileName) return null;

  const parsed = parseFile(fileName);
  if (!parsed || parsed.post.draft) return null;

  const html = String(await markdownProcessor.process(parsed.body));

  return { ...parsed.post, html, headings: extractHeadings(parsed.body) };
}

export function formatDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(parsed);
}
