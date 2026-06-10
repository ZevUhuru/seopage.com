import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/seo-page",
        destination: "/ai-page-ranking",
        permanent: true,
      },
      {
        source: "/what-is-an-seo-page",
        destination: "/ai-page-ranking",
        permanent: true,
      },
      {
        source: "/seo-pages",
        destination: "/ai-page-ranking",
        permanent: true,
      },
      {
        source: "/glossary/seo-page",
        destination: "/ai-page-ranking",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
