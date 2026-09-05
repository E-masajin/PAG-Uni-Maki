/**
 * 記事を SNS でシェアするためのリンク生成。
 * 集客導線として、記事の上下に置くシェアボタンから使う。
 */

import { absoluteUrl, siteConfig } from "@/lib/site";

export type ShareTarget = "x" | "line" | "facebook" | "hatena";

export const shareTargets: { key: ShareTarget; label: string }[] = [
  { key: "x", label: "X でシェア" },
  { key: "line", label: "LINE で送る" },
  { key: "facebook", label: "Facebook でシェア" },
  { key: "hatena", label: "はてなブックマーク" },
];

export function buildShareUrl(target: ShareTarget, path: string, title: string): string {
  const url = absoluteUrl(path);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  switch (target) {
    case "x": {
      const via = siteConfig.socialLinks.find((link) => link.key === "x")?.handle;
      return `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}${via ? `&via=${via}` : ""}`;
    }
    case "line":
      return `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "hatena":
      return `https://b.hatena.ne.jp/entry/panel/?url=${encodedUrl}&title=${encodedTitle}`;
  }
}
