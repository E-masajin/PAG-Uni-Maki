import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/Photo";
import { CategoryChip, TagChip } from "@/components/Chip";
import { PrNotice } from "@/components/PrDisclosure";
import { ArticleCard } from "@/components/ArticleCard";
import { ShareLinks } from "@/components/ShareLinks";
import { SocialTiles } from "@/components/SocialTiles";
import { GoodsCard } from "@/components/GoodsCard";
import { CollapsibleTableOfContents, TableOfContents } from "@/components/TableOfContents";
import { categories, formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";
import { goods } from "@/lib/goods";
import { absoluteUrl } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url: absoluteUrl(url),
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const category = categories[post.category];
  const related = getRelatedPosts(post);
  // 記事に紐づくグッズ（サイドバー・末尾に出す）
  const relatedGoods = goods.filter((item) => item.relatedPostSlug === post.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-[var(--container-content)] px-gutter py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", path: "/" },
              { name: "記事一覧", path: "/blog" },
              { name: category.name, path: `/blog/category/${post.category}` },
              { name: post.title, path: `/blog/${post.slug}` },
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
          <li>
            <Link href={`/blog/category/${post.category}`} className="hover:text-ink">
              {category.name}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mt-8 xl:grid xl:grid-cols-[minmax(0,40rem)_18rem] xl:items-start xl:justify-center xl:gap-16">
        <div className="min-w-0">
          <header>
            <h1 className="type-h1 text-ink-strong">{post.title}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <CategoryChip category={post.category} size="md" />
              <p className="flex items-center gap-2 type-body-sm text-ink-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>約{post.readingMinutes}分で読めます</span>
              </p>
            </div>

            {post.updated ? (
              <p className="mt-2 type-caption text-ink-muted">
                <time dateTime={post.updated}>{formatDate(post.updated)}</time>に加筆修正しました
              </p>
            ) : null}

            {/* 形式1：スクロールなしで見える位置に置く */}
            {post.pr ? <PrNotice className="mt-6" /> : null}

            <div className="mt-8">
              <Photo
                src={post.cover ?? null}
                alt={post.coverAlt ?? ""}
                ratio="3/2"
                plan={post.coverAlt ? `撮影予定：${post.coverAlt}` : undefined}
                sizes="(min-width: 40rem) 40rem, 100vw"
                priority
              />
            </div>

            <p className="type-lead mt-8 text-ink">{post.description}</p>
          </header>

          <div className="mt-10 xl:hidden">
            <CollapsibleTableOfContents headings={post.headings} />
          </div>

          <div
            className="prose mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.tags.length > 0 ? (
            <ul className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <TagChip tag={tag} size="md" />
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 border-t border-line pt-8">
            <ShareLinks path={`/blog/${post.slug}`} title={post.title} />
          </div>

          {/* xl 未満ではグッズと SNS を本文末尾に移動する */}
          {relatedGoods.length > 0 ? (
            <section className="mt-12 xl:hidden">
              <h2 className="type-h3 text-ink-strong">この記事で紹介したもの</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedGoods.map((item) => (
                  <GoodsCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-12 xl:hidden">
            <h2 className="type-h3 text-ink-strong">毎日の2匹は、SNSで</h2>
            <SocialTiles className="mt-5" />
          </section>
        </div>

        {/* xl 以上のサイドバー */}
        <aside className="hidden xl:block">
          <div className="sticky top-20 flex flex-col gap-10">
            <TableOfContents headings={post.headings} />

            {relatedGoods.length > 0 ? (
              <section>
                <p className="type-overline-en text-ink-muted">Goods</p>
                <div className="mt-4 flex flex-col gap-4">
                  {relatedGoods.map((item) => (
                    <GoodsCard key={item.slug} item={item} />
                  ))}
                </div>
              </section>
            ) : null}

            <section>
              <p className="type-overline-en text-ink-muted">Follow</p>
              <div className="mt-4">
                <SocialTiles className="sm:grid-cols-1" />
              </div>
            </section>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-section border-t border-line pt-12">
          <h2 className="type-h2 text-ink-strong">あわせて読みたい</h2>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
