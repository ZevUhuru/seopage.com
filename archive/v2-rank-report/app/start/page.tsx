import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { StartFlow } from "@/components/StartFlow";

export const metadata: Metadata = {
  title: "Get Your Free AI Rank Report",
  description:
    "Paste a page URL and get a free AI Rank Report: 20 buyer prompts run across ChatGPT, Google AI Overviews, Perplexity, and Claude — with verdicts, competitor gaps, and a fix list. No credit card.",
  alternates: { canonical: "https://seopage.com/start" },
  openGraph: {
    title: "Get Your Free AI Rank Report — SEOPage",
    description:
      "One page, 20 buyer prompts, 4 AI channels. See where your page is cited, who beats you, and what to fix — free.",
    url: "https://seopage.com/start",
    type: "website",
  },
};

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <StartFlow />
      <SiteFooter />
    </div>
  );
}
