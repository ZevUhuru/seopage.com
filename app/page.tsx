import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExampleShowcase, ANATOMY } from "@/components/ExampleShowcase";
import { JsonLd } from "@/components/JsonLd";
import { BuyButton } from "@/components/BuyButton";
import AnswerConsole from "@/components/AnswerConsole";
import { EmailCapture } from "@/components/EmailCapture";
import {
  DELIVERY_HOURS,
  PRICE_LABEL,
  PRICE_USD,
  PRODUCT,
} from "@/lib/config";

/* ================================================================
   Direct-response PAS structure, one goal (buy the page):
   Problem (hero) → Agitate (the compounding loss) → the Turn
   (tools diagnose, we cure) → Solution (the page + deliverable)
   → Proof (real AI-citation receipts) → Offer (price + guarantee)
   → FAQ → Close. The CTA repeats after every persuasion block.
   ================================================================ */

export const metadata: Metadata = {
  // Primary keyword ("SEO pages") front-loaded per title-tag guidance;
  // the template appends "| SEOPage".
  title: {
    absolute: `SEO Pages That Get Cited by AI and Rank on Google | SEOPage`,
  },
  description: `An SEO page is a page built to win one search. We build yours — researched, written, human-reviewed, engineered to rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews. ${PRICE_LABEL}, delivered within ${DELIVERY_HOURS} hours.`,
  alternates: { canonical: "/" },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an SEO page?",
    a: `An SEO page is a web page engineered to win one specific search: it targets a single keyword with a matching title tag, meta description, heading structure, content written for the search intent, and schema markup — so search engines can rank it and AI assistants can cite it. Ours are done for you: you name the search, we research the results, write the page, review it by hand, and deliver one complete ready-to-publish HTML file — not a draft you still have to fix.`,
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
    q: "How is this different from an AI visibility tool?",
    a: "AI visibility tools monitor whether ChatGPT, Perplexity, and Google AI mention your brand — they diagnose the problem, usually for a monthly subscription, and leave the fixing to you. We're the other half: we build the page those systems can actually cite. No dashboard, no subscription. One finished page, engineered to be quoted.",
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
    a: "Yes — every order includes an llms.txt file for your page, and we'll also tell you the truth about it. As of 2026 no major AI company has committed to reading llms.txt in production, and Google's own AI-optimization guidance says it isn't used for AI Overviews or AI Mode. It costs nothing to ship and it's there the day that changes, but anyone selling it to you as the reason you'll get cited is selling you a meta keywords tag. What actually earns a citation is duller: specific facts an assistant can quote, answers that still make sense lifted out of the page, valid structured data, and a site that isn't accidentally blocking the AI crawlers in robots.txt. We build for those.",
  },
  {
    q: "Is this AEO or GEO — answer engine optimization?",
    a: "Those are the names people are giving to the same job: getting your business named inside an AI answer instead of a blue link. We do it at the page level. In practice that means writing self-contained, quotable passages rather than long build-up; putting specific, checkable facts and numbers on the page, because generative engines lean on sources they can quote precisely; matching structured data to the content so the page is machine-readable; making the entity clear and consistent, so the assistant knows who you are; and confirming GPTBot, ClaudeBot, PerplexityBot, and Google's crawlers can actually reach your site. It's the same craft as good SEO, aimed at a surface that quotes instead of links.",
  },
  {
    q: "What if I don't like the page?",
    a: PRODUCT.satisfaction +
      " Reply to your delivery email with what you'd change and we'll revise it — and if it's still not right, we'll refund you in full.",
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
        "SEOPage builds done-for-you SEO pages: researched, written, human-reviewed, and engineered to be cited by AI search and rank on Google, delivered within hours.",
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
      description: `One researched, written, and human-reviewed SEO page built around a target keyword, engineered to be cited by AI search, delivered ready to publish within ${DELIVERY_HOURS} hours.`,
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

/* The deliverable, itemized like a receipt. This is the product. */
const DELIVERABLE: { t: string; d: string }[] = [
  { t: "Search-intent research", d: "What the results for your keyword reward, and why" },
  { t: "Competitor analysis", d: "What the pages that currently win have in common" },
  { t: "Title tag + meta description", d: "Written around your keyword, sized to fit" },
  { t: "Full written page", d: "Structured H1–H3, copy matched to search intent" },
  { t: "FAQ section", d: "Written to be quoted by Google and AI assistants" },
  { t: "Schema markup", d: "Valid structured data, matched to the content" },
  { t: "llms.txt file", d: "A plain-text index of your page, ready for the crawlers that read it" },
  { t: "AI-crawler access check", d: "We confirm GPTBot, ClaudeBot, and PerplexityBot aren't blocked from your site" },
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
        {/* ============ 00 · PROBLEM — bold, centered, minimal ============ */}
        <section className="relative overflow-hidden">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-4xl px-5 pb-16 pt-20 text-center sm:px-8 lg:pb-20 lg:pt-28">
            {/* The kicker is the real H1: primary keyword near the front, small
                by design — heading weight comes from the tag, not the font size.
                The fear line stays visually dominant below it. */}
            <h1 className="kicker rise">
              SEO pages that get cited by AI
            </h1>
            {/* The threat is red; blue stays reserved for the rescue (CTA). */}
            <p className="display rise rise-1 mx-auto mt-6 text-balance text-[2.75rem] leading-[1.02] text-ink sm:text-[3.8rem] lg:text-[4.4rem]">
              Customers are asking AI who to hire.{" "}
              <span className="text-[#d92d20]">
                It&apos;s recommending your competitor.
              </span>
            </p>
            <p className="rise rise-2 mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
              We build the SEO page that gets you recommended instead. The most
              powerful AI available does the research, I review every line
              myself, and it lands in your inbox within {DELIVERY_HOURS} hours.
            </p>
            <div className="rise rise-3 mt-9 flex justify-center">
              <BuyButton label={`Get Me Cited in AI — ${PRICE_LABEL}`} />
            </div>
            <p className="rise rise-4 mono mt-5 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
              Engineered to be cited &middot; {DELIVERY_HOURS}-hour delivery
              &middot; human-reviewed
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
                Every day the answer isn&apos;t you, the customer calls someone
                else.
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
                You&apos;re losing to a better page.
              </span>
            </p>

            {/* CTA repeat: catch the reader at peak agitation. */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <BuyButton label={`Get Me Cited in AI — ${PRICE_LABEL}`} />
              <p className="text-sm text-muted">
                One page. One keyword. Done in {DELIVERY_HOURS} hours.
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
                We build the page that wins it back.
              </span>
            </p>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Dashboards charge monthly to tell you you&apos;re invisible.
              The cure is one well-built page — that&apos;s what we sell.
            </p>
          </div>
        </section>

        {/* ============ 03 · SOLUTION — the page, and what's in it ============ */}
        <section id="the-fix" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="02" eyebrow="The fix" />
            <div className="mt-12 max-w-2xl">
              <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                One SEO page, built to be the answer.
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
              <div className="lg:pt-2">
                <h3 className="text-lg font-semibold text-ink">
                  Order to inbox in {DELIVERY_HOURS} hours
                </h3>
                <div className="mt-6 space-y-7">
                  {[
                    {
                      n: "01",
                      t: "Place your order",
                      d: `${PRICE_LABEL} through Stripe. No account, no subscription, no sales call.`,
                    },
                    {
                      n: "02",
                      t: "Tell us the search you want to win",
                      d: "A 5-minute brief: your business, your market, your goal, and what a customer should do on the page.",
                    },
                    {
                      n: "03",
                      t: "We research, write, and review",
                      d: "Search-intent research, competitor analysis, structured writing — then a person reviews the finished page.",
                    },
                    {
                      n: "04",
                      t: "It lands in your inbox",
                      d: "Ready-to-publish HTML with publishing instructions. Upload it anywhere.",
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
                  <BuyButton label={`Get Me Cited in AI — ${PRICE_LABEL}`} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 04 · THE PERSON — who reviews your page ============ */}
        <section id="founder" className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="03" eyebrow="Who's behind it" />
            <div className="mx-auto mt-12 grid max-w-4xl items-center gap-10 sm:grid-cols-[auto_1fr]">
              <div className="mx-auto text-center">
                {/* Wrapper clips; the image is zoomed and nudged right within it. */}
                <div className="h-44 w-44 overflow-hidden rounded-full border-2 border-accent">
                  <Image
                    src="/founder-zev-uhuru.png"
                    alt="Zev Uhuru, founder of SEOPage"
                    width={176}
                    height={176}
                    className="h-full w-full scale-[1.35] translate-x-2 translate-y-4 object-cover"
                  />
                </div>
                <p className="mt-3 text-sm text-muted">New York City</p>
              </div>
              <div>
                <p className="mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  A note from the founder
                </p>
                <p className="note mt-5">
                  I&apos;ve built landing pages professionally for over a
                  decade, for{" "}
                  <span className="font-semibold text-[#0b2c5b]">vroom.com</span>,{" "}
                  <span className="font-semibold text-[#c2560c]">fubo.tv</span>,{" "}
                  <span className="font-semibold text-[#00786a]">esy.com</span>,
                  and my own products.
                  SEOPage is that craft turned into a service. AI does in an
                  hour what used to take me a week of research and drafting,
                  though it still doesn&apos;t know which page is worth
                  publishing. That part is the decade, and I bring it to every
                  page before it ships.{" "}
                  <span className="note-close">
                    If it isn&apos;t a page I&apos;d publish myself, it
                    doesn&apos;t go out.
                  </span>
                </p>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                  <div>
                    <p className="font-semibold text-ink">Zev Uhuru</p>
                    <p className="text-sm text-muted">
                      Founder &middot; Marketing Engineer
                    </p>
                  </div>
                  <a
                    href="https://linkedin.com/in/zevuhuru"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Zev Uhuru on LinkedIn"
                    className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-2 transition hover:border-accent hover:text-accent"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 05 · OFFER — price, anchored, de-risked ============ */}
        <section id="pricing" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="04" eyebrow="The offer" />
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
                    The make-it-right guarantee
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                    Read the finished page. If anything&apos;s off, reply to
                    the delivery email and we&apos;ll revise it until
                    it&apos;s right. Still not happy? Full refund. You risk an
                    email; we risk the work.
                  </p>
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
                      "Engineered to be cited by AI search",
                      "Search-intent + competitor research",
                      "Title tag, meta description, and schema markup",
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
                      label={`Get Me Cited in AI — ${PRICE_LABEL}`}
                      className="btn btn-accent btn-lg w-full"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs text-muted">
                    Secure checkout by Stripe &middot; brief takes 5 minutes
                    &middot; revise-or-refund guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 05 · OBJECTIONS — the questions, answered ============ */}
        <section id="faq" className="bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 lg:pt-24">
            <ChapterHead n="05" eyebrow="The questions, answered" />
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

        {/* ============ 06 · THE CLOSE ============ */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <span className="kicker">In conclusion</span>
            <h2 className="display mt-4 text-[2.1rem] leading-[1.05] text-ink sm:text-[2.8rem]">
              The answer in your market is being written right now.{" "}
              <span className="text-accent">Put your name in it.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Tell us the search you want to win. The most powerful AI
              available does the research and builds the page, I review every
              line and sign it off, and it&apos;s in your inbox within{" "}
              {DELIVERY_HOURS} hours.
            </p>
            <div className="mt-9 flex justify-center">
              <BuyButton label={`Get Me Cited in AI — ${PRICE_LABEL}`} />
            </div>
            <p className="mt-4 text-sm text-muted">
              {PRICE_LABEL}{" "}
              once &middot; revise-or-refund guarantee &middot; no subscription
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

