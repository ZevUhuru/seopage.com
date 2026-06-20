import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExampleShowcase } from "@/components/ExampleShowcase";
import { JsonLd } from "@/components/JsonLd";
import { PRICE_LABEL, PRODUCT } from "@/lib/config";

const CHANNELS = ["Google", "ChatGPT", "Google AI Overviews", "Perplexity"];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an SEO landing page?",
    a: "It's a single page built to rank for one specific search, usually a service plus a place like “roof repair Denver,” and to turn that visitor into a call or a booking. A good SEO landing page pairs clear, persuasive copy with the on-page basics search engines read: the title tag, headings, meta description, and schema markup.",
  },
  {
    q: "Do landing pages help SEO?",
    a: "Yes, when they're built right. A focused landing page that targets one keyword and one location, with a clean structure and real content, gives Google a clear, relevant result to rank. The catch is that most landing pages skip the on-page SEO, so they look fine but rank for nothing. Ours are built to rank from the start.",
  },
  {
    q: "What is a local SEO landing page?",
    a: "It's an SEO landing page aimed at one city or service area. Instead of a generic page, you get one that speaks to customers in your town and targets searches like “[your service] [your city].” That local focus is what helps you show up when nearby customers search.",
  },
  {
    q: "Can I build a page for each city or service I cover?",
    a: "Yes. A lot of local businesses run a separate landing page for each city or service they offer, so every one targets its own keyword. Build them one at a time here. Each page is $29 and yours to keep.",
  },
  {
    q: "How do I create an SEO-optimized landing page?",
    a: "By hand it means researching the keyword, writing the copy, setting the title tag and meta description, structuring the headings, and adding schema markup. Or you tell us about your business and we do all of that in a couple of minutes, then hand you the finished HTML.",
  },
  {
    q: "Will it actually rank on Google?",
    a: "The page is built on the fundamentals Google rewards: a keyword-focused title and description, clean headings, content written for your area, and valid structured data. How fast it climbs depends on your domain and competition, but the page itself won't be the thing holding you back.",
  },
  {
    q: "How does it get found by ChatGPT or Perplexity?",
    a: "AI tools tend to quote pages that answer questions clearly and use FAQ content and schema. We write your FAQ to be easy to quote and add matching FAQPage data, so an AI can point people to your business by name. The big SEO landing page searches already show an AI answer up top, so this matters.",
  },
  {
    q: "What do I get for $29, and do I need a website?",
    a: "One finished SEO landing page as a single HTML file: local copy, a responsive design, a title tag and meta description, and LocalBusiness, Service, and FAQPage schema. You don't need an existing site. Put the file on any host or paste it into your site builder. You preview the whole page free and only pay if you want to download it.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://seopage.com/#organization",
      name: "SEOPage",
      url: "https://seopage.com",
      description:
        "SEOPage builds finished, SEO-optimized landing pages for local businesses, ready to rank on Google and get found by AI search.",
    },
    {
      "@type": "WebSite",
      "@id": "https://seopage.com/#website",
      url: "https://seopage.com",
      name: "SEOPage",
      publisher: { "@id": "https://seopage.com/#organization" },
    },
    {
      "@type": "Product",
      name: "Local SEO Landing Page",
      description:
        "A finished local SEO landing page for a local business, exported as clean HTML with researched copy and schema.org structured data (LocalBusiness, Service, FAQPage).",
      brand: { "@id": "https://seopage.com/#organization" },
      offers: {
        "@type": "Offer",
        price: "29.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://seopage.com/intake",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://seopage.com/#faq",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <SiteHeader />
      <main>
        {/* ───────────────────────── Hero ───────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 lg:pb-24 lg:pt-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
              <div>
                <span className="kicker rise">
                  Local SEO landing pages, done for you
                </span>
                <h1 className="display rise rise-1 mt-5 text-[2.55rem] leading-[1.03] text-ink sm:text-[3.4rem] lg:text-[3.9rem]">
                  The local SEO landing page that gets you found on{" "}
                  <span className="text-accent">Google and AI.</span>
                </h1>
                <p className="rise rise-2 mt-6 max-w-xl text-[1.075rem] leading-relaxed text-ink-2">
                  When someone nearby searches for what you do, or asks ChatGPT
                  for a recommendation, you want to be the name that comes up.
                  Tell us about your business and we&apos;ll build a local SEO
                  landing page that gets you there.
                </p>
                <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
                  <Link href="/intake" className="btn btn-accent btn-lg">
                    Build my page
                  </Link>
                  <a href="#example" className="btn btn-ghost btn-lg">
                    See a sample
                  </a>
                </div>
                <div className="rise rise-4 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <Dot /> Preview it free
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Dot /> {PRICE_LABEL} once, no subscription
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Dot /> Clean HTML you own
                  </span>
                </div>
              </div>

              {/* Search-surface mock — Google AND AI, made concrete */}
              <div className="rise rise-2">
                <SearchPanel />
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── Credibility / capability strip ──────────── */}
        <section className="border-y border-line bg-surface-2">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line px-5 sm:px-8 md:grid-cols-4">
            {[
              ["4", "AI tools we write for"],
              ["3", "schema types built in"],
              ["~90s", "to a finished page"],
              [PRICE_LABEL, "once, no subscription"],
            ].map(([n, l], i) => (
              <div
                key={l}
                className={`px-4 py-7 ${i === 2 ? "border-l-0 md:border-l" : ""}`}
              >
                <div className="display text-3xl text-ink">{n}</div>
                <div className="mt-1 text-sm text-muted">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────────────── Example ──────────────────────── */}
        <section id="example" className="border-b border-line">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <span className="kicker">A sample page</span>
              <h2 className="display mt-3 text-[2rem] text-ink sm:text-[2.5rem]">
                A finished SEO landing page, not a template.
              </h2>
              <p className="mt-4 text-lg text-ink-2">
                Real copy written for your town. A clean design that works on
                phones. And the technical SEO most landing pages skip: title
                tags, meta descriptions, and the schema that Google and AI tools
                actually read.
              </p>
            </div>
            <div className="mt-12">
              <ExampleShowcase />
            </div>
            <div className="mt-12">
              <Link href="/intake" className="btn btn-primary btn-lg">
                Build mine
              </Link>
            </div>
          </div>
        </section>

        {/* ──────────────────────── How it works ─────────────────── */}
        <section id="how" className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <span className="kicker">How it works</span>
              <h2 className="display mt-3 text-[2rem] text-ink sm:text-[2.5rem]">
                Three steps, with real research in between.
              </h2>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Tell us about your business",
                  d: "Your name, what you do, and where. Add a keyword or your website if you have one. If not, we'll figure out the rest.",
                },
                {
                  n: "02",
                  t: "We research and write the page",
                  d: "We dig into your local market: the keywords, what buyers actually want, and the questions they ask. Then we write the page around it.",
                },
                {
                  n: "03",
                  t: "Preview, then download",
                  d: "Look over the finished page for free. When you're happy with it, download clean HTML you can publish anywhere.",
                },
              ].map((s) => (
                <div key={s.n} className="bg-surface p-7">
                  <span className="mono text-sm font-semibold text-accent">
                    {s.n}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── What's inside every page ──────────────── */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <span className="kicker">What&apos;s inside every page</span>
              <h2 className="display mt-3 text-[2rem] text-ink sm:text-[2.5rem]">
                Built on real SEO best practices.
              </h2>
            </div>
            <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                [
                  "Keyword-focused on-page SEO",
                  "A precise title tag, meta description, and clean heading structure built around the keyword your customers actually search.",
                ],
                [
                  "schema.org structured data",
                  "Valid LocalBusiness, Service, and FAQPage markup: the data Google and AI tools read for rich results and citations.",
                ],
                [
                  "Copy that sounds human",
                  "Specific, local copy that reads like a person wrote it. No stock phrases, no filler, no obvious AI voice.",
                ],
                [
                  "An FAQ built to be quoted",
                  "Common questions answered clearly and structured so AI tools can quote your business directly, by name.",
                ],
                [
                  "A clean, responsive design",
                  "A modern layout that looks right on a phone and a desktop. Fast, accessible, and ready to publish.",
                ],
                [
                  "HTML you own outright",
                  "One self-contained file. No platform to log into, no monthly fee. Host it wherever you like.",
                ],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3.5">
                  <Check />
                  <div>
                    <h3 className="font-semibold text-ink">{t}</h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink-2">
                      {d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────── AI angle ─────────────────────── */}
        <section className="border-b border-line bg-ink text-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                How people search now
              </span>
              <h2 className="display mt-3 text-[2rem] text-white sm:text-[2.5rem]">
                Half your customers ask AI before they ask around.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
                Some people still Google you. More and more ask ChatGPT or
                Perplexity, which answer by citing a few sources. Most local
                pages aren&apos;t ready for either one. Yours will be: the
                on-page SEO Google looks for, plus clear answers an AI can quote.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {CHANNELS.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-white/15 px-3 py-1.5 text-sm text-white/75"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-3 self-center">
              {[
                [
                  "Easy for AI to quote",
                  "FAQ content and schema written so an AI can lift a clear answer and credit your business by name.",
                ],
                [
                  "On-page SEO done right",
                  "Title tags, meta descriptions, heading structure, and LocalBusiness, Service, and FAQPage data, kept correct and consistent.",
                ],
                [
                  "Written for your town",
                  "Researched for your city and your service, not boilerplate that could belong to anyone and ranks for nothing.",
                ],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="rounded-lg border border-white/12 bg-white/[0.03] p-5"
                >
                  <p className="font-semibold text-white">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────── Pricing ──────────────────────── */}
        <section id="pricing" className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <span className="kicker">Pricing</span>
                <h2 className="display mt-3 text-[2rem] text-ink sm:text-[2.5rem]">
                  One page. One price. No subscription.
                </h2>
                <p className="mt-4 max-w-md text-lg text-ink-2">
                  Preview the whole page for free. You only pay the{" "}
                  {PRICE_LABEL} if you decide to download it. After that, it&apos;s
                  yours to keep.
                </p>
                <p className="mt-4 max-w-md text-sm text-muted">
                  {PRODUCT.satisfaction}
                </p>
              </div>

              <div className="card overflow-hidden">
                <div className="flex items-baseline justify-between border-b border-line px-7 py-6">
                  <span className="font-semibold text-ink">
                    SEO landing page
                  </span>
                  <div className="text-right">
                    <span className="display text-4xl text-ink">
                      {PRICE_LABEL}
                    </span>
                    <span className="ml-1 text-sm text-muted">once</span>
                  </div>
                </div>
                <div className="p-7">
                  <ul className="space-y-3 text-[0.95rem] text-ink-2">
                    {[
                      "One finished, SEO-optimized landing page",
                      "Copy researched for your business and city",
                      "Title tag, meta description, and schema markup",
                      "Built to rank on Google and get found by AI",
                      "Clean, self-contained HTML you own",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check sm />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/intake"
                    className="btn btn-accent btn-lg mt-7 w-full"
                  >
                    Build my page
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted">
                    Secure checkout by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────── FAQ ──────────────────────────── */}
        <section id="faq" className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="text-center">
              <span className="kicker">Questions</span>
              <h2 className="display mt-3 text-[2rem] text-ink sm:text-[2.5rem]">
                Questions people usually ask
              </h2>
            </div>
            <div className="mt-10 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
              {FAQS.map((f) => (
                <details key={f.q} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {f.q}
                    <span className="shrink-0 text-muted transition-transform group-open:rotate-45">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────── Final CTA ────────────────────── */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-18 text-center sm:px-8 lg:py-24">
            <h2 className="display text-[2.1rem] text-ink sm:text-[2.8rem]">
              Be the business people find.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-2">
              Build a landing page that helps you show up on Google and AI. It
              takes a couple of minutes, and the preview is free.
            </p>
            <Link href="/intake" className="btn btn-accent btn-lg mt-8">
              Build my page
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ─────────────────────────── pieces ─────────────────────────── */

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-good" />;
}

function Check({ sm }: { sm?: boolean }) {
  const s = sm ? "h-5 w-5" : "h-6 w-6";
  return (
    <span
      className={`mt-0.5 grid ${s} shrink-0 place-items-center rounded-md bg-accent-soft text-accent`}
    >
      <svg width={sm ? 12 : 14} height={sm ? 12 : 14} viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5 10 17l9-10"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** A clean mock of a search surface: a Google result + an AI answer. */
function SearchPanel() {
  return (
    <div className="card overflow-hidden shadow-lg">
      {/* Google organic result */}
      <div className="border-b border-line p-5 sm:p-6">
        <div className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-muted">
          Google · organic result
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-surface-3 text-[9px] font-bold">
            S
          </span>
          summitroofingdenver.com
        </div>
        <a className="mt-1 block text-[1.05rem] font-medium leading-snug text-accent">
          Emergency Roof Repair in Denver | Summit Roofing Co.
        </a>
        <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-2">
          Same-day roof repair across Denver. Licensed, insured, 24/7 storm
          response. Free inspection and no-pressure estimate.
        </p>
        <div className="mt-2 flex items-center gap-3 text-[0.78rem] text-muted">
          <span className="text-amber-500">★★★★★</span>
          <span>4.9 · 380 reviews</span>
          <span className="text-line-strong">·</span>
          <span>FAQ</span>
        </div>
      </div>

      {/* AI answer */}
      <div className="bg-surface-2 p-5 sm:p-6">
        <div className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-muted">
          AI overview
        </div>
        <p className="text-[0.95rem] leading-relaxed text-ink-2">
          For urgent roof repair in Denver, a strong option is{" "}
          <span className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-2">
            Summit Roofing Co.
          </span>
          , a licensed, insured crew offering 24/7 storm response and free
          same-day inspections.
        </p>
        <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
          <span className="mono text-[10px] uppercase tracking-wider text-muted">
            Sources
          </span>
          <span className="pill text-[0.72rem]">summitroofingdenver.com</span>
        </div>
      </div>
    </div>
  );
}
