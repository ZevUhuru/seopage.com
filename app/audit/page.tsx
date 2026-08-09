import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { BuyButton } from "@/components/BuyButton";
import { AuditRequestForm } from "@/components/AuditRequestForm";
import { AUDIT_HOURS, DELIVERY_HOURS, PRICE_LABEL } from "@/lib/config";

/* ================================================================
   Money page for the "seo page audit" cluster.

   The keyword research decided the shape of this page. "seo page
   audit" is KD 84 with ~455 referring domains needed for the top
   ten, and every result on page one is an automated scoring tool
   (Semrush, Ahrefs, SEOptimer, HOTH, AIOSEO, Backlinko). We are not
   out-linking Semrush this year. But the same cluster contains
   "on page seo audit" at KD 38 (1.3k/mo) and, crucially,
   "on page seo audit checklist" at KD 15 (300/mo) and
   "on-page seo audit checklist" at KD 12 (150/mo).

   So the page IS the checklist. Publishing the real thing wins the
   low-difficulty terms now, earns the links that make the head term
   reachable later, and gives AI assistants something specific to
   quote. The free audit converts the traffic that arrives.
   ================================================================ */

const TITLE = `SEO Page Audit: Free, Human-Reviewed, in ${AUDIT_HOURS} Hours | SEOPage`;
const DESCRIPTION = `An SEO page audit checks one page against the search it is trying to win. Get a free, human-reviewed audit of your page in ${AUDIT_HOURS} hours, plus the full 29-point on-page SEO audit checklist we run.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/audit" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://seopage.com/audit",
    siteName: "SEOPage",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/* The checklist. This is the page's real asset: the thing a reader can act on
   without buying anything, and the thing an assistant can quote. */
const CHECKLIST: { group: string; note: string; items: string[] }[] = [
  {
    group: "Intent and competition",
    note: "Most pages don't lose on technique. They lose because they answer a different question than the one being asked.",
    items: [
      "The dominant intent behind the query, and whether your page delivers that or something adjacent",
      "Format match against the pages currently ranking: guide, service page, comparison, tool, or listing",
      "Coverage gaps: subtopics every ranking page treats that yours doesn't mention",
      "Whether one page is trying to win two different searches at once",
      "Keyword cannibalization: other pages on your site competing for the same term",
    ],
  },
  {
    group: "The elements search engines read first",
    note: "The unglamorous layer. It is also the layer most often broken on pages that have had money spent on them.",
    items: [
      "Title tag: keyword position, character length, truncation risk, and whether Google is rewriting it",
      "Meta description: written or auto-generated, length, and whether it earns the click",
      "H1: present, singular, and matching the search rather than the brand",
      "H2 and H3 outline: logical order, question-shaped, carrying real subtopics",
      "URL slug: readable, keyword-bearing, free of dates and session junk",
      "Image file names and alt text, including whether the page's main image is described at all",
      "Canonical tag: present, self-referencing, and not pointing somewhere unintended",
    ],
  },
  {
    group: "The content itself",
    note: "Word count is a symptom, not a metric. What matters is whether the page settles the question.",
    items: [
      "Primary keyword in the first 100 words, in a sentence a human would actually write",
      "Depth measured against the ranking set, by subtopic coverage rather than length",
      "Answer-first structure: does the opening paragraph answer, or does it warm up",
      "Entity clarity: business name, service, and service area stated unambiguously on the page",
      "Freshness signals, including a dateModified that reflects reality",
      "Internal links in and out, and whether the page is orphaned from the rest of the site",
    ],
  },
  {
    group: "AI citation readiness",
    note: "The half of the audit most checklists still skip. Being crawlable by Google and being quotable by an assistant are not the same test.",
    items: [
      "Self-contained passages: do individual paragraphs still make sense lifted out of the page",
      "Specific, checkable facts and numbers rather than adjectives an assistant can't cite",
      "An FAQ block with matching FAQPage structured data",
      "Organization and Service schema, with sameAs links that tie the entity together",
      "robots.txt access for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, and Google-Extended",
      "Whether the page is cited today for your query in AI Overviews, ChatGPT, or Perplexity",
    ],
  },
  {
    group: "Technical fundamentals",
    note: "Rare causes of failure, but total ones. Worth five minutes to rule out.",
    items: [
      "Indexability: noindex tags, robots directives, and canonical conflicts",
      "Core Web Vitals on mobile: LCP, INP, and CLS against Google's thresholds",
      "Mobile rendering, tap-target spacing, and text that requires zooming",
      "Content that only exists after JavaScript runs, and whether crawlers see it",
      "Structured data validity errors, which silently disable rich results",
    ],
  },
];

const STEPS: { n: string; t: string; d: string }[] = [
  {
    n: "01",
    t: "Search your keyword and read the results",
    d: "Open the top ten in tabs. Before you look at your own page, work out what the results have in common: the format, the depth, the questions they all answer. That pattern is what Google is rewarding for this query.",
  },
  {
    n: "02",
    t: "Compare your page to that pattern, not to a score",
    d: "List the subtopics every ranking page covers and check them against yours. Missing coverage explains more lost rankings than any technical issue.",
  },
  {
    n: "03",
    t: "Check what the crawlers actually get",
    d: "View source rather than the rendered page. Confirm the title tag, H1, canonical, and body copy exist in the HTML, and that robots.txt isn't blocking the AI crawlers.",
  },
  {
    n: "04",
    t: "Ask an assistant your own question",
    d: "Put the query to ChatGPT, Perplexity, and Google's AI mode. Note who gets named and which sources are cited. If a competitor appears and you don't, that is the gap the page has to close.",
  },
  {
    n: "05",
    t: "Fix in order of consequence",
    d: "Intent mismatch first, then coverage, then the elements search engines read, then technical. Reversing that order is how people spend a week on alt text while the page answers the wrong question.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an SEO page audit?",
    a: "An SEO page audit is a review of one web page against the specific search it is trying to win. It checks whether the page matches the intent behind the query, whether it covers what the ranking pages cover, whether the title tag, meta description, heading structure, URL, and schema are correct, and whether search engines and AI assistants can crawl, understand, and quote it. A site audit looks at hundreds of pages shallowly; a page audit looks at one page properly.",
  },
  {
    q: "What is an on-page SEO audit?",
    a: "An on-page SEO audit examines the elements that live on the page itself: content, title tag, meta description, headings, internal links, images, URL structure, and structured data. It excludes off-page factors like backlinks and brand mentions, which come from other sites. On-page is the half you fully control, which is why it is the sensible place to start.",
  },
  {
    q: "How do I do an on-page SEO audit myself?",
    a: "Search your target keyword and study the top ten before you look at your own page, so you can see the format and coverage Google is rewarding. Compare your page's subtopic coverage to that set. View the page source to confirm the title, H1, canonical, and body content are in the HTML rather than generated by JavaScript. Check robots.txt for AI-crawler access. Then ask ChatGPT and Perplexity your own query and see who gets named. Fix in order of consequence: intent, coverage, on-page elements, then technical. The full 29-point checklist we run is published on this page.",
  },
  {
    q: "What is the difference between an on-page and an off-page SEO audit?",
    a: "An on-page audit reviews what is on the page: content, structure, metadata, and markup. An off-page audit reviews signals from elsewhere: backlinks, referring domains, brand mentions, and citations. Off-page work is slower and largely outside your control. On-page work is immediate and entirely yours, and for a single page targeting a specific search, it is usually where the ranking is actually being lost.",
  },
  {
    q: "Are free SEO audit tools any good?",
    a: "They are good at what they measure, which is a fixed list of technical checks: broken links, missing tags, page speed, image weight. What no automated tool can tell you is whether your page answers the question your customer is asking, or why the page ranking above you is winning. A score of 82/100 on a page that answers the wrong search is a page that will not rank. Run the free tools, then get a human to read the result.",
  },
  {
    q: "Is the audit really free? What's the catch?",
    a: `It's free, and the catch is that we hope you like it enough to have us build the page. We audit one page against one search, a person writes the findings, and it lands in your inbox within ${AUDIT_HOURS} hours. If the fixes are things you can do yourself, do them yourself and we're glad to have helped. If you would rather we build the page properly, that's ${PRICE_LABEL} and it's in your inbox within ${DELIVERY_HOURS} hours.`,
  },
  {
    q: `How long does the free audit take?`,
    a: `Within ${AUDIT_HOURS} hours. It is slower than the ${DELIVERY_HOURS}-hour promise on paid pages, on purpose: paying customers own the fast queue and a free audit should never be the reason an order slips. We also cap how many we take in a day, because a person reads every one.`,
  },
  {
    q: "Do you audit one page or the whole site?",
    a: "One page, against one search. That is a deliberate limit. A 200-page crawl produces a report nobody reads and a list of issues nobody prioritizes. One page against one query produces findings you can act on this afternoon. If you need several pages looked at, send the most important one first.",
  },
  {
    q: "What do I actually receive?",
    a: "A written audit of your page: what the search is rewarding, where your page diverges from that, the specific on-page problems in priority order, whether AI assistants can currently cite you, and what we would change first. It is prose written by a person, not a PDF of red and green dots.",
  },
];

const CHECK_COUNT = CHECKLIST.reduce((n, g) => n + g.items.length, 0);

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://seopage.com/audit#service",
      serviceType: "SEO page audit",
      name: "Free SEO page audit",
      provider: { "@id": "https://seopage.com/#organization" },
      description: `A human-reviewed audit of one web page against the search it is trying to win, delivered within ${AUDIT_HOURS} hours.`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://seopage.com/audit",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://seopage.com/audit#breadcrumbs",
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
          name: "SEO page audit",
          item: "https://seopage.com/audit",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://seopage.com/audit#faq",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function AuditPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <SiteHeader />
      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-3xl px-5 pb-14 pt-16 text-center sm:px-8 lg:pb-16 lg:pt-24">
            <h1 className="kicker rise">SEO page audit</h1>
            <p className="display rise rise-1 mx-auto mt-5 text-balance text-[2.2rem] leading-[1.05] text-ink sm:text-[3rem]">
              Find out why your page isn&apos;t the answer.
            </p>
            <p className="rise rise-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Send us one page and the search you want it to win. A person reads
              it against the results that are beating you and emails you what
              is actually wrong, within {AUDIT_HOURS} hours. Free.
            </p>
            <p className="rise rise-3 mono mt-6 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
              {CHECK_COUNT}-point audit &middot; human-reviewed &middot; no
              account, no card
            </p>
          </div>
        </section>

        {/* ============ THE DIFFERENTIATOR ============ */}
        <section className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="kicker">Why this isn&apos;t another scanner</span>
            <h2 className="display mt-4 text-balance text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
              Every free SEO audit tool gives you a score. None of them will
              tell you why you&apos;re losing the search.
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="card p-6">
                <p className="mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  What a scanner returns
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                  A number out of 100, a red flag on four images missing alt
                  text, a warning that your meta description is eleven
                  characters too long, and a suggestion to improve page speed.
                  All true. None of it explains why the page above you is
                  winning.
                </p>
              </div>
              <div className="card p-6">
                <p className="mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  What a person returns
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                  That the query is a comparison search and your page is a
                  brochure. That the three pages beating you all answer a
                  question you never mention. That your business name appears
                  once, in an image. That is not a score. That is the reason.
                </p>
              </div>
            </div>
            <p className="mt-8 text-[1.05rem] leading-relaxed text-ink-2">
              A page can score 82 out of 100 and still never rank, because the
              score measures compliance and the ranking measures whether you
              answered the question. We run the automated checks too. Then
              someone who has built landing pages for a decade reads the page
              and tells you the part a crawler can&apos;t see.
            </p>
          </div>
        </section>

        {/* ============ THE FORM ============ */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <AuditRequestForm />
          </div>
        </section>

        {/* ============ THE CHECKLIST ============ */}
        <section className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
            <span className="kicker">The checklist</span>
            <h2 className="display mt-4 text-balance text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
              The {CHECK_COUNT}-point on-page SEO audit checklist we run
            </h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-2">
              This is the whole thing, in the order we work through it. Take it
              and run it yourself if you&apos;d rather. Most audit checklists
              published online stop at the technical layer, which is the layer
              least likely to be why your page is losing.
            </p>

            <div className="mt-10 space-y-10">
              {CHECKLIST.map((group, gi) => (
                <div key={group.group}>
                  <div className="flex items-baseline gap-3">
                    <span className="mono text-[11px] text-accent">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.15rem] font-semibold text-ink">
                      {group.group}
                    </h3>
                  </div>
                  <p className="mt-2 pl-8 text-[0.92rem] leading-relaxed text-muted">
                    {group.note}
                  </p>
                  <ul className="mt-4 space-y-2.5 border-l border-line pl-8">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="relative text-[0.95rem] leading-relaxed text-ink-2"
                      >
                        <span
                          className="absolute -left-[2.05rem] top-[0.6rem] h-1.5 w-1.5 rounded-full bg-line-strong"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HOW TO DO IT YOURSELF ============ */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
            <span className="kicker">Do it yourself</span>
            <h2 className="display mt-4 text-balance text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
              How to do an on-page SEO audit in five steps
            </h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-2">
              You do not need a subscription to any of this. You need an
              afternoon and the discipline to look at the search results before
              you look at your own page.
            </p>
            <div className="mt-10 space-y-8">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <span className="mono shrink-0 text-[0.8rem] text-accent">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-ink">
                      {s.t}
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">
                      {s.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ THE UPSELL ============ */}
        <section className="border-b border-line bg-ink text-white">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 lg:py-20">
            <p className="mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              After the audit
            </p>
            <p className="display mt-5 text-balance text-[1.8rem] leading-[1.15] sm:text-[2.3rem]">
              An audit tells you what&apos;s wrong.
              <br />
              <span className="text-[#8b93f8]">
                Someone still has to build the page.
              </span>
            </p>
            <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/70">
              If the fixes are small, do them yourself. If the honest answer is
              that the page needs rebuilding around the search, we do that for{" "}
              {PRICE_LABEL}: researched, written, human-reviewed, in your inbox
              within {DELIVERY_HOURS} hours.
            </p>
            <div className="mt-9 flex justify-center">
              <BuyButton label={`Get Me Cited in AI — ${PRICE_LABEL}`} />
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
            <span className="kicker">The questions, answered</span>
            <h2 className="display mt-4 text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
              SEO page audits, explained
            </h2>
            <div className="mt-10 divide-y divide-line border-t border-line">
              {FAQS.map((f) => (
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

            <div className="mt-14 rounded-lg border border-line bg-surface-2 p-6 text-center sm:p-8">
              <p className="text-[1.05rem] font-semibold text-ink">
                Ready when you are.
              </p>
              <p className="mx-auto mt-2 max-w-lg text-ink-2">
                Send the page and the search. We&apos;ll tell you what&apos;s
                wrong with it, free, within {AUDIT_HOURS} hours.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="#free-audit" className="btn btn-accent px-6 py-3">
                  Audit my page — free
                </a>
                <Link href="/" className="btn btn-ghost px-6 py-3">
                  See what we build instead
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
