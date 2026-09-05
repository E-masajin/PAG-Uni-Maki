import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionDeployment } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // プレビュー・開発デプロイは検索結果に出さない（本番との重複コンテンツを防ぐ）
  if (!isProductionDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
