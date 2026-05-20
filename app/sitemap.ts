import type { MetadataRoute } from "next";
import { examplePages } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://seopage.com";
  const now = new Date();

  const staticRoutes = ["", "/examples", "/pricing", "/how-it-works"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const exampleRoutes = examplePages.map((ex) => ({
    url: `${base}/examples/${ex.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...exampleRoutes];
}
