import type { ComponentType } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Captions } from "./Captions";
import { Finish } from "./components/common";
import { s } from "./lib/brand";
import { Envelope } from "./lib/motion";
import { Builder } from "./scenes/Builder";
import { EndCard, Offer, Proof, TheCall } from "./scenes/Close";
import { Hook } from "./scenes/Hook";
import { MeetNora, NoraBuilds, TheTurn } from "./scenes/Nora";
import { Soundtrack } from "./Soundtrack";

type Scene = { id: string; at: number; dur: number; C: ComponentType<{ vertical?: boolean }>; fadeIn?: number; fadeOut?: number };

/**
 * The 75-second master, one row per beat. `at` is where the scene's own
 * clock starts on the master; each scene overlaps the next by its fade, and
 * every sound cue in cues.json is written against these same seconds.
 */
export const SCENES: Scene[] = [
  { id: "hook", at: 0, dur: 5.4, C: Hook, fadeIn: 0, fadeOut: 0.4 },
  { id: "meet-nora", at: 5.0, dur: 6.3, C: MeetNora },
  { id: "the-turn", at: 10.9, dur: 7.1, C: TheTurn, fadeOut: 0 },
  { id: "nora-builds", at: 17.9, dur: 3.4, C: NoraBuilds, fadeIn: 0, fadeOut: 0 },
  { id: "builder", at: 21.0, dur: 29.3, C: Builder, fadeIn: 0, fadeOut: 0 },
  { id: "proof", at: 50.0, dur: 8.4, C: Proof },
  { id: "the-call", at: 58.0, dur: 6.4, C: TheCall },
  { id: "offer", at: 64.0, dur: 5.9, C: Offer },
  { id: "end-card", at: 69.5, dur: 5.5, C: EndCard, fadeOut: 0 },
];

/** The master, in 16:9 or laid out again for 9:16 feeds (same timeline, same sound). */
export function Master({ captions = false, vertical = false }: { captions?: boolean; vertical?: boolean }) {
  return (
    <AbsoluteFill style={{ background: "#04060B" }}>
      {SCENES.map(({ id, at, dur, C, fadeIn = 0.4, fadeOut = 0.4 }) => (
        <Sequence key={id} name={id} from={s(at)} durationInFrames={s(dur)}>
          <Envelope dur={dur} fadeIn={fadeIn} fadeOut={fadeOut}>
            <C vertical={vertical} />
          </Envelope>
        </Sequence>
      ))}
      <Finish />
      {captions && <Captions vertical={vertical} />}
      <Soundtrack />
    </AbsoluteFill>
  );
}
