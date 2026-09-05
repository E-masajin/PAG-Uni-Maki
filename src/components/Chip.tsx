import Link from "next/link";
import { categories, type CategorySlug } from "@/lib/categories";

type ChipSize = "sm" | "md";

const chipSize: Record<ChipSize, string> = {
  sm: "h-6 px-2.5 text-xs",
  md: "h-8 px-3.5 text-[0.8125rem]",
};

/**
 * カテゴリチップ。
 * B層向けの「これから迎える人へ」だけ secondary 色にして目印にする。
 * 文字ラベルがあるので、色だけの区別にはならない。
 */
export function CategoryChip({
  category,
  size = "sm",
  asLink = true,
  className = "",
}: {
  category: CategorySlug;
  size?: ChipSize;
  asLink?: boolean;
  className?: string;
}) {
  const meta = categories[category];
  const isWelcome = category === "welcome";
  const tone = isWelcome
    ? "bg-secondary-soft text-on-secondary-soft"
    : "bg-accent-soft text-on-accent-soft";

  const classes = `inline-flex items-center rounded-[var(--radius-full)] font-semibold tracking-[0.02em] ${tone} ${chipSize[size]} ${className}`;

  if (!asLink) {
    return <span className={classes}>{meta.name}</span>;
  }

  return (
    <Link
      href={`/blog/category/${category}`}
      className={`${classes} relative z-1 transition-colors duration-[var(--dur-fast)] hover:brightness-[0.97]`}
    >
      {meta.name}
    </Link>
  );
}

/** タグ。自由入力なので枠線のみの静かな見た目にする。# は付けない */
export function TagChip({
  tag,
  size = "sm",
  selected = false,
  className = "",
}: {
  tag: string;
  size?: ChipSize;
  selected?: boolean;
  className?: string;
}) {
  const tone = selected
    ? "bg-ink-strong text-paper border-ink-strong"
    : "border-line text-ink-muted hover:border-line-strong hover:text-ink";

  return (
    <Link
      href={`/blog/tag/${encodeURIComponent(tag)}`}
      aria-pressed={selected}
      className={`relative z-1 inline-flex items-center rounded-[var(--radius-full)] border transition-colors duration-[var(--dur-fast)] ${tone} ${chipSize[size]} ${className}`}
    >
      {tag}
    </Link>
  );
}
