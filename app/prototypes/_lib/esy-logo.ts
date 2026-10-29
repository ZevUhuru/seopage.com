/* Where Esy's logo sits in the footer, beside "a division of ESY LLC" (/prototypes/esy-logo). */

export const ESY_LOGO_PLACEMENTS = [
  {
    key: "a",
    placement: "bar",
    name: "In the bottom bar",
    note: "The logo, text-height and in Esy's colours, at the end of the line that already says SEOPage is a division of ESY LLC. Colour all the time, since phones can't hover. Quiet, and it ties the company name to the logo newsletter readers know.",
    chosen: true, // shipped as the footer default
  },
  {
    key: "b",
    placement: "brand",
    name: "Under the SEOPage logo",
    note: "“Built on Esy” in colour under the tagline, linking esy.com. The bottom bar is unchanged. Seen sooner, but it shares the SEOPage logo's spot.",
    chosen: false,
  },
  {
    key: "c",
    placement: "band",
    name: "Its own strip",
    note: "Esy's logo in colour on a strip above the bottom bar: SEOPage is built on Esy, from ESY LLC. The most visible; it gives Esy as much room as a footer column.",
    chosen: false,
  },
];
