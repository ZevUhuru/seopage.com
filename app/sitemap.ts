import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  return [
    {
      url: base,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/seo-page`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
