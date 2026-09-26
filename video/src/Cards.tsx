import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { DISPLAY, MONO, SANS } from "./lib/fonts";

/**
 * Social cards (og:image, 1200×630) for rank¹ articles. Shown around 500px
 * wide in feeds, and some apps crop the edges, so the words sit well inside
 * the frame and stay few enough to read at that size.
 */

const INK = "#04060B";
const H: CSSProperties = { fontFamily: DISPLAY, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.95, color: "#EEF2FF" };

/** "rank¹", as components/rank/parts.tsx draws it. */
function Rank({ size }: { size: number }) {
  return (
    <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: size, letterSpacing: "-0.05em", lineHeight: 1, color: "#EEF2FF", display: "inline-flex", alignItems: "flex-start" }}>
      rank
      <span style={{ marginLeft: "0.2em", marginTop: "0.07em", fontSize: "0.28em", height: "1.5em", minWidth: "1.5em", padding: "0 0.3em", borderRadius: "0.43em", background: "#3D6BFF", color: "white", display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: "normal" }}>1</span>
    </span>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <span style={{ fontFamily: MONO, fontSize: 19, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF8A7D" }}>{children}</span>;
}

function Frame({ src, style }: { src: string; style?: CSSProperties }) {
  return <Img src={staticFile(`site/rank/explainer-video/${src}`)} style={{ display: "block", borderRadius: 14, border: "1.5px solid rgba(255,255,255,.14)", boxShadow: "0 30px 60px -20px rgba(0,0,0,.8)", objectFit: "cover", ...style }} />;
}

/** A: the editorial card. The title does the work; three frames show it's about a made thing. */
export function CardEditorial() {
  return (
    <AbsoluteFill style={{ background: `radial-gradient(60% 70% at 85% 15%, rgba(61,107,255,.25), transparent 70%), ${INK}`, padding: "56px 64px", flexDirection: "row", gap: 44 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Rank size={44} />
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <Kicker>Case study · on ourselves</Kicker>
          <span style={{ ...H, fontSize: 68 }}>How we made our explainer video in code</span>
          <span style={{ fontFamily: SANS, fontSize: 24, color: "#A0A9C0" }}>Every decision, what broke, and what we don't know yet.</span>
        </div>
      </div>
      <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
        <Frame src="hook.jpg" style={{ width: 360, height: 162, transform: "rotate(-2deg)" }} />
        <Frame src="builder-score.jpg" style={{ width: 360, height: 162, transform: "rotate(1.5deg) translateX(-14px)" }} />
        <Frame src="thumbnail.jpg" style={{ width: 360, height: 162, transform: "rotate(-1deg)" }} />
      </div>
    </AbsoluteFill>
  );
}

/** B: the video card. One frame, a play button, and the promise: this is how it was made. */
export function CardVideo() {
  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden" }}>
      {/* Nora's still, not the YouTube thumbnail: its baked-in headline would fight this card's own. */}
      <Img src={staticFile("site/home/nora-surprised.webp")} style={{ position: "absolute", width: 1536 * 1.05, maxWidth: "none", left: 880 - 745 * 1.05, top: 250 - 330 * 1.05 }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(4,6,11,.96) 0%, rgba(4,6,11,.82) 38%, rgba(4,6,11,.05) 64%), linear-gradient(0deg, rgba(4,6,11,.8) 0%, transparent 35%)" }} />
      <div style={{ position: "absolute", left: 64, top: 52 }}><Rank size={40} /></div>
      <div style={{ position: "absolute", right: 64, top: 48, display: "flex", alignItems: "center", gap: 14, borderRadius: 999, background: "rgba(4,6,11,.75)", border: "1.5px solid rgba(255,255,255,.2)", padding: "12px 22px 12px 14px" }}>
        <span style={{ width: 40, height: 40, borderRadius: 999, background: "#3D6BFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="18" viewBox="0 0 16 18"><path d="M2 1.5v15L15 9z" fill="white" /></svg>
        </span>
        <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: "#EEF2FF" }}>Watch · 1:15</span>
      </div>
      <div style={{ position: "absolute", left: 64, bottom: 56, width: 560, display: "flex", flexDirection: "column", gap: 18 }}>
        <Kicker>Case study · on ourselves</Kicker>
        <span style={{ ...H, fontSize: 66 }}>How we made our explainer video in code</span>
      </div>
    </AbsoluteFill>
  );
}

/** C: the numbers card. The scale of the work, in four figures. */
export function CardNumbers() {
  const stats: [string, string][] = [
    ["75", "seconds"],
    ["86", "sound cues"],
    ["3", "cuts, one timeline"],
    ["5", "mistakes, all written up"],
  ];
  return (
    <AbsoluteFill style={{ background: `radial-gradient(55% 70% at 15% 100%, rgba(255,90,74,.16), transparent 70%), radial-gradient(60% 70% at 90% 0%, rgba(61,107,255,.22), transparent 70%), ${INK}`, padding: "56px 64px", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Rank size={40} />
        <Kicker>Case study · on ourselves</Kicker>
      </div>
      <span style={{ ...H, fontSize: 58, marginTop: 44, maxWidth: 1000 }}>How we made our explainer video in code</span>
      <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1.5px solid rgba(255,255,255,.14)", paddingTop: 28 }}>
        {stats.map(([n, l], i) => (
          <div key={l} style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: i ? 28 : 0, borderLeft: i ? "1.5px solid rgba(255,255,255,.14)" : undefined }}>
            <span style={{ ...H, fontSize: 84, color: i === 3 ? "#FF6B5C" : "#9DB4FF", fontVariantNumeric: "tabular-nums" }}>{n}</span>
            <span style={{ fontFamily: SANS, fontSize: 22, color: "#C9D0E2" }}>{l}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}
