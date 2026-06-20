import Stripe from "stripe";

/** Stripe client, lazily constructed so the app boots without keys. */
let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local (see .env.example).",
    );
  }
  if (!stripe) stripe = new Stripe(key);
  return stripe;
}

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
