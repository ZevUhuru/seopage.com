import { Logo } from "./Logo";
import { BuyButton } from "./BuyButton";
import { PRICE_LABEL } from "@/lib/config";

/**
 * Deliberately nav-less: one page goal, one action (Unbounce's 1:1
 * attention-ratio principle — more links, lower conversion). Internal
 * links for SEO live in the footer instead.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <BuyButton
          label={`Get my page — ${PRICE_LABEL}`}
          className="btn btn-primary btn-md"
        />
      </div>
    </header>
  );
}
