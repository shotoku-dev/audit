"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Section, Heading, Lede } from "./Container";

const ACCESS_TYPES = [
  "Staging endpoint",
  "Test account on production",
  "API docs only",
  "Not sure yet — advise me",
];

const INPUT_CLASS =
  "w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--border-hover)]";

export function IntakeForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      businessEmail: String(form.get("businessEmail") ?? ""),
      companyName: String(form.get("companyName") ?? ""),
      targetUrl: String(form.get("targetUrl") ?? ""),
      accessType: String(form.get("accessType") ?? ""),
      agentDescription: String(form.get("agentDescription") ?? ""),
    };
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }
      router.push(`/verify/${data.id}`);
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <Section id="audit" index="10" label="Start">
      <Heading>Tell me about your agent.</Heading>
      <Lede>
        This submits nothing to your systems and charges nothing. The next
        screen is domain verification — you can stop there and nothing has
        happened.
      </Lede>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_260px] md:gap-14">
        <form onSubmit={onSubmit} className="space-y-5">
          <Field
            label="Business email"
            hint="Company domain required — free providers are rejected"
            name="businessEmail"
            type="email"
            required
            placeholder="you@company.com"
          />
          <Field
            label="Company name"
            name="companyName"
            required
            placeholder="Acme, Inc."
          />
          <Field
            label="Agent or app URL"
            hint="The target you want tested"
            name="targetUrl"
            required
            placeholder="https://app.company.com"
          />

          <div>
            <LabelRow label="Access you can provide" />
            <select
              name="accessType"
              required
              defaultValue=""
              className={INPUT_CLASS}
            >
              <option value="" disabled>
                Choose one
              </option>
              {ACCESS_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <LabelRow
              label="What can the agent do?"
              hint="Which tools it calls, which actions it can take"
            />
            <textarea
              name="agentDescription"
              required
              rows={4}
              placeholder="e.g. reads inbound support tickets, calls a refund API capped at 500€, sends email replies as the user, searches an internal knowledge base"
              className={`${INPUT_CLASS} resize-y`}
            />
          </div>

          {error && (
            <p className="rounded-md border border-[var(--red)]/40 bg-[var(--surface)] px-3.5 py-2.5 text-[13px] text-[var(--red)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[var(--fg)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Continue to verification"}
          </button>

          <p className="mono text-[11px] leading-relaxed text-[var(--faint)]">
            No payment at this step. No API keys requested, here or ever.
          </p>
        </form>

        <aside className="space-y-5 md:pt-1">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="label mb-3">Next, in order</div>
            <ol className="space-y-2.5">
              {[
                "Verify you own the domain",
                "Sign the scope agreement",
                "Pay 99€ via Stripe",
                "Send access — clock starts",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex gap-2.5 text-[12.5px] leading-relaxed text-[var(--muted)]"
                >
                  <span className="mono text-[var(--faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-[12.5px] leading-relaxed text-[var(--muted)]">
            Not sure your setup fits? Describe it in the last field anyway —
            I&apos;ll tell you before you pay, or tell you it&apos;s not worth
            paying for.
          </p>
        </aside>
      </div>
    </Section>
  );
}

function LabelRow({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3">
      <label className="label">{label}</label>
      {hint && (
        <span className="text-[11px] text-[var(--faint)]">{hint}</span>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  hint?: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <LabelRow label={label} hint={hint} />
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={INPUT_CLASS}
      />
    </div>
  );
}
