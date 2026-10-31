import { Funnel_Display, Funnel_Sans } from "next/font/google";

/** The homepage's own faces; every other page keeps the site defaults.
 *  Variable fonts with no weight list: one file covers every weight. A weight list makes the
 *  bundler's Google Fonts loader fail some builds ("queries have exactly one entry"), which broke
 *  a production deploy on 2026-10-31. Same fix as create.seopage.com #46. */
export const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});
export const funnelSans = Funnel_Sans({
  variable: "--font-funnel",
  subsets: ["latin"],
});
