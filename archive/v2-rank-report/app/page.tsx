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
/* Hero — poster front page                                                   */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
      <p className="label">§ 00 · The question</p>

      <h1 className="display mt-6 text-[15vw] text-[var(--ink)] sm:text-7xl lg:text-[110px]">
        Does AI cite
        <br />
        your page —{" "}
        <span className="text-[var(--red)]">or your competitor&apos;s?</span>
      </h1>

      <div className="mt-10 grid gap-8 border-t border-[var(--ink)] pt-8 lg:grid-cols-[1.2fr_1fr]">
        <p className="max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
          Paste a URL. SEOPage runs the {offer.promptsPerPage}{" "}buyer questions
          that page should win across ChatGPT, Google AI Overviews, Perplexity,
          and Claude — then reports where you&apos;re cited, who gets cited
          instead, and exactly what to fix. Re-run every week.
        </p>

        <div className="flex flex-col items-start gap-4">
          <Link
            href={START_HREF}
            className="hard mono border-2 border-[var(--ink)] bg-[var(--ink)] px-7 py-4 text-[13px] uppercase tracking-[0.18em] text-[var(--paper)] transition hover:bg-[var(--red)] hover:shadow-none"
          >
            Get your first report — free
          </Link>
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            No card · Then {offer.priceLabel}/mo · One plan ·{" "}
            <Link
              href="/pricing"
              className="text-[var(--ink-soft)] underline underline-offset-4 hover:text-[var(--red)]"
            >
              Pricing
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 border-2 border-[var(--ink)] sm:grid-cols-4">
        {channels.map((c, i) => (
          <div
            key={c.key}
            className={`px-4 py-3 ${i > 0 ? "border-l-0 sm:border-l-2 sm:border-[var(--ink)]" : ""} ${
              i % 2 === 1 ? "border-l-2 border-[var(--ink)]" : ""
            } ${i > 1 ? "border-t-2 border-[var(--ink)] sm:border-t-0" : ""}`}
          >
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              CH·{String(i + 1).padStart(2, "0")}
            </span>
            <p className="display mt-1 text-lg text-[var(--ink)]">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Report sample                                                              */
/* -------------------------------------------------------------------------- */

const verdictStamp: Record<SampleVerdict, { label: string; className: string }> = {
  cited: { label: "Cited", className: "stamp stamp-cited" },
  mentioned: { label: "Mention", className: "stamp stamp-mentioned" },
  absent: { label: "Absent", className: "stamp stamp-absent" },
};

function ReportSample() {
  return (
    <section className="border-t-2 border-[var(--ink)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHeader
          number="01"
          eyebrow="The report"
          title="One page. Twenty prompts. Four channels."
          copy="The heart of every AI Rank Report: a verdict for every buyer question on every channel — with the full AI answer saved as evidence, and the competitor URL that beat you when you lost."
        />

        <div className="hard mt-12 border-2 border-[var(--ink)] bg-[var(--paper)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[var(--ink)] bg-[var(--ink)] px-5 py-2.5">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]">
              AI Rank Report · clip.art/generate · Week of Jun 08 2026
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]/70">
              Specimen · 4 of 20 prompts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[var(--ink)]">
                  <th className="mono px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    Buyer prompt
                  </th>
                  {channels.map((c) => (
                    <th
                      key={c.key}
                      className="mono border-l border-[var(--rule)] px-3 py-3 text-center text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]"
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleRows.map((row) => (
                  <tr
                    key={row.prompt}
                    className="border-b border-[var(--rule)] last:border-b-0"
                  >
                    <td className="px-5 py-4 align-top">
                      <span className="text-sm font-medium text-[var(--ink)]">
                        “{row.prompt}”
                      </span>
                      {row.losesTo ? (
                        <span className="mono mt-1.5 block text-[11px] uppercase tracking-[0.08em] text-[var(--red)]">
                          → loses to {row.losesTo}
                        </span>
                      ) : null}
                    </td>
                    {channels.map((c) => {
                      const v = verdictStamp[row.verdicts[c.key]];
                      return (
                        <td
                          key={c.key}
                          className="border-l border-[var(--rule)] px-3 py-4 text-center align-top"
                        >
                          <span className={v.className}>{v.label}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid border-t-2 border-[var(--ink)] sm:grid-cols-3">
            {[
              ["AI Rank", "11 / 20 prompts answered with you in them"],
              ["Framing", "Recommended ×6 · Warned against ×0"],
              ["AI-readiness", "62 / 100 — 7 fixes, ordered by impact"],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`px-5 py-4 ${i > 0 ? "border-t border-[var(--rule)] sm:border-l sm:border-t-0" : ""}`}
              >
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--red)]">
                  {label}
                </span>
                <p className="mt-1.5 text-sm font-medium text-[var(--ink)]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mono mt-10 max-w-2xl text-[11px] uppercase leading-5 tracking-[0.14em] text-[var(--ink-soft)]">
          Every verdict links to the full captured answer — the receipt. Every
          lost prompt names the page that won. Every report ends with the fix
          list.
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
    <section className="border-t-2 border-[var(--ink)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHeader
          number="02"
          eyebrow="Why now"
          title="Your buyers ask AI before they ever see your page."
          copy="AI answers aren't a side channel anymore. They're where consideration happens — and absence is invisible in your analytics until the pipeline dries up."
        />

        <dl className="mt-12 grid border-2 border-[var(--ink)] sm:grid-cols-3">
          {[
            {
              value: "35–50%",
              term: "High-intent queries intercepted",
              body: "by AI engines before a single blue link gets clicked.",
            },
            {
              value: "5–16%",
              term: "Conversion from AI visitors",
              body: "versus ~1.8% from organic search. AI-answer traffic converts 3–9× better.",
            },
            {
              value: "<20%",
              term: "Google ↔ AI overlap",
              body: "down from 70% in two years. Ranking #1 no longer means you're in the answer.",
            },
          ].map((s, i) => (
            <div
              key={s.term}
              className={`p-7 ${i > 0 ? "border-t-2 border-[var(--ink)] sm:border-l-2 sm:border-t-0" : ""}`}
            >
              <dd className="display text-6xl text-[var(--ink)] lg:text-7xl">
                {s.value}
              </dd>
              <dt className="mono mt-4 text-[10px] uppercase tracking-[0.22em] text-[var(--red)]">
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
    <section className="border-t-2 border-[var(--ink)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHeader
          number="03"
          eyebrow="The channels"
          title="All four engines that decide what AI tells your buyers."
          copy="Each engine selects sources differently — a page Perplexity loves can be invisible to Claude. Checking one channel and calling it done is how teams fool themselves."
        />

        <ul className="mt-12 grid border-2 border-[var(--ink)] md:grid-cols-2">
          {channels.map((c, i) => (
            <li
              key={c.key}
              className={`p-7 ${i > 0 ? "border-t-2 border-[var(--ink)]" : ""} ${
                i % 2 === 1 ? "md:border-l-2 md:border-t-0" : ""
              } ${i > 1 ? "md:border-t-2" : ""}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="display text-3xl text-[var(--ink)]">{c.label}</h3>
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {c.subtitle}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                {c.description}
              </p>
              <p className="mono mt-4 text-[10px] uppercase tracking-[0.18em] text-[var(--red)]">
                ▸ {c.behavior}
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
    <section className="border-t-2 border-[var(--ink)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHeader
          number="04"
          eyebrow="In every report"
          title="Six findings. Zero interpretation required."
          copy="Not a dashboard you have to decode. A report that answers the three questions that matter: where do I show up, who beats me, and what do I change."
        />

        <ul className="mt-12 grid border-2 border-[var(--ink)] md:grid-cols-2">
          {included.map((f, i) => (
            <li
              key={f.title}
              className={`p-7 ${i > 0 ? "border-t-2 border-[var(--ink)]" : ""} ${
                i % 2 === 1 ? "md:border-l-2 md:border-t-0" : ""
              } ${i > 1 ? "md:border-t-2" : ""}`}
            >
              <span className="display text-4xl text-[var(--paper-soft)] [-webkit-text-stroke:1.5px_var(--ink)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--ink)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
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
    <section className="border-t-2 border-[var(--ink)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHeader
          number="05"
          eyebrow="The pipeline"
          title="URL in. Report out. Every week."
          copy="No tracking setup, no prompt research, no spreadsheet of AI answers. The page is the input; the report is the output."
        />

        <ol className="mt-12 grid border-2 border-[var(--ink)] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.number}
              className={`p-7 ${i > 0 ? "border-t-2 border-[var(--ink)] md:border-t-0 md:border-l-2" : ""} ${
                i === 2 ? "md:border-t-2 md:border-l-0 lg:border-l-2 lg:border-t-0" : ""
              } ${i === 3 ? "md:border-t-2 lg:border-t-0" : ""}`}
            >
              <span className="display text-5xl text-[var(--red)]">
                {s.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-[var(--ink)]">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
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
    <section className="border-t-2 border-[var(--ink)]">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="label">§ 06 · Questions</p>
        <h2 className="display mt-5 text-5xl text-[var(--ink)] sm:text-6xl">
          Asked &amp; answered.
        </h2>

        <ul className="mt-12 border-2 border-[var(--ink)] bg-[var(--paper)]">
          {faqHome.map((f, i) => (
            <li
              key={f.q}
              className={i > 0 ? "border-t border-[var(--rule)]" : ""}
            >
              <details className="group px-6 py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-[var(--ink)] [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="mono grid h-6 w-6 shrink-0 place-items-center text-[var(--red)] transition group-open:rotate-45"
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
    <section className="border-t-2 border-[var(--ink)] bg-[var(--ink)]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="mono text-[11px] uppercase tracking-[0.28em] text-[var(--paper)]/60">
          § 07 · The offer
        </p>
        <h2 className="display mt-6 text-6xl text-[var(--paper)] sm:text-7xl lg:text-8xl">
          First report free.
          <br />
          Then <span className="text-[var(--red)]">{offer.priceLabel}/mo.</span>
        </h2>
        <p className="mt-8 max-w-xl text-base leading-8 text-[var(--paper)]/80">
          One plan, everything included: {offer.pages} pages,{" "}
          {offer.promptsPerPage} prompts each, all 4 AI channels, weekly
          re-runs, full answer evidence, and a fix list per page. Cancel
          anytime.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href={START_HREF}
            className="mono border-2 border-[var(--paper)] bg-[var(--paper)] px-7 py-4 text-[13px] uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-[var(--red)] hover:text-[var(--paper)] hover:border-[var(--red)]"
          >
            Get your first report — free
          </Link>
          <Link
            href={CALL_HREF}
            className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--paper)]/70 underline underline-offset-8 transition hover:text-[var(--paper)]"
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
  number,
  eyebrow,
  title,
  copy,
}: {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="label">
        § {number} · {eyebrow}
      </p>
      <h2 className="display mt-5 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
        {copy}
      </p>
    </div>
  );
}
