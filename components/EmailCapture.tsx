"use client";

import { useState } from "react";
import { Field } from "./Field";

/**
 * Pre-footer lead capture for visitors who aren't ready to buy: leave a site,
 * a keyword, and an email — get your market's AI verdict plus the plan for
 * the page we'd build. High-intent context beats a bare newsletter signup.
 */
export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Enter a valid email.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, websiteUrl, targetKeyword }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="card p-6 text-center sm:p-8">
        <p className="text-lg font-semibold text-ink">
          Got it — watch your inbox.
        </p>
        <p className="mt-2 text-ink-2">
          We&apos;ll check how AI answers{" "}
          {targetKeyword.trim() ? (
            <span className="font-semibold text-ink">
              &ldquo;{targetKeyword.trim()}&rdquo;
            </span>
          ) : (
            "your market"
          )}{" "}
          today and email you the verdict — who&apos;s being cited, and the
          page we&apos;d build to change it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <p className="text-lg font-semibold text-ink">
        Not ready? Get your market&apos;s AI verdict — free.
      </p>
      <p className="mt-1 text-ink-2">
        Tell us your site and target keyword. We&apos;ll check how AI answers
        your market today and email you the verdict — who&apos;s being cited,
        and the page we&apos;d build to change it. No commitment.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          label="Your website"
          placeholder="https://yourbusiness.com"
          value={websiteUrl}
          onChange={setWebsiteUrl}
        />
        <Field
          label="Target keyword"
          placeholder="emergency roof repair Denver"
          value={targetKeyword}
          onChange={setTargetKeyword}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Field
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={setEmail}
            error={error ?? undefined}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary btn-md shrink-0 disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send my AI verdict"}
        </button>
      </div>
    </form>
  );
}
