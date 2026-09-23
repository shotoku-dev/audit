import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <div className="py-16">
        <Container>
          <h1 className="text-2xl font-semibold">Privacy policy</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              [PLACEHOLDER — replace with reviewed policy before launch.]
              We collect the information you submit (business email,
              company name, target URL, access details, description of
              your agent) to qualify, verify ownership of, and deliver a
              security audit. We do not request or store AI API keys,
              production credentials, or payment card details — Stripe
              handles payment directly.
            </p>
            <p>
              Submission data, verification records, and the signed
              authorization agreement are retained as an audit trail for
              the engagement and are not shared with third parties except
              as required to process payment (Stripe) or send email
              (Resend).
            </p>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
