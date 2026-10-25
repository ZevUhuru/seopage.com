"use client";

import { useEffect, useRef, useState } from "react";
import { useVisitor } from "./Personalize";
import { funnelDisplay } from "./fonts";
import { pageCondensed } from "./appFonts";

/**
 * The section builder at create.seopage.com, drawn for the hero: the page in
 * its frame, the section tabs, and the rail on Versions (B5, as shipped in
 * create.seopage.com #32). Drawn at the app's true size, then scaled to the
 * box it's given. The page is the visitor's: it reads the hero form, so
 * typing a business name rebuilds it. The three versions of the opening
 * section take turns, the way hovering them does in the app. Paused for
 * reduced-motion visitors and while off screen.
 */

const W = 1240;
const H = 800;
const TABS = ["Opening", "Pricing", "What's included", "Reviews", "Our work", "Questions", "Area served", "Contact"];
const RULES = [
  "Neighbouring sections never share a background",
  "The call button looks the same everywhere",
  "The first phone screen shows the promise and the call button",
  "Busy and roomy sections take turns",
];
const PHONE = "(555) 010-0142";

type Theme = "dark" | "light";
export type AppShotProps = {
  theme?: Theme;
  /** Which rail scope shows: a section's versions, or the whole page's check. */
  scope?: "section" | "page";
  /** The page preview at desktop width, or at phone width in a phone frame. */
  device?: "desktop" | "mobile";
  /** Show only this part of the drawing (true-size px), scaled to the box: x from the left, w wide. */
  crop?: { x: number; w: number };
  className?: string;
};

const mono = { fontFamily: "var(--font-mono), ui-monospace, monospace" };

export function AppShot({ theme = "dark", scope = "section", device = "desktop", crop = { x: 0, w: W }, className = "" }: AppShotProps) {
  const { name, service, city } = useVisitor().demo;
  const svc = service.charAt(0).toUpperCase() + service.slice(1);
  const svcLow = service.toLowerCase();
  const host = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.seo.page`;

  // Three bets on the opening section. The words say only what the visitor gave us.
  const versions = [
    { label: "Answer first", score: 92, h: `${svc} in ${city}, done right the first time`, lead: `What it costs, how long it takes, and who shows up, answered before you call ${name}.` },
    { label: "Urgency", score: 89, h: `${svc} in ${city}, when you need it now`, lead: `Something broken? Tap to call ${name} and talk to a person, not a form.` },
    { label: "Proof first", score: 86, h: `The ${svcLow} ${city} neighbours recommend`, lead: `See the work first: photos from real ${svcLow} jobs around ${city}.` },
  ];

  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [pick, setPick] = useState(0);
  const [live, setLive] = useState(false);

  // Fit the drawing to its box, and play only while it's on screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / crop.w));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches));
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [crop.w]);

  useEffect(() => {
    if (!live || scope !== "section") return;
    const id = setInterval(() => setPick((p) => (p + 1) % versions.length), 2800);
    return () => clearInterval(id);
  }, [live, scope, versions.length]);

  const v = versions[pick];
  const dark = theme === "dark";
  const c = dark
    ? { app: "#0B0F1A", bar: "#0B0F1A", line: "rgba(255,255,255,.10)", ink: "#EEF2FF", soft: "#9AA3B8", panel: "#121829", chip: "rgba(255,255,255,.06)", bezel: "#05070C" }
    : { app: "#EEF0F4", bar: "#FFFFFF", line: "#DDE1E7", ink: "#0A0C11", soft: "#646B78", panel: "#FFFFFF", chip: "#F2F4F7", bezel: "#0A0C11" };

  return (
    <div ref={wrap} className={`w-full overflow-hidden ${crop.x ? "rounded-[14px]" : ""} ${className}`} style={{ height: H * scale }} aria-hidden>
      <div
        className="overflow-hidden rounded-[22px]"
        style={{
          width: W,
          height: H,
          transform: `scale(${scale}) translateX(${-crop.x}px)`,
          transformOrigin: "top left",
          background: c.app,
          color: c.ink,
          fontFamily: "var(--font-sans), sans-serif",
          boxShadow: "0 0 0 1px rgba(255,255,255,.12), 0 80px 140px -60px rgba(61,107,255,.55), 0 40px 80px -40px rgba(0,0,0,.8)",
        }}
      >
        {/* The app's top bar: brand, the page's name and search, devices, the page check, download */}
        <div className="flex h-[58px] items-center gap-4 px-5" style={{ background: c.bar, borderBottom: `1px solid ${c.line}` }}>
          <span className={`${funnelDisplay.className} inline-flex items-start text-[21px] font-bold leading-none tracking-[-0.04em]`}>
            seopage
            <span className="ml-[0.29em] mt-[0.07em] flex h-[1.5em] min-w-[1.5em] items-center justify-center rounded-[0.43em] bg-[#3D6BFF] text-[0.28em] tracking-normal text-white">1</span>
          </span>
          <span className="pl-3 text-[10.5px] uppercase tracking-[.16em]" style={{ ...mono, color: c.soft, borderLeft: `1px solid ${c.line}` }}>create</span>
          <span className="ml-2 flex flex-col leading-tight">
            <span className="text-[13.5px] font-semibold">{name}</span>
            <span className="text-[11px]" style={{ ...mono, color: c.soft }}>{svcLow} {city.toLowerCase()} · Saved</span>
          </span>
          <span className="mx-auto flex gap-1 rounded-[10px] p-1" style={{ background: c.chip }}>
            {(["desktop", "tablet", "mobile"] as const).map((d) => (
              <span key={d} className="flex h-7 w-9 items-center justify-center rounded-[7px]" style={{ background: (device === "mobile" ? d === "mobile" : d === "desktop") ? (dark ? "#EEF2FF" : "#0A0C11") : "transparent" }}>
                <DeviceIcon kind={d} color={(device === "mobile" ? d === "mobile" : d === "desktop") ? (dark ? "#0A0C11" : "#FFFFFF") : c.soft} />
              </span>
            ))}
          </span>
          <span className="flex h-[34px] items-center gap-2 rounded-[9px] px-3 text-[12px]" style={{ border: `1px solid ${c.line}`, color: c.soft }}>
            <b className="text-[15px] text-[#22A06B]">{scope === "section" ? v.score : 88}</b> page check
          </span>
          <span className="flex h-[34px] items-center rounded-[9px] bg-[#1B46D4] px-3.5 text-[13px] font-semibold text-white">Download page</span>
        </div>

        <div className="flex h-[742px] gap-3 p-3">
          {/* Left: the section tabs over the page, in its frame */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex h-[42px] items-center gap-6 rounded-[12px] px-5 text-[13px]" style={{ background: c.panel, border: `1px solid ${c.line}` }}>
              {TABS.map((t, i) => (
                <span key={t} className="relative whitespace-nowrap py-2.5" style={{ color: i === 0 ? (dark ? "#9DB4FF" : "#1B46D4") : c.soft, fontWeight: i === 0 ? 600 : 400 }}>
                  {t}
                  {i === 0 && <i className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded bg-current" />}
                </span>
              ))}
            </div>

            <div className={`flex-1 overflow-hidden rounded-[18px] p-[6px] ${device === "mobile" ? "flex justify-center" : ""}`} style={{ background: c.bezel }}>
              {device === "desktop" ? (
                <div className="h-full overflow-hidden rounded-[13px] bg-[#F1F4F6]">
                  <div className="flex h-[30px] items-center gap-1.5 bg-[#E3E7EB] px-3">
                    <i className="h-2 w-2 rounded-full bg-[#C4CAD2]" /><i className="h-2 w-2 rounded-full bg-[#C4CAD2]" /><i className="h-2 w-2 rounded-full bg-[#C4CAD2]" />
                    <span className="mx-auto text-[11px] text-[#5C6470]" style={mono}>{host}</span>
                  </div>
                  <TradePage name={name} svc={svc} city={city} v={v} pick={pick} />
                </div>
              ) : (
                // The phone sits toward the rail, so a crop can show both up close.
                <div className="flex h-full items-start justify-end pr-12 pt-2" style={{ background: dark ? "#0E1322" : "#E4E7EC", width: "100%", borderRadius: 13 }}>
                  <div className="h-[700px] w-[360px] overflow-hidden rounded-[40px] border-[10px] border-[#05070C] bg-[#F1F4F6] shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
                    <TradePage name={name} svc={svc} city={city} v={v} pick={pick} phone />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: the rail, in a bezel that matches the page's */}
          <div className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-[18px] p-[6px]" style={{ background: c.bezel }}>
            <div className="flex h-full flex-col overflow-hidden rounded-[13px]" style={{ background: c.panel }}>
              <div className="grid grid-cols-3 gap-1.5 p-2">
                {[
                  ["Section", "Opening"],
                  ["Page", `${svc} in ${city}`],
                  ["Site", "Look"],
                ].map(([k, val], i) => {
                  const on = (scope === "section" && i === 0) || (scope === "page" && i === 1);
                  return (
                    <span key={k} className="flex flex-col rounded-[9px] px-2.5 py-1.5" style={{ background: c.chip, outline: on ? "2px solid #3D6BFF" : "none" }}>
                      <span className="text-[9.5px] uppercase tracking-[.14em]" style={{ ...mono, color: c.soft }}>{k}</span>
                      <span className="truncate text-[12.5px] font-semibold">{val}</span>
                    </span>
                  );
                })}
              </div>

              {scope === "section" ? (
                <>
                  <div className="flex gap-4 px-3 pb-2 text-[12.5px]" style={{ borderBottom: `1px solid ${c.line}` }}>
                    {["Versions · 3", "Layout", "Edit", "Checks"].map((t, i) => (
                      <span key={t} className="relative py-1.5" style={{ color: i === 0 ? c.ink : c.soft, fontWeight: i === 0 ? 600 : 400 }}>
                        {t}
                        {i === 0 && <i className="absolute inset-x-0 -bottom-[9px] h-[2px] rounded bg-[#3D6BFF]" />}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-3">
                    {versions.map((x, i) => (
                      <div
                        key={x.label}
                        className="flex flex-col gap-1.5 rounded-[11px] p-3 transition-all duration-500"
                        style={{ background: c.chip, outline: i === pick ? "2px solid #3D6BFF" : `1px solid ${c.line}`, opacity: i === pick ? 1 : 0.72 }}
                      >
                        <span className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-[.14em]" style={{ ...mono, color: i === pick ? (dark ? "#9DB4FF" : "#1B46D4") : c.soft }}>{x.label}</span>
                          <span className="text-[11.5px] font-semibold text-[#22A06B]">{x.score}</span>
                        </span>
                        <span className="text-[13px] font-semibold leading-snug">{x.h}</span>
                        <span className="mt-1 flex gap-1.5">
                          <span className="rounded-[7px] px-2.5 py-1 text-[11px] font-semibold" style={{ background: i === pick ? "#1B46D4" : "transparent", color: i === pick ? "#fff" : c.soft, border: i === pick ? "none" : `1px solid ${c.line}` }}>
                            {i === pick ? "Keep this one" : "Preview"}
                          </span>
                          {i === 0 && <span className="rounded-[7px] px-2.5 py-1 text-[11px]" style={{ color: c.soft, border: `1px solid ${c.line}` }}>Lock</span>}
                        </span>
                      </div>
                    ))}
                    <span className="mt-auto flex h-[40px] items-center justify-center rounded-[10px] text-[13px] font-semibold" style={{ border: `1.5px dashed ${dark ? "rgba(157,180,255,.5)" : "#9DB4FF"}`, color: dark ? "#9DB4FF" : "#1B46D4" }}>
                      Try 3 more
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-col gap-1 px-4 py-3.5" style={{ background: "#0A0F1E", color: "#EEF2FF" }}>
                    <span className="text-[9.5px] uppercase tracking-[.16em] text-[#9DB4FF]" style={mono}>This page</span>
                    <span className="text-[17px] font-semibold leading-snug">{svc} in {city}</span>
                    <span className="text-[12px] text-[#A0A9C0]">Built to win &ldquo;{svcLow} {city.toLowerCase()}&rdquo;. Page check: 88.</span>
                  </div>
                  <div className="flex flex-col gap-2.5 px-4 py-3.5 text-[12.5px] leading-snug">
                    <span className="text-[9.5px] uppercase tracking-[.16em]" style={{ ...mono, color: c.soft }}>The whole page</span>
                    {RULES.map((r) => (
                      <span key={r} className="flex gap-2"><b className="text-[#22A06B]">✓</b>{r}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 px-4 py-3 text-[12.5px]" style={{ borderTop: `1px solid ${c.line}` }}>
                    <span className="text-[9.5px] uppercase tracking-[.16em]" style={{ ...mono, color: c.soft }}>Sections, in order</span>
                    {TABS.slice(0, 6).map((t, i) => (
                      <span key={t} className="flex items-center justify-between"><span><span style={{ color: c.soft }}>{i + 1}</span>&nbsp;&nbsp;<b className="font-semibold">{t}</b></span><span style={{ color: c.soft }}>↑ ↓</span></span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The trade page Esy built, as the visitor's customers would see it. The opening section is outlined: it's the one being chosen. */
function TradePage({ name, svc, city, v, pick, phone = false }: { name: string; svc: string; city: string; v: { h: string; lead: string }; pick: number; phone?: boolean }) {
  const head = { fontFamily: pageCondensed.style.fontFamily };
  return (
    <div className="text-[#0E1A24]">
      <div className={`flex items-center justify-between bg-[#F1F4F6] ${phone ? "px-4 py-3" : "px-9 py-4"}`}>
        <span className="flex flex-col leading-none" style={head}>
          <b className={`${phone ? "text-[17px]" : "text-[24px]"} font-bold uppercase`}>{name}</b>
          <span className={`${phone ? "text-[10px]" : "text-[13px]"} mt-1 font-semibold uppercase tracking-[.04em] text-[#3B4A57]`}>{svc} in {city}</span>
        </span>
        {!phone && (
          <span className="rounded-[6px] bg-[#C2441F] px-4 py-2.5 text-[17px] font-bold uppercase text-white shadow-[0_3px_0_#7A2A13]" style={head}>Call {PHONE}</span>
        )}
      </div>
      <div className={`${phone ? "mx-2 px-4 py-6" : "mx-2 px-9 py-10"} rounded-[3px] bg-[#F3F6F8] outline outline-2 outline-[#2F5BEA]`}>
        <div key={pick} className="nh-pop">
          <h3 className={`${phone ? "text-[38px]" : "text-[60px]"} font-bold uppercase leading-[0.98]`} style={head}>{v.h}</h3>
          <p className={`${phone ? "mt-4 text-[15px]" : "mt-5 max-w-[620px] text-[19px]"} leading-[1.5] text-[#33424F]`}>{v.lead}</p>
        </div>
        <span className={`mt-6 inline-flex rounded-[6px] bg-[#C2441F] font-bold text-white ${phone ? "w-full justify-center py-3.5 text-[16px]" : "px-6 py-3.5 text-[17px]"}`}>Call {PHONE}</span>
      </div>
      <div className={`${phone ? "px-6 py-7" : "px-11 py-10"} bg-[#D9E0E5]`}>
        <h4 className={`${phone ? "text-[26px]" : "text-[36px]"} font-bold uppercase leading-none`} style={head}>{svc} prices in {city}</h4>
        <p className={`${phone ? "text-[14px]" : "text-[17px]"} mt-3 text-[#33424F]`}>Starting prices, so you know before anyone comes out.</p>
        <div className={`mt-5 grid gap-3 ${phone ? "" : "grid-cols-3"}`}>
          {["Small job", "Half day", "Full day"].map((t) => (
            <span key={t} className="flex flex-col gap-2 rounded-[8px] bg-white/70 p-4">
              <b className="text-[14px] font-semibold">{t}</b>
              <i className="h-2 w-2/3 rounded bg-[#C9D2D9]" />
              <i className="h-2 w-1/2 rounded bg-[#C9D2D9]" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeviceIcon({ kind, color }: { kind: "desktop" | "tablet" | "mobile"; color: string }) {
  const d = { desktop: "M3 5h18v11H3zM9 20h6M12 16v4", tablet: "M6 3h12v18H6zM11 18h2", mobile: "M8 3h8v18H8zM11 18h2" }[kind];
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
