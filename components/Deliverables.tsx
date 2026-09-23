import { Section, Heading, Lede } from "./Container";

const REPORT_SECTIONS = [
  {
    n: "1",
    title: "Scope and method",
    body: "What was tested, from which vantage point, over which window — and what was deliberately left alone.",
  },
  {
    n: "2",
    title: "Findings",
    body: "Each one with an OWASP category, a severity, numbered reproduction steps, and the concrete impact. If it can't be reproduced, it isn't a finding.",
  },
  {
    n: "3",
    title: "Remediation",
    body: "Per finding: the specific change that closes it. Where the root cause is an over-privileged tool, that includes the architectural fix, not just a prompt patch.",
  },
  {
    n: "4",
    title: "What I couldn't break",
    body: "The attacks that failed and why. This is the half that tells you where you're already strong.",
  },
];

const EXTRAS = [
  ["Format", "PDF + Markdown"],
  ["Walkthrough", "30 min, recorded"],
  ["Re-test", "One free, within 30 days"],
  ["Confidentiality", "Nothing published without written consent"],
];

export function Deliverables() {
  return (
    <Section id="deliverable" index="04" label="What you get">
      <Heading>A report you can hand to an engineer on Monday.</Heading>
      <Lede>
        Four sections, one call. No dashboard to log into, no score out of 100,
        no 40-page appendix padding out a thin result.
      </Lede>

      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
        {REPORT_SECTIONS.map((section) => (
          <div key={section.n} className="bg-[var(--bg)] p-5">
            <div className="mono text-[11px] text-[var(--faint)]">
              §{section.n}
            </div>
            <div className="mt-2 text-sm font-medium">{section.title}</div>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {EXTRAS.map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-3"
          >
            <dt className="label">{k}</dt>
            <dd className="mono text-right text-[12px] text-[var(--fg)]">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
