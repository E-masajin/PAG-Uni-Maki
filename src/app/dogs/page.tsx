import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { ButtonLink } from "@/components/Button";
import { ArticleCard } from "@/components/ArticleCard";
import { dogs, getAgeLabel } from "@/lib/dogs";
import { getPostsByCategory } from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "うに＆まきのプロフィール",
  description:
    "このサイトの主役、うにとまきのプロフィール。犬種・年齢・性格と、2匹がうちに来るまでのこと。",
  alternates: { canonical: "/dogs" },
};

export default function DogsPage() {
  const diaryPosts = getPostsByCategory("diary").slice(0, 3);

  return (
    <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", path: "/" },
              { name: "うに＆まきのプロフィール", path: "/dogs" },
            ]),
          ),
        }}
      />

      <p className="type-overline-en text-ink-muted">Our Dogs</p>
      <h1 className="type-h1 mt-2 text-ink-strong">うにと、まき</h1>
      <p className="type-lead mt-4 max-w-[54ch] text-ink-muted">
        このサイトの主役の2匹です。性格も、得意なことも、苦手なものも、まったく違います。
      </p>

      <div className="mt-section flex flex-col gap-section">
        {dogs.map((dog, index) => (
          <article
            key={dog.slug}
            id={dog.slug}
            className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12"
          >
            <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <Photo
                src={dog.photo ?? null}
                alt={dog.photoAlt ?? `${dog.name}のポートレート`}
                ratio="4/5"
                plan={`撮影予定：${dog.name}の正面ポートレート（自然光・目線あり）`}
                sizes="(min-width: 64rem) 40vw, 100vw"
                priority={index === 0}
              />
            </div>

            <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="flex items-baseline gap-3">
                <h2 className="type-h1 text-ink-strong">{dog.name}</h2>
                <span className="type-overline-en text-ink-muted">{dog.slug}</span>
              </div>

              <p className="type-lead mt-4 text-ink">{dog.catchphrase}</p>
              <p className="mt-5 max-w-[46ch] text-ink">{dog.introduction}</p>

              <dl className="mt-8 grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 border-t border-line pt-6">
                <dt className="type-caption text-ink-muted">犬種</dt>
                <dd className="type-body-sm text-ink">{dog.breed}</dd>
                <dt className="type-caption text-ink-muted">誕生日</dt>
                <dd className="type-body-sm text-ink">
                  <time dateTime={dog.birthday}>{dog.birthday.replace(/-/g, ".")}</time>（
                  {getAgeLabel(dog.birthday)}）
                </dd>
                <dt className="type-caption text-ink-muted">性別</dt>
                <dd className="type-body-sm text-ink">{dog.sex}</dd>
                <dt className="type-caption text-ink-muted">好きなもの</dt>
                <dd className="type-body-sm text-ink">{dog.likes.join("、")}</dd>
                <dt className="type-caption text-ink-muted">苦手なもの</dt>
                <dd className="type-body-sm text-ink">{dog.dislikes.join("、")}</dd>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2">
                {dog.traits.map((trait) => (
                  <li key={trait}>
                    <span className="inline-flex h-8 items-center rounded-[var(--radius-full)] border border-line px-3.5 text-[0.8125rem] text-ink-muted">
                      {trait}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {diaryPosts.length > 0 ? (
        <section className="mt-section border-t border-line pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="type-h2 text-ink-strong">2匹の日記</h2>
            <Link
              href="/blog/category/diary"
              className="type-nav text-ink-muted transition-colors hover:text-ink"
            >
              日記をすべて見る
            </Link>
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {diaryPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-section rounded-[var(--radius-md)] border border-line bg-card p-6 md:p-10">
        <h2 className="type-h3 text-ink-strong">毎日の様子は SNS で</h2>
        <p className="mt-3 max-w-[46ch] text-ink-muted">
          サイトはじっくり書く場所。今日のうにとまきは、SNS のほうが早いです。
        </p>
        <ButtonLink href="/#follow" variant="secondary" className="mt-6">
          SNS を見る
        </ButtonLink>
      </section>
    </div>
  );
}
