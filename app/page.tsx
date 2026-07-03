import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ExampleShowcase, ANATOMY } from "@/components/ExampleShowcase";
import { IntakeMock } from "@/components/ProductMock";
import { JsonLd } from "@/components/JsonLd";
import { CREATE_URL, PRICE_LABEL, PRODUCT } from "@/lib/config";

/* ================================================================
   The homepage is written as an essay: a hook and thesis in the
   hero, numbered chapters of supporting evidence, one rhetorical
   turn, and a conclusion that calls back to the opening claim.
   Every chapter ends with a hand-off sentence into the next.
   ================================================================ */

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
    a: "Yes. A lot of local businesses run a separate landing page for each city or service they offer, so every one targets its own keyword. That one-page-per-city pattern is the standard local SEO playbook. Build them one at a time here. Each page is $29 and yours to keep.",
  },
  {
    q: "Will it actually rank on Google?",
    a: "The page is built on the fundamentals Google rewards: a keyword-focused title and description, clean headings, content written for your area, and valid structured data. How fast it climbs depends on your domain and competition. Hyper-local searches with weak competition can move in weeks; harder markets take longer. Either way, the page itself won't be the thing holding you back.",
  },
  {
    q: "Won't Google penalize a page written with AI?",
    a: "No. Google's published position is that it rewards quality “rather than how content is produced.” What gets penalized is mass-produced spam churned out to game rankings. This is one researched page about your real business, your real service, and your real town, reviewed by you before you publish it.",
  },
  {
    q: "How does it get found by ChatGPT or Perplexity?",
    a: "AI tools answer by reading and citing pages that answer questions clearly. We write your FAQ to be easy to quote and add matching FAQPage data, so an AI can point people to your business by name. The searches your customers make already show AI answers up top, so this matters now, not someday.",
  },
  {
    q: "What do I get for $29, and do I need a website?",
    a: "One finished SEO landing page as a single HTML file: local copy, a responsive design, a title tag and meta description, and LocalBusiness, Service, and FAQPage schema. You don't need an existing site. Put the file on any host or paste it into your site builder. You preview the whole page free and only pay if you want to publish it.",
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
        "A complete, designed local SEO landing page with researched copy, styling, and schema.org structured data (LocalBusiness, Service, FAQPage), delivered as one ready-to-publish file you own.",
      brand: { "@id": "https://seopage.com/#organization" },
      offers: {
        "@type": "Offer",
        price: "29.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://create.seopage.com",
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

/* The essay's evidence base. Sources are linked in the footnote line. */
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

export default function Home() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <SiteHeader />
      <main>
        {/* ============ 00 · HERO — the hook and the thesis ============ */}
        <section className="relative overflow-hidden">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 lg:pb-28 lg:pt-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
              <div>
                <span className="kicker rise">
                  Local SEO landing pages, done for you
                </span>
                <h1 className="display rise rise-1 mt-5 text-[2.5rem] leading-[1.03] text-ink sm:text-[3.35rem] lg:text-[3.8rem]">
                  Your next customer just asked AI who to call.{" "}
                  <span className="text-accent">Be the answer.</span>
                </h1>
                <p className="rise rise-2 mt-6 max-w-xl text-[1.075rem] leading-relaxed text-ink-2">
                  Google and ChatGPT answer that question the same way: they
                  read a page and repeat the clearest one they find. We build
                  that page for your business. Researched, written, and
                  structured for your town, in about two minutes, for{" "}
                  {PRICE_LABEL}.
                </p>
                <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
                  <a href={CREATE_URL} className="btn btn-accent btn-lg">
                    Build my page
                  </a>
                  <a href="#shift" className="btn btn-ghost btn-lg">
                    Read why it matters
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
                    <Dot /> Yours to publish anywhere
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

        {/* ============ 01 · THE SHIFT — context for the thesis ============ */}
        <section id="shift" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="01" eyebrow="How people search now" />
            <div className="mx-auto mt-12 max-w-3xl">
              <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                The search results page quietly stopped sending clicks.
              </h2>
              <div className="measure mt-8 space-y-6 text-[1.06rem] leading-[1.75] text-ink-2">
                <p className="dropcap">
                  For twenty years, being found meant one thing: show up in the
                  blue links. That era is ending faster than most local
                  businesses realize. Last year, 6% of consumers asked an AI
                  tool to recommend a local business. This year it&apos;s 45%,
                  which makes AI the third most-used source of local
                  recommendations in America, ahead of Yelp.
                </p>
                <p>
                  Google itself changed just as much. Two thirds of local
                  searches now open with an AI-written answer above the
                  results, and when that answer appears, clicks on the
                  results below it nearly halve. Ask something specific, like
                  what a roof repair costs in your city, and an AI answers
                  first almost every time.
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

            {/* The evidence block: oversized numerals, cited. */}
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
                So the only question that matters has changed. It&apos;s no
                longer &ldquo;where do I rank,&rdquo; but: when a machine reads
                about your trade in your town, is there a page about you worth
                quoting?
              </p>
            </div>
          </div>
        </section>

        {/* ============ 02 · THE PAGE — what "worth quoting" looks like ============ */}
        <section id="example" className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="02" eyebrow="What a citable page looks like" />
            <div className="mt-12 max-w-2xl">
              <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                One page, built to be quoted.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">
                This is the actual shape of what we deliver. Five things make
                it work, and they&apos;re the same five things most landing
                pages skip.
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

            <div className="mx-auto mt-16 max-w-3xl">
              <p className="handoff">
                Nothing on that page is exotic. It&apos;s the standard local
                SEO playbook, done completely instead of almost. The
                interesting part is how it gets made.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 03 · THE METHOD — the product itself ============ */}
        <section id="how" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="03" eyebrow="How it works" />
            <div className="mt-12 grid items-center gap-14 lg:grid-cols-2">
              <div>
                <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                  Three details in. A finished page out.
                </h2>
                <div className="mt-10 space-y-8">
                  {[
                    {
                      n: "01",
                      t: "Tell us about your business",
                      d: "Your name, what you do, and where. That's the whole form. Add a keyword or a website if you have one; if not, the research fills the gaps.",
                    },
                    {
                      n: "02",
                      t: "We research and write the page",
                      d: "Your local market, the keyword worth targeting, what buyers in your city actually want, and the questions they ask. Then the page is written around it, with the title tag, schema, and design handled.",
                    },
                    {
                      n: "03",
                      t: "Preview free, publish for " + PRICE_LABEL,
                      d: "Read the whole finished page before paying anything. Happy with it? " + PRICE_LABEL + " unlocks the file, and it's yours forever.",
                    },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-5">
                      <span className="mono pt-0.5 text-sm font-semibold text-accent">
                        {s.n}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-ink">
                          {s.t}
                        </h3>
                        <p className="mt-1.5 max-w-md text-[0.95rem] leading-relaxed text-ink-2">
                          {s.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The real product: the intake screen from create.seopage.com */}
              <div className="pb-8 pr-1 sm:pr-7">
                <IntakeMock />
              </div>
            </div>

            <div className="mx-auto mt-20 max-w-3xl">
              <p className="handoff">
                The research is real research and the writing is real writing.
                What changed isn&apos;t the work. It&apos;s what the work
                costs.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 04 · THE TURN — the essay's pivot, its one dark moment ============ */}
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 lg:py-32">
            <p className="mono text-[11px] uppercase tracking-[0.16em] text-white/40">
              The turn
            </p>
            <p className="display mt-6 text-[2rem] leading-[1.12] sm:text-[2.7rem]">
              Being findable used to be a retainer.
              <br />
              <span className="text-[#8b93f8]">Now it&apos;s a page.</span>
            </p>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Agencies bill monthly for the outcome a well-built page mostly
              delivers on its own. We&apos;d rather just sell you the page.
            </p>
          </div>
        </section>

        {/* ============ 05 · THE MATH — pricing, anchored ============ */}
        <section id="pricing" className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <ChapterHead n="04" eyebrow="What it costs" />
            <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <h2 className="display reveal text-[1.9rem] leading-[1.08] text-ink sm:text-[2.4rem]">
                  One page. {PRICE_LABEL}. Once.
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
                  For context, here&apos;s what this exact deliverable costs
                  everywhere else.
                </p>

                <div className="mt-8 max-w-md divide-y divide-line border-y border-line">
                  {[
                    ["SEO agency, per page", "$300–$1,000"],
                    ["Freelance landing page, average", "~$350"],
                    ["Landing page builder, and you still write it", "$768+/yr"],
                    ["SEOPage, finished and yours", PRICE_LABEL + " once"],
                  ].map(([l, p], i) => (
                    <div
                      key={l}
                      className={`flex items-baseline justify-between gap-4 py-3.5 ${
                        i === 3 ? "font-semibold text-ink" : "text-ink-2"
                      }`}
                    >
                      <span className="text-[0.95rem]">{l}</span>
                      <span
                        className={`mono text-[0.95rem] ${
                          i === 3 ? "text-accent" : "text-muted"
                        }`}
                      >
                        {p}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 max-w-md text-sm text-muted">
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
                      "An FAQ written to be quoted by AI search",
                      "A complete, styled page in one file you own",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check sm />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CREATE_URL}
                    className="btn btn-accent btn-lg mt-7 w-full"
                  >
                    Build my page
                  </a>
                  <p className="mt-3 text-center text-xs text-muted">
                    Preview free &middot; Secure checkout by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 06 · OBJECTIONS — the questions, answered ============ */}
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
          </div>
        </section>

        {/* ============ 07 · THE CLOSE — conclusion, calling back to the thesis ============ */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <span className="kicker">In conclusion</span>
            <h2 className="display mt-4 text-[2.1rem] leading-[1.05] text-ink sm:text-[2.8rem]">
              Someone nearby is asking for a business like yours right now.{" "}
              <span className="text-accent">Be the answer.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              The way people search changed. The fix is still one well-built
              page. Tell us about your business, read the finished page free,
              and publish it for {PRICE_LABEL} if it earns it.
            </p>
            <a href={CREATE_URL} className="btn btn-accent btn-lg mt-9">
              Build my page
            </a>
            <p className="mt-4 text-sm text-muted">
              About two minutes &middot; Preview free &middot; No subscription
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

/** The hero's proof: a Google result and an AI answer, drawn from one page. */
function SearchPanel() {
  return (
    <div className="card overflow-hidden shadow-lg">
      {/* Google organic result */}
      <div className="border-b border-line p-5 sm:p-6">
        <div className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-muted">
          Google &middot; organic result
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-surface-3 text-[9px] font-bold">
            S
          </span>
          summitroofingdenver.com
        </div>
        <span className="mt-1 block text-[1.05rem] font-medium leading-snug text-accent">
          Emergency Roof Repair in Denver | Summit Roofing Co.
        </span>
        <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-2">
          Same-day roof repair across Denver. Licensed, insured, 24/7 storm
          response. Free inspection and no-pressure estimate.
        </p>
        <div className="mt-2 flex items-center gap-3 text-[0.78rem] text-muted">
          <span className="text-amber-500">★★★★★</span>
          <span>4.9 &middot; 380 reviews</span>
          <span className="text-line-strong">&middot;</span>
          <span>FAQ</span>
        </div>
      </div>

      {/* AI answer */}
      <div className="bg-surface-2 p-5 sm:p-6">
        <div className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-muted">
          AI answer
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

      {/* The connective caption: both surfaces, one source */}
      <div className="border-t border-line px-5 py-3 sm:px-6">
        <p className="mono text-[10px] uppercase tracking-[0.14em] text-muted">
          Two ways to be found &middot; one page behind both
        </p>
      </div>
    </div>
  );
}
