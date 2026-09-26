// Renders stills at the given seconds, bundling once:
//   node scripts/stills.mjs Master 2.5 7 12.3
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { enableTailwind } from "@remotion/tailwind-v4";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [id, ...secs] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: join(root, "src/index.ts"), webpackOverride: (c) => enableTailwind(c), publicDir: join(root, "public") });
const composition = await selectComposition({ serveUrl, id });
mkdirSync(join(root, "out/stills"), { recursive: true });
for (const sec of secs) {
  const frame = Math.min(composition.durationInFrames - 1, Math.round(Number(sec) * composition.fps));
  const output = join(root, `out/stills/${id}-${String(sec).padStart(5, "0")}.jpeg`);
  await renderStill({ serveUrl, composition, frame, output, imageFormat: "jpeg", jpegQuality: 80, scale: 0.5 });
  console.log(output);
}
