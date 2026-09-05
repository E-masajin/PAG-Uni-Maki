import Link from "next/link";
import { Photo } from "@/components/Photo";
import { CategoryChip } from "@/components/Chip";
import { PrBadge } from "@/components/PrDisclosure";
import { formatDate, type Post } from "@/lib/posts";

type Variant = "default" | "featured" | "compact";

const cardSizes: Record<Exclude<Variant, "compact">, string> = {
  default: "(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw",
  featured: "(min-width: 64rem) 42rem, 100vw",
};

/**
 * 記事カード（§5.2）。
 * 枠なし・影なし・背景なし。区切りは余白で作る。
 * クリック領域はカード全体だが、カードを <a> で包まない（読み上げが長くなる）。
 */
export function ArticleCard({
  post,
  variant = "default",
  priority = false,
}: {
  post: Post;
  variant?: Variant;
  priority?: boolean;
}) {
  if (variant === "compact") {
    return (
      <article className="group relative flex items-start gap-3">
        <div className="w-24 shrink-0">
          <Photo
            src={post.cover ?? null}
            alt={post.coverAlt ?? ""}
            ratio="1/1"
            plan={post.coverAlt}
            sizes="96px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="card-title type-body-sm font-bold leading-snug text-ink-strong clamp-2">
            <Link
              href={`/blog/${post.slug}`}
              className="card-link transition-[text-decoration-color] group-hover:underline group-hover:underline-offset-[0.2em]"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-2 type-caption text-ink-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.pr ? <PrBadge /> : null}
          </p>
        </div>
      </article>
    );
  }

  const isFeatured = variant === "featured";

  return (
    <article
      className={`group relative ${isFeatured ? "grid gap-5 lg:grid-cols-12 lg:items-center lg:gap-8" : ""}`}
    >
      <div className={isFeatured ? "lg:col-span-7" : ""}>
        <div className="relative overflow-hidden rounded-[var(--radius-md)]">
          <Photo
            src={post.cover ?? null}
            alt={post.coverAlt ?? ""}
            ratio="3/2"
            plan={post.coverAlt ? `撮影予定：${post.coverAlt}` : undefined}
            sizes={cardSizes[variant]}
            priority={priority}
            className="transition-transform duration-[var(--dur-slower)] ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.03] motion-safe:group-active:scale-100"
          />
          {post.pr ? <PrBadge className="absolute left-2 top-2 z-1" /> : null}
        </div>
      </div>

      <div className={isFeatured ? "lg:col-span-5" : "mt-4"}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <CategoryChip category={post.category} />
          <p className="flex items-center gap-2 type-caption text-ink-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>約{post.readingMinutes}分</span>
          </p>
        </div>

        <h3
          className={`card-title mt-2 text-ink-strong clamp-2 ${
            isFeatured ? "text-2xl font-bold leading-snug" : "type-h4"
          }`}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="card-link transition-[text-decoration-color] group-hover:underline group-hover:underline-offset-[0.2em]"
          >
            {post.title}
          </Link>
        </h3>

        <p
          className={`mt-2 type-body-sm text-ink-muted ${isFeatured ? "clamp-3" : "clamp-2"}`}
        >
          {post.description}
        </p>
      </div>
    </article>
  );
}
