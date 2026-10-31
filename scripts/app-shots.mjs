/* ================================================================
   Captures the app screenshots the homepage shows (public/app/<trade>/).
   Drives the create.seopage.com prototype at its picked frame (F4 navy
   rail, R1 switcher) and photographs each view at 2x. The prototype's
   sample business is a painter; for these pictures it becomes a sample
   HVAC company, plumber or roofer, swapped in on screen before each shot,
   so the images speak to the trades the homepage sells to. Every number
   stays the prototype's sample; every business here is made up.

   Run:  APP=http://localhost:3099 PW_CORE=/path/to/node_modules/playwright-core node scripts/app-shots.mjs
   Needs cwebp (brew install webp); PNGs are converted to WebP and removed.
   ================================================================ */
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_CORE || "playwright-core");
const APP = process.env.APP || "http://localhost:3099";
// Where the trade photos for the builder's sample page are served (this site's public/ folder)
const SITE = process.env.SITE || "http://localhost:3091";
const OUT = path.resolve("public/app");

/* One sample business per trade. The prototype's four painting services map to the same four roles:
   s1 the service with our live page, s2 the weak page that's half the jobs, s3 the page waiting for
   approval, s4 the seasonal one planned for next month. */
const TRADES = {
  hvac: {
    name: "Northside Heating & Air", domain: "northsideheating.com", initials: "NH", brandQuery: "northside heating",
    otherDomain: "northsideplumbing.com", otherName: "Northside Plumbing", niche: "Heating and cooling",
    homeMeta: "Furnace and AC repair in Denver. Licensed, insured, and on time. Call for same-day service.",
    servicesMeta: "Furnace, AC and heat pump service in Denver.", next1: "Add prices and same-day hours", gallery: "Photos of our installs.",
    h1: "Denver's on-time heating and cooling crew", titleTail: "Denver Heating & Cooling", googleSees: "a furnace repair company in Denver",
    season: "Worth a page before summer.", gap: "The gap is AC work, heat pumps and three of your four areas.",
    nearMe: "hvac company near me", nearMeTheme: "HVAC near me", reviewsQ: "heating company denver reviews", servicesQ: "hvac services denver", questionsTheme: "Furnace questions",
    s1: { Title: "Furnace repair", TitleCase: "Furnace Repair", lower: "furnace repair", short: "furnace", slug: "furnace-repair", q: "furnace repair denver", page: "Furnace repair in Denver" },
    s2: { Title: "AC repair", TitleCase: "AC Repair", lower: "AC repair", slug: "ac-repair", q: "ac repair denver" },
    s3: { Title: "Heat pumps", TitleCase: "Heat Pump Installation", slug: "heat-pump-installation", q: "heat pump installation denver", aurora: "heat pump installation Aurora", page: "Heat pump installation in Denver", meta: "Heat pumps in Denver: what they cost, the rebates, and how long an install takes." },
    s4: { Title: "AC tune-ups", slug: "ac-tune-up", q: "ac tune up denver", page: "AC tune-ups in Denver" },
    cost: { Title: "What AC replacement costs in Denver", q: "ac replacement cost denver", slug: "ac-replacement-cost-denver" },
    area: { Title: "Heating and cooling in Lakewood", q: "hvac lakewood co", slug: "hvac-lakewood" },
    blog1: { Title: "How long does a furnace last?", TitleCase: "How Long Does a Furnace Last?", q: "how long does a furnace last", slug: "how-long-does-a-furnace-last", meta: "Most furnaces last 15 to 20 years in Colorado. Here is what shortens it." },
    blog2: { Title: "Choosing a thermostat", TitleCase: "Choosing a Thermostat", q: "how to choose a thermostat", slug: "choosing-a-thermostat" },
  },
  plumbing: {
    name: "Northside Plumbing", domain: "northsideplumbing.com", initials: "NP", brandQuery: "northside plumbing",
    otherDomain: "northsidedrains.com", otherName: "Northside Drains", niche: "Plumbing",
    homeMeta: "Drain cleaning and water heater repair in Denver. Licensed, insured, and on time. Call for same-day service.",
    servicesMeta: "Drains, water heaters and tankless installs in Denver.", next1: "Add prices and same-day hours", gallery: "Photos of our jobs.",
    h1: "Denver's on-time plumbers", titleTail: "Denver Plumbers", googleSees: "a drain cleaning company in Denver",
    season: "Worth a page before the first freeze.", gap: "The gap is water heaters, tankless installs and three of your four areas.",
    nearMe: "plumber near me", nearMeTheme: "Plumber near me", reviewsQ: "plumbing company denver reviews", servicesQ: "plumbing services denver", questionsTheme: "Plumbing questions",
    s1: { Title: "Drain cleaning", TitleCase: "Drain Cleaning", lower: "drain cleaning", short: "drain", slug: "drain-cleaning", q: "drain cleaning denver", page: "Drain cleaning in Denver" },
    s2: { Title: "Water heater repair", TitleCase: "Water Heater Repair", lower: "water heater repair", slug: "water-heater-repair", q: "water heater repair denver" },
    s3: { Title: "Tankless water heaters", TitleCase: "Tankless Water Heaters", slug: "tankless-water-heaters", q: "tankless water heater denver", aurora: "tankless water heater Aurora", page: "Tankless water heaters in Denver", meta: "Tankless water heaters in Denver: what they cost, the rebates, and how long an install takes." },
    s4: { Title: "Frozen pipe repair", slug: "frozen-pipe-repair", q: "frozen pipe repair denver", page: "Frozen pipe repair in Denver" },
    cost: { Title: "What water heater replacement costs in Denver", q: "water heater replacement cost denver", slug: "water-heater-replacement-cost-denver" },
    area: { Title: "Plumbers in Lakewood", q: "plumbers lakewood co", slug: "plumbers-lakewood" },
    blog1: { Title: "How long does a water heater last?", TitleCase: "How Long Does a Water Heater Last?", q: "how long does a water heater last", slug: "how-long-does-a-water-heater-last", meta: "Most tank water heaters last 8 to 12 years in Colorado. Here is what shortens it." },
    blog2: { Title: "Choosing a water heater", TitleCase: "Choosing a Water Heater", q: "how to choose a water heater", slug: "choosing-a-water-heater" },
  },
  roofing: {
    name: "Northside Roofing", domain: "northsideroofing.com", initials: "NR", brandQuery: "northside roofing",
    otherDomain: "northsidegutters.com", otherName: "Northside Gutters", niche: "Roofing",
    homeMeta: "Roof repair and replacement in Denver. Licensed, insured, and on time. Call for a free inspection.",
    servicesMeta: "Roof repair, replacement and gutters in Denver.", next1: "Add prices and inspection times", gallery: "Photos of our roofs.",
    h1: "Denver's careful roofers", titleTail: "Denver Roofers", googleSees: "a roof repair company in Denver",
    season: "Worth a page before hail season.", gap: "The gap is replacements, gutters and three of your four areas.",
    nearMe: "roofers near me", nearMeTheme: "Roofers near me", reviewsQ: "roofing company denver reviews", servicesQ: "roofing services denver", questionsTheme: "Roofing questions",
    s1: { Title: "Roof repair", TitleCase: "Roof Repair", lower: "roof repair", short: "roof repair", slug: "roof-repair", q: "roof repair denver", page: "Roof repair in Denver" },
    s2: { Title: "Roof replacement", TitleCase: "Roof Replacement", lower: "roof replacement", slug: "roof-replacement", q: "roof replacement denver" },
    s3: { Title: "Gutters", TitleCase: "Gutter Installation", slug: "gutter-installation", q: "gutter installation denver", aurora: "gutter installation Aurora", page: "Gutter installation in Denver", meta: "Gutters in Denver: what they cost, the options, and how long an install takes." },
    s4: { Title: "Hail damage repair", slug: "hail-damage-repair", q: "hail damage roof repair denver", page: "Hail damage repair in Denver" },
    cost: { Title: "What a roof replacement costs in Denver", q: "roof replacement cost denver", slug: "roof-replacement-cost-denver" },
    area: { Title: "Roofers in Lakewood", q: "roofers lakewood co", slug: "roofers-lakewood" },
    blog1: { Title: "How long does a roof last?", TitleCase: "How Long Does a Roof Last?", q: "how long does a roof last", slug: "how-long-does-a-roof-last", meta: "Most shingle roofs last 20 to 25 years in Colorado. Here is what shortens it." },
    blog2: { Title: "Choosing roof shingles", TitleCase: "Choosing Roof Shingles", q: "how to choose roof shingles", slug: "choosing-roof-shingles" },
  },
};

// The painter's words → one trade's, longest phrases first so a short rule never splits a long one
const swapFor = (T) => [
  ["Interior painting in Denver, done right the first time. Prices, timelines and the neighbourhoods we cover.", `${T.s1.page}, done right the first time. Prices, wait times and the neighbourhoods we cover.`],
  ["Interior and exterior painting in Denver. Licensed, insured, and on time. Call for a free estimate.", T.homeMeta],
  ["Cabinet painting in Denver: what it costs, how long it takes, and the finish that lasts.", T.s3.meta],
  ["Most exterior paint lasts 7 to 10 years in Colorado. Here is what shortens it.", T.blog1.meta],
  ["The gap is exterior work, cabinets and three of your four areas.", T.gap],
  ["Interior, exterior and cabinet painting in Denver.", T.servicesMeta],
  ["Add prices and a room-by-room timeline", T.next1],
  ["Before and after photos of our work.", T.gallery],
  ["Denver's careful house painters", T.h1],
  ["Denver House Painters", T.titleTail],
  ["an interior painter in Denver", T.googleSees],
  ["how long a room takes", "how fast you can come"],
  ["your interior page", `your ${T.s1.short} page`],
  ["Worth a page before spring.", T.season],
  // Paths
  ["/exterior-painting-cost-denver", `/${T.cost.slug}`],
  ["/interior-painting-denver", `/${T.s1.slug}-denver`],
  ["/cabinet-painting-denver", `/${T.s3.slug}-denver`],
  ["/deck-staining-denver", `/${T.s4.slug}-denver`],
  ["/house-painters-lakewood", `/${T.area.slug}`],
  ["/exterior-painting", `/${T.s2.slug}`],
  ["/blog/how-long-does-paint-last", `/blog/${T.blog1.slug}`],
  ["/blog/choosing-paint-colors", `/blog/${T.blog2.slug}`],
  // The business and its other site
  ["northsidepainting.com", T.domain],
  ["northsidecabinets.com", T.otherDomain],
  ["Northside Cabinets", T.otherName],
  ["Northside Painting", T.name],
  ["northside painting", T.brandQuery],
  ["Residential painting", T.niche],
  ["residential painting", T.niche.toLowerCase()],
  // Searches and page names
  ["What exterior painting costs in Denver", T.cost.Title],
  ["exterior painting cost denver", T.cost.q],
  ["painting company denver reviews", T.reviewsQ],
  ["house painters near me", T.nearMe],
  ["Painters near me", T.nearMeTheme],
  ["painting services denver", T.servicesQ],
  ["interior painters denver", T.s1.q],
  ["exterior painters denver", T.s2.q],
  ["cabinet painting Aurora", T.s3.aurora],
  ["cabinet painting denver", T.s3.q],
  ["Cabinet Painting in Denver", `${T.s3.TitleCase} in Denver`],
  ["Cabinet painting in Denver", T.s3.page],
  ["Interior Painting in Denver", `${T.s1.TitleCase} in Denver`],
  ["Interior painting in Denver", T.s1.page],
  ["painters lakewood co", T.area.q],
  ["House painters in Lakewood", T.area.Title],
  ["deck staining denver", T.s4.q],
  ["Deck staining in Denver", T.s4.page],
  ["How Long Does Exterior Paint Last?", T.blog1.TitleCase],
  ["How long does exterior paint last?", T.blog1.Title],
  ["how long does exterior paint last", T.blog1.q],
  ["Choosing Paint Colors", T.blog2.TitleCase],
  ["Choosing paint colors", T.blog2.Title],
  ["how to choose interior paint colors", T.blog2.q],
  ["Paint questions", T.questionsTheme],
  ["Exterior Painting", T.s2.TitleCase],
  ["Exterior painting", T.s2.Title],
  ["exterior painting", T.s2.lower],
  ["Interior painting", T.s1.Title],
  ["interior painting", T.s1.lower],
  ["Cabinet painting", T.s3.Title],
  ["Deck staining", T.s4.Title],
];

/* The builder's sample page (/prototypes/builder/b5) is the painter's too: its hero, the two new
   versions, its menu and photo become the trade's. Prices and promises here are the sample
   business's own page copy, not SEOPage's. */
const BUILDER = {
  hvac: {
    slug: "northside-heating", nav: { Interior: "Furnaces", Cabinets: "Cooling" }, photo: "/trade/hvac/furnace.webp",
    lead: "Furnaces, heat pumps and AC, every make and model, with your house left the way we found it.",
    v2h: "Furnace repair in Denver, same day, from $129", v2lead: "Every make and model, fixed on the first visit most days. Licensed, insured and 4.9 on Google.",
    v3h: "No heat? Furnace repair in Denver, today", v3lead: "We find the fault, fix it, and test it before we leave. Your house is warm tonight.",
    every: "What every visit gets", prep: "The safety checks are most of the job, so we never skip them.",
    pro: "Denver's 4.9-rated heating and cooling crew", proof: "2,300 homes kept warm since 2014, with a two-year parts and labour promise.",
  },
  plumbing: {
    slug: "northside-plumbing", nav: { Interior: "Drains", Cabinets: "Water heaters" }, photo: "/home/svc-drain.webp",
    lead: "Kitchen, bath and main lines, with your house left the way we found it.",
    v2h: "Drain cleaning in Denver, same day, from $149", v2lead: "Kitchen, bath and main lines, cleared on the first visit most days. Licensed, insured and 4.9 on Google.",
    v3h: "Slow drain? Drain cleaning in Denver, today", v3lead: "We clear it, camera the line, and show you what we saw. No mess left behind.",
    every: "What every visit gets", prep: "The camera check is most of the job, so we never skip it.",
    pro: "Denver's 4.9-rated plumbers", proof: "2,300 jobs since 2014, with a two-year workmanship promise.",
  },
  roofing: {
    slug: "northside-roofing", nav: { Interior: "Repairs", Cabinets: "Replacement" }, photo: "/trade/roofers/leak.webp",
    lead: "Leaks, missing shingles and flashing, with your yard left the way we found it.",
    v2h: "Roof repair in Denver, from $350", v2lead: "Leaks, shingles and flashing, fixed before the next storm. Licensed, insured and 4.9 on Google.",
    v3h: "Roof leak? Roof repair in Denver, this week", v3lead: "We find the leak, fix it, and send you photos of the repair. No mess left behind.",
    every: "What every roof gets", prep: "The inspection is most of the job, so we never skip it.",
    pro: "Denver's 4.9-rated roofers", proof: "2,300 roofs since 2014, with a ten-year workmanship promise.",
  },
};
const builderSwapFor = (T, B) => [
  ["Interior painting in Denver, from $450 a room", B.v2h],
  ["Walls, ceilings and trim, two coats, done in days. Licensed, insured and 4.9 on Google.", B.v2lead],
  ["Tired walls? Interior painting in Denver, done this week", B.v3h],
  ["We move the furniture, fix the cracks and leave clean lines. You come home to a finished room.", B.v3lead],
  ["Walls, trim, ceilings and cabinets, with your furniture put back where it was.", B.lead],
  ["What every room gets", B.every],
  ["Denver's 4.9-rated interior painters", B.pro],
  ["2,300 rooms painted since 2014, with a two-year no-peel promise.", B.proof],
  ["The prep is most of the job, so we never skip it.", B.prep],
  ["northside-painting.seo.page", `${B.slug}.seo.page`],
  ["interior painting denver", T.s1.q],
  ...swapFor(T),
];

/* Rewrites every text node and title/aria attribute, hides the prototype's labels and the dev badge, and
   reports leftovers. `exact` replaces whole text nodes only (menu items like "Interior"); `photo`, when set,
   replaces every picture in the document. Runs in the page and in each of its frames. */
function swapInPage({ swap, initials, exact = {}, photo }) {
  const run = (s) => swap.reduce((t, [a, b]) => t.split(a).join(b), s);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const v = n.nodeValue.trim();
    n.nodeValue = v === "NP" ? initials : exact[v] ? n.nodeValue.replace(v, exact[v]) : run(n.nodeValue);
  }
  document.querySelectorAll("[title],[aria-label],[alt]").forEach((el) => {
    for (const a of ["title", "aria-label", "alt"]) if (el.hasAttribute(a)) el.setAttribute(a, run(el.getAttribute(a)));
  });
  if (photo) document.querySelectorAll("img").forEach((img) => { img.removeAttribute("srcset"); img.src = photo; });
  document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
  document.querySelectorAll("[data-proto-ui]").forEach((el) => (el.style.display = "none"));
  document.querySelectorAll("p").forEach((p) => {
    if (p.textContent.startsWith("Prototype ·") || p.textContent.startsWith("Prototype. ")) p.style.display = "none";
  });
  return [...document.body.innerText.matchAll(/[^\n]*(paint|cabinet|deck|room|walls)[^\n]*/gi)].map((m) => m[0]).slice(0, 8);
}

/* Converts the PNG to WebP beside it and removes the PNG */
async function save(page, trade, name) {
  const file = path.join(OUT, trade, `${name}.png`);
  await page.screenshot({ path: file });
  execFileSync("cwebp", ["-quiet", "-q", "86", file, "-o", file.replace(/\.png$/, ".webp")]);
  rmSync(file);
  console.log("✓", trade, name);
}

// The views the homepage shows: a rail section, and a tab inside it
const VIEWS = [
  ["overview", "Overview"],
  ["site-map", "Your site", "Map"],
  ["site-performance", "Your site", "Performance"],
  ["site-coverage", "Your site", "Coverage"],
  ["site-identity", "Your site", "Identity"],
  ["opportunities", "Opportunities"],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
// ONLY=builder recaptures just the builder; otherwise start from an empty folder
const ONLY = process.env.ONLY;
if (!ONLY) rmSync(OUT, { recursive: true, force: true });

for (const [trade, T] of Object.entries(TRADES)) {
  mkdirSync(path.join(OUT, trade), { recursive: true });

  // The app's views, from the account prototype's frame
  for (const [name, rail, tab] of ONLY === "builder" ? [] : VIEWS) {
    await page.goto(`${APP}/prototypes/account/r1`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: rail }).first().click();
    if (tab) await page.getByRole("button", { name: tab, exact: true }).first().click();
    await page.waitForTimeout(400);
    const left = await page.evaluate(swapInPage, { swap: swapFor(T), initials: T.initials });
    if (left.length) console.warn(`  ${trade}/${name}: still mentions`, left);
    await page.waitForTimeout(150);
    await save(page, trade, name);
  }

  // The builder on Versions after "Try 3 more": three ranked takes on the hero. The preview and each
  // version card are frames, so the swap runs in every one, and the photos point at the trade's picture.
  const B = BUILDER[trade];
  await page.goto(`${APP}/prototypes/builder/b5`, { waitUntil: "networkidle" });
  await page.getByText("Versions", { exact: true }).first().click();
  await page.getByRole("button", { name: "Try 3 more" }).last().click();
  await page.waitForTimeout(9000);
  // Leaving a version card rebuilds the preview frame, so park the mouse first and swap last
  await page.mouse.move(700, 880);
  await page.waitForTimeout(1500);
  const args = { swap: builderSwapFor(T, B), initials: T.initials, exact: B.nav, photo: `${SITE}${B.photo}` };
  for (const f of page.frames()) {
    // Only what's on screen has to be clean; the sample page below the fold keeps the painter's words
    const left = await f.evaluate(swapInPage, args).catch(() => []);
    if (left.length) console.warn(`  ${trade}/builder (frame): still mentions`, left.slice(0, 2));
  }
  await page.waitForTimeout(1500); // the trade photo loads
  await save(page, trade, "builder");
}

await browser.close();
