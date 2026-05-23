import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  CHECKOUT_HREF,
  faqHome,
  included,
  NOTIFY_HREF,
  offer,
  pageTypes,
  steps,
} from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader active="home" />
      <main>
        <Hero />
        <Proof />
        <Included />
        <Process />
        <FAQ />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Proof — esy.com Ahrefs data                                                */
/* -------------------------------------------------------------------------- */

function Proof() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Proof</span>
          <h2 className="serif mt-4 text-balance text-3xl leading-[1.1] text-[var(--ink)] sm:text-4xl lg:text-[44px]">
            Two products. The same workflow.{" "}
            <span className="italic text-[var(--ink-soft)]">
              Cited by ChatGPT, ranked on Google.
            </span>
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">
            esy.com and clip.art — both engineered with deep research, schema,
            FAQ, direct answers, and entity signals — show up in AI search
            results and Google. Live Ahrefs data, no anonymized case studies.
          </p>
        </div>

        <CaseStudy
          eyebrow="Case study · esy.com · B2B platform · DR 27"
          title={
            <>
              Cited <span className="italic text-[var(--ink-soft)]">37 times</span> by
              ChatGPT, while Google organic was declining.
            </>
          }
          subtitle="The shift every B2B SaaS is feeling: search is moving from blue links to AI answers. esy.com is winning the half that matters going forward."
          stats={[
            { term: "ChatGPT citations", value: "37", trend: "across 20 pages" },
            { term: "Other AI engines", value: "3", trend: "Perplexity · Copilot · Grok" },
            { term: "Referring domains", value: "186", trend: "+125 last month" },
            { term: "Backlinks", value: "2K", trend: "+768 last month" },
          ]}
          image={{
            src: "/proof/esy-ai-citations.png",
            alt: "Ahrefs Site Explorer overview for esy.com showing 37 ChatGPT citations across 20 pages, plus citations from Perplexity, Copilot, and Grok.",
          }}
          siteHref="https://esy.com"
          siteLabel="esy.com"
        />

        <CaseStudy
          eyebrow="Case study · clip.art · Consumer product · DR 0.6"
          title={
            <>
              <span className="italic text-[var(--ink-soft)]">Low DR.</span> Growing
              on both Google and ChatGPT, every month.
            </>
          }
          subtitle="Most SaaS founders have low domain authority. clip.art shows what's possible with structure alone — AI citations climbing, Google traffic +362 in one month."
          stats={[
            { term: "ChatGPT citations", value: "12", trend: "+9 last month" },
            { term: "Organic traffic", value: "685", trend: "+362 last month" },
            { term: "Organic keywords", value: "27", trend: "+19 · 5 in top 3" },
            { term: "Referring domains", value: "130", trend: "+111 last month" },
          ]}
          image={{
            src: "/proof/clipart-ai-citations.png",
            alt: "Ahrefs Site Explorer overview for clip.art showing 12 ChatGPT citations growing by 9 last month, plus 685 organic traffic up 362 month-over-month.",
          }}
          siteHref="https://clip.art"
          siteLabel="clip.art"
        />

        <p className="mt-12 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
          Both sites are structured the same way SEOPage structures your pages:
          deep research, FAQ blocks, schema markup, direct-answer copy, and
          entity signals. AI search engines reward exactly that shape — and
          your competitive landing pages should be built the same way.
        </p>
      </div>
    </section>
  );
}

function CaseStudy({
  eyebrow,
  title,
  subtitle,
  stats,
  image,
  siteHref,
  siteLabel,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  stats: { term: string; value: string; trend: string }[];
  image: { src: string; alt: string };
  siteHref: string;
  siteLabel: string;
}) {
  return (
    <div className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            {eyebrow}
          </span>
          <h3 className="serif mt-3 text-balance text-2xl leading-[1.15] text-[var(--ink)] sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
            {subtitle}
          </p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-4">
        {stats.map((s) => (
          <ProofStat key={s.term} term={s.term} value={s.value} trend={s.trend} />
        ))}
      </dl>

      <figure className="mt-6 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--paper)] shadow-[0_20px_60px_-30px_rgba(11,13,14,0.25)]">
        <Image
          src={image.src}
          alt={image.alt}
          width={2048}
          height={760}
          priority={false}
          className="h-auto w-full"
        />
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--rule)] bg-[var(--paper-soft)] px-5 py-3">
          <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Source · Ahrefs · {siteLabel} Site Explorer · May 2026
          </span>
          <Link
            href={siteHref}
            className="text-xs text-[var(--ink-soft)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
            rel="noopener"
            target="_blank"
          >
            {siteLabel} →
          </Link>
        </figcaption>
      </figure>
    </div>
  );
}

function ProofStat({
  term,
  value,
  trend,
}: {
  term: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-[var(--paper)] p-6">
      <dt className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {term}
      </dt>
      <dd className="serif mt-3 text-4xl leading-none text-[var(--ink)] sm:text-5xl">
        {value}
      </dd>
      <p className="mt-3 text-xs leading-5 text-[var(--ink-soft)]">{trend}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero — single offer                                                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-20 pt-24 text-center sm:px-8 lg:pb-32 lg:pt-32">
      <span className="eyebrow">SEOPage · Public beta</span>

      <h1 className="serif mt-7 text-balance text-5xl leading-[1.04] text-[var(--ink)] sm:text-6xl lg:text-[72px] lg:leading-[1.02]">
        SEO pages built to get cited by ChatGPT.
        <span className="italic text-[var(--ink-soft)]"> And to rank on Google.</span>
      </h1>

      <p className="mono mt-6 text-[12px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
        Built for AI search <span className="text-[var(--muted)]">·</span> Built for Google <span className="text-[var(--muted)]">·</span> Editor-finished
      </p>

      <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
        Five competitive landing pages — comparison, alternatives, best-of, FAQ,
        category — engineered with the schema, structure, and direct answers
        that ChatGPT, Perplexity, and Google&apos;s AI Overviews actually pick up.
        A real editor signs off every page before delivery.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={CHECKOUT_HREF}
          className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
        >
          Buy the pack — {offer.priceLabel}
        </Link>
        <Link
          href={NOTIFY_HREF}
          className="text-sm font-medium text-[var(--ink-soft)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
        >
          Or get notified when self-serve launches →
        </Link>
      </div>

      <p className="mono mt-8 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {offer.pages} pages · {offer.unit} · One-time · No subscription
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* What's in each page                                                        */
/* -------------------------------------------------------------------------- */

function Included() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeader
          eyebrow="What's in each page"
          title="Six things every page gets."
          copy="The value isn't generic AI prose. It's a complete page shape for a specific search intent, with the structure, copy, and SEO basics already in place — and a human pass on top."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
          {included.map((f, i) => (
            <li key={f.title} className="bg-[var(--paper)] p-8">
              <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="serif mt-4 text-2xl leading-snug text-[var(--ink)]">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                {f.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <p className="eyebrow">Page types</p>
          <p className="mt-3 text-base leading-8 text-[var(--ink-soft)]">
            Pick five from{" "}
            {pageTypes.map((p, i) => (
              <span key={p.key}>
                <span className="text-[var(--ink)]">{p.label}</span>
                {i < pageTypes.length - 1 ? " · " : "."}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Process                                                                    */
/* -------------------------------------------------------------------------- */

function Process() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeader
          eyebrow="The pipeline"
          title="Four steps. URL to published page."
          copy="A focused loop. Submit a URL, pick five page ideas, we generate and revise, you export and publish."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.number} className="bg-[var(--paper)] p-7">
              <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Step {s.number}
              </span>
              <h3 className="serif mt-4 text-2xl leading-snug text-[var(--ink)]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

function FAQ() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
        <p className="eyebrow text-center">FAQ</p>
        <h2 className="serif mt-5 text-balance text-center text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
          Common questions.
        </h2>

        <ul className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
          {faqHome.map((f) => (
            <li key={f.q}>
              <details className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-medium text-[var(--ink)] [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 shrink-0 place-items-center text-[var(--ink-soft)] transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
                  {f.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-32">
        <p className="eyebrow">The offer</p>
        <h2 className="serif mt-5 text-balance text-5xl leading-[1.05] text-[var(--ink)] sm:text-6xl">
          {offer.priceLabel} for {offer.pages} SEO landing pages.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
          {offer.pitch} One-time purchase. Export as Markdown, MDX, or HTML and
          publish wherever you already work.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={CHECKOUT_HREF}
            className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
          >
            Buy the pack — {offer.priceLabel}
          </Link>
          <Link
            href={NOTIFY_HREF}
            className="text-sm font-medium text-[var(--ink-soft)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
          >
            Notify me when self-serve launches →
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
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="serif mt-4 text-balance text-3xl leading-[1.1] text-[var(--ink)] sm:text-4xl lg:text-[44px]">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">{copy}</p>
    </div>
  );
}
