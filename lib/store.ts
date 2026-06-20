import { promises as fs } from "fs";
import os from "os";
import path from "path";
import type { Generation, GenerationView, StepState } from "./types";

/**
 * Minimal persistence for the MVP. No database required.
 *
 * Source of truth is an in-process Map (instant, survives across requests on a
 * warm server / local dev). Each record is ALSO mirrored to a temp file so the
 * pay → export handoff survives a process restart on the same instance. This is
 * deliberately the simplest thing that works; swap this module for Redis/Postgres
 * later without touching callers.
 *
 * Note for serverless (Vercel): in-memory state is per-instance. For a high-
 * traffic production deploy you'd move this to a shared store. For validating
 * the $29 funnel it is sufficient and documented in the README.
 */

const DIR = path.join(os.tmpdir(), "seopage-generations");

type Store = { map: Map<string, Generation> };
const g = globalThis as unknown as { __seopageStore?: Store };
const store: Store = g.__seopageStore ?? { map: new Map() };
g.__seopageStore = store;

async function persist(gen: Generation): Promise<void> {
  try {
    await fs.mkdir(DIR, { recursive: true });
    await fs.writeFile(
      path.join(DIR, `${gen.id}.json`),
      JSON.stringify(gen),
      "utf8",
    );
  } catch {
    // Best-effort; the in-memory copy remains authoritative.
  }
}

async function loadFromDisk(id: string): Promise<Generation | undefined> {
  try {
    const raw = await fs.readFile(path.join(DIR, `${id}.json`), "utf8");
    return JSON.parse(raw) as Generation;
  } catch {
    return undefined;
  }
}

export async function getGeneration(
  id: string,
): Promise<Generation | undefined> {
  const inMem = store.map.get(id);
  if (inMem) return inMem;
  const fromDisk = await loadFromDisk(id);
  if (fromDisk) store.map.set(id, fromDisk);
  return fromDisk;
}

export async function saveGeneration(gen: Generation): Promise<void> {
  store.map.set(gen.id, gen);
  await persist(gen);
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

export async function setSteps(
  id: string,
  steps: StepState[],
): Promise<void> {
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
