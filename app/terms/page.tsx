import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LegalDoc, Clause } from "@/components/LegalDoc";
import { REPRODUCIBLE_VULNERABILITY_DEFINITION } from "@/lib/types";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <LegalDoc title="Terms of sale" updated="23 September 2026">
        <Clause n="1" title="Who you are contracting with">
          Breakpoint is operated by Issa Prunier, an independent practitioner
          based in France. Contact and registration details are in the{" "}
          <a
            href="/legal"
            className="text-[var(--fg)] underline decoration-[var(--faint)] underline-offset-4"
          >
            legal notice
          </a>
          . These terms apply to every audit purchased through this site.
        </Clause>

        <Clause n="2" title="What is sold">
          A single fixed-scope, manually-delivered security audit of one
          application or agent, at one URL, together with the tools it can
          call. The deliverable is a written findings report mapped to the
          OWASP Top 10 for LLM Applications (2025), plus one walkthrough call
          of approximately 30 minutes. Separate agents require separate
          audits.
        </Clause>

        <Clause n="3" title="Price and payment">
          The price is 99&nbsp;EUR per audit, payable in advance through
          Stripe. This is an introductory price and may change for future
          purchases; the price shown at the time of your purchase is the price
          that applies to it. Card details are handled entirely by Stripe and
          are never received or stored by Breakpoint.
        </Clause>

        <Clause n="4" title="Order of operations">
          Payment is only possible after you have (a) demonstrated control of
          the target domain and (b) electronically signed the rules-of-
          engagement agreement. No testing is performed before both steps are
          complete. The signature, its timestamp and the originating IP
          address are recorded as evidence of authorization.
        </Clause>

        <Clause n="5" title="Your obligations">
          You warrant that you own or operate the submitted target and are
          authorized to permit security testing against it. You are
          responsible for providing working access (a staging endpoint, a test
          account, or API documentation) and for ensuring that the environment
          you nominate contains no real production personal data. Supplying a
          target you are not entitled to authorize is a material breach and
          ends the engagement without refund.
        </Clause>

        <Clause n="6" title="Scope and exclusions">
          Testing is confined to the target and window named in the signed
          agreement. Excluded in all cases: load, stress and
          denial-of-service testing; testing against real production data; and
          testing of third-party systems, vendors or infrastructure not owned
          by you, even where reachable from the target. Three OWASP LLM
          categories (supply chain, data and model poisoning, and unbounded
          consumption) are outside the scope of this tier and are not tested,
          as stated on the landing page.
        </Clause>

        <Clause n="7" title="Turnaround">
          The 72-hour delivery window begins when workable access is received,
          not at the time of payment. If access is incomplete or non-functional
          the clock is paused until it is resolved. Where a delay is caused by
          Breakpoint, the window is extended at no cost to you.
        </Clause>

        <Clause n="8" title="The guarantee and refunds">
          <p>
            If no reproducible vulnerability is found, the full purchase price
            is refunded to the original payment method. For this purpose, a
            reproducible vulnerability means:
          </p>
          <p className="mt-3 border-l-2 border-[var(--border)] pl-4 text-[var(--fg)]">
            {REPRODUCIBLE_VULNERABILITY_DEFINITION}
          </p>
          <p className="mt-3">
            Where at least one such finding is delivered in the report, the
            engagement is complete and no refund is due. A finding is treated
            as delivered when the report containing it is sent to the email
            address on your submission. If you run the documented reproduction
            steps and the behaviour does not reproduce, tell us within 14 days
            and, if we cannot demonstrate it, you are refunded in full.
          </p>
        </Clause>

        <Clause n="9" title="Right of withdrawal">
          Where you contract as a consumer, the statutory 14-day right of
          withdrawal applies. Because the audit begins as soon as access is
          supplied, you expressly request that performance start before the
          withdrawal period expires and acknowledge that the right lapses once
          the service is fully performed. Purchases made in a professional
          capacity are not covered by this right.
        </Clause>

        <Clause n="10" title="Confidentiality">
          Findings and the material you share are treated as confidential and
          are not disclosed to third parties. Nothing identifying you is
          published without your prior written consent. Findings may inform
          anonymised, non-identifying research.
        </Clause>

        <Clause n="11" title="Liability">
          Testing is performed with care and strictly within the authorized
          scope, but security testing carries inherent risk. Breakpoint is not
          liable for indirect or consequential loss, loss of profit, or loss
          of data. To the extent permitted by law, total liability arising
          from an engagement is limited to the amount you paid for it. Nothing
          here excludes liability that cannot lawfully be excluded, including
          for gross negligence or wilful misconduct. An audit reduces risk; it
          does not certify that a system is secure, and no such certification
          is offered or implied.
        </Clause>

        <Clause n="12" title="Governing law">
          These terms are governed by French law. Where a dispute cannot be
          resolved amicably, the competent French courts have jurisdiction.
          Consumers may also use the European Commission&apos;s online dispute
          resolution platform.
        </Clause>
      </LegalDoc>
      <Footer />
    </>
  );
}
