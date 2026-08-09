import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/config";

// Private/transactional flows stay out of the index. AI-search crawlers get
// an explicit welcome to the public pages — being read is the point.
const PRIVATE = ["/intake", "/preview/", "/success", "/order", "/admin", "/api/"];

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE,
      })),
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
