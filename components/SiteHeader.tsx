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
        {/* Short form — the full "Get Me Cited in AI — $99" crowds small screens. */}
        <BuyButton label="Get Me Cited" className="btn btn-primary btn-md" />
      </div>
    </header>
  );
}
