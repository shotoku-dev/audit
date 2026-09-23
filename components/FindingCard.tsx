import type { PublicFinding, Severity } from "@/lib/findings";

const SEVERITY_COLOR: Record<Severity, string> = {
  Critical: "var(--red)",
  High: "var(--red)",
  Medium: "var(--yellow)",
  Low: "var(--muted)",
};

export function FindingCard({ finding }: { finding: PublicFinding }) {
  const color = SEVERITY_COLOR[finding.severity];

  return (
    <figure className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
        <div className="mono flex items-center gap-2.5 text-[11px] text-[var(--muted)]">
          <span className="text-[var(--fg)]">FINDING {finding.ref}</span>
          <span className="text-[var(--faint)]">/</span>
          <span>
            {finding.owasp} · {finding.category}
          </span>
        </div>
        <span
          className="mono shrink-0 rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wider"
          style={{ color, borderColor: color }}
        >
          {finding.severity}
        </span>
      </div>

      <div className="space-y-5 px-4 py-5 sm:px-5">
        <p className="text-sm leading-relaxed">{finding.summary}</p>

        <div>
          <div className="label mb-2.5">Reproduction</div>
          <ol className="space-y-1.5">
            {finding.repro.map((step, i) => (
              <li
                key={i}
                className="mono flex gap-3 text-[12.5px] leading-relaxed text-[var(--muted)]"
              >
                <span className="shrink-0 text-[var(--faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div
          className="rounded-md border-l-2 bg-[var(--surface-2)] px-4 py-3"
          style={{ borderLeftColor: color }}
        >
          <div className="label mb-1.5">Measured result</div>
          <p className="text-[13px] leading-relaxed text-[var(--fg)]">
            {finding.evidence}
          </p>
        </div>

        <div className="grid gap-4 border-t border-[var(--border)] pt-4 sm:grid-cols-2">
          <div>
            <div className="label mb-1.5">Impact</div>
            <p className="text-[13px] leading-relaxed text-[var(--muted)]">
              {finding.impact}
            </p>
          </div>
          <div>
            <div className="label mb-1.5">Remediation</div>
            <p className="text-[13px] leading-relaxed text-[var(--muted)]">
              {finding.fix}
            </p>
          </div>
        </div>
      </div>

      <figcaption className="flex flex-col gap-2 border-t border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="mono text-[11px] leading-relaxed text-[var(--faint)]">
          {finding.target}
        </span>
        <a
          href={finding.href}
          className="mono shrink-0 text-[11px] text-[var(--muted)] underline decoration-[var(--faint)] underline-offset-4 transition-colors hover:text-[var(--fg)]"
        >
          Run the PoC →
        </a>
      </figcaption>
    </figure>
  );
}
