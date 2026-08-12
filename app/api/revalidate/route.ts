import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  hasSignature,
  readWebhookHeaders,
  secretsForPublication,
  verifyHmac,
} from "@/lib/verify-webhook";
import { PUBLICATION_SLUG } from "@/lib/articles";

export const runtime = "nodejs";

/**
 * Publish/unpublish webhook from Compose. Purges the article cache tags and the
 * routes that hold rendered HTML for the affected article, so a publish is live
 * in about a second rather than waiting out the 1-hour ISR backstop.
 */

type RevalidateBody = {
  publication?: string;
  slug?: string;
  action?: "publish" | "unpublish" | "test";
  categories?: string[];
};

/** Legacy Bearer / x-revalidate-secret, accepted alongside HMAC. */
function hasValidBearer(request: NextRequest): boolean {
  const secret = process.env.ESY_REVALIDATE_SECRET;
  if (!secret) return false;
  const bearer = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "");
  const headerSecret = request.headers.get("x-revalidate-secret");
  const accepted = new Set(
    secret
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
  return (
    (bearer != null && accepted.has(bearer)) ||
    (headerSecret != null && accepted.has(headerSecret))
  );
}

export async function POST(request: NextRequest) {
  // Read the raw body ONCE — HMAC hashes the exact bytes Compose signed, so we
  // parse JSON from this string rather than calling request.json().
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Could not read body." }, { status: 400 });
  }

  let body: RevalidateBody;
  try {
    body = JSON.parse(rawBody) as RevalidateBody;
  } catch {
    return NextResponse.json({ error: "Expected JSON body." }, { status: 400 });
  }

  const headers = readWebhookHeaders((name) => request.headers.get(name));
  if (hasSignature(headers)) {
    const result = verifyHmac(rawBody, headers, secretsForPublication(body.publication));
    if (!result.ok) {
      return NextResponse.json(
        { error: `Unauthorized: ${result.reason}` },
        { status: 401 },
      );
    }
  } else if (!hasValidBearer(request)) {
    if (!process.env.ESY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "No webhook secret configured (set ESY_REVALIDATE_SECRET)." },
        { status: 500 },
      );
    }
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const publication = body.publication?.trim();
  const slug = body.slug?.trim();

  if (publication && publication !== PUBLICATION_SLUG) {
    return NextResponse.json(
      { error: `Unknown publication "${publication}" (expected "${PUBLICATION_SLUG}").` },
      { status: 400 },
    );
  }
  if (!slug) {
    return NextResponse.json({ error: "Expected body with slug." }, { status: 400 });
  }

  // Next 16 takes a cache-life profile; "max" expires every entry carrying the
  // tag regardless of age, which is what a publish event means.
  revalidateTag("published-articles", "max");
  revalidateTag(`published-articles:${PUBLICATION_SLUG}`, "max");

  const paths = ["/agentic", `/agentic/${slug}`, "/sitemap.xml"];
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    action: body.action ?? "publish",
    publication: PUBLICATION_SLUG,
    slug,
    paths,
  });
}
