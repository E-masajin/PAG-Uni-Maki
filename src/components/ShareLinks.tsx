import { buildShareUrl, shareTargets } from "@/lib/share";
import { XIcon } from "@/components/icons";
import type { SVGProps } from "react";

function LineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 10.3C24 4.96 18.62.61 12 .61S0 4.96 0 10.3c0 4.78 4.26 8.79 10.02 9.55.39.08.92.26 1.06.59.12.3.08.77.04 1.08l-.17 1.03c-.05.3-.24 1.19 1.05.65s6.94-4.09 9.47-7h-.01c1.74-1.91 2.58-3.85 2.58-6zM7.77 13.46H5.38a.63.63 0 0 1-.63-.63V8.05a.63.63 0 0 1 1.26 0v4.15h1.76a.63.63 0 0 1 0 1.26zm2.47-.63a.63.63 0 0 1-1.26 0V8.05a.63.63 0 0 1 1.26 0v4.78zm5.76 0a.63.63 0 0 1-1.14.38l-2.45-3.34v2.96a.63.63 0 1 1-1.26 0V8.05a.63.63 0 0 1 1.13-.38l2.46 3.34V8.05a.63.63 0 0 1 1.26 0v4.78zm3.87-3.02a.63.63 0 0 1 0 1.26h-1.76v1.13h1.76a.63.63 0 0 1 0 1.26h-2.39a.63.63 0 0 1-.63-.63V8.05a.63.63 0 0 1 .63-.63h2.39a.63.63 0 0 1 0 1.26h-1.76v1.13h1.76z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

function HatenaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.3 12.4c-.5-.6-1.3-.9-2.2-1 .9-.2 1.5-.5 1.9-1 .4-.5.6-1.1.6-1.9 0-.6-.1-1.2-.4-1.7a2.7 2.7 0 0 0-1.2-1.1c-.4-.2-1-.4-1.6-.5-.6-.1-1.7-.1-3.2-.1H2.6v13.8h3.7c1.5 0 2.6 0 3.3-.1.7-.1 1.2-.3 1.6-.5.5-.3.9-.7 1.2-1.2.3-.5.4-1.1.4-1.8 0-.9-.2-1.6-.5-2.1zM6.3 8.1h.8c.9 0 1.5.1 1.8.3.3.2.5.6.5 1.1s-.2.8-.5 1c-.3.2-.9.3-1.9.3h-.7V8.1zm3 8c-.3.2-1 .3-1.9.3h-1v-2.9h1.1c1 0 1.6.1 1.9.4.3.2.5.6.5 1.1s-.2.9-.6 1.1zM17.7 15h2.7V5.1h-2.7V15zM19 16.5c-.9 0-1.7.7-1.7 1.7 0 .9.7 1.7 1.7 1.7.9 0 1.7-.7 1.7-1.7 0-.9-.8-1.7-1.7-1.7z" />
    </svg>
  );
}

const icons = {
  x: XIcon,
  line: LineIcon,
  facebook: FacebookIcon,
  hatena: HatenaIcon,
} as const;

/** 記事のシェア導線。SNS 集客の入口として記事の末尾に置く */
export function ShareLinks({ path, title }: { path: string; title: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="type-body-sm text-ink-muted">この記事をシェア</p>
      <ul className="flex flex-wrap items-center gap-1">
        {shareTargets.map((target) => {
          const Icon = icons[target.key];
          return (
            <li key={target.key}>
              <a
                href={buildShareUrl(target.key, path, title)}
                target="_blank"
                rel="noopener"
                aria-label={`${target.label}（新しいタブで開きます）`}
                className="inline-flex size-11 items-center justify-center rounded-[var(--radius-full)] text-ink-muted transition-colors duration-[var(--dur-fast)] hover:bg-hover hover:text-ink"
              >
                <Icon className="size-[1.125rem]" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
