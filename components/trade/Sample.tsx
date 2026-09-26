/* eslint-disable @next/next/no-img-element -- photos inside a drawing of a customer's site, fixed size. */
import type { Vertical } from "@/lib/verticals";
import images from "@/data/trade-sample-images.json";
import { BeforeAfter } from "./BeforeAfter";

/* The trade page's app section: the site most businesses in the trade have
   today, and the page SEOPage builds for the same business. One photo set on
   both sides, so the comparison is about the words. The business is an
   example and is named as one; the builder generates its own photos until
   customer uploads ship (api.esy.com #526). */

type Sample = Vertical["sample"];

const photo = (slug: string, key: string) =>
  (images.trades as Record<string, { images: Record<string, { file: string }> }>)[slug].images[key].file;

/** The page SEOPage builds for the example business, drawn at 720px. */
function AfterPage({ s, slug }: { s: Sample; slug: string }) {
  return (
    <div className="w-[720px] bg-white text-[#0a0c11]" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <div className="flex items-center justify-between bg-[#0e1631] px-6 py-3 text-white">
        <b className="text-[14px]">{s.name}</b>
        <span className="flex items-center gap-4 text-[11.5px] text-white/75">
          <span>Services</span>
          <span>Areas</span>
          <span>FAQ</span>
          <span className="rounded-md bg-[#3d6bff] px-2.5 py-1.5 font-semibold text-white">{s.phone}</span>
        </span>
      </div>
      <div className="relative h-[330px]">
        <img src={photo(slug, "hero")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(14,22,49,.95) 0%, rgba(14,22,49,.78) 42%, rgba(14,22,49,.08) 82%)" }} />
        <div className="absolute left-7 top-9 flex w-[360px] flex-col gap-3 text-white">
          <span className="text-[26px] font-extrabold leading-[1.08] tracking-[-0.02em]">{s.headline}</span>
          <span className="text-[12.5px] leading-[1.55] text-white/85">{s.sub}</span>
          <span className="mt-1 flex gap-2 text-[12px]">
            <span className="rounded-lg bg-[#3d6bff] px-3 py-2 font-semibold">Call {s.phone}</span>
            <span className="rounded-lg border border-white/40 px-3 py-2">Get a written quote</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 border-b border-[#e6e8ec] bg-[#f3f5fb] px-4 py-3 text-center text-[11px] font-semibold text-[#1d2a55]">
        {s.trust.map((t) => (
          <span key={t}>✓ {t}</span>
        ))}
      </div>
      <div className="px-6 pb-2 pt-5 text-[18px] font-extrabold">What we fix in {s.city}</div>
      <div className="grid grid-cols-3 gap-3 px-6 pb-5">
        {s.services.map((x) => (
          <div key={x.key} className="overflow-hidden rounded-[10px] border border-[#e6e8ec]">
            <img src={photo(slug, x.key)} alt="" className="block h-24 w-full object-cover" />
            <div className="px-3 py-2.5">
              <b className="block text-[12.5px]">{x.h}</b>
              <span className="text-[11px] leading-[1.4] text-[#646b78]">{x.d}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-6 mb-5 rounded-lg bg-[#f3f5fb] px-4 py-3 text-[12px] text-[#1d2a55]">
        <b>Areas we serve:</b> {s.areas}
      </div>
      <div className="flex flex-col gap-2 border-t border-[#eef0f3] bg-[#f9fafc] px-6 pb-6 pt-4 text-[12px]">
        <span className="text-[16px] font-extrabold">Questions {s.city} homeowners ask</span>
        {s.faqs.map((f) => (
          <span key={f.q} className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2.5 leading-[1.45]">
            <b>{f.q}</b>
            <br />
            <span className="text-[#4b515c]">{f.a}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** The site most businesses in the trade have today: good photos, almost no words. */
function BeforePage({ s, slug }: { s: Sample; slug: string }) {
  const keys = ["hero", ...s.services.map((x) => x.key)];
  return (
    <div className="w-[720px] bg-[#f4f1ea] text-[#2b2b2b]" style={{ fontFamily: "Georgia, serif" }}>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-[20px] italic">{s.name}</span>
        <span className="rounded bg-[#8a2d1f] px-3 py-1.5 text-[12px] tracking-wide text-white">CALL US TODAY!</span>
      </div>
      <div className="relative h-[330px]">
        <img src={photo(slug, "hero")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/55 px-5 py-2 text-[26px] italic text-white">Quality You Can Trust</span>
      </div>
      <p className="px-6 pt-5 text-center text-[13px] italic">Family owned. Serving the area for over 20 years.</p>
      <p className="pt-1 text-center text-[11px] uppercase tracking-[0.2em] text-[#8a2d1f]">Our Work</p>
      <div className="grid grid-cols-3 gap-2 p-6">
        {[...keys.slice(1), keys[0], keys[2], keys[1]].map((k, i) => (
          <img key={i} src={photo(slug, k)} alt="" className="h-28 w-full object-cover" />
        ))}
      </div>
      <p className="pb-8 text-center text-[12px] text-[#777]">© Home · About Us · Gallery · Contact</p>
    </div>
  );
}

export function TradeSample({ v }: { v: Vertical }) {
  return (
    <>
      <BeforeAfter
        before={<BeforePage s={v.sample} slug={v.slug} />}
        after={<AfterPage s={v.sample} slug={v.slug} />}
        failings={v.failings}
        proof={v.proof.map((p) => p.t)}
      />
      <p className="text-[14px] text-[#7D869C]">{v.sample.name} is an example business. Scores are illustrative.</p>
    </>
  );
}
