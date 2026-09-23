"use client";

import { useEffect, useState } from "react";
import type { Submission, SubmissionStatus } from "@/lib/types";

const STATUSES: (SubmissionStatus | "all")[] = [
  "all",
  "qualified",
  "ownership_verified",
  "authorization_signed",
  "paid",
  "delivered",
  "refunded",
];

const STATUS_ICON: Record<SubmissionStatus, string> = {
  qualified: "○",
  ownership_verified: "◐",
  authorization_signed: "◑",
  paid: "●",
  delivered: "✓",
  refunded: "↺",
};

export function AdminDashboard() {
  const [filter, setFilter] = useState<SubmissionStatus | "all">("all");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const qs = filter === "all" ? "" : `?status=${filter}`;
    const res = await fetch(`/api/admin/submissions${qs}`);
    const data = await res.json();
    setSubmissions(data.submissions ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function deliver(id: string) {
    setBusyId(id);
    await fetch(`/api/admin/submissions/${id}/deliver`, { method: "POST" });
    await load();
    setBusyId(null);
  }

  async function refund(id: string) {
    if (!confirm("Issue a Stripe refund for this submission?")) return;
    setBusyId(id);
    await fetch(`/api/admin/submissions/${id}/refund`, { method: "POST" });
    await load();
    setBusyId(null);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1 text-xs ${
              filter === s
                ? "border-[var(--fg)] text-[var(--fg)]"
                : "border-[var(--border)] text-[var(--muted)]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-[var(--muted)]">Loading…</p>}
        {!loading && submissions.length === 0 && (
          <p className="text-sm text-[var(--muted)]">No submissions.</p>
        )}
        {submissions.map((s) => (
          <div
            key={s.id}
            className="rounded-lg border border-[var(--border)] p-4 text-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="mr-2">{STATUS_ICON[s.status]}</span>
                <strong>{s.company_name}</strong>{" "}
                <span className="text-[var(--muted)]">— {s.target_url}</span>
              </div>
              <span className="text-xs text-[var(--muted)]">{s.status}</span>
            </div>
            <div className="mt-2 text-xs text-[var(--muted)]">
              {s.business_email} · access: {s.access_type} · created{" "}
              {new Date(s.created_at).toLocaleString()}
            </div>
            {s.roe_signed_name && (
              <div className="mt-1 text-xs text-[var(--muted)]">
                Signed by {s.roe_signed_name} ({s.roe_signed_title}) at{" "}
                {s.roe_signed_at ? new Date(s.roe_signed_at).toLocaleString() : ""}{" "}
                from {s.roe_signed_ip}
              </div>
            )}
            <div className="mt-3 flex gap-2">
              {s.status === "paid" && (
                <>
                  <button
                    onClick={() => deliver(s.id)}
                    disabled={busyId === s.id}
                    className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs hover:border-[var(--border-hover)] disabled:opacity-50"
                  >
                    Mark delivered
                  </button>
                  <button
                    onClick={() => refund(s.id)}
                    disabled={busyId === s.id}
                    className="rounded-md border border-[var(--red)]/40 px-3 py-1.5 text-xs text-[var(--red)] hover:border-[var(--red)] disabled:opacity-50"
                  >
                    Refund (no vuln found)
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
