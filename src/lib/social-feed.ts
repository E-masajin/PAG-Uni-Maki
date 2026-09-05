/**
 * トップページに埋め込む SNS 投稿の設定。
 *
 * TODO(オーナー): 各 SNS で「埋め込みコード」または投稿の URL をコピーして、
 * 下の配列に足してください。空のままなら埋め込み枠は表示されず、
 * 代わりにフォローを促すカードだけが出ます（読み込み速度を落とさないための設計）。
 *
 * 埋め込みは各 SNS の外部スクリプトを読み込みます。表示させたくない場合は
 * 配列を空にしておけば、外部スクリプトは一切読み込まれません。
 */

import type { SocialKey } from "@/lib/site";

export type SocialEmbedItem = {
  platform: SocialKey;
  /** 投稿の URL（例: https://www.instagram.com/p/XXXXXXXXXXX/） */
  url: string;
  /** 一覧に並べたときの説明。読み込み前のプレースホルダーにも使う */
  caption: string;
};

export const socialEmbeds: SocialEmbedItem[] = [
  // 例:
  // { platform: "instagram", url: "https://www.instagram.com/p/XXXXXXXXXXX/", caption: "初めての海。5秒で戻ってきた" },
  // { platform: "tiktok", url: "https://www.tiktok.com/@uni_maki/video/0000000000000000000", caption: "おやつを待つ2匹" },
  // { platform: "x", url: "https://x.com/uni_maki/status/0000000000000000000", caption: "今朝の散歩" },
];

export function getEmbedsByPlatform(platform: SocialKey): SocialEmbedItem[] {
  return socialEmbeds.filter((embed) => embed.platform === platform);
}

export const hasEmbeds = socialEmbeds.length > 0;

/** TikTok の埋め込みには動画 ID が必要なので URL から取り出す */
export function extractTikTokVideoId(url: string): string | null {
  const match = /\/video\/(\d+)/.exec(url);
  return match ? match[1] : null;
}
