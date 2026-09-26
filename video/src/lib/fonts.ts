import { loadFont as archivo } from "@remotion/google-fonts/Archivo";
import { loadFont as funnelDisplay } from "@remotion/google-fonts/FunnelDisplay";
import { loadFont as funnelSans } from "@remotion/google-fonts/FunnelSans";
import { loadFont as geist } from "@remotion/google-fonts/Geist";
import { loadFont as geistMono } from "@remotion/google-fonts/GeistMono";

/** The homepage's faces (Funnel) and the builder's (Archivo, Geist). */
export const DISPLAY = funnelDisplay("normal", { weights: ["500", "600", "700"], subsets: ["latin"] }).fontFamily;
export const SANS = funnelSans("normal", { weights: ["400", "500", "600"], subsets: ["latin"] }).fontFamily;
export const APP_DISPLAY = archivo("normal", { weights: ["700", "800"], subsets: ["latin"] }).fontFamily;
export const APP_SANS = geist("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] }).fontFamily;
export const MONO = geistMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily;
