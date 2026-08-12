import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/config";
import { VERTICALS } from "@/lib/verticals";
import { getArticles } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const lastModified = new Date();
  // Published articles are dynamic; the publish webhook revalidates this route.
  const articles = await getArticles();
  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...VERTICALS.map((v) => ({
      url: `${base}/${v.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/agentic`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    ...articles.map((a) => ({
      url: `${base}/agentic/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
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
  ];
}
