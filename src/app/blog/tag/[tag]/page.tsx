import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { TagChip } from "@/components/Chip";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Params = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `${decoded}の記事`,
    description: `「${decoded}」に関する記事の一覧です。`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function TagPage({ params }: Params) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  const otherTags = getAllTags().filter((entry) => entry.tag !== decoded);

  return (
    <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
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
          <li className="text-ink">{decoded}</li>
        </ol>
      </nav>

      <p className="type-overline-en mt-8 text-ink-muted">Tag</p>
      <h1 className="type-h1 mt-2 text-ink-strong">{decoded}</h1>
      <p className="type-lead mt-4 text-ink-muted">{posts.length}本の記事があります。</p>

      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <ArticleCard key={post.slug} post={post} priority={index < 3} />
        ))}
      </div>

      {otherTags.length > 0 ? (
        <section className="mt-section border-t border-line pt-10">
          <p className="type-overline-en text-ink-muted">Other Tags</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {otherTags.map(({ tag: other }) => (
              <li key={other}>
                <TagChip tag={other} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
