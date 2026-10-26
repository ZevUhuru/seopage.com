"use client";

import { useState } from "react";
import { Tick } from "@/components/home/HeroAnswer";
import { PLANS, priceFor, usd, type Billing, type Plan } from "@/lib/plans";

/* The four plans side by side, with a monthly/yearly switch. Plans that
   aren't sold yet keep their full card but get a disabled button, so the
   page reads as the real offer with the doors not open yet. */

export function PlanGrid() {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <div className="flex flex-col gap-8">
      <div role="radiogroup" aria-label="Billing" className="flex w-fit items-center gap-1 rounded-[12px] border border-white/15 p-1 text-[14.5px]">
        {(["monthly", "yearly"] as const).map((b) => (
          <button
            key={b}
            role="radio"
            aria-checked={billing === b}
            onClick={() => setBilling(b)}
            className={`h-10 rounded-[9px] px-4 font-medium transition-colors ${billing === b ? "bg-white text-[#04060B]" : "text-[#C9D0E2] hover:text-white"}`}
          >
            {b === "monthly" ? "Monthly" : "Yearly, 2 months free"}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((p) => <PlanCard key={p.id} p={p} billing={billing} />)}
      </div>
    </div>
  );
}

function PlanCard({ p, billing }: { p: Plan; billing: Billing }) {
  const price = priceFor(p, billing);
  const live = p.status === "live";
  return (
    <article
      className={`flex flex-col gap-6 rounded-[20px] border p-7 ${p.featured ? "border-[#3D6BFF] bg-[#0A0F1E]" : "border-white/12 bg-[#04060B]"}`}
    >
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[19px] font-semibold">{p.name}</h3>
          {!live && <span className="text-[13px] text-[#7D869C]">Coming soon</span>}
        </div>
        <p className="text-[14.5px] text-[#A0A9C0]">{p.who}</p>
      </header>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-2">
          <span className="nh-display text-[52px] leading-none tracking-[-0.05em] tabular-nums">{usd(price.amount)}</span>
          <span className="text-[15px] text-[#A0A9C0]">{price.unit}</span>
        </div>
        {/* Billing note, then any later price: shown as a future price, never a "was" price. */}
        <span className="min-h-[20px] text-[13.5px] text-[#7D869C]">
          {p.later ? `${usd(p.later.price)}${p.per === "month" ? " a month" : ""} ${p.later.when}` : price.note}
        </span>
      </div>

      <p className="text-[15.5px] leading-[1.55] text-[#C9D0E2]">{p.blurb}</p>

      <ul className="flex flex-1 flex-col gap-2.5 text-[15px] text-[#C9D0E2]">
        {p.includes.map((x) => (
          <li key={x} className="flex items-start gap-2.5"><span className="mt-[5px]"><Tick /></span>{x}</li>
        ))}
      </ul>

      {live && p.cta.href ? (
        <a href={p.cta.href} className="flex h-[50px] items-center justify-center rounded-[10px] bg-[#3D6BFF] px-6 text-[15.5px] font-semibold text-white transition-colors hover:bg-[#5A82FF]">
          {p.cta.label}
        </a>
      ) : (
        <button disabled className="flex h-[50px] cursor-not-allowed items-center justify-center rounded-[10px] border border-white/15 px-6 text-[15.5px] font-medium text-[#7D869C]">
          {p.cta.label}
        </button>
      )}
    </article>
  );
}
