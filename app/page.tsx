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
