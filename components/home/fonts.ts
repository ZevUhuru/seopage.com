import { Funnel_Display, Funnel_Sans } from "next/font/google";

/** The homepage's own faces; every other page keeps the site defaults. */
export const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
export const funnelSans = Funnel_Sans({
  variable: "--font-funnel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
