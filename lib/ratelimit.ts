import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Sliding-window rate limiting for the public write endpoints. Backed by the
 * same Upstash Redis as the store; when Redis isn't configured (local dev)
 * every check passes so the fallback store keeps working friction-free.
 */

function redisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const g = globalThis as unknown as { __seopageRlRedis?: Redis };
  if (!g.__seopageRlRedis) g.__seopageRlRedis = new Redis({ url, token });
  return g.__seopageRlRedis;
}

type LimiterName = "order" | "subscribe" | "generate";

const LIMITS: Record<LimiterName, { requests: number; window: `${number} ${"s" | "m" | "h"}` }> = {
  order: { requests: 10, window: "1 h" },
  subscribe: { requests: 5, window: "1 h" },
  generate: { requests: 10, window: "1 h" },
};

const limiters = new Map<LimiterName, Ratelimit>();

function limiter(name: LimiterName): Ratelimit | null {
  const redis = redisClient();
  if (!redis) return null;
  let rl = limiters.get(name);
  if (!rl) {
    const { requests, window } = LIMITS[name];
    rl = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(requests, window),
      prefix: `seopage:rl:${name}`,
    });
    limiters.set(name, rl);
  }
  return rl;
}

/** Extract the caller's IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

/** Returns true when the request is allowed. No-op (allow) without Redis. */
export async function checkRateLimit(
  name: LimiterName,
  req: Request,
): Promise<boolean> {
  const rl = limiter(name);
  if (!rl) return true;
  try {
    const { success } = await rl.limit(clientIp(req));
    return success;
  } catch {
    // A broken limiter should never take down checkout-adjacent endpoints.
    return true;
  }
}
