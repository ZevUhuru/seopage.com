import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExampleShowcase, ANATOMY } from "@/components/ExampleShowcase";
import { JsonLd } from "@/components/JsonLd";
import { BuyButton } from "@/components/BuyButton";
import { EmailCapture } from "@/components/EmailCapture";
import {
  DELIVERY_HOURS,
  PRICE_LABEL,
  PRICE_USD,
  PRODUCT,
} from "@/lib/config";

/* ================================================================
   Offer-first homepage. The essay DNA stays — numbered chapters,
   hand-offs, one dark turn — but the offer leads: one researched,
   human-reviewed SEO page, $99, in your inbox within 3 hours.
   ================================================================ */

export const metadata: Metadata = {
  title: `Get Cited by AI Search — Done-For-You SEO Pages, ${PRICE_LABEL} in ${DELIVERY_HOURS} Hours`,
  description: `AI is already recommending someone in your market. We build the page that makes it you — researched, human-reviewed, engineered to be cited by ChatGPT, Perplexity, and Google AI. ${PRICE_LABEL} per page, delivered within ${DELIVERY_HOURS} hours.`,
  alternates: { canonical: "/" },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a done-for-you SEO page?",
    a: `A done-for-you SEO page is a finished web page built to rank for one target keyword, delivered ready to publish. You tell us the search you want to win; we research the results, write the page, structure it for search engines, and review it by hand. You receive one complete HTML file — copy, title tag, meta description, headings, FAQ, and schema markup included — not a draft you still have to fix.`,
  },
  {
    q: `What exactly do I get for ${PRICE_LABEL}?`,
    a: "One finished SEO page: research into the search results for your keyword, a keyword-focused title tag and meta description, a clean heading structure, the full written page, an FAQ section written to be quoted, schema markup, internal-link suggestions, and a responsive design — delivered as a single ready-to-publish HTML file that's yours forever.",
  },
  {
    q: `How does ${DELIVERY_HOURS}-hour delivery work?`,
    a: `After checkout you fill out a short brief — your business, your target keyword, your competitors. Then we research the search results, write and structure the page, and a person reviews everything before it goes out. The finished page arrives in your inbox within ${DELIVERY_HOURS} hours of your order.`,
  },
  {
    q: "Who actually writes the page?",
    a: "The research and drafting run on a workflow we've spent months building for exactly this job: search-intent research, competitor analysis, structured writing, and SEO checks. A person reviews every page before it's sent. That's why delivery takes hours, not seconds — instant AI drafts are easy; pages worth publishing take a process.",
  },
  {
    q: "Will it actually rank on Google?",
    a: "The page is built on the fundamentals Google rewards: a keyword-focused title and description, clean headings, real content matched to search intent, and valid structured data. How fast it climbs depends on your domain and your competition — specific, lower-competition searches can move in weeks; harder markets take longer. Either way, the page itself won't be the thing holding you back.",
  },
  {
    q: "Does it help me show up in ChatGPT and AI search?",
    a: "Every page is engineered for Google and AI search: clear, quotable answers, an FAQ section with matching FAQPage schema, and specific facts AI assistants can cite. Nobody can honestly guarantee a placement inside an AI answer — what we can do is build the kind of page those systems read and quote.",
  },
  {
    q: "What if I don't like the page?",
    a: PRODUCT.satisfaction +
      " Reply to your delivery email with what you'd change and we'll revise it.",
  },
  {
    q: "Do I need a website? How do I publish it?",
    a: "You don't need an existing site. The page arrives as one self-contained HTML file — upload it to any host, point a domain at it, or paste it into your site builder's custom-HTML block. The delivery email includes step-by-step publishing instructions.",
  },
  {
    q: "Can I order pages for multiple keywords, or for clients?",
    a: `Yes. Each order covers one page for one target keyword — many customers order a page per service or per city. If you're an agency or need pages in volume, email ${PRODUCT.supportEmail} and we'll set you up directly.`,
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
      email: PRODUCT.supportEmail,
      description:
        "SEOPage builds done-for-you SEO pages: researched, written, human-reviewed, and engineered for Google and AI search, delivered within hours.",
    },
    {
      "@type": "WebSite",
      "@id": "https://seopage.com/#website",
      url: "https://seopage.com",
      name: "SEOPage",
      publisher: { "@id": "https://seopage.com/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://seopage.com/#service",
      serviceType: "SEO page creation",
      name: "Done-for-you SEO page",
      provider: { "@id": "https://seopage.com/#organization" },
      description: `One researched, written, and human-reviewed SEO page built around a target keyword, delivered ready to publish within ${DELIVERY_HOURS} hours.`,
      offers: {
        "@type": "Offer",
        price: `${PRICE_USD}.00`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://seopage.com",
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

/* The evidence base. Sources are linked in the footnote line. */
const STATS: { n: string; l: string; s: string }[] = [
  {
    n: "45%",
    l: "of consumers now ask AI tools for local business recommendations, up from 6% one year earlier",
    s: "BrightLocal, 2026",
  },
  {
    n: "68%",
    l: "of local-intent Google searches now show an AI Overview above the results",
    s: "Whitespark, 2025",
  },
  {
    n: "8%",
    l: "of searches end in a click on a regular result when an AI summary appears, down from 15%",
    s: "Pew Research, 2025",
  },
  {
    n: "~59%",
    l: "of all Google searches already end without a single click on anything",
    s: "Semrush, 2025",
  },
];

const SOURCES: { name: string; href: string }[] = [
  {
    name: "BrightLocal Local Consumer Review Survey, 2026",
    href: "https://www.brightlocal.com/research/lcrs-ai-trust/",
  },
  {
    name: "Pew Research Center, 2025",
    href: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/",
  },
  {
    name: "Whitespark AI Overviews study, 2025",
    href: "https://whitespark.ca/blog/case-study-the-prevalence-of-ai-overviews-in-local-search/",
  },
  {
    name: "Semrush zero-click study, 2025",
    href: "https://www.semrush.com/blog/semrush-ai-overviews-study/",
  },
];

/* The deliverable, itemized like a receipt. This is the product. */
const DELIVERABLE: { t: string; d: string }[] = [
  { t: "Search-intent research", d: "What the results for your keyword reward, and why" },
  { t: "Competitor analysis", d: "What the pages that currently win have in common" },
  { t: "Title tag + meta description", d: "Written around your keyword, sized to fit" },
  { t: "Full written page", d: "Structured H1–H3, copy matched to search intent" },
  { t: "FAQ section", d: "Written to be quoted by Google and AI assistants" },
  { t: "Schema markup", d: "Valid structured data, matched to the content" },
  { t: "Internal-link suggestions", d: "Where the page should link, and what should link to it" },
  { t: "Human review", d: "A person reads every page before it ships" },
  { t: "Ready-to-publish HTML", d: "One self-contained file, yours forever" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <SiteHeader />
      <main>
        {/* ============ 00 · HERO — the offer ============ */}
        <section className="relative overflow-hidden">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 lg:pb-28 lg:pt-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
              <div>
                <span className="kicker rise">
                  AI is already answering for your market
                </span>
                <h1 className="display rise rise-1 mt-5 text-[2.5rem] leading-[1.03] text-ink sm:text-[3.35rem] lg:text-[3.8rem]">
                  Customers are asking AI who to hire.{" "}
                  {/* The threat is red; blue stays reserved for the rescue (CTA). */}
                  <span className="text-[#d92d20]">
                    It&apos;s recommending your competitor.
                  </span>
                </h1>
                <p className="rise rise-2 mt-6 max-w-xl text-[1.075rem] leading-relaxed text-ink-2">
                  When someone asks ChatGPT or Google AI who to call, it quotes
                  one page and sends them there. Today that page belongs to
                  someone else. We build the page that takes the answer back —
                  researched, human-reviewed, engineered to be cited — in your
                  inbox within {DELIVERY_HOURS} hours.
                </p>
                <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
                  <BuyButton label={`Take back the answer — ${PRICE_LABEL}`} />
                  <a href="#what-you-get" className="btn btn-ghost btn-lg">
                    See what&apos;s in it
                  </a>
                </div>
                <div className="rise rise-4 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <Dot /> Built to be cited by AI
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Dot /> In your inbox within {DELIVERY_HOURS} hours
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Dot /> Researched &amp; human-reviewed
                  </span>
                </div>
              </div>

              {/* Evidence in the first viewport: both search surfaces, one page. */}
              <div className="rise rise-2">
                <SearchPanel />
              </div>
            </div>
          </div>
        </section>

        {/* ============ 01 · WHAT YOU GET — the receipt ============ */}
        <section id="what-you-get" className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="01" eyebrow="What you get" />
            <div className="mt-12 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                  Not an AI draft. A finished page.
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
                  Plenty of tools will generate you some words. What lands in
                  your inbox is the whole job — the research, the writing, the
                  SEO structure, and a person&apos;s judgment — as one file you
                  can publish immediately.
                </p>
                <p className="mt-4 max-w-md text-sm text-muted">
                  {PRODUCT.satisfaction}
                </p>
              </div>
              <div className="card overflow-hidden">
                <div className="flex items-baseline justify-between border-b border-line px-6 py-4">
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Every order includes
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {PRICE_LABEL}
                  </span>
                </div>
                <ul className="divide-y divide-line">
                  {DELIVERABLE.map((d) => (
                    <li key={d.t} className="flex items-start gap-3.5 px-6 py-3.5">
                      <Check sm />
                      <div>
                        <span className="text-[0.95rem] font-semibold text-ink">
                          {d.t}
                        </span>
                        <span className="block text-[0.85rem] leading-relaxed text-muted">
                          {d.d}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mx-auto mt-16 max-w-3xl">
              <p className="handoff">
                That&apos;s the deliverable. Here&apos;s the process that turns
                your keyword into it — and why it takes hours, not seconds.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 02 · HOW IT WORKS ============ */}
        <section id="how" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="02" eyebrow="How it works" />
            <div className="mt-12 max-w-2xl">
              <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                Order. Brief. {DELIVERY_HOURS} hours later, it&apos;s in your
                inbox.
              </h2>
            </div>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  n: "01",
                  t: "Place your order",
                  d: `${PRICE_LABEL} through Stripe. No account, no subscription, no sales call.`,
                },
                {
                  n: "02",
                  t: "Tell us the page you need",
                  d: "A 3-minute brief: your business, your target keyword, your competitors, what the page should achieve.",
                },
                {
                  n: "03",
                  t: "We research, write, and review",
                  d: "Search-intent research, competitor analysis, structured writing, SEO checks — then a person reviews the finished page.",
                },
                {
                  n: "04",
                  t: "Delivered to your inbox",
                  d: `Within ${DELIVERY_HOURS} hours: the finished page as ready-to-publish HTML, with publishing instructions.`,
                },
              ].map((s) => (
                <div key={s.n} className="border-t border-line-strong pt-5">
                  <span className="mono text-sm font-semibold text-accent">
                    {s.n}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{s.t}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-2">
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-16 max-w-3xl">
              <p className="handoff">
                Why a page at all? Because the way people find businesses just
                changed — and one well-built page is still the answer to it.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 03 · THE SHIFT — why this matters now ============ */}
        <section id="shift" className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="03" eyebrow="How people search now" />
            <div className="mx-auto mt-12 max-w-3xl">
              <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                The search results page quietly stopped sending clicks.
              </h2>
              <div className="measure mt-8 space-y-6 text-[1.06rem] leading-[1.75] text-ink-2">
                <p className="dropcap">
                  For twenty years, being found meant one thing: show up in the
                  blue links. That era is ending faster than most businesses
                  realize. Last year, 6% of consumers asked an AI tool to
                  recommend a local business. This year it&apos;s 45%.
                </p>
                <p>
                  Google itself changed just as much. Two thirds of local
                  searches now open with an AI-written answer above the
                  results, and when that answer appears, clicks on the results
                  below it nearly halve.
                </p>
                <p>
                  Here is the part that matters: neither Google&apos;s AI nor
                  ChatGPT invents those answers. They read pages, pick the
                  clearest and most specific one, and repeat it with credit.
                  The businesses being recommended aren&apos;t lucky. They have
                  a page that&apos;s easy to quote.
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.n} className="border-t border-line-strong pt-5">
                  <div className="stat-num text-[2.6rem] text-ink">{s.n}</div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-2">
                    {s.l}
                  </p>
                  <p className="mono mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                    {s.s}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-3xl">
              <p className="handoff">
                So when a machine reads about your trade, is there a page about
                you worth quoting? Here&apos;s what one looks like.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 04 · THE PAGE — what "worth quoting" looks like ============ */}
        <section id="example" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="04" eyebrow="What a citable page looks like" />
            <div className="mt-12 max-w-2xl">
              <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                One page, built to be quoted.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">
                This is the actual shape of what we deliver. Five things make
                it work, and they&apos;re the same five things most pages skip.
              </p>
            </div>

            <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <ExampleShowcase />
              <ol className="space-y-6 lg:pt-2">
                {ANATOMY.map((a) => (
                  <li key={a.n} className="flex gap-3.5">
                    <span className="callout-dot mt-0.5">{a.n}</span>
                    <div>
                      <h3 className="font-semibold text-ink">{a.t}</h3>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-2">
                        {a.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ============ 05 · THE TURN — the one dark moment ============ */}
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 lg:py-32">
            <p className="mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              The turn
            </p>
            <p className="display mt-6 text-[2rem] leading-[1.12] sm:text-[2.7rem]">
              Not an instant AI draft.
              <br />
              <span className="text-[#8b93f8]">
                A researched page, reviewed by a person.
              </span>
            </p>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Instant output is easy, and it reads that way. We take{" "}
              {DELIVERY_HOURS} hours because research, structure, and review
              are the difference between content and a page worth publishing.
            </p>
          </div>
        </section>

        {/* ============ 06 · THE MATH — pricing, anchored ============ */}
        <section id="pricing" className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="05" eyebrow="What it costs" />
            <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                  One page. One price. Once.
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
                  For context, here&apos;s what this exact deliverable costs
                  everywhere else.
                </p>

                <div className="mt-8 max-w-md divide-y divide-line border-y border-line">
                  {[
                    ["SEO agency, per page", "$300–$1,000"],
                    ["Freelance SEO writer, researched piece", "$175–$350"],
                    ["Landing page builder, and you still write it", "$768+/yr"],
                  ].map(([l, p]) => (
                    <div
                      key={l}
                      className="flex items-baseline justify-between gap-4 py-3.5 text-ink-2"
                    >
                      <span className="text-[0.95rem]">{l}</span>
                      <span className="mono text-[0.95rem] text-muted">{p}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 max-w-md text-sm text-muted">
                  Ordering for an agency or in volume? Email{" "}
                  <a
                    href={`mailto:${PRODUCT.supportEmail}`}
                    className="underline hover:text-ink"
                  >
                    {PRODUCT.supportEmail}
                  </a>
                  .
                </p>
              </div>

              <div className="card overflow-hidden">
                <div className="flex items-baseline justify-between border-b border-line px-7 py-6">
                  <span className="font-semibold text-ink">SEO page</span>
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
                      "One finished page for one target keyword",
                      "Search-intent + competitor research",
                      "Title tag, meta description, and schema markup",
                      "An FAQ written to be quoted by AI search",
                      "Human-reviewed before it ships",
                      `Delivered within ${DELIVERY_HOURS} hours, yours forever`,
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check sm />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <BuyButton
                      label={`Get my SEO page — ${PRICE_LABEL}`}
                      className="btn btn-accent btn-lg w-full"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs text-muted">
                    Secure checkout by Stripe &middot; brief takes 3 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 07 · OBJECTIONS — the questions, answered ============ */}
        <section id="faq" className="bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 lg:pt-24">
            <ChapterHead n="06" eyebrow="The questions, answered" />
          </div>
          <div className="mx-auto max-w-3xl px-5 pb-16 sm:px-8 lg:pb-24">
            <div className="mt-12">
              <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                Fair questions before you spend {PRICE_LABEL}.
              </h2>
            </div>

            {/* The biggest silent objection gets the pull quote. */}
            <figure className="mt-10">
              <blockquote className="pullquote">
                Our focus on the quality of content, rather than how content
                is produced, is a useful guide.
              </blockquote>
              <figcaption className="pullquote-attr mt-3 pl-[1.4rem]">
                Google Search Central, on AI-assisted content
              </figcaption>
            </figure>

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
            <p className="mt-8 text-sm text-muted">
              Curious what an SEO page actually is?{" "}
              <Link href="/seo-page" className="underline hover:text-ink">
                Read the full reference
              </Link>{" "}
              or see{" "}
              <Link
                href="/on-page-seo-services"
                className="underline hover:text-ink"
              >
                how our on-page SEO service compares
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ============ 08 · THE CLOSE ============ */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <span className="kicker">In conclusion</span>
            <h2 className="display mt-4 text-[2.1rem] leading-[1.05] text-ink sm:text-[2.8rem]">
              Someone is searching for what you sell right now.{" "}
              <span className="text-accent">Be the answer.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              The way people search changed. The fix is still one well-built
              page. Tell us the search you want to win — the finished page is
              in your inbox within {DELIVERY_HOURS} hours.
            </p>
            <div className="mt-9 flex justify-center">
              <BuyButton label={`Get my SEO page — ${PRICE_LABEL}`} />
            </div>
            <p className="mt-4 text-sm text-muted">
              {PRICE_LABEL} once &middot; researched &amp; human-reviewed
              &middot; no subscription
            </p>

            {/* Footnotes — the essay cites its sources. */}
            <div className="mt-16 border-t border-line pt-6 text-left">
              <p className="mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                Sources
              </p>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">
                {SOURCES.map((s, i) => (
                  <span key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line-strong underline-offset-2 transition hover:text-ink-2"
                    >
                      {s.name}
                    </a>
                    {i < SOURCES.length - 1 && " · "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        {/* ============ Pre-footer — the email capture ============ */}
        <section className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
            <EmailCapture />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ─────────────────────────── pieces ─────────────────────────── */

function ChapterHead({ n, eyebrow }: { n: string; eyebrow: string }) {
  return (
    <div className="chapter-head">
      <span className="chapter-num">{n}</span>
      <span className="chapter-eyebrow">{eyebrow}</span>
      <span className="chapter-line" />
    </div>
  );
}

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

/**
 * The hero's proof, loss-framed: the AI answer as it reads today (citing the
 * competitor, your business absent) and the same answer after your page is
 * live. The answer only has room for one name.
 */
function SearchPanel() {
  return (
    <div className="card overflow-hidden shadow-lg">
      {/* Today: the competitor holds the citation */}
      <div className="border-b border-line p-5 sm:p-6">
        <div className="mono mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e0584b]" />
          The AI answer in your market &middot; today
        </div>
        <p className="text-[0.95rem] leading-relaxed text-ink-2">
          &ldquo;Who does emergency roof repair in Denver?&rdquo; — For urgent
          roof repair in Denver, most sources point to{" "}
          <span className="font-semibold text-ink underline decoration-[#e0584b] decoration-2 underline-offset-2">
            Apex Roofing
          </span>
          , a licensed crew offering 24/7 storm response and free inspections.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <span className="mono text-[10px] uppercase tracking-wider text-muted">
            Sources
          </span>
          <span className="pill text-[0.72rem]">apexroofingdenver.com</span>
          <span className="mono ml-auto text-[10px] uppercase tracking-wider text-[#b42318]">
            summitroofing.com — not cited
          </span>
        </div>
      </div>

      {/* After: the page takes the answer back */}
      <div className="bg-surface-2 p-5 sm:p-6">
        <div className="mono mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-good" />
          The same answer &middot; with your SEOPage live
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
          <span className="pill text-[0.72rem]">summitroofing.com</span>
        </div>
      </div>

      {/* The connective caption */}
      <div className="border-t border-line px-5 py-3 sm:px-6">
        <p className="mono text-[10px] uppercase tracking-[0.14em] text-muted">
          The answer only has room for one name &middot; make it yours
        </p>
      </div>
    </div>
  );
}
