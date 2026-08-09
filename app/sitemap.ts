import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const lastModified = new Date();
  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/audit`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/on-page-seo-services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/seo-page`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
