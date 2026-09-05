/**
 * 記事カテゴリの定義。
 *
 * fs に依存しないよう posts.ts から切り出している。
 * クライアントコンポーネント（ヘッダー・ドロワー）からも読むため、
 * ここに Node の API を持ち込まないこと。
 *
 * ターゲットの2層（これから迎える人／すでに一緒に暮らしている人）を
 * カテゴリの段階で分けておくと、導線もサイトマップも設計しやすい。
 */

export const categories = {
  welcome: {
    slug: "welcome",
    name: "これから迎える人へ",
    tagline: "費用・準備・迎え方",
    description:
      "犬を迎える前に知っておきたいお金のこと、住まいの準備、迎え方の選択肢をまとめています。",
  },
  care: {
    slug: "care",
    name: "飼い方・お世話",
    tagline: "しつけ・健康・ごはん",
    description:
      "毎日のお世話で迷いやすいポイントを、うに・まきとの実際の暮らしをもとに整理しています。",
  },
  goods: {
    slug: "goods",
    name: "グッズレビュー",
    tagline: "実際に使ってどうだったか",
    description:
      "うに・まきが実際に使ったグッズの、良かった点と合わなかった点を正直に書いています。",
  },
  diary: {
    slug: "diary",
    name: "うに＆まき日記",
    tagline: "2匹の毎日",
    description: "散歩、おでかけ、失敗談。2匹との暮らしのなんでもない記録です。",
  },
} as const;

export type CategorySlug = keyof typeof categories;
export const categorySlugs = Object.keys(categories) as CategorySlug[];

export function isCategorySlug(value: string): value is CategorySlug {
  return Object.hasOwn(categories, value);
}
