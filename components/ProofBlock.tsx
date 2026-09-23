import { Section, Heading, Lede } from "./Container";
import { FindingCard } from "./FindingCard";
import { PUBLIC_FINDINGS } from "@/lib/findings";

export function ProofBlock() {
  return (
    <Section id="proof" index="01" label="Published findings">
      <Heading>This isn&apos;t theoretical.</Heading>
      <Lede>
        Real findings from real audits, redacted and published with the
        client&apos;s consent. Every one was reproduced end to end before it
        went in a report.
      </Lede>

      <div className="mt-10 space-y-5">
        {PUBLIC_FINDINGS.length === 0 ? (
          <UnfilledSlot />
        ) : (
          PUBLIC_FINDINGS.map((finding) => (
            <FindingCard
              key={finding.ref}
              finding={finding}
              caption={finding.target}
            />
          ))
        )}
      </div>
    </Section>
  );
}

// Deliberately loud. The proof block is the page's only authority — shipping
// it empty would make every other claim unbacked.
function UnfilledSlot() {
  return (
    <div className="rounded-lg border border-dashed border-[var(--yellow)]/50 bg-[var(--surface)] p-6">
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--yellow)]">
        Slot unfilled — do not launch
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
        Add at least one real, reproduced, client-approved finding to{" "}
        <code className="mono text-[var(--fg)]">PUBLIC_FINDINGS</code> in{" "}
        <code className="mono text-[var(--fg)]">lib/findings.ts</code> before
        this page goes public. Until then the guarantee above it has nothing
        standing behind it.
      </p>
    </div>
  );
}
