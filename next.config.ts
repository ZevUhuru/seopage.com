import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generation can take 30–90+ seconds; give the route room on Vercel.
  serverExternalPackages: ["@anthropic-ai/sdk"],
  async redirects() {
    // The homepage owns "SEO landing page" now, so every alternate slug lands
    // there directly. Pointing them at /seo-page would build a redirect chain
    // (/seo-pages -> /seo-page -> /), which leaks signal and slows the hop.
    return [
      { source: "/seo-page", destination: "/", permanent: true },
      { source: "/seo-landing-page", destination: "/", permanent: true },
      { source: "/seo-pages", destination: "/", permanent: true },
      { source: "/what-is-an-seo-page", destination: "/", permanent: true },
      { source: "/what-is-an-seo-landing-page", destination: "/", permanent: true },
      { source: "/glossary/seo-page", destination: "/", permanent: true },
      // The journal was renamed rank¹ (/rank).
      { source: "/agentic", destination: "/rank", permanent: true },
      { source: "/agentic/:slug", destination: "/rank/:slug", permanent: true },
      // Trade pages moved under /for/ (tradePath in lib/verticals.ts). Only
      // trades that launched at the root need these; new trades start at /for/.
      { source: "/roofers", destination: "/for/roofers", permanent: true },
      { source: "/hvac", destination: "/for/hvac", permanent: true },
    ];
  },
};

export default nextConfig;
