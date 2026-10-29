import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE, TAKES } from "./_data";

/* The frame every take shares: the site being looked at, where its data
   comes from, and a switcher between the three takes. */
export function Shell({ take, children }: { take: "a" | "b" | "c"; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#04060B] text-[#EEF2FF]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <div className="flex items-center gap-5">
            <Logo tone="dark" />
            <span className="h-5 w-px bg-white/15" />
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-semibold">{SITE.name}</span>
              <span className="text-[12.5px] text-[#7D869C]">Search Console connected · crawled {SITE.today}</span>
            </span>
          </div>
          <nav aria-label="Takes" className="flex gap-1 rounded-[10px] border border-white/12 p-1">
            {TAKES.map((t) => (
              <Link
                key={t.key}
                href={`/prototypes/health/${t.key}`}
                aria-current={t.key === take ? "page" : undefined}
                className={`rounded-[8px] px-3 py-1.5 text-[13.5px] ${t.key === take ? "bg-white/10 text-white" : "text-[#A0A9C0] hover:text-white"}`}
              >
                {t.key.toUpperCase()} · {t.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-[1160px] flex-col gap-16 px-4 py-12 sm:px-8 sm:py-16">{children}</main>
    </div>
  );
}

/* A small status label: a soft rectangle, never a pill. */
export function Tag({ tone, children }: { tone: "bad" | "watch" | "good" | "plain"; children: React.ReactNode }) {
  const c = { bad: "bg-[#FF6B5C]/15 text-[#FF9A8F]", watch: "bg-[#F5B940]/15 text-[#F5CF7A]", good: "bg-[#1F8A5B]/25 text-[#7BE0A9]", plain: "bg-white/8 text-[#A0A9C0]" }[tone];
  return <span className={`inline-block w-fit self-start rounded-[6px] px-2 py-0.5 text-[12.5px] font-medium ${c}`}>{children}</span>;
}

export const H2 = "nh-display text-[30px] leading-[1.05] sm:text-[38px]";
export const LEAD = "max-w-[720px] text-[16.5px] leading-[1.6] text-[#C9D0E2]";
export const CARD = "rounded-[16px] border border-white/12 bg-[#0A0F1E]";
export const PRIMARY = "inline-flex h-11 items-center rounded-[10px] bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]";
export const GHOST = "inline-flex h-11 items-center rounded-[10px] border border-white/25 px-5 text-[14.5px] text-[#EEF2FF] hover:border-white/50";
