import { NextResponse } from "next/server";
import { initialSteps } from "@/lib/generate";
import { saveGeneration } from "@/lib/store";
import type { Generation, Intake } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

function newId(): string {
  return "g_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const intake: Intake = {
    businessName: str(body.businessName),
    service: str(body.service),
    location: str(body.location),
    targetKeyword: str(body.targetKeyword) || undefined,
    websiteUrl: str(body.websiteUrl) || undefined,
    details: str(body.details) || undefined,
    phone: str(body.phone) || undefined,
    brandColor: str(body.brandColor) || undefined,
  };

  if (!intake.businessName || !intake.service || !intake.location) {
    return NextResponse.json(
      { error: "Business name, service, and location are required." },
      { status: 400 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "The generator isn't configured yet (missing ANTHROPIC_API_KEY)." },
      { status: 503 },
    );
  }

  const id = newId();
  const gen: Generation = {
    id,
    status: "pending",
    createdAt: Date.now(),
    intake,
    steps: initialSteps(),
    paid: false,
  };
  await saveGeneration(gen);

  // The client drives the two work phases (research, build) as separate requests.
  return NextResponse.json({ id });
}
