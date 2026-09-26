import { AbsoluteFill } from "remotion";
import { Ground } from "../components/common";
import { DEMO } from "../lib/brand";
import { DISPLAY, SANS } from "../lib/fonts";
import { pop, prog, typed, useT, Words } from "../lib/motion";

/**
 * 0:00–0:05. Someone asks an AI assistant who to hire; the answer names
 * someone else. The assistant is generic on purpose: no real product's UI.
 * The competitor is a placeholder, as on the homepage's alarm transcript.
 */
const Q = `who's the best plumber in ${DEMO.city.toLowerCase()}?`;
const A1 = "Most people recommend";
const NAME = "the shop down the street";
const A2 = ". Their page answers pricing and timing directly and lists the areas they serve.";

export function Hook({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  const sent = t >= 1.95;
  const q = sent ? "" : typed(Q, t, 0.25, 21);
  const words = (A1 + " ¶ " + A2).split(" ");
  const shown = Math.max(0, Math.floor((t - 2.4) * 22));
  const named = prog(t, 3.35, 0.5);
  const push = 1 + 0.06 * prog(t, 0, 5.2);

  const phone = (
    <div style={{ width: 470, height: 930, borderRadius: 68, background: "#161b27", padding: 14, boxShadow: "0 60px 120px -40px rgba(255,90,74,.35), 0 40px 80px -30px rgba(0,0,0,.9), inset 0 0 0 2px rgba(255,255,255,.08)" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 56, background: "#0b0f19", overflow: "hidden", fontFamily: SANS, color: "#EEF2FF" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "22px 34px 0", fontSize: 19, fontWeight: 600 }}>
          <span>9:41</span>
          <span style={{ width: 120, height: 34, borderRadius: 20, background: "#000", marginTop: -6 }} />
          <span style={{ opacity: 0.8 }}>●●●</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "26px 30px 18px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z" fill="#9DB4FF" /></svg>
          <span style={{ fontSize: 22, fontWeight: 600 }}>AI assistant</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "28px 26px" }}>
          {sent && (
            <div style={{ alignSelf: "flex-end", maxWidth: 330, background: "#3D6BFF", borderRadius: "24px 24px 6px 24px", padding: "16px 20px", fontSize: 23, lineHeight: 1.35, ...pop(t, 1.95, 16, 0.3) }}>
              {Q.charAt(0).toUpperCase() + Q.slice(1)}
            </div>
          )}
          {t >= 2.05 && t < 2.45 && (
            <div style={{ display: "flex", gap: 8, padding: "8px 4px" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 12, height: 12, borderRadius: 9, background: "#A0A9C0", opacity: 0.35 + 0.65 * Math.abs(Math.sin((t * 8) + i)) }} />
              ))}
            </div>
          )}
          {t >= 2.4 && (
            <div style={{ fontSize: 25, lineHeight: 1.5, color: "#DCE2F2" }}>
              {words.slice(0, shown).map((w, i) =>
                w === "¶" ? (
                  <span key={i} style={{ position: "relative", display: "inline-block", fontWeight: 700, color: named > 0 ? "#FFB3AA" : "#EEF2FF", marginRight: 6 }}>
                    <span style={{ position: "absolute", inset: "-2px -6px", borderRadius: 6, background: "rgba(255,90,74,.28)", transformOrigin: "left", transform: `scaleX(${named})` }} />
                    <span style={{ position: "relative" }}>[{NAME}]</span>
                  </span>
                ) : (
                  <span key={i}>{w} </span>
                ),
              )}
              {shown > words.length - 1 && (
                <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 10, borderRadius: 999, background: "rgba(255,255,255,.07)", padding: "8px 16px", fontSize: 19, color: "#A0A9C0", ...pop(t, 3.45, 10, 0.3) }}>
                  <span style={{ width: 24, height: 24, borderRadius: 7, background: "#FF6B5C", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>1</span>
                  Source: their website
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 26, height: 70, borderRadius: 36, background: "rgba(255,255,255,.07)", display: "flex", alignItems: "center", padding: "0 26px", fontSize: 22, color: q ? "#EEF2FF" : "#7D869C" }}>
          {q || "Ask anything"}
          {!sent && q && <span style={{ width: 2, height: 26, background: "#3D6BFF", marginLeft: 2, opacity: Math.floor(t * 3) % 2 ? 0.2 : 1 }} />}
        </div>
      </div>
    </div>
  );

  const copy = (
    <div style={{ display: "flex", flexDirection: "column", gap: 34, maxWidth: vertical ? 900 : 820 }}>
      <Words text="Someone near you just asked AI who to hire." at={0.4} gap={0.06} style={{ fontFamily: DISPLAY, fontSize: vertical ? 78 : 84, lineHeight: 1, fontWeight: 600, color: "#EEF2FF", letterSpacing: "-0.03em" }} />
      <Words text="It gave them someone else's name." at={3.0} gap={0.07} style={{ fontFamily: DISPLAY, fontSize: vertical ? 78 : 84, lineHeight: 1, fontWeight: 600, color: "#FF6B5C", letterSpacing: "-0.03em" }} />
    </div>
  );

  return (
    <AbsoluteFill>
      <Ground bloom="rgba(255,90,74,.14)" at={vertical ? "50% 70%" : "25% 60%"} />
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        {vertical ? (
          <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, gap: 70, flexDirection: "column" }}>
            {copy}
            <div style={{ transform: "scale(.78)", transformOrigin: "top center" }}>{phone}</div>
          </AbsoluteFill>
        ) : (
          <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 130 }}>
            {phone}
            {copy}
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
