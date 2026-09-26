// Renders the cuts, then masters each one's audio to −14 LUFS integrated,
// −1 dBTP true peak (two-pass loudnorm), and writes the captions file.
//
//   npm run render                  Master, MasterCaptioned, Vertical
//   npm run render -- Vertical      just one
//
// Output: out/final/seopage-<cut>.mp4, out/seopage-explainer.en.srt,
// out/final/seopage-thumbnail.jpg.
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { enableTailwind } from "@remotion/tailwind-v4";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CUTS = { Master: "youtube-16x9", MasterCaptioned: "captioned-16x9", Vertical: "vertical-9x16" };
const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CUTS);
const manifest = JSON.parse(readFileSync(join(root, "public/audio/manifest.json"), "utf8"));
const hasAudio = Object.keys(manifest).length > 0;

/** Runs the bundled ffmpeg and returns its stderr, where it prints measurements. */
const ff = (args) => spawnSync("npx", ["remotion", "ffmpeg", "-hide_banner", "-y", ...args], { encoding: "utf8" }).stderr;
const lastJson = (log) => JSON.parse(log.slice(log.lastIndexOf("{"), log.lastIndexOf("}") + 1));

/** Two-pass EBU R128 loudnorm; video is copied untouched. */
function master(input, output) {
  const LN = "loudnorm=I=-14:TP=-1:LRA=11";
  const m = lastJson(ff(["-i", input, "-vn", "-af", `${LN}:print_format=json`, "-f", "null", "-"]));
  const second = `${LN}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true:print_format=json`;
  const out = lastJson(ff(["-i", input, "-af", second, "-c:v", "copy", "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-movflags", "+faststart", output]));
  return { before: `${m.input_i} LUFS, ${m.input_tp} dBTP`, after: `${out.output_i} LUFS, ${out.output_tp} dBTP (${out.normalization_type})` };
}

// `--master-only`: re-master already rendered out/<id>.raw.mp4 files without rendering again.
if (process.argv.includes("--master-only")) {
  for (const id of ids.filter((x) => x !== "--master-only")) {
    const r = master(join(root, `out/${id}.raw.mp4`), join(root, `out/final/seopage-${CUTS[id] ?? id}.mp4`));
    console.log(`${id}: loudness ${r.before} → ${r.after}`);
  }
  process.exit(0);
}

mkdirSync(join(root, "out/final"), { recursive: true });
const serveUrl = await bundle({ entryPoint: join(root, "src/index.ts"), webpackOverride: (c) => enableTailwind(c), publicDir: join(root, "public") });

for (const id of ids) {
  const composition = await selectComposition({ serveUrl, id });
  const raw = join(root, `out/${id}.raw.mp4`);
  const final = join(root, `out/final/seopage-${CUTS[id] ?? id}.mp4`);
  let last = -1;
  await renderMedia({
    serveUrl,
    composition,
    codec: "h264",
    crf: 16,
    imageFormat: "jpeg",
    jpegQuality: 92,
    audioBitrate: "320k",
    outputLocation: raw,
    onProgress: ({ progress }) => {
      const p = Math.floor(progress * 10);
      if (p !== last) process.stdout.write(`${id} ${p * 10}% `), (last = p);
    },
  });
  console.log();
  if (hasAudio) {
    const r = master(raw, final);
    console.log(`${id}: loudness ${r.before} → ${r.after}`);
  } else {
    renameSync(raw, final);
    console.log(`${id}: no audio generated yet, picture only`);
  }
  console.log(final);
}

// Thumbnail: prototype A, "AI picked THEM." (chosen 2026-09-26; see /prototypes/thumbnail).
const thumb = await selectComposition({ serveUrl, id: "ThumbAlarm" });
await renderStill({ serveUrl, composition: thumb, frame: 0, output: join(root, "out/final/seopage-thumbnail.jpg"), imageFormat: "jpeg", jpegQuality: 90 });
execFileSync("node", [join(root, "scripts/cue-sheet.mjs")], { stdio: ["ignore", "ignore", "inherit"] });
console.log("thumbnail and captions written");
