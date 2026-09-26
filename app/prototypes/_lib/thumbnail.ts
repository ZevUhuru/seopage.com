/* YouTube thumbnail prototypes for the explainer video. Made in code with the
   video (video/src/Thumbs.tsx); `cd video && node scripts/thumbs.mjs` re-renders
   them into video/out/thumbs/, copied here to public/prototypes/thumbnail/. */

export const THUMBS = [
  {
    key: "a",
    file: "a-alarm.jpg",
    name: "Alarm",
    words: "AI picked THEM.",
    note: "Nora's shock, and the answer naming the shop across the street. The video's first five seconds, so the click gets what it was promised. Reads at phone size.",
    chosen: true,
  },
  {
    key: "b",
    file: "b-outcome.jpg",
    name: "Outcome",
    words: "Get named by ChatGPT",
    note: "Nora smiling on a call, with the citation mark. Says the benefit and the word people search. The answer card is illegible on a phone.",
    chosen: false,
  },
  {
    key: "c",
    file: "c-before-after.jpg",
    name: "Before and after",
    words: "Invisible → Cited",
    note: "A grey Nora by a silent phone, then a full-colour Nora on a call. The transformation in one frame; weakest at phone size, where two faces compete.",
    chosen: false,
  },
];
