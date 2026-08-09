"use client";

import { useState } from "react";
import { Field } from "./Field";
import { AUDIT_HOURS } from "@/lib/config";

/**
 * The free page audit request. Deliberately three fields: every competitor
 * ranking for this term is an instant automated scorer, so the one thing we
 * must not do is make a human-reviewed audit feel like more work than a
 * robot's. URL and keyword are what make the audit specific; everything else
 * we can find ourselves.
 */
export function AuditRequestForm() {
  const [pageUrl, setPageUrl] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldError(null);

    if (!pageUrl.trim()) {
      setError("Add the page you want audited.");
      return;
    }
    if (!targetKeyword.trim()) {
      setError("Add the search you want that page to win.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setFieldError("Enter a valid email.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          websiteUrl: pageUrl,
          targetKeyword,
          source: "page_audit",
        }),
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
          Your audit is queued.
        </p>
        <p className="mx-auto mt-2 max-w-lg text-ink-2">
          We&apos;ll run{" "}
          <span className="font-semibold text-ink">{pageUrl.trim()}</span>{" "}
          against the results for{" "}
          <span className="font-semibold text-ink">
            &ldquo;{targetKeyword.trim()}&rdquo;
          </span>{" "}
          and email you the findings within {AUDIT_HOURS} hours. It comes from a
          person, not an autoresponder, so check your spam folder if it
          doesn&apos;t appear.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" id="free-audit">
      <p className="text-lg font-semibold text-ink">
        Get your free page audit
      </p>
      <p className="mt-1 text-ink-2">
        One page, one search, reviewed by a person. In your inbox within{" "}
        {AUDIT_HOURS} hours. No account, no card, no call.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          label="Page to audit"
          placeholder="https://yourbusiness.com/services"
          value={pageUrl}
          onChange={setPageUrl}
        />
        <Field
          label="Search it should win"
          placeholder="emergency roof repair Denver"
          value={targetKeyword}
          onChange={setTargetKeyword}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Field
            label="Where should we send it?"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={setEmail}
            error={fieldError ?? undefined}
          />
        </div>
        <button type="submit" className="btn btn-accent h-12 px-6" disabled={busy}>
          {busy ? "Sending…" : "Audit my page — free"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-[#b42318]" role="alert">
          {error}
        </p>
      )}

      <p className="mono mt-4 text-[10px] uppercase tracking-[0.14em] text-muted">
        We audit a limited number of pages a day &middot; first come, first
        served
      </p>
    </form>
  );
}
