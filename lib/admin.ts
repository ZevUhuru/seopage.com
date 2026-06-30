import { timingSafeEqual } from "crypto";

/**
 * Minimal gate for the internal /admin order lookup. Set ADMIN_TOKEN in the
 * environment and pass it as `?key=...`. With no token configured, admin is
 * locked (fails closed) so it can never be left wide open by accident.
 */
export function isAdmin(key: string | undefined | null): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || !key) return false;
  const a = Buffer.from(key);
  const b = Buffer.from(expected);
  // Constant-time compare; length check first since timingSafeEqual throws on mismatch.
  return a.length === b.length && timingSafeEqual(a, b);
}
