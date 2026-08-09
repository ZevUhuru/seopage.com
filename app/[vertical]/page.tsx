import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { BuyButton } from "@/components/BuyButton";
import { VERTICALS, getVertical } from "@/lib/verticals";
import {
  AUDIT_HOURS,
  DELIVERY_HOURS,
  PRICE_LABEL,
  PRICE_USD,
  PRODUCT,
} from "@/lib/config";

/* ================================================================
   One template, one data file, N industry pages.

   This is a root-level dynamic segment, so it would otherwise catch
   every unmatched path on the site. Two things prevent that: static
   routes (/audit, /order, /admin…) always win over a dynamic segment
   in the App Router, and dynamicParams = false means anything not in
   VERTICALS 404s instead of rendering an empty industry page.
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
    alternates: { canonical: `/${v.slug}` },
    openGraph: {
      title: v.title,
      description: v.description,
      url: `https://seopage.com/${v.slug}`,
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

/** Asked on every industry page, answered once. */
function sharedFaqs(v: { plural: string }) {
  return [
    {
      q: `What exactly do I get for ${PRICE_LABEL}?`,
      a: `One finished page built around one search: search-intent research, competitor analysis, a keyword-focused title tag and meta description, a clean heading structure, the full written page, an FAQ section written to be quoted, schema markup, an llms.txt file, internal-link recommendations, and human review — delivered as a single ready-to-publish HTML file that's yours forever.`,
    },
    {
      q: "Do I need a website already?",
      a: "No. The page arrives as one self-contained HTML file. Upload it to any host, point a domain at it, or paste it into your site builder's custom-HTML block. The delivery email includes publishing instructions.",
    },
    {
      q: `What if the page isn't right?`,
      a:
        PRODUCT.satisfaction +
        " Reply to your delivery email with what you'd change and we'll revise it — and if it's still not right, we'll refund you in full.",
    },
  ];
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const v = getVertical(vertical);
  if (!v) notFound();

  const faqs = [...v.faqs, ...sharedFaqs(v)];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://seopage.com/${v.slug}#service`,
        serviceType: v.primaryKeyword,
        name: `${v.primaryKeyword} — done-for-you SEO page`,
        provider: { "@id": "https://seopage.com/#organization" },
        description: v.description,
        offers: {
          "@type": "Offer",
          price: `${PRICE_USD}.00`,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `https://seopage.com/${v.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://seopage.com/${v.slug}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "SEOPage",
            item: "https://seopage.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: v.primaryKeyword,
            item: `https://seopage.com/${v.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `https://seopage.com/${v.slug}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader />
      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-3xl px-5 pb-14 pt-16 text-center sm:px-8 lg:pb-16 lg:pt-24">
            <h1 className="kicker rise">{v.primaryKeyword}</h1>
            <p className="display rise rise-1 mx-auto mt-5 text-balance text-[2.1rem] leading-[1.05] text-ink sm:text-[2.9rem]">
              {v.headline.lead}{" "}
              <span className="text-[#d92d20]">{v.headline.loss}</span>
            </p>
            <p className="rise rise-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              We build the one page that wins that search. Researched, written,
              reviewed by hand, and in your inbox within {DELIVERY_HOURS} hours
              for {PRICE_LABEL}.
            </p>
            <div className="rise rise-3 mt-9 flex justify-center">
              <BuyButton label={`Get My Page — ${PRICE_LABEL}`} />
            </div>
            <p className="rise rise-4 mono mt-5 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
              One page &middot; one search &middot; no retainer
            </p>
          </div>
        </section>

        {/* ============ THE SEARCHES ============ */}
        <section className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="kicker">The searches that pay</span>
            <h2 className="display mt-4 text-balance text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
              These are being typed in your market right now.
            </h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-2">
              Every one of them has an answer today. The only question is whose
              page it is.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {v.searches.map((s) => (
                <li key={s} className="pill text-[0.85rem]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ WHAT THE PAGE MUST PROVE ============ */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
            <span className="kicker">What your page has to prove</span>
            <h2 className="display mt-4 text-balance text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
              A crawler can&apos;t read your photos, and neither can an
              assistant.
            </h2>
            <div className="mt-10 space-y-7">
              {v.proof.map((p, i) => (
                <div key={p.t} className="flex gap-5">
                  <span className="mono shrink-0 pt-1 text-[0.8rem] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-ink">
                      {p.t}
                    </h3>
                    <p className="mt-1.5 max-w-[62ch] text-[0.95rem] leading-relaxed text-ink-2">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHAT THE COMPETITION GETS WRONG ============ */}
        <section className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="kicker">Why the pages above you are beatable</span>
            <h2 className="display mt-4 text-balance text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
              Most {v.plural} lose the search for the same four reasons.
            </h2>
            <ul className="mt-8 max-w-[64ch] space-y-3">
              {v.failings.map((f) => (
                <li key={f} className="flex gap-3">
                  <span
                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e0584b]"
                    aria-hidden
                  />
                  <p className="text-[0.98rem] leading-[1.6] text-ink-2">{f}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-2">
              None of that is a marketing problem. It&apos;s a page problem, and
              a page is a thing you can replace this afternoon.
            </p>
          </div>
        </section>

        {/* ============ OFFER ============ */}
        <section className="border-b border-line bg-ink text-white">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 lg:py-20">
            <p className="mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              The offer
            </p>
            <p className="display mt-5 text-balance text-[1.8rem] leading-[1.15] sm:text-[2.3rem]">
              One page. One search.
              <br />
              <span className="text-[#8b93f8]">
                {PRICE_LABEL}, done in {DELIVERY_HOURS} hours.
              </span>
            </p>
            <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/70">
              No retainer, no dashboard, no contract. Tell us the search you
              want to win and a finished, ready-to-publish page lands in your
              inbox. {PRODUCT.satisfaction}
            </p>
            <div className="mt-9 flex justify-center">
              <BuyButton label={`Get My Page — ${PRICE_LABEL}`} />
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
            <span className="kicker">The questions, answered</span>
            <h2 className="display mt-4 text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
              {v.primaryKeyword}, explained
            </h2>
            <div className="mt-10 divide-y divide-line border-t border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[1.02rem] font-semibold text-ink">
                    {f.q}
                    <span className="mt-1 shrink-0 text-muted transition group-open:rotate-45">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-2">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>

            {/* Internal links: this page feeds, and is fed by, the hubs. */}
            <div className="mt-14 rounded-lg border border-line bg-surface-2 p-6 sm:p-8">
              <p className="text-[1.05rem] font-semibold text-ink">
                Not ready to order?
              </p>
              <p className="mt-2 max-w-lg text-ink-2">
                Send us a page you already have and we&apos;ll audit it against
                the search you want to win — free, human-reviewed, within{" "}
                {AUDIT_HOURS} hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/audit" className="btn btn-accent px-6 py-3">
                  Get a free page audit
                </Link>
                <Link href="/" className="btn btn-ghost px-6 py-3">
                  See what we build
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
