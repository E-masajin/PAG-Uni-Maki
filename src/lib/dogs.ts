/**
 * 主役の2匹のプロフィール。
 *
 * TODO(オーナー): 犬種・誕生日・性格・お迎えの経緯を実際の内容に差し替えてください。
 * ここを直せばトップページ・プロフィールページ・構造化データすべてに反映されます。
 */

export type Dog = {
  slug: string;
  name: string;
  /** ふりがな。ルビと読み上げの補助に使う */
  reading: string;
  breed: string;
  /** YYYY-MM-DD。誕生日から年齢を計算する */
  birthday: string;
  sex: "男の子" | "女の子";
  /** 性格を短い語で。チップとして並べる */
  traits: string[];
  /** 一言キャッチ。写真に重ねる短文 */
  catchphrase: string;
  /** プロフィール本文。2〜3文 */
  introduction: string;
  /** 好きなもの・苦手なもの */
  likes: string[];
  dislikes: string[];
  /** 写真。未用意の間は undefined のままでよい（プレースホルダーが出る） */
  photo?: string;
  photoAlt?: string;
  /** テーマカラー。2匹を色で見分けられるようにする */
  accent: "uni" | "maki";
};

export const dogs: Dog[] = [
  {
    slug: "uni",
    name: "うに",
    reading: "うに",
    breed: "ミックス",
    birthday: "2021-06-10",
    sex: "男の子",
    traits: ["甘えん坊", "food-motivated", "びびり"],
    catchphrase: "呼べば来る。おやつがあれば、もっと来る。",
    introduction:
      "うちに来た日から、ずっと人のそばにいたがる甘えん坊。知らない音にはめっぽう弱いけれど、ごはんの袋の音だけは家じゅうどこにいても聞き分けます。",
    likes: ["ちゅーる", "ひなたぼっこ", "洗いたてのタオル"],
    dislikes: ["掃除機", "雨の日の散歩", "爪切り"],
    accent: "uni",
  },
  {
    slug: "maki",
    name: "まき",
    reading: "まき",
    breed: "ミックス",
    birthday: "2022-11-03",
    sex: "女の子",
    traits: ["マイペース", "よく走る", "気配りじょうず"],
    catchphrase: "遊ぶときは全力、寝るときは全力で寝る。",
    introduction:
      "うにより後から家族になった妹分。走り出すと止まらないタイプですが、うにが落ち込んでいるとそっと隣に座るような、よく気のつく子です。",
    likes: ["ボール遊び", "草のにおい", "うにのベッド"],
    dislikes: ["留守番", "知らない犬の吠え声"],
    accent: "maki",
  },
];

export function getDog(slug: string): Dog | undefined {
  return dogs.find((dog) => dog.slug === slug);
}

/** 誕生日から満年齢を求める。「◯歳◯か月」まで出す */
export function getAgeLabel(birthday: string, now = new Date()): string {
  const born = new Date(birthday);
  if (Number.isNaN(born.getTime())) return "";

  let months = (now.getFullYear() - born.getFullYear()) * 12 + (now.getMonth() - born.getMonth());
  if (now.getDate() < born.getDate()) months -= 1;
  if (months < 0) return "";

  const years = Math.floor(months / 12);
  const restMonths = months % 12;
  if (years === 0) return `${restMonths}か月`;
  if (restMonths === 0) return `${years}歳`;
  return `${years}歳${restMonths}か月`;
}
