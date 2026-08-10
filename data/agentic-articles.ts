import type { Article } from "@/lib/articles";

/**
 * Seed articles for /agentic, checked into git.
 *
 * These are the curated source of record. Articles published from Compose merge
 * in by date and never overwrite a slug that exists here, so the hub has real
 * content from day one and keeps working if api.esy.com is unreachable.
 *
 * Each entry targets a keyword from the Ahrefs exports, chosen for volume
 * against low difficulty rather than for how the topic sounds:
 *
 *   ai seo services                    4,200/mo   KD 11
 *   seo page content best practices    2,800/mo   KD 16
 *   white label on page seo            2,200/mo   KD 14
 *   how to do seo for a landing page   1,800/mo   KD 10
 *   agentic seo                          200/mo   KD 14
 *
 * durationSeconds is set where a video is planned; the page renders a
 * placeholder frame until a muxPlaybackId exists on the record.
 */
export const seedArticles: Article[] = [
  {
    slug: "ai-seo-services-what-you-are-actually-buying",
    title: "AI SEO Services: What You're Actually Buying",
    description:
      "Most AI SEO services sell you volume: more pages, faster. The ones worth paying for sell judgment. Here's how to tell them apart before you sign anything.",
    category: "explainers",
    categoryLabel: "Explainer",
    publishedAt: "2026-08-04",
    durationSeconds: 468,
    tags: ["ai seo services", "ai seo", "ai seo agency"],
    relatedSlugs: ["what-is-agentic-seo", "seo-page-content-best-practices-2026"],
    content: `Search "AI SEO services" and you will find two businesses wearing the same clothes. One sells output. The other sells judgment. They cost about the same and they are not remotely the same purchase.

## The volume pitch

The volume pitch is easy to spot because the numbers are the product. Two hundred pages a month. A thousand keywords covered. A dashboard that turns green.

This worked briefly. It does not work now, and the reason is not moral — it is mechanical. Google's scaled content abuse policy, and the AI systems that increasingly sit above the results, both reward the same thing: a page that settles a specific question better than the alternatives. Two hundred pages that each half-answer a question are worth less than three that fully answer one.

If a service quotes you a page count before asking what you sell, you are buying volume.

## What judgment looks like on an invoice

The services worth paying for spend most of their effort before anything is written:

- **Which search is worth winning.** Most businesses have one or two queries where the buyer is ready and the competition is beatable. Finding those is analysis, not production.
- **What the ranking pages already do.** You cannot beat a result you have not read. The pattern the top ten share is the brief.
- **What the page has to prove.** A roofer has to state licensing and response time. A SaaS company has to state pricing and integrations. Getting this wrong is why beautiful pages fail.
- **Whether the answer is quotable.** AI assistants lift self-contained passages. A page that only makes sense read top to bottom will never be cited.

None of that scales the way a content mill wants it to, which is exactly why it still works.

## Where AI actually belongs in the process

Here is the part most services get backwards. AI is extraordinary at the middle of the job — reading the search results, drafting structure, generating the first version, checking schema. It is poor at the two ends: deciding what is worth doing, and deciding whether the result is good enough to publish.

So the right shape is a machine doing an hour of work in a minute, wrapped by a person who chose the target and who signs off on the output. Any service that removes the person has removed the part you were paying for.

## Five questions before you sign

1. **Which search will this page win, and why that one?** If the answer is a keyword list rather than a single query with a reason, keep looking.
2. **Who reviews the output, and what can they reject?** "Human-reviewed" means nothing without an answer to what happens when the review fails.
3. **What do I actually receive?** A finished page you own is a different product from a report of recommendations.
4. **What happens if it does not rank?** Nobody honest guarantees a position. But there should be a revision path.
5. **Is this a subscription for work that is finished in a day?** Some SEO is genuinely ongoing. A single page is not.

## The honest summary

AI made producing pages nearly free, which means producing pages is no longer the valuable part. What remains valuable is knowing which page to produce and being able to tell whether it came out well. When you buy AI SEO services, that judgment is the entire product. Everything else is a commodity you are being charged for.`,
  },
  {
    slug: "seo-page-content-best-practices-2026",
    title: "SEO Page Content Best Practices for 2026",
    description:
      "The practices that still work, the ones that stopped working, and the new half of the job nobody was doing three years ago: writing pages an AI assistant can quote.",
    category: "playbooks",
    categoryLabel: "Playbook",
    publishedAt: "2026-07-28",
    durationSeconds: 612,
    tags: ["seo page content best practices 2026", "on page seo", "seo content"],
    relatedSlugs: [
      "how-to-do-seo-for-a-landing-page",
      "ai-seo-services-what-you-are-actually-buying",
    ],
    content: `Most best-practice lists are the same list they were in 2019 with a paragraph about AI bolted on. The actual change is bigger than that, and it splits the job in two.

## The half that has not changed

These still decide whether you rank, and they are still where most pages fail:

- **One page, one search.** A page trying to win two queries wins neither. This is the single most common defect we find, and the fix is splitting the page rather than optimizing it.
- **The title tag carries the keyword, near the front.** Front-loading also makes Google less likely to rewrite it.
- **A single H1 that matches the search**, not the brand. "Emergency Roof Repair in Denver" beats "Welcome to Summit Roofing."
- **Headings that are questions people ask.** Your H2s are an outline of the searcher's thinking, not a table of contents for your services.
- **The answer comes first.** Opening with background is a habit from print. Answer in the first paragraph, then support it.
- **Specific, checkable facts.** Numbers, hours, credentials, prices. Adjectives are not evidence.

## The half that is new

Three years ago the whole job was ranking. Now a growing share of searches never produce a click at all — the assistant answers, cites two or three sources, and the searcher is done. Being ranked and being quoted are different tests.

**Write passages that survive being lifted out.** An assistant quotes a paragraph, not a page. If your third paragraph only makes sense after reading the first two, it cannot be quoted. Every important paragraph should stand alone.

**Give it something citable.** Assistants prefer sources that state facts precisely, because a precise claim is safe to repeat. "We respond within two hours" is quotable. "Fast, friendly service" is not.

**Put an FAQ block on the page, with matching FAQPage schema.** This is the highest-leverage structural change available right now. A question-and-answer pair is already shaped like the thing an assistant is looking for.

**Make the entity unambiguous.** Name the business, the service, and the service area in text. Organization and Service schema with \`sameAs\` links tie the page to a real entity rather than a string.

**Check that the crawlers can reach you.** GPTBot, ClaudeBot, PerplexityBot, and Google-Extended are all blockable in robots.txt, and plenty of sites block them by accident. This costs nothing to verify and quietly ends the conversation if you get it wrong.

## The practices that stopped working

- **Keyword density.** It was never real. It is now actively harmful when it makes a page read like it was written for a machine.
- **Word count targets.** Length is a symptom of coverage, not a cause of ranking. A 900-word page that settles the question beats a 2,400-word page that circles it.
- **Publishing on a cadence for its own sake.** Frequency does not signal quality to anything that matters.
- **llms.txt as a ranking tactic.** Ship one, it costs nothing. But as of 2026 no major AI company has committed to reading it in production, and Google's own guidance says it is not used for AI Overviews. Anyone selling it as the reason you will get cited is selling you a meta keywords tag.

## How to apply this to one page today

Open the page. Open the top ten results for the search it targets. Answer three questions: does my page deliver the same intent, does it cover what all of them cover, and can any single paragraph of mine be quoted without the rest?

Most pages fail the third question, and it is the cheapest one to fix.`,
  },
  {
    slug: "how-to-do-seo-for-a-landing-page",
    title: "How to Do SEO for a Landing Page",
    description:
      "Landing pages are built to convert and then optimized for search as an afterthought, which is why so few of them rank. Here's the order that actually works.",
    category: "playbooks",
    categoryLabel: "Playbook",
    publishedAt: "2026-07-21",
    durationSeconds: 405,
    tags: ["how to do seo for a landing page", "seo for landing page", "landing page seo"],
    relatedSlugs: [
      "seo-page-content-best-practices-2026",
      "white-label-on-page-seo-for-agencies",
    ],
    content: `A landing page and an SEO page are built from opposite directions. A landing page starts from what you want the visitor to do. An SEO page starts from what the visitor typed. Most landing pages never rank because nobody ever reconciled the two.

Here is the order that works.

## 1. Pick the search before you touch the page

Not a keyword list — one query. The test is whether you can say it out loud as something a person would type when they are ready to act. "Emergency roof repair Denver" passes. "Roofing solutions" does not.

If the page already exists and already converts, you are not choosing freely: pick the search whose intent most closely matches what the page already delivers. Retrofitting a page onto the wrong search is how you get a page that ranks and does not convert.

## 2. Read the results before you write

Open the top ten. Ignore your own page for now. You are looking for the pattern they share: are they guides, service pages, comparisons, or tools? How long? What questions do all of them answer?

That pattern is Google's answer to what this query rewards. You do not have to like it, but you do have to clear it.

## 3. Fix the intent gap first, everything else second

The most common failure is not technical. It is that the page answers a different question than the one being asked — a comparison query landing on a brochure, a cost query landing on a contact form.

Fixing intent means changing what the page says, not how it is tagged. Do this before touching a title tag, because everything downstream depends on it.

## 4. Then the elements search engines read

- **Title tag** — keyword near the front, sized to display in full.
- **Meta description** — written, not auto-generated, and written to earn a click rather than to describe.
- **One H1**, matching the search.
- **H2s as questions**, covering the subtopics the ranking set covers.
- **URL** — readable, keyword-bearing.
- **Image alt text**, especially on the main image.
- **Canonical**, self-referencing.

## 5. Add the part conversion pages usually lack: text

This is where landing pages lose. A page that is a hero image, three icons, and a form has almost nothing to rank and nothing to quote. You do not need to ruin it — add a section below the fold that answers the questions the search implies, and an FAQ block with matching schema.

The conversion path stays exactly as it was. You are adding a floor beneath it.

## 6. Check what the crawler actually gets

View source, not the rendered page. Confirm the title, H1, canonical, and body copy exist in the HTML rather than appearing after JavaScript runs. Then check robots.txt for GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.

## 7. Ask an assistant your own question

Put the query to ChatGPT, Perplexity, and Google's AI mode. Note who gets named. If a competitor appears and you do not, the gap is usually that their page states facts yours only implies.

## The order matters more than the list

Almost every item here appears on every SEO checklist. What most of them get wrong is sequence: they start with tags because tags are easy to check, and intent because intent is a judgment call. Reversed, you spend a week on alt text while the page answers the wrong question.`,
  },
  {
    slug: "white-label-on-page-seo-for-agencies",
    title: "White Label On-Page SEO: How Agencies Actually Use It",
    description:
      "White label on-page SEO works when the deliverable is a finished page and fails when it's a report. The difference is who does the judgment.",
    category: "agencies",
    categoryLabel: "For Agencies",
    publishedAt: "2026-07-14",
    durationSeconds: 372,
    tags: ["white label on page seo", "on page seo services", "white label seo"],
    relatedSlugs: [
      "ai-seo-services-what-you-are-actually-buying",
      "how-to-do-seo-for-a-landing-page",
    ],
    content: `Agencies buy white label on-page SEO for one of two reasons: capacity, or capability. The reason determines whether it works.

## Capacity is the easy case

You know exactly what the page needs. You do not have anyone free to build it this week. A white label partner who delivers a finished, publish-ready page solves this cleanly, and the only things that matter are turnaround, consistency, and whether it arrives in a state you can hand to a client without rewriting.

The failure mode here is a partner who delivers recommendations instead of pages. A twenty-page audit does not solve a capacity problem — it creates one, because now someone on your team has to implement it.

## Capability is where it goes wrong

If you are outsourcing because nobody on the team knows what the page should say, you have outsourced the judgment, and judgment is the part that does not survive a handoff. The partner does not know your client's market, their margin, or which service they actually want more of.

The fix is not a better partner. It is doing the targeting yourself and outsourcing the production. You name the search; they build the page.

## What to standardize before you buy

The agencies that get the most out of this arrive with a brief that never varies:

- **The single target search**, stated as a query.
- **The client's proof points** — licensing, response times, service area, guarantees, pricing signals.
- **What the client will not say** — claims legal has rejected, competitors they will not name.
- **Where it will live**, so internal links can be recommended.

That brief takes ten minutes and removes almost every revision cycle.

## Pricing it to your client

Per-page white label pricing is straightforward to mark up because the client can see the deliverable. Retainers are harder to defend and easier to cancel. A page for a specific search, delivered and published, is a thing a client can point at when they are deciding whether to keep paying you.

The margin question is whether you are charging for the page or for the targeting. Charge for the targeting. The page is the artifact; the reason it is that page is the work.

## The quality checks worth running on every delivery

Before it reaches a client:

1. Does it answer the one search it was built for, in the first paragraph?
2. Is every claim about the client factually correct? This is the one thing a partner cannot verify for you.
3. Does it have an FAQ block with matching schema?
4. Is the title tag under the truncation limit with the keyword near the front?
5. Does any single paragraph stand alone well enough to be quoted?

Five minutes, and it is the difference between a partner relationship that scales and one that generates rework.

## When not to use it

If the client's problem is technical — indexation, site architecture, Core Web Vitals, a migration gone wrong — a page will not fix it, and buying one wastes the budget that should have gone to the actual cause. Diagnose before you order.`,
  },
  {
    slug: "what-is-agentic-seo",
    title: "What Is Agentic SEO?",
    description:
      "Agentic SEO means agents doing the research, drafting, and checking that used to take a week — with a person choosing the target and approving the result. Here's what that looks like in practice.",
    category: "explainers",
    categoryLabel: "Explainer",
    publishedAt: "2026-07-07",
    durationSeconds: 348,
    tags: ["agentic seo", "what is agentic seo", "agentic ai for seo"],
    relatedSlugs: [
      "ai-seo-services-what-you-are-actually-buying",
      "seo-page-content-best-practices-2026",
    ],
    content: `Agentic SEO is what happens when the research, drafting, and checking parts of search optimization are handed to AI agents that can use tools, while a person keeps the two decisions that matter: what to build, and whether it is good enough to publish.

That is the whole definition. The interesting part is what it changes.

## What an agent actually does here

An agent is not a chatbot that writes copy. It is a loop that can act: read a page, run a search, fetch a competitor, check a schema validator, then decide what to do next based on what it found.

For a single SEO page, that loop looks roughly like:

1. Read the top ten results for the target search and extract what they have in common.
2. Read the client's existing site to learn the business, its services, and its proof points.
3. Draft the page structure against the pattern the results reward.
4. Write the page.
5. Validate its own output — title length, heading structure, schema, internal links.
6. Report what it could not resolve.

Steps one through six used to be a week of a specialist's time. They now take minutes.

## What it does not do

It does not know which search is worth winning. That requires knowing the business's margin, capacity, and competitive position, and it is where most SEO money is won or lost.

It does not know when the output is good enough. An agent will confidently produce a page that is structurally perfect and strategically pointless, and it has no way to feel the difference.

So the shape that works is a machine in the middle and a person at both ends. Remove the person and you get volume without judgment, which is the thing search engines have spent two years learning to discount.

## Agentic SEO vs "AI SEO"

The terms get used interchangeably and should not be. Most "AI SEO" tooling is generative: a prompt goes in, text comes out, a human pastes it somewhere. Agentic means the system can take actions and check its own work — reading the actual SERP rather than recalling it, validating the schema rather than claiming it.

The practical difference shows up in accuracy. A generative tool will invent a plausible competitor set. An agent goes and looks.

## Why it matters more now than it would have in 2023

Two things changed at once. Models got good enough to be trusted with multi-step work, and search started answering questions directly instead of only listing links. The second change raised the bar on what a page has to do — it now has to be quotable, not just rankable — and the first change made it economical to meet that bar on every page instead of the important ones.

## What to ask a service that claims to do this

- What does the agent actually read before it writes?
- What does it check after it writes, and what happens when a check fails?
- Who decided this was the right search to target?
- Who can reject the output, and how often do they?

The last two are the real questions. The technology is increasingly commodity; the judgment wrapped around it is not.`,
  },
];
