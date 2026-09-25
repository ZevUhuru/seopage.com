import Link from "next/link";
import { VERTICALS } from "@/lib/verticals";
import { TRADE_STYLES } from "../_lib/trade-shared";

export default function TradeChooser() {
  return (
    <main className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
      <h1 className="nh-display text-[clamp(56px,8vw,120px)] leading-[0.9]">Trade pages.</h1>
      <p className="mt-6 max-w-[640px] text-[19px] leading-[1.55] text-[#C9D0E2]">
        Three templates for /roofers, /hvac, and every trade after them. Each renders from lib/verticals.ts, so one template serves every trade. The switcher at the bottom flips direction and trade.
      </p>
      <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {TRADE_STYLES.map((s) => (
          <li key={s.key} className="flex flex-col gap-4 rounded-[24px] border border-white/12 bg-[#0A0F1E] p-7">
            <span className="nh-display text-[64px] leading-none text-[#3D6BFF]">{s.key.toUpperCase()}</span>
            <span className="nh-display text-[30px] leading-none tracking-[-0.03em]">{s.name}</span>
            <span className="text-[16px] text-[#A0A9C0]">{s.note}</span>
            <span className="mt-auto flex flex-wrap gap-3 pt-4">
              {VERTICALS.map((v, i) => (
                <Link key={v.slug} href={`/prototypes/trade/${s.key}/${v.slug}`} className={`flex h-11 items-center rounded-full px-5 text-[14.5px] ${i === 0 ? "bg-[#3D6BFF] font-semibold text-white hover:bg-[#5A82FF]" : "border border-white/30 hover:border-white/60"}`}>
                  /{v.slug}
                </Link>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
