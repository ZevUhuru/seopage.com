import { notFound } from "next/navigation";
import { DarkFooter } from "@/components/DarkFooter";
import { PRICING, PricingProto, PricingSwitcher, type PricingKey } from "../../_lib/pricing";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRICING.map((p) => ({ v: p.key }));
}

export default async function Page({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  const p = PRICING.find((x) => x.key === v);
  if (!p) notFound();
  return (
    <>
      <PricingProto v={p.key as PricingKey} />
      <DarkFooter note="Nora is an illustration, not a customer. Prototype: prices are proposals." />
      <PricingSwitcher current={p.key as PricingKey} />
    </>
  );
}
