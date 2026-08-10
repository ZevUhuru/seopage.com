import Link from "next/link";
import { Logo } from "./Logo";
import { DELIVERY_HOURS, PRICE_LABEL, PRODUCT } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-sm text-muted">
            Done-for-you SEO pages — researched, human-reviewed, delivered
            within {DELIVERY_HOURS} hours.
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-muted sm:items-end">
          <Link
            href="/#pricing"
            className="font-medium text-ink hover:text-accent"
          >
            Get my SEO page · {PRICE_LABEL}
          </Link>
          <Link href="/audit" className="hover:text-ink">
            Free SEO page audit
          </Link>
          <Link href="/agentic" className="hover:text-ink">
            The build log
          </Link>
          <Link href="/on-page-seo-services" className="hover:text-ink">
            On-page SEO services
          </Link>
          <Link href="/seo-page" className="hover:text-ink">
            What is an SEO landing page?
          </Link>
          <a href={`mailto:${PRODUCT.supportEmail}`} className="hover:text-ink">
            {PRODUCT.supportEmail}
          </a>
          <span className="text-xs text-muted">
            © {new Date().getFullYear()} SEOPage
          </span>
        </div>
      </div>
    </footer>
  );
}
