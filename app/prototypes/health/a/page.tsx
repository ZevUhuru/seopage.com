import { ACTIONS, RECOVERY, THEMES, TOTALS, fmt } from "../_data";
import { CARD, GHOST, H2, LEAD, PRIMARY, Shell, Tag } from "../_shell";
import { Timeline } from "../_timeline";

/* Take A · What happened. The story first: one timeline lining up the
   site's numbers with its own changes and Google's updates, then what we
   think caused it, what we ruled out, the fix and how recovery is tracked. */

const FINDINGS = [
  {
    sure: "Likely",
    title: "76 empty coloring themes went into every page's footer three days before Google's spam update",
    body: `Since Sep 21 the footer links all ${THEMES.total} themes. ${THEMES.empty} have no coloring pages and ${THEMES.oneOrTwo} more have one or two. Each reads as the same ${THEMES.wordsMedian}-word template with the subject swapped, and all are in the sitemap.`,
  },
  {
    sure: "Likely",
    title: "The pages Google knew about doubled overnight on Sep 4",
    body: "An image can now sit under several categories, so one picture has several addresses. Known pages went from about 11,000 to 22,500, and 3,031 are already treated as copies.",
  },
  {
    sure: "We know",
    title: "Google dropped pages it had, across the whole site, during the update",
    body: `“Crawled - currently not indexed” went from about 600 to 4,700 in a day around Oct 5. Impressions fell from about 4,500 a day to 200, and “${TOTALS.headQuery.query}” lost ${-TOTALS.headQuery.impressionsChange}% of its impressions, so it isn't only the new pages.`,
  },
];

const RULED_OUT = [
  "A manual action: Search Console shows none",
  "A noindex or robots.txt mistake: only 19 pages carry noindex and 2 are blocked",
  "A broken deploy: the only changes Oct 1–7 were three Stories updates",
  "Pages going missing: 404s are 167, not thousands",
];

export default function TakeA() {
  return (
    <Shell take="a">
      <section className="flex flex-col gap-5">
        <h1 className="nh-display text-[40px] leading-[1.02] sm:text-[56px]">clip.art lost about 4,700 indexed pages in a week.</h1>
        <p className={LEAD}>
          It happened during Google&apos;s September spam update, about two weeks after two changes that added thousands of thin and duplicate pages. Nothing broke on the site; Google decided most of it wasn&apos;t worth keeping.
        </p>
        <dl className="mt-2 grid max-w-[760px] grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["Indexed now", fmt(TOTALS.indexed)],
            ["Indexed before", "About 6,000"],
            ["Impressions a day", "200, from 4,500"],
            ["Manual action", TOTALS.manualActions],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 border-t border-white/12 pt-3">
              <dt className="text-[13px] text-[#7D869C]">{k}</dt>
              <dd className="text-[20px] font-semibold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${CARD} p-5 sm:p-8`}>
        <Timeline />
      </section>

      <section className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6">
          <h2 className={H2}>What we think happened</h2>
          <ol className="flex flex-col gap-4">
            {FINDINGS.map((f, i) => (
              <li key={f.title} className={`${CARD} flex gap-5 p-6`}>
                <span className="nh-display text-[32px] leading-none text-[#3D6BFF]">{i + 1}</span>
                <div className="flex flex-col gap-2">
                  <Tag tone={f.sure === "We know" ? "good" : "watch"}>{f.sure}</Tag>
                  <h3 className="text-[18px] font-semibold leading-snug">{f.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-[#C9D0E2]">{f.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-[14px] text-[#7D869C]">Google doesn&apos;t say why it drops pages. “Likely” means the dates and the pages fit; it isn&apos;t proof.</p>
        </div>
        <aside className="flex flex-col gap-4">
          <h2 className="text-[20px] font-semibold">What it isn&apos;t</h2>
          <ul className="flex flex-col gap-3">
            {RULED_OUT.map((r) => (
              <li key={r} className="flex gap-3 text-[15px] leading-[1.5] text-[#C9D0E2]">
                <span className="mt-[7px] h-[8px] w-[8px] shrink-0 rounded-[2px] bg-[#7BE0A9]" />
                {r}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={H2}>Fix it</h2>
        <p className={LEAD}>Nothing changes on clip.art until you approve it. The first fix takes the thin pages out of Google&apos;s sight without deleting anything.</p>
        <ol className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {ACTIONS.map((a, i) => (
            <li key={a.title} className="grid gap-2 py-5 sm:grid-cols-[32px_1fr_220px] sm:items-baseline">
              <span className="text-[15px] font-semibold text-[#7D869C]">{i + 1}</span>
              <span className="flex flex-col gap-1">
                <span className="text-[16.5px] font-semibold">{a.title}</span>
                <span className="text-[14.5px] text-[#C9D0E2]">{a.effect}</span>
              </span>
              <span className="text-[13.5px] text-[#7D869C]">{a.effort}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-3">
          <button type="button" className={PRIMARY}>Approve fix 1</button>
          <button type="button" className={GHOST}>See the 107 pages</button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={H2}>Recovery, week by week</h2>
        <p className={LEAD}>Recovery after a spam update is usually slow, often months, and tends to show at a later update. We check these every Monday and say what moved.</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] table-fixed text-left text-[15px]">
            <thead className="text-[13px] text-[#7D869C]">
              <tr><th className="w-[34%] pb-3 font-normal">Measure</th><th className="pb-3 font-normal">Before</th><th className="pb-3 font-normal">Now</th><th className="pb-3 font-normal">Goal</th></tr>
            </thead>
            <tbody className="divide-y divide-white/10 border-t border-white/10">
              {RECOVERY.map((r) => (
                <tr key={r.metric}><td className="py-3.5">{r.metric}</td><td className="text-[#A0A9C0]">{r.before}</td><td className="font-semibold">{r.now}</td><td className="text-[#A0A9C0]">{r.goal}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Shell>
  );
}
