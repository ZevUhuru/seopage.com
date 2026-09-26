import { Audio, interpolate, Sequence, staticFile } from "remotion";
import cues from "./cues.json";
import manifest from "../public/audio/manifest.json";
import { FPS, s } from "./lib/brand";

type Entry = { file: string; sec: number; leveled?: string };
const files = manifest as Record<string, Entry>;

/**
 * Plays each file's leveled copy (scripts/levels.mjs --write), already brought
 * toward the voice's loudness, so every `vol` in cues.json reads as "relative
 * to the voice" and no volume here exceeds 1. MASTER leaves headroom for the
 * final loudnorm pass in scripts/render.mjs.
 */
const MASTER = 0.7;
const src = (id: string) => staticFile(`audio/${files[id].leveled ?? files[id].file}`);

/** Music level on its own (−6 dB under the voice), and under the voice (about −18 dB). */
const MUSIC = 0.5;
const DUCKED = 0.13;
const RAMP = 0.18;

/** Seconds [start, end] of each voice line, using its real length once generated. */
export function voiceSpans(offset = 0) {
  return cues.vo.map((v) => [v.at - offset, v.at - offset + (files[v.id]?.sec ?? v.slot)] as const);
}

/** Music volume at time t: full, dipping under every voice line with short ramps. */
function musicLevel(t: number, spans: readonly (readonly [number, number])[]) {
  let v = MUSIC;
  for (const [a, b] of spans) {
    const d = interpolate(t, [a - RAMP, a, b, b + RAMP * 2], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    v = Math.min(v, MUSIC - (MUSIC - DUCKED) * d);
  }
  // Fade the score in over the first half second and out over the last second.
  return v * interpolate(t, [0, 0.5, cues.durationSec - 1, cues.durationSec], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

/**
 * The whole soundtrack of the master, from src/cues.json. Anything not yet
 * generated (no entry in public/audio/manifest.json) is skipped, so the
 * picture renders before the sound exists. `window` renders a slice of the
 * master, for the cutdowns: [start, end] seconds on the master timeline.
 */
export function Soundtrack({ window = [0, cues.durationSec] as [number, number], music = true }: { window?: [number, number]; music?: boolean }) {
  const [w0, w1] = window;
  const spans = voiceSpans(w0);
  const inWin = (a: number, b: number) => b > w0 && a < w1;
  return (
    <>
      {music && files[cues.music.id] && (
        <Audio src={src(cues.music.id)} trimBefore={s(w0)} volume={(f) => MASTER * musicLevel(f / FPS, spans)} />
      )}
      {cues.vo.filter((v) => files[v.id] && inWin(v.at, v.at + files[v.id].sec)).map((v) => (
        <Sequence key={v.id} from={s(v.at - w0)} name={v.id}>
          <Audio src={src(v.id)} volume={MASTER} />
        </Sequence>
      ))}
      {cues.hits.map((h, i) => {
        const e = files[h.sfx];
        const def = (cues.sfx as Record<string, { loop?: boolean }>)[h.sfx];
        if (!e) return null;
        const until = "until" in h && h.until ? h.until : h.at + e.sec / ("rate" in h && h.rate ? h.rate : 1);
        if (!inWin(h.at, until)) return null;
        const len = until - h.at;
        return (
          <Sequence key={i} from={s(h.at - w0)} durationInFrames={Math.max(1, s(len))} name={`${h.sfx}@${h.at}`}>
            <Audio
              src={src(h.sfx)}
              loop={Boolean(def?.loop)}
              playbackRate={"rate" in h && h.rate ? h.rate : 1}
              // Beds (with `until`) fade at both ends so they never click in or out.
              volume={(f) => MASTER * h.vol * ("until" in h ? interpolate(f / FPS, [0, 0.3, len - 0.4, len], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1)}
            />
          </Sequence>
        );
      })}
    </>
  );
}
