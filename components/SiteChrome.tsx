import Link from "next/link";
import { CHECKOUT_HREF, offer } from "@/lib/data";

type NavKey = "home" | "pricing" | "how" | "reference";

const nav: { key: NavKey; label: string; href: string }[] = [
  { key: "reference", label: "What is an SEO Page?", href: "/seo-page" },
  { key: "how", label: "How it works", href: "/how-it-works" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
];

export function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--rule)] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="SEOPage home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm transition ${
                active === item.key
                  ? "text-[var(--ink)]"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={CHECKOUT_HREF}
          className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
        >
          Buy the pack — {offer.priceLabel}
        </Link>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <span className="text-[15px] font-medium tracking-tight text-[var(--ink)]">
        SEOPage
      </span>
      <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
        .com
      </span>
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3 text-sm text-[var(--ink-soft)]">
          <Wordmark />
          <span className="text-[var(--muted)]">·</span>
          <span>Five SEO landing pages, $699 — or $150 per page.</span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--ink-soft)]">
          <Link href="/seo-page" className="transition hover:text-[var(--ink)]">
            What is an SEO Page?
          </Link>
          <Link href="/how-it-works" className="transition hover:text-[var(--ink)]">
            How it works
          </Link>
          <Link href="/pricing" className="transition hover:text-[var(--ink)]">
            Pricing
          </Link>
          <Link
            href="mailto:zev@seopage.com"
            className="transition hover:text-[var(--ink)]"
          >
            zev@seopage.com
          </Link>
          <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            © {new Date().getFullYear()}
          </span>
        </nav>
      </div>
    </footer>
  );
}
