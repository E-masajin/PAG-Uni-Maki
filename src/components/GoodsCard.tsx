import Link from "next/link";
import { Photo } from "@/components/Photo";
import { AdLabel, PrBadge } from "@/components/PrDisclosure";
import { ExternalIcon } from "@/components/icons";
import { buttonClass } from "@/components/Button";
import { goodsCategories, type Goods } from "@/lib/goods";

/**
 * グッズ紹介カード（§5.3）。
 * 情報の優先順位は 写真 > 商品名 > ひとこと > 価格 > CTA。
 * 価格を商品名より大きくしない（「売る」より「勧める」の姿勢）。
 */
export function GoodsCard({ item, className = "" }: { item: Goods; className?: string }) {
  const category = goodsCategories[item.category];

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-line bg-card transition-colors duration-[var(--dur-base)] hover:border-line-strong ${className}`}
    >
      <div className="relative">
        <Photo
          src={item.image ?? null}
          alt={item.imageAlt ?? `${item.name}を使ううに・まき`}
          ratio="1/1"
          plan={`撮影予定：${item.name}を使っているところ`}
          sizes="(min-width: 80rem) 17rem, (min-width: 40rem) 50vw, 78vw"
          rounded={false}
        />
        <PrBadge className="absolute left-2 top-2" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <p className="type-overline text-ink-muted">{category.name}</p>

        <h3 className="card-title type-h4 text-ink-strong clamp-2">{item.name}</h3>

        {/* うにまき的ひとこと */}
        <p className="border-l-2 border-accent pl-3 type-body-sm text-ink clamp-2">{item.summary}</p>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <AdLabel />
            <span className="type-price text-ink-strong">{item.priceRange}</span>
          </div>

          {item.affiliateUrl ? (
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              className={buttonClass({ variant: "primary", size: "sm", className: "w-full" })}
            >
              {item.shopLabel ?? "ショップ"}で見る
              <ExternalIcon className="size-4" />
              <span className="sr-only">（新しいタブで開きます）</span>
            </a>
          ) : (
            <p className="type-caption text-ink-muted">
              リンクは準備中です。{item.shopLabel ? `${item.shopLabel}での取り扱いを確認しています。` : ""}
            </p>
          )}

          {item.relatedPostSlug ? (
            <Link
              href={`/blog/${item.relatedPostSlug}`}
              className="type-caption text-link underline underline-offset-[0.18em]"
            >
              くわしいレビューを読む
            </Link>
          ) : null}

          <p className="type-caption text-ink-muted">価格は変動します。リンク先でご確認ください。</p>
        </div>
      </div>
    </article>
  );
}
