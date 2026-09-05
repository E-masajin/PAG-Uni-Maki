import { ImageResponse } from "next/og";
import { categories, getAllPosts, getPost } from "@/lib/posts";
import { loadOgFonts, ogColors } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const alt = "記事のタイトル";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** ビルド時に PNG として書き出す */
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/**
 * 写真がまだ無い記事でも成立するよう、文字組みだけで作る OGP。
 * 紙色の背景 ＋ 記事タイトル（明朝）＋ ワードマーク（§7.4-5）。
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post?.title ?? siteConfig.name;
  const categoryName = post ? categories[post.category].name : "";
  const footer = siteConfig.name;

  const fonts = await loadOgFonts(`${title}${categoryName}${footer}UNI&MAKI0123456789 `);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ogColors.paper,
          padding: "72px 80px",
          borderTop: `12px solid ${ogColors.accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {categoryName ? (
            <div
              style={{
                display: "flex",
                fontFamily: "Noto Sans JP",
                fontSize: 26,
                letterSpacing: "0.08em",
                color: ogColors.inkMuted,
              }}
            >
              {categoryName}
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              fontFamily: "Shippori Mincho",
              fontWeight: 600,
              fontSize: title.length > 40 ? 54 : 64,
              lineHeight: 1.4,
              letterSpacing: "0.02em",
              color: ogColors.inkStrong,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${ogColors.line}`,
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Shippori Mincho",
              fontWeight: 600,
              fontSize: 34,
              color: ogColors.inkStrong,
            }}
          >
            {footer}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Noto Sans JP",
              fontSize: 24,
              letterSpacing: "0.12em",
              color: ogColors.inkMuted,
            }}
          >
            UNI &amp; MAKI
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
