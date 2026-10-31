import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { tradeOf } from "@/components/oat/showcase";
import { StoryHome } from "@/components/oat/story";
import { HOME_SCHEMA } from "@/lib/homeContent";
import { PRICE_LABEL } from "@/lib/config";

/* The homepage: the story page (components/oat/story.tsx), picked as S4 in /prototypes/app-showcase.
   It shows the app to trade owners, one of their questions per section. ?trade=hvac|plumbing|roofing
   picks whose sample app the page shows (HVAC by default); the canonical stays /. The Oat page it
   replaced (OatHome in components/oat/home.tsx) still renders /prototypes/oat. */

export const metadata: Metadata = {
  // Primary keyword ("SEO landing page") front-loaded; see git history for
  // the targeting rationale. Do not swap the term without Zev.
  title: {
    absolute: `SEO Landing Pages That Get Cited by AI and Rank on Google | SEOPage`,
  },
  description: `An SEO landing page is a page built to win one search. Build yours with AI — researched, written, and engineered to rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews. Free to preview, ${PRICE_LABEL} to publish.`,
  alternates: { canonical: "/" },
};

export default async function Home({ searchParams }: { searchParams: Promise<{ trade?: string }> }) {
  const trade = tradeOf((await searchParams).trade).key;
  return (
    <>
      <JsonLd data={HOME_SCHEMA} />
      <StoryHome trade={trade} base="/" />
    </>
  );
}
