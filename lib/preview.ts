/**
 * Produce a watermarked, non-exportable version of the generated page.
 * The user sees the full quality (the value moment) but can't cleanly lift it
 * without paying. The clean HTML is only served by the gated export route.
 */
export function watermarkHtml(html: string): string {
  const overlay = `
<style id="seopage-wm">
  html, body { -webkit-user-select: none; -moz-user-select: none; user-select: none; }
  #seopage-wm-layer {
    position: fixed; inset: 0; z-index: 2147483000; pointer-events: none;
    background-image: repeating-linear-gradient(
      -28deg, rgba(79,70,229,0.045), rgba(79,70,229,0.045) 2px,
      transparent 2px, transparent 26px
    );
  }
  #seopage-wm-layer .wm-row {
    position: absolute; left: -20%; right: -20%;
    display: flex; gap: 90px; justify-content: center;
    transform: rotate(-28deg);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 26px; font-weight: 700; letter-spacing: 0.16em;
    color: rgba(79,70,229,0.16); white-space: nowrap;
  }
  #seopage-wm-bar {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 2147483001;
    background: #0b0b0f; color: #fff; pointer-events: none;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
    text-align: center; padding: 9px 12px;
  }
  @media print { html { display: none !important; } }
</style>
<div id="seopage-wm-layer" aria-hidden="true">
  ${Array.from({ length: 9 })
    .map(
      (_, i) =>
        `<div class="wm-row" style="top:${i * 12}%">${"PREVIEW · SEOPAGE.COM · ".repeat(
          6,
        )}</div>`,
    )
    .join("")}
</div>
<div id="seopage-wm-bar">Watermarked preview · get the finished page for $29</div>
`;

  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${overlay}</body>`);
  }
  return html + overlay;
}
