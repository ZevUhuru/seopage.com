import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Tick } from "@/components/home/HeroAnswer";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL, PRODUCT } from "@/lib/config";
import type { DemoTrade } from "@/components/home/BuilderDemo";
import type { PersonalDefaults } from "@/components/home/Personalize";
import { VERTICALS, type Vertical } from "@/lib/verticals";

/* Shared pieces for the three trade-page prototypes. Everything renders from
   lib/verticals.ts, so each direction is a template, not a one-off page. The
   offer is the homepage's (build free, pay to publish), not the old
   pay-first checkout the live trade pages still use. */

export const TRADE_STYLES = [
  { key: "a", name: "The Answer", note: "Opens on the AI answer naming someone else. The homepage's story, told per trade." },
  { key: "b", name: "The Brief", note: "Reads like the research brief. The page to build is drawn out, proof pinned to it." },
  { key: "c", name: "The Poster", note: "The trade in huge type, searches scrolling past, losses struck through." },
  { key: "d", name: "Homepage edition", note: "The homepage's story with a roofer or HVAC tech in Nora's place. Frames mark each scene to make." },
  { key: "e", name: "Final", note: "A, with B's blueprint for the proof and the builder replay building this trade's page. No videos, no new images." },
] as const;
export type TradeKey = (typeof TRADE_STYLES)[number]["key"];

export const PAD = "px-6 sm:px-10 lg:px-24";
export const SECTION = `${PAD} py-24 lg:py-[120px]`;
export const trades = () => VERTICALS;

export function TradeHeader({ v }: { v: Vertical }) {
  return (
    <header className={`${PAD} relative z-10 flex h-20 items-center justify-between`}>
      <div className="flex items-center gap-4">
        <Logo tone="dark" className="text-[22px]" />
        <span className="nh-mono hidden text-[11px] uppercase tracking-[0.16em] text-[#7D869C] sm:inline">For {v.plural}</span>
      </div>
      <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 bg-[#04060B]/35 px-5 font-medium backdrop-blur hover:border-white/60">
        Build my page
      </a>
    </header>
  );
}

/** Primary call to action with the homepage's three reassurances. */
export function Cta({ v, center = false }: { v: Vertical; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center" : ""}`}>
      <a href={CREATE_URL} className="flex h-[60px] w-fit items-center rounded-full bg-[#3D6BFF] px-8 text-[17px] font-semibold text-white transition-colors hover:bg-[#5A82FF]">
        Build my {v.primaryKeyword.replace(/ SEO$/i, "")} page free
      </a>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[#C9D0E2]">
        {["Free preview, no card", `${PRICE_LABEL} launch price, once`, "You own the page"].map((t) => (
          <li key={t} className="flex items-center gap-[7px]"><Tick />{t}</li>
        ))}
      </ul>
    </div>
  );
}

export function PriceCard({ v }: { v: Vertical }) {
  return (
    <div className="flex flex-col gap-[18px] rounded-[28px] border border-[#3D6BFF]/40 bg-gradient-to-b from-[#12204A] to-[#0A0F1E] p-8 sm:p-10">
      <span className="text-[16px] text-[#C9D0E2]">One {v.primaryKeyword} page</span>
      <span className="flex items-baseline gap-3.5">
        <span className="nh-display text-[clamp(72px,7vw,104px)] leading-none tracking-[-0.05em]">{PRICE_LABEL}</span>
        <span className="text-[15px] text-[#9DB4FF]">launch price</span>
      </span>
      <span className="text-[15px] text-[#A0A9C0]">{PRICE_AFTER_LAUNCH_LABEL} after launch. Pay when you publish.</span>
      <ul className="flex flex-col gap-2.5 border-y border-white/12 py-[18px] text-[15.5px]">
        {["Live research on the searches above", "The full page, written and designed", "Everything on the proof list, stated in text", "Title, description, and schema", "Ten checks, scored before you pay"].map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <a href={CREATE_URL} className="flex h-[58px] items-center justify-center rounded-full bg-[#3D6BFF] text-[16px] font-semibold text-white hover:bg-[#5A82FF]">
        Build my page free
      </a>
    </div>
  );
}

export function Faq({ v }: { v: Vertical }) {
  return (
    <section className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
      <h2 className="nh-display text-[clamp(34px,3.4vw,48px)] leading-[1.04] lg:col-span-4">{v.primaryKeyword}, answered.</h2>
      <div className="flex flex-col border-t border-white/12 lg:col-span-7 lg:col-start-6">
        {v.faqs.map((f, i) => (
          <details key={f.q} className="nh-faq group border-b border-white/12" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-[19px] font-medium">
              <h3 className="font-medium">{f.q}</h3>
              <span className="nh-plus shrink-0 text-[26px] font-light text-[#A0A9C0] transition-transform" aria-hidden>+</span>
            </summary>
            <p className="pb-6 pr-12 text-[16.5px] leading-[1.65] text-[#C9D0E2]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function TradeLegal() {
  return (
    <footer className={`${PAD} flex flex-col gap-2 border-t border-white/12 py-8 text-[13px] text-[#7D869C] sm:flex-row sm:justify-between`}>
      <span>© {new Date().getFullYear()} SEOPage · {PRODUCT.supportEmail}</span>
      <span>Competitor names are placeholders. Payments by Stripe.</span>
    </footer>
  );
}

/** "[city]" in a search renders as a placeholder chip, not literal brackets. */
export function Query({ q }: { q: string }) {
  const parts = q.split(/(\[city\])/);
  return (
    <>
      {parts.map((p, i) =>
        p === "[city]" ? (
          <span key={i} className="mx-[0.1em] rounded-[0.25em] bg-white/10 px-[0.25em] text-[0.9em] text-[#9DB4FF]">your city</span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function TradeSwitcher({ style, slug }: { style: TradeKey; slug: string }) {
  const pill = (on: boolean) => `whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${on ? "bg-[#3D6BFF] text-white" : "text-[#C9D0E2] hover:bg-white/10"}`;
  return (
    <nav className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0F1E]/90 p-1 text-[13px] shadow-2xl backdrop-blur">
      <Link href="/prototypes/trade" className="hidden px-3 text-[#7D869C] hover:text-white sm:inline">Trade pages</Link>
      {TRADE_STYLES.map((s) => (
        <Link key={s.key} href={`/prototypes/trade/${s.key}/${slug}`} className={pill(s.key === style)}>
          {s.key.toUpperCase()}<span className="hidden sm:inline"> · {s.name}</span>
        </Link>
      ))}
      <span className="mx-1 h-5 w-px bg-white/15" />
      {VERTICALS.map((v) => (
        <Link key={v.slug} href={`/prototypes/trade/${style}/${v.slug}`} className={pill(v.slug === slug)}>
          /{v.slug}
        </Link>
      ))}
    </nav>
  );
}

/** A search as the URL slug its page would live at: "roof leak repair near me" → roof-leak-repair. */
export const urlSlug = (q: string) =>
  q.replace(/\b(near me|in \[city\])\b/g, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** "roofing SEO" → "roofing": the trade as an adjective. */
export const tradeWord = (v: Vertical) => v.primaryKeyword.replace(/ SEO$/i, "");

/**
 * What the builder replay builds on each trade page. Text-only service tiles:
 * no photos to make. Would move into lib/verticals.ts with the template.
 */
export const REPLAY: Record<string, { defaults: PersonalDefaults; demo: DemoTrade }> = {
  roofers: {
    defaults: { service: "roofer", demoName: "Ridgeline Roofing", demoService: "Roofing", demoCity: "Denver" },
    demo: {
      credential: "licensed & insured roofer",
      services: [
        { h: "Storm & hail repair", d: "Insurance claims handled" },
        { h: "Roof replacement", d: "Asphalt, metal, tile" },
        { h: "Leak repair", d: "Same-day tarping" },
      ],
    },
  },
  hvac: {
    defaults: { service: "HVAC company", demoName: "Summit Heating & Air", demoService: "HVAC", demoCity: "Phoenix" },
    demo: {
      credential: "licensed HVAC contractor",
      services: [
        { h: "AC repair", d: "Same day, most brands" },
        { h: "Furnace repair", d: "Heat back on tonight" },
        { h: "System replacement", d: "Written quotes, financing" },
      ],
    },
  },
};

/**
 * "a roofing" / "an HVAC": acronyms are read letter by letter, so one that
 * starts with a letter named with a vowel sound (F, H, L, M, N, R, S, X) takes "an".
 */
export const aOr = (word: string) => (/^[aeiou]/i.test(word) || /^[FHLMNRSX][A-Z]/.test(word) ? "an" : "a");
