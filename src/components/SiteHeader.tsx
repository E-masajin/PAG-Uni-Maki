"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { headerNav, navItems } from "@/lib/navigation";
import { categories, categorySlugs } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import { SocialIconLinks } from "@/components/SocialTiles";
import { ThemeToggle } from "@/components/ThemeToggle";

/** 2本線のハンバーガー。開くと X に変形する */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line
        x1="4"
        y1="9"
        x2="20"
        y2="9"
        className="origin-center transition-transform duration-[var(--dur-base)] ease-[var(--ease-in-out)]"
        style={open ? { transform: "translateY(3px) rotate(45deg)" } : undefined}
      />
      <line
        x1="4"
        y1="15"
        x2="20"
        y2="15"
        className="origin-center transition-transform duration-[var(--dur-base)] ease-[var(--ease-in-out)]"
        style={open ? { transform: "translateY(-3px) rotate(-45deg)" } : undefined}
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ページ遷移でドロワーを閉じる
  useEffect(() => setMenuOpen(false), [pathname]);

  // 開いている間は背後をスクロールさせない。Esc で閉じる
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    // 閉じたあとはハンバーガーにフォーカスを戻す
    triggerRef.current?.focus();
  };

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-[color-mix(in_oklch,var(--paper)_88%,transparent)] backdrop-blur-[12px] transition-colors duration-[var(--dur-base)] ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[var(--container-content)] items-center gap-3 px-gutter lg:h-16">
        <Link href="/" className="flex items-baseline gap-2.5 whitespace-nowrap">
          <span className="font-serif text-xl font-semibold text-ink-strong">{siteConfig.name}</span>
          <span className="type-overline-en hidden text-ink-muted xl:inline">Uni &amp; Maki</span>
        </Link>

        <nav aria-label="メインナビゲーション" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {headerNav.map((item) => {
              const current = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex h-11 items-center rounded-[var(--radius-sm)] px-3 type-nav transition-colors duration-[var(--dur-fast)] ${
                      current
                        ? "text-ink underline decoration-accent decoration-2 underline-offset-[0.6rem]"
                        : "text-ink-muted hover:bg-hover hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <SocialIconLinks className="hidden xl:flex" />
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-full)] text-ink transition-colors duration-[var(--dur-fast)] hover:bg-hover lg:hidden"
          >
            <MenuIcon open={menuOpen} />
            <span className="sr-only">{menuOpen ? "メニューを閉じる" : "メニューを開く"}</span>
          </button>
        </div>
      </div>

      {/* モバイルドロワー */}
      <div
        id="site-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-50 lg:hidden"
        data-state={menuOpen ? "open" : "closed"}
      >
        <button
          type="button"
          onClick={closeMenu}
          aria-label="メニューを閉じる"
          className="absolute inset-0 bg-scrim"
        />
        <div className="absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-paper">
          <div className="flex h-14 items-center justify-end px-gutter">
            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-full)] text-ink hover:bg-hover"
            >
              <X className="size-5" strokeWidth={1.5} />
              <span className="sr-only">メニューを閉じる</span>
            </button>
          </div>

          <nav aria-label="モバイルナビゲーション" className="flex flex-col gap-8 px-gutter pb-12 pt-2">
            <ul className="flex flex-col gap-5">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="font-serif text-[1.75rem] font-semibold text-ink-strong"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <p className="type-overline-en mb-3 text-ink-muted">Categories</p>
              <ul className="flex flex-col gap-3">
                {categorySlugs.map((slug) => (
                  <li key={slug}>
                    <Link href={`/blog/category/${slug}`} className="text-ink-muted">
                      {categories[slug].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="type-overline-en mb-3 text-ink-muted">Follow</p>
              <SocialIconLinks />
            </div>

            <ul className="flex flex-col gap-3 border-t border-line pt-6">
              {navItems
                .filter((item) => !item.primary)
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="type-body-sm text-ink-muted">
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
