// Renders the thumbnail prototypes at full size to out/thumbs/, as JPEGs under
// YouTube's 2 MB upload limit, plus a feed-size preview of each.
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { enableTailwind } from "@remotion/tailwind-v4";
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ["ThumbAlarm", "ThumbCited", "ThumbSplit"];
const serveUrl = await bundle({ entryPoint: join(root, "src/index.ts"), webpackOverride: (c) => enableTailwind(c), publicDir: join(root, "public") });
mkdirSync(join(root, "out/thumbs"), { recursive: true });
for (const id of ids) {
  const composition = await selectComposition({ serveUrl, id });
  // Profile pictures are flat graphics: PNG keeps their edges clean.
  const png = id.startsWith("Profile");
  const output = join(root, `out/thumbs/${id}.${png ? "png" : "jpg"}`);
  await renderStill({ serveUrl, composition, frame: 0, output, ...(png ? { imageFormat: "png" } : { imageFormat: "jpeg", jpegQuality: 90 }) });
  console.log(`${output}  ${(statSync(output).size / 1024).toFixed(0)} KB`);
}
