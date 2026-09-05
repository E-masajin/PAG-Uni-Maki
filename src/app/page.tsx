import Link from "next/link";
import { Photo } from "@/components/Photo";
import { ButtonLink } from "@/components/Button";
import { ArticleCard } from "@/components/ArticleCard";
import { GoodsCard } from "@/components/GoodsCard";
import { SocialIconLinks, SocialTiles } from "@/components/SocialTiles";
import { AdDisclosureLine } from "@/components/PrDisclosure";
import { TagChip } from "@/components/Chip";
import { ArrowRightIcon } from "@/components/icons";
import { dogs, getAgeLabel } from "@/lib/dogs";
import { goods } from "@/lib/goods";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 3);
  const carePosts = getPostsByCategory("care").slice(0, 3);
  const welcomePosts = getPostsByCategory("welcome").slice(0, 3);
  const lpGoods = goods.slice(0, 4);
  const [uni, maki] = dogs;

  return (
    <>
      {/* 1. ヒーロー — 写真に文字を重ねない。2本の CTA で A層／B層に分岐する */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[var(--container-wide)] lg:grid lg:grid-cols-12 lg:items-center">
          <div className="lg:order-2 lg:col-span-7">
            <Photo
              src={null}
              alt={`${uni.name}と${maki.name}が並んで座っている`}
              ratio="4/3"
              plan={`撮影予定：${uni.name}と${maki.name}が同じフレームに入った1枚（自然光・河川敷）`}
              priority
              rounded={false}
              sizes="(min-width: 64rem) 60vw, 100vw"
              /* モバイルは 2本目の CTA を 100svh 内に収めるため高さを抑える（比率は 4:3 のまま cover でクロップ） */
              className="max-h-[34svh] lg:max-h-none lg:h-[min(80vh,40rem)]"
            />
            <p className="type-caption px-gutter py-2 text-ink-muted lg:py-3 lg:pl-6">
              2026年8月、近所の河川敷にて
            </p>
          </div>

          <div className="lg:order-1 lg:col-span-5">
            <div className="px-gutter pb-10 pt-4 lg:py-16">
              <p className="type-overline-en hero-rise text-ink-muted">
                Uni &amp; Maki — A Dog Journal
              </p>
              <h1
                className="type-display hero-rise mt-4 text-ink-strong"
                style={{ animationDelay: "40ms" }}
              >
                うにと、まきと、暮らす。
              </h1>
              <p
                className="type-lead hero-rise mt-4 max-w-[34ch] text-ink lg:mt-5"
                style={{ animationDelay: "80ms" }}
              >
                {uni.breed}の{uni.name}と、{maki.breed}の{maki.name}。2匹とのふつうの毎日、飼い主目線の本音レビュー、そしてこれから犬を迎える人のための準備ガイド。
              </p>

              <div
                className="hero-rise mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8"
                style={{ animationDelay: "120ms" }}
              >
                <ButtonLink href="/blog" size="lg" className="w-full sm:w-auto">
                  最新の記事を読む
                </ButtonLink>
                <ButtonLink
                  href="/blog/category/welcome"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  はじめて犬を迎える方へ
                </ButtonLink>
              </div>

              <div
                className="hero-rise mt-6 flex flex-wrap items-center gap-1"
                style={{ animationDelay: "160ms" }}
              >
                <span className="type-caption text-ink-muted">毎日の写真は</span>
                <SocialIconLinks />
                <span className="type-caption text-ink-muted">で</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. うにとまき — 名前と顔と性格を10秒で覚えてもらう */}
      <section className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="type-overline-en text-ink-muted">Our Dogs</p>
            <h2 className="type-h2 mt-2 text-ink-strong">うにと、まき</h2>
          </div>
          <Link
            href="/dogs"
            className="group inline-flex items-center gap-2 type-nav text-ink-muted transition-colors hover:text-ink"
          >
            2匹のことをもっと
            <ArrowRightIcon className="size-4 transition-transform duration-[var(--dur-base)] motion-safe:group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-block grid gap-10 md:grid-cols-2">
          {dogs.map((dog) => (
            <article key={dog.slug}>
              <Photo
                src={dog.photo ?? null}
                alt={dog.photoAlt ?? `${dog.name}のポートレート`}
                ratio="4/5"
                plan={`撮影予定：${dog.name}の正面ポートレート（自然光・目線あり）`}
                sizes="(min-width: 48rem) 50vw, 100vw"
              />
              <div className="mt-5 flex items-baseline gap-3">
                <h3 className="type-h2 text-ink-strong">{dog.name}</h3>
                <span className="type-overline-en text-ink-muted">{dog.slug}</span>
              </div>

              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                <dt className="type-caption text-ink-muted">犬種</dt>
                <dd className="type-body-sm text-ink">{dog.breed}</dd>
                <dt className="type-caption text-ink-muted">年齢</dt>
                <dd className="type-body-sm text-ink">
                  {getAgeLabel(dog.birthday)}（{dog.sex}）
                </dd>
                <dt className="type-caption text-ink-muted">好きなもの</dt>
                <dd className="type-body-sm text-ink">{dog.likes.join("、")}</dd>
              </dl>

              <p className="mt-4 text-ink">{dog.catchphrase}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {dog.traits.map((trait) => (
                  <li key={trait}>
                    <span className="inline-flex h-6 items-center rounded-[var(--radius-full)] border border-line px-2.5 text-xs text-ink-muted">
                      {trait}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 3. 新着の記事 — 更新されているメディアであることの証明と回遊 */}
      {featured ? (
        <section className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="type-overline-en text-ink-muted">Journal</p>
              <h2 className="type-h2 mt-2 text-ink-strong">新着の記事</h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 type-nav text-ink-muted transition-colors hover:text-ink"
            >
              すべての記事
              <ArrowRightIcon className="size-4 transition-transform duration-[var(--dur-base)] motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-block">
            <ArticleCard post={featured} variant="featured" />
          </div>

          {recent.length > 0 ? (
            <>
              {/* モバイルは高さを節約するため compact に切り替える */}
              <div className="mt-10 flex flex-col gap-6 sm:hidden">
                {recent.map((post) => (
                  <ArticleCard key={post.slug} post={post} variant="compact" />
                ))}
              </div>
              <div className="mt-12 hidden gap-x-6 gap-y-12 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                {recent.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : null}
        </section>
      ) : null}

      {/* 4. あなたに合わせて読む — 2層のターゲットを明示的に分岐させる唯一の場所 */}
      <section className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
        <h2 className="type-h2 text-ink-strong">あなたに合わせて読む</h2>

        <div className="mt-block grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-[var(--radius-md)] border border-line border-t-[3px] border-t-accent bg-card p-6 md:p-8">
            <p className="type-overline text-ink-muted">もう犬と暮らしている方へ</p>
            <h3 className="type-h3 mt-2 text-ink-strong">毎日を、少し楽にする記事</h3>
            <ul className="mt-5 flex flex-1 flex-col gap-3">
              {carePosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-ink underline decoration-line underline-offset-[0.18em] transition-colors hover:decoration-ink"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/blog/category/care" variant="secondary" className="mt-6 self-start">
              飼い方の記事を見る
            </ButtonLink>
          </div>

          <div className="flex flex-col rounded-[var(--radius-md)] border border-line border-t-[3px] border-t-secondary bg-card p-6 md:p-8">
            <p className="type-overline text-ink-muted">これから犬を迎えたい方へ</p>
            <h3 className="type-h3 mt-2 text-ink-strong">迎える前に、知っておきたかったこと</h3>
            <ul className="mt-5 flex flex-1 flex-col gap-3">
              {welcomePosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-ink underline decoration-line underline-offset-[0.18em] transition-colors hover:decoration-ink"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/blog/category/welcome"
              variant="secondary"
              className="mt-6 self-start"
            >
              準備ガイドを読む
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 5. 2匹が実際に使っているもの — 収益の中核。「売る」ではなく「勧める」 */}
      <section className="border-y border-line bg-well">
        <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="type-overline-en text-ink-muted">Goods</p>
              <h2 className="type-h2 mt-2 text-ink-strong">2匹が実際に使っているもの</h2>
              <p className="mt-3 max-w-[46ch] text-ink-muted">
                試して、続いているものだけ。合わなかったものも正直に書きます。
              </p>
            </div>
            <Link
              href="/goods"
              className="group inline-flex items-center gap-2 type-nav text-ink-muted transition-colors hover:text-ink"
            >
              グッズ一覧へ
              <ArrowRightIcon className="size-4 transition-transform duration-[var(--dur-base)] motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>

          <AdDisclosureLine className="mt-5" />

          {/* モバイルは横スクロール、次のカードが少し見える */}
          <ul className="-mx-gutter mt-block flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
            {lpGoods.map((item) => (
              <li
                key={item.slug}
                className="w-[78vw] max-w-80 shrink-0 snap-start sm:w-auto sm:max-w-none"
              >
                <GoodsCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. 毎日の2匹は、SNSで — 集客の中核 */}
      <section id="follow" className="mx-auto max-w-[var(--container-content)] px-gutter py-section scroll-mt-20">
        <p className="type-overline-en text-ink-muted">Follow</p>
        <h2 className="type-h2 mt-2 text-ink-strong">毎日の2匹は、SNSで</h2>
        <p className="mt-3 max-w-[52ch] text-ink-muted">
          サイトはじっくり書く場所。今日のうにとまきは、こちらに。
        </p>

        <SocialTiles className="mt-block" />
      </section>

      {/* 7. 運営者と、このサイトの約束 — 信頼の担保 */}
      <section className="mx-auto max-w-[var(--container-content)] px-gutter pb-section">
        <div className="grid gap-10 rounded-[var(--radius-md)] border border-line bg-card p-6 md:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="type-overline-en text-ink-muted">About</p>
            <h2 className="type-h3 mt-2 text-ink-strong">運営しているのは</h2>
            <p className="mt-4 text-ink">
              {uni.name}と{maki.name}と暮らしている飼い主です。専門家ではありません。
              ここに書いているのは、うちで実際に試して、うまくいったこと・うまくいかなかったことの記録です。
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["多頭飼い", "保護犬", "ブリーダー"].map((tag) => (
                <li key={tag}>
                  <TagChip tag={tag} />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h3 className="type-h3 text-ink-strong">このサイトの約束</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {[
                "紹介するのは、実際に使っているものだけ。",
                "PR・広告は、必ず記事の冒頭に明記する。",
                "健康と医療の判断は獣医師へ。ここに書くのは、一飼い主の体験。",
              ].map((promise, index) => (
                <li key={promise} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-accent-soft type-caption font-bold text-on-accent-soft"
                  >
                    {index + 1}
                  </span>
                  <span className="text-ink">{promise}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="secondary">
                運営方針・免責を読む
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                お問い合わせ
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  alternates: { canonical: "/" },
  description: siteConfig.description,
};
