import { Section, Heading } from "./Container";

const FAQS = [
  {
    q: "What stops you from calling anything a vulnerability just to keep my 99€?",
    a: "The definition is fixed in writing before you pay, and it's narrow on purpose: a refusal doesn't count, a theoretical risk doesn't count, and neither does anything I can't reproduce. Every finding ships with numbered steps you run yourself. If you run them and they don't reproduce, it isn't a finding and you get refunded.",
  },
  {
    q: "Do you need access to my AI provider keys?",
    a: "No. There is no field for one anywhere on this site and no place in the database to put one. I test through the same surface an attacker has: your app, a test account, or a staging endpoint.",
  },
  {
    q: "Is this legal?",
    a: "Only because you authorize it. You prove you control the target, then sign a rules-of-engagement agreement naming the authorized target, the window, and the exclusions, with a declaration that you have the right to authorize testing. That signature is timestamped and stored. Without it, no testing happens.",
  },
  {
    q: "Why not just run an automated scanner?",
    a: "Scanners replay known payload lists against a chat box. They don't know that your agent has a refund tool, that the tool has no ceiling, or that ticket text reaches the model as instructions. The vulnerabilities that matter in agent systems are in the wiring between the model and its tools, and finding those means reading how your specific agent is put together.",
  },
  {
    q: "What if my agent is genuinely secure?",
    a: "Then you get the report section listing what I tried and failed to break, plus your money back. That's a real outcome — it's evidence you can show a customer or an auditor, and it cost you nothing.",
  },
  {
    q: "Will you publish what you find?",
    a: "Not without your written consent, and never in identifying form. The findings published on this page are redacted and approved by the client first.",
  },
  {
    q: "What counts as 'one agent'?",
    a: "One deployed application or agent, with its tools, at one URL. If you have three separate agents, that's three audits. If you're not sure how yours splits up, say so in the form and I'll tell you before you pay.",
  },
  {
    q: "What happens after the 72 hours?",
    a: "You get the report and a 30-minute walkthrough. Fix what you want to fix, and I'll re-test the findings once for free within 30 days to confirm they're actually closed.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" index="09" label="Questions">
      <Heading>The ones you should be asking.</Heading>

      <div className="mt-10 overflow-hidden rounded-lg border border-[var(--border)]">
        {FAQS.map((faq, i) => (
          <details
            key={faq.q}
            className={`group ${i > 0 ? "border-t border-[var(--border)]" : ""}`}
          >
            <summary className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[var(--surface)]">
              <span className="mono faq-sign mt-0.5 shrink-0 text-[var(--faint)] transition-transform duration-200">
                +
              </span>
              <span className="text-sm font-medium">{faq.q}</span>
            </summary>
            <p className="max-w-2xl px-5 pb-5 pl-[52px] text-[13px] leading-relaxed text-[var(--muted)]">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
