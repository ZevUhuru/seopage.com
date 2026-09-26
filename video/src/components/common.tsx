import type { CSSProperties } from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { DISPLAY, SANS } from "../lib/fonts";
import { prog, useT } from "../lib/motion";

/** The seopage¹ wordmark, as components/Logo.tsx draws it. */
export function Logo({ size, color = "#EEF2FF", chip = 1, style }: { size: number; color?: string; chip?: number; style?: CSSProperties }) {
  return (
    <span style={{ fontFamily: DISPLAY, fontSize: size, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color, display: "inline-flex", alignItems: "flex-start", ...style }}>
      seopage
      <span
        style={{
          marginLeft: "0.29em",
          marginTop: "0.07em",
          fontSize: "0.28em",
          height: "1.5em",
          minWidth: "1.5em",
          borderRadius: "0.43em",
          background: "#3D6BFF",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "normal",
          transform: `scale(${chip})`,
        }}
      >
        1
      </span>
    </span>
  );
}

/** The citation chip alone: the mark AI answers put next to a source. */
export function Cite({ size, style }: { size: number; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size * 0.29,
        background: "#3D6BFF",
        color: "white",
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: size * 0.62,
        lineHeight: 1,
        ...style,
      }}
    >
      1
    </span>
  );
}

/** A full-bleed Nora clip with a slow push-in. Clips are 5.04s, 24fps, silent. */
export function NoraClip({ name, rate = 0.8, from = 1, to = 1.08, originX = 50, originY = 45, shiftX = 0 }: { name: string; rate?: number; from?: number; to?: number; originX?: number; originY?: number; shiftX?: number }) {
  const t = useT();
  const z = from + (to - from) * Math.min(1, t / (5.04 / rate));
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#04060B" }}>
      <OffthreadVideo
        src={staticFile(`site/home/${name}.mp4`)}
        muted
        playbackRate={rate}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `translateX(${shiftX}%) scale(${z})`, transformOrigin: `${originX}% ${originY}%` }}
      />
    </AbsoluteFill>
  );
}

/** Nora is an illustration and the video says so wherever she appears. */
export function IllustrationTag({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  // Vertical feeds cover the bottom of the frame with their own UI, so the label moves up top.
  const at = vertical ? { right: 70, top: 290 } : { right: 64, bottom: 52 };
  return (
    <div style={{ position: "absolute", ...at, fontFamily: SANS, fontSize: 22, color: "rgba(238,242,255,.72)", opacity: prog(t, 0.3, 0.5), letterSpacing: "0.01em" }}>
      Nora is an illustration, not a customer.
    </div>
  );
}

/** The homepage's dark ground with an optional colored bloom. */
export function Ground({ bloom = "rgba(61,107,255,.16)", at = "80% 10%" }: { bloom?: string; at?: string }) {
  return <AbsoluteFill style={{ background: `radial-gradient(60% 70% at ${at}, ${bloom}, transparent 70%), #04060B` }} />;
}

/** Film grain and a soft vignette over everything, so flat UI sits in the same world as the clay shots. */
export function Finish() {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(120% 90% at 50% 50%, transparent 60%, rgba(0,0,0,.35) 100%)" }} />
  );
}
