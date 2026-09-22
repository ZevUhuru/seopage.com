import Link from "next/link";
import { funnelDisplay } from "./home/fonts";

/**
 * The wordmark: "seopage" with a citation superscript, the small numbered
 * mark AI answers put next to a source. Ours is always one. The badge is
 * sized in em (of its own 0.28em text), so the wordmark scales with its
 * font size.
 */
export function Logo({
  className = "text-[24px]",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href="/"
      aria-label="SEOPage home"
      className={`${funnelDisplay.className} inline-flex items-start font-bold leading-none tracking-[-0.04em] ${tone === "dark" ? "text-[#EEF2FF]" : "text-ink"} ${className}`}
    >
      seopage
      <span
        aria-hidden
        className="ml-[0.29em] mt-[0.07em] flex h-[1.5em] min-w-[1.5em] items-center justify-center rounded-[0.43em] bg-[#3D6BFF] text-[0.28em] tracking-normal text-white"
      >
        1
      </span>
    </Link>
  );
}
