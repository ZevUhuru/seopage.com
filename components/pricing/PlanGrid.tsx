"use client";

import { useState } from "react";
import { Tick } from "@/components/home/HeroAnswer";
import { ADS, PLANS, priceFor, usd, type Billing, type Plan } from "@/lib/plans";

/* The two monthly plans side by side, with a monthly/yearly switch. SEOPage
   carries the Google Ads add-on as a switch, so owners who pay for clicks
   see one plan with one extra, not a fourth card. Plans that aren't sold
   yet keep their full card but get a disabled button. */

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
      <div id="plans" className="grid max-w-[1000px] gap-5 md:grid-cols-2">
        {PLANS.map((p) => <PlanCard key={p.id} p={p} billing={billing} />)}
      </div>
    </div>
  );
}

function PlanCard({ p, billing }: { p: Plan; billing: Billing }) {
  const [withAds, setWithAds] = useState(false);
  const price = priceFor(p, billing, withAds);
  const coming = p.status === "coming";
  const includes = withAds ? [...p.includes, ...ADS.includes] : p.includes;
  return (
    <article
      className={`flex flex-col gap-6 rounded-[20px] border p-7 ${p.featured ? "border-[#3D6BFF] bg-[#0A0F1E]" : "border-white/12 bg-[#04060B]"}`}
    >
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[19px] font-semibold">{p.name}</h3>
          {coming && <span className="text-[13px] text-[#7D869C]">Coming soon</span>}
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
        {includes.map((x) => (
          <li key={x} className="flex items-start gap-2.5"><span className="mt-[5px]"><Tick /></span>{x}</li>
        ))}
      </ul>

      {/* The Ads add-on: changes the price and the list; it ships when the Ads API is approved. */}
      {p.adsAddOn && (
        <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-white/15 p-4">
          <input type="checkbox" checked={withAds} onChange={(e) => setWithAds(e.target.checked)} className="mt-1 h-4 w-4 accent-[#3D6BFF]" />
          <span className="flex flex-col gap-0.5">
            <span className="text-[15px] font-medium">Add Google Ads, +{usd(ADS.price)} a month</span>
            <span className="text-[13.5px] leading-[1.45] text-[#A0A9C0]">For owners already paying Google for clicks. {ADS.extraCredits} more credits a month.</span>
          </span>
        </label>
      )}

      {/* Bought online: the one primary button. Sold on a call: a quieter button to the booking page. */}
      {!coming && p.cta.href ? (
        p.status === "live" ? (
          <a href={p.cta.href} className="flex h-[50px] items-center justify-center rounded-[10px] bg-[#3D6BFF] px-6 text-[15.5px] font-semibold text-white transition-colors hover:bg-[#5A82FF]">
            {p.cta.label}
          </a>
        ) : (
          <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className="flex h-[50px] items-center justify-center rounded-[10px] border border-white/30 px-6 text-[15.5px] font-medium hover:border-white/60">
            {p.cta.label}
          </a>
        )
      ) : (
        <button disabled className="flex h-[50px] cursor-not-allowed items-center justify-center rounded-[10px] border border-white/15 px-6 text-[15.5px] font-medium text-[#7D869C]">
          {p.cta.label}
        </button>
      )}
    </article>
  );
}
