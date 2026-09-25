import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LoopVideo } from "@/components/home/LoopVideo";
import { getArticles, JOURNAL_PATH } from "@/lib/articles";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL, PRODUCT } from "@/lib/config";
import { VERTICALS, tradePath } from "@/lib/verticals";
import { RankMark } from "./shared";

/* Three homepage footer directions, each shown on the real closing scene.
   Every link list is derived from data (VERTICALS, the journal), so the
   footer grows with the site; /scale adds simulated trades to prove it. */

export const FOOTERS = [
  { key: "a", name: "Credits", note: "Its own band below the closing scene. Classic columns, a giant wordmark." },
  { key: "b", name: "In the frame", note: "Stays inside the closing scene, confined to the dark left third, never over Nora." },
  { key: "c", name: "Directory", note: "Its own band. Oversized primary links, then trades as a wrapped directory." },
] as const;
export type FooterKey = (typeof FOOTERS)[number]["key"];

const PAD = "px-6 sm:px-10 lg:px-24";

const SIMULATED = [
  "plumbers", "electricians", "landscapers", "pest control companies", "painters", "garage door companies",
  "locksmiths", "movers", "cleaning services", "pool builders", "solar installers", "fence builders",
  "concrete contractors", "tree services", "flooring installers", "remodelers", "window installers",
  "gutter companies", "chimney sweeps", "septic services", "appliance repair", "auto repair shops",
];

type L = { label: string; href: string };
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

async function footerData(scale: boolean) {
  const articles = await getArticles();
  const trades: L[] = VERTICALS.map((v) => ({ label: cap(v.plural), href: tradePath(v.slug) }));
  if (scale) trades.push(...SIMULATED.map((t) => ({ label: cap(t), href: "#" })));
  trades.sort((a, b) => a.label.localeCompare(b.label));
  const product: L[] = [
    { label: "Build my page", href: CREATE_URL },
    { label: "How it works", href: "/#demo" },
    { label: "Pricing", href: "/#price" },
    { label: "Free SEO page audit", href: "/audit" },
    { label: "On-page SEO services", href: "/on-page-seo-services" },
    { label: "FAQ", href: "/#faq" },
  ];
  const total = scale ? 30 : articles.length;
  const issues = articles.slice(0, 4).map((a, i) => ({ n: String(total - i).padStart(2, "0"), label: a.title, href: `${JOURNAL_PATH}/${a.slug}` }));
  return { trades, product, issues, total };
}

const year = new Date().getFullYear();

function Legal({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2 text-[13px] text-[#7D869C] sm:flex-row sm:justify-between ${className}`}>
      <span className="flex flex-wrap gap-x-5 gap-y-1">
        <span>© {year} SEOPage</span>
        <a href={`mailto:${PRODUCT.supportEmail}`} className="hover:text-white">{PRODUCT.supportEmail}</a>
      </span>
      <span>Nora is an illustration, not a customer. Payments by Stripe.</span>
    </div>
  );
}

const A_ = ({ l, className = "" }: { l: L; className?: string }) =>
  l.href.startsWith("/") ? (
    <Link href={l.href} className={className}>{l.label}</Link>
  ) : (
    <a href={l.href} className={className}>{l.label}</a>
  );

/** The homepage's closing scene, minus its footer. `inner` renders inside it. */
function Close({ inner }: { inner?: React.ReactNode }) {
  return (
    <section className="relative flex min-h-[860px] flex-col overflow-hidden">
      <LoopVideo src="/home/nora-call.mp4" poster="/home/nora-call.webp" label="Nora smiling on the phone, writing down a new job." className="absolute right-0 top-0 h-full w-full object-cover lg:w-[64%] lg:[mask-image:linear-gradient(90deg,transparent_0%,black_32%)]" style={{ objectPosition: "50% 40%" }} />
      <div className="absolute inset-0 bg-[#04060B]/75 lg:bg-transparent lg:[background:linear-gradient(90deg,#04060B_0%,rgba(4,6,11,.86)_30%,rgba(4,6,11,.2)_62%,rgba(4,6,11,0)_100%)]" />
      <div className={`relative flex min-h-[860px] flex-1 flex-col ${PAD} pb-11 pt-32 lg:pt-[150px]`}>
        <p className="max-w-[520px] text-[20px] text-[#C9D0E2]">
          The goal isn&apos;t a ranking report. It&apos;s a call that starts with &ldquo;I found you on ChatGPT.&rdquo;
        </p>
        <h2 className="nh-display mt-5 max-w-[720px] text-[clamp(48px,6.4vw,92px)] leading-[0.95]">Someone&apos;s asking AI who to hire. Make the answer you.</h2>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <a href={CREATE_URL} className="flex h-[60px] items-center rounded-full bg-[#3D6BFF] px-8 text-[17px] font-semibold text-white hover:bg-[#5A82FF]">
            Build my page free
          </a>
          <span className="text-[14.5px] text-[#C9D0E2]">Free preview · {PRICE_LABEL} launch price · {PRICE_AFTER_LAUNCH_LABEL} after launch</span>
        </div>
        {inner}
      </div>
    </section>
  );
}

const HEAD = "nh-mono mb-5 text-[11px] uppercase tracking-[0.16em] text-[#7D869C]";
const LINK = "text-[15px] text-[#C9D0E2] transition-colors hover:text-white";

/* ---------- A · CREDITS ---------- */
async function FooterA({ scale }: { scale: boolean }) {
  const d = await footerData(scale);
  return (
    <>
      <Close />
      <footer className={`${PAD} border-t border-white/12 bg-[#04060B] pt-20`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-5 lg:col-span-3">
            <Logo tone="dark" className="text-[28px]" />
            <p className="max-w-[260px] text-[15px] leading-[1.55] text-[#A0A9C0]">SEO landing pages that rank on Google and get cited by AI.</p>
            <a href={CREATE_URL} className="flex h-11 w-fit items-center rounded-full bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]">Build my page free</a>
          </div>
          <nav aria-label="Product" className="lg:col-span-2">
            <p className={HEAD}>Product</p>
            <ul className="flex flex-col gap-3">{d.product.map((l) => <li key={l.label}><A_ l={l} className={LINK} /></li>)}</ul>
          </nav>
          <nav aria-label="SEO pages by trade" className="lg:col-span-3">
            <p className={HEAD}>SEO pages by trade</p>
            <ul className={`gap-x-6 ${d.trades.length > 8 ? "columns-2" : ""}`}>
              {d.trades.map((l) => <li key={l.label} className="mb-3 break-inside-avoid"><A_ l={l} className={LINK} /></li>)}
            </ul>
          </nav>
          <nav aria-label="rank, the journal" className="lg:col-span-4">
            <RankMark href={JOURNAL_PATH} className="mb-5 text-[26px]" />
            <ol className="flex flex-col border-t border-white/12">
              {d.issues.map((l) => (
                <li key={l.href} className="border-b border-white/12">
                  <Link href={l.href} className="group grid grid-cols-[32px_1fr] gap-2 py-3 text-[15px] leading-snug text-[#C9D0E2] hover:text-white">
                    <span className="nh-mono text-[12px] text-[#FF6B5C]">{l.n}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ol>
            <Link href={JOURNAL_PATH} className="mt-4 inline-block text-[14.5px] font-medium text-[#9DB4FF] hover:text-white">All {d.total} issues →</Link>
          </nav>
        </div>
        <Legal className="mt-20 border-t border-white/12 py-6" />
        <div aria-hidden className="pointer-events-none -mb-[0.2em] select-none overflow-hidden leading-none">
          <span className="nh-display block translate-y-[0.12em] text-[clamp(96px,23vw,360px)] font-bold leading-[0.8] tracking-[-0.06em] text-white/[0.06]">seopage</span>
        </div>
      </footer>
    </>
  );
}

/* ---------- B · IN THE FRAME ---------- */
async function FooterB({ scale }: { scale: boolean }) {
  const d = await footerData(scale);
  const inline = "text-[14px] text-[#A0A9C0] hover:text-white";
  return (
    <Close
      inner={
        <footer className="mt-auto flex flex-col gap-8 pt-24 lg:max-w-[40%]">
          <div className="grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-2">
            <nav aria-label="Product">
              <p className={HEAD}>Product</p>
              <ul className="flex flex-col gap-2">{d.product.map((l) => <li key={l.label}><A_ l={l} className={inline} /></li>)}</ul>
            </nav>
            <nav aria-label="rank, the journal">
              <RankMark href={JOURNAL_PATH} className="mb-4 text-[20px]" />
              <ul className="flex flex-col gap-2">
                {d.issues.slice(0, 3).map((l) => <li key={l.href}><Link href={l.href} className={`${inline} line-clamp-1`}>{l.label}</Link></li>)}
                <li><Link href={JOURNAL_PATH} className="text-[14px] font-medium text-[#9DB4FF] hover:text-white">All {d.total} issues →</Link></li>
              </ul>
            </nav>
          </div>
          <nav aria-label="SEO pages by trade">
            <p className={HEAD}>SEO pages by trade</p>
            <p className="leading-[1.9]">
              {d.trades.map((l, i) => (
                <span key={l.label} className="whitespace-nowrap">
                  <A_ l={l} className={inline} />
                  {i < d.trades.length - 1 && <span className="px-2 text-white/20">/</span>}
                </span>
              ))}
            </p>
          </nav>
          <Legal className="border-t border-white/15 pt-6 !flex-col" />
        </footer>
      }
    />
  );
}

/* ---------- C · DIRECTORY ---------- */
async function FooterC({ scale }: { scale: boolean }) {
  const d = await footerData(scale);
  const big: L[] = [
    { label: "Build my page", href: CREATE_URL },
    { label: "Pricing", href: "/#price" },
    { label: "Free audit", href: "/audit" },
    { label: "On-page SEO", href: "/on-page-seo-services" },
  ];
  return (
    <>
      <Close />
      <footer className={`${PAD} border-t border-white/12 bg-[#0A0F1E] pt-16`}>
        <nav aria-label="Primary" className="flex flex-wrap items-baseline gap-x-10 gap-y-3 border-b border-white/12 pb-12">
          {big.map((l) => <A_ key={l.label} l={l} className="nh-display text-[clamp(32px,4vw,56px)] leading-none tracking-[-0.04em] transition-colors hover:text-[#9DB4FF]" />)}
          <RankMark href={JOURNAL_PATH} className="text-[clamp(32px,4vw,56px)] transition-colors hover:text-[#9DB4FF]" />
        </nav>

        <div className="grid gap-12 py-12 lg:grid-cols-12">
          <nav aria-label="SEO pages by trade" className="lg:col-span-7">
            <p className={HEAD}>SEO pages by trade · {d.trades.length}</p>
            <ul className="flex flex-wrap gap-2">
              {d.trades.map((l) => (
                <li key={l.label}>
                  <A_ l={l} className="block rounded-full border border-white/12 px-3.5 py-1.5 text-[14px] text-[#C9D0E2] transition-colors hover:border-[#3D6BFF]/60 hover:text-white" />
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Latest in rank" className="lg:col-span-4 lg:col-start-9">
            <p className={HEAD}>Latest in rank¹</p>
            <ol className="flex flex-col gap-4">
              {d.issues.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group grid grid-cols-[40px_1fr] items-baseline gap-2">
                    <span className="nh-display text-[24px] leading-none text-[#FF6B5C]">{l.n}</span>
                    <span className="text-[15.5px] leading-snug text-[#C9D0E2] group-hover:text-white">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link href={JOURNAL_PATH} className="mt-5 inline-block text-[14.5px] font-medium text-[#9DB4FF] hover:text-white">All {d.total} issues →</Link>
          </nav>
        </div>
        <Legal className="border-t border-white/12 py-6" />
      </footer>
    </>
  );
}

export const FOOTER_VIEWS = { a: FooterA, b: FooterB, c: FooterC };

/** Direction + scale switcher, pinned to the bottom. */
export function FooterSwitcher({ current, scale }: { current: FooterKey; scale: boolean }) {
  const href = (k: string, s: boolean) => `/prototypes/footer/${k}${s ? "/scale" : ""}`;
  const pill = (on: boolean) => `whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${on ? "bg-[#3D6BFF] text-white" : "text-[#C9D0E2] hover:bg-white/10"}`;
  return (
    <nav className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0F1E]/90 p-1 text-[13px] shadow-2xl backdrop-blur">
      <Link href="/prototypes" className="hidden px-3 text-[#7D869C] hover:text-white sm:inline">Prototypes</Link>
      {FOOTERS.map((f) => (
        <Link key={f.key} href={href(f.key, scale)} className={pill(f.key === current)}>
          {f.key.toUpperCase()}<span className="hidden sm:inline"> · {f.name}</span>
        </Link>
      ))}
      <span className="mx-1 h-5 w-px bg-white/15" />
      <Link href={href(current, false)} className={pill(!scale)}>Today</Link>
      <Link href={href(current, true)} className={pill(scale)}>At scale</Link>
    </nav>
  );
}
