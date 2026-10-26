import Link from "next/link";
import { COST_ESTIMATE, PLANS, usd } from "@/lib/plans";

/* Internal: what each plan needs before it can switch on, and what it
   roughly costs us. Same data as /pricing (lib/plans.ts). Never indexed. */

const pct = (cost: number, price: number) => `${Math.round((1 - cost / price) * 100)}%`;

export default function PlansStatus() {
  return (
    <main className="mx-auto flex max-w-[1100px] flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-3">
        <h1 className="nh-display text-[44px] leading-none">Plans: what’s left to build</h1>
        <p className="max-w-[720px] text-[16.5px] leading-[1.6] text-[#C9D0E2]">
          Every plan from <Link href="/pricing" className="text-[#9DB4FF] underline-offset-2 hover:underline">/pricing</Link>, its status, what has to exist before its button turns on, and estimated cost a month. Costs use the v3 page median ($4.49) plus checks and reporting; people’s time is shown in hours, not dollars. Margins are before Stripe’s fee (about 3%).
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {PLANS.map((p) => {
          const c = COST_ESTIMATE[p.id];
          const live = p.status === "live";
          return (
            <article key={p.id} className="flex flex-col gap-5 rounded-[20px] border border-white/12 bg-[#0A0F1E] p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[20px] font-semibold">{p.name} · {usd(p.price)} {p.per === "once" ? "once" : "a month"}</h2>
                <span className={`rounded-[8px] px-2.5 py-1 text-[13px] ${live ? "bg-[#1F8A5B]/25 text-[#7BE0A9]" : "bg-white/8 text-[#A0A9C0]"}`}>{live ? "Live" : "Off"}</span>
              </div>
              <dl className="grid grid-cols-3 gap-4 text-[14.5px]">
                <div><dt className="text-[#7D869C]">Cost, first month</dt><dd className="tabular-nums">{usd(c.firstMonth)}</dd></div>
                <div><dt className="text-[#7D869C]">Cost, after</dt><dd className="tabular-nums">{p.per === "once" ? "—" : usd(c.after)}</dd></div>
                <div>
                  <dt className="text-[#7D869C]">Margin</dt>
                  <dd className="tabular-nums">{p.per === "once" ? pct(c.firstMonth, p.price) : `${pct(c.firstMonth, p.price)} → ${pct(c.after, p.price)}`}</dd>
                </div>
              </dl>
              {c.hours > 0 && <p className="text-[14px] text-[#A0A9C0]">Plus about {c.hours} hour{c.hours === 1 ? "" : "s"} of a person’s time a month.</p>}
              {p.needs.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] font-semibold">Before it can go live</h3>
                  <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[14.5px] leading-[1.5] text-[#C9D0E2]">
                    {p.needs.map((n) => <li key={n}>{n}</li>)}
                  </ul>
                </div>
              ) : (
                <p className="text-[14.5px] text-[#C9D0E2]">Sold today on create.seopage.com.</p>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
