import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-semibold tracking-[0.02em] " +
  "transition-[background-color,border-color,color] duration-[var(--dur-base)] ease-[var(--ease-out)] " +
  "disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  // ダークモードでは on-accent が自動で墨色になる。text-white は直書きしない
  primary: "bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-hover active:bg-line",
  ghost: "bg-transparent text-ink-muted hover:bg-hover hover:text-ink active:bg-line",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function buttonClass({ variant = "primary", size = "md", className = "" }: Omit<CommonProps, "children">) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

/** サイト内リンク用 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      data-variant={variant}
      data-size={size}
      className={buttonClass({ variant, size, className })}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** フォーム送信など */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      className={buttonClass({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}
