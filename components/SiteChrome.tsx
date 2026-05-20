import Link from "next/link";

type NavKey = "home" | "examples" | "pricing" | "how";

const nav: { key: NavKey; label: string; href: string }[] = [
  { key: "examples", label: "Examples", href: "/examples" },
  { key: "how", label: "How it works", href: "/how-it-works" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
];

const SAMPLE_REQUEST_HREF =
  "mailto:hello@seopage.com?subject=SEOPage%20sample%20request&body=Site%20URL%3A%20%0ACompetitors%20or%20keywords%3A%20%0A";

export function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--rule)] bg-[var(--paper)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="SEOPage home">
          <Wordmark active={active === "home"} />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--rule)] bg-[var(--background)] p-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                active === item.key
                  ? "bg-[var(--paper)] text-[var(--ink)] shadow-sm"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="hidden text-sm text-[var(--ink-soft)] transition hover:text-[var(--ink)] sm:inline"
          >
            SEO landing page packs
          </Link>
          <Link
            href={SAMPLE_REQUEST_HREF}
            className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--paper)] shadow-sm transition hover:bg-[var(--ink-soft)]"
          >
            Get a sample →
          </Link>
        </div>
      </div>
    </header>
  );
}

function Wordmark({ active = false }: { active?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-md bg-[var(--ink)] text-[var(--signal)]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path d="M4 7h16M4 12h11M4 17h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="19" cy="17" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-[var(--ink)]">
        SEO<span className="text-[var(--ink-soft)]">Page</span>
      </span>
      {active ? (
        <span aria-hidden="true" className="ml-1 h-1.5 w-1.5 rounded-full bg-[var(--signal-deep)]" />
      ) : null}
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--ink-soft)]">
              Competitive SEO landing pages you can generate, export, and publish on your own site.
              Built around comparisons, alternatives, best-of SEO landing pages, FAQ hubs, and category SEO landing pages.
            </p>
            <p className="mt-6 eyebrow">© {new Date().getFullYear()} SEOPage</p>
          </div>

          <FooterCol title="Product">
            <FooterLink href="/examples">Examples</FooterLink>
            <FooterLink href="/how-it-works">How it works</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href={SAMPLE_REQUEST_HREF}>Request sample</FooterLink>
          </FooterCol>

          <FooterCol title="Page types">
            <FooterLink href="/examples?type=vs">Comparison (X vs Y)</FooterLink>
            <FooterLink href="/examples?type=alt">Alternatives</FooterLink>
            <FooterLink href="/examples?type=best">Best-of lists</FooterLink>
            <FooterLink href="/examples?type=faq">FAQ hubs</FooterLink>
            <FooterLink href="/examples?type=category">Category pages</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href="mailto:hello@seopage.com">hello@seopage.com</FooterLink>
            <FooterLink href="/pricing">SEO landing page packs</FooterLink>
            <FooterLink href="/examples">Sample SEO landing pages</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--rule)] pt-6 text-xs text-[var(--muted)]">
          <span className="mono">seopage.com · v0.1 · Public beta</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal-deep)]" />
            Page-pack beta
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[var(--ink-soft)] transition hover:text-[var(--ink)]">
        {children}
      </Link>
    </li>
  );
}
