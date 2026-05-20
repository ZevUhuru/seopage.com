import Link from "next/link";
import { GeneratorDemo } from "@/components/GeneratorDemo";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  examplePages,
  faqHome,
  includedFeatures,
  pageTypes,
  stackSteps,
  trustLogos,
} from "@/lib/data";

const SAMPLE_REQUEST_HREF =
  "mailto:hello@seopage.com?subject=SEOPage%20sample%20request&body=Site%20URL%3A%20%0ACompetitors%20or%20keywords%3A%20%0A";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader active="home" />
      <main>
        <Hero />
        <Logos />
        <PageTypes />
        <SerpPreview />
        <Pipeline />
        <Anatomy />
        <Comparison />
        <ExamplesStrip />
        <Words />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <Pill>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-deep)]" />
              Public beta · SEO landing page packs from $19
            </Pill>

            <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-[var(--ink)] sm:text-6xl lg:text-[70px]">
              Generate competitive SEO landing pages from your website.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
              Paste your URL, add competitors if you have them, and turn the obvious
              buyer-intent searches into comparison, alternatives, best-of, FAQ, and
              category pages. Built to give you the structure, copy, and SEO basics for
              each SEO landing page in one pass.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={SAMPLE_REQUEST_HREF}
                className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--ink-soft)]"
              >
                Get a sample →
              </Link>
              <Link
                href="/examples"
                className="rounded-full border border-[var(--rule-strong)] bg-transparent px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--paper-soft)]"
              >
                See sample SEO landing pages
              </Link>
              <Link
                href="/how-it-works"
                className="px-2 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
              >
                How it works →
              </Link>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-3 text-sm">
              <Stat term="Landing page packs" value="From $19" />
              <Stat term="Page types" value="Common" />
              <Stat term="Export" value="HTML / MDX" />
            </dl>
          </div>

          <div className="relative lg:pl-4">
            <GeneratorDemo />
          </div>
        </div>
      </div>

      <SerpDivider />
    </section>
  );
}

function Stat({ term, value }: { term: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-4 shadow-sm">
      <dd className="text-sm font-semibold text-[var(--ink)]">{value}</dd>
      <dt className="eyebrow mt-2">{term}</dt>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)] shadow-sm">
      {children}
    </span>
  );
}

function BackgroundGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,rgba(217,255,95,0.10),transparent_70%)]" />
    </div>
  );
}

function SerpDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="dotted-rule" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Trust strip                                                                */
/* -------------------------------------------------------------------------- */

function Logos() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="eyebrow">Built for</p>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {trustLogos.map((name) => (
            <li
              key={name}
              className="serif text-xl text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Page types                                                                 */
/* -------------------------------------------------------------------------- */

function PageTypes() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="The pages SEOPage generates"
        title={
          <>
            Bottom-of-funnel SEO landing pages.{" "}
            <span className="serif italic text-[var(--muted)]">The ones buyers search for.</span>
          </>
        }
        copy="SEOPage starts with the common SEO landing page formats people already search for: comparisons, alternatives, best-of lists, FAQ hubs, category pages, and related bottom-of-funnel variants. The first templates give you structure, copy, metadata, FAQs, and export in one focused workflow."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pageTypes.map((p, i) => (
          <article
            key={p.key}
            className={`group relative overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-6 transition hover:border-[var(--rule-strong)] ${
              i === 0 ? "lg:col-span-1" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">{p.label}</span>
              <span className="mono rounded-full bg-[var(--signal-soft)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--signal-deep)]">
                {p.intent.split(" · ")[0]}
              </span>
            </div>
            <h3 className="serif mt-5 text-3xl leading-tight text-[var(--ink)]">
              {p.subtitle}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{p.description}</p>
            <div className="mt-6 flex items-end justify-between border-t border-[var(--rule)] pt-5">
              <div>
                <p className="serif text-2xl text-[var(--ink)]">{p.metric.value}</p>
                <p className="eyebrow mt-1">{p.metric.unit}</p>
              </div>
              <Link
                href={`/examples?type=${p.key}`}
                className="text-xs font-medium text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
              >
                Example →
              </Link>
            </div>
          </article>
        ))}

        <Link
          href="/examples"
          className="group relative grid place-items-center overflow-hidden rounded-2xl border border-dashed border-[var(--rule-strong)] bg-[var(--background)] p-6 text-center transition hover:bg-[var(--paper-soft)]"
        >
          <div>
            <p className="serif text-2xl leading-tight text-[var(--ink)]">
              Explore the full library.
            </p>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              Sample SEO landing pages across every type, generated end to end.
            </p>
            <span className="mt-5 inline-block text-sm font-medium text-[var(--ink)]">
              All examples →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SERP preview                                                               */
/* -------------------------------------------------------------------------- */

function SerpPreview() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="What it looks like in Google"
            align="left"
            title={
              <>
                Pages with the <span className="serif italic">basic SEO pieces</span> in
                place.
              </>
            }
            copy="Each generated page includes title tags, meta descriptions, FAQ sections, schema suggestions, and internal-link ideas. Google still decides what ranks, but the page starts with the right ingredients."
          />

          <ul className="mt-8 space-y-3 text-sm text-[var(--ink-soft)]">
            <BulletItem>Title and meta description options</BulletItem>
            <BulletItem>FAQ and structured-data suggestions</BulletItem>
            <BulletItem>Internal-link ideas for your existing site</BulletItem>
            <BulletItem>Sections for comparisons, verdicts, objections, and CTAs</BulletItem>
          </ul>

          <Link
            href="/examples/best-ai-writing-tools-2026"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--rule-strong)] bg-[var(--paper)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--paper-soft)]"
          >
            Open a sample page
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <SerpMockup />
      </div>
    </section>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal-deep)]" />
      {children}
    </li>
  );
}

function SerpMockup() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_30%,rgba(201,242,91,0.22),transparent_55%)] blur-2xl"
      />
      <div className="overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--paper)] shadow-[0_30px_80px_-40px_rgba(12,13,16,0.4)]">
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b border-[var(--rule)] bg-[var(--background)] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex flex-1 items-center gap-2 rounded-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-1.5 text-xs text-[var(--ink-soft)]">
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">google.com/search?q=</span>
            <span className="mono text-[var(--ink)]">clip.art vs canva</span>
          </div>
        </div>

        {/* SERP result */}
        <div className="space-y-5 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-xs text-[var(--ink-soft)]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--signal)] text-[var(--signal-deep)]">
              <span className="text-[10px] font-bold">SP</span>
            </span>
            <div className="leading-tight">
              <div className="text-[var(--ink)]">seopage.com</div>
              <div className="text-[11px] text-[var(--muted)]">https://seopage.com › clip-art-vs-canva</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl text-[#1a0dab]">
              clip.art vs Canva: Which One Fits Your Clip Art Workflow? · SEOPage
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-6 text-[var(--ink-soft)]">
              We compared focused clip art generation with a broader design suite across
              export, licensing, speed, and fit. Verdict, side-by-side table, and use cases.
            </p>
          </div>

          {/* Sitelinks */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 border-l-2 border-[var(--rule-strong)] pl-4 text-[13px]">
            <Sitelink title="Feature comparison" path="#features" />
            <Sitelink title="Output model" path="#pricing" />
            <Sitelink title="When to pick which" path="#verdict" />
            <Sitelink title="Use cases" path="#use-cases" />
          </div>

          {/* FAQ rich result */}
          <div className="mt-3 overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--background)]">
            {[
              "Is clip.art better than Canva for clip art?",
              "Can I use generated clip art commercially?",
              "Which is faster for transparent PNG clip art?",
            ].map((q, i) => (
              <div
                key={q}
                className={`flex items-center justify-between px-4 py-3 text-[13.5px] text-[var(--ink)] ${
                  i !== 0 ? "border-t border-[var(--rule)]" : ""
                }`}
              >
                <span>{q}</span>
                <svg viewBox="0 0 12 12" className="h-3 w-3 text-[var(--muted)]" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-[var(--rule)] pt-4 text-[11px] text-[var(--muted)]">
            <span className="mono uppercase tracking-[0.18em]">SEOPage example</span>
            <span className="flex items-center gap-3">
              <span>Schema · 4 valid</span>
              <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
                <span>Review required</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sitelink({ title, path }: { title: string; path: string }) {
  return (
    <div>
      <span className="text-[#1a0dab]">{title}</span>
      <div className="text-[11px] text-[var(--muted)]">seopage.com/clip-art-vs-canva{path}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pipeline                                                                   */
/* -------------------------------------------------------------------------- */

function Pipeline() {
  return (
    <section className="bg-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeader
          eyebrow="The pipeline"
          title={
            <>
              Four steps. From URL to <span className="serif italic">SEO landing page.</span>
            </>
          }
          copy="One focused loop: understand the product, choose the page type, generate the SEO landing page, then export it into your publishing workflow."
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stackSteps.map((s) => (
            <li
              key={s.number}
              className="relative rounded-2xl border border-[var(--rule)] bg-[var(--background)] p-6"
            >
              <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--signal-deep)]">
                Step {s.number}
              </span>
              <h3 className="serif mt-5 text-3xl leading-tight text-[var(--ink)]">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{s.body}</p>
              <p className="mono mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {s.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Anatomy of a generated page                                                */
/* -------------------------------------------------------------------------- */

function Anatomy() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="What's in every SEO landing page"
        title={
          <>
            Six things every SEO landing page includes —{" "}
            <span className="serif italic">the practical pieces that save time.</span>
          </>
        }
        copy="The value is not generic AI prose. It is a complete SEO landing page shape for a specific search intent, with the common SEO and conversion pieces already in place."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2 lg:grid-cols-3">
        {includedFeatures.map((f) => (
          <div key={f.title} className="flex flex-col gap-4 bg-[var(--paper)] p-7">
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              {f.tag}
            </span>
            <h3 className="serif text-2xl leading-tight text-[var(--ink)]">{f.title}</h3>
            <p className="mt-auto text-sm leading-7 text-[var(--ink-soft)]">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Comparison strip                                                           */
/* -------------------------------------------------------------------------- */

function Comparison() {
  return (
    <section className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--signal)]">
              Vs the alternatives
            </span>
            <h2 className="serif mt-5 text-balance text-4xl leading-tight sm:text-5xl">
              A focused SEO landing page beats a blank prompt.
            </h2>
          </div>
          <p className="text-base leading-8 text-[var(--paper)]/70">
            SEOPage is for the SEO landing pages you know you should make but never get around to:
            comparison pages, alternative pages, best-of lists, FAQs, and category pages
            with the right sections already in place.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-white/12">
          <div className="mono grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 border-b border-white/10 bg-white/5 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[var(--paper)]/55">
            <span>Capability</span>
            <span className="text-center">Agency workflow</span>
            <span className="text-center">Generic AI chat</span>
            <span className="text-center text-[var(--signal)]">SEOPage</span>
          </div>
          {[
            ["Starts from your website", "Usually", "Only if you paste it", "Yes"],
            ["Page type chosen for search intent", "Usually", "You decide", "Yes"],
            ["Tables, FAQs, and metadata", "Manual", "Prompt-dependent", "Included"],
            ["Internal-link suggestions", "Manual", "Prompt-dependent", "Included"],
            ["Requires human review", "Yes", "Yes", "Yes"],
            ["Launch pricing", "Varies", "Model cost + time", "SEO landing page packs"],
          ].map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-sm ${
                i !== 0 ? "border-t border-white/8" : ""
              }`}
            >
              <span className="text-[var(--paper)]">{row[0]}</span>
              <span className="text-center text-[var(--paper)]/55">{row[1]}</span>
              <span className="text-center text-[var(--paper)]/55">{row[2]}</span>
              <span className="text-center font-medium text-[var(--signal)]">{row[3]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Example pages strip                                                        */
/* -------------------------------------------------------------------------- */

function ExamplesStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeader
        eyebrow="From the library"
        title={
          <>
            Three pages, generated end to end.{" "}
            <span className="serif italic">Use them to judge the shape.</span>
          </>
        }
        copy="These examples show the kind of structure SEOPage is meant to produce: clear sections, useful comparisons, FAQ blocks, metadata, and exportable page copy."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {examplePages.map((ex) => (
          <Link
            key={ex.slug}
            href={`/examples/${ex.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-6 transition hover:border-[var(--rule-strong)]"
          >
            <div className="flex items-center justify-between">
              <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--signal-deep)]">
                {labelFor(ex.type)}
              </span>
              <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                Sample
              </span>
            </div>
            <h3 className="serif mt-5 text-3xl leading-tight text-[var(--ink)]">
              {ex.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{ex.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {ex.schema.map((s) => (
                <span
                  key={s}
                  className="mono rounded-full bg-[var(--background)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--ink-soft)]"
                >
                  {s}
                </span>
              ))}
            </div>
            <span className="mt-auto pt-6 text-sm font-medium text-[var(--ink)]">
              Open page →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function labelFor(type: string) {
  return type === "vs"
    ? "Comparison"
    : type === "alt"
      ? "Alternative"
      : type === "best"
        ? "Best-of"
        : type === "faq"
          ? "FAQ hub"
          : "Category";
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */

function Words() {
  return (
    <section className="bg-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "What you get",
              body: "A competitive SEO landing page with a brief, outline, title/meta, body copy, FAQ, schema suggestions, and exportable copy.",
            },
            {
              title: "What you still do",
              body: "Review facts, edit voice, add proof, check claims, and publish inside your own CMS.",
            },
            {
              title: "Where it helps",
              body: "Use it when you already know your product deserves comparison pages, alternative pages, or category pages, but writing each one from scratch slows you down.",
            },
          ].map((t) => (
            <figure
              key={t.title}
              className="relative overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--background)] p-7"
            >
              <span
                aria-hidden="true"
                className="serif absolute -left-1 -top-6 text-[110px] leading-none text-[var(--signal-deep)]/15"
              >
                ”
              </span>
              <h3 className="serif relative text-2xl leading-snug text-[var(--ink)]">{t.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">{t.body}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="serif mt-5 text-balance text-4xl leading-tight">
            What people should know before they buy.
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--ink-soft)]">
            Still unsure?{" "}
            <Link href="mailto:hello@seopage.com" className="underline underline-offset-4">
              Email us
            </Link>{" "}
            and we&apos;ll tell you what is available in the beta.
          </p>
        </div>

        <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {faqHome.map((f) => (
            <li key={f.q} className="py-6">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-medium text-[var(--ink)] [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--rule-strong)] text-[var(--ink-soft)] transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                        */
/* -------------------------------------------------------------------------- */

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--ink)] p-10 text-[var(--paper)] sm:p-14">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,242,91,0.32),transparent_60%)] blur-3xl"
        />
        <span className="mono relative text-[11px] uppercase tracking-[0.22em] text-[var(--signal)]">
          Start with a small pack
        </span>
        <h2 className="serif relative mt-6 max-w-2xl text-balance text-5xl leading-tight sm:text-6xl">
          Start with a few pages and see what is useful.
        </h2>
        <p className="relative mt-6 max-w-xl text-base leading-8 text-[var(--paper)]/70">
          Paste your URL, choose a page type, and generate an SEO landing page you can
          export into your site. Start with a small pack and expand from there.
        </p>
        <div className="relative mt-9 flex flex-wrap gap-3">
          <Link
            href={SAMPLE_REQUEST_HREF}
            className="rounded-full bg-[var(--signal)] px-6 py-3.5 text-sm font-medium text-[var(--signal-deep)] transition hover:brightness-95"
          >
            Get a sample →
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-white/5"
          >
            See SEO landing page packs
          </Link>
          <Link
            href="mailto:hello@seopage.com"
            className="px-2 py-2 text-sm font-medium text-[var(--paper)]/75 transition hover:text-[var(--paper)]"
          >
            Talk to us →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "row",
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  align?: "row" | "left";
}) {
  if (align === "left") {
    return (
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="serif mt-5 text-balance text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)]">{copy}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[0.6fr_0.4fr] md:items-end">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="serif mt-5 text-balance text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md text-sm leading-7 text-[var(--ink-soft)] md:text-base md:leading-8">
        {copy}
      </p>
    </div>
  );
}
