import Link from "next/link";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-ink-2 md:flex">
          <a href="/#how" className="transition hover:text-ink">
            How it works
          </a>
          <a href="/#example" className="transition hover:text-ink">
            Example
          </a>
          <a href="/#pricing" className="transition hover:text-ink">
            Pricing
          </a>
        </nav>
        <Link href="/intake" className="btn btn-primary btn-md">
          Build my page
        </Link>
      </div>
    </header>
  );
}
