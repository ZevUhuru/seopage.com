import { ACTIONS, CHANGES, THEMES, TOTALS, day, fmt } from "../_data";
import { CARD, GHOST, H2, LEAD, PRIMARY, Shell, Tag } from "../_shell";

/* Take C · Briefing. What an owner reads on Monday: the week's insights,
   each with its evidence and how sure we are, the fixes waiting for an OK,
   and a place to ask a question of the site's own data. */

type Insight = { sure: "We know" | "Likely" | "Worth a look"; title: string; saw: string; evidence: [string, string][]; next: string };

const INSIGHTS: Insight[] = [
  {
    sure: "We know",
    title: "Google dropped most of clip.art during its September spam update",
    saw: "Indexed pages fell from about 6,000 to 1,340 around Oct 5, inside the update's Sep 24 to Oct 8 rollout. There's no manual action, so this was automatic.",
    evidence: [["Crawled - currently not indexed", "About 600 → 5,935"], ["Impressions a day", "About 4,500 → 200"], [`“${TOTALS.headQuery.query}” impressions`, `${TOTALS.headQuery.impressionsChange}%`]],
    next: "Read the two likely causes below",
  },
  {
    sure: "Likely",
    title: `${THEMES.empty} empty coloring themes are linked from every page`,
    saw: `Since Sep 21 the footer links all ${THEMES.total} themes. ${THEMES.thin} have two coloring pages or fewer, and the empty ones say “No coloring pages yet” over the same ${THEMES.wordsMedian}-word template.`,
    evidence: [["Themes with no pages", String(THEMES.empty)], ["Themes with 1 or 2", String(THEMES.oneOrTwo)], ["Empty themes in the sitemap", `${THEMES.inSitemap} of ${THEMES.empty}`]],
    next: "Hide themes under 8 pages until they're filled",
  },
  {
    sure: "Likely",
    title: "One image now lives at several addresses",
    saw: "On Sep 4 images could join more than one category, and the pages Google knew about doubled overnight. Google already treats 3,031 of them as copies.",
    evidence: [["Known pages", "About 11,000 → 22,500"], ["Alternate page with canonical", fmt(3031)], ["Discovered, not crawled", fmt(11653)]],
    next: "Give each image one address",
  },
  {
    sure: "Worth a look",
    title: "Halloween is in two days and its theme has 10 pages",
    saw: "Seasonal themes are what people print this week and next. Filling Halloween, then Thanksgiving and Christmas, turns them back on first.",
    evidence: [["Halloween coloring pages", "10"], ["Pumpkin", "3"], ["Thanksgiving and Turkey", "0"]],
    next: "Fill the seasonal themes first",
  },
];

const ASK = ["Which page types lost the most impressions?", "What changed on the site in the two weeks before the drop?", "Which empty themes do people search for?"];

export default function TakeC() {
  const updates = CHANGES.filter((c) => c.who === "google");
  return (
    <Shell take="c">
      <section className="flex flex-col gap-4">
        <span className="text-[14px] text-[#9DB4FF]">Monday briefing · week of Oct 26</span>
        <h1 className="nh-display text-[40px] leading-[1.02] sm:text-[56px]">This week: why clip.art fell, and the first fix to approve.</h1>
        <p className={LEAD}>
          Four things from Search Console and this week&apos;s crawl. Google&apos;s last update was the {updates.at(-1)!.what}, {day(updates.at(-1)!.date)} to {day(updates.at(-1)!.end!)}.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        {INSIGHTS.map((n, i) => (
          <article key={n.title} className={`${CARD} grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_300px]`}>
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-3">
                <span className="text-[14px] font-semibold text-[#7D869C]">{i + 1}</span>
                <Tag tone={n.sure === "We know" ? "good" : n.sure === "Likely" ? "watch" : "plain"}>{n.sure}</Tag>
              </span>
              <h2 className="text-[21px] font-semibold leading-snug">{n.title}</h2>
              <p className="text-[15.5px] leading-[1.6] text-[#C9D0E2]">{n.saw}</p>
              <p className="text-[14.5px]"><span className="text-[#7D869C]">Next: </span>{n.next}</p>
            </div>
            <dl className="flex flex-col divide-y divide-white/10 self-start rounded-[12px] border border-white/10 px-4">
              {n.evidence.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-[13.5px] text-[#A0A9C0]">{k}</dt>
                  <dd className="shrink-0 text-[15px] font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
        <p className="text-[14px] text-[#7D869C]">“We know” is in the data. “Likely” means the dates and the pages fit; Google doesn&apos;t say why it drops pages.</p>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={H2}>Waiting for your OK</h2>
        <ul className="flex flex-col gap-3">
          {ACTIONS.map((a, i) => (
            <li key={a.title} className={`${CARD} flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between`}>
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-3 text-[16.5px] font-semibold">{a.title}{a.status === "in progress" && <Tag tone="watch">In progress</Tag>}</span>
                <span className="text-[14.5px] text-[#C9D0E2]">{a.effect}</span>
                <span className="text-[13px] text-[#7D869C]">{a.effort}</span>
              </span>
              {a.status === "suggested" && (
                <button type="button" className={`${i === 0 ? PRIMARY : GHOST} shrink-0`}>{i === 0 ? "Approve" : "Review"}</button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className={H2}>Ask about clip.art</h2>
        <p className={LEAD}>Answers come from this site&apos;s own Search Console, crawl and change log, with the numbers behind them.</p>
        <form className="flex flex-col gap-3 sm:flex-row">
          <input disabled placeholder="Ask a question about your search data" className="h-12 flex-1 rounded-[10px] border border-white/15 bg-[#0A0F1E] px-4 text-[15.5px] placeholder:text-[#7D869C]" />
          <button type="button" disabled className={`${GHOST} opacity-60`}>Ask</button>
        </form>
        <ul className="flex flex-wrap gap-2">
          {ASK.map((q) => (
            <li key={q} className="rounded-[8px] border border-white/12 px-3 py-1.5 text-[14px] text-[#C9D0E2]">{q}</li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
