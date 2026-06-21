import Link from "next/link";
import { Logo } from "./Logo";
import { PRICE_LABEL, PRODUCT } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-sm text-muted">
            Local SEO landing pages, built to rank on Google and get found by AI.
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-muted sm:items-end">
          <Link href="/intake" className="font-medium text-ink hover:text-accent">
            Build my page · {PRICE_LABEL}
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
