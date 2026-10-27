import type { Metadata } from "next";
import { DarkFooter } from "@/components/DarkFooter";
import { Logo } from "@/components/Logo";
import { Tick } from "@/components/home/HeroAnswer";
import { funnelDisplay, funnelSans } from "@/components/home/fonts";
import { PlanGrid } from "@/components/pricing/PlanGrid";
import { BOOK_CALL_URL, CREATE_URL } from "@/lib/config";
import {
  ADD_ONS, BY_THE_PAGE, COMPARE, CREDIT_PACKS, CREDIT_USES, FITS, MANAGED_PILOT, NEVER_A_CREDIT, PLANS, REFUND_DAYS, perPage, plan, usd,
} from "@/lib/plans";

/* ================================================================
   /pricing: the shop (2026-10-27). Monthly first: SEOPage (switched off
   until it's built, with Google Ads as an add-on) and Managed (book a
   call). Then pages by the page: one today, bundles once checkout sells
   them. Not indexed, not in the sitemap and not linked from anywhere
   until SEOPage goes live. Data: lib/plans.ts.
   ================================================================ */

export const metadata: Metadata = {
  title: { absolute: "Pricing | SEOPage" },
  description: "One page today. Monthly plans for local service businesses, coming soon.",
  robots: { index: false, follow: false },
};

const PAD = "px-6 sm:px-10 lg:px-24";
const SECTION = `${PAD} py-20 lg:py-[104px]`;
const H2 = "nh-display text-[clamp(34px,4vw,56px)] leading-[1.02]";
const RULE = "border-white/12";
const LEAD = "text-[17px] leading-[1.6] text-[#C9D0E2]";

export default function PricingPage() {
  return (
    <div className={`nh ${funnelDisplay.variable} ${funnelSans.variable} min-h-screen`}>
      <header className={`${PAD} flex h-20 items-center justify-between`}>
        <Logo tone="dark" className="text-[22px]" />
        <a href={CREATE_URL} className="flex h-11 items-center rounded-[10px] border border-white/30 px-5 font-medium hover:border-white/60">
          Build my page
        </a>
      </header>

      {/* Hero and the four plans */}
      <section className={`${PAD} flex flex-col gap-12 pb-20 pt-10 lg:pt-16`}>
        <div className="flex max-w-[760px] flex-col gap-5">
          <h1 className="nh-display text-[clamp(42px,5.4vw,80px)] leading-[0.98]">Pages that keep coming, every month.</h1>
          <p className="text-[19px] leading-[1.6] text-[#C9D0E2]">
            A monthly plan adds new pages from your own Search Console, rewrites the ones that slip, and shows you which AI answers name you. Need just one page? Buy it by the page.
          </p>
        </div>
        <PlanGrid />
        <p className="text-[14px] text-[#7D869C]">
          Monthly plans: cancel anytime, {REFUND_DAYS} days’ money back on your first month. Ad spend is paid by you to Google, never through us.
        </p>
      </section>

      <ByThePage />
      <Compare />
      <Fits />
      <ManagedPilot />
      <Credits />
      <Faq />

      <DarkFooter note="SEOPage and its Google Ads add-on are coming soon; prices may change before they open." />
    </div>
  );
}

/** One landing page, or a bundle, paid once. Secondary to the plans, and always dearer a page. */
function ByThePage() {
  return (
    <section id="by-the-page" className={`${SECTION} grid gap-12 border-t ${RULE} lg:grid-cols-12 lg:gap-14`}>
      <div className="flex flex-col gap-5 lg:col-span-4">
        <h2 className={H2}>Or buy by the page.</h2>
        <p className={LEAD}>For one landing page to send people to, or a few, with no plan. Each page is built and checked the same way.</p>
        <ul className="flex flex-col gap-2.5 text-[15.5px] text-[#C9D0E2]">
          {BY_THE_PAGE.includes.map((x) => <li key={x} className="flex items-start gap-2.5"><span className="mt-[5px]"><Tick /></span>{x}</li>)}
        </ul>
      </div>
      <div className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
        {BY_THE_PAGE.options.map((o) => (
          <div key={o.pages} className={`flex flex-col gap-4 rounded-[20px] border ${RULE} bg-[#0A0F1E] p-6`}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[17px] font-semibold">{o.pages === 1 ? "1 page" : `${o.pages} pages`}</h3>
              {o.status === "coming" && <span className="text-[13px] text-[#7D869C]">Coming soon</span>}
            </div>
            <div className="flex flex-col gap-1">
              <span className="nh-display text-[44px] leading-none tracking-[-0.05em] tabular-nums">{usd(o.price)}</span>
              <span className="text-[13.5px] text-[#7D869C]">{o.pages === 1 ? "once" : `${usd(perPage(o))} a page, once`}</span>
            </div>
            <p className="flex-1 text-[15px] leading-[1.55] text-[#C9D0E2]">{o.fits}</p>
            {o.status === "live" && o.cta.href ? (
              <a href={o.cta.href} className="flex h-[48px] items-center justify-center rounded-[10px] bg-[#3D6BFF] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#5A82FF]">{o.cta.label}</a>
            ) : (
              <button disabled className="flex h-[48px] cursor-not-allowed items-center justify-center rounded-[10px] border border-white/15 px-5 text-[15px] font-medium text-[#7D869C]">{o.cta.label}</button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Every limit, plan by plan. */
function Compare() {
  return (
    <section className={`${SECTION} flex flex-col gap-10 bg-[#0A0F1E]`}>
      <h2 className={H2}>Side by side.</h2>
      <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-[15.5px]">
          <thead>
            <tr className={`border-b ${RULE}`}>
              <th className="w-[28%] py-4 pr-6 font-normal text-[#7D869C]"><span className="sr-only">Feature</span></th>
              {PLANS.map((p) => (
                <th key={p.id} className="py-4 pr-6 font-semibold">
                  {p.name}
                  <span className="block text-[13.5px] font-normal text-[#A0A9C0]">{usd(p.price)} a month</span>
                </th>
              ))}
              <th className="py-4 pr-6 font-semibold">
                By the page
                <span className="block text-[13.5px] font-normal text-[#A0A9C0]">{usd(BY_THE_PAGE.options[0].price)} a page, once</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.label} className={`border-b ${RULE}`}>
                <th scope="row" className="py-4 pr-6 font-normal text-[#C9D0E2]">{row.label}</th>
                {[...PLANS.map((p) => ({ id: p.id as string, limits: p.limits })), { id: "page", limits: BY_THE_PAGE.limits }].map((c) => {
                  const v = row.label === "New pages" && c.id === "page" ? "1, 3 or 6" : row.value(c.limits);
                  return <td key={c.id} className={`py-4 pr-6 ${v === "—" ? "text-[#4A5268]" : ""}`}>{v}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** Which plan fits, in the owner's own words. */
function Fits() {
  return (
    <section className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
      <div className="flex flex-col gap-5 lg:col-span-4">
        <h2 className={H2}>Which one is you?</h2>
        <p className={LEAD}>Every plan starts with a free preview of your first page.</p>
      </div>
      <dl className={`flex flex-col border-t ${RULE} lg:col-span-8`}>
        {FITS.map((f) => (
          <div key={f.who} className={`grid gap-1 border-b ${RULE} py-5 sm:grid-cols-[1fr_220px] sm:gap-8`}>
            <dt className="text-[17px] leading-[1.5]">“{f.who}”</dt>
            <dd className="sm:text-right"><a href={f.href} className="text-[16px] text-[#9DB4FF] underline-offset-2 hover:underline">{f.label}</a></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Managed opens as a capped pilot at a founding price. */
function ManagedPilot() {
  const m = plan("managed");
  const split = [
    ["We do", ["Pick the pages from your data, build them and keep them current", "Keep your Google Business Profile up to date", "Run your Google Ads inside your budget", "Send a written plan and talk it through each month"]],
    ["You do", ["Say yes to each page before it goes live", "Approve any change to your ad budget", "Send the photos only you can take: your team, your vans, your work"]],
  ] as const;
  return (
    <section className={`${SECTION} grid gap-12 bg-[#0A0F1E] lg:grid-cols-12 lg:gap-14`}>
      <div className="flex flex-col gap-5 lg:col-span-4">
        <h2 className={H2}>Managed, for the first {MANAGED_PILOT.places}.</h2>
        <p className={LEAD}>
          {usd(m.price)} a month for the first {MANAGED_PILOT.places} businesses, held for a year. It starts as a {MANAGED_PILOT.days}-day pilot, then runs month to month. After that, new businesses pay {usd(MANAGED_PILOT.list)}.
        </p>
        <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="flex h-[50px] w-fit items-center rounded-[10px] bg-[#3D6BFF] px-6 text-[15.5px] font-semibold text-white transition-colors hover:bg-[#5A82FF]">
          Book a call
        </a>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
        {split.map(([k, items]) => (
          <div key={k} className={`flex flex-col gap-4 rounded-[20px] border ${RULE} bg-[#04060B] p-7`}>
            <h3 className="text-[17px] font-semibold">{k}</h3>
            <ul className="flex flex-col gap-2.5 text-[15.5px] text-[#C9D0E2]">
              {items.map((x) => <li key={x} className="flex items-start gap-2.5"><span className="mt-[5px]"><Tick /></span>{x}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Credits, packs and add-ons. */
function Credits() {
  return (
    <section className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
      <div className="flex flex-col gap-5 lg:col-span-4">
        <h2 className={H2}>When you want more.</h2>
        <p className={LEAD}>
          Monthly plans include credits for trying more versions or swapping images. Monthly credits reset; credits you buy never expire.
        </p>
      </div>
      <div className="flex flex-col gap-10 lg:col-span-8">
        <dl className={`flex flex-col border-t ${RULE}`}>
          {[...CREDIT_USES.map((c) => ({ k: c.what, v: c.credits, n: "" })), ...ADD_ONS.map((a) => ({ k: a.what, v: a.price, n: a.note }))].map((r) => (
            <div key={r.k} className={`flex justify-between gap-6 border-b ${RULE} py-[18px] text-[16px]`}>
              <dt className="text-[#C9D0E2]">{r.k}{r.n && <span className="block text-[13.5px] text-[#7D869C]">{r.n}</span>}</dt>
              <dd className="shrink-0 tabular-nums">{r.v}</dd>
            </div>
          ))}
        </dl>
        <div className="grid gap-4 sm:grid-cols-3">
          {CREDIT_PACKS.map((p) => (
            <div key={p.credits} className={`flex flex-col gap-1 rounded-[16px] border ${RULE} bg-[#0A0F1E] p-5`}>
              <span className="text-[15px] text-[#A0A9C0]">{p.credits} credits</span>
              <span className="nh-display text-[38px] leading-none tracking-[-0.04em] tabular-nums">{usd(p.price)}</span>
              <span className="text-[13px] text-[#7D869C]">{Math.round((p.price / p.credits) * 100)}¢ a credit</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[16px] font-semibold">Never costs a credit</h3>
          <ul className="flex flex-col gap-2.5 text-[15.5px] text-[#C9D0E2]">
            {NEVER_A_CREDIT.map((x) => <li key={x} className="flex items-start gap-2.5"><span className="mt-[5px]"><Tick /></span>{x}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Will it rank? Can you guarantee it?",
    a: "No one can guarantee a ranking; Google decides. We can promise the work: pages built on the searches you already show up for, checked before they go live, that answer what buyers ask. Most pages take weeks to months to settle in Google.",
  },
  {
    q: "Do you build backlinks?",
    a: "No. We don’t buy, trade or automate links. Google’s spam policies count all three as link spam. Good links come from real listings, partners and pages worth citing.",
  },
  {
    q: "Why not 30 articles a month?",
    a: "A blog post rarely gets a plumber a phone call. A page about the job you do, in the city you do it, can. We make fewer pages, each aimed at a search that brings calls, and Google’s own guidance warns against pages made in bulk without adding value.",
  },
  {
    q: "Who owns the pages if I cancel?",
    a: "You do. Every page is yours to keep, publish anywhere or download, on every plan and by the page.",
  },
  {
    q: "When does SEOPage open?",
    a: "They’re being built now. Start with one page today; it’s the same builder the plans use. Managed is open now to the first 10 businesses: book a call.",
  },
];

function Faq() {
  return (
    <section className={`${SECTION} grid gap-12 border-t ${RULE} lg:grid-cols-12 lg:gap-14`}>
      <h2 className="nh-display text-[clamp(30px,3.2vw,44px)] leading-[1.04] lg:col-span-4">Questions before you pick.</h2>
      <div className={`flex flex-col border-t ${RULE} lg:col-span-7 lg:col-start-6`}>
        {FAQS.map((f, i) => (
          <details key={f.q} className={`nh-faq group border-b ${RULE}`} open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-[18px] font-medium">
              <h3 className="font-medium">{f.q}</h3>
              <span className="nh-plus shrink-0 text-[26px] font-light text-[#A0A9C0] transition-transform" aria-hidden>+</span>
            </summary>
            <p className="pb-6 pr-12 text-[16px] leading-[1.65] text-[#C9D0E2]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
