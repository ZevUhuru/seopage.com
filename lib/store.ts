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

// Non-converting intakes are kept (in full, including the page they were shown)
// for 90 days — that's demand data + the exact page that didn't convert. Paid
// orders are kept forever.
const TTL_SECONDS = 60 * 60 * 24 * 90;
const KEY = (id: string) => `seopage:gen:${id}`;
// Index of every intake ever started (leads), and of paid orders. Both let the
// /admin view enumerate records without scanning keys. SESSION_KEY maps a Stripe
// Checkout Session back to its generation for lookup-by-receipt.
const LEADS_SET = "seopage:leads";
const PAID_SET = "seopage:paid";
const SESSION_KEY = (sessionId: string) => `seopage:session:${sessionId}`;

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

/** Read every persisted generation from the local fallback (dev only). */
async function fileAll(): Promise<Generation[]> {
  const byId = new Map<string, Generation>(mem.map);
  try {
    const files = await fs.readdir(DIR);
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      const id = f.slice(0, -5);
      if (byId.has(id)) continue;
      try {
        const raw = await fs.readFile(path.join(DIR, f), "utf8");
        byId.set(id, JSON.parse(raw) as Generation);
      } catch {
        /* skip unreadable */
      }
    }
  } catch {
    /* no dir yet */
  }
  return [...byId.values()];
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
    // Every intake is a lead — index it so /admin can list non-converters too.
    await redis.sadd(LEADS_SET, gen.id);
    if (gen.paid) {
      // Persist paid orders permanently (no TTL) and index them for auditing.
      await redis.set(KEY(gen.id), gen);
      await redis.sadd(PAID_SET, gen.id);
      if (gen.stripeSessionId) {
        await redis.set(SESSION_KEY(gen.stripeSessionId), gen.id);
      }
    } else {
      // Non-converting intakes: keep the full record (incl. html) for 90 days.
      await redis.set(KEY(gen.id), gen, { ex: TTL_SECONDS });
    }
    return;
  }
  await fileSave(gen);
}

/** Fetch a set of generations by id, dropping any that have expired. */
async function getMany(ids: string[]): Promise<Generation[]> {
  if (!ids.length) return [];
  const rows = await redisClient()!.mget<Generation[]>(...ids.map(KEY));
  return rows.filter((g): g is Generation => Boolean(g));
}

/**
 * Every intake ever started (paid or not), newest first — demand data plus the
 * exact page each visitor saw. Non-converters drop off after the 90-day TTL.
 */
export async function listAllGenerations(): Promise<Generation[]> {
  const redis = redisClient();
  const gens = redis
    ? await getMany(await redis.smembers(LEADS_SET))
    : await fileAll();
  return gens.sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Every paid order, newest first. The durable audit trail of what customers
 * actually received (each record carries the intake and the delivered html).
 */
export async function listPaidGenerations(): Promise<Generation[]> {
  const redis = redisClient();
  const gens = redis
    ? await getMany(await redis.smembers(PAID_SET))
    : (await fileAll()).filter((g) => g.paid);
  return gens.sort((a, b) => b.createdAt - a.createdAt);
}

/** Look up an order by its Stripe Checkout Session id. */
export async function getGenerationBySession(
  sessionId: string,
): Promise<Generation | undefined> {
  const redis = redisClient();
  if (redis) {
    const id = await redis.get<string>(SESSION_KEY(sessionId));
    return id ? getGeneration(id) : undefined;
  }
  return (await fileAll()).find((g) => g.stripeSessionId === sessionId);
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
