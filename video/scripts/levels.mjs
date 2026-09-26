// Loudness (LUFS) and true peak of every generated file, flagging near-silent or
// clipped ones. Uses loudnorm's measurement pass: the only level meter in
// Remotion's bundled ffmpeg.
//
//   node scripts/levels.mjs            report
//   node scripts/levels.mjs --write    also write a leveled copy of each file to
//                                      public/audio/lev/ and point the manifest at it
//
// Generated files arrive anywhere from −3 to −45 LUFS. Each leveled copy is a
// plain gain change toward REF LUFS (the voice's level), limited so it never
// boosts more than MAX_BOOST dB or pushes true peak above −1 dBTP. After that,
// every `vol` in cues.json reads as "relative to the voice", and no volume in
// the mix has to go above 1.
import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

// The voice lines share one gain (the most any line can take without passing
// −1 dBTP), so the read keeps its own line-to-line consistency. REF is where
// that leaves the voice; every other sound is leveled to it.
const REF = -22;
const MAX_BOOST = 18;
const write = process.argv.includes("--write");
const dir = "public/audio";
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, "utf8"));
const ff = (args) => spawnSync("npx", ["remotion", "ffmpeg", "-hide_banner", "-y", ...args], { encoding: "utf8" }).stderr;
const isVoice = (id) => /^vo\d+$/.test(id);
const round = (x) => Math.round(x * 100) / 100;

const rows = readdirSync(dir).filter((x) => x.endsWith(".mp3")).sort().map((f) => {
  const log = ff(["-i", `${dir}/${f}`, "-vn", "-af", "loudnorm=print_format=json", "-f", "null", "-"]);
  const m = JSON.parse(log.slice(log.lastIndexOf("{"), log.lastIndexOf("}") + 1));
  return { f, id: f.replace(/\.mp3$/, ""), i: Number(m.input_i), tp: Number(m.input_tp) };
});
const voiceGain = Math.min(...rows.filter((r) => isVoice(r.id)).map((r) => -1 - r.tp));

if (write) mkdirSync(`${dir}/lev`, { recursive: true });
for (const { f, id, i, tp } of rows) {
  const gain = round(isVoice(id) ? voiceGain : Math.min(MAX_BOOST, REF - i, -1 - tp));
  const flag = !(i > -40) ? "  <-- very quiet" : tp > -0.1 ? "  <-- peaks at full scale" : "";
  console.log(`${f.padEnd(22)} ${String(i).padStart(7)} LUFS  ${String(tp).padStart(6)} dBTP  gain ${String(gain).padStart(6)} dB  → ${round(i + gain)} LUFS${flag}`);
  if (write && manifest[id]) {
    ff(["-i", `${dir}/${f}`, "-vn", "-af", `volume=${gain}dB`, "-c:a", "libmp3lame", "-b:a", "192k", `${dir}/lev/${f}`]);
    Object.assign(manifest[id], { lufs: i, truePeak: tp, gainDb: gain, leveled: `lev/${f}` });
  }
}
if (write) writeFileSync(`${dir}/manifest.json`, JSON.stringify(manifest, null, 2) + "\n");
