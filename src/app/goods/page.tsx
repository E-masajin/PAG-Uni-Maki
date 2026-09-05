import type { Metadata } from "next";
import { GoodsCard } from "@/components/GoodsCard";
import { AdDisclosureLine } from "@/components/PrDisclosure";
import { goods, goodsCategories, type GoodsCategory } from "@/lib/goods";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "おすすめグッズ",
  description:
    "うに・まきが実際に使って続いているグッズを、用途別にまとめました。合わなかった点も正直に書いています。",
  alternates: { canonical: "/goods" },
};

const order: GoodsCategory[] = ["welcome", "everyday", "outdoor", "care"];

export default function GoodsPage() {
  return (
    <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", path: "/" },
              { name: "おすすめグッズ", path: "/goods" },
            ]),
          ),
        }}
      />

      <p className="type-overline-en text-ink-muted">Goods</p>
      <h1 className="type-h1 mt-2 text-ink-strong">2匹が実際に使っているもの</h1>
      <p className="type-lead mt-4 max-w-[54ch] text-ink-muted">
        試して、続いているものだけを載せています。合わなかったものは、なぜ合わなかったかも書きます。
      </p>

      <AdDisclosureLine className="mt-6" />

      <div className="mt-section flex flex-col gap-section">
        {order.map((categoryKey) => {
          const category = goodsCategories[categoryKey];
          const items = goods.filter((item) => item.category === categoryKey);
          if (items.length === 0) return null;

          return (
            <section key={categoryKey} id={categoryKey}>
              <h2 className="type-h2 text-ink-strong">{category.name}</h2>
              <p className="mt-3 max-w-[52ch] text-ink-muted">{category.description}</p>

              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                  <li key={item.slug}>
                    <GoodsCard item={item} />
                  </li>
                ))}
              </ul>

              {/* 使ってみた理由と注意点は、カードに収まらないので下に展開する */}
              <dl className="mt-8 flex flex-col gap-6 border-t border-line pt-8">
                {items.map((item) => (
                  <div key={item.slug}>
                    <dt className="type-h4 text-ink-strong">{item.name}</dt>
                    <dd className="mt-2 max-w-[60ch] text-ink">{item.reason}</dd>
                    {item.caveat ? (
                      <dd className="mt-3 flex max-w-[60ch] gap-2 border-l-2 border-secondary pl-3 type-body-sm text-ink">
                        <span className="font-semibold text-ink-strong">注意</span>
                        <span>{item.caveat}</span>
                      </dd>
                    ) : null}
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>

      <p className="mt-section max-w-[60ch] type-body-sm text-ink-muted">
        掲載している価格は目安です。実際の価格は変動するため、必ずリンク先でご確認ください。
        体調や体格に不安がある場合の道具選びは、かかりつけの獣医師にもご相談ください。
      </p>
    </div>
  );
}
