/**
 * OGP 画像で使うフォントの読み込み。
 *
 * 日本語フォントは全体だと数 MB あるため、Google Fonts の `text=` パラメータで
 * 実際に描画する文字だけをサブセットして取得する。
 * ビルド時（静的生成）にのみ実行される。
 */

/**
 * Google Fonts は User-Agent から woff2 対応可否を判定して配信形式を変える。
 * satori（next/og）は woff2 を読めないため、ブラウザのバージョンを含まない
 * UA を送って TrueType を受け取る。
 */
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";

async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;

    const css = await fetch(url, { headers: { "User-Agent": USER_AGENT } }).then((res) => res.text());
    const match = /src:\s*url\((https:[^)]+)\)/.exec(css);
    if (!match) return null;

    const response = await fetch(match[1]);
    if (!response.ok) return null;

    return await response.arrayBuffer();
  } catch {
    // フォントが取れなくても画像生成そのものは止めない
    return null;
  }
}

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600;
  style: "normal";
};

/** OGP に描画する文字列から、必要な字形だけを含むフォントを用意する */
export async function loadOgFonts(text: string): Promise<OgFont[]> {
  const [serif, sans] = await Promise.all([
    loadGoogleFont("Shippori Mincho", 600, text),
    loadGoogleFont("Noto Sans JP", 400, text),
  ]);

  const fonts: OgFont[] = [];
  if (serif) fonts.push({ name: "Shippori Mincho", data: serif, weight: 600, style: "normal" });
  if (sans) fonts.push({ name: "Noto Sans JP", data: sans, weight: 400, style: "normal" });
  return fonts;
}

/** ライトモードの紙色を基準にした OGP のパレット（satori は OKLCH 非対応なので HEX） */
export const ogColors = {
  paper: "#FCFAF6",
  ink: "#2B2521",
  inkStrong: "#19120D",
  inkMuted: "#615953",
  accent: "#B75400",
  line: "#E2DED5",
} as const;
