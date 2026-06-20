import { NextResponse, after } from "next/server";
import { runGeneration, initialSteps } from "@/lib/generate";
import { saveGeneration } from "@/lib/store";
import type { Generation, Intake } from "@/lib/types";

export const runtime = "nodejs";
// Generation can take 30–90+ seconds; give the background work room on Vercel.
export const maxDuration = 300;

function newId(): string {
  return (
    "g_" +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  );
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
      {
        error:
          "The generator isn't configured yet (missing ANTHROPIC_API_KEY).",
      },
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

  // Run the pipeline after the response is sent (kept alive up to maxDuration).
  after(async () => {
    await runGeneration(id);
  });

  return NextResponse.json({ id });
}
