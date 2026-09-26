/* Social cards (og:image, 1200×630) for /rank/how-we-made-our-explainer-video.
   Made in code with the video (video/src/Cards.tsx); `cd video && node
   scripts/thumbs.mjs CardEditorial CardVideo CardNumbers` re-renders them. */

export const CARDS = [
  {
    key: "a",
    file: "a-editorial.jpg",
    name: "Editorial",
    note: "The title does the work; three real frames from the video show it's about something we made. Reads as a write-up, which is what the link is.",
    chosen: true,
  },
  {
    key: "b",
    file: "b-video.jpg",
    name: "Video",
    note: "Nora's face and a Watch pill. The strongest thumb-stopper, but it reads as the video itself rather than the story of making it.",
    chosen: false,
  },
  {
    key: "c",
    file: "c-numbers.jpg",
    name: "Numbers",
    note: "75 seconds, 86 sound cues, 3 cuts, 5 mistakes. Curious for builders; all text, so it's the weakest in a busy feed.",
    chosen: false,
  },
];
