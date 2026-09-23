import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <div className="py-16">
        <Container>
          <h1 className="text-2xl font-semibold">Terms of sale</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              [PLACEHOLDER — replace with reviewed terms before launch.]
              Breakpoint is a fixed-scope, manually-delivered security audit
              service. By paying, you agree to the rules-of-engagement
              agreement signed during intake, which governs the scope and
              exclusions of testing.
            </p>
            <p>
              Testing is performed only within the signed authorized scope.
              No refunds are issued once a reproducible vulnerability
              mapped to the OWASP LLM Top 10 has been found and reported;
              if no such vulnerability is found, you are refunded in full
              per the guarantee stated on the landing page.
            </p>
            <p>
              This service is provided by an independent (micro-entreprise)
              operator. See the{" "}
              <a href="/legal" className="underline underline-offset-4">
                legal notice
              </a>{" "}
              for registration details.
            </p>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
