import { NextResponse } from "next/server";
import { addEmailLead } from "@/lib/store";
import { checkRateLimit } from "@/lib/ratelimit";
import { track } from "@/lib/analytics";

export const runtime = "nodejs";

/**
 * Pre-purchase email capture: the "free page plan" form. Stores the lead with
 * its context (site + keyword) so follow-up is specific, not a cold blast.
 */
export async function POST(req: Request) {
  if (!(await checkRateLimit("subscribe", req))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: {
    email?: string;
    websiteUrl?: string;
    targetKeyword?: string;
    businessName?: string;
    location?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase().slice(0, 320);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  await addEmailLead({
    email,
    websiteUrl: body.websiteUrl?.trim().slice(0, 500) || undefined,
    targetKeyword: body.targetKeyword?.trim().slice(0, 200) || undefined,
    businessName: body.businessName?.trim().slice(0, 200) || undefined,
    location: body.location?.trim().slice(0, 200) || undefined,
    createdAt: Date.now(),
  });
  await track("intake_started", { source: "email_capture", email });

  return NextResponse.json({ ok: true });
}
