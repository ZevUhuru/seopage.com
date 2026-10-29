/* Five stories for the homepage's middle, between the hero and the footer
   (/prototypes/below/n1…n5). Each prototype builds the story's first section,
   under the live hero so the form above personalizes it, and lists the
   sections that would follow. None uses Nora. */

export const BELOW = [
  {
    key: "n1",
    name: "The question",
    note: "Problem first. Someone near you asks AI who to hire, and it names someone else. The page that fixes it comes after.",
    story: [
      "The question: AI names someone else, and why (there's no page for it to quote)",
      "What that page needs: prices, areas, straight answers, the details AI quotes",
      "The builder makes it, with your business in it",
      "Checked before you pay, ten checks",
      "Our own sites, built the same way",
      "The price, once, then Build it free",
    ],
  },
  {
    key: "n2",
    name: "Three steps",
    note: "How it works first. What happens after Build it free, in three steps, so nothing about signing up is a surprise.",
    story: [
      "Three steps: tell us who you are, we research your city, you choose each section",
      "Step 2 up close: the searches people in your city really type",
      "Step 3 up close: versions, layouts, and your own edits",
      "Checked before you pay",
      "You own it: publish to your address or download it",
      "The price, then Build it free",
    ],
  },
  {
    key: "n3",
    name: "The checks",
    note: "Quality first. Your page as Google and an AI answer would show it, with the ten checks marked on it.",
    story: [
      "Your page, checked: what Google and AI read, marked",
      "Each check, and why it matters",
      "What we won't do: no tricks, no promised rankings, nothing made up",
      "Our own sites, built the same way",
      "The price, then Build it free",
    ],
  },
  {
    key: "n4",
    name: "Our own sites",
    note: "Proof first. esy.com and clip.art are built with the same system, and Ahrefs shows how often AI names them. For newsletter readers who know Esy.",
    story: [
      "Our own sites: what Ahrefs shows for esy.com and clip.art",
      "The same system, for one page about your business",
      "The builder, with your business in it",
      "Checked before you pay",
      "The price, then Build it free",
    ],
  },
  {
    key: "n5",
    name: "What you get",
    note: "Offer first. Everything in the page, the price, and what the same work costs elsewhere. For visitors who arrive ready.",
    story: [
      "What you get, and the price",
      "What the same work costs elsewhere",
      "How it works, in three steps",
      "Questions people ask before buying",
      "Build it free",
    ],
  },
] as const;
export type BelowKey = (typeof BELOW)[number]["key"];
