import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExampleShowcase, ANATOMY } from "@/components/ExampleShowcase";
import { JsonLd } from "@/components/JsonLd";
import { CreateButton } from "@/components/CreateButton";
import AnswerConsole from "@/components/AnswerConsole";
import { EmailCapture } from "@/components/EmailCapture";
import {
  CREATE_URL,
  PRICE_AFTER_LAUNCH_LABEL,
  PRICE_LABEL,
  PRICE_USD,
  PRODUCT,
} from "@/lib/config";

/* ================================================================
   Direct-response PAS structure, one goal (build the page in the
   builder app at CREATE_URL — free to preview, PRICE_LABEL to publish):
   Problem (hero) → Agitate (the compounding loss) → the Turn
   (tools diagnose, the page cures) → Solution (the page + how it's built)
   → Offer (price, free preview)
   → FAQ → Close. The CTA repeats after every persuasion block.
   ================================================================ */

export const metadata: Metadata = {
  // Primary keyword ("SEO landing page") front-loaded. "seo landing page" is
  // its own parent topic at KD 7; "seo page" is a fragment of "seo" at KD 90,
  // whose SERP is starter guides rather than buyers. This page targets the
  // former and absorbs the latter as a secondary term.
  title: {
    absolute: `SEO Landing Pages That Get Cited by AI and Rank on Google | SEOPage`,
  },
  description: `An SEO landing page is a page built to win one search. Build yours with AI — researched, written, and engineered to rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews. Free to preview, ${PRICE_LABEL} to publish.`,
  alternates: { canonical: "/" },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an SEO landing page?",
    a: `An SEO landing page is a web page engineered to win one specific search: it targets a single keyword with a matching title tag, meta description, heading structure, content written for the search intent, and schema markup — so search engines can rank it and AI assistants can cite it. SEOPage builds yours with AI: you describe your business, it researches the searches in your market and writes the page, you refine it in a live editor, and you publish one complete ready-to-publish HTML file — not a draft you still have to fix.`,
  },
  {
    q: `What exactly do I get for ${PRICE_LABEL}?`,
    a: "One finished SEO page: keyword research for your market, a keyword-focused title tag and meta description, a clean heading structure, the full written page in a hand-crafted responsive design, an FAQ section written to be quoted, and LocalBusiness and FAQPage schema markup — exported as a single ready-to-publish HTML file that's yours forever. Previewing is free; you only pay when you publish.",
  },
  {
    q: "How does it work?",
    a: `Enter three details: your business name, what you do, and where you do it. The AI researches the searches people in your market actually type, writes the page around the one worth winning, and lays it out in a hand-crafted design. You refine anything you want in the live editor, then publish for ${PRICE_LABEL} and download the file. No brief, no sales call, no waiting on an inbox.`,
  },
  {
    q: "Who actually writes the page?",
    a: "The AI does, inside guardrails. It runs live keyword research for your market and writes structured content: the headline, sections, FAQ, title tag, and meta description. It never improvises the design; the look comes from hand-crafted themes and section templates, so the page doesn't read or look like generic AI output. And you have the final say in the editor before anything is published.",
  },
  {
    q: "How is this different from an AI visibility tool?",
    a: "AI visibility tools monitor whether ChatGPT, Perplexity, and Google AI mention your brand — they diagnose the problem, usually for a monthly subscription, and leave the fixing to you. SEOPage is the other half: it builds the page those systems can actually cite. No dashboard, no subscription. One finished page, engineered to be quoted.",
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
    q: "Do you do llms.txt?",
    a: "It isn't part of the page, and here's the truth about it. As of 2026 no major AI company has committed to reading llms.txt in production, and Google's own AI-optimization guidance says it isn't used for AI Overviews or AI Mode. It costs nothing to add one yourself and it's there the day that changes, but anyone selling it to you as the reason you'll get cited is selling you a meta keywords tag. What actually earns a citation is duller: specific facts an assistant can quote, answers that still make sense lifted out of the page, valid structured data, and a site that isn't accidentally blocking the AI crawlers in robots.txt. Every SEOPage page is built for those.",
  },
  {
    q: "Is this AEO or GEO — answer engine optimization?",
    a: "Those are the names people are giving to the same job: getting your business named inside an AI answer instead of a blue link. We do it at the page level. In practice that means writing self-contained, quotable passages rather than long build-up; putting specific, checkable facts and numbers on the page, because generative engines lean on sources they can quote precisely; matching structured data to the content so the page is machine-readable; making the entity clear and consistent, so the assistant knows who you are; and a robots.txt that lets GPTBot, ClaudeBot, PerplexityBot, and Google's crawlers actually reach your site. It's the same craft as good SEO, aimed at a surface that quotes instead of links.",
  },
  {
    q: "What if I don't like the page?",
    a:
      "You'll know before you pay. The whole page is free to preview, and you can refine any section in the editor until it's right. You only pay when you publish. " +
      PRODUCT.satisfaction,
  },
  {
    q: "Do I need a website? How do I publish it?",
    a: "You don't need an existing site. When you publish, you download the page as one self-contained HTML file — upload it to any host, point a domain at it, or paste it into your site builder's custom-HTML block.",
  },
  {
    q: "Can I build pages for multiple keywords, or for clients?",
    a: `Yes. Each page covers one target keyword — many customers build a page per service or per city. If you're an agency or need pages in volume, email ${PRODUCT.supportEmail} and we'll set you up directly.`,
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
        "SEOPage builds SEO landing pages with AI: researched, written, and engineered to be cited by AI search and rank on Google. Free to preview, ready to publish in one sitting.",
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
      serviceType: "SEO landing page creation",
      name: "SEO landing page builder",
      provider: { "@id": "https://seopage.com/#organization" },
      description: `One researched and written SEO landing page built around a target keyword, engineered to be cited by AI search, and exported ready to publish.`,
      offers: {
        "@type": "Offer",
        price: `${PRICE_USD}.00`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: CREATE_URL,
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

/* The agitation's evidence base. Sources are linked in the footnote line. */
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

/* The deliverable, itemized like a receipt. Only what the builder ships. */
const DELIVERABLE: { t: string; d: string }[] = [
  { t: "Keyword research", d: "The searches people in your market actually type, and the one worth winning" },
  { t: "Title tag + meta description", d: "Written around your keyword, sized to fit" },
  { t: "Full written page", d: "Structured H1–H3, copy matched to search intent" },
  { t: "FAQ section", d: "Written to be quoted by Google and AI assistants" },
  { t: "Schema markup", d: "LocalBusiness and FAQPage structured data, matched to the content" },
  { t: "Hand-crafted design", d: "Real typefaces and per-industry themes. The AI never improvises the look" },
  { t: "Live editor", d: "Refine any section and see the page update before you pay" },
  { t: "Ready-to-publish HTML", d: "One self-contained file, yours forever" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <SiteHeader />
      <main>
        {/* ============ 00 · PROBLEM — bold, centered, minimal ============ */}
        <section className="relative overflow-hidden">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-4xl px-5 pb-16 pt-20 text-center sm:px-8 lg:pb-20 lg:pt-28">
            {/* The kicker is the real H1: primary keyword near the front, small
                by design — heading weight comes from the tag, not the font size.
                The fear line stays visually dominant below it. */}
            <h1 className="kicker rise">
              SEO landing pages that get cited by AI
            </h1>
            {/* The threat is red; blue stays reserved for the rescue (CTA). */}
            <p className="display rise rise-1 mx-auto mt-6 text-balance text-[2.75rem] leading-[1.02] text-ink sm:text-[3.8rem] lg:text-[4.4rem]">
              Customers are asking AI who to hire.{" "}
              <span className="text-[#d92d20]">
                It&apos;s recommending your competitor.
              </span>
            </p>
            <p className="rise rise-2 mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
              Build the SEO landing page that gets you recommended instead.
              Our AI researches your market and writes the page, you refine
              it, and it&apos;s ready to publish in one sitting.
            </p>
            <div className="rise rise-3 mt-9 flex justify-center">
              <CreateButton label="Build My Page — Free Preview" />
            </div>
            <p className="rise rise-4 mono mt-5 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
              Engineered to be cited &middot; free to preview &middot;{" "}
              {PRICE_LABEL} launch price to publish
            </p>
            <div className="rise rise-4 mt-14">
              <a
                href="#why"
                className="inline-flex flex-col items-center gap-2 text-sm text-muted transition hover:text-ink"
              >
                See what&apos;s happening in your market
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="motion-safe:animate-bounce"
                >
                  <path
                    d="M12 4v16m0 0 6-6m-6 6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============ 01 · AGITATE — show it, don't essay it ============ */}
        <section id="why" className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="01" eyebrow="What it's costing you" />
            <div className="mx-auto mt-12 max-w-2xl text-center">
              <h2 className="display reveal text-balance text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                Every day the answer isn&apos;t you,{" "}
                <span className="text-[#d92d20]">
                  your customer calls someone else.
                </span>
              </h2>
            </div>

            {/* The mechanism, performed rather than asserted: the reader flips
                the switch and watches the answer change hands. */}
            <div className="mx-auto mt-12 max-w-2xl">
              <AnswerConsole />
              <p className="mono mt-4 text-center text-[10px] uppercase tracking-[0.14em] text-muted">
                The answer only has room for one name &middot; make it yours
              </p>
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

            {/* The section's one takeaway, at display size. */}
            <p className="display mx-auto mt-16 max-w-3xl text-balance text-center text-[1.6rem] leading-[1.2] text-ink sm:text-[2rem]">
              You&apos;re not losing to a better business.{" "}
              <span className="text-[#d92d20]">
                You&apos;re losing to a better SEO page.
              </span>
            </p>

            {/* CTA repeat: catch the reader at peak agitation. */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <CreateButton label="Build My Page — Free Preview" />
              <p className="text-sm text-muted">
                One page. One keyword. Built in one sitting.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 02 · THE TURN — tools diagnose, we cure ============ */}
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 lg:py-32">
            <p className="mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              The turn
            </p>
            <p className="display mt-6 text-[2rem] leading-[1.12] sm:text-[2.7rem]">
              AI visibility tools tell you you&apos;re losing.
              <br />
              <span className="text-[#8b93f8]">
                SEOPage builds the page that wins it back.
              </span>
            </p>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Dashboards charge monthly to tell you you&apos;re invisible.
              The cure is one well-built page — that&apos;s what SEOPage makes.
            </p>
          </div>
        </section>

        {/* ============ 03 · SOLUTION — the page, and what's in it ============ */}
        <section id="the-fix" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="02" eyebrow="The fix" />
            <div className="mt-12 max-w-2xl">
              <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                One SEO landing page, built to be the answer.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">
                Five things make a page quotable. Most websites skip all five.
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

            {/* The deliverable receipt + the process, side by side. */}
            <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="card overflow-hidden">
                <div className="flex items-baseline justify-between border-b border-line px-6 py-4">
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Every page includes
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
              <div className="lg:pt-2">
                <h3 className="text-lg font-semibold text-ink">
                  Three details to a finished page
                </h3>
                <div className="mt-6 space-y-7">
                  {[
                    {
                      n: "01",
                      t: "Tell it about your business",
                      d: "Your business name, what you do, and where. Add more detail if you like. No brief, no sales call.",
                    },
                    {
                      n: "02",
                      t: "The AI researches and writes",
                      d: "Live keyword research for your market, then a full page written around the search worth winning, in a hand-crafted design.",
                    },
                    {
                      n: "03",
                      t: "Refine it in the editor",
                      d: "Change any section and see the page update. Previewing is free.",
                    },
                    {
                      n: "04",
                      t: "Publish and download",
                      d: `${PRICE_LABEL} once through Stripe. One self-contained HTML file, yours forever. Upload it anywhere.`,
                    },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-4">
                      <span className="mono pt-0.5 text-sm font-semibold text-accent">
                        {s.n}
                      </span>
                      <div>
                        <h4 className="font-semibold text-ink">{s.t}</h4>
                        <p className="mt-1 max-w-sm text-[0.92rem] leading-relaxed text-ink-2">
                          {s.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <CreateButton label="Build My Page — Free Preview" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 05 · OFFER — price, anchored, de-risked ============ */}
        <section id="pricing" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="03" eyebrow="The offer" />
            <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                  One SEO page. One price. Once.
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
                  For context, here&apos;s what this exact deliverable costs
                  everywhere else.
                </p>

                <div className="mt-8 max-w-md divide-y divide-line border-y border-line">
                  {[
                    ["SEO agency, per page", "$300–$1,000"],
                    ["Freelance SEO writer, researched piece", "$175–$350"],
                    ["AI visibility dashboard (tells you, doesn't fix it)", "$25–$500/mo"],
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

                {/* Risk reversal: the guarantee carries the fear's counterweight. */}
                <div className="card mt-8 max-w-md p-6">
                  <p className="mono text-[11px] uppercase tracking-[0.14em] text-good">
                    See it before you pay
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                    The whole page is free to preview. Refine it until
                    it&apos;s right, and only pay when you publish. Still
                    something off after that? Email{" "}
                    {PRODUCT.supportEmail} and we&apos;ll make it right.
                  </p>
                </div>

                <p className="mt-6 max-w-md text-sm text-muted">
                  Building for an agency or in volume? Email{" "}
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
                    <span className="mono mt-1 block text-[0.68rem] uppercase tracking-[0.12em] text-accent">
                      Launch price &middot; {PRICE_AFTER_LAUNCH_LABEL} after launch
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <ul className="space-y-3 text-[0.95rem] text-ink-2">
                    {[
                      "One finished page for one target keyword",
                      "Engineered to be cited by AI search",
                      "Live keyword research for your market",
                      "Title tag, meta description, and schema markup",
                      "Refine it in a live editor before you pay",
                      "Ready-to-publish HTML, yours forever",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check sm />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <CreateButton
                      label="Build My Page — Free Preview"
                      className="btn btn-accent btn-lg w-full"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs text-muted">
                    Free to preview &middot; pay only when you publish
                    &middot; secure checkout by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 05 · OBJECTIONS — the questions, answered ============ */}
        <section id="faq" className="bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 lg:pt-24">
            <ChapterHead n="04" eyebrow="The questions, answered" />
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
              <Link href="/audit" className="underline hover:text-ink">
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

        {/* ============ 06 · THE CLOSE ============ */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <span className="kicker">In conclusion</span>
            <h2 className="display mt-4 text-[2.1rem] leading-[1.05] text-ink sm:text-[2.8rem]">
              Right now, your next customer is asking AI for help.{" "}
              <span className="text-accent">
                Let&apos;s make your business the answer.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Tell it the search you want to win. The AI researches your
              market and builds the page, you refine it until it&apos;s right,
              and you publish when you&apos;re happy.
            </p>
            <div className="mt-9 flex justify-center">
              <CreateButton label="Build My Page — Free Preview" />
            </div>
            <p className="mt-4 text-sm text-muted">
              {PRICE_LABEL}{" "}
              once to publish &middot; free to preview &middot; no subscription
            </p>

            {/* Footnotes — the page cites its sources. */}
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

        {/* ============ Pre-footer — who-does-AI-recommend capture ============ */}
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

