import { Logo } from "./Logo";
import { CreateButton } from "./CreateButton";

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
        {/* Short form — the full "Build My Page — Free Preview" crowds small screens. */}
        <CreateButton label="Build My Page" className="btn btn-primary btn-md" />
      </div>
    </header>
  );
}
