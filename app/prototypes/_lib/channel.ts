/* YouTube channel art. Made in code with the explainer video
   (video/src/Channel.tsx); `cd video && node scripts/thumbs.mjs ProfileMark …`
   re-renders into video/out/thumbs/, copied here to public/prototypes/channel/. */

export const PROFILES = [
  {
    key: "a",
    file: "profile-a-mark.png",
    name: "The citation mark",
    note: "The ¹ from the wordmark, alone. The only option that still reads at comment size (24–36px), and it says what we do: the mark AI answers put next to a source.",
    chosen: true,
  },
  {
    key: "b",
    file: "profile-b-wordmark.png",
    name: "The wordmark",
    note: "seopage¹ in the circle. Clear on the channel page; illegible below 48px, which is where most people see it.",
    chosen: false,
  },
  {
    key: "c",
    file: "profile-c-nora.png",
    name: "Nora",
    note: "Nora with the mark as a badge. Warm, but reads as a person's channel, and she's an illustration, not a founder or customer.",
    chosen: false,
  },
];

export const BANNERS = [
  {
    key: "a",
    file: "banner-a-type.jpg",
    name: "Wordmark and promise",
    note: "seopage¹ and \"SEO landing pages that get cited by AI.\" Clean; nothing says who it's for.",
    chosen: false,
  },
  {
    key: "b",
    file: "banner-b-nora.jpg",
    name: "Nora's shop",
    note: "The wordmark and promise beside Nora outside her shop. Says who it's for without a word, and matches the video and thumbnail.",
    chosen: true,
  },
  {
    key: "c",
    file: "banner-c-steps.jpg",
    name: "The four steps",
    note: "Describe, research, score, go live. Shows how it works; reads like a product slide rather than a place.",
    chosen: false,
  },
];
