import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import {
  categories,
  categorySlugs,
  getPostsByCategory,
  isCategorySlug,
} from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySlug(category)) return {};

  const meta = categories[category];
  return {
    title: meta.name,
    description: meta.description,
    alternates: { canonical: `/blog/category/${category}` },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();

  const meta = categories[category];
  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", path: "/" },
              { name: "記事一覧", path: "/blog" },
              { name: meta.name, path: `/blog/category/${category}` },
            ]),
          ),
        }}
      />

      <nav aria-label="パンくずリスト" className="type-body-sm text-ink-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-ink">
              記事一覧
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{meta.name}</li>
        </ol>
      </nav>

      <p className="type-overline mt-8 text-ink-muted">{meta.tagline}</p>
      <h1 className="type-h1 mt-2 text-ink-strong">{meta.name}</h1>
      <p className="type-lead mt-4 max-w-[54ch] text-ink-muted">{meta.description}</p>

      {posts.length > 0 ? (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <ArticleCard key={post.slug} post={post} priority={index < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-ink-muted">このカテゴリの記事は準備中です。</p>
      )}

      <nav aria-label="ほかのカテゴリ" className="mt-section border-t border-line pt-10">
        <p className="type-overline-en text-ink-muted">Other Categories</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {categorySlugs
            .filter((slug) => slug !== category)
            .map((slug) => (
              <li key={slug}>
                <Link
                  href={`/blog/category/${slug}`}
                  className={`inline-flex h-8 items-center rounded-[var(--radius-full)] px-3.5 text-[0.8125rem] font-semibold ${
                    slug === "welcome"
                      ? "bg-secondary-soft text-on-secondary-soft"
                      : "bg-accent-soft text-on-accent-soft"
                  }`}
                >
                  {categories[slug].name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
