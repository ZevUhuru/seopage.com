// Prints what is sounding in each second of the master, fails if any second
// has only the music bed (or nothing), and writes the YouTube captions file
// out/seopage-explainer.en.srt from the voice lines.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { captionChunks } from "../src/lib/captions.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cues = JSON.parse(readFileSync(join(root, "src/cues.json"), "utf8"));
const mPath = join(root, "public/audio/manifest.json");
const manifest = existsSync(mPath) ? JSON.parse(readFileSync(mPath, "utf8")) : {};
const len = (id, fallback) => manifest[id]?.sec ?? fallback;

const spans = [
  ...cues.vo.map((v) => ({ kind: "voice", name: v.id, a: v.at, b: v.at + len(v.id, v.slot) })),
  ...cues.hits.map((h) => ({ kind: "sfx", name: h.sfx, a: h.at, b: h.until ?? h.at + len(h.sfx, cues.sfx[h.sfx].sec) / (h.rate ?? 1) })),
];

let gaps = 0;
const rows = [];
for (let i = 0; i < cues.durationSec; i++) {
  const on = spans.filter((x) => x.a < i + 1 && x.b > i);
  const voice = on.filter((x) => x.kind === "voice").map((x) => x.name);
  const sfx = [...new Set(on.filter((x) => x.kind === "sfx").map((x) => x.name))];
  if (!voice.length && !sfx.length) gaps++;
  const mm = `${Math.floor(i / 60)}:${String(i % 60).padStart(2, "0")}`;
  rows.push(`${mm}  music ${voice.length ? "+ " + voice.join(" ") : ""} ${sfx.length ? "+ " + sfx.join(", ") : ""}${!voice.length && !sfx.length ? "   <-- music only" : ""}`);
}
console.log(rows.join("\n"));
const generated = Object.keys(manifest).length;
console.log(`\n${cues.durationSec - gaps}/${cues.durationSec} seconds carry voice or a sound effect over the score. Lengths: ${generated ? "measured from generated files" : "planned (nothing generated yet)"}.`);

const srtTime = (s) => {
  const ms = Math.round(s * 1000);
  const p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const srt = captionChunks(cues, manifest, 48).map((c, i) => `${i + 1}\n${srtTime(c.start)} --> ${srtTime(c.end)}\n${c.text}\n`).join("\n");
mkdirSync(join(root, "out"), { recursive: true });
writeFileSync(join(root, "out/seopage-explainer.en.srt"), srt);
console.log("wrote out/seopage-explainer.en.srt");
if (gaps) process.exitCode = 1;
