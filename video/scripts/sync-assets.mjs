// Copies the site's own images and clips into video/public/site so the video
// always uses what seopage.com ships, without committing a second copy.
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "..", "public");
const dest = join(root, "public", "site");

mkdirSync(dest, { recursive: true });
for (const dir of ["home", "proof"]) cpSync(join(site, dir), join(dest, dir), { recursive: true });
console.log(`synced ${site}/{home,proof} -> ${dest}`);
