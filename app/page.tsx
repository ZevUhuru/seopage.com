import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { COPIES, OatHome, TONES } from "@/components/oat/home";
import { HOME_SCHEMA } from "@/lib/homeContent";
import { PRICE_LABEL } from "@/lib/config";

/* The homepage: the Oat page (components/oat/home.tsx) with the checklist copy, picked in
   /prototypes/oat and /prototypes/oat-copy (seopage.com #53). The dark Nora page it replaced is
   components/home/HomePage.tsx, still used by the older prototypes. */

export const metadata: Metadata = {
  // Primary keyword ("SEO landing page") front-loaded; see git history for
  // the targeting rationale. Do not swap the term without Zev.
  title: {
    absolute: `SEO Landing Pages That Get Cited by AI and Rank on Google | SEOPage`,
  },
  description: `An SEO landing page is a page built to win one search. Build yours with AI — researched, written, and engineered to rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews. Free to preview, ${PRICE_LABEL} to publish.`,
  alternates: { canonical: "/" },
};

const OAT = TONES.find((t) => t.key === "oat") ?? TONES[0];
const CHECKLIST = COPIES.find((c) => c.key === "b") ?? COPIES[0];

export default function Home() {
  return (
    <>
      <JsonLd data={HOME_SCHEMA} />
      <OatHome tone={OAT} copy={CHECKLIST} />
    </>
  );
}
