import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { Redis } from "@upstash/redis";
import type { Generation, GenerationView, StepState } from "./types";

/**
 * Persistence for generations.
 *
 * In production (Vercel), serverless instances don't share memory, so we use a
 * shared Redis store (Upstash / Vercel KV). When no Redis credentials are
 * present (local dev), we fall back to an in-process map mirrored to a temp
 * file. Same async interface either way — callers don't care which is active.
 *
 * Provision Redis: Vercel → Storage → Upstash (Redis). It injects the env vars
 * automatically. Locally you can leave them unset and the file fallback runs.
 */

const TTL_SECONDS = 60 * 60 * 24 * 7; // keep generations a week
const KEY = (id: string) => `seopage:gen:${id}`;

/* ------------------------------- redis path ------------------------------ */

function redisClient(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const g = globalThis as unknown as { __seopageRedis?: Redis };
  if (!g.__seopageRedis) g.__seopageRedis = new Redis({ url, token });
  return g.__seopageRedis;
}

/* ----------------------- local file/memory fallback ---------------------- */

const DIR = path.join(os.tmpdir(), "seopage-generations");
type Mem = { map: Map<string, Generation> };
const gm = globalThis as unknown as { __seopageStore?: Mem };
const mem: Mem = gm.__seopageStore ?? { map: new Map() };
gm.__seopageStore = mem;

async function fileSave(gen: Generation): Promise<void> {
  mem.map.set(gen.id, gen);
  try {
    await fs.mkdir(DIR, { recursive: true });
    await fs.writeFile(path.join(DIR, `${gen.id}.json`), JSON.stringify(gen), "utf8");
  } catch {
    /* best effort */
  }
}

async function fileGet(id: string): Promise<Generation | undefined> {
  const inMem = mem.map.get(id);
  if (inMem) return inMem;
  try {
    const raw = await fs.readFile(path.join(DIR, `${id}.json`), "utf8");
    const gen = JSON.parse(raw) as Generation;
    mem.map.set(id, gen);
    return gen;
  } catch {
    return undefined;
  }
}

/* ------------------------------- public API ------------------------------ */

export async function getGeneration(
  id: string,
): Promise<Generation | undefined> {
  const redis = redisClient();
  if (redis) {
    const gen = await redis.get<Generation>(KEY(id));
    return gen ?? undefined;
  }
  return fileGet(id);
}

export async function saveGeneration(gen: Generation): Promise<void> {
  const redis = redisClient();
  if (redis) {
    await redis.set(KEY(gen.id), gen, { ex: TTL_SECONDS });
    return;
  }
  await fileSave(gen);
}

export async function updateGeneration(
  id: string,
  patch: Partial<Generation>,
): Promise<Generation | undefined> {
  const current = await getGeneration(id);
  if (!current) return undefined;
  const next = { ...current, ...patch };
  await saveGeneration(next);
  return next;
}

export async function setSteps(id: string, steps: StepState[]): Promise<void> {
  await updateGeneration(id, { steps });
}

/** Strip private fields (full HTML) for status polling. */
export function toView(gen: Generation): GenerationView {
  return {
    id: gen.id,
    status: gen.status,
    steps: gen.steps,
    error: gen.error,
    meta: gen.meta,
    paid: gen.paid,
    hasResult: Boolean(gen.html),
  };
}
