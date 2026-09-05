/**
 * サイト全体の設定。
 * SNS の URL やサイト名など、あとから差し替える可能性が高い値はすべてここに集約する。
 * 本番の値は .env.local で上書きできる。
 */

export type SocialKey = "instagram" | "x" | "tiktok";

export type SocialLink = {
  key: SocialKey;
  /** 表示名 */
  label: string;
  /** @ を含まないユーザー名 */
  handle: string;
  url: string;
  /** SNS ごとの訴求文。どの媒体で何が見られるかを書き分ける */
  pitch: string;
};

const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "uni_maki";
const xHandle = process.env.NEXT_PUBLIC_X_HANDLE ?? "uni_maki";
const tiktokHandle = process.env.NEXT_PUBLIC_TIKTOK_HANDLE ?? "uni_maki";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uni-maki.example.com";
/** 末尾スラッシュを落として正規化する（URL 結合時の二重スラッシュ防止） */
export const siteUrl = rawSiteUrl.replace(/\/+$/, "");

export const socialLinks: SocialLink[] = [
  {
    key: "instagram",
    label: "Instagram",
    handle: instagramHandle,
    url: `https://www.instagram.com/${instagramHandle}/`,
    pitch: "毎日の写真と、ちょっとした表情の変化を一番よく載せています。",
  },
  {
    key: "x",
    label: "X",
    handle: xHandle,
    url: `https://x.com/${xHandle}`,
    pitch: "更新のお知らせと、飼い主目線のひとりごと。質問もここが一番届きます。",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: tiktokHandle,
    url: `https://www.tiktok.com/@${tiktokHandle}`,
    pitch: "散歩やおもちゃで遊ぶ動きは、やっぱり動画のほうが伝わります。",
  },
];

export const siteConfig = {
  name: "うに＆まき",
  /** <title> のテンプレートに使う正式名称 */
  title: "うに＆まき｜2匹の愛犬と暮らす毎日",
  description:
    "2匹の愛犬「うに」と「まき」との暮らしの記録と、これから犬を迎える人・すでに一緒に暮らしている人に向けた飼い方の情報をお届けします。",
  locale: "ja_JP",
  lang: "ja",
  author: "うに＆まき",
  url: siteUrl,
  /** お問い合わせ先。PR・お仕事の依頼導線として使う */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  socialLinks,
} as const;

export type SiteConfig = typeof siteConfig;

/** サイト内パスから絶対 URL を作る。OGP や sitemap で使用 */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
