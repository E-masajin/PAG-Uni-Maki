import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF → WebP の順で配信する
    formats: ["image/avif", "image/webp"],
    // 既定値に、デザイン上実際に使う幅（アバター 96 / グッズ 272 / カード 368）を足す
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 272, 368, 384],
  },
};

export default nextConfig;
