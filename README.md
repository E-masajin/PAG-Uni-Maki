# うに＆まき — 愛犬ブログ ＆ ランディングページ

2匹の愛犬「うに」と「まき」との暮らしを記録し、これから犬を迎える人・すでに一緒に暮らしている人に向けて情報を届けるサイトです。

- **SNS集客** — Instagram / X / TikTok への導線とシェア機能
- **収益化** — アフィリエイト対応のグッズ紹介（ステマ規制に対応した広告表記つき）
- **情報発信** — カテゴリ・タグつきの Markdown ブログ

## 技術構成

| | |
| --- | --- |
| フレームワーク | Next.js 16（App Router）/ React 19 |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4（OKLCH のセマンティックトークン） |
| 記事 | Markdown（`src/content/posts`）＋ gray-matter / remark |
| テーマ | next-themes（ライト／ダーク／システム） |
| デプロイ | Vercel を想定（全ページ静的生成） |

## セットアップ

```bash
npm install
cp .env.example .env.local   # 値を自分のものに書き換える
npm run dev                  # http://localhost:3000
```

その他のコマンド:

```bash
npm run build   # 本番ビルド（全ページを静的生成）
npm start       # ビルド結果をローカルで確認
npm run lint    # ESLint
```

## 最初に差し替えるところ

実データはすべて数ファイルに集約してあります。ここを直せば全ページに反映されます。

| 内容 | ファイル |
| --- | --- |
| サイト名・SNS アカウント・連絡先 | `src/lib/site.ts`（または `.env.local`） |
| うに・まきのプロフィール（犬種・誕生日・性格） | `src/lib/dogs.ts` |
| おすすめグッズとアフィリエイトリンク | `src/lib/goods.ts` |
| ナビゲーションの項目 | `src/lib/navigation.ts` |
| 記事カテゴリ | `src/lib/categories.ts` |
| 写真 | `public/images/`（[置き方](public/images/README.md)） |

### SNS アカウント

`.env.local` に書くのが手軽です。`@` は不要です。

```bash
NEXT_PUBLIC_INSTAGRAM_HANDLE=your_handle
NEXT_PUBLIC_X_HANDLE=your_handle
NEXT_PUBLIC_TIKTOK_HANDLE=your_handle
```

## 記事の書き方

`src/content/posts/` に `.md` ファイルを追加します。ファイル名がそのまま URL になります
（`omukae-checklist.md` → `/blog/omukae-checklist`）。

```markdown
---
title: "記事のタイトル"
description: "一覧と検索結果に出る2〜3行の要約"
date: "2026-09-05"
category: "welcome"   # welcome / care / goods / diary
tags: ["費用", "はじめての犬"]
cover: "/images/posts/example.jpg"   # 省略可。無いと撮影予定の枠が出る
coverAlt: "うにがソファで仰向けに寝ている"
pr: false             # アフィリエイト・提供を含むなら true
draft: false          # true にすると公開されない
featured: false       # トップのおすすめ枠に出す
---

本文をここから書きます。
```

- `pr: true` にすると、**記事の冒頭（スクロールせずに見える位置）に広告表記が出ます**。
  アフィリエイトリンクを含む記事では必ず `true` にしてください（景品表示法の指定告示への対応）。
- 見出しは `##`（H2）から使ってください。H1 はタイトルが自動で入ります。
- H2・H3 は自動で目次になります。

## デプロイ（Vercel）

1. GitHub リポジトリを Vercel にインポートする（フレームワークは Next.js が自動検出されます）
2. **Environment Variables** に `.env.example` の内容を設定する
   - `NEXT_PUBLIC_SITE_URL` は独自ドメインが決まってから設定します。
     未設定でも Vercel のドメインが自動で使われます
   - SNS ハンドルと連絡先は Production / Preview の両方に入れておくと確認が楽です
3. デプロイ
4. 独自ドメインを設定したら、`NEXT_PUBLIC_SITE_URL` をそのドメインに変更して再デプロイ

プレビュー環境（Production 以外）は `robots.txt` で自動的に `Disallow: /` になります。
本番と重複したページが検索結果に載るのを防ぐためです。

### デプロイ後にやること

- [ ] Google Search Console にサイトを登録し、`https://ドメイン/sitemap.xml` を送信
- [ ] Amazon アソシエイト・楽天アフィリエイトに申請し、`src/lib/goods.ts` の `affiliateUrl` を埋める
- [ ] Instagram / X / TikTok のプロフィール欄にサイト URL を貼る
- [ ] `src/lib/site.ts` の `contactEmail` を設定（PR の問い合わせ導線）

## SEO と法令対応

すでに入っているもの:

- `sitemap.xml` / `robots.txt` / RSS（`/feed.xml`）の自動生成
- OGP 画像の自動生成（写真がない記事でも、タイトルを組んだ画像が出ます）
- 構造化データ（`BlogPosting` / `BreadcrumbList` / `FAQPage` / SNS の `sameAs`）
- **広告表記の3形式** — 記事冒頭バー・カードの PR バッジ・価格横の「広告」ラベル
- アフィリエイトリンクへの `rel="sponsored nofollow noopener"`
- プライバシーポリシー・免責事項（`/privacy`）、運営方針（`/about`）

## デザインの決まりごと

崩さないために、変更するときは次の点を守ってください。

- **色は必ずトークンで指定する**（`bg-paper` `text-ink` `bg-accent text-on-accent` など）。
  `text-white` や `#000` を直接書くと、ダークモードで破綻します
- **明朝（serif）は 22px 以上でのみ使う**。それ未満はダークモードで線が痩せます
- **記事本文の行長は 40rem まで**。日本語で1行 37〜38 字が読みやすさの上限です
- **写真の上に文字を重ねない**
- **アクセント色を PR 表記に使わない**（「おすすめマーク」に誤読されるため）

## ライセンス

写真および記事の著作権は運営者に帰属します。
