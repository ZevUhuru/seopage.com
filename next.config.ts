import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generation can take 30–90+ seconds; give the route room on Vercel.
  serverExternalPackages: ["@anthropic-ai/sdk"],
  async redirects() {
    // Consolidate old/alternate slugs onto the canonical reference page.
    return [
      { source: "/seo-landing-page", destination: "/seo-page", permanent: true },
      { source: "/seo-pages", destination: "/seo-page", permanent: true },
      { source: "/what-is-an-seo-page", destination: "/seo-page", permanent: true },
      { source: "/what-is-an-seo-landing-page", destination: "/seo-page", permanent: true },
      { source: "/glossary/seo-page", destination: "/seo-page", permanent: true },
    ];
  },
};

export default nextConfig;
