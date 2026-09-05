/**
 * 構造化データ（JSON-LD）。
 * 検索結果でのリッチリザルトと、SNS でのカード表示の精度を上げる目的で使う。
 */

import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Post } from "@/lib/posts";
import { categories } from "@/lib/categories";

type JsonLd = Record<string, unknown>;

/** サイト全体。トップページの layout に1つだけ置く */
export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    inLanguage: siteConfig.lang,
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: absoluteUrl("/"),
      // sameAs に SNS を並べると、検索エンジンが同一の運営者だと認識しやすくなる
      sameAs: siteConfig.socialLinks.map((link) => link.url),
    },
  };
}

/** ブログ記事 */
export function articleJsonLd(post: Post): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url,
    mainEntityOfPage: url,
    inLanguage: siteConfig.lang,
    articleSection: categories[post.category].name,
    keywords: post.tags.join(", "),
    image: [absoluteUrl(post.cover ?? `/blog/${post.slug}/opengraph-image`)],
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: absoluteUrl("/"),
    },
  };
}

/** パンくず。階層のあるページで使う */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** よくある質問。ガイドページで使うとリッチリザルトの対象になり得る */
export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
