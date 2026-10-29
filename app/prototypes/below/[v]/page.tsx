import { notFound } from "next/navigation";
import { DarkFooter } from "@/components/DarkFooter";
import { AppHero } from "@/components/home/AppHero";
import { PersonalizeProvider } from "@/components/home/Personalize";
import { BELOW, type BelowKey } from "../../_lib/below";
import { BelowSection, BelowSwitcher, StoryOutline } from "../../_lib/below-sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return BELOW.map((b) => ({ v: b.key }));
}

/** The live hero, one story's first section, the rest of that story as a list, then the live footer. */
export default async function Page({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  const b = BELOW.find((x) => x.key === v);
  if (!b) notFound();
  return (
    <>
      <PersonalizeProvider>
        <AppHero />
        <BelowSection v={b.key as BelowKey} />
      </PersonalizeProvider>
      <StoryOutline v={b.key as BelowKey} />
      <DarkFooter />
      <BelowSwitcher current={b.key as BelowKey} />
    </>
  );
}
