import { Section, Heading, Lede } from "./Container";

// The anti-anonymity block. A guarantee from a nameless "we" reads as a scam;
// a named person with a public, checkable body of work does not. Keep the
// links live and keep the claims to things a visitor can verify in one click.
const LINKS = [
  { label: "github.com/shotoku-dev/shotoku", href: "https://github.com/shotoku-dev/shotoku" },
  { label: "shotoku.dev", href: "https://shotoku.dev" },
  { label: "[REPLACE — X / LinkedIn]", href: "#" },
];

export function Operator() {
  return (
    <Section id="operator" index="02" label="Who runs this">
      <Heading>One person does the testing. Here&apos;s who.</Heading>

      <div className="mt-10 grid gap-10 md:grid-cols-[auto_1fr] md:gap-12">
        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          {/* Replace with a real photo at /public/operator.jpg. A face matters
              more here than anything else on the page. */}
          <div className="mono flex h-full items-center justify-center px-2 text-center text-[10px] leading-tight text-[var(--faint)]">
            [PHOTO]
          </div>
        </div>

        <div>
          <div className="text-lg font-medium">Issa Prunier</div>
          <div className="mono mt-1 text-[12px] text-[var(--muted)]">
            Independent · France
          </div>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              I build{" "}
              <a
                href="https://shotoku.dev"
                className="text-[var(--fg)] underline decoration-[var(--faint)] underline-offset-4"
              >
                Shotoku
              </a>
              , an open-source spend-control layer for AI agents — budgets,
              approvals, and an audit trail enforced before an agent spends
              money. It exists because agents with tool access do things nobody
              authorized. The code is public; read it and judge the work
              yourself.
            </p>
            <p>
              Breakpoint is the other half of that problem. Building the
              guardrail taught me where agents actually break, so I test other
              people&apos;s agents the same way an attacker would — by hand.
            </p>
            <p className="text-[var(--faint)]">
              [REPLACE — one or two concrete, checkable lines: prior security
              work, disclosures you&apos;ve made, talks, or the number of
              audits delivered so far. Do not write anything you can&apos;t
              back up if asked.]
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mono text-[12px] text-[var(--muted)] underline decoration-[var(--faint)] underline-offset-4 transition-colors hover:text-[var(--fg)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Lede>
        No subcontracted testers, no white-labelled scanner. That&apos;s also
        the honest limit on volume — I take a small number of audits per month
        because there is exactly one of me.
      </Lede>
    </Section>
  );
}
