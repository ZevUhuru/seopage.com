/* eslint-disable @next/next/no-img-element -- mockups of a customer's site; fixed-size photos. */
import Link from "next/link";
import { VERTICALS, type Vertical } from "@/lib/verticals";
import images from "./sample-images.json";
import { BeforeAfter } from "./replay-client";
import { PAD } from "./trade-shared";

/* Direction B of the app section, three ways: the same before/after, with
   hand-written homeowner copy and one of three realistic photo sets. One set
   sits on both sides so the comparison is about the words. The builder
   generates its own photos today, so nothing here claims it reuses the
   business's photos; that waits for customer uploads (api.esy.com
   docs/plans/2026-09-25-builder-brand-assets.md). Example businesses,
   labeled as such. */

export const SETS = Object.entries(images.sets).map(([key, s]) => ({ key, name: s.name, note: s.note }));
export type SetKey = keyof typeof images.sets;

type Sample = {
  name: string;
  city: string;
  phone: string;
  headline: string;
  sub: string;
  trust: string[];
  services: { key: string; h: string; d: string }[];
  areas: string;
  faqs: { q: string; a: string }[];
};

/** What each example business would say to its own customers. */
const SAMPLE: Record<string, Sample> = {
  roofers: {
    name: "Ridgeline Roofing",
    city: "Denver",
    phone: "(720) 555-0147",
    headline: "Emergency roof repair in Denver. We tarp tonight, fix it this week.",
    sub: "Licensed, bonded, and insured. Call any hour and a crew is on your roof within two hours to stop the leak, with a written price before any repair.",
    trust: ["Licensed, bonded & insured", "On your roof within 2 hours", "Insurance claims handled", "10-year workmanship warranty"],
    services: [
      { key: "storm", h: "Storm & hail repair", d: "We document the damage and work directly with your insurer." },
      { key: "replacement", h: "Roof replacement", d: "Asphalt, metal, and tile. Written quote after a free inspection." },
      { key: "leak", h: "Leak repair", d: "Found, tarped, and fixed. Most leaks the same day." },
    ],
    areas: "Denver, Aurora, Lakewood, Englewood, Littleton, and Arvada",
    faqs: [
      { q: "How fast can you get to my house?", a: "Anywhere in the Denver metro, a crew is on your roof within two hours, day or night. If it's still raining, we tarp it first and come back to repair it once it's dry." },
      { q: "Will my insurance cover hail damage?", a: "Often, yes. We inspect the roof, photograph every damaged area, and meet your adjuster on site. You pay your deductible; we bill the insurer for the rest." },
      { q: "How much does a roof repair cost?", a: "It depends on what's damaged, so we don't guess over the phone. After a free inspection you get a written price, and it doesn't change once work starts." },
    ],
  },
  hvac: {
    name: "Summit Heating & Air",
    city: "Phoenix",
    phone: "(602) 555-0182",
    headline: "AC repair in Phoenix, today. Cool air back before bedtime.",
    sub: "Licensed technicians for every major brand of air conditioner and heat pump. Same-day repair, evenings and weekends, with a written price before we start.",
    trust: ["Licensed & insured", "Same-day, 7 days a week", "Every major brand", "Financing available"],
    services: [
      { key: "ac", h: "AC repair", d: "Most repairs finished on the first visit." },
      { key: "furnace", h: "Furnace repair", d: "Heat back on the same night, even in January." },
      { key: "replacement", h: "System replacement", d: "Written quotes, with monthly payment options." },
    ],
    areas: "Phoenix, Scottsdale, Tempe, Mesa, Chandler, and Glendale",
    faqs: [
      { q: "How fast can you fix my AC?", a: "Call before 3 p.m. and a technician is usually at your door the same day, evenings and weekends included. In summer, homes without any cooling go first." },
      { q: "Should I repair my AC or replace it?", a: "If the system is fairly young and the repair is a small share of a new unit, repair usually makes sense. We give you both prices in writing and you decide." },
      { q: "Do you work on my brand?", a: "Yes. We service every major brand of air conditioner, heat pump, and furnace, and carry the common parts on the truck." },
    ],
  },
};

const src = (set: SetKey, slug: string, key: string) => `/prototypes/sample/${set}/${slug}/${key}.webp`;

/** The page SEOPage builds for the example business, at 720px. */
function AfterPage({ s, set, slug }: { s: Sample; set: SetKey; slug: string }) {
  return (
    <div className="w-[720px] bg-white text-[#0a0c11]" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <div className="flex items-center justify-between bg-[#0e1631] px-6 py-3 text-white">
        <b className="text-[14px]">{s.name}</b>
        <span className="flex items-center gap-4 text-[11.5px] text-white/75">
          <span>Services</span><span>Areas</span><span>FAQ</span>
          <span className="rounded-md bg-[#3d6bff] px-2.5 py-1.5 font-semibold text-white">{s.phone}</span>
        </span>
      </div>
      <div className="relative h-[330px]">
        <img src={src(set, slug, "hero")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(14,22,49,.95) 0%, rgba(14,22,49,.78) 42%, rgba(14,22,49,.08) 82%)" }} />
        <div className="absolute left-7 top-9 flex w-[360px] flex-col gap-3 text-white">
          <span className="text-[26px] font-extrabold leading-[1.08] tracking-[-0.02em]">{s.headline}</span>
          <span className="text-[12.5px] leading-[1.55] text-white/85">{s.sub}</span>
          <span className="mt-1 flex gap-2 text-[12px]"><span className="rounded-lg bg-[#3d6bff] px-3 py-2 font-semibold">Call {s.phone}</span><span className="rounded-lg border border-white/40 px-3 py-2">Get a written quote</span></span>
        </div>
      </div>
      <div className="grid grid-cols-4 border-b border-[#e6e8ec] bg-[#f3f5fb] px-4 py-3 text-center text-[11px] font-semibold text-[#1d2a55]">
        {s.trust.map((t) => <span key={t}>✓ {t}</span>)}
      </div>
      <div className="px-6 pb-2 pt-5 text-[18px] font-extrabold">What we fix in {s.city}</div>
      <div className="grid grid-cols-3 gap-3 px-6 pb-5">
        {s.services.map((x) => (
          <div key={x.key} className="overflow-hidden rounded-[10px] border border-[#e6e8ec]">
            <img src={src(set, slug, x.key)} alt="" className="block h-24 w-full object-cover" />
            <div className="px-3 py-2.5"><b className="block text-[12.5px]">{x.h}</b><span className="text-[11px] leading-[1.4] text-[#646b78]">{x.d}</span></div>
          </div>
        ))}
      </div>
      <div className="mx-6 mb-5 rounded-lg bg-[#f3f5fb] px-4 py-3 text-[12px] text-[#1d2a55]"><b>Areas we serve:</b> {s.areas}</div>
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

/** The site most trades have today: good photos, almost no words. */
function BeforePage({ s, set, slug }: { s: Sample; set: SetKey; slug: string }) {
  const keys = ["hero", ...s.services.map((x) => x.key)];
  return (
    <div className="w-[720px] bg-[#f4f1ea] text-[#2b2b2b]" style={{ fontFamily: "Georgia, serif" }}>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-[20px] italic">{s.name}</span>
        <span className="rounded bg-[#8a2d1f] px-3 py-1.5 text-[12px] tracking-wide text-white">CALL US TODAY!</span>
      </div>
      <div className="relative h-[330px]">
        <img src={src(set, slug, "hero")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/55 px-5 py-2 text-[26px] italic text-white">Quality You Can Trust</span>
      </div>
      <p className="px-6 pt-5 text-center text-[13px] italic">Family owned. Serving the area for over 20 years.</p>
      <p className="pt-1 text-center text-[11px] uppercase tracking-[0.2em] text-[#8a2d1f]">Our Work</p>
      <div className="grid grid-cols-3 gap-2 p-6">
        {[...keys.slice(1), keys[0], keys[2], keys[1]].map((k, i) => (
          <img key={i} src={src(set, slug, k)} alt="" className="h-28 w-full object-cover" />
        ))}
      </div>
      <p className="pb-8 text-center text-[12px] text-[#777]">© Home · About Us · Gallery · Contact</p>
    </div>
  );
}

export function SampleProto({ set, v }: { set: SetKey; v: Vertical }) {
  const s = SAMPLE[v.slug];
  return (
    <section className={`${PAD} flex flex-col gap-12 bg-[#0A0F1E] py-24 lg:py-[120px]`}>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <h2 className="nh-display max-w-[760px] text-[clamp(40px,5vw,72px)] leading-none">Same business. A page that wins.</h2>
        <p className="max-w-[460px] text-[18px] leading-[1.6] text-[#C9D0E2]">
          Drag across. On the left, the site most {v.plural} have: good photos, a phone number, nothing an assistant can quote. On the right, the page SEOPage builds for the same business.
        </p>
      </div>
      <BeforeAfter before={<BeforePage s={s} set={set} slug={v.slug} />} after={<AfterPage s={s} set={set} slug={v.slug} />} failings={v.failings} proof={v.proof.map((p) => p.t)} />
      <p className="text-[14px] text-[#7D869C]">{s.name} is an example business. Scores are illustrative.</p>
    </section>
  );
}

export function SampleSwitcher({ set, slug }: { set: SetKey; slug: string }) {
  const pill = (on: boolean) => `whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${on ? "bg-[#3D6BFF] text-white" : "text-[#C9D0E2] hover:bg-white/10"}`;
  return (
    <nav className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0F1E]/90 p-1 text-[13px] shadow-2xl backdrop-blur">
      <Link href="/prototypes/sample" className="hidden px-3 text-[#7D869C] hover:text-white sm:inline">Photo sets</Link>
      {SETS.map((x, i) => (
        <Link key={x.key} href={`/prototypes/sample/${x.key}/${slug}`} className={pill(x.key === set)}>
          {i + 1}<span className="hidden sm:inline"> · {x.name}</span>
        </Link>
      ))}
      <span className="mx-1 h-5 w-px bg-white/15" />
      {VERTICALS.map((v) => (
        <Link key={v.slug} href={`/prototypes/sample/${set}/${v.slug}`} className={pill(v.slug === slug)}>/{v.slug}</Link>
      ))}
    </nav>
  );
}
