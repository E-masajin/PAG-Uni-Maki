import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { SocialTiles } from "@/components/SocialTiles";
import { dogs } from "@/lib/dogs";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "うに＆まきの運営方針、記事の書き方の基準、広告・アフィリエイトの扱い、健康情報についての免責をまとめています。",
  alternates: { canonical: "/about" },
};

const faqs = [
  {
    question: "書いている人は専門家ですか？",
    answer:
      "いいえ。獣医師でもトレーナーでもなく、2匹と暮らしている一飼い主です。ここに書いているのは、うちで実際に試したことの記録です。医療や行動の問題については、必ず獣医師や専門家にご相談ください。",
  },
  {
    question: "紹介しているグッズは、提供されたものですか？",
    answer:
      "基本的には自費で買って使っているものです。提供を受けた場合は、その記事の冒頭に必ず明記します。アフィリエイトリンクを含む記事にも、冒頭に広告表記を出しています。",
  },
  {
    question: "うまくいかなかったことも書いていますか？",
    answer:
      "書いています。むしろ、うまくいかなかった過程のほうが役に立つと思っているので、失敗した方法もそのまま残しています。",
  },
];

export default function AboutPage() {
  const [uni, maki] = dogs;

  return (
    <div className="mx-auto max-w-[var(--container-content)] px-gutter py-section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", path: "/" },
              { name: "このサイトについて", path: "/about" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      <p className="type-overline-en text-ink-muted">About</p>
      <h1 className="type-h1 mt-2 text-ink-strong">このサイトについて</h1>

      <div className="prose mt-10">
        <p>
          {siteConfig.name}は、2匹の愛犬「{uni.name}」と「{maki.name}
          」と暮らしている飼い主が書いているブログです。
        </p>
        <p>
          書いているのは主に2つです。ひとつは、うちで実際に試して、うまくいったこと・いかなかったことの記録。
          もうひとつは、これから犬を迎えようとしている人が、迎える前に知っておきたかったであろうことです。
        </p>

        <h2>このサイトの約束</h2>
        <ol>
          <li>
            <strong>紹介するのは、実際に使っているものだけ。</strong>
            使っていないものを、良さそうという理由だけで載せることはしません。
          </li>
          <li>
            <strong>PR・広告は、必ず記事の冒頭に明記する。</strong>
            スクロールしないと見えない場所や、目立たない色で書くことはしません。
          </li>
          <li>
            <strong>健康と医療の判断は獣医師へ。</strong>
            ここに書くのは、あくまで一飼い主の体験です。
          </li>
        </ol>

        <h2>広告・アフィリエイトについて</h2>
        <p>
          当サイトは、Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。あわせて、楽天アフィリエイトほか各社のアフィリエイトプログラムにも参加しています。
        </p>
        <p>
          アフィリエイトリンクを含む記事には、記事の冒頭に広告表記を出しています。
          リンクを経由して商品を購入いただいた場合、当サイトに紹介料が入ることがありますが、
          <strong>それによって記事の評価を変えることはしません</strong>。
          合わなかった点も同じように書きます。
        </p>

        <h2>健康・医療情報についての免責</h2>
        <p>
          当サイトに掲載している健康、しつけ、食事などに関する内容は、診断・治療・助言を目的としたものではありません。
          犬の状態は個体によって大きく異なります。気になる症状や行動がある場合は、自己判断せず、
          かかりつけの獣医師にご相談ください。
        </p>
        <p>
          掲載内容には正確を期していますが、その完全性を保証するものではありません。
          当サイトの情報を利用したことによって生じた損害について、責任を負いかねます。
        </p>

        <h2>写真・文章の利用について</h2>
        <p>
          当サイトに掲載している写真および文章の著作権は、運営者に帰属します。
          無断での転載・複製はご遠慮ください。引用の範囲であれば、出典を明記のうえご利用いただけます。
        </p>

        <h2>よくある質問</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>

      <section className="mt-section">
        <h2 className="type-h2 text-ink-strong">SNS でも発信しています</h2>
        <SocialTiles className="mt-8" />
      </section>

      <section className="mt-section rounded-[var(--radius-md)] border border-line bg-card p-6 md:p-10">
        <h2 className="type-h3 text-ink-strong">お仕事・PR のご相談</h2>
        <p className="mt-3 max-w-[52ch] text-ink-muted">
          商品提供・PR記事・取材のご依頼は、お問い合わせページからご連絡ください。
          内容を確認したうえで、実際に使ってみて紹介できるものだけをお受けしています。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/contact">お問い合わせ</ButtonLink>
          <ButtonLink href="/privacy" variant="secondary">
            プライバシーポリシー
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
