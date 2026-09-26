import type { ReactNode } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { GeneratedPage } from "../components/GeneratedPage";
import { DEMO, PRICE } from "../lib/brand";
import { APP_DISPLAY, APP_SANS, DISPLAY, MONO, SANS } from "../lib/fonts";
import { Camera, type CamKey, Cursor, pop, prog, typed, useT } from "../lib/motion";

/**
 * 0:21–0:50. The builder at create.seopage.com, replayed: describe,
 * research, score, go live. Ported from components/home/BuilderDemo.tsx and
 * drawn at the app's true size (1180×762) with its real tokens; a camera
 * pushes into whatever the voice is talking about. Times are seconds from
 * 0:21 on the master.
 */
const W = 1180;
const H = 762;
const SCENE_AT = [0, 7, 15, 23];
const STEPS = ["Researching your market", "Planning your local SEO", "Writing your page", "Choosing your design"];
const STEP_DONE = [8.9, 10.8, 12.7, 14.2];
const CHECKS = ["Title fits on Google", "Description fits", "One clear headline", "Search in all three", "City named up front", "4+ direct answers", "Questions covered", "Business schema", "FAQ schema", "Tap-to-call phone"];
const CHECK_AT = 17.0;
const CHECK_GAP = 0.28;
const PAID_AT = 25.15;

const archivo = { fontFamily: APP_DISPLAY };
const mono = { fontFamily: MONO };

const CAM: CamKey[] = [
  { t: 0, x: 590, y: 400, s: 1.2 },
  { t: 0.35, x: 590, y: 400, s: 1.3 },
  { t: 0.9, x: 320, y: 390, s: 2.0 },
  { t: 2.3, x: 320, y: 430, s: 2.0 },
  { t: 3.9, x: 320, y: 435, s: 2.0 },
  { t: 4.3, x: 686, y: 330, s: 1.7 },
  { t: 4.9, x: 686, y: 330, s: 1.7 },
  { t: 5.4, x: 320, y: 520, s: 1.9 },
  { t: 6.3, x: 320, y: 525, s: 1.9 },
  { t: 7.0, x: 590, y: 400, s: 1.3 },
  { t: 7.9, x: 555, y: 250, s: 2.0 },
  { t: 9.3, x: 555, y: 250, s: 2.0 },
  { t: 9.9, x: 975, y: 250, s: 2.0 },
  { t: 11.3, x: 975, y: 250, s: 2.0 },
  { t: 12.0, x: 765, y: 470, s: 1.75 },
  { t: 13.6, x: 765, y: 470, s: 1.75 },
  { t: 14.6, x: 590, y: 400, s: 1.3 },
  { t: 15.2, x: 590, y: 400, s: 1.3 },
  { t: 15.9, x: 560, y: 320, s: 1.7 },
  { t: 16.6, x: 560, y: 320, s: 1.7 },
  { t: 17.2, x: 740, y: 368, s: 1.9 },
  { t: 20.1, x: 740, y: 368, s: 1.9 },
  { t: 20.8, x: 590, y: 400, s: 1.3 },
  { t: 23.0, x: 590, y: 400, s: 1.3 },
  { t: 23.7, x: 590, y: 440, s: 1.45 },
  { t: 24.9, x: 590, y: 450, s: 1.5 },
  { t: 25.6, x: 590, y: 585, s: 2.0 },
];

/** Pointer paths in app coordinates: filling the form, then paying. */
const CURSOR_FORM = [
  { t: 0.2, x: 760, y: 700 },
  { t: 0.6, x: 380, y: 358 },
  { t: 2.0, x: 384, y: 361 },
  { t: 2.2, x: 232, y: 446 },
  { t: 3.1, x: 234, y: 449 },
  { t: 3.3, x: 470, y: 446 },
  { t: 4.1, x: 474, y: 450 },
  { t: 4.6, x: 142, y: 537 },
  { t: 5.3, x: 146, y: 540 },
  { t: 5.8, x: 172, y: 600 },
  { t: 6.8, x: 176, y: 606 },
];
const CURSOR_PAY = [
  { t: 23.6, x: 900, y: 720 },
  { t: 24.6, x: 650, y: 600 },
  { t: 25.0, x: 612, y: 590 },
  { t: 26.0, x: 616, y: 594 },
];
const CLICKS = [0.6, 2.2, 3.3, 4.6, 5.8, 25.0];

export function Builder({ vertical = false }: { vertical?: boolean }) {
  const t = useT();
  const scene = t >= SCENE_AT[3] ? 3 : t >= SCENE_AT[2] ? 2 : t >= SCENE_AT[1] ? 1 : 0;
  const k = vertical ? 0.72 : 1;
  const cam = CAM.map((c) => ({ ...c, s: c.s * k }));
  const enter = prog(t, 0, 0.45);
  // At 25.9 the camera dives through the paid button into the live page.
  const dive = prog(t, 25.9, 0.55, (x) => x * x);

  return (
    <AbsoluteFill style={{ background: "radial-gradient(70% 60% at 50% 30%, rgba(61,107,255,.22), transparent 70%), #0A0F1E" }}>
      <AbsoluteFill style={{ opacity: enter * (1 - prog(t, 25.95, 0.35)), transform: `scale(${1 + 2.2 * dive})`, transformOrigin: "50% 50%" }}>
        <Camera keys={cam} w={W} h={H}>
          <App t={t} scene={scene} />
          {t < 7.0 && <Cursor path={CURSOR_FORM} clicks={CLICKS} />}
          {t >= 23.3 && t < 26 && <Cursor path={CURSOR_PAY} clicks={CLICKS} />}
        </Camera>
      </AbsoluteFill>
      {t >= 25.9 && <LivePage t={t - 26.25} vertical={vertical} />}
      <Hud t={t} scene={scene} vertical={vertical} />
    </AbsoluteFill>
  );
}

const HUD = [
  ["Describe your business", "Four details. No SEO knowledge needed."],
  ["Live research for your city", "Real search data, not a guess."],
  ["Written, designed, and scored", "Ten checks, scored before you pay."],
  ["Go live", "Your own address, or download the HTML."],
];

function Hud({ t, scene, vertical }: { t: number; scene: number; vertical: boolean }) {
  const local = t - SCENE_AT[scene];
  const fade = prog(t, 0.3, 0.5) * (1 - prog(t, 28.4, 0.5));
  const [h, sub] = HUD[scene];
  return (
    <AbsoluteFill style={{ opacity: fade, pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: vertical ? "linear-gradient(180deg, rgba(10,15,30,.95) 0%, rgba(10,15,30,.85) 28%, transparent 36%)" :"linear-gradient(0deg, rgba(10,15,30,.9) 0%, transparent 24%), linear-gradient(180deg, rgba(10,15,30,.8) 0%, transparent 14%)" }} />
      <div style={{ position: "absolute", top: vertical ? 290 : 44, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 6, borderRadius: 999, border: "1px solid rgba(255,255,255,.14)", background: "rgba(10,15,30,.7)", padding: 6, fontFamily: SANS, fontSize: vertical ? 26 : 22, backdropFilter: "blur(8px)" }}>
          {["Describe", "Research", "Score", "Go live"].map((s, i) => (
            <span key={s} style={{ height: vertical ? 56 : 48, display: "flex", alignItems: "center", padding: "0 22px", borderRadius: 999, background: i === scene ? "#EEF2FF" : "transparent", color: i === scene ? "#04060B" : "#A0A9C0", fontWeight: i === scene ? 600 : 400 }}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div key={scene} style={{ position: "absolute", left: vertical ? 70 : 96, ...(vertical ? { top: 380 } : { bottom: 110 }), display: "flex", alignItems: "center", gap: 26, ...pop(local, 0.15, 18, 0.5) }}>
        <span style={{ fontFamily: DISPLAY, fontSize: vertical ? 120 : 108, fontWeight: 700, color: "#3D6BFF", lineHeight: 0.8, letterSpacing: "-0.05em" }}>{scene + 1}</span>
        <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: DISPLAY, fontSize: vertical ? 50 : 50, fontWeight: 600, color: "#EEF2FF", letterSpacing: "-0.03em", lineHeight: 1 }}>{h}</span>
          <span style={{ fontFamily: SANS, fontSize: vertical ? 30 : 28, color: "#C9D0E2" }}>{sub}</span>
        </span>
      </div>
    </AbsoluteFill>
  );
}

function App({ t, scene }: { t: number; scene: number }) {
  const { name, slug } = DEMO;
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/15 bg-[#f5f6f8]" style={{ width: W, height: H, fontFamily: APP_SANS, color: "#0a0c11", boxShadow: "0 80px 140px -60px rgba(61,107,255,.5), 0 40px 80px -40px rgba(0,0,0,.8)" }}>
      <div className="flex h-[42px] items-center gap-3 border-b border-[#dcdfe4] bg-[#e8eaee] px-4">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto rounded-[7px] bg-[#f5f6f8] px-4 py-[5px] text-[12px] text-[#4b515c]" style={mono}>
          {scene === 0 ? "create.seopage.com" : `create.seopage.com/build/${slug}`}
        </span>
      </div>
      <div className="relative h-[720px] overflow-hidden">
        <div className="flex h-[52px] items-center gap-3 border-b border-[#e6e8ec] bg-white px-5">
          <span className="inline-flex items-start text-[20px] font-bold leading-none tracking-[-0.04em] text-[#0a0c11]" style={{ fontFamily: DISPLAY }}>
            seopage
            <span className="ml-[0.29em] mt-[0.07em] flex h-[1.5em] min-w-[1.5em] items-center justify-center rounded-[0.43em] bg-[#3D6BFF] text-[0.28em] tracking-normal text-white">1</span>
          </span>
          <span className="border-l border-[#e6e8ec] pl-2.5 text-[10.5px] uppercase tracking-[.14em] text-[#646b78]" style={mono}>create</span>
          {scene === 2 && (
            <span className="ml-auto flex items-center gap-3.5">
              <span className="text-[13px] font-semibold">{name}</span>
              <span className="flex h-[34px] items-center rounded-lg bg-[#1b46d4] px-3.5 text-[13px] font-semibold text-white">Go live · {PRICE}</span>
            </span>
          )}
        </div>
        {scene === 0 && <Describe t={t} />}
        {scene === 1 && <Research t={t} />}
        {(scene === 2 || scene === 3) && <Editor t={t} />}
        {scene === 3 && <GoLive t={t} />}
      </div>
    </div>
  );
}

function Field({ active, text }: { active: boolean; text: string }) {
  const t = useT();
  return (
    <span className={`flex h-[42px] items-center rounded-lg border bg-white px-3 text-[14px] ${active ? "border-[#1b46d4] shadow-[0_0_0_3px_rgba(27,70,212,.16)]" : "border-[#d3d7dd]"}`}>
      {text}
      {active && <span style={{ display: "inline-block", width: 1.5, height: 15, background: "#1b46d4", marginLeft: 1, opacity: Math.floor(t * 2) % 2 ? 0 : 1 }} />}
    </span>
  );
}

function Describe({ t }: { t: number }) {
  const { name, service, city } = DEMO;
  const tn = typed(name, t, 0.7, 12);
  const ts = typed(service, t, 2.3, 12);
  const tc = typed(city, t, 3.4, 12);
  const focus = t >= 3.3 ? 2 : t >= 2.2 ? 1 : t >= 0.6 ? 0 : -1;
  const calls = t >= 4.6;
  const pressed = t >= 5.8 && t < 6.05;
  const heroCity = tc || "your city";
  const heroSvc = ts || "Your service";
  return (
    <div className="absolute inset-x-0 bottom-0 top-[52px] grid grid-cols-2" style={pop(t, 0, 8)}>
      <div className="flex flex-col gap-[18px] border-r border-[#e6e8ec] bg-white px-14 py-[46px]">
        <span className="text-[10.5px] uppercase tracking-[.16em] text-[#1b46d4]" style={mono}>New page · step 1 of 3</span>
        <span className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.025em]" style={archivo}>
          Tell us who you are.
          <br />
          We&apos;ll find the search worth winning.
        </span>
        <span className="mt-1.5 text-[12px] font-semibold">Business name</span>
        <Field active={focus === 0} text={tn} />
        <div className="grid grid-cols-2 gap-3">
          <span className="flex flex-col gap-2"><span className="text-[12px] font-semibold">What you do</span><Field active={focus === 1} text={ts} /></span>
          <span className="flex flex-col gap-2"><span className="text-[12px] font-semibold">Where you work</span><Field active={focus === 2} text={tc} /></span>
        </div>
        <span className="text-[12px] font-semibold">What should the page do?</span>
        <span className="flex gap-2 text-[12.5px]">
          <span className={`flex h-[34px] items-center rounded-full px-3.5 ${calls ? "bg-[#0a0c11] text-white" : "border border-[#d3d7dd] text-[#353a44]"}`}>Get phone calls</span>
          <span className="flex h-[34px] items-center rounded-full border border-[#d3d7dd] px-3.5 text-[#353a44]">Book jobs online</span>
          <span className="flex h-[34px] items-center rounded-full border border-[#d3d7dd] px-3.5 text-[#353a44]">Collect emails</span>
        </span>
        <span className="mt-1.5 flex h-[46px] items-center self-start rounded-lg px-[22px] text-[14.5px] font-semibold text-white" style={{ background: pressed ? "#1434a8" : "#1b46d4", transform: `scale(${pressed ? 0.97 : 1})` }}>
          Research my market
        </span>
      </div>
      <div className="flex flex-col gap-4 bg-[#eceef2] px-14 py-[46px]">
        <span className="text-[10.5px] uppercase tracking-[.16em] text-[#646b78]" style={mono}>Your page is taking shape</span>
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_24px_48px_-24px_rgba(10,12,17,.35)]">
          <div className="relative h-[230px]">
            <Img src={staticFile("site/home/nora-proud.webp")} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 40%" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(12,20,45,.92) 0%, rgba(12,20,45,.55) 55%, rgba(12,20,45,.1) 100%)" }} />
            <div className="absolute left-6 right-[140px] top-7 flex flex-col gap-2 text-white">
              <span className="text-[9.5px] uppercase tracking-[.16em] text-[#9fb4ff]" style={mono}>{heroCity} · same-day service</span>
              <span className="text-[24px] font-extrabold leading-[1.05]" style={archivo}>{heroSvc} in {heroCity}, done right.</span>
              <span className="mt-1 self-start rounded-lg bg-[#1b46d4] px-3 py-2 text-[12px] font-semibold">Call now</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2.5 px-5 py-4">
            <i className="h-2 rounded bg-[#e6e8ec]" /><i className="h-2 rounded bg-[#e6e8ec]" /><i className="h-2 rounded bg-[#e6e8ec]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ t, at, title, note, noteColor = "#646b78", children }: { t: number; at: number; title: string; note: string; noteColor?: string; children: ReactNode }) {
  if (t < at) return null;
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#e6e8ec] bg-white p-5" style={pop(t, at, 12)}>
      <span className="flex justify-between text-[14px] font-semibold">
        {title}
        <span className="text-[10px] font-normal" style={{ ...mono, color: noteColor }}>{note}</span>
      </span>
      {children}
    </div>
  );
}

function Research({ t }: { t: number }) {
  const { name, service, city } = DEMO;
  const svcLow = service.toLowerCase();
  const done = STEP_DONE.filter((d) => t >= d).length;
  const rows: [string, number, boolean][] = [[`${svcLow} ${city.toLowerCase()}`, 2400, true], [`${svcLow} near me`, 1300, false], [`emergency ${svcLow}`, 480, false]];
  return (
    <div className="absolute inset-x-0 bottom-0 top-[52px] flex" style={pop(t, 7, 8)}>
      <div className="flex w-80 shrink-0 flex-col gap-[22px] border-r border-[#e6e8ec] bg-white px-[30px] py-9">
        <span className="text-[10.5px] uppercase tracking-[.16em] text-[#1b46d4]" style={mono}>Building your page</span>
        <span className="text-[25px] font-extrabold leading-[1.1] tracking-[-0.02em]" style={archivo}>Researching {name}&apos;s market</span>
        <div className="flex flex-col gap-3.5">
          {STEPS.map((l, i) => {
            const isDone = i < done, act = i === done;
            return (
              <span key={l} className="flex items-center gap-3">
                <span className={`box-border h-[18px] w-[18px] shrink-0 rounded-full ${isDone ? "bg-[#1b46d4]" : act ? "border-[1.5px] border-[#1b46d4] bg-[#eef1fc]" : "border-[1.5px] border-[#d3d7dd]"}`} />
                <span className={`text-[13.5px] ${isDone || act ? "font-semibold" : "text-[#8a909c]"}`}>{l}</span>
              </span>
            );
          })}
        </div>
        <span className="mt-auto rounded-lg bg-[#f5f6f8] px-3.5 py-3 text-[12.5px] leading-[1.5] text-[#353a44]"><b>Real search data, not a guess.</b> Usually a few minutes.</span>
      </div>
      <div className="grid flex-1 grid-cols-2 content-start gap-[18px] p-8">
        <Card t={t} at={8.0} title={`Searches in ${city}`} note="PER MONTH">
          {rows.map(([kw, n, primary], i) => {
            const grow = prog(t, 8.3 + i * 0.25, 0.8);
            return (
              <span key={kw} className="flex flex-col gap-[5px]">
                <span className="flex justify-between text-[13px]"><span className={primary ? "font-semibold text-[#1b46d4]" : "text-[#353a44]"}>{kw}</span><span className="text-[12px]" style={mono}>{Math.round(n * grow).toLocaleString("en-US")}</span></span>
                <span className="h-1.5 rounded bg-[#eef0f3]"><span className="block h-1.5 rounded" style={{ width: `${Math.round((n / 24) * grow)}%`, background: primary ? "#1b46d4" : "#9fb0ec" }} /></span>
              </span>
            );
          })}
        </Card>
        <Card t={t} at={9.8} title="Skipped on purpose" note="WRONG AUDIENCE" noteColor="#b42318">
          {[[`${svcLow} jobs ${city.toLowerCase()}`, "Job seekers, not customers"], [`diy ${svcLow}`, "People fixing it themselves"]].map(([kw, why], i) => (
            <span key={kw} className="rounded-lg border border-[#f3d3cf] bg-[#fdf5f4] px-3 py-2.5 text-[13px]">
              <span style={{ position: "relative" }}>
                {kw}
                <span style={{ position: "absolute", left: 0, top: "52%", height: 1.5, background: "#0a0c11", width: `${100 * prog(t, 10.2 + i * 0.2, 0.35)}%` }} />
              </span>
              <br />
              <span className="text-[12px] text-[#7a2a22]">{why}</span>
            </span>
          ))}
        </Card>
        <div className="col-span-2">
          <Card t={t} at={11.8} title="Questions people ask" note="INTO YOUR FAQ">
            <span className="grid grid-cols-2 gap-2 text-[13px]">
              {[`How much does ${svcLow} cost in ${city}?`, "How fast can someone come out?", "Do you charge to come out?", "Are you licensed and insured?"].map((q, i) => (
                <span key={q} className="rounded-lg bg-[#f5f6f8] px-3 py-2.5" style={pop(t, 12.0 + i * 0.15, 8)}>{q}</span>
              ))}
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Editor({ t }: { t: number }) {
  const lit = Math.max(0, Math.min(10, Math.floor((t - CHECK_AT) / CHECK_GAP) + 1));
  const ringLit = t < CHECK_AT ? 0 : lit;
  const circ = 194.8;
  const scroll = 250 * prog(t, 20.6, 1.8);
  const ready = ringLit === 10;
  const glow = ready ? 1 - prog(t, CHECK_AT + 9 * CHECK_GAP, 1.2) : 0;
  return (
    <div className="absolute inset-x-0 bottom-0 top-[52px] flex" style={pop(t, 15, 8)}>
      <div className="flex w-[196px] shrink-0 flex-col gap-0.5 border-r border-[#e6e8ec] bg-white px-2.5 py-[18px] text-[13px]">
        <span className="px-2 pb-2 text-[10px] uppercase tracking-[.14em] text-[#646b78]" style={mono}>Sections</span>
        <span className="rounded-lg bg-[#eef1fc] px-2.5 py-[9px] font-semibold text-[#1434a8]">Hero</span>
        {["Trust bar", "Services", "About", "FAQ", "Call to action"].map((x) => <span key={x} className="px-2.5 py-[9px]">{x}</span>)}
        <span className="mt-auto rounded-lg bg-[#f5f6f8] p-2.5 text-[12px] leading-[1.45] text-[#353a44]">Rewrite: <b>Shorter</b> · More urgent · Friendlier</span>
      </div>
      <div className="flex flex-1 justify-center overflow-hidden bg-[#e3e6eb] p-5">
        <div className="relative w-full overflow-hidden rounded-[10px] bg-white shadow-[0_24px_48px_-24px_rgba(10,12,17,.4)]">
          <GeneratedPage scroll={scroll} />
        </div>
      </div>
      <div className="flex w-[290px] shrink-0 flex-col gap-4 border-l border-[#e6e8ec] bg-white p-[22px]">
        <span className="flex gap-4 border-b border-[#e6e8ec] pb-2.5 text-[13px]"><b>Score</b><span className="text-[#646b78]">Research</span><span className="text-[#646b78]">AI answers</span></span>
        <div className="flex items-center gap-3.5">
          <div className="relative h-[76px] w-[76px] shrink-0">
            <span style={{ position: "absolute", inset: -14, borderRadius: 999, background: `radial-gradient(circle, rgba(21,128,61,${0.35 * glow}), transparent 70%)` }} />
            <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90" style={{ position: "relative" }}>
              <circle cx="38" cy="38" r="31" fill="none" stroke="#eceef2" strokeWidth="7" />
              <circle cx="38" cy="38" r="31" fill="none" stroke={ready ? "#15803d" : "#1b46d4"} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(circ * ringLit) / 10} ${circ}`} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[22px] font-extrabold tabular-nums" style={archivo}>{ringLit * 10}</span>
          </div>
          <span className="flex flex-col gap-0.5"><span className="text-[9.5px] uppercase tracking-[.14em] text-[#646b78]" style={mono}>SEO + AI readiness</span><span className="text-[14px] font-semibold">{ready ? "Ready to rank" : "Scoring your page"}</span></span>
        </div>
        <div className="flex flex-col gap-2 text-[12.5px]">
          {CHECKS.map((c, i) => {
            const on = t >= CHECK_AT + i * CHECK_GAP;
            const p = prog(t, CHECK_AT + i * CHECK_GAP, 0.25);
            return (
              <span key={c} className="flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold" style={{ background: on ? "#e7f3ec" : "#eef0f3", color: on ? "#15803d" : "transparent", transform: `scale(${on ? 0.7 + 0.3 * p + 0.25 * Math.sin(p * Math.PI) : 1})` }}>✓</span>
                <span className={on ? "" : "text-[#8a909c]"}>{c}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GoLive({ t }: { t: number }) {
  const { name, slug } = DEMO;
  const paid = t >= PAID_AT;
  const pressed = t >= 25.0 && t < 25.2;
  return (
    <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center" style={{ background: `rgba(10,12,17,${0.45 * prog(t, 23, 0.3)})` }}>
      <div className="w-[480px] overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.5)]" style={pop(t, 23.2, 14)}>
        <div className="relative h-[130px]">
          <Img src={staticFile("site/home/nora-proud.webp")} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 35%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="flex flex-col gap-3.5 px-7 pb-[26px] pt-1">
          <span className="text-[25px] font-extrabold leading-[1.1] tracking-[-0.02em]" style={archivo}>Put {name} on the web.</span>
          <span className="rounded-lg border border-[#e6e8ec] bg-[#f5f6f8] px-3 py-2.5 text-[12px] text-[#353a44]" style={mono}>{slug}.seo.page</span>
          <span className="flex flex-col gap-[7px] text-[13.5px]"><span>✓ Live the moment you pay</span><span>✓ Leads go to your inbox</span><span>✓ Download the HTML, yours to keep</span></span>
          <span className="flex items-baseline gap-2.5 border-t border-[#e6e8ec] pt-3"><span className="text-[32px] font-extrabold" style={archivo}>{PRICE}</span><span className="rounded-[5px] bg-[#eef1fc] px-[7px] py-1 text-[10px] uppercase tracking-[.12em] text-[#1434a8]" style={mono}>Launch price</span></span>
          <span className="flex h-12 items-center justify-center rounded-[10px] text-[15px] font-semibold text-white" style={{ background: paid ? "#15803d" : pressed ? "#1434a8" : "#1b46d4", transform: `scale(${pressed ? 0.97 : 1})` }}>
            {paid ? `Live at ${slug}.seo.page` : `Pay ${PRICE} and go live`}
          </span>
        </div>
      </div>
    </div>
  );
}

/** After the dive: the published page in a browser, with a Live badge. */
function LivePage({ t, vertical }: { t: number; vertical: boolean }) {
  const { slug } = DEMO;
  const a = prog(t, 0, 0.45);
  const scroll = 180 * prog(t, 0.8, 2.2);
  const badge = prog(t, 0.95, 0.4);
  const w = vertical ? 960 : 1300;
  const scale = w / 700;
  return (
    // Holds until the proof scene has started fading in at 0:50, so no frame goes empty.
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: a * (1 - prog(t, 2.75, 0.3)), transform: `scale(${1.08 - 0.08 * a})` }}>
      <div style={{ width: w, borderRadius: 22, overflow: "hidden", background: "white", boxShadow: "0 80px 160px -60px rgba(21,128,61,.55), 0 40px 80px -40px rgba(0,0,0,.8)" }}>
        <div style={{ height: 58, display: "flex", alignItems: "center", gap: 14, background: "#e8eaee", borderBottom: "1px solid #dcdfe4", padding: "0 22px" }}>
          <span style={{ display: "flex", gap: 8 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} style={{ width: 14, height: 14, borderRadius: 9, background: c }} />)}</span>
          <span style={{ margin: "0 auto", display: "flex", alignItems: "center", gap: 10, borderRadius: 9, background: "#f5f6f8", padding: "8px 22px", fontFamily: MONO, fontSize: 19, color: "#353a44" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.4"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            {slug}.seo.page
          </span>
        </div>
        <div style={{ height: vertical ? 1100 : 640, overflow: "hidden", position: "relative" }}>
          <div style={{ width: 700, transform: `scale(${scale})`, transformOrigin: "0 0", fontFamily: APP_SANS, color: "#0a0c11" }}>
            <GeneratedPage scroll={scroll} />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: vertical ? 1150 : 110, right: vertical ? 90 : 250, display: "flex", alignItems: "center", gap: 14, borderRadius: 999, background: "#15803d", color: "white", padding: "16px 30px", fontFamily: DISPLAY, fontWeight: 600, fontSize: 40, opacity: badge, transform: `scale(${0.6 + 0.4 * badge + 0.12 * Math.sin(badge * Math.PI)})`, boxShadow: "0 20px 50px -10px rgba(21,128,61,.7)" }}>
        <span style={{ width: 16, height: 16, borderRadius: 9, background: "#bbf7d0", boxShadow: `0 0 0 ${8 * (1 - (t % 1))}px rgba(187,247,208,${0.5 * (t % 1)})` }} />
        Live
      </div>
    </AbsoluteFill>
  );
}
