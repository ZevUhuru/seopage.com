# Build: the Answer Console (section 01 of the homepage)

Replace the static `SearchPanel` in `app/page.tsx` with a live, scripted chat
interface that a visitor can drive. The point of the section is unchanged: the
AI answer in your market names your competitor today, and it names you once your
SEOPage is live. Today that argument is asserted by two stacked cards. It should
instead be *performed*, in a UI the visitor recognizes as an AI assistant.

## What to build

A client component, `components/AnswerConsole.tsx`, rendered where
`<SearchPanel />` is rendered now (`app/page.tsx:255`). Delete `SearchPanel`
once the new component is in place. One column, max-width matching the current
`max-w-2xl` wrapper.

### Anatomy, top to bottom

1. **Console chrome.** A `card` (existing class) with a hairline top bar: a
   small live dot and the mono label `ASK AN AI ASSISTANT`. No fake browser
   traffic lights, no vendor logos, no ChatGPT/Claude/Perplexity naming or
   marks — this is a generic assistant, not an impersonation of a real product.
2. **The thread.** A scrollable region, min-height reserved so the card never
   changes height as content streams in (compute the tallest state and lock it;
   layout shift here is the one unacceptable bug).
3. **The user turn.** A right-aligned bubble. Its text types itself in,
   character by character, with a blinking caret: `Who does emergency roof
   repair in Denver?`
4. **The assistant turn.** Left-aligned, no bubble (assistant text is flush,
   like every real assistant UI). Sequence: a three-dot thinking indicator for
   ~700ms, then the answer streams in word by word (not character by
   character — word chunks read as a real token stream and are cheaper to
   render). The competitor's name, `Apex Roofing`, is underlined in
   `#e0584b` as it lands.
5. **Sources row.** After the stream completes, source chips fade up one at a
   time: `apexroofingdenver.com`. Then, on a short delay, a right-aligned mono
   line in `#b42318`: `SUMMITROOFING.COM — NOT CITED`. That beat is the
   emotional low point of the section; give it its own pause.
6. **The control.** Below the thread, separated by a hairline: a labelled
   switch, `Publish your SEOPage`, off by default. This is the only interactive
   element and it must look obviously pressable.

### The flip

When the visitor turns the switch on:

- The assistant turn clears and re-streams. Same question, new answer, naming
  `Summit Roofing Co.` underlined in `var(--accent)`.
- The sources row resolves to a single chip: `summitroofing.com`. The
  "not cited" line is gone.
- The console's ambient accent shifts from the red register to the accent-blue
  register (top-bar dot, underline, chip border). Keep this restrained: color
  on the two or three elements that carry meaning, not a full theme swap.
- Turning the switch back off replays the original answer. The demo is
  reversible and can be played as many times as the visitor wants.

Copy for both answers is exactly what `SearchPanel` uses today — do not rewrite
it. Keep the closing caption `The answer only has room for one name · make it
yours` pinned under the console.

### Autoplay and interaction rules

- The first run starts when the console scrolls into view (IntersectionObserver,
  `threshold: 0.4`, fire once), not on mount. A section that has already
  finished animating before the reader arrives has wasted itself.
- If the visitor flips the switch mid-stream, abandon the in-flight stream
  immediately and start the new one. No queued animations, no double-typing.
- `prefers-reduced-motion: reduce`: no typing, no streaming, no dots. Render
  every state instantly and completely. The switch still works and still swaps
  the answer — the interaction survives, only the motion is dropped. Follow the
  existing pattern at `app/globals.css:260`.
- Every timer and observer is cleaned up on unmount and on state change. This
  component will be mounted for the entire life of the page; a leaked interval
  is a real bug here, not a theoretical one.

### Honesty constraint

This is a dramatization and must not read as a recorded API response. Under the
console, in the existing muted mono style: `Illustrative example · not a
recorded AI response`. Small, permanent, not a tooltip. The whole page's
credibility rests on not overclaiming here, and the section is more persuasive
when it is plainly a demo the visitor controls.

## Technical constraints

- **No new dependencies.** The site currently ships zero UI or animation
  libraries and all motion is CSS (`app/globals.css:224-263`). A scripted
  typewriter is `useEffect` + a timer + `useState`; Motion, AI Elements, or a
  typewriter package would each add more weight than the feature. Hold that
  line.
- Next.js 16 App Router, React 19, Tailwind v4. `"use client"` on the new
  component only; `app/page.tsx` stays a server component.
- Use the existing design tokens and classes — `card`, `pill`, `mono`,
  `text-ink`, `text-ink-2`, `text-muted`, `border-line`, `bg-surface-2`,
  `--accent`, `--good`. Define no new colors. Any new keyframes go in
  `app/globals.css` next to `rise`, with a `prefers-reduced-motion` entry.
- Keep the script data (question, both answers, both source sets, timings) in a
  single typed const at the top of the file so the copy can be edited without
  touching animation logic.
- Accessibility: the switch is a real `<button role="switch" aria-checked>`
  with a visible focus ring. The thread is `aria-live="polite"` on the settled
  text, and mid-stream partial text is not announced — set the live region's
  content only when a stream completes.

## Scope

Section 01 only. Do not touch the hero, the stats grid, the takeaway line, the
CTA, or any other section. Do not restyle the page. Do not add analytics.

Finish the whole component, styles included, and run `npm run build` and
`npm run lint` before reporting. Report what you built in a few sentences, and
name anything you had to decide that the spec left open.
