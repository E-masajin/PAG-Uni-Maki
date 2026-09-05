/**
 * サイト内のナビゲーション定義。
 * ヘッダー・フッター・モバイルメニューで同じ定義を使い、リンク切れを防ぐ。
 */

export type NavItem = {
  href: string;
  label: string;
  /** ヘッダーに表示するか。フッターのみのページは false */
  primary: boolean;
  description?: string;
};

export const navItems: NavItem[] = [
  { href: "/dogs", label: "うに＆まき", primary: true, description: "2匹のプロフィール" },
  { href: "/blog/category/welcome", label: "これから迎える人へ", primary: true, description: "費用・準備・迎え方" },
  { href: "/blog/category/care", label: "飼い方・お世話", primary: true, description: "しつけ・健康・ごはん" },
  { href: "/goods", label: "おすすめグッズ", primary: true, description: "実際に使ってよかったもの" },
  { href: "/blog", label: "記事一覧", primary: true, description: "すべての記事" },
  { href: "/about", label: "このサイトについて", primary: false },
  { href: "/contact", label: "お問い合わせ", primary: false },
  { href: "/privacy", label: "プライバシーポリシー", primary: false },
];

export const headerNav = navItems.filter((item) => item.primary);
export const footerNav = navItems;
