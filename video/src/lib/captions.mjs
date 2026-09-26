// Shared by the burned-in captions (src/Captions.tsx) and the .srt export
// (scripts/cue-sheet.mjs), so both always show the same words at the same time.

/** Splits a line into chunks of at most `max` characters, on word boundaries. */
export function chunk(text, max) {
  const out = [];
  let cur = "";
  for (const w of text.split(" ")) {
    if (cur && (cur + " " + w).length > max) {
      out.push(cur);
      cur = w;
    } else cur = cur ? cur + " " + w : w;
  }
  if (cur) out.push(cur);
  return out;
}

/** Caption chunks with start/end seconds, each line's time split by chunk length. */
export function captionChunks(cues, manifest, max, { burnedOnly = false } = {}) {
  // `burn: false` marks a line whose words are already on screen as kinetic
  // type; burned captions skip it, the .srt keeps it.
  return cues.vo.filter((v) => !burnedOnly || v.burn !== false).flatMap((v) => {
    const dur = manifest[v.id]?.sec ?? v.slot;
    const parts = chunk(v.caption, max);
    const total = parts.reduce((n, p) => n + p.length, 0);
    let at = v.at;
    return parts.map((p) => {
      const d = (dur * p.length) / total;
      const c = { start: at, end: at + d, text: p };
      at += d;
      return c;
    });
  });
}
