import { AbsoluteFill } from "remotion";
import { Cite, Ground, IllustrationTag, NoraClip } from "../components/common";
import { DISPLAY, SANS } from "../lib/fonts";
import { prog, rise, useT, Words } from "../lib/motion";

const H = { fontFamily: DISPLAY, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: "#EEF2FF" } as const;

/** 0:05–0:11. Meet Nora: great at her job, invisible to AI. */
export function MeetNora({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  return (
    <AbsoluteFill>
      <NoraClip name="nora-surprised" rate={0.8} from={1.04} to={1.14} originX={52} originY={35} shiftX={vertical ? 0 : 9} />
      <AbsoluteFill style={{ background: vertical ? "linear-gradient(0deg, rgba(4,6,11,.95) 0%, rgba(4,6,11,.6) 38%, transparent 62%)" : "linear-gradient(90deg, rgba(4,6,11,.94) 0%, rgba(4,6,11,.7) 30%, rgba(4,6,11,0) 58%)" }} />
      <div style={{ position: "absolute", left: vertical ? 70 : 110, right: vertical ? 70 : undefined, bottom: vertical ? 560 : 150, display: "flex", flexDirection: "column", gap: 20 }}>
        <Words text="Meet Nora." at={0.45} style={{ ...H, fontSize: vertical ? 110 : 112 }} />
        <span style={{ fontFamily: SANS, fontSize: vertical ? 44 : 40, color: "#C9D0E2", ...rise(t, 1.2) }}>Master plumber, twelve years in.</span>
        <div style={{ height: 30 }} />
        <Words text="Great at her job." at={2.9} style={{ ...H, fontSize: vertical ? 80 : 72 }} />
        <span style={{ ...H, fontSize: vertical ? 80 : 72, color: "#FF6B5C", ...rise(t, 4.05), display: "inline-flex", alignItems: "flex-start", gap: 14 }}>
          Invisible to AI.
          <Cite size={vertical ? 34 : 30} style={{ background: "#2a3042", color: "#7D869C", opacity: prog(t, 4.5, 0.4), marginTop: 6 }} />
        </span>
      </div>
      <IllustrationTag vertical={vertical} />
    </AbsoluteFill>
  );
}

/** 0:11–0:18. The market moved to AI, and the click follows the citation. */
export function TheTurn({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  const n = Math.round(45 * prog(t, 0.4, 1.5));
  const out = prog(t, 3.6, 0.5);
  const chip = prog(t, 5.65, 0.45);
  // At 6.55 the chip grows until its blue fills the frame: the cut into Nora's evening.
  const through = prog(t, 6.5, 0.6, (x) => x * x * x);
  return (
    <AbsoluteFill>
      <Ground bloom="rgba(255,90,74,.12)" at="20% 30%" />
      <AbsoluteFill style={{ opacity: prog(t, 3.6, 0.9) }}>
        <Ground bloom="rgba(61,107,255,.22)" at="75% 20%" />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", padding: vertical ? "0 70px" : "0 150px", opacity: 1 - out, transform: `translateY(${-60 * out}px)` }}>
        <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: vertical ? "flex-start" : "center", gap: vertical ? 20 : 70 }}>
          <span style={{ ...H, fontSize: vertical ? 300 : 340, color: "#FF6B5C", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.05em" }}>{n}%</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 820 }}>
            <Words text="of US consumers now use AI to find a local business." at={0.9} gap={0.05} style={{ ...H, fontSize: vertical ? 64 : 62, lineHeight: 1.05 }} />
            <span style={{ fontFamily: SANS, fontSize: 36, color: "#A0A9C0", ...rise(t, 2.1) }}>A year earlier, it was 6%.</span>
            <span style={{ fontFamily: SANS, fontSize: 24, color: "#7D869C", ...rise(t, 2.5) }}>Source: BrightLocal, 2026</span>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", padding: vertical ? "0 70px" : "0 150px" }}>
        {t >= 3.9 && (
          <div style={{ ...H, fontSize: vertical ? 104 : 118, lineHeight: 1.02, maxWidth: 1500 }}>
            <Words text="The click goes to whoever the answer" at={4.0} gap={0.06} />
            <span style={{ display: "inline-flex", alignItems: "flex-start", ...rise(t, 4.45) }}>
              names.
              <span style={{ position: "relative", marginLeft: 16, marginTop: 8, transform: `scale(${0.3 + 0.7 * chip + 60 * through})`, opacity: chip, transformOrigin: "50% 50%" }}>
                <span style={{ position: "absolute", inset: -30, borderRadius: 40, background: "radial-gradient(circle, rgba(61,107,255,.55), transparent 70%)", opacity: 1 - through }} />
                <Cite size={vertical ? 58 : 64} style={{ position: "relative", boxShadow: "0 0 60px rgba(61,107,255,.8)" }} />
              </span>
            </span>
            <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 30, letterSpacing: 0, color: "#9DB4FF", marginTop: 34, ...rise(t, 5.0) }}>
              Brands cited in an AI Overview get 120% more clicks. <span style={{ color: "#7D869C" }}>Seer Interactive, 2026</span>
            </div>
          </div>
        )}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#3D6BFF", opacity: prog(t, 6.75, 0.3) }} />
    </AbsoluteFill>
  );
}

/** 0:18–0:21. So Nora built the page AI could quote; the camera dives into her laptop. */
export function NoraBuilds({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  const dive = prog(t, 2.35, 0.9, (x) => x * x);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${1 + 1.6 * dive})`, transformOrigin: "70% 58%" }}>
        <NoraClip name="nora-typing" rate={0.85} from={1} to={1.06} originX={70} originY={58} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: vertical ? "linear-gradient(0deg, rgba(4,6,11,.9) 0%, transparent 50%)" : "linear-gradient(90deg, rgba(4,6,11,.88) 0%, rgba(4,6,11,.45) 38%, transparent 60%)", opacity: 1 - dive }} />
      <div style={{ position: "absolute", left: vertical ? 70 : 110, right: vertical ? 70 : undefined, bottom: vertical ? 560 : 150, maxWidth: 820, opacity: 1 - dive }}>
        <Words text="So Nora built the page AI could quote." at={0.3} gap={0.06} style={{ ...H, fontSize: vertical ? 92 : 96, lineHeight: 1.02 }} />
      </div>
      <div style={{ opacity: 1 - dive }}>
        <IllustrationTag vertical={vertical} />
      </div>
      <AbsoluteFill style={{ background: "#3D6BFF", opacity: 1 - prog(t, 0, 0.45) }} />
      <AbsoluteFill style={{ background: "#0A0F1E", opacity: prog(t, 2.8, 0.45) }} />
    </AbsoluteFill>
  );
}
