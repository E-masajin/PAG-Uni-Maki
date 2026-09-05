import { siteConfig } from "@/lib/site";
import { ExternalIcon, socialIcons } from "@/components/icons";

/**
 * SNS リンクブロック（§5.4）。
 * 公式の埋め込みウィジェットは LP に置かない（CLS・速度・トラッキングの問題）。
 */

/** タイル型。LP の Follow セクション、記事末尾 */
export function SocialTiles({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-3 ${className}`}>
      {siteConfig.socialLinks.map((link) => {
        const Icon = socialIcons[link.key];
        return (
          <li key={link.key}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener"
              className="group relative flex h-full flex-col gap-3 rounded-[var(--radius-md)] border border-line bg-paper p-5 transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] hover:border-accent"
            >
              <ExternalIcon className="absolute right-4 top-4 size-4 text-ink-subtle" />
              <Icon className="size-7 text-ink transition-colors duration-[var(--dur-base)] group-hover:text-accent" />
              <span className="type-overline-en text-ink-muted">{link.label}</span>
              <span className="font-semibold text-ink-strong">@{link.handle}</span>
              <span className="type-body-sm text-ink-muted">{link.pitch}</span>
              <span className="sr-only">（新しいタブで開きます）</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** コンパクト型。ヘッダー・フッター・ドロワー */
export function SocialIconLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {siteConfig.socialLinks.map((link) => {
        const Icon = socialIcons[link.key];
        return (
          <li key={link.key}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener"
              aria-label={`${link.label}（新しいタブで開きます）`}
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-full)] text-ink-muted transition-colors duration-[var(--dur-fast)] hover:bg-hover hover:text-ink"
            >
              <Icon className="size-[1.125rem]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
