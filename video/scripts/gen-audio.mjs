// Generates every sound in src/cues.json with ElevenLabs into public/audio,
// and records each file's length (manifest.json) and how it was made
// (provenance.json). Files whose inputs haven't changed are skipped.
//
//   npm run audio                      generate whatever is missing or changed
//   npm run audio -- --only vo03,riser regenerate just these ids
//   npm run audio -- --voices          list the account's voices
//   npm run audio -- --audition <id>   render vo01 with a voice, to out/audition-<id>.mp3
//
// The key comes from ELEVENLABS_API_KEY, or video/.env.local (gitignored).
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public/audio");
const cues = JSON.parse(readFileSync(join(root, "src/cues.json"), "utf8"));
const manifestPath = join(dir, "manifest.json");
const provPath = join(dir, "provenance.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const provenance = existsSync(provPath) ? JSON.parse(readFileSync(provPath, "utf8")) : {};

function apiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;
  const env = join(root, ".env.local");
  if (existsSync(env)) {
    const line = readFileSync(env, "utf8").split("\n").find((l) => l.startsWith("ELEVENLABS_API_KEY="));
    if (line) return line.slice("ELEVENLABS_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
  }
  console.error("No ElevenLabs key. Set ELEVENLABS_API_KEY or add it to video/.env.local (a key starts with sk_).");
  process.exit(1);
}
const KEY = apiKey();
const API = "https://api.elevenlabs.io";

async function call(path, { method = "POST", body } = {}) {
  const res = await fetch(API + path, { method, headers: { "xi-api-key": KEY, "content-type": "application/json" }, body: body && JSON.stringify(body) });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`);
  return res;
}

function seconds(file) {
  const out = execFileSync("npx", ["remotion", "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  return Math.round(Number(out.trim()) * 1000) / 1000;
}

const hash = (x) => createHash("sha256").update(JSON.stringify(x)).digest("hex").slice(0, 12);
const args = process.argv.slice(2);

if (args[0] === "--voices") {
  const { voices } = await (await call("/v2/voices?page_size=100", { method: "GET" })).json();
  for (const v of voices) console.log(`${v.voice_id}  ${v.name.padEnd(28)} ${[v.labels?.gender, v.labels?.age, v.labels?.accent, v.labels?.descriptive ?? v.labels?.description].filter(Boolean).join(", ")}`);
  process.exit(0);
}

async function tts(voiceId, text) {
  const res = await call(`/v1/text-to-speech/${voiceId}?output_format=mp3_44100_192`, { body: { text, model_id: cues.voice.model, voice_settings: cues.voice.settings } });
  return { buf: Buffer.from(await res.arrayBuffer()), requestId: res.headers.get("request-id") };
}

if (args[0] === "--audition") {
  mkdirSync(join(root, "out"), { recursive: true });
  const { buf } = await tts(args[1], cues.vo[0].text + " " + cues.vo[6].text);
  const out = join(root, `out/audition-${args[1]}.mp3`);
  writeFileSync(out, buf);
  console.log(out);
  process.exit(0);
}

const only = args[0] === "--only" ? new Set(args[1].split(",")) : null;

// Every job: an id, the inputs that define it, and how to make it.
const jobs = [
  ...cues.vo.map((v) => ({
    id: v.id,
    kind: "voice",
    inputs: { text: v.text, voiceId: cues.voice.voiceId, model: cues.voice.model, settings: cues.voice.settings },
    make: () => tts(cues.voice.voiceId, v.text),
  })),
  ...Object.entries(cues.sfx).map(([id, x]) => ({
    id,
    kind: "sfx",
    inputs: { text: x.prompt, duration_seconds: Math.max(0.5, x.sec), loop: Boolean(x.loop), prompt_influence: 0.45 },
    async make() {
      const res = await call("/v1/sound-generation?output_format=mp3_44100_192", { body: { text: x.prompt, duration_seconds: Math.max(0.5, x.sec), loop: Boolean(x.loop), prompt_influence: 0.45, model_id: "eleven_text_to_sound_v2" } });
      return { buf: Buffer.from(await res.arrayBuffer()), requestId: res.headers.get("request-id") };
    },
  })),
  {
    id: cues.music.id,
    kind: "music",
    inputs: { prompt: cues.music.prompt, ms: cues.music.lengthSec * 1000, model: cues.music.model },
    async make() {
      const res = await call("/v1/music?output_format=mp3_48000_192", { body: { prompt: cues.music.prompt, music_length_ms: cues.music.lengthSec * 1000, model_id: cues.music.model, force_instrumental: true } });
      return { buf: Buffer.from(await res.arrayBuffer()), requestId: res.headers.get("request-id") };
    },
  },
];

mkdirSync(dir, { recursive: true });
let made = 0;
for (const job of jobs) {
  const h = hash(job.inputs);
  const file = `${job.id}.mp3`;
  const current = manifest[job.id]?.hash === h && existsSync(join(dir, file));
  if (only ? !only.has(job.id) : current) continue;
  process.stdout.write(`${job.kind.padEnd(6)} ${job.id} … `);
  try {
    const { buf, requestId } = await job.make();
    writeFileSync(join(dir, file), buf);
    const sec = seconds(join(dir, file));
    manifest[job.id] = { file, sec, hash: h };
    provenance[job.id] = { kind: job.kind, provider: "elevenlabs", ...job.inputs, requestId, generatedAt: new Date().toISOString() };
    // Save as we go so a failure halfway keeps what was already paid for.
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
    writeFileSync(provPath, JSON.stringify(provenance, null, 2) + "\n");
    made++;
    console.log(`${sec}s`);
  } catch (e) {
    console.log("FAILED");
    console.error(String(e.message).slice(0, 400));
    process.exitCode = 1;
  }
}
console.log(`${made} generated, ${jobs.length - made} unchanged.`);

// A voice line longer than its slot runs into the next beat; say so.
for (const v of cues.vo) {
  const sec = manifest[v.id]?.sec;
  if (sec && sec > v.slot + 0.15) console.warn(`! ${v.id} runs ${sec}s in a ${v.slot}s slot (${(sec - v.slot).toFixed(2)}s over)`);
}
