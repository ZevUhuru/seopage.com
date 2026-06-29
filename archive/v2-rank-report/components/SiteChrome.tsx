import Link from "next/link";
import { offer, START_HREF } from "@/lib/data";

type NavKey = "home" | "pricing" | "how" | "reference";

const nav: { key: NavKey; label: string; href: string }[] = [
  { key: "reference", label: "AI Page Ranking", href: "/ai-page-ranking" },
  { key: "how", label: "How It Works", href: "/how-it-works" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
];

function issueDate() {
  return new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .toUpperCase();
}

export function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <header className="sticky top-0 z-20 bg-[var(--background)]">
      {/* Ticker strip */}
      <div className="bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-1.5 sm:px-8">
          <span className="mono text-[10px] uppercase tracking-[0.28em]">
            AI Search Intelligence · Weekly
          </span>
          <span className="mono hidden text-[10px] uppercase tracking-[0.28em] sm:block">
            {issueDate()} · ChatGPT / AI Overviews / Perplexity / Claude
          </span>
        </div>
      </div>

      {/* Masthead */}
      <div className="border-b-[3px] border-[var(--ink)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="SEOPage home" className="flex items-baseline gap-2">
            <span className="display text-2xl text-[var(--ink)]">
              SEO<span className="text-[var(--red)]">PAGE</span>
            </span>
            <span className="mono hidden text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] sm:block">
              .com
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`mono text-[11px] uppercase tracking-[0.22em] transition ${
                  active === item.key
                    ? "text-[var(--red)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href={START_HREF}
            className="hard-sm mono border border-[var(--ink)] bg-[var(--ink)] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition hover:bg-[var(--red)] hover:shadow-none"
          >
            Free Report
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24">
      <div className="rule-double" />
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="display text-5xl text-[var(--ink)] sm:text-6xl">
              SEO<span className="text-[var(--red)]">PAGE</span>
            </span>
            <p className="mono mt-4 max-w-sm text-[11px] uppercase leading-5 tracking-[0.18em] text-[var(--ink-soft)]">
              The weekly report on how your pages rank in AI search. First
              report free · {offer.priceLabel}/mo after.
            </p>
          </div>
          <nav className="flex flex-col items-start gap-2 sm:items-end">
            {[
              ["What is AI page ranking?", "/ai-page-ranking"],
              ["How it works", "/how-it-works"],
              ["Pricing", "/pricing"],
              ["Get your free report", START_HREF],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-soft)] transition hover:text-[var(--red)]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="mailto:support@seopage.com"
              className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-soft)] transition hover:text-[var(--red)]"
            >
              support@seopage.com
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--ink)] pt-4">
          <span className="mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
            © {new Date().getFullYear()} SEOPage · Measured, not guessed
          </span>
          <span
            aria-hidden="true"
            className="mono text-[10px] tracking-[0.28em] text-[var(--muted)]"
          >
            ||| | || ||| | | || |||| |
          </span>
        </div>
      </div>
    </footer>
  );
}
