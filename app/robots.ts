import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep generated/private flows out of the index.
      disallow: ["/intake", "/preview/", "/success", "/api/"],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
