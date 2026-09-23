"use client";

import { useState } from "react";
import type { Submission } from "@/lib/types";
import { hostFromUrl } from "@/lib/types";
import { ROE_TEXT } from "@/lib/roe";

const STEP_ORDER: Submission["status"][] = [
  "qualified",
  "ownership_verified",
  "authorization_signed",
  "paid",
  "delivered",
];

function stepIndex(status: Submission["status"]): number {
  const i = STEP_ORDER.indexOf(status);
  return i === -1 ? STEP_ORDER.length - 1 : i;
}

export function VerifyWizard({ submission: initial }: { submission: Submission }) {
  const [submission, setSubmission] = useState(initial);
  const host = hostFromUrl(submission.target_url) ?? submission.target_url;
  const current = stepIndex(submission.status);

  return (
    <div className="space-y-10">
      <StepList current={current} />

      {submission.status === "qualified" && (
        <OwnershipStep submission={submission} host={host} onVerified={setSubmission} />
      )}

      {submission.status === "ownership_verified" && (
        <AuthorizationStep submission={submission} onSigned={setSubmission} />
      )}

      {submission.status === "authorization_signed" && (
        <PaymentStep submission={submission} />
      )}

      {(submission.status === "paid" || submission.status === "delivered") && (
        <div className="rounded-lg border border-[var(--green)]/40 bg-[var(--surface)] p-5 text-sm">
          <span className="text-[var(--green)]">✓ Paid.</span> Check your
          inbox — we sent a scope recap and next steps to{" "}
          <strong>{submission.business_email}</strong>.
        </div>
      )}
    </div>
  );
}

function StepList({ current }: { current: number }) {
  const labels = ["Verify ownership", "Sign authorization", "Pay", "Delivered"];
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {labels.map((label, i) => (
        <div
          key={label}
          className={`rounded-full border px-3 py-1 ${
            i <= current
              ? "border-[var(--fg)]/30 text-[var(--fg)]"
              : "border-[var(--border)] text-[var(--muted)]"
          }`}
        >
          {i < current ? "✓ " : ""}
          {label}
        </div>
      ))}
    </div>
  );
}

function OwnershipStep({
  submission,
  host,
  onVerified,
}: {
  submission: Submission;
  host: string;
  onVerified: (s: Submission) => void;
}) {
  const [checking, setChecking] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkFile() {
    setChecking(true);
    setError(null);
    try {
      const res = await fetch("/api/verify/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: submission.id }),
      });
      const data = await res.json();
      if (data.verified) {
        onVerified({ ...submission, status: "ownership_verified" });
      } else {
        setError("We couldn't find the token yet. Double-check the file and try again.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setChecking(false);
    }
  }

  async function sendEmail() {
    setError(null);
    try {
      await fetch("/api/verify/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: submission.id }),
      });
      setEmailSent(true);
    } catch {
      setError("Couldn't send the email. Try again.");
    }
  }

  return (
    <section>
      <h2 className="text-xl font-semibold">Prove you own this target</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Payment stays locked until this is verified. Pick one method.
      </p>

      <div className="mt-6 rounded-lg border border-[var(--border)] p-5">
        <div className="text-sm font-medium">Option A — host a token file</div>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Publish a file containing exactly this token at either URL on{" "}
          <code className="text-[var(--fg)]">{host}</code>:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--bg)] p-3 text-xs">
{`https://${host}/.well-known/breakpoint-verify.txt
https://${host}/breakpoint-verify.txt`}
        </pre>
        <p className="mt-3 text-sm">
          Token: <code className="text-[var(--fg)]">{submission.verification_token}</code>
        </p>
        <button
          onClick={checkFile}
          disabled={checking}
          className="mt-4 rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--border-hover)] disabled:opacity-50"
        >
          {checking ? "Checking…" : "I've published it — check now"}
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-[var(--border)] p-5">
        <div className="text-sm font-medium">Option B — confirm by email</div>
        <p className="mt-2 text-sm text-[var(--muted)]">
          We&apos;ll send a confirmation link to{" "}
          <strong>{submission.business_email}</strong>. Clicking it proves you
          control an inbox on this domain.
        </p>
        <button
          onClick={sendEmail}
          disabled={emailSent}
          className="mt-4 rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--border-hover)] disabled:opacity-50"
        >
          {emailSent ? "Email sent — check your inbox" : "Send confirmation email"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-[var(--red)]">{error}</p>}
    </section>
  );
}

function AuthorizationStep({
  submission,
  onSigned,
}: {
  submission: Submission;
  onSigned: (s: Submission) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      id: submission.id,
      fullName: String(form.get("fullName") ?? ""),
      title: String(form.get("title") ?? ""),
      exclusionsAck: form.get("exclusionsAck") === "on",
      authorityAck: form.get("authorityAck") === "on",
    };
    try {
      const res = await fetch("/api/authorization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't sign. Try again.");
        setSubmitting(false);
        return;
      }
      onSigned({ ...submission, status: "authorization_signed" });
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h2 className="text-xl font-semibold">Sign scope authorization</h2>
      <pre className="mt-4 max-h-72 overflow-y-auto whitespace-pre-wrap rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-xs leading-relaxed text-[var(--muted)]">
        {ROE_TEXT}
      </pre>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">Full legal name</label>
            <input
              name="fullName"
              required
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--border-hover)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">Title</label>
            <input
              name="title"
              required
              placeholder="CTO, Founder, ..."
              className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--border-hover)]"
            />
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="exclusionsAck" required className="mt-1" />
          <span>I have read and agree to the rules of engagement above, including the exclusions.</span>
        </label>

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="authorityAck" required className="mt-1" />
          <span>I declare that I am authorized to permit security testing against this target on behalf of my company.</span>
        </label>

        {error && <p className="text-sm text-[var(--red)]">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-[var(--fg)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Signing…" : "Sign and continue"}
        </button>
      </form>
    </section>
  );
}

function PaymentStep({ submission }: { submission: Submission }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: submission.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Couldn't start checkout.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  }

  return (
    <section>
      <h2 className="text-xl font-semibold">Pay to start the 72-hour clock</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        99€. The clock starts once we receive working access, not at payment.
      </p>
      {error && <p className="mt-3 text-sm text-[var(--red)]">{error}</p>}
      <button
        onClick={pay}
        disabled={loading}
        className="mt-4 rounded-md bg-[var(--fg)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Pay 99€ with Stripe"}
      </button>
    </section>
  );
}
