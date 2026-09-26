# SEOPage explainer video

A 75-second explainer for YouTube and social, made in code with
[Remotion](https://www.remotion.dev) (React → MP4). It tells the homepage's
story: someone asks AI who to hire, the answer names someone else, Nora builds
the page AI can quote in four steps (describe, research, score, go live), our
own sites' citations as proof, then the offer.

It is its own npm package so the site's build never sees it (the root
`tsconfig.json` and ESLint config ignore `video/`).

```bash
cd video
npm install
npm run studio        # live preview and scrubbing at localhost:3000
npm run audio         # generate voice, sound effects, and score (ElevenLabs)
npm run cues          # per-second sound map + out/seopage-explainer.en.srt
npm run render        # all cuts → out/final/, loudness-mastered
```

## Cuts

| Composition | File | For |
|---|---|---|
| `Master` | `seopage-youtube-16x9.mp4` | YouTube. Upload `out/seopage-explainer.en.srt` as captions. |
| `MasterCaptioned` | `seopage-captioned-16x9.mp4` | LinkedIn, X, anywhere that autoplays muted. |
| `Vertical` | `seopage-vertical-9x16.mp4` | Reels, TikTok, Shorts. Text and captions stay out of the bottom 35% and top 14% the apps cover. |

Same timeline and soundtrack in every cut; the vertical one lays each scene
out again rather than cropping.

## How it's built

- `src/Master.tsx`: the beat list. Each scene starts its own clock at `at`
  seconds on the master and cross-fades into the next.
- `src/scenes/Builder.tsx`: the builder at create.seopage.com, ported from
  `components/home/BuilderDemo.tsx` at its true size, driven frame by frame,
  with a virtual camera and pointer.
- `src/cues.json`: every sound, on the master's seconds. Voice lines (with the
  caption text), sound-effect prompts, the score prompt, and each hit's time
  and level. `npm run cues` fails if any second is just music.
- `src/Soundtrack.tsx`: plays it all, ducking the score about 18 dB under
  the voice.
- `scripts/gen-audio.mjs`: generates only what is missing or changed, and
  records the model, prompt, and request id of each file in
  `public/audio/provenance.json`.
- `scripts/levels.mjs --write`: generated files arrive anywhere from −3 to
  −45 LUFS, so each gets a leveled copy in `public/audio/lev/` at the voice's
  loudness (never boosted past −1 dBTP or +18 dB). That is what makes a `vol`
  in `cues.json` mean "relative to the voice". Run it after any `npm run audio`.
- `scripts/voice-set.mjs`: the whole read in several voices
  (`public/audio/voices/<id>/`); `--use <id>` switches the video's voice
  without calling ElevenLabs, then run `levels.mjs --write`.
- `scripts/render.mjs`: renders, then two-pass `loudnorm` to −14 LUFS
  integrated and −1 dBTP true peak, using Remotion's bundled ffmpeg.

The Nora clips, service photos, and Ahrefs screenshots are copied from the
site's `public/` at build time (`npm run assets`), not committed twice.

## Changing things

- **Price.** `src/lib/brand.ts`. It mirrors `lib/config.ts` here and in
  create.seopage.com; a rendered file can't read those, so re-render every cut
  when it changes. The voice says it too (`vo12` in `cues.json`).
- **A voice line.** Edit its `text` (what's spoken) and `caption` (what's
  shown), run `npm run audio`, and it warns if the new read overruns its
  `slot`.
- **The voice.** `npm run audio -- --voices`, then
  `npm run audio -- --audition <voice_id>`, then set `voice.voiceId`.

## Rules the video keeps

- Nora is an illustration and is labeled as one whenever she's on screen.
- Proof is our own sites, labeled "not client results", from Ahrefs as shown
  on the homepage. No customer appears.
- Every stat shows its source, the same ones the homepage cites.
- The AI chat is a generic assistant, not any real product's interface, and
  the competitor is a placeholder.
