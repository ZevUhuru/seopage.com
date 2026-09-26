// Prints width, height, fps, and duration for each media file given, using
// Remotion's bundled ffprobe (no system ffmpeg needed).
import { execFileSync } from "node:child_process";

for (const file of process.argv.slice(2)) {
  const out = execFileSync("npx", ["remotion", "ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate:format=duration", "-of", "json", file], { encoding: "utf8" });
  const j = JSON.parse(out);
  const v = j.streams.find((s) => s.codec_type === "video");
  const a = j.streams.find((s) => s.codec_type === "audio");
  console.log(`${file}  ${v ? `${v.width}x${v.height} @${v.r_frame_rate}` : "no video"}  ${a ? "audio" : "no audio"}  ${Number(j.format.duration).toFixed(2)}s`);
}
