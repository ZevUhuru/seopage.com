import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COPIES, OatHome, Picker, TONES } from "@/components/oat/home";
import { heroShot, SHOWCASE_TAKES, ShowcaseTabsSection, ShowcaseTour, ShowcaseTrade, tradeOf } from "@/components/oat/showcase";
import { StoryHome } from "@/components/oat/story";

/* The homepage on Oat with the app in the hero, and three ways to show the app below it (2026-10-30).
   /prototypes/app-showcase/{s1,s2,s3}; s3 also takes ?trade=hvac|plumbing|roofing. Never indexed. */
export const metadata: Metadata = { title: { absolute: "App showcase | SEOPage" }, robots: { index: false, follow: false } };

export function generateStaticParams() {
  return SHOWCASE_TAKES.map((t) => ({ v: t.key }));
}

export default async function Page({ params, searchParams }: { params: Promise<{ v: string }>; searchParams: Promise<{ trade?: string }> }) {
  const { v } = await params;
  const take = SHOWCASE_TAKES.find((t) => t.key === v);
  if (!take) notFound();
  const trade = v === "s3" || v === "s4" ? tradeOf((await searchParams).trade).key : "hvac";
  const base = `/prototypes/app-showcase/${v}`;
  const picker = <Picker label="App showcase" current={take.key} items={SHOWCASE_TAKES.map((t) => ({ ...t, href: `/prototypes/app-showcase/${t.key}` }))} />;
  // S4 is a whole page of its own; S1–S3 are sections under the current homepage
  if (v === "s4") return <StoryHome trade={trade} base={base} picker={picker} />;
  const showcase = v === "s1" ? <ShowcaseTour /> : v === "s2" ? <ShowcaseTabsSection /> : <ShowcaseTrade trade={trade} base={base} />;
  return <OatHome tone={TONES[0]} copy={COPIES.find((c) => c.key === "b")!} heroShot={heroShot(trade)} showcase={showcase} picker={picker} />;
}
