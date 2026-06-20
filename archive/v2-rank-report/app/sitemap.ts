import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://seopage.com";
  const now = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/ai-page-ranking", priority: 1 },
    { path: "/how-it-works", priority: 0.8 },
    { path: "/pricing", priority: 0.8 },
    { path: "/start", priority: 0.8 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));
}
