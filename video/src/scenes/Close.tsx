import { AbsoluteFill, Img, staticFile } from "remotion";
import { Cite, Ground, IllustrationTag, Logo, NoraClip } from "../components/common";
import { PRICE, PRICE_AFTER, SITE } from "../lib/brand";
import { DISPLAY, SANS } from "../lib/fonts";
import { pop, prog, rise, useT, Words } from "../lib/motion";

const H = { fontFamily: DISPLAY, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: "#EEF2FF" } as const;

function ProofCard({ t, at, src, crop, n, count, label, site }: { t: number; at: number; src: string; crop: { w: number; x: number; y: number; hw: number; hh: number }; n: number; count: [number, number]; label: string; site: string }) {
  const v = Math.round(n * prog(t, count[0], count[1]));
  const ring = prog(t, count[0] + count[1] - 0.1, 0.5);
  const p = prog(t, at, 0.6);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26, opacity: p, transform: `translateY(${(1 - p) * 60}px)` }}>
      <div style={{ position: "relative", width: 820, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.15)", background: "white", boxShadow: "0 50px 100px -50px rgba(61,107,255,.5)" }}>
        <Img src={staticFile(src)} style={{ display: "block", width: crop.w }} />
        <span style={{ position: "absolute", left: crop.x, top: crop.y, width: crop.hw, height: crop.hh, borderRadius: 12, border: `4px solid rgba(61,107,255,${ring})`, boxShadow: `0 0 0 ${10 * (1 - ring)}px rgba(61,107,255,${0.25 * ring})` }} />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
        <span style={{ ...H, fontSize: 132, color: "#9DB4FF", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.05em" }}>{v}</span>
        <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ ...H, fontSize: 40 }}>{label}</span>
          <span style={{ fontFamily: SANS, fontSize: 28, color: "#A0A9C0" }}>{site}</span>
        </span>
      </div>
    </div>
  );
}

/** 0:50–0:58. Proof: our own sites, cited by AI, straight from Ahrefs. */
export function Proof({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  return (
    <AbsoluteFill>
      <Ground bloom="rgba(61,107,255,.2)" at="50% 0%" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: vertical ? "flex-start" : "center", gap: vertical ? 34 : 60, paddingTop: vertical ? 290 : 0 }}>
        <Words text="We ran it on our own sites first." at={0.3} gap={0.06} style={{ ...H, fontSize: vertical ? 72 : 80, textAlign: "center", maxWidth: vertical ? 900 : undefined }} />
        <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: vertical ? 34 : 80, zoom: vertical ? 0.64 : 1, order: 2 }}>
          <ProofCard t={t} at={0.3} src="site/proof/esy-ai-citations.png" crop={{ w: 820, x: 262, y: 162, hw: 110, hh: 72 }} n={37} count={[0.9, 1.4]} label="ChatGPT citations" site="esy.com, across 20 pages" />
          <ProofCard t={t} at={3.6} src="site/proof/clipart-ai-responses-sep-2026.png" crop={{ w: 820, x: 16, y: 104, hw: 110, hh: 62 }} n={102} count={[4.1, 1.5]} label="AI answers" site="clip.art, across 35 pages" />
        </div>
        {/* Vertical: the disclaimer sits under the title, clear of the captions and the feed's UI. */}
        <span style={{ fontFamily: SANS, fontSize: 26, color: "#7D869C", textAlign: "center", maxWidth: vertical ? 860 : undefined, order: vertical ? 1 : 3, ...rise(t, vertical ? 1.0 : 6.4) }}>
          Ahrefs Site Explorer, May and September 2026. Our own sites, not client results. Yours will differ.
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/** 0:58–1:04. The goal: a call that starts with "I found you on ChatGPT." */
export function TheCall({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  return (
    <AbsoluteFill>
      <NoraClip name="nora-call" rate={0.8} from={1.02} to={1.1} originX={55} originY={35} shiftX={vertical ? 0 : 12} />
      <AbsoluteFill style={{ background: vertical ? "linear-gradient(0deg, rgba(4,6,11,.95) 0%, rgba(4,6,11,.6) 40%, transparent 62%)" : "linear-gradient(90deg, rgba(4,6,11,.94) 0%, rgba(4,6,11,.72) 32%, rgba(4,6,11,0) 60%)" }} />
      <div style={{ position: "absolute", left: vertical ? 70 : 110, right: vertical ? 70 : undefined, bottom: vertical ? 560 : 170, maxWidth: 860, display: "flex", flexDirection: "column", gap: 26 }}>
        <span style={{ fontFamily: SANS, fontSize: vertical ? 44 : 40, color: "#C9D0E2", ...rise(t, 0.4) }}>The goal isn&apos;t a ranking report.</span>
        <Words text="It's a call that starts with" at={2.3} gap={0.06} style={{ ...H, fontSize: vertical ? 76 : 72 }} />
        <span style={{ ...H, fontSize: vertical ? 92 : 96, color: "#9DB4FF", ...rise(t, 3.2, 0.7) }}>
          “I found you on ChatGPT.”
          <Cite size={40} style={{ marginLeft: 14, verticalAlign: "0.9em", opacity: prog(t, 3.9, 0.3), transform: `scale(${0.5 + 0.5 * prog(t, 3.9, 0.4)})` }} />
        </span>
      </div>
      <IllustrationTag vertical={vertical} />
    </AbsoluteFill>
  );
}

const INCLUDED = ["Live keyword research for your city", "The full page, written and designed", "Ten checks, scored before you pay", "Publish to your own address, or download it"];

/** 1:04–1:10. The offer: free to preview, $199 launch price, pay when you publish. */
export function Offer({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  const price = prog(t, 1.2, 0.5);
  const pressed = t >= 4.0 && t < 4.25;
  const card = (
    <div style={{ width: vertical ? 900 : 700, display: "flex", flexDirection: "column", gap: 24, borderRadius: 36, border: "1px solid rgba(61,107,255,.45)", background: "linear-gradient(180deg, #12204A 0%, #0A0F1E 100%)", padding: vertical ? 56 : 52, boxShadow: "0 60px 120px -50px rgba(61,107,255,.6)", ...pop(t, 0.3, 40, 0.6) }}>
      <span style={{ fontFamily: SANS, fontSize: 30, color: "#C9D0E2" }}>SEO landing page</span>
      <span style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
        <span style={{ ...H, fontSize: 150, letterSpacing: "-0.05em", transform: `scale(${0.7 + 0.3 * price + 0.08 * Math.sin(price * Math.PI)})`, transformOrigin: "left bottom", opacity: price, display: "inline-block" }}>{PRICE}</span>
        <span style={{ fontFamily: SANS, fontSize: 30, color: "#9DB4FF", opacity: price }}>launch price</span>
      </span>
      <span style={{ fontFamily: SANS, fontSize: 28, color: "#A0A9C0", ...rise(t, 1.6) }}>{PRICE_AFTER} after launch. Pay when you publish.</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, borderTop: "1px solid rgba(255,255,255,.12)", borderBottom: "1px solid rgba(255,255,255,.12)", padding: "24px 0" }}>
        {INCLUDED.map((x, i) => (
          <span key={x} style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: SANS, fontSize: 28, color: "#EEF2FF", ...pop(t, 2.0 + i * 0.35, 12, 0.35) }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9DB4FF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
            {x}
          </span>
        ))}
      </div>
      <span style={{ height: 84, borderRadius: 999, background: pressed ? "#5A82FF" : "#3D6BFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 600, fontSize: 32, color: "white", transform: `scale(${pressed ? 0.97 : 1})`, ...rise(t, 3.4) }}>
        Build my page free
      </span>
    </div>
  );
  return (
    <AbsoluteFill>
      <Ground bloom="rgba(61,107,255,.22)" at="75% 30%" />
      <AbsoluteFill style={{ flexDirection: vertical ? "column" : "row", alignItems: "center", justifyContent: vertical ? "flex-start" : "center", gap: vertical ? 36 : 140, paddingTop: vertical ? 300 : 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: vertical ? 900 : 760, alignItems: vertical ? "center" : "flex-start" }}>
          <Words text="Free to preview." at={0.3} style={{ ...H, fontSize: vertical ? 96 : 110 }} />
          <span style={{ display: "flex", flexDirection: vertical ? "row" : "column", gap: vertical ? 22 : 10, fontFamily: SANS, fontSize: vertical ? 30 : 38, color: "#C9D0E2" }}>
            {(vertical ? ["No card.", "No subscription.", "Yours to keep."] : ["No card to start.", "No subscription.", "You own the page."]).map((x, i) => (
              <span key={x} style={rise(t, 0.9 + i * 0.25)}>{x}</span>
            ))}
          </span>
        </div>
        <div style={{ zoom: vertical ? 0.8 : 1 }}>{card}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/** 1:10–1:15. The end card; the lower third stays clear for YouTube's end-screen elements. */
export function EndCard({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  const logo = prog(t, 0.3, 0.7);
  return (
    <AbsoluteFill>
      <Ground bloom="rgba(61,107,255,.24)" at="50% 35%" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: vertical ? "center" : "flex-start", paddingTop: vertical ? 0 : 230, gap: 40 }}>
        <div style={{ opacity: logo, transform: `translateY(${(1 - logo) * 30}px) scale(${0.94 + 0.06 * logo})`, filter: `blur(${(1 - logo) * 12}px)` }}>
          <Logo size={vertical ? 170 : 190} chip={0.4 + 0.6 * prog(t, 1.05, 0.35) + 0.2 * Math.sin(prog(t, 1.05, 0.35) * Math.PI)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
          <Words text="Someone's asking AI who to hire." at={0.9} gap={0.05} style={{ ...H, fontSize: vertical ? 56 : 58, color: "#C9D0E2" }} />
          <Words text="Make the answer you." at={1.25} gap={0.06} style={{ ...H, fontSize: vertical ? 56 : 58, color: "#9DB4FF" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22, ...rise(t, 1.6) }}>
          <span style={{ height: 88, padding: "0 44px", borderRadius: 999, background: "#3D6BFF", display: "flex", alignItems: "center", fontFamily: SANS, fontWeight: 600, fontSize: 38, color: "white" }}>{SITE}</span>
        </div>
        <span style={{ fontFamily: SANS, fontSize: 28, color: "#A0A9C0", ...rise(t, 2.0) }}>
          Free to preview · {PRICE} launch price · {PRICE_AFTER} after launch
        </span>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#04060B", opacity: prog(t, 5.1, 0.4) }} />
    </AbsoluteFill>
  );
}
