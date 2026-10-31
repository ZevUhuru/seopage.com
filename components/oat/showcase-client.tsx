"use client";
/* eslint-disable @next/next/no-img-element -- app screenshots at their own size */

import { useState } from "react";
import { Crop, type Rect } from "./crop";

/* S2's tabs: one app window, the views as tabs above it. Every picture stays in the page (only the
   current one shows), so switching never waits on a download. Phones get each view's readable region. */
type Tab = { key: string; tab: string; h: string; body: string; example: string; src: string; phone: Rect };

export function ShowcaseTabs({ features }: { features: Tab[] }) {
  const [cur, setCur] = useState(features[0].key);
  const f = features.find((x) => x.key === cur) ?? features[0];
  return (
    <div className="mx-auto mt-12 max-w-[1240px]">
      <div role="tablist" aria-label="Views in the app" className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-white/12 bg-white/[0.04] p-1">
        {features.map((x) => (
          <button key={x.key} role="tab" aria-selected={x.key === cur} onClick={() => setCur(x.key)} className={`h-10 whitespace-nowrap rounded-full px-4 text-[14.5px] font-semibold transition-colors sm:px-5 ${x.key === cur ? "bg-[#f4f1ea] text-[#0a2540]" : "text-[#cdd6e2] hover:text-white"}`}>
            {x.tab}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
        <h3 className="font-[family-name:var(--o-head)] text-[clamp(28px,2.8vw,40px)] font-semibold leading-[1.05] tracking-[-0.035em] lg:col-span-6">{f.h}</h3>
        <div className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8">
          <p className="text-[16.5px] leading-[1.6] text-[#cdd6e2]">{f.body}</p>
          <p className="text-[14.5px] text-[#9db4ff]">{f.example}</p>
        </div>
      </div>
      <div role="tabpanel" className="relative mt-10 overflow-hidden rounded-[16px] border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,.6)]">
        <div className="flex h-9 items-center gap-2 border-b border-black/[0.07] bg-[#fffdf9] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c6]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c6]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c6]" />
          <span className="mx-auto rounded-full bg-[#f3f0e9] px-4 py-1 font-[family-name:var(--o-mono)] text-[11.5px] text-[#5e574b]">create.seopage.com</span>
          <span className="w-[42px]" />
        </div>
        <Crop src={f.src} rect={f.phone} alt={`${f.tab} in the SEOPage app (sample business).`} fadeRight className="sm:hidden" />
        <div className="relative hidden bg-[#f3f0e9] sm:block" style={{ aspectRatio: "1440 / 900" }}>
          {features.map((x) => (
            <img key={x.key} src={x.src} alt={`${x.tab} in the SEOPage app (sample business).`} width={2880} height={1800} loading="lazy" className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${x.key === cur ? "opacity-100" : "opacity-0"}`} aria-hidden={x.key !== cur} />
          ))}
        </div>
      </div>
    </div>
  );
}
