import { Section } from "./Container";
import { REPRODUCIBLE_VULNERABILITY_DEFINITION } from "@/lib/types";

const COUNTS = [
  "Information leaked that wasn't meant for that user",
  "An action executed outside the authorized scope",
  "A safety rule bypassed",
  "Exfiltration through attacker-controlled input",
];

const DOESNT_COUNT = [
  "A refusal, or the model declining something",
  "Cosmetic or low-quality output",
  "A theoretical risk I can't demonstrate",
];

export function Guarantee() {
  return (
    <Section id="guarantee" index="05" label="The guarantee">
      <h2 className="max-w-3xl text-2xl font-medium leading-[1.25] tracking-tight sm:text-[32px]">
        If I don&apos;t find a reproducible vulnerability mapped to the OWASP
        LLM Top 10, you&apos;re refunded in full.
      </h2>

      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
        The guarantee is only worth something if the words in it are pinned
        down. So here is the exact clause, the same one stored with your
        submission and quoted in the report.
      </p>

      <div className="mt-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="label">Definition — &ldquo;reproducible vulnerability&rdquo;</div>
        <p className="mt-3 text-sm leading-relaxed">
          {REPRODUCIBLE_VULNERABILITY_DEFINITION}
        </p>

        <div className="mt-6 grid gap-6 border-t border-[var(--border)] pt-5 sm:grid-cols-2">
          <div>
            <div className="mono mb-3 text-[11px] uppercase tracking-[0.18em] text-[var(--green)]">
              Counts
            </div>
            <ul className="space-y-2">
              {COUNTS.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[13px] leading-relaxed text-[var(--muted)]"
                >
                  <span className="text-[var(--green)]">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono mb-3 text-[11px] uppercase tracking-[0.18em] text-[var(--red)]">
              Doesn&apos;t count
            </div>
            <ul className="space-y-2">
              {DOESNT_COUNT.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[13px] leading-relaxed text-[var(--muted)]"
                >
                  <span className="text-[var(--red)]">−</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-5 text-[13px] leading-relaxed text-[var(--muted)]">
        Refunds are issued to the original card through Stripe, typically
        within one business day of the report being sent.
      </p>
    </Section>
  );
}
