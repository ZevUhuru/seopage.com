import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COPIES, OatHome, Picker, TONES } from "../../_lib/oat-home";

/* How the paragraph under each headline speaks: the page as it stood ("now") and three takes
   (A Short, B Checklist, C Owner talk), all on Oat. The takes are defined in _lib/oat-home.tsx. */

export const metadata: Metadata = { title: { absolute: "Homepage copy | SEOPage" }, robots: { index: false, follow: false } };

export const dynamicParams = false;
export function generateStaticParams() {
  return COPIES.map((c) => ({ v: c.key }));
}

export default async function Page({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  const c = COPIES.find((x) => x.key === v);
  if (!c) notFound();
  const items = COPIES.map((x) => ({ ...x, name: x.key === "now" ? "Now" : `${x.key.toUpperCase()} · ${x.name}`, href: `/prototypes/oat-copy/${x.key}` }));
  return <OatHome tone={TONES[0]} copy={c} picker={<Picker label="Paragraphs" current={c.key} items={items} />} />;
}
