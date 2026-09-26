import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Cite } from "./components/common";
import { DISPLAY, SANS } from "./lib/fonts";

/**
 * YouTube thumbnail prototypes, 1920×1080. Built to read at feed size
 * (~170px wide on a phone): one face, one idea, three or four words. The
 * bottom-right corner stays empty because YouTube puts the duration there.
 */

const HEAD: CSSProperties = { fontFamily: DISPLAY, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.9, color: "#EEF2FF" };

/** A Nora still (1536×1024) scaled so the point (fx, fy) of the image lands at (x, y) on the canvas. */
function Nora({ name, scale, fx, fy, x, y, style }: { name: string; scale: number; fx: number; fy: number; x: number; y: number; style?: CSSProperties }) {
  return (
    <Img
      src={staticFile(`site/home/${name}.webp`)}
      style={{ position: "absolute", width: 1536 * scale, height: 1024 * scale, left: x - fx * scale, top: y - fy * scale, maxWidth: "none", ...style }}
    />
  );
}

function Stroke({ children }: { children: ReactNode }) {
  // A dark halo keeps white type legible over any part of the image.
  return <span style={{ textShadow: "0 6px 30px rgba(0,0,0,.65), 0 2px 6px rgba(0,0,0,.5)" }}>{children}</span>;
}

/** A: the alarm. Her shock, and the answer that names someone else. Matches the video's first five seconds. */
export function ThumbAlarm() {
  return (
    <AbsoluteFill style={{ background: "#04060B", overflow: "hidden" }}>
      <Nora name="nora-surprised" scale={1.75} fx={745} fy={330} x={1390} y={430} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, #04060B 0%, rgba(4,6,11,.92) 34%, rgba(4,6,11,.25) 58%, transparent 72%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(40% 50% at 18% 80%, rgba(255,90,74,.28), transparent 70%)" }} />
      <div style={{ position: "absolute", left: 90, top: 80, ...HEAD, fontSize: 196 }}>
        <Stroke>AI picked</Stroke>
        <br />
        <span style={{ color: "#FF5A4A" }}><Stroke>THEM.</Stroke></span>
      </div>
      <div style={{ position: "absolute", left: 90, top: 560, width: 820, transform: "rotate(-2.5deg)", borderRadius: 34, background: "#0E1422", border: "2px solid rgba(255,255,255,.12)", padding: "34px 40px", boxShadow: "0 40px 80px -20px rgba(0,0,0,.8)", fontFamily: SANS, display: "flex", flexDirection: "column", gap: 22 }}>
        <span style={{ alignSelf: "flex-end", background: "#3D6BFF", color: "white", borderRadius: "26px 26px 8px 26px", padding: "14px 24px", fontSize: 40, fontWeight: 600 }}>Best plumber near me?</span>
        <span style={{ fontSize: 44, lineHeight: 1.3, color: "#DCE2F2" }}>
          Most people recommend{" "}
          <span style={{ background: "rgba(255,90,74,.3)", color: "#FFB3AA", fontWeight: 700, borderRadius: 10, padding: "0 10px" }}>the shop across the street</span>
        </span>
      </div>
    </AbsoluteFill>
  );
}

/** B: the outcome. Her smile on the call, and the promise in four words. */
export function ThumbCited() {
  return (
    <AbsoluteFill style={{ background: "#04060B", overflow: "hidden" }}>
      <Nora name="nora-call" scale={1.85} fx={775} fy={215} x={1400} y={400} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, #04060B 0%, rgba(4,6,11,.9) 36%, rgba(4,6,11,.2) 60%, transparent 74%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(45% 55% at 20% 40%, rgba(61,107,255,.35), transparent 70%)" }} />
      <div style={{ position: "absolute", left: 90, top: 110, ...HEAD, fontSize: 176 }}>
        <Stroke>Get named</Stroke>
        <br />
        <Stroke>by </Stroke>
        <span style={{ color: "#9DB4FF" }}><Stroke>ChatGPT</Stroke></span>
        <Cite size={96} style={{ marginLeft: 18, verticalAlign: "0.62em", boxShadow: "0 0 70px rgba(61,107,255,.95)" }} />
      </div>
      <div style={{ position: "absolute", left: 90, top: 560, width: 800, borderRadius: 34, background: "rgba(14,20,34,.92)", border: "2px solid rgba(61,107,255,.45)", padding: "32px 40px", fontFamily: SANS, fontSize: 44, lineHeight: 1.3, color: "#DCE2F2", boxShadow: "0 40px 80px -20px rgba(61,107,255,.5)" }}>
        The one most people recommend is{" "}
        <b style={{ color: "#fff" }}>Lind Plumbing</b>
        <Cite size={40} style={{ marginLeft: 8, verticalAlign: "0.5em" }} />
      </div>
    </AbsoluteFill>
  );
}

/** C: before and after. Waiting by a silent phone, then on the call. */
export function ThumbSplit() {
  const small: CSSProperties = { fontSize: 64, letterSpacing: "-0.03em", marginTop: 14 };
  return (
    <AbsoluteFill style={{ background: "#04060B", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)" }}>
        <Nora name="nora-waiting" scale={1.75} fx={600} fy={300} x={450} y={520} style={{ filter: "grayscale(1) brightness(.62) contrast(1.1)" }} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(4,6,11,.75) 0%, transparent 40%)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(55% 0, 100% 0, 100% 100%, 45% 100%)" }}>
        <Nora name="nora-call" scale={2.0} fx={775} fy={215} x={1470} y={420} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(4,6,11,.7) 0%, transparent 40%), radial-gradient(40% 50% at 78% 20%, rgba(61,107,255,.35), transparent 70%)" }} />
      </div>
      {/* the seam */}
      <div style={{ position: "absolute", left: "45%", top: 0, width: "10%", height: "100%", background: "linear-gradient(90deg, transparent 49.4%, #3D6BFF 49.6%, #3D6BFF 50.4%, transparent 50.6%)", transform: "skewX(-5.7deg)" }} />
      <div style={{ position: "absolute", left: 960 - 78, top: 540 - 78, width: 156, height: 156, borderRadius: 999, background: "#3D6BFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 10px rgba(4,6,11,.8), 0 20px 50px rgba(61,107,255,.7)" }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </div>
      <div style={{ position: "absolute", left: 70, top: 70, ...HEAD, fontSize: 150, color: "#C9D0E2", display: "flex", flexDirection: "column" }}>
        <Stroke>Invisible</Stroke>
        <span style={{ ...small, color: "#FF8A7D" }}><Stroke>to AI</Stroke></span>
      </div>
      <div style={{ position: "absolute", right: 70, top: 70, ...HEAD, fontSize: 150, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <span style={{ display: "flex", alignItems: "flex-start" }}>
          <Stroke>Cited</Stroke>
          <Cite size={84} style={{ marginLeft: 14, marginTop: 10, boxShadow: "0 0 60px rgba(61,107,255,.95)" }} />
        </span>
        <span style={{ ...small, color: "#9DB4FF" }}><Stroke>by AI</Stroke></span>
      </div>
    </AbsoluteFill>
  );
}
