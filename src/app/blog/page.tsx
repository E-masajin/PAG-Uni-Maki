import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { TagChip } from "@/components/Chip";
import { categories, categorySlugs, getAllPosts, getAllTags } from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "うに・まきとの暮らしの記録と、犬を迎える前に知りたいこと、毎日のお世話で迷いやすいことをまとめた記事の一覧です。",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags().slice(0, 12);

  return (
    <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", path: "/" },
              { name: "記事一覧", path: "/blog" },
            ]),
          ),
        }}
      />

      <p className="type-overline-en text-ink-muted">Journal</p>
      <h1 className="type-h1 mt-2 text-ink-strong">記事一覧</h1>
      <p className="type-lead mt-4 max-w-[54ch] text-ink-muted">
        全{posts.length}本。うに・まきとの毎日と、犬と暮らすうえで実際に迷ったことの記録です。
      </p>

      {/* カテゴリのフィルタ行 */}
      <nav aria-label="カテゴリで絞り込む" className="-mx-gutter mt-8 overflow-x-auto px-gutter">
        <ul className="flex w-max gap-2">
          <li>
            <span className="inline-flex h-8 items-center rounded-[var(--radius-full)] bg-ink-strong px-3.5 text-[0.8125rem] font-semibold text-paper">
              すべて
            </span>
          </li>
          {categorySlugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/blog/category/${slug}`}
                className={`inline-flex h-8 items-center rounded-[var(--radius-full)] px-3.5 text-[0.8125rem] font-semibold transition-colors ${
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

      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <ArticleCard key={post.slug} post={post} priority={index < 3} />
        ))}
      </div>

      {tags.length > 0 ? (
        <section className="mt-section border-t border-line pt-10">
          <h2 className="type-overline-en text-ink-muted">Tags</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <TagChip tag={`${tag}（${count}）`.replace(/（\d+）$/, "")} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
