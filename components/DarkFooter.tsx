import Link from "next/link";
import { Logo } from "./Logo";
import { RankMark } from "./rank/parts";
import { getArticles, JOURNAL_PATH } from "@/lib/articles";
import { CREATE_URL, PRODUCT } from "@/lib/config";
import { VERTICALS, tradePath } from "@/lib/verticals";

/**
 * The footer for the dark pages (homepage, rank¹). It sits below the page's
 * last scene rather than inside it, so it can grow without covering the
 * closing video.
 *
 * It is the homepage's internal-linking surface, so every list is derived:
 * a new trade in VERTICALS or a new journal issue shows up here with no edit.
 * Trades flow into two columns once there are more than eight.
 */

type L = { label: string; href: string };

const PAD = "px-6 sm:px-10 lg:px-24";
const HEAD = "nh-mono mb-5 text-[11px] uppercase tracking-[0.16em] text-[#7D869C]";
const LINK = "text-[15px] text-[#C9D0E2] transition-colors hover:text-white";

const PRODUCT_LINKS: L[] = [
  { label: "Build my page", href: CREATE_URL },
  { label: "How it works", href: "/#demo" },
  { label: "Pricing", href: "/#price" },
  { label: "Free SEO page audit", href: "/audit" },
  { label: "On-page SEO services", href: "/on-page-seo-services" },
  { label: "FAQ", href: "/#faq" },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function FooterLink({ l }: { l: L }) {
  return l.href.startsWith("/") ? (
    <Link href={l.href} className={LINK}>{l.label}</Link>
  ) : (
    <a href={l.href} className={LINK}>{l.label}</a>
  );
}

/** `note` is a page-specific disclosure, like the homepage's Nora line. */
export async function DarkFooter({ note }: { note?: string }) {
  const articles = await getArticles();
  const trades = VERTICALS.map((v) => ({ label: cap(v.plural), href: tradePath(v.slug) })).sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  const latest = articles.slice(0, 4);

  return (
    <footer className={`${PAD} border-t border-white/12 bg-[#04060B] pt-20 text-[#EEF2FF]`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-5 lg:col-span-3">
          <Logo tone="dark" className="text-[28px]" />
          <p className="max-w-[260px] text-[15px] leading-[1.55] text-[#A0A9C0]">
            SEO landing pages that rank on Google and get cited by AI.
          </p>
          <a href={CREATE_URL} className="flex h-11 w-fit items-center rounded-full bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]">
            Build my page free
          </a>
        </div>

        <nav aria-label="Product" className="lg:col-span-2">
          <p className={HEAD}>Product</p>
          <ul className="flex flex-col gap-3">
            {PRODUCT_LINKS.map((l) => (
              <li key={l.label}><FooterLink l={l} /></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="SEO pages by trade" className="lg:col-span-3">
          <p className={HEAD}>SEO pages by trade</p>
          <ul className={`gap-x-6 ${trades.length > 8 ? "columns-2" : ""}`}>
            {trades.map((l) => (
              <li key={l.href} className="mb-3 break-inside-avoid"><FooterLink l={l} /></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="rank, the journal" className="lg:col-span-4">
          <RankMark href={JOURNAL_PATH} className="mb-5 text-[26px]" />
          <ol className="flex flex-col border-t border-white/12">
            {latest.map((a, i) => (
              <li key={a.slug} className="border-b border-white/12">
                <Link href={`${JOURNAL_PATH}/${a.slug}`} className="grid grid-cols-[32px_1fr] gap-2 py-3 text-[15px] leading-snug text-[#C9D0E2] hover:text-white">
                  <span className="nh-mono text-[12px] text-[#FF6B5C]">{String(articles.length - i).padStart(2, "0")}</span>
                  {a.title}
                </Link>
              </li>
            ))}
          </ol>
          <Link href={JOURNAL_PATH} className="mt-4 inline-block text-[14.5px] font-medium text-[#9DB4FF] hover:text-white">
            All {articles.length} issues →
          </Link>
        </nav>
      </div>

      <div className="mt-20 flex flex-col gap-2 border-t border-white/12 py-6 text-[13px] text-[#7D869C] sm:flex-row sm:justify-between">
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <span>© {new Date().getFullYear()} SEOPage</span>
          <a href={`mailto:${PRODUCT.supportEmail}`} className="hover:text-white">{PRODUCT.supportEmail}</a>
        </span>
        <span>{note ? `${note} ` : ""}Payments by Stripe.</span>
      </div>

      <div aria-hidden className="pointer-events-none -mb-[0.2em] select-none overflow-hidden leading-none">
        <span className="nh-display block translate-y-[0.12em] text-[clamp(96px,23vw,360px)] font-bold leading-[0.8] tracking-[-0.06em] text-white/[0.06]">
          seopage
        </span>
      </div>
    </footer>
  );
}
