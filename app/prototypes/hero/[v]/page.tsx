import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/HomePage";
import { HEROES, Hero, HeroSwitcher, type HeroKey } from "../../_lib/hero";

export const dynamicParams = false;

export function generateStaticParams() {
  return HEROES.map((h) => ({ v: h.key }));
}

/** The real homepage with one of the three app heroes in place of Nora's. */
export default async function Page({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  const h = HEROES.find((x) => x.key === v);
  if (!h) notFound();
  return (
    <>
      <HomePage hero={<Hero v={h.key as HeroKey} />} />
      <HeroSwitcher current={h.key as HeroKey} />
    </>
  );
}
