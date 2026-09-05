"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * テーマ切替。
 * マウント前は解決済みのテーマが分からないため、
 * レイアウトシフトを避けて同寸のプレースホルダーを出す。
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const base = `inline-flex size-11 items-center justify-center rounded-[var(--radius-full)] text-ink-muted transition-colors duration-[var(--dur-fast)] hover:bg-hover hover:text-ink ${className}`;

  if (!mounted) {
    return <span className={base} aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      aria-pressed={isDark}
      className={base}
    >
      {isDark ? <Moon className="size-[1.125rem]" strokeWidth={1.5} /> : <Sun className="size-[1.125rem]" strokeWidth={1.5} />}
    </button>
  );
}
