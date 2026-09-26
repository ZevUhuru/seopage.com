import { AbsoluteFill } from "remotion";
import cues from "./cues.json";
import manifest from "../public/audio/manifest.json";
import { captionChunks } from "./lib/captions.mjs";
import { SANS } from "./lib/fonts";
import { useT } from "./lib/motion";

const files = manifest as Record<string, { sec: number }>;

/** Burned-in captions for sound-off feeds, kept inside the platform safe zones. */
export function Captions({ offset = 0, vertical = false }: { offset?: number; vertical?: boolean }) {
  const t = useT() + offset;
  const c = captionChunks(cues, files, vertical ? 30 : 48, { burnedOnly: true }).find((x) => t >= x.start && t < x.end + 0.08);
  if (!c) return null;
  // Vertical: the box ends at y≈1240, just above the bottom 35% that Reels and TikTok cover.
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: vertical ? 690 : 34, pointerEvents: "none" }}>
      <span style={{ maxWidth: vertical ? 900 : 1500, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: vertical ? 54 : 44, lineHeight: 1.2, color: "white", background: "rgba(4,6,11,.72)", borderRadius: 14, padding: vertical ? "12px 24px" : "10px 22px" }}>
        {c.text}
      </span>
    </AbsoluteFill>
  );
}
