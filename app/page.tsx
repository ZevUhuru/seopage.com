import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { PRICE_LABEL } from "@/lib/config";

/* The homepage; its story and sections are in components/home/HomePage.tsx. */

export const metadata: Metadata = {
  // Primary keyword ("SEO landing page") front-loaded; see git history for
  // the targeting rationale. Do not swap the term without Zev.
  title: {
    absolute: `SEO Landing Pages That Get Cited by AI and Rank on Google | SEOPage`,
  },
  description: `An SEO landing page is a page built to win one search. Build yours with AI — researched, written, and engineered to rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews. Free to preview, ${PRICE_LABEL} to publish.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
