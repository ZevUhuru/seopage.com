// Pulls single frames out of a rendered file, to check what actually shipped:
//   node scripts/frames.mjs out/final/seopage-youtube-16x9.mp4 5.1 17.6 20.9
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const [file, ...secs] = process.argv.slice(2);
mkdirSync("out/frames", { recursive: true });
for (const sec of secs) {
  const out = `out/frames/f-${String(sec).padStart(5, "0")}.jpeg`;
  execFileSync("npx", ["remotion", "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", sec, "-i", file, "-frames:v", "1", "-vf", "scale=640:-1", out], { stdio: ["ignore", "ignore", "inherit"] });
  console.log(out);
}
