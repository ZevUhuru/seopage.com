// Voice candidates, so the voice can be chosen by ear without calling ElevenLabs again.
//
//   node scripts/voice-set.mjs --make <voiceId> [<voiceId> …]  every vo line, per voice → public/audio/voices/<voiceId>/
//   node scripts/voice-set.mjs --use <voiceId>                  make that set the video's voice (no API call)
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const audio = join(root, "public/audio");
const cuesPath = join(root, "src/cues.json");
const cues = JSON.parse(readFileSync(cuesPath, "utf8"));
const [mode, ...voices] = process.argv.slice(2);
// Same inputs and hash as gen-audio.mjs, so a used set counts as up to date there.
const inputs = (v, voiceId) => ({ text: v.text, voiceId, model: cues.voice.model, settings: cues.voice.settings });
const hash = (x) => createHash("sha256").update(JSON.stringify(x)).digest("hex").slice(0, 12);
const seconds = (f) => Math.round(Number(execFileSync("npx", ["remotion", "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim()) * 1000) / 1000;

if (mode === "--make") {
  const env = readFileSync(join(root, ".env.local"), "utf8");
  const KEY = process.env.ELEVENLABS_API_KEY || env.match(/ELEVENLABS_API_KEY=(\S+)/)[1];
  await Promise.all(
    voices.map(async (voiceId) => {
      const dir = join(audio, "voices", voiceId);
      mkdirSync(dir, { recursive: true });
      const set = {};
      for (const v of cues.vo) {
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_192`, {
          method: "POST",
          headers: { "xi-api-key": KEY, "content-type": "application/json" },
          body: JSON.stringify({ text: v.text, model_id: cues.voice.model, voice_settings: cues.voice.settings }),
        });
        if (!res.ok) throw new Error(`${voiceId} ${v.id}: ${res.status} ${await res.text()}`);
        const file = join(dir, `${v.id}.mp3`);
        writeFileSync(file, Buffer.from(await res.arrayBuffer()));
        set[v.id] = { sec: seconds(file), requestId: res.headers.get("request-id"), generatedAt: new Date().toISOString() };
      }
      writeFileSync(join(dir, "set.json"), JSON.stringify(set, null, 2) + "\n");
      const over = cues.vo.filter((v) => set[v.id].sec > v.slot + 0.15).map((v) => `${v.id} +${(set[v.id].sec - v.slot).toFixed(2)}s`);
      console.log(`${voiceId}: ${cues.vo.length} lines, ${Object.values(set).reduce((n, x) => n + x.sec, 0).toFixed(1)}s total${over.length ? `; over slot: ${over.join(", ")}` : ""}`);
    }),
  );
} else if (mode === "--use") {
  const voiceId = voices[0];
  const dir = join(audio, "voices", voiceId);
  const set = JSON.parse(readFileSync(join(dir, "set.json"), "utf8"));
  const manifest = JSON.parse(readFileSync(join(audio, "manifest.json"), "utf8"));
  const provPath = join(audio, "provenance.json");
  const prov = existsSync(provPath) ? JSON.parse(readFileSync(provPath, "utf8")) : {};
  for (const v of cues.vo) {
    copyFileSync(join(dir, `${v.id}.mp3`), join(audio, `${v.id}.mp3`));
    manifest[v.id] = { file: `${v.id}.mp3`, sec: set[v.id].sec, hash: hash(inputs(v, voiceId)) };
    prov[v.id] = { kind: "voice", provider: "elevenlabs", ...inputs(v, voiceId), requestId: set[v.id].requestId, generatedAt: set[v.id].generatedAt };
  }
  cues.voice.voiceId = voiceId;
  writeFileSync(cuesPath, JSON.stringify(cues, null, 2) + "\n");
  writeFileSync(join(audio, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  writeFileSync(provPath, JSON.stringify(prov, null, 2) + "\n");
  console.log(`voice is now ${voiceId}`);
} else {
  console.error("usage: --make <voiceId…> | --use <voiceId>");
  process.exit(1);
}
