import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ALIASES, COPIES, OatHome, Picker, TONES } from "../../_lib/oat-home";

/* The homepage on three grounds (Oat, Night, Black), with the chosen copy: B · Checklist (2026-10-29). */

export const metadata: Metadata = { title: { absolute: "Homepage in Signed | SEOPage" }, robots: { index: false, follow: false } };

export const dynamicParams = false;
export function generateStaticParams() {
  return [...TONES.map((t) => t.key), ...Object.keys(ALIASES)].map((tone) => ({ tone }));
}

export default async function Page({ params }: { params: Promise<{ tone: string }> }) {
  const { tone } = await params;
  if (ALIASES[tone]) redirect(`/prototypes/oat/${ALIASES[tone]}`);
  const t = TONES.find((x) => x.key === tone);
  if (!t) notFound();
  const picker = <Picker label="Homepage, Signed" current={t.key} items={TONES.map((x) => ({ ...x, href: `/prototypes/oat/${x.key}` }))} />;
  const copy = COPIES.find((c) => c.key === "b") ?? COPIES[0];
  return <OatHome tone={t} copy={copy} picker={picker} />;
}
