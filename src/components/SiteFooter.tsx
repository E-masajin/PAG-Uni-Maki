import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { categories, categorySlugs, getPostsByCategory } from "@/lib/posts";
import { SocialIconLinks } from "@/components/SocialTiles";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteFooter() {
  const year = new Date().getFullYear();
  // B層（これから迎える人）向けの記事を footer からも拾えるようにする
  const welcomePosts = getPostsByCategory("welcome").slice(0, 4);

  return (
    <footer className="mt-section-lg border-t border-line bg-well">
      <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-serif text-xl font-semibold text-ink-strong">{siteConfig.name}</p>
            <p className="mt-3 type-body-sm text-ink-muted">
              2匹の愛犬との毎日と、これから犬を迎える人のための記録。
            </p>
            <SocialIconLinks className="-ml-3 mt-3" />
          </div>

          <nav aria-label="カテゴリ">
            <p className="type-overline-en text-ink-muted">Read</p>
            <ul className="mt-4 flex flex-col gap-3">
              {categorySlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/blog/category/${slug}`}
                    className="type-body-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {categories[slug].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="type-body-sm text-ink-muted transition-colors hover:text-ink">
                  すべての記事
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="はじめての方へ">
            <p className="type-overline-en text-ink-muted">For Beginners</p>
            <ul className="mt-4 flex flex-col gap-3">
              {welcomePosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="type-body-sm text-ink-muted transition-colors hover:text-ink clamp-2"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="サイト情報">
            <p className="type-overline-en text-ink-muted">About</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/dogs" className="type-body-sm text-ink-muted transition-colors hover:text-ink">
                  うに＆まきのプロフィール
                </Link>
              </li>
              <li>
                <Link href="/about" className="type-body-sm text-ink-muted transition-colors hover:text-ink">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/contact" className="type-body-sm text-ink-muted transition-colors hover:text-ink">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="type-body-sm text-ink-muted transition-colors hover:text-ink">
                  プライバシーポリシー・免責事項
                </Link>
              </li>
              <li>
                <Link href="/feed.xml" className="type-body-sm text-ink-muted transition-colors hover:text-ink">
                  RSS
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="type-caption max-w-[52ch] text-ink-muted">
            <p>© {year} {siteConfig.name}</p>
            <p className="mt-2">
              当サイトは、Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。楽天アフィリエイトほか、各社のアフィリエイトプログラムにも参加しています。
            </p>
            <p className="mt-2">
              健康・医療に関する内容は一飼い主の体験であり、診断・治療の助言ではありません。判断はかかりつけの獣医師にご相談ください。
            </p>
          </div>
          <ThemeToggle className="-mr-3 shrink-0 self-start lg:self-end" />
        </div>
      </div>
    </footer>
  );
}
