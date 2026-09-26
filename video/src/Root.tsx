import "./styles.css";
import { Composition, Still } from "remotion";
import { FPS, s } from "./lib/brand";
import { Master } from "./Master";
import { ThumbAlarm, ThumbCited, ThumbSplit } from "./Thumbs";
import { BannerNora, BannerSteps, BannerType, ProfileMark, ProfileNora, ProfileWordmark } from "./Channel";

/**
 * Master: YouTube (captions ship as an .srt, so viewers can turn them off).
 * MasterCaptioned: LinkedIn and X, which autoplay muted.
 * Vertical: Reels, TikTok, Shorts, with captions above the bottom safe zone.
 */
export function Root() {
  return (
    <>
      <Composition id="Master" component={Master} durationInFrames={s(75)} fps={FPS} width={1920} height={1080} defaultProps={{ captions: false, vertical: false }} />
      <Composition id="MasterCaptioned" component={Master} durationInFrames={s(75)} fps={FPS} width={1920} height={1080} defaultProps={{ captions: true, vertical: false }} />
      <Composition id="Vertical" component={Master} durationInFrames={s(75)} fps={FPS} width={1080} height={1920} defaultProps={{ captions: true, vertical: true }} />
      <Still id="ThumbAlarm" component={ThumbAlarm} width={1920} height={1080} />
      <Still id="ThumbCited" component={ThumbCited} width={1920} height={1080} />
      <Still id="ThumbSplit" component={ThumbSplit} width={1920} height={1080} />
      <Still id="ProfileMark" component={ProfileMark} width={800} height={800} />
      <Still id="ProfileWordmark" component={ProfileWordmark} width={800} height={800} />
      <Still id="ProfileNora" component={ProfileNora} width={800} height={800} />
      <Still id="BannerType" component={BannerType} width={2560} height={1440} />
      <Still id="BannerNora" component={BannerNora} width={2560} height={1440} />
      <Still id="BannerSteps" component={BannerSteps} width={2560} height={1440} />
    </>
  );
}
