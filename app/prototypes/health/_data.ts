/* ================================================================
   clip.art as SEOPage's first site (2026-10-29). Real numbers from
   clip.art's Search Console and a read-only crawl of its 166 coloring
   theme pages, used by the three /prototypes/health takes.

   In the product these come from Esy (api.esy.com): the Search Console
   connection on the project, Esy's own crawl, and a change log built
   from GitHub deploys and Google's Search Status Dashboard. Here they
   are typed in, so the takes can be judged on real data.
   ================================================================ */

export const SITE = { name: "clip.art", lastUpdate: "Oct 22, 2026", today: "Oct 29, 2026" };

/* Weekly points read off Search Console's charts, so they are approximate.
   The product reads them exactly through the API. */
export const WEEKS: { week: string; indexed: number; known: number; impressions: number; clicks: number }[] = [
  { week: "2026-08-03", indexed: 2600, known: 7000, impressions: 600, clicks: 15 },
  { week: "2026-08-10", indexed: 2900, known: 7900, impressions: 750, clicks: 20 },
  { week: "2026-08-17", indexed: 3300, known: 8600, impressions: 1000, clicks: 22 },
  { week: "2026-08-24", indexed: 3900, known: 9600, impressions: 1200, clicks: 22 },
  { week: "2026-08-31", indexed: 4600, known: 11000, impressions: 1500, clicks: 28 },
  { week: "2026-09-07", indexed: 6000, known: 22500, impressions: 2600, clicks: 38 },
  { week: "2026-09-14", indexed: 6100, known: 22800, impressions: 4000, clicks: 42 },
  { week: "2026-09-21", indexed: 6000, known: 23200, impressions: 4600, clicks: 48 },
  { week: "2026-09-28", indexed: 6000, known: 23300, impressions: 4300, clicks: 44 },
  { week: "2026-10-05", indexed: 1500, known: 23400, impressions: 400, clicks: 14 },
  { week: "2026-10-12", indexed: 1400, known: 23400, impressions: 200, clicks: 11 },
  { week: "2026-10-19", indexed: 1340, known: 23500, impressions: 200, clicks: 13 },
];

/* What changed, on the site and at Google, on the same timeline. */
export type Change = { date: string; end?: string; who: "site" | "google"; what: string; ref?: string };
export const CHANGES: Change[] = [
  { date: "2026-08-18", end: "2026-08-20", who: "google", what: "August 2026 spam update" },
  { date: "2026-09-04", who: "site", what: "An image can belong to more than one category", ref: "#237" },
  { date: "2026-09-06", who: "site", what: "Category pages get paginated URLs", ref: "#245" },
  { date: "2026-09-12", who: "site", what: "Image sitemap submitted: 16,571 pages" },
  { date: "2026-09-21", who: "site", what: "The footer links all 166 coloring themes", ref: "#416" },
  { date: "2026-09-24", end: "2026-10-08", who: "google", what: "September 2026 spam update" },
];

/* Search Console, exact. */
export const TOTALS = {
  indexed: 1340, notIndexed: 22141, clicks3mo: 2371, impressions3mo: 159000,
  manualActions: "None", headQuery: { query: "clipart", impressionsChange: -98 },
};

export const NOT_INDEXED: { reason: string; source: "Website" | "Google"; pages: number; note?: string }[] = [
  { reason: "Discovered - currently not indexed", source: "Google", pages: 11653, note: "Google knows them and hasn't crawled them" },
  { reason: "Crawled - currently not indexed", source: "Google", pages: 5935, note: "About 600 until Oct 5, then 4,700 in a day" },
  { reason: "Alternate page with proper canonical tag", source: "Website", pages: 3031, note: "The same image at more than one address" },
  { reason: "Page with redirect", source: "Website", pages: 959 },
  { reason: "Soft 404", source: "Website", pages: 288 },
  { reason: "Not found (404)", source: "Website", pages: 167 },
  { reason: "Duplicate, Google chose different canonical than user", source: "Google", pages: 83 },
  { reason: "Excluded by noindex tag", source: "Website", pages: 19 },
];

/* Esy's crawl of the coloring theme pages, 2026-10-29. */
export const THEMES = {
  total: 166, empty: 76, oneOrTwo: 31, thin: 107, inSitemap: 76, sitemapUrls: 1151,
  wordsMedian: 324, linkedFrom: "The footer of every page",
  sample: {
    url: "/coloring-pages/angel",
    says: "0 pages to print · No angel coloring pages yet. Be the first to create one!",
    claims: "The theme packs on this page are complete angel coloring books",
    google: "Crawled - currently not indexed · last crawled Oct 8",
  },
  fullest: ["animals", "anime", "car", "detailed", "dinosaur", "flowers", "numbers", "pattern", "shapes", "space"],
  emptyExamples: ["angel", "axolotl", "april", "ballerina", "bug", "camping", "aesthetic", "black-history-month"],
};

/* Page types, Search Console joined with the crawl. */
export const PAGE_TYPES: {
  type: string; pages: string; indexed: string; health: "bad" | "watch" | "good"; finding: string; fix: string;
}[] = [
  { type: "Coloring theme pages", pages: "166", indexed: "Example not indexed", health: "bad", finding: "76 have no pages and 31 have one or two; the same 324-word template with the subject swapped, linked from every page", fix: "Hide themes under 8 pages, fill the rest" },
  { type: "Clip art image pages", pages: "16,571 in the sitemap", indexed: "Not split yet", health: "bad", finding: "One image can sit at several category addresses; 3,031 are already treated as copies", fix: "One address per image" },
  { type: "Category pages, page 2 and on", pages: "Not counted yet", indexed: "Not split yet", health: "watch", finding: "Lean grids by design; many more URLs for Google to weigh", fix: "Keep, but only where page 1 is full" },
  { type: "Worksheets", pages: "Not counted yet", indexed: "Examples not indexed", health: "watch", finding: "Examples now sit in Crawled - currently not indexed", fix: "Check after the themes are fixed" },
  { type: "Learn and Stories", pages: "15 in the Learn sitemap", indexed: "Not split yet", health: "good", finding: "Their own sitemap; small and distinct pages", fix: "Nothing yet" },
];

/* What SEOPage would suggest, each waiting for an OK. */
export const ACTIONS: { title: string; effect: string; effort: string; status: "suggested" | "in progress" | "done" }[] = [
  { title: "Hide coloring themes with fewer than 8 pages", effect: "107 thin pages leave Google, the footer and the sitemap until they fill", effort: "One change in clip.art", status: "suggested" },
  { title: "Fill the themes people search for, starting with the season", effect: "Halloween, Christmas and Thanksgiving first; each turns back on at 8 pages", effort: "About $0.01 to $0.04 an image, reviewed in Esy", status: "in progress" },
  { title: "Give each image one address", effect: "The 3,031 copies point Google to one page", effort: "A canonical rule in clip.art", status: "suggested" },
  { title: "Stop claiming packs that don't exist", effect: "Theme text matches what's on the page", effort: "Copy change", status: "suggested" },
];

/* What recovery looks like, tracked weekly from today. */
export const RECOVERY = [
  { metric: "Indexed pages", before: "About 6,000", now: "1,340", goal: "Back over 5,000" },
  { metric: "Impressions a day", before: "About 4,500", now: "About 200", goal: "Back over 3,000" },
  { metric: "“clipart” impressions", before: "Normal", now: "Down 98%", goal: "Back to normal" },
  { metric: "Thin theme pages visible to Google", before: "0", now: "107", goal: "0" },
];

export const TAKES = [
  { key: "a", name: "What happened", note: "One timeline: your numbers, your changes and Google's updates, lined up. The story first, then the fix." },
  { key: "b", name: "Checkup", note: "Health by page type: Search Console joined with Esy's crawl, ranked by what it costs you." },
  { key: "c", name: "Briefing", note: "A weekly briefing: each insight with its evidence and how sure we are, and the fixes waiting for your OK." },
] as const;

export const fmt = (n: number) => n.toLocaleString("en-US");
export const day = (iso: string) => {
  const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${m[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8))}`;
};
