import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LegalDoc, Clause } from "@/components/LegalDoc";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <LegalDoc title="Privacy policy" updated="23 September 2026">
        <Clause n="1" title="Who is responsible">
          The data controller is Issa Prunier, operating as Breakpoint, based
          in France. For anything in this policy, including requests to access
          or delete your data, write to{" "}
          <a
            href="mailto:issa@shotoku.dev"
            className="text-[var(--fg)] underline decoration-[var(--faint)] underline-offset-4"
          >
            issa@shotoku.dev
          </a>
          .
        </Clause>

        <Clause n="2" title="What is collected">
          <p>Only what the audit needs:</p>
          <ul className="mt-3 space-y-1.5">
            {[
              "Your business email address and company name.",
              "The target URL, the access type you offer, and your description of what the agent can do.",
              "A verification token, and how and when you proved control of the domain.",
              "The name, job title, timestamp and IP address recorded when you sign the rules-of-engagement agreement.",
              "Stripe's identifiers for your payment — a session ID and a payment intent ID.",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="text-[var(--faint)]">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Clause>

        <Clause n="3" title="What is never collected">
          No AI provider or model API keys. There is no field for one anywhere
          on this site and no column for one in the database. No payment card
          details: Stripe handles payment directly and Breakpoint never
          receives your card number. No production customer data — the
          agreement requires you to nominate a staging or test environment.
          This site also runs no analytics, no advertising trackers, and sets
          no cookies other than the session cookie used for the operator&apos;s
          own admin login.
        </Clause>

        <Clause n="4" title="Why, and on what legal basis">
          Your submission and access details are processed to perform the
          contract you enter into. The IP address and timestamp attached to
          your signature are kept on the basis of legitimate interest — and
          your own — in holding evidence that testing was authorized, which is
          what makes the engagement lawful. Payment records are kept to meet
          accounting obligations.
        </Clause>

        <Clause n="5" title="Who else sees it">
          <p>Three processors, and no one else:</p>
          <ul className="mt-3 space-y-1.5">
            {[
              "Stripe — payment processing.",
              "Resend — transactional email (verification links, confirmations).",
              "Vercel — hosting, and the database holding your submission.",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="text-[var(--faint)]">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Your data is never sold, rented, or used to train any model. Some
            of these providers operate outside the EU; transfers rely on the
            European Commission&apos;s standard contractual clauses.
          </p>
        </Clause>

        <Clause n="6" title="How long it is kept">
          Submissions and the signed authorization record are kept for three
          years after the engagement, as the evidence that testing was
          permitted. Invoicing records are kept for ten years as French
          accounting law requires. Submissions that never reach payment are
          deleted after twelve months. Report contents and any access
          credentials you send are deleted within 30 days of delivery.
        </Clause>

        <Clause n="7" title="Your rights">
          You may request access to your data, correction, erasure,
          restriction, or portability, and you may object to processing based
          on legitimate interest. Email the address above and you will get a
          reply within one month. Erasure will not extend to records that must
          legally be retained, such as invoices, or to the authorization
          record for an engagement already performed. You may also complain to
          the CNIL, the French data protection authority, at cnil.fr.
        </Clause>
      </LegalDoc>
      <Footer />
    </>
  );
}
