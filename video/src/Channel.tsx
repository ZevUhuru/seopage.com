import type { CSSProperties } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Cite, Logo } from "./components/common";
import { SITE } from "./lib/brand";
import { DISPLAY, SANS } from "./lib/fonts";

/**
 * YouTube channel art, built from what the brand already is: the seopage¹
 * wordmark (components/Logo.tsx), its citation mark, the homepage's ink and
 * signal blue, Nora, and the builder's real steps and price.
 *
 * Profile: 800×800, shown as a circle as small as ~36px.
 * Banner: 2560×1440; only the centre 1546×423 is safe on every device.
 */

const INK = "#04060B";
const BLOOM = (at: string, a = 0.35) => `radial-gradient(60% 60% at ${at}, rgba(61,107,255,${a}), transparent 70%)`;

/** Profile A: the citation mark alone, the one glyph that survives at comment size. */
export function ProfileMark() {
  return (
    <AbsoluteFill style={{ background: `${BLOOM("50% 40%", 0.4)}, ${INK}`, alignItems: "center", justifyContent: "center" }}>
      <Cite size={380} style={{ fontSize: 290, borderRadius: 110, boxShadow: "0 0 140px rgba(61,107,255,.75), inset 0 -10px 30px rgba(0,0,0,.18)" }} />
    </AbsoluteFill>
  );
}

/** Profile B: the full wordmark in the circle. */
export function ProfileWordmark() {
  return (
    <AbsoluteFill style={{ background: `${BLOOM("50% 30%", 0.3)}, ${INK}`, alignItems: "center", justifyContent: "center" }}>
      <Logo size={150} />
    </AbsoluteFill>
  );
}

/** Profile C: Nora, with the citation mark as her badge. */
export function ProfileNora() {
  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden" }}>
      <Img src={staticFile("site/home/nora-proud.webp")} style={{ position: "absolute", width: 1536 * 1.55, maxWidth: "none", left: 400 - 765 * 1.55, top: 330 - 215 * 1.55 }} />
      <AbsoluteFill style={{ background: "radial-gradient(70% 70% at 50% 40%, transparent 55%, rgba(4,6,11,.55) 100%)" }} />
      <Cite size={190} style={{ position: "absolute", right: 150, bottom: 150, fontSize: 140, borderRadius: 56, boxShadow: "0 0 0 16px #04060B, 0 0 60px rgba(61,107,255,.8)" }} />
    </AbsoluteFill>
  );
}

// ---------- Banners ----------

/** The centre strip every device shows: 1546×423 at (507, 508). */
const SAFE: CSSProperties = { position: "absolute", left: 507, top: 508, width: 1546, height: 423, padding: "0 70px", boxSizing: "border-box" };
const LINE: CSSProperties = { fontFamily: DISPLAY, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, color: "#EEF2FF" };

/** Banner A: the wordmark and the promise, nothing else. */
export function BannerType() {
  return (
    <AbsoluteFill style={{ background: `${BLOOM("50% 50%", 0.28)}, ${INK}` }}>
      <div style={{ ...SAFE, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo size={170} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 18 }}>
          <span style={{ ...LINE, fontSize: 64 }}>SEO landing pages</span>
          <span style={{ ...LINE, fontSize: 64, color: "#9DB4FF" }}>that get cited by AI.</span>
          <span style={{ fontFamily: SANS, fontSize: 30, color: "#A0A9C0", marginTop: 8 }}>{SITE}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/** Banner B: Nora outside her shop, the wordmark and promise beside her. */
export function BannerNora() {
  // Nora's eyes (765, 141 in the still) land in the safe strip's right third.
  const s = 1.7;
  const left = 1880 - 765 * s;
  const top = 660 - 141 * s;
  const img = { position: "absolute", width: 1536 * s, maxWidth: "none", left } as const;
  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden" }}>
      {/* The still is 3:2, so it stops short of the banner's top; a blurred, darkened mirror of it carries the scene up into the ink instead of a hard edge (TVs show the whole banner). */}
      <Img src={staticFile("site/home/nora-proud.webp")} style={{ ...img, top: top - 1024 * s, transform: "scaleY(-1)", filter: "blur(28px) brightness(.45)" }} />
      <Img src={staticFile("site/home/nora-proud.webp")} style={{ ...img, top, maskImage: "linear-gradient(180deg, transparent 0px, black 140px)", WebkitMaskImage: "linear-gradient(180deg, transparent 0px, black 140px)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #04060B 0%, rgba(4,6,11,.85) 14%, rgba(4,6,11,0) 32%), linear-gradient(90deg, #04060B 0%, #04060B 30%, rgba(4,6,11,.7) 50%, rgba(4,6,11,.05) 68%)" }} />
      <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
        <Logo size={120} />
        <span style={{ ...LINE, fontSize: 60, maxWidth: 820 }}>
          SEO landing pages that get <span style={{ color: "#9DB4FF" }}>cited by AI.</span>
        </span>
        <span style={{ fontFamily: SANS, fontSize: 28, color: "#C9D0E2" }}>For the trades · {SITE}</span>
        {/* Inside the safe strip, so every device shows it. */}
        <span style={{ fontFamily: SANS, fontSize: 20, color: "rgba(238,242,255,.55)", marginTop: -12 }}>Nora is an illustration.</span>
      </div>
    </AbsoluteFill>
  );
}

/** Banner C: the product itself, the builder's four steps and the offer. */
export function BannerSteps() {
  const steps = ["Describe", "Research", "Score", "Go live"];
  return (
    <AbsoluteFill style={{ background: `${BLOOM("50% 50%", 0.24)}, ${INK}` }}>
      <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 34 }}>
        <Logo size={120} />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {steps.map((st, i) => (
            <span key={st} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 14, height: 76, padding: "0 30px", borderRadius: 999, border: "2px solid rgba(255,255,255,.16)", background: i === 3 ? "#3D6BFF" : "rgba(10,15,30,.8)", fontFamily: SANS, fontWeight: 600, fontSize: 32, color: "#EEF2FF" }}>
                <span style={{ fontFamily: DISPLAY, fontWeight: 700, color: i === 3 ? "#EEF2FF" : "#3D6BFF" }}>{i + 1}</span>
                {st}
              </span>
              {i < 3 && <span style={{ color: "#7D869C", fontSize: 34 }}>→</span>}
            </span>
          ))}
        </div>
        <span style={{ fontFamily: SANS, fontSize: 30, color: "#C9D0E2" }}>
          SEO landing pages that get cited by AI · Free to preview · {SITE}
        </span>
      </div>
    </AbsoluteFill>
  );
}
