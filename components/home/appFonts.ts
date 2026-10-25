import { Barlow_Condensed } from "next/font/google";

/** The condensed headline face of the trade page drawn inside the app (AppShot). Kept out of fonts.ts so only pages that draw the app load it. */
export const pageCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
});
