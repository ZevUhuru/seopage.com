import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generation can take 30–90+ seconds; give the route room on Vercel.
  serverExternalPackages: ["@anthropic-ai/sdk"],
};

export default nextConfig;
