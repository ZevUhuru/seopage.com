import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Tick } from "@/components/home/HeroAnswer";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL, PRODUCT } from "@/lib/config";

/* ================================================================
   Three pricing pages for seopage.com/pricing (2026-10-04). Each tests one
   thing, on the homepage's dark system:

     P1 · Per page        — today's offer, made bigger: buy pages one at a
                            time or in a set; an optional $29 monthly check.
     P2 · By your data    — monthly plans where Search Console and live
                            research decide how many pages get made.
     P3 · Fewer, better   — the stance against autopilot SEO (dozens of AI
                            articles a month, traded links), then the plans.

   Every price here is a proposal to test, not a decision. The monthly
   report, Search Console connection, refreshes and AI-answer tracking
   don't exist in the builder yet. Competitors are never named.
   ================================================================ */

export const PRICING = [
  { key: "p1", name: "Per page", note: "Today’s one-page offer, plus sets of 3 and 6 and an optional $29 monthly check. Nothing monthly unless you want it." },
  { key: "p2", name: "By your data", note: "Monthly plans. Your Search Console and live research decide how many pages get made each month." },
  { key: "p3", name: "Fewer, better", note: "Leads with what we won’t do: no 30-pages-a-month, no traded links. Then the plans and a cleanup offer." },
] as const;
export type PricingKey = (typeof PRICING)[number]["key"];

const PAD = "px-6 sm:px-10 lg:px-24";
const SECTION = `${PAD} py-20 lg:py-[112px]`;
const H2 = "nh-display text-[clamp(36px,4.2vw,60px)] leading-[1.02]";
const RULE = "border-white/12";
const BTN = "flex h-[54px] items-center justify-center rounded-full bg-[#3D6BFF] px-7 text-[16px] font-semibold text-white transition-colors hover:bg-[#5A82FF]";
const BTN_GHOST = "flex h-[54px] items-center justify-center rounded-full border border-white/30 px-7 text-[16px] font-medium hover:border-white/60";
const EYEBROW = "nh-mono text-[11px] uppercase tracking-[0.16em] text-[#7D869C]";

const GOOGLE_SPAM = "https://developers.google.com/search/docs/essentials/spam-policies";
const GOOGLE_MARCH = "https://blog.google/products/search/google-search-update-march-2024/";

// ── Shared pieces ───────────────────────────────────────────────────────────

function Header() {
  return (
    <header className={`${PAD} relative z-10 flex h-20 items-center justify-between`}>
      <div className="flex items-center gap-4">
        <Logo tone="dark" className="text-[22px]" />
        <span className={`${EYEBROW} hidden sm:inline`}>Pricing</span>
      </div>
      <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 bg-[#04060B]/35 px-5 font-medium hover:border-white/60">
        Build my page
      </a>
    </header>
  );
}

function Hero({ eyebrow, title, sub, img, imgAlt, children }: { eyebrow: string; title: string; sub: string; img: string; imgAlt: string; children?: React.ReactNode }) {
  return (
    <section className={`${PAD} grid items-center gap-12 pb-16 pt-10 lg:grid-cols-12 lg:gap-14 lg:pb-24 lg:pt-16`}>
      <div className="flex flex-col gap-6 lg:col-span-7">
        <span className={EYEBROW}>{eyebrow}</span>
        <h1 className="nh-display text-[clamp(44px,5.6vw,84px)] leading-[0.98]">{title}</h1>
        <p className="max-w-[600px] text-[19px] leading-[1.6] text-[#C9D0E2]">{sub}</p>
        {children}
      </div>
      <figure className="flex flex-col gap-3 lg:col-span-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={imgAlt} className="aspect-[4/3] w-full rounded-[24px] border border-white/12 object-cover" />
        <figcaption className="text-[13px] text-[#7D869C]">Nora is an illustration, not a customer.</figcaption>
      </figure>
    </section>
  );
}

function Checks({ items, color }: { items: string[]; color?: string }) {
  return (
    <ul className="flex flex-col gap-2.5 text-[15.5px] text-[#C9D0E2]">
      {items.map((x) => (
        <li key={x} className="flex items-start gap-2.5"><span className="mt-[5px]"><Tick color={color} /></span>{x}</li>
      ))}
    </ul>
  );
}

const EVERY_PAGE = [
  "Live research on your market’s searches",
  "The full page, written and designed",
  "Your services, areas and prices, stated in text",
  "Title, description, and schema",
  "Ten checks, scored before you pay",
  "Publish to your own address, or download it",
];

function EveryPage() {
  return (
    <section className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
      <div className="flex flex-col gap-5 lg:col-span-5">
        <h2 className={H2}>Every page, on every plan.</h2>
        <p className="text-[17px] leading-[1.6] text-[#C9D0E2]">
          One page wins one search. It’s built the same way whether you buy one or fifty, and you own it either way.
        </p>
      </div>
      <ol className={`grid gap-x-10 border-t ${RULE} sm:grid-cols-2 lg:col-span-7`}>
        {EVERY_PAGE.map((x, i) => (
          <li key={x} className={`flex items-baseline gap-4 border-b ${RULE} py-5 text-[17px]`}>
            <span className="nh-mono text-[12px] text-[#FF6B5C]">0{i + 1}</span>{x}
          </li>
        ))}
      </ol>
    </section>
  );
}

function DoneForYou() {
  return (
    <section className={`${PAD} py-16`}>
      <div className="grid items-center gap-8 rounded-[28px] border border-white/12 bg-[#0A0F1E] p-8 sm:p-10 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-8">
          <span className={EYEBROW}>Done for you</span>
          <h2 className="nh-display text-[clamp(28px,3vw,40px)] leading-[1.05]">Rather have it all handled?</h2>
          <p className="max-w-[640px] text-[16.5px] leading-[1.6] text-[#C9D0E2]">
            Our team runs your pages, your Google Ads and the reporting, with one person you can call. From $1,500 a month, ad spend paid by you to Google. You own every account.
          </p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <a href="#" className={BTN_GHOST}>Book a 20-minute call</a>
        </div>
      </div>
    </section>
  );
}

type Faq = { q: string; a: string };
const FAQ_LINKS: Faq = {
  q: "Do you build backlinks?",
  a: "No. We don’t buy, trade, or automate links. Google’s spam policies count all three as link spam, and a site caught doing it can drop out of results. Good links come from real listings, partners and pages worth citing, and the page we build is made to be one of those.",
};
const FAQ_RANK: Faq = {
  q: "Will it rank? Can you guarantee it?",
  a: "No one can guarantee a ranking; Google decides. We can promise the work: a page built on real searches, scored on ten checks before you pay, that answers the questions buyers ask. Most pages take weeks to months to settle in Google.",
};
const FAQ_UNHAPPY: Faq = { q: "What if I don’t like the page?", a: `You see the whole page before you pay. After that: ${PRODUCT.satisfaction}` };

function PricingFaq({ title, items }: { title: string; items: Faq[] }) {
  return (
    <section id="faq" className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
      <h2 className="nh-display text-[clamp(32px,3.2vw,46px)] leading-[1.04] lg:col-span-4">{title}</h2>
      <div className={`flex flex-col border-t ${RULE} lg:col-span-7 lg:col-start-6`}>
        {items.map((f, i) => (
          <details key={f.q} className={`nh-faq group border-b ${RULE}`} open={i === 0}>
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

function Close({ line }: { line: string }) {
  return (
    <section className={`${SECTION} flex flex-col items-start gap-8 border-t ${RULE}`}>
      <h2 className="nh-display max-w-[860px] text-[clamp(44px,5.6vw,84px)] leading-[0.96]">Someone’s asking AI who to hire. Make the answer you.</h2>
      <div className="flex flex-wrap items-center gap-5">
        <a href={CREATE_URL} className={BTN}>Build my page free</a>
        <span className="text-[14.5px] text-[#C9D0E2]">{line}</span>
      </div>
    </section>
  );
}

export function PricingSwitcher({ current }: { current: PricingKey }) {
  return (
    <nav data-proto-ui className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0F1E]/90 p-1 text-[13px] shadow-2xl backdrop-blur">
      <Link href="/prototypes" className="hidden px-3 text-[#7D869C] hover:text-white sm:inline">Pricing</Link>
      {PRICING.map((p) => (
        <Link key={p.key} href={`/prototypes/pricing/${p.key}`} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${p.key === current ? "bg-[#3D6BFF] text-white" : "text-[#C9D0E2] hover:bg-white/10"}`}>
          {p.key.toUpperCase()}<span className="hidden sm:inline"> · {p.name}</span>
        </Link>
      ))}
    </nav>
  );
}

// ── Plans, shared by P2 and P3 ─────────────────────────────────────────────

type Plan = { id: string; name: string; price: string; per: string; blurb: string; items: string[]; cta: string; href: string; featured?: boolean; flag?: string };
const PLAN_ONE: Plan = {
  id: "one", name: "One page", price: PRICE_LABEL, per: "once", blurb: `Launch price, ${PRICE_AFTER_LAUNCH_LABEL} after. For the one search that matters most.`,
  items: ["Free preview, pay when you publish", "No subscription", "Yours to keep"], cta: "Build my page free", href: CREATE_URL,
};
const PLAN_GROWTH: Plan = {
  id: "growth", name: "Growth", price: "$299", per: "a month", blurb: "For one business that wants a page for each job it does.", featured: true, flag: "Recommended",
  items: ["Up to 3 new pages a month", "Picked from your Search Console and live research", "Pages that slip get refreshed", "A monthly report: clicks, calls, the next pages", "Unused pages roll over one month", "Cancel anytime"],
  cta: "Start with a free preview", href: CREATE_URL,
};
const PLAN_PRO: Plan = {
  id: "pro", name: "Pro", price: "$599", per: "a month", blurb: "For several locations, or a few clients’ sites.",
  items: ["Up to 8 new pages a month", "Everything in Growth", "Which AI answers name you, and who they name instead", "Up to 3 sites", "Your pages first in the queue"],
  cta: "Start with a free preview", href: CREATE_URL,
};
const PLAN_DFY: Plan = {
  id: "dfy", name: "Done for you", price: "$1,500+", per: "a month", blurb: "A person runs it with you: pages, Google Ads and reporting.",
  items: ["Everything in Pro", "Google Ads run for you (you pay Google directly)", "A weekly note and a monthly call", "3 months to start, then monthly"],
  cta: "Book a 20-minute call", href: "#",
};

function PlanCard({ p }: { p: Plan }) {
  return (
    <div className={`flex flex-col gap-5 rounded-[24px] border p-7 ${p.featured ? "border-[#3D6BFF]/60 bg-gradient-to-b from-[#12204A] to-[#0A0F1E]" : "border-white/12 bg-[#0A0F1E]"}`}>
      <div className="flex min-h-[26px] items-center justify-between gap-3">
        <span className="text-[16px] font-medium">{p.name}</span>
        {p.flag && <span className="rounded-full bg-[#3D6BFF]/20 px-2.5 py-1 text-[11.5px] text-[#9DB4FF]">{p.flag}</span>}
      </div>
      <span className="flex items-baseline gap-2.5">
        <span className="nh-display text-[56px] leading-none tracking-[-0.05em] tabular-nums">{p.price}</span>
        <span className="text-[14.5px] text-[#A0A9C0]">{p.per}</span>
      </span>
      <p className="min-h-[48px] text-[15px] leading-[1.55] text-[#A0A9C0]">{p.blurb}</p>
      <div className={`border-t ${RULE} pt-5`}><Checks items={p.items} /></div>
      <a href={p.href} className={`mt-auto ${p.featured ? BTN : BTN_GHOST}`}>{p.cta}</a>
    </div>
  );
}

// ── P1 · Per page ──────────────────────────────────────────────────────────

const SETS = [
  { n: "1 page", price: PRICE_LABEL, each: `${PRICE_AFTER_LAUNCH_LABEL} after launch`, fits: "The one search that matters most: your main service in your city." },
  { n: "3 pages", price: "$499", each: "$166 a page", fits: "Your main service and two more, or one service in three areas you cover.", featured: true },
  { n: "6 pages", price: "$899", each: "$150 a page", fits: "A page for each job you want more of. Or a few pages each for your clients." },
];

function P1() {
  return (
    <>
      <Hero
        eyebrow="Pay per page"
        title="Pay per page. Nothing monthly unless you want it."
        sub="Every page is free to preview, and you pay when you publish. Buy one, or buy a set when your research shows more searches worth winning."
        img="/home/nora-typing.webp"
        imgAlt="Nora the plumber at her laptop in the shop, building her page."
      />
      <section className={`${PAD} grid gap-5 pb-8 md:grid-cols-3`}>
        {SETS.map((s) => (
          <div key={s.n} className={`flex flex-col gap-5 rounded-[24px] border p-8 ${s.featured ? "border-[#3D6BFF]/60 bg-gradient-to-b from-[#12204A] to-[#0A0F1E]" : "border-white/12 bg-[#0A0F1E]"}`}>
            <span className="text-[16px] font-medium">{s.n}</span>
            <span className="nh-display text-[clamp(64px,6vw,88px)] leading-none tracking-[-0.05em] tabular-nums">{s.price}</span>
            <span className="text-[15px] text-[#9DB4FF]">{s.each}</span>
            <p className={`border-t ${RULE} pt-5 text-[15.5px] leading-[1.6] text-[#C9D0E2]`}>{s.fits}</p>
            <a href={CREATE_URL} className={`mt-auto ${s.featured ? BTN : BTN_GHOST}`}>Build my page free</a>
          </div>
        ))}
      </section>
      <p className={`${PAD} text-[14.5px] text-[#A0A9C0]`}>Pages in a set keep for 12 months, so you can use them as your research finds the next search worth winning.</p>

      <section className={`${SECTION} grid items-start gap-12 lg:grid-cols-12 lg:gap-14`}>
        <div className="flex flex-col gap-5 lg:col-span-6">
          <h2 className={H2}>What a page costs elsewhere.</h2>
          <dl className={`flex flex-col border-t ${RULE} text-[16.5px] text-[#C9D0E2]`}>
            {[["SEO agency, per page", "$300–$1,000"], ["Freelance SEO writer", "$175–$350"], ["AI visibility dashboard, tells you, doesn’t fix it", "$25–$500/mo"], ["SEOPage, in a set of 6", "$150"]].map(([k, v], i) => (
              <div key={k} className={`flex justify-between gap-4 border-b ${RULE} py-[18px] ${i === 3 ? "font-medium text-white" : ""}`}>
                <dt>{k}</dt><dd className="tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-5 rounded-[24px] border border-white/12 bg-[#0A0F1E] p-8 lg:col-span-5 lg:col-start-8">
          <span className={EYEBROW}>Optional add-on</span>
          <span className="flex items-baseline gap-2.5">
            <span className="nh-display text-[56px] leading-none tracking-[-0.05em]">$29</span>
            <span className="text-[14.5px] text-[#A0A9C0]">a month</span>
          </span>
          <h3 className="nh-display text-[26px] leading-[1.1] tracking-[-0.03em]">Watch your pages</h3>
          <p className="text-[15.5px] leading-[1.6] text-[#C9D0E2]">Once a month we check your pages on Google and in ChatGPT and Perplexity answers, and tell you which page to make next. Cancel anytime.</p>
          <a href={CREATE_URL} className={BTN_GHOST}>Add it after you publish</a>
        </div>
      </section>

      <EveryPage />
      <DoneForYou />
      <PricingFaq
        title="Fair questions before you spend $199."
        items={[
          { q: "Do I have to subscribe to anything?", a: "No. A page is paid for once and it’s yours. The $29 monthly check is optional, and you can cancel it anytime." },
          { q: "How do I use the rest of a set?", a: "After your first page, the builder shows the next searches worth winning from your research. Pick one and build it; the set covers it. Unused pages keep for 12 months." },
          { q: "Can I use a set across several sites, or for clients?", a: "Yes. One set can cover pages for several of your sites or your clients’ sites." },
          FAQ_LINKS,
          FAQ_RANK,
          FAQ_UNHAPPY,
        ]}
      />
      <Close line={`Free preview · ${PRICE_LABEL} a page · sets from $499`} />
    </>
  );
}

// ── P2 · By your data ──────────────────────────────────────────────────────

const QUEUE = [
  { q: "emergency plumber denver", vol: "3,600", now: "Not in the top 20", why: "ChatGPT names two other plumbers for this question.", act: "New page", tone: "#FF6B5C" },
  { q: "drain cleaning denver", vol: "2,400", now: "14th", why: "Just off page one; the top 5 answer pricing and you don’t.", act: "Refresh", tone: "#9DB4FF" },
  { q: "water heater repair denver", vol: "1,300", now: "No page", why: "Searched every month, and you don’t have a page for it.", act: "New page", tone: "#FF6B5C" },
  { q: "sump pump installation denver", vol: "210", now: "No page", why: "Too few searches to be worth a page yet.", act: "Skipped", tone: "#7D869C" },
];

function DataDecides() {
  return (
    <section className={`${SECTION} grid gap-12 bg-[#0A0F1E] lg:grid-cols-12 lg:gap-14`}>
      <div className="flex flex-col gap-5 lg:col-span-4">
        <h2 className={H2}>How many pages? Your data decides.</h2>
        <p className="text-[17px] leading-[1.6] text-[#C9D0E2]">
          Each month we read your Search Console and research your market, then make only the pages worth making. Some months that’s three. Some months it’s one, and the rest roll over.
        </p>
      </div>
      <div className="flex flex-col lg:col-span-8">
        <div className="flex items-baseline justify-between gap-4 pb-3">
          <span className={EYEBROW}>Nora’s plumbing, Denver · this month</span>
          <span className="text-[13px] text-[#7D869C]">Example. Your searches come from live data.</span>
        </div>
        <ol className={`flex flex-col border-t ${RULE}`}>
          {QUEUE.map((r) => (
            <li key={r.q} className={`grid gap-2 border-b ${RULE} py-5 sm:grid-cols-[1fr_auto] sm:gap-6`}>
              <div className="flex flex-col gap-1.5">
                <span className="text-[18px] font-medium">“{r.q}”</span>
                <span className="text-[14.5px] text-[#A0A9C0]"><span className="tabular-nums">{r.vol}</span> searches a month · you: {r.now}</span>
                <span className="text-[15px] text-[#C9D0E2]">{r.why}</span>
              </div>
              <span className="nh-mono self-start text-[12px] uppercase tracking-[0.12em]" style={{ color: r.tone }}>{r.act}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MonthlyReport() {
  const tiles = [
    { k: "Clicks from Google", v: "312", d: "240 a month before" },
    { k: "Calls and forms from your pages", v: "18", d: "counted on your site" },
    { k: "Named in AI answers", v: "4 of 12", d: "questions we ask each week" },
    { k: "Next pages", v: "3", d: "ready to build" },
  ];
  return (
    <section className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
      <div className="flex flex-col gap-5 lg:col-span-4">
        <h2 className={H2}>One report a month, in plain numbers.</h2>
        <p className="text-[17px] leading-[1.6] text-[#C9D0E2]">What your pages brought in, against what you had before. If a page isn’t earning, the report says so, and says what we’ll change.</p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-[24px] border border-white/12 bg-white/12 sm:grid-cols-2 lg:col-span-8">
        {tiles.map((t) => (
          <div key={t.k} className="flex flex-col gap-2 bg-[#04060B] p-7">
            <span className="text-[15px] text-[#A0A9C0]">{t.k}</span>
            <span className="nh-display text-[52px] leading-none tracking-[-0.05em] text-[#9DB4FF] tabular-nums">{t.v}</span>
            <span className="text-[13.5px] text-[#7D869C]">{t.d}</span>
          </div>
        ))}
        <p className="bg-[#04060B] p-5 text-[13px] text-[#7D869C] sm:col-span-2">Example report. Numbers are illustrative.</p>
      </div>
    </section>
  );
}

const MONTHLY_FAQ: Faq[] = [
  { q: "Can I cancel anytime?", a: "Yes. Plans are monthly, with no contract. The pages we made are yours either way." },
  { q: "What if my data shows fewer pages than my plan?", a: "We make fewer, and the rest roll over one month. We never make a page just to fill a quota; a page nobody searches for is wasted, and too many thin pages can hurt a site." },
  { q: "Do I need Search Console?", a: "No, but it helps. Without it we research your market from scratch. With it, we also see what you already rank for and which pages are slipping. We only ever ask to read it." },
  FAQ_LINKS,
  FAQ_RANK,
  FAQ_UNHAPPY,
];

function P2() {
  return (
    <>
      <Hero
        eyebrow="Plans"
        title="Plans that make the pages your data earns."
        sub="Tell us about your business and connect Search Console. Each month we make the pages your searches show are worth winning, keep the ones you have from slipping, and show you what they brought in."
        img="/home/nora-proud.webp"
        imgAlt="Nora the plumber, proud, in front of her shop."
      />
      <section className={`${PAD} grid gap-5 pb-6 md:grid-cols-2 xl:grid-cols-4`}>
        {[PLAN_ONE, PLAN_GROWTH, PLAN_PRO, PLAN_DFY].map((p) => <PlanCard key={p.id} p={p} />)}
      </section>
      <p className={`${PAD} pb-4 text-[14.5px] text-[#A0A9C0]`}>Every plan starts with a free preview of your first page. No card until you publish.</p>
      <DataDecides />
      <MonthlyReport />
      <EveryPage />
      <PricingFaq title="Fair questions before you subscribe." items={MONTHLY_FAQ} />
      <Close line="Free preview · plans from $299 a month · cancel anytime" />
    </>
  );
}

// ── P3 · Fewer, better ─────────────────────────────────────────────────────

const VERSUS = [
  ["How many pages", "20 to 30 a month, every month", "Only the searches your data shows are worth it"],
  ["Who picks the topics", "A keyword tool", "Your Search Console, your market, your services"],
  ["What’s on the page", "General text about the topic", "Your services, areas, prices, and the questions your customers ask"],
  ["Links", "Traded between customers’ sites", "None bought, traded, or automated"],
  ["Before it goes live", "Published automatically", "Ten checks, and you see it first"],
  ["Price", "$49 to $99 a month", `From ${PRICE_LABEL} a page, or $299 a month`],
];

function Versus() {
  return (
    <section className={`${SECTION} flex flex-col gap-10`}>
      <h2 className={`${H2} max-w-[900px]`}>Two ways to buy SEO pages.</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-[16px]">
          <thead>
            <tr className={`border-b ${RULE}`}>
              <th className="w-[22%] py-4 font-normal text-[#7D869C]" />
              <th className="w-[36%] py-4 pr-6 text-[15px] font-medium text-[#A0A9C0]">Autopilot SEO</th>
              <th className="w-[42%] py-4 text-[15px] font-medium text-white"><span className="inline-flex items-center gap-3"><Logo tone="dark" className="text-[19px]" /></span></th>
            </tr>
          </thead>
          <tbody>
            {VERSUS.map(([k, a, b]) => (
              <tr key={k} className={`border-b ${RULE} align-top`}>
                <th scope="row" className="py-5 pr-6 font-normal text-[#7D869C]">{k}</th>
                <td className="py-5 pr-6 text-[#A0A9C0]">{a}</td>
                <td className="py-5 text-[#EEF2FF]">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function GoogleSays() {
  const quotes = [
    { label: "Scaled content abuse", q: "Using generative AI tools or other similar tools to generate many pages without adding value for users." },
    { label: "Link spam", q: "Excessive link exchanges … Using automated programs or services to create links to your site." },
    { label: "What happens", q: "Sites that violate our policies may rank lower in results or not appear in results at all." },
  ];
  return (
    <section className={`${SECTION} grid gap-12 bg-[#0A0F1E] lg:grid-cols-12 lg:gap-14`}>
      <div className="flex flex-col gap-5 lg:col-span-4">
        <h2 className={H2}>Google has a name for it.</h2>
        <p className="text-[17px] leading-[1.6] text-[#C9D0E2]">Pages made in bulk and links traded between sites are both in Google’s spam policies, word for word.</p>
        <div className="mt-4 flex flex-col gap-2">
          <span className="nh-display text-[clamp(52px,5vw,72px)] font-medium leading-none text-[#FF6B5C]">45%</span>
          <span className="text-[16px] leading-[1.5] text-[#C9D0E2]">less low-quality, unoriginal content in Google’s results after its March 2024 update.</span>
          <a href={GOOGLE_MARCH} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#7D869C] underline-offset-2 hover:underline">Google, 2024</a>
        </div>
      </div>
      <ul className={`flex flex-col border-t ${RULE} lg:col-span-7 lg:col-start-6`}>
        {quotes.map((x) => (
          <li key={x.label} className={`flex flex-col gap-3 border-b ${RULE} py-7`}>
            <span className="nh-mono text-[12px] uppercase tracking-[0.14em] text-[#9DB4FF]">{x.label}</span>
            <blockquote className="nh-display text-[clamp(22px,2vw,28px)] leading-[1.25] tracking-[-0.02em]">“{x.q}”</blockquote>
          </li>
        ))}
        <li className="pt-5">
          <a href={GOOGLE_SPAM} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#9DB4FF] underline underline-offset-2">Google Search Central: spam policies</a>
        </li>
      </ul>
    </section>
  );
}

function WontDo() {
  const items = [
    ["Buy, trade, or automate links", "Not for you, not between our customers."],
    ["Make a page to fill a quota", "If your data shows one page worth making this month, you get one."],
    ["Publish a page you haven’t seen", "You preview every page, and it passes ten checks first."],
    ["Promise a ranking", "Google decides. We promise the work, and report what it earns."],
  ];
  return (
    <section className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
      <h2 className={`${H2} lg:col-span-4`}>What we won’t do.</h2>
      <ul className={`grid border-t ${RULE} sm:grid-cols-2 lg:col-span-8`}>
        {items.map(([t, d]) => (
          <li key={t} className={`flex flex-col gap-2 border-b ${RULE} py-6 sm:pr-8`}>
            <span className="flex items-center gap-3 text-[18px] font-medium">
              <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full border border-[#FF6B5C]/60 text-[13px] text-[#FF6B5C]">✕</span>{t}
            </span>
            <span className="pl-9 text-[15.5px] leading-[1.55] text-[#A0A9C0]">{d}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cleanup() {
  return (
    <section className={`${PAD} pb-16`}>
      <div className="grid items-center gap-8 rounded-[28px] border border-[#FF6B5C]/35 bg-[#0A0F1E] p-8 sm:p-10 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-8">
          <span className={EYEBROW}>Already tried autopilot SEO?</span>
          <h2 className="nh-display text-[clamp(28px,3vw,40px)] leading-[1.05]">Site cleanup, $399 once.</h2>
          <p className="max-w-[640px] text-[16.5px] leading-[1.6] text-[#C9D0E2]">
            We find the thin pages to merge or remove, check your links for trouble, and plan the few pages worth keeping and rebuilding. You get the plan in writing; the rebuild can be part of any plan.
          </p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <a href="#" className={BTN_GHOST}>Get a site cleanup</a>
        </div>
      </div>
    </section>
  );
}

function P3() {
  return (
    <>
      <Hero
        eyebrow="Fewer, better pages"
        title="We won’t sell you 30 pages a month."
        sub="Some SEO tools publish dozens of AI articles a month and trade links between their customers’ sites. Google’s spam policies describe both. We make fewer pages, from your own data, with nothing that puts your site at risk."
        img="/home/nora-surprised.webp"
        imgAlt="Nora the plumber, surprised, reading her phone in the shop."
      >
        <div className="flex flex-wrap items-center gap-5 pt-2">
          <a href="#plans" className={BTN}>See the plans</a>
          <span className="text-[14.5px] text-[#C9D0E2]">From {PRICE_LABEL} a page · free preview</span>
        </div>
      </Hero>
      <Versus />
      <GoogleSays />
      <section id="plans" className={`${SECTION} flex flex-col gap-10`}>
        <div className="flex flex-col gap-4">
          <h2 className={H2}>Fewer pages. Each one earns its place.</h2>
          <p className="max-w-[640px] text-[17px] leading-[1.6] text-[#C9D0E2]">Monthly plans make up to a number of pages, never a quota. When your data shows fewer worth making, you get fewer and the rest roll over.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[PLAN_ONE, { ...PLAN_GROWTH, flag: "Usually fewer, at first" }, PLAN_PRO].map((p) => <PlanCard key={p.id} p={p} />)}
        </div>
      </section>
      <Cleanup />
      <WontDo />
      <DoneForYou />
      <PricingFaq
        title="Fair questions, after the last tool."
        items={[
          FAQ_LINKS,
          { q: "Isn’t more pages better?", a: "Only if each one is useful. Google’s March 2024 update cut low-quality, unoriginal content in its results by 45%, and its spam policies name pages made in bulk to rank. One page that answers a real search well does more than ten that repeat each other." },
          { q: "I used an autopilot tool. Is my site in trouble?", a: "Not necessarily. Start with the cleanup: we look at which pages get any search traffic, which repeat each other, and where your links come from, then tell you what to keep, merge or remove." },
          ...MONTHLY_FAQ.slice(0, 2),
          FAQ_RANK,
        ]}
      />
      <Close line={`Free preview · ${PRICE_LABEL} a page · plans from $299 a month`} />
    </>
  );
}

export function PricingProto({ v }: { v: PricingKey }) {
  return (
    <>
      <Header />
      {v === "p1" ? <P1 /> : v === "p2" ? <P2 /> : <P3 />}
    </>
  );
}
