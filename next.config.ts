import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/what-is-an-seo-page",
        destination: "/seo-page",
        permanent: true,
      },
      {
        source: "/seo-pages",
        destination: "/seo-page",
        permanent: true,
      },
      {
        source: "/glossary/seo-page",
        destination: "/seo-page",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
