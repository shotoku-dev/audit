import { Section, Heading, Lede } from "./Container";
import { FindingCard } from "./FindingCard";
import { PUBLIC_FINDINGS, LAB_REPO_URL } from "@/lib/findings";

export function ProofBlock() {
  return (
    <Section id="proof" index="01" label="Published findings">
      <Heading>This isn&apos;t theoretical.</Heading>
      <Lede>
        More findings I&apos;ve reproduced and published in the open, alongside
        the agent tool-abuse one above. Each ships with a runnable proof of
        concept — clone it and check my work rather than taking my word for
        it. These come from my own research lab and stock open-source
        configurations, not client systems; client findings stay confidential
        unless the client asks me to publish them.
      </Lede>

      <div className="mt-10 space-y-5">
        {PUBLIC_FINDINGS.length === 0 ? (
          <UnfilledSlot />
        ) : (
          PUBLIC_FINDINGS.slice(1).map((finding) => (
            <FindingCard key={finding.ref} finding={finding} />
          ))
        )}
      </div>

      <a
        href={LAB_REPO_URL}
        className="mono mt-6 inline-block text-[12px] text-[var(--muted)] underline decoration-[var(--faint)] underline-offset-4 transition-colors hover:text-[var(--fg)]"
      >
        All seven findings + the automation harness →
      </a>
    </Section>
  );
}

// Defensive: the proof block is the page's only authority, so an empty list
// must fail loudly rather than quietly hiding the section.
function UnfilledSlot() {
  return (
    <div className="rounded-lg border border-dashed border-[var(--yellow)]/50 bg-[var(--surface)] p-6">
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--yellow)]">
        Slot unfilled — do not launch
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
        Add at least one reproduced, publishable finding to{" "}
        <code className="mono text-[var(--fg)]">PUBLIC_FINDINGS</code> in{" "}
        <code className="mono text-[var(--fg)]">lib/findings.ts</code> before
        this page goes public. Until then the guarantee below it has nothing
        standing behind it.
      </p>
    </div>
  );
}
