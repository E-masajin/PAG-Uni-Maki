/**
 * 広告表記（景品表示法の指定告示・2023-10-01 施行への対応）。
 *
 * 「目立ちすぎず、見落とされない」を、アクセント色ではなく
 * コントラスト（墨×紙）と位置（最初の視線導線上）で達成する。
 * アクセント色で塗ると「おすすめマーク」に誤読されるため使わない。
 */

/** 形式1: 記事冒頭バー。スクロールなしで見える位置に置く */
export function PrNotice({ className = "" }: { className?: string }) {
  return (
    <aside
      role="note"
      aria-label="広告表記"
      className={`border-l-[3px] border-accent bg-well px-4 py-3 type-body-sm text-ink ${className}`}
    >
      本記事にはアフィリエイト広告（Amazonアソシエイト・楽天アフィリエイト等）が含まれます。紹介するものは、実際に使って続いているものだけを選んでいます。
    </aside>
  );
}

/** 形式2: カードバッジ。記事カード・グッズカードの図版左上 */
export function PrBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-xs)] bg-ink-strong px-1.5 py-0.5 text-[0.6875rem] font-bold tracking-[0.08em] text-paper ${className}`}
    >
      PR<span className="sr-only">（広告を含む記事）</span>
    </span>
  );
}

/** 形式3: インラインラベル。CTA と同じ行に置く */
export function AdLabel({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-xs)] border border-ink px-[5px] py-px text-[0.6875rem] font-semibold text-ink ${className}`}
    >
      広告
    </span>
  );
}

/** グッズ一覧・LP のグッズセクション見出し直下に置く開示行 */
export function AdDisclosureLine({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-center gap-2 type-body-sm text-ink ${className}`}>
      <AdLabel />
      このセクションにはアフィリエイト広告を含みます。
    </p>
  );
}
