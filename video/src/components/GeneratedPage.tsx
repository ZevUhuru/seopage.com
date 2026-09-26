/* eslint-disable @next/next/no-img-element */
import { Img, staticFile } from "remotion";
import { DEMO } from "../lib/brand";
import { APP_DISPLAY, MONO } from "../lib/fonts";

const archivo = { fontFamily: APP_DISPLAY };
const mono = { fontFamily: MONO };

const SERVICES = [
  { img: "site/home/svc-leak.webp", h: "Leaks & fixtures", d: "Faucets, toilets, shut-offs" },
  { img: "site/home/svc-heater.webp", h: "Water heaters", d: "Repair and replacement" },
  { img: "site/home/svc-drain.webp", h: "Drains & sewer", d: "Clogs cleared same day" },
];

/**
 * The page the builder makes for Nora's example shop, as the homepage replay
 * draws it (components/home/BuilderDemo.tsx, scene 2). Drawn at 700px wide.
 */
export function GeneratedPage({ scroll = 0 }: { scroll?: number }) {
  const { name, service, city } = DEMO;
  const svcLow = service.toLowerCase();
  return (
    <div style={{ transform: `translateY(-${scroll}px)` }}>
      <div className="flex h-11 items-center justify-between bg-[#0e1631] px-[22px] text-white">
        <span className="text-[14px] font-extrabold" style={archivo}>{name}</span>
        <span className="flex items-center gap-[18px] text-[11.5px] text-white/75"><span>Services</span><span>Areas</span><span>FAQ</span><span className="rounded-md bg-[#3d6bff] px-2.5 py-1.5 font-semibold text-white">(720) 555-0147</span></span>
      </div>
      <div className="relative h-[300px]">
        <Img src={staticFile("site/home/nora-proud.webp")} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "55% 38%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(14,22,49,.94) 0%, rgba(14,22,49,.72) 45%, rgba(14,22,49,.05) 85%)" }} />
        <div className="absolute left-[26px] top-10 flex w-[330px] flex-col gap-2.5 text-white">
          <span className="text-[9.5px] uppercase tracking-[.16em] text-[#9fb4ff]" style={mono}>{city} · licensed master plumber</span>
          <span className="text-[28px] font-extrabold leading-[1.04] tracking-[-0.02em]" style={archivo}>{service} in {city}, done right the first time.</span>
          <span className="text-[12.5px] leading-[1.5] text-white/80">A written price before any work starts. Same-day, evenings and weekends.</span>
          <span className="mt-1 flex gap-2 text-[12px]"><span className="rounded-lg bg-[#3d6bff] px-[13px] py-[9px] font-semibold">Call now</span><span className="rounded-lg border border-white/35 px-[13px] py-[9px]">Get a quote</span></span>
        </div>
      </div>
      <div className="flex justify-around border-b border-[#e6e8ec] bg-[#f3f5fb] px-[22px] py-3 text-[11.5px] font-semibold text-[#1d2a55]">
        <span>✓ Licensed &amp; insured</span><span>✓ Upfront, written pricing</span><span>✓ Same-day service</span><span>✓ Local since 2014</span>
      </div>
      <div className="px-[22px] pb-2 pt-5 text-[18px] font-extrabold" style={archivo}>What we fix in {city}</div>
      <div className="grid grid-cols-3 gap-3 px-[22px] pb-[18px]">
        {SERVICES.map(({ img, h, d }) => (
          <div key={h} className="overflow-hidden rounded-[10px] border border-[#e6e8ec]">
            <Img src={staticFile(img)} className="block h-24 w-full object-cover" />
            <div className="px-3 py-2.5"><span className="block text-[12.5px] font-bold">{h}</span><span className="text-[11px] text-[#646b78]">{d}</span></div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-[#eef0f3] bg-[#f9fafc] px-[22px] pb-[22px] pt-4 text-[12px]">
        <span className="text-[16px] font-extrabold" style={archivo}>{service} in {city}: common questions</span>
        <span className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2.5"><b>How much does {svcLow} cost in {city}?</b><br /><span className="text-[#4b515c]">We diagnose first and put the price in writing before any work starts.</span></span>
        <span className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2.5"><b>How fast can you get here?</b><br /><span className="text-[#4b515c]">Same day across {city}, evenings and weekends included.</span></span>
      </div>
    </div>
  );
}
