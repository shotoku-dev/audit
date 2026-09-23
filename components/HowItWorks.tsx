import { Section, Heading, Lede } from "./Container";

const STEPS = [
  {
    n: "01",
    title: "Submit",
    time: "2 min",
    body: "Company email, the agent's URL, what access you can give, and what the agent is allowed to do.",
  },
  {
    n: "02",
    title: "Verify you own it",
    time: "5 min",
    body: "Host a token file on the domain, or confirm from an address on it. Payment stays locked until this passes — it's what stops anyone submitting a company that isn't theirs.",
  },
  {
    n: "03",
    title: "Sign the scope",
    time: "3 min",
    body: "Rules of engagement: authorized target, test window, exclusions, and your declaration that you can authorize testing. Timestamped and stored.",
  },
  {
    n: "04",
    title: "Pay",
    time: "1 min",
    body: "Stripe Checkout, unlocked only after the two steps above. I never see your card.",
  },
  {
    n: "05",
    title: "Send access",
    time: "—",
    body: "Staging endpoint, test account, or API docs. The 72-hour clock starts here, not at payment.",
  },
  {
    n: "06",
    title: "Report + walkthrough",
    time: "72 h",
    body: "Findings with reproduction steps, then a 30-minute call. Or a full refund if I came up empty.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how" index="08" label="How it works">
      <Heading>Six steps, in this order, no exceptions.</Heading>
      <Lede>
        The sequence matters: verification and authorization both happen
        before money changes hands.
      </Lede>

      <ol className="mt-10 space-y-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)]">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="flex flex-col gap-2 bg-[var(--bg)] px-5 py-5 sm:flex-row sm:gap-6"
          >
            <div className="mono shrink-0 text-[12px] text-[var(--faint)] sm:w-8">
              {step.n}
            </div>
            <div className="sm:flex-1">
              <div className="text-sm font-medium">{step.title}</div>
              <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-[var(--muted)]">
                {step.body}
              </p>
            </div>
            <div className="mono shrink-0 text-[11px] text-[var(--faint)] sm:w-12 sm:text-right">
              {step.time}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
