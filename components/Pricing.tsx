import { Section, Heading } from "./Container";

const COMPARISON = [
  {
    label: "Traditional pentest firm",
    price: "8 000 – 30 000 €",
    time: "3 – 6 weeks",
    note: "Scoping calls, an MSA, a team that mostly tests web apps",
    dim: true,
  },
  {
    label: "Automated LLM scanner",
    price: "Subscription",
    time: "Minutes",
    note: "Known payload lists — it won't find your refund tool",
    dim: true,
  },
  {
    label: "Breakpoint",
    price: "99 €",
    time: "72 hours",
    note: "One agent, tested by hand, refunded if nothing is found",
    dim: false,
  },
];

export function Pricing() {
  return (
    <Section id="pricing" index="06" label="Price">
      <Heading>99€, and here&apos;s why that isn&apos;t a red flag.</Heading>

      <div className="mt-10 overflow-hidden rounded-lg border border-[var(--border)]">
        {COMPARISON.map((row, i) => (
          <div
            key={row.label}
            className={`flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:gap-6 ${
              i > 0 ? "border-t border-[var(--border)]" : ""
            } ${row.dim ? "" : "bg-[var(--surface)]"}`}
          >
            <div className="sm:flex-1">
              <div
                className={`text-sm ${row.dim ? "text-[var(--muted)]" : "font-medium text-[var(--fg)]"}`}
              >
                {row.label}
              </div>
              <div className="mt-1 text-[13px] leading-relaxed text-[var(--faint)]">
                {row.note}
              </div>
            </div>
            <div className="flex items-baseline gap-6 sm:block sm:text-right">
              <div
                className={`mono ${
                  row.dim
                    ? "text-sm text-[var(--faint)] line-through"
                    : "text-2xl text-[var(--fg)]"
                }`}
              >
                {row.price}
              </div>
              <div className="mono mt-1 text-[11px] text-[var(--faint)]">
                {row.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="label mb-2.5">Why it&apos;s this cheap</div>
          <p className="text-[13px] leading-relaxed text-[var(--muted)]">
            There is no sales team, no scoping call, no contract negotiation —
            the agreement is on this page and you sign it yourself. The scope is
            fixed at exactly one agent, so I never quote, never estimate, and
            never bill hours. 99€ is a launch price while I build a public
            record of findings; it will go up once that record exists.
          </p>
        </div>
        <div>
          <div className="label mb-2.5">The honest constraint</div>
          <p className="text-[13px] leading-relaxed text-[var(--muted)]">
            I run every audit personally, so I take a limited number per month.
            When the month is full, the form tells you and you wait for the
            next one. There is no countdown on this page and no spot counter —
            those are made up, and you&apos;d be right not to trust one.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <a
          href="#audit"
          className="inline-block rounded-md bg-[var(--fg)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
        >
          Book an audit — 99€
        </a>
      </div>
    </Section>
  );
}
