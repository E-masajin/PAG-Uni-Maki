# デザインキャンバス（うに＆まき）

`src/app/globals.css` のデザインシステム v1.0 に合わせて作った、LP・記事・グッズ・スマホ・
検索/SNS表示の5面のデザインです。値（色・タイプスケール・角丸・余白）はすべて実装から取っています。

| ファイル | 内容 |
| --- | --- |
| `Main.dc.html` | LP（デスクトップ 1440） |
| `Article.dc.html` | 記事ページ（広告表記あり・目次・関連グッズ・シェア） |
| `Goods.dc.html` | グッズ一覧（商品販売） |
| `Mobile.dc.html` | スマホ 390×844 の第一画面 |
| `Share.dc.html` | OGP 画像（1200×630 実寸）・検索結果・SNSカード |
| `canvas.json` | 配置・注釈 |
| `uni-maki-dog-blog-lp.html` | 上記を1枚にまとめた書き出し（ブラウザで開けます） |

## 直すとき

`.dc.html` と `canvas.json` を編集してから、書き出しを作り直します。

```bash
SKILL=<design スキルのディレクトリ>
node "$SKILL/seed-canvas.mjs" \
  --template "$SKILL/payload.template.html" \
  --out uni-maki-dog-blog-lp.html \
  --title "うに＆まき 愛犬ブログ＆LP" \
  --artboard Main.dc.html --artboard Article.dc.html --artboard Goods.dc.html \
  --artboard Mobile.dc.html --artboard Share.dc.html \
  --canvas canvas.json
```
