import { ImageResponse } from "next/og";
import { loadOgFonts, ogColors } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** ビルド時に PNG として書き出す */
export const dynamic = "force-static";

/** サイト全体の既定 OGP */
export default async function Image() {
  const heading = "うにと、まきと、暮らす。";
  const lead = "2匹の愛犬との毎日と、これから犬を迎える人のための記録。";
  const fonts = await loadOgFonts(`${heading}${lead}${siteConfig.name}UNI&MAKI `);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 32,
          background: ogColors.paper,
          padding: "80px",
          borderTop: `12px solid ${ogColors.accent}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Noto Sans JP",
            fontSize: 26,
            letterSpacing: "0.12em",
            color: ogColors.inkMuted,
          }}
        >
          UNI &amp; MAKI
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Shippori Mincho",
            fontWeight: 600,
            fontSize: 82,
            lineHeight: 1.3,
            letterSpacing: "0.03em",
            color: ogColors.inkStrong,
          }}
        >
          {heading}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Noto Sans JP",
            fontSize: 30,
            lineHeight: 1.8,
            color: ogColors.ink,
          }}
        >
          {lead}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
