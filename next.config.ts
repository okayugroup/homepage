import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,  // SSGでは画像の最適化を行うとリンクが壊れるため、unoptimizedをtrueに設定
    }
  /* config options here */
};

export default nextConfig;
