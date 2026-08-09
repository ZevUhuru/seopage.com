import Link from "next/link";
import { Logo } from "./Logo";
import { BuyButton } from "./BuyButton";
import { PRICE_LABEL } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-ink-2 md:flex">
          <Link href="/#what-you-get" className="transition hover:text-ink">
            What you get
          </Link>
          <Link href="/#how" className="transition hover:text-ink">
            How it works
          </Link>
          <Link href="/#pricing" className="transition hover:text-ink">
            Pricing
          </Link>
          <Link href="/#faq" className="transition hover:text-ink">
            FAQ
          </Link>
        </nav>
        <BuyButton
          label={`Get my page — ${PRICE_LABEL}`}
          className="btn btn-primary btn-md"
        />
      </div>
    </header>
  );
}
