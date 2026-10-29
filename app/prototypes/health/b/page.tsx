import { NOT_INDEXED, PAGE_TYPES, THEMES, TOTALS, fmt } from "../_data";
import { CARD, GHOST, H2, LEAD, PRIMARY, Shell, Tag } from "../_shell";
import { Timeline } from "../_timeline";

/* Take B · Checkup. Health by page type: Search Console's verdicts joined
   with Esy's crawl, so each kind of page shows what Google decided and
   what's on it. The worst type opens with what visitors and Google see. */

const TONE = { bad: "Needs work", watch: "Watch", good: "Healthy" } as const;

export default function TakeB() {
  const yours = NOT_INDEXED.filter((r) => r.source === "Website");
  const google = NOT_INDEXED.filter((r) => r.source === "Google");
  const max = Math.max(...NOT_INDEXED.map((r) => r.pages));
  return (
    <Shell take="b">
      <section className="flex flex-col gap-6">
        <h1 className="nh-display text-[40px] leading-[1.02] sm:text-[56px]">Checkup: two kinds of page are pulling clip.art down.</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Indexed pages", v: fmt(TOTALS.indexed), n: "About 6,000 on Oct 1", tone: "bad" as const },
            { k: "Impressions a day", v: "About 200", n: "About 4,500 in late September", tone: "bad" as const },
            { k: "Thin theme pages", v: String(THEMES.thin), n: `${THEMES.empty} with no pages at all`, tone: "bad" as const },
            { k: "Images at several addresses", v: fmt(3031), n: "Treated as copies", tone: "watch" as const },
          ].map((s) => (
            <div key={s.k} className={`${CARD} flex flex-col gap-2 p-5`}>
              <span className="flex items-center justify-between gap-2 text-[13.5px] text-[#A0A9C0]">{s.k}<Tag tone={s.tone}>{TONE[s.tone]}</Tag></span>
              <span className="text-[30px] font-semibold tabular-nums">{s.v}</span>
              <span className="text-[13.5px] text-[#7D869C]">{s.n}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={H2}>By page type</h2>
        <p className={LEAD}>Each row joins what Search Console decided with what Esy found on the pages, ranked by how much each costs the site. Indexing per type comes from the Search Console API; today only example URLs are checked.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] table-fixed text-left text-[15px]">
            <thead className="text-[13px] text-[#7D869C]">
              <tr>
                <th className="w-[19%] pb-3 font-normal">Page type</th>
                <th className="w-[12%] pb-3 font-normal">Pages</th>
                <th className="w-[11%] pb-3 font-normal">In Google</th>
                <th className="w-[11%] pb-3 font-normal">Health</th>
                <th className="pb-3 font-normal">What we found</th>
                <th className="w-[19%] pb-3 font-normal">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 border-t border-white/10 align-top">
              {PAGE_TYPES.map((p) => (
                <tr key={p.type}>
                  <td className="py-4 pr-3 font-semibold">{p.type}</td>
                  <td className="py-4 pr-3 text-[#C9D0E2]">{p.pages}</td>
                  <td className="py-4 pr-3 text-[#C9D0E2]">{p.indexed}</td>
                  <td className="py-4 pr-3"><Tag tone={p.health}>{TONE[p.health]}</Tag></td>
                  <td className="py-4 pr-4 text-[14.5px] leading-[1.5] text-[#C9D0E2]">{p.finding}</td>
                  <td className="py-4 text-[14.5px] leading-[1.5]">{p.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The worst type, opened: the same page as a visitor and as Google sees it. */}
      <section className={`${CARD} flex flex-col gap-6 p-6 sm:p-8`}>
        <div className="flex flex-col gap-2">
          <span className="text-[14px] text-[#9DB4FF]">Coloring theme pages, opened</span>
          <h2 className="nh-display text-[28px] leading-[1.1] sm:text-[34px]">{THEMES.sample.url}, as a visitor and as Google sees it</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-[12px] border border-white/10 p-5">
            <span className="text-[13.5px] text-[#7D869C]">What a visitor sees</span>
            <p className="text-[16px]">“{THEMES.sample.says}”</p>
            <p className="text-[15px] text-[#C9D0E2]">Then {THEMES.wordsMedian} words that read the same on {THEMES.empty} other themes, including “{THEMES.sample.claims}”. There are no packs.</p>
          </div>
          <div className="flex flex-col gap-3 rounded-[12px] border border-white/10 p-5">
            <span className="text-[13.5px] text-[#7D869C]">What Google decided</span>
            <p className="text-[16px]">{THEMES.sample.google}</p>
            <p className="text-[15px] text-[#C9D0E2]">Found through the footer and the sitemap, like every theme. {THEMES.inSitemap} of the {THEMES.empty} empty themes are in a sitemap of {fmt(THEMES.sitemapUrls)} URLs.</p>
          </div>
        </div>
        <div className="grid gap-5 text-[14.5px] md:grid-cols-2">
          <p className="text-[#C9D0E2]"><span className="text-[#7D869C]">Empty, for example: </span>{THEMES.emptyExamples.join(", ")}</p>
          <p className="text-[#C9D0E2]"><span className="text-[#7D869C]">Fullest, 60 on the first page: </span>{THEMES.fullest.join(", ")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className={PRIMARY}>Hide themes under 8 pages</button>
          <button type="button" className={GHOST}>Fill them instead</button>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-2">
        {[
          { title: "Yours to fix", note: "Caused by how the site is built", rows: yours },
          { title: "Google's call", note: "Google chose not to crawl or keep these", rows: google },
        ].map((g) => (
          <div key={g.title} className="flex flex-col gap-4">
            <div>
              <h2 className="text-[22px] font-semibold">{g.title}</h2>
              <p className="text-[14.5px] text-[#7D869C]">{g.note}</p>
            </div>
            <ul className="flex flex-col gap-4">
              {g.rows.map((r) => (
                <li key={r.reason} className="flex flex-col gap-1.5">
                  <span className="flex justify-between gap-4 text-[14.5px]"><span>{r.reason}</span><span className="tabular-nums text-[#C9D0E2]">{fmt(r.pages)}</span></span>
                  <span className="h-[6px] rounded-[3px] bg-white/8"><span className="block h-full rounded-[3px] bg-[#5A82FF]" style={{ width: `${Math.max(1, (r.pages / max) * 100)}%` }} /></span>
                  {r.note && <span className="text-[13px] text-[#7D869C]">{r.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={`${CARD} p-5 sm:p-8`}>
        <Timeline />
      </section>
    </Shell>
  );
}
