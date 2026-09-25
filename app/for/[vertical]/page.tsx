import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DarkFooter } from "@/components/DarkFooter";
import { JsonLd } from "@/components/JsonLd";
import { BuilderDemo } from "@/components/home/BuilderDemo";
import { PersonalizeProvider } from "@/components/home/Personalize";
import { funnelDisplay, funnelSans } from "@/components/home/fonts";
import {
  aOr,
  Blueprint,
  Cta,
  H2,
  PAD,
  PriceCard,
  Query,
  SECTION,
  TradeHeader,
  Transcript,
  tradeWord,
} from "@/components/trade/parts";
import { FAQS } from "@/lib/homeContent";
import { PRICE_LABEL, PRICE_USD } from "@/lib/config";
import { VERTICALS, getVertical, tradePath } from "@/lib/verticals";

/* ================================================================
   One template, one data file, N industry pages, at /for/<trade>. The
   homepage's dark system and offer (build free, pay to publish): an AI
   answer naming a competitor → the searches that pay → the builder
   replayed for this trade → what the page must prove, drawn → why the
   competition is beatable → price → FAQ → close.

   dynamicParams = false means anything not in VERTICALS 404s instead of
   rendering an empty industry page.
   ================================================================ */

export const dynamicParams = false;

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical } = await params;
  const v = getVertical(vertical);
  if (!v) return {};
  return {
    title: { absolute: `${v.title} | SEOPage` },
    description: v.description,
    alternates: { canonical: tradePath(v.slug) },
    openGraph: {
      title: v.title,
      description: v.description,
      url: `https://seopage.com${tradePath(v.slug)}`,
      siteName: "SEOPage",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: v.title,
      description: v.description,
    },
  };
}

/**
 * Asked on every industry page. Answered by the homepage's own FAQ entries,
 * so the offer can never say two different things; the build fails if one
 * of these questions is renamed there.
 */
const SHARED_QUESTIONS = [
  `What exactly do I get for ${PRICE_LABEL}?`,
  "Do I need a website? How do I publish it?",
  "What if I don't like the page?",
];
const SHARED_FAQS = SHARED_QUESTIONS.map((q) => {
  const f = FAQS.find((x) => x.q === q);
  if (!f) throw new Error(`Trade pages share the homepage FAQ "${q}", which no longer exists.`);
  return f;
});

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const v = getVertical(vertical);
  if (!v) notFound();

  const faqs = [...v.faqs, ...SHARED_FAQS];
  const word = tradeWord(v);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://seopage.com${tradePath(v.slug)}#service`,
        serviceType: v.primaryKeyword,
        name: `${v.primaryKeyword} landing page, built with AI`,
        provider: { "@id": "https://seopage.com/#organization" },
        description: v.description,
        offers: {
          "@type": "Offer",
          price: `${PRICE_USD}.00`,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `https://seopage.com${tradePath(v.slug)}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://seopage.com${tradePath(v.slug)}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SEOPage", item: "https://seopage.com" },
          { "@type": "ListItem", position: 2, name: v.primaryKeyword, item: `https://seopage.com${tradePath(v.slug)}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `https://seopage.com${tradePath(v.slug)}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className={`nh ${funnelDisplay.variable} ${funnelSans.variable} min-h-screen`}>
      <JsonLd data={schema} />
      <main>
        {/* HERO: the trade's most urgent search, answered with someone else */}
        <section className="relative overflow-hidden" style={{ background: "radial-gradient(50% 60% at 85% 30%, rgba(255,90,74,.12), transparent 70%)" }}>
          <TradeHeader v={v} />
          <div className={`${PAD} grid items-center gap-14 pb-24 pt-14 lg:grid-cols-12 lg:pt-20`}>
            <div className="flex flex-col gap-7 lg:col-span-7">
              <h1 className="text-[18px] font-medium text-[#FF8A7D]">{v.primaryKeyword}</h1>
              <p className="nh-display text-[clamp(44px,5.4vw,82px)] leading-[0.97]">
                {v.headline.lead} <span className="text-[#7D869C]">{v.headline.loss}</span>
              </p>
              <p className="max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-[#C9D0E2]">
                One page, built to win the search {v.plural}&apos; customers type when they&apos;re ready, and to be the name an AI assistant gives.
              </p>
              <Cta v={v} />
            </div>
            <div className="lg:col-span-5">
              <Transcript v={v} />
            </div>
          </div>
        </section>

        {/* THE SEARCHES */}
        <section className={`${SECTION} border-t border-white/12`}>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className={`${H2} max-w-[760px]`}>Typed in your market right now.</h2>
            <p className="max-w-[420px] text-[18px] leading-[1.6] text-[#C9D0E2]">Every one of them has an answer today. The only question is whose page it is.</p>
          </div>
          <ul className="mt-14 border-t border-white/12">
            {v.searches.map((q) => (
              <li key={q} className="grid items-baseline gap-2 border-b border-white/12 py-6 md:grid-cols-[1fr_260px]">
                <span className="nh-display text-[clamp(24px,2.6vw,38px)] leading-[1.1] tracking-[-0.035em]">
                  <Query q={q} />
                </span>
                <span className="text-[15px] text-[#FF8A7D] md:text-right">Answer names: someone else</span>
              </li>
            ))}
          </ul>
        </section>

        {/* THE PAGE, BUILT: the real builder, replayed for this trade */}
        <section className={`${SECTION} flex flex-col gap-12 bg-[#0A0F1E]`}>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className={`${H2} max-w-[760px]`}>
              Here&apos;s {aOr(word)} {word} page, built.
            </h2>
            <p className="max-w-[460px] text-[18px] leading-[1.6] text-[#C9D0E2]">
              The real builder, replayed for {v.replay.example.name} in {v.replay.example.city}: live research, the page written and designed, ten checks scored before you pay. Yours uses your business and your city.
            </p>
          </div>
          <PersonalizeProvider
            defaults={{
              service: v.replay.service,
              demoName: v.replay.example.name,
              demoService: v.replay.example.service,
              demoCity: v.replay.example.city,
            }}
          >
            <BuilderDemo trade={v.replay.trade} />
          </PersonalizeProvider>
          <p className="text-[14px] text-[#7D869C]">
            The builder&apos;s screens, replayed. {v.replay.example.name} is an example business. Search volumes are illustrative; yours come from live data.
          </p>
        </section>

        {/* WHAT THE PAGE MUST PROVE, drawn onto the page */}
        <section className={SECTION}>
          <h2 className={`${H2} max-w-[900px]`}>Every claim a buyer needs, placed where it gets read.</h2>
          <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-[#C9D0E2]">
            What {aOr(v.primaryKeyword)} {v.primaryKeyword} page has to say in plain text before anyone calls, and where each one goes.
          </p>
          <div className="mt-14">
            <Blueprint v={v} />
          </div>
        </section>

        {/* WHY THE PAGES ABOVE YOU ARE BEATABLE */}
        <section className={`${SECTION} grid gap-12 bg-[#0A0F1E] lg:grid-cols-12`}>
          <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02] lg:col-span-5">The {v.plural} above you are beatable.</h2>
          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            <ul className="flex flex-col border-t border-white/12">
              {v.failings.map((f) => (
                <li key={f} className="flex gap-4 border-b border-white/12 py-5 text-[17px] leading-[1.55] text-[#C9D0E2]">
                  <span className="mt-[0.1em] text-[20px] leading-none text-[#FF6B5C]" aria-hidden>
                    ✕
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-[18px] leading-[1.6]">None of that is a marketing problem. It&apos;s a page problem, and a page is a thing you can replace this afternoon.</p>
          </div>
        </section>

        {/* PRICE */}
        <section id="price" className={`${SECTION} grid items-center gap-12 lg:grid-cols-12`}>
          <div className="flex flex-col gap-6 lg:col-span-6">
            <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02]">One page. One search. Once.</h2>
            <p className="max-w-[520px] text-[18px] leading-[1.6] text-[#C9D0E2]">No retainer, no dashboard, no contract. See the whole page before you pay a cent.</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <PriceCard v={v} />
          </div>
        </section>

        {/* FAQ: visible, and mirrored 1:1 into FAQPage schema above */}
        <section id="faq" className={`${SECTION} grid gap-12 bg-[#0A0F1E] lg:grid-cols-12 lg:gap-14`}>
          <h2 className="nh-display text-[clamp(34px,3.4vw,48px)] leading-[1.04] lg:col-span-4">{v.primaryKeyword}, explained.</h2>
          <div className="flex flex-col border-t border-white/12 lg:col-span-7 lg:col-start-6">
            {faqs.map((f, i) => (
              <details key={f.q} className="nh-faq group border-b border-white/12" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-[19px] font-medium">
                  <h3 className="font-medium">{f.q}</h3>
                  <span className="nh-plus shrink-0 text-[26px] font-light text-[#A0A9C0] transition-transform" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-[16.5px] leading-[1.65] text-[#C9D0E2]">{f.a}</p>
              </details>
            ))}
            <p className="pt-8 text-[14px] text-[#A0A9C0]">
              Have a page already?{" "}
              <Link href="/audit" className="underline underline-offset-2 hover:text-white">
                Get a free SEO page audit
              </Link>{" "}
              or read{" "}
              <Link href="/rank" className="underline underline-offset-2 hover:text-white">
                rank¹, the journal
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CLOSE */}
        <section className={`${SECTION} border-t border-white/12 text-center`}>
          <h2 className="nh-display mx-auto max-w-[900px] text-[clamp(44px,6vw,92px)] leading-[0.95]">Someone&apos;s asking who to call. Make the answer you.</h2>
          <div className="mt-10 flex justify-center">
            <Cta v={v} center />
          </div>
        </section>
      </main>
      <DarkFooter />
    </div>
  );
}
