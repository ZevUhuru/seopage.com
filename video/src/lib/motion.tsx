import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FPS } from "./brand";

/** The homepage's nh-pop curve, and a symmetric one for camera moves. */
export const EASE = Easing.bezier(0.2, 0.7, 0.2, 1);
export const GLIDE = Easing.bezier(0.65, 0, 0.35, 1);

/** Seconds since the start of the enclosing Sequence. */
export function useT() {
  return useCurrentFrame() / FPS;
}

/** 0 → 1 over [start, start + dur], eased and clamped. */
export function prog(t: number, start: number, dur: number, easing = EASE) {
  return interpolate(t, [start, start + dur], [0, 1], { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

/** The homepage's nh-pop: fade up 8px over 0.45s. */
export function pop(t: number, at: number, dy = 14, dur = 0.45): CSSProperties {
  const p = prog(t, at, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dy}px)` };
}

/** A blur-up word reveal for kinetic type. */
export function rise(t: number, at: number, dur = 0.55): CSSProperties {
  const p = prog(t, at, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * 28}px)`, filter: `blur(${(1 - p) * 10}px)` };
}

/** Characters typed so far, at `cps` characters per second from `start`. */
export function typed(text: string, t: number, start: number, cps = 12) {
  return text.slice(0, Math.max(0, Math.min(text.length, Math.floor((t - start) * cps))));
}

/** Piecewise track through [time, value] keys, gliding between each pair. */
export function track(t: number, keys: [number, number][], easing = GLIDE) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, v0] = keys[i - 1];
    const [t1, v1] = keys[i];
    if (t <= t1) return interpolate(t, [t0, t1], [v0, v1], { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  }
  return keys[keys.length - 1][1];
}

/** Words revealed one after another, each with a blur-up. */
export function Words({ text, at, gap = 0.07, className, style }: { text: string; at: number; gap?: number; className?: string; style?: CSSProperties }) {
  const t = useT();
  return (
    <span className={className} style={style}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre", ...rise(t, at + i * gap) }}>
          {w}
          {" "}
        </span>
      ))}
    </span>
  );
}

export type CamKey = { t: number; x: number; y: number; s: number };

/**
 * A virtual camera over a content plane of size w×h: at each key, the point
 * (x, y) of the content sits at the frame's center, scaled by s.
 */
export function Camera({ keys, w, h, children, style }: { keys: CamKey[]; w: number; h: number; children: ReactNode; style?: CSSProperties }) {
  const t = useT();
  const { width, height } = useVideoConfig();
  const x = track(t, keys.map((k) => [k.t, k.x]));
  const y = track(t, keys.map((k) => [k.t, k.y]));
  const sc = track(t, keys.map((k) => [k.t, k.s]));
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: w,
          height: h,
          transformOrigin: "0 0",
          transform: `translate(${width / 2 - x * sc}px, ${height / 2 - y * sc}px) scale(${sc})`,
          ...style,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
}

/** A macOS-style pointer that glides along a path and pulses on each click. */
export function Cursor({ path, clicks = [], scale = 1 }: { path: { t: number; x: number; y: number }[]; clicks?: number[]; scale?: number }) {
  const t = useT();
  if (t < path[0].t - 0.3) return null;
  const x = track(t, path.map((p) => [p.t, p.x]));
  const y = track(t, path.map((p) => [p.t, p.y]));
  const appear = prog(t, path[0].t - 0.3, 0.3);
  const last = [...clicks].reverse().find((c) => t >= c && t - c < 0.45);
  const press = last === undefined ? 1 : 1 - 0.18 * Math.sin(Math.min(1, (t - last) / 0.2) * Math.PI);
  const ring = last === undefined ? null : prog(t, last, 0.45);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 50, opacity: appear, pointerEvents: "none" }}>
      {ring !== null && (
        <span
          style={{
            position: "absolute",
            left: -22 * scale,
            top: -22 * scale,
            width: 44 * scale,
            height: 44 * scale,
            borderRadius: 999,
            border: `${2.5 * scale}px solid rgba(27,70,212,${0.7 * (1 - ring)})`,
            background: `rgba(61,107,255,${0.18 * (1 - ring)})`,
            transform: `scale(${0.4 + ring})`,
          }}
        />
      )}
      <svg width={26 * scale} height={32 * scale} viewBox="0 0 26 32" style={{ transform: `scale(${press})`, transformOrigin: "0 0", filter: "drop-shadow(0 3px 6px rgba(0,0,0,.35))" }}>
        <path d="M2 2 L2 25 L8 19.5 L12.2 29 L16.4 27.2 L12.3 17.8 L20.5 17.8 Z" fill="#0a0c11" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Scene envelope: fades (and slightly scales) in and out at its edges. */
export function Envelope({ dur, fadeIn = 0.35, fadeOut = 0.35, children, zoom = 0 }: { dur: number; fadeIn?: number; fadeOut?: number; zoom?: number; children: ReactNode }) {
  const t = useT();
  const a = Math.min(fadeIn ? prog(t, 0, fadeIn) : 1, fadeOut ? 1 - prog(t, dur - fadeOut, fadeOut) : 1);
  const z = 1 + zoom * (1 - prog(t, 0, fadeIn || 0.01));
  return <AbsoluteFill style={{ opacity: a, transform: `scale(${z})` }}>{children}</AbsoluteFill>;
}
