import type { Metadata } from "next";
import { SocialTiles } from "@/components/SocialTiles";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "うに＆まきへのご連絡先です。商品提供・PR記事・取材のご依頼、記事内容についてのご指摘はこちらから。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const email = siteConfig.contactEmail;

  return (
    <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", path: "/" },
              { name: "お問い合わせ", path: "/contact" },
            ]),
          ),
        }}
      />

      <p className="type-overline-en text-ink-muted">Contact</p>
      <h1 className="type-h1 mt-2 text-ink-strong">お問い合わせ</h1>

      <div className="prose mt-10">
        <p>
          記事へのご指摘、商品提供・PR記事・取材のご依頼、その他のご連絡は、以下からお願いします。
          いただいた内容にはできるだけ目を通していますが、すべてに返信はできないことがあります。
        </p>

        <h2>メール</h2>
        {email ? (
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        ) : (
          <p>
            メールアドレスは準備中です。お急ぎの場合は、下記の SNS のダイレクトメッセージからご連絡ください。
          </p>
        )}

        <h2>SNS のダイレクトメッセージ</h2>
        <p>各アカウントの DM でも受け付けています。返信は X が一番早いです。</p>

        <h2>PR・商品提供のご依頼について</h2>
        <p>お引き受けする場合、次の点をあらかじめご了承ください。</p>
        <ul>
          <li>実際に使ったうえで書くため、掲載までに時間をいただきます</li>
          <li>合わなかった点も記事に書きます。内容の検閲・書き直しの指示はお受けできません</li>
          <li>提供・PR であることは、記事の冒頭に明記します</li>
          <li>犬の健康を損なう可能性があると判断したものは、お受けできません</li>
        </ul>
      </div>

      <section className="mt-section">
        <h2 className="type-h2 text-ink-strong">SNS アカウント</h2>
        <SocialTiles className="mt-8" />
      </section>
    </div>
  );
}
