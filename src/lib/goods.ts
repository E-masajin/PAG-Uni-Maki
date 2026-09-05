/**
 * おすすめグッズ（収益化導線）のデータ。
 *
 * TODO(オーナー): affiliateUrl に各 ASP（Amazon アソシエイト・楽天・A8 など）で
 * 発行したリンクを貼ってください。空のあいだは「準備中」として表示され、
 * リンクは出力されません。
 *
 * リンクは必ず rel="sponsored nofollow noopener" 付きで出力すること（GoodsCard 側で対応）。
 * また、アフィリエイトを含むページには PR 表記を必ず出す（景品表示法の運用基準）。
 */

export type GoodsCategory = "welcome" | "everyday" | "outdoor" | "care";

export const goodsCategories: Record<GoodsCategory, { name: string; description: string }> = {
  welcome: {
    name: "お迎え前にそろえるもの",
    description: "初日から必要になる最低限。ここが揃っていれば、あとは暮らしながら足せます。",
  },
  everyday: {
    name: "毎日つかうもの",
    description: "ごはん・水まわり・寝床など、消耗と買い替えが前提のもの。",
  },
  outdoor: {
    name: "散歩とおでかけ",
    description: "うに・まきと外に出るときに、実際に持ち歩いているもの。",
  },
  care: {
    name: "お手入れと健康",
    description: "ケアの道具は、犬が嫌がらないかどうかで続けやすさが変わります。",
  },
};

export type Goods = {
  slug: string;
  name: string;
  category: GoodsCategory;
  /** 一行の要約。カードの見出し下に出る */
  summary: string;
  /** なぜおすすめなのか。実体験ベースで書く */
  reason: string;
  /** 正直に書く「ここは注意」。信頼性はここで決まる */
  caveat?: string;
  /** 表示用の価格帯。実売価格は変動するのでレンジで書く */
  priceRange: string;
  /** ASP で発行したアフィリエイトリンク。未設定なら準備中として表示 */
  affiliateUrl?: string;
  /** ショップ名（Amazon / 楽天市場 など） */
  shopLabel?: string;
  image?: string;
  imageAlt?: string;
  /** 関連する記事の slug。詳しいレビューへ送客する */
  relatedPostSlug?: string;
};

export const goods: Goods[] = [
  {
    slug: "crate",
    name: "折りたたみクレート",
    category: "welcome",
    summary: "お迎え初日から必要になる、犬にとっての「自分の部屋」。",
    reason:
      "うにを迎えた初日、家じゅうを歩き回って落ち着けなかったのが、クレートを置いた翌日から自分で入って寝るようになりました。移動や災害時にもそのまま使えます。",
    caveat: "体高より少し高い程度のサイズが目安。大きすぎると中で排泄してしまうことがあります。",
    priceRange: "5,000〜12,000円",
    shopLabel: "Amazon",
  },
  {
    slug: "harness",
    name: "胴輪（ハーネス）",
    category: "outdoor",
    summary: "首への負担を避けたい子に。着脱のしやすさで続けやすさが変わります。",
    reason:
      "まきは引っ張り癖があった時期に首輪だと咳き込んでしまったので、胴輪に替えました。前足を通さずに着せられるタイプだと、朝の散歩前がかなり楽になります。",
    caveat: "サイズが合っていないと抜けます。指2本が入る程度に調整してください。",
    priceRange: "3,000〜8,000円",
    shopLabel: "楽天市場",
  },
  {
    slug: "puzzle-toy",
    name: "知育トイ（コング型）",
    category: "everyday",
    summary: "留守番前の10分に。頭を使わせると、そのあとよく寝ます。",
    reason:
      "留守番のときに鳴いてしまう子には、出かける直前に中身を詰めたものを渡すのが効きました。「飼い主がいなくなる＝いいことが起きる」に置き換わります。",
    caveat: "詰めた分のカロリーは1日のごはんから引くこと。丸のみできるサイズは避けてください。",
    priceRange: "1,500〜3,500円",
    shopLabel: "Amazon",
  },
  {
    slug: "nail-grinder",
    name: "電動爪やすり",
    category: "care",
    summary: "爪切りが苦手な子に。切るのではなく削るので出血させにくい。",
    reason:
      "うには爪切りの「パチン」という音が本気で苦手で、暴れて危なかったのですが、削るタイプに替えてから体を預けたままでいてくれるようになりました。",
    caveat: "音と振動に慣らすまでは数日かかります。初日は電源を入れて見せるだけで十分です。",
    priceRange: "2,500〜6,000円",
    shopLabel: "Amazon",
  },
];

export function getGoodsByCategory(category: GoodsCategory): Goods[] {
  return goods.filter((item) => item.category === category);
}
