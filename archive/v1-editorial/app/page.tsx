import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  CALL_HREF,
  channels,
  faqHome,
  included,
  offer,
  sampleRows,
  START_HREF,
  steps,
  type SampleVerdict,
} from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader active="home" />
      <main>
        <Hero />
        <ReportSample />
        <WhyItMatters />
        <Channels />
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
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-20 pt-24 text-center sm:px-8 lg:pb-28 lg:pt-32">
      <span className="eyebrow">SEOPage · AI Rank Report</span>

      <h1 className="serif mt-7 text-balance text-5xl leading-[1.04] text-[var(--ink)] sm:text-6xl lg:text-[72px] lg:leading-[1.02]">
        See how your page ranks
        <span className="italic text-[var(--ink-soft)]"> in AI search.</span>
      </h1>

      <p className="mono mt-6 text-[12px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
        ChatGPT <span className="text-[var(--muted)]">·</span> Google AI Overviews{" "}
        <span className="text-[var(--muted)]">·</span> Perplexity{" "}
        <span className="text-[var(--muted)]">·</span> Claude
      </p>

      <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
        Paste a URL. SEOPage runs the 20 buyer questions that page should win
        across the top AI channels — then reports where you&apos;re cited,
        who gets cited instead, and exactly what to fix. Re-run every week.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={START_HREF}
          className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
        >
          Get your first report — free
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-medium text-[var(--ink-soft)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
        >
          Then {offer.priceLabel}/mo. One plan. →
        </Link>
      </div>

      <p className="mono mt-8 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {offer.pages} pages · {offer.promptsPerPage} prompts each · 4 AI channels ·
        Weekly
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Report sample — rendered, not screenshotted                                */
/* -------------------------------------------------------------------------- */

const verdictStyles: Record<
  SampleVerdict,
  { label: string; className: string }
> = {
  cited: {
    label: "Cited",
    className: "bg-[var(--accent-soft)] text-[var(--accent)]",
  },
  mentioned: {
    label: "Mentioned",
    className: "bg-[var(--paper-soft)] text-[var(--ink-soft)]",
  },
  absent: {
    label: "Absent",
    className: "bg-[#fbeeee] text-[#9a3b3b]",
  },
};

function ReportSample() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeader
          eyebrow="The report"
          title="One page. Twenty prompts. Four channels. No guessing."
          copy="This is the heart of every AI Rank Report: a verdict for every buyer question on every channel — with the full AI answer saved as evidence, and the competitor URL that beat you when you lost."
        />

        <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--paper)] shadow-[0_20px_60px_-30px_rgba(11,13,14,0.25)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] bg-[var(--paper-soft)] px-5 py-3">
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              AI Rank Report · clip.art/generate · Week of Jun 8, 2026
            </span>
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Sample · 4 of 20 prompts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  <th className="px-5 py-3.5 text-xs font-medium text-[var(--muted)]">
                    Buyer prompt
                  </th>
                  {channels.map((c) => (
                    <th
                      key={c.key}
                      className="px-3 py-3.5 text-center text-xs font-medium text-[var(--muted)]"
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleRows.map((row) => (
                  <tr key={row.prompt} className="border-b border-[var(--rule)] last:border-b-0">
                    <td className="px-5 py-4 align-top">
                      <span className="text-sm text-[var(--ink)]">
                        “{row.prompt}”
                      </span>
                      {row.losesTo ? (
                        <span className="mt-1.5 block text-xs text-[var(--ink-soft)]">
                          Loses to{" "}
                          <span className="mono text-[11px] text-[#9a3b3b]">
                            {row.losesTo}
                          </span>
                        </span>
                      ) : null}
                    </td>
                    {channels.map((c) => {
                      const v = verdictStyles[row.verdicts[c.key]];
                      return (
                        <td key={c.key} className="px-3 py-4 text-center align-top">
                          <span
                            className={`mono inline-block rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${v.className}`}
                          >
                            {v.label}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-px border-t border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-3">
            {[
              ["AI Rank", "11 / 20 prompts answered with you in them"],
              ["Framing", "Recommended on 6 · warned against on 0"],
              ["AI-readiness", "62 / 100 — 7 fixes, ordered by impact"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[var(--paper-soft)] px-5 py-4">
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {label}
                </span>
                <p className="mt-1.5 text-sm text-[var(--ink)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
          Every verdict links to the full captured answer — the receipt. Every
          lost prompt names the page that won. Every report ends with the fix
          list for your page: schema, direct answers, FAQ blocks, entity
          signals, crawler access.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Why it matters                                                             */
/* -------------------------------------------------------------------------- */

function WhyItMatters() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeader
          eyebrow="Why now"
          title="Your buyers ask AI before they ever see your page."
          copy="AI answers aren't a side channel anymore. They're where consideration happens — and being absent from them is invisible in your analytics until the pipeline dries up."
        />

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-3">
          {[
            {
              value: "35–50%",
              term: "of high-intent queries",
              body: "are now intercepted by AI engines before a single blue link gets clicked.",
            },
            {
              value: "5–16%",
              term: "conversion from AI visitors",
              body: "versus ~1.8% from organic search. Traffic from AI answers converts 3–9× better.",
            },
            {
              value: "<20%",
              term: "Google ↔ AI overlap",
              body: "Overlap between top Google results and AI-cited sources fell from 70% to under 20% in two years. Ranking #1 no longer means you're in the answer.",
            },
          ].map((s) => (
            <div key={s.term} className="bg-[var(--paper)] p-7">
              <dd className="serif text-5xl leading-none text-[var(--ink)]">
                {s.value}
              </dd>
              <dt className="mono mt-4 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                {s.term}
              </dt>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                {s.body}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Channels                                                                   */
/* -------------------------------------------------------------------------- */

function Channels() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeader
          eyebrow="The channels"
          title="All four engines that decide what AI tells your buyers."
          copy="Each engine selects sources differently — a page Perplexity loves can be invisible to Claude. Checking one channel and calling it done is how teams fool themselves. Every report covers all four."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
          {channels.map((c) => (
            <li key={c.key} className="bg-[var(--paper)] p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="serif text-2xl leading-snug text-[var(--ink)]">
                  {c.label}
                </h3>
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {c.subtitle}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                {c.description}
              </p>
              <p className="mono mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
                {c.behavior}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* What's in the report                                                       */
/* -------------------------------------------------------------------------- */

function Included() {
  return (
    <section className="border-t border-[var(--rule)]">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeader
          eyebrow="In every report"
          title="Six things every report gets."
          copy="Not a dashboard you have to interpret. A report that answers the three questions that matter: where do I show up, who beats me, and what do I change."
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
          title="URL in. Report out. Every week."
          copy="No tracking setup, no prompt research, no SERP exports. The page is the input; the report is the output."
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
          First report free. Then {offer.priceLabel}/mo.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
          One plan, everything included: {offer.pages} pages,{" "}
          {offer.promptsPerPage} prompts each, all 4 AI channels, weekly
          re-runs, full answer evidence, and a fix list per page. Cancel
          anytime.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={START_HREF}
            className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
          >
            Get your first report — free
          </Link>
          <Link
            href={CALL_HREF}
            className="text-sm font-medium text-[var(--ink-soft)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
          >
            Prefer to talk it through? →
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
