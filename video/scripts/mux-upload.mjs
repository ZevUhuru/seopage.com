// Uploads a rendered cut to Mux through api.esy.com's media broker (Esy owns
// the record; the bytes go straight to Mux), waits until it can play, then
// writes the playback id into the rank¹ article.
//
//   ESY_API_KEY=… node scripts/mux-upload.mjs [file] [article-slug]
//
// Defaults: the YouTube master, and the explainer case study.
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2] || join(root, "out/final/seopage-youtube-16x9.mp4");
const slug = process.argv[3] || "how-we-made-our-explainer-video";
const API = process.env.ESY_API_URL || "https://api.esy.com";
const KEY = process.env.ESY_API_KEY;
if (!KEY) {
  console.error("Set ESY_API_KEY to an Esy API key for the SEOPage workspace.");
  process.exit(1);
}
const esy = async (path, init = {}) => {
  const res = await fetch(API + path, { ...init, headers: { authorization: `Bearer ${KEY}`, "content-type": "application/json", ...init.headers } });
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path} → ${res.status} ${await res.text()}`);
  return res.json();
};

const { uploadId, uploadUrl } = await esy("/v1/media/uploads", { method: "POST" });
console.log(`upload ${uploadId}: sending ${(statSync(file).size / 1e6).toFixed(1)} MB`);
const put = await fetch(uploadUrl, { method: "PUT", body: readFileSync(file), headers: { "content-type": "video/mp4" } });
if (!put.ok) throw new Error(`Mux PUT → ${put.status} ${await put.text()}`);

let status;
for (let i = 0; i < 120; i++) {
  status = await esy(`/v1/media/uploads/${uploadId}`);
  if (status.status === "ready" || status.status === "errored") break;
  process.stdout.write(`${status.status}… `);
  await new Promise((r) => setTimeout(r, 5000));
}
console.log();
if (status.status !== "ready" || !status.playbackId) throw new Error(`upload ended ${status.status}: ${status.error ?? "no playback id"}`);
console.log(`ready: playback id ${status.playbackId}`);

// Wire it into the article (the seed registry is the source of record for it).
const articles = join(root, "../data/agentic-articles.ts");
const src = readFileSync(articles, "utf8");
const at = src.indexOf(`slug: "${slug}"`);
if (at < 0) throw new Error(`no article ${slug} in data/agentic-articles.ts`);
const line = `    muxPlaybackId: "${status.playbackId}",\n`;
const insertAt = src.indexOf("\n", src.indexOf("relatedSlugs:", at)) + 1;
const already = src.slice(at, src.indexOf("content:", at)).includes("muxPlaybackId:");
if (already) {
  console.log("article already has a muxPlaybackId; not overwriting. Set it by hand if this replaces it.");
} else {
  writeFileSync(articles, src.slice(0, insertAt) + line + src.slice(insertAt));
  console.log(`wrote muxPlaybackId into ${slug}`);
}
