import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

// display 用。22px 未満では使わない（ダークモードで線が痩せるため）
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s｜${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": absoluteUrl("/feed.xml") },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    site: `@${siteConfig.socialLinks.find((link) => link.key === "x")?.handle ?? ""}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFAF6" },
    { media: "(prefers-color-scheme: dark)", color: "#1B1714" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.lang}
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansJp.variable} ${fraunces.variable} ${shipporiMincho.variable}`}
    >
      <body>
        <ThemeProvider>
          <a href="#main" className="skip-link">
            本文へスキップ
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
