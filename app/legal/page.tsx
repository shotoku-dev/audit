import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";

export default function LegalPage() {
  return (
    <>
      <div className="py-16">
        <Container>
          <h1 className="text-2xl font-semibold">Legal notice</h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              Breakpoint is operated as a French micro-entreprise.
            </p>
            <p>
              SIRET: [PLACEHOLDER — add once registered]
              <br />
              Registered address: [PLACEHOLDER]
              <br />
              Contact: [PLACEHOLDER]
            </p>
            <p>
              Security testing performed under this service is conducted
              only within the scope explicitly authorized in the signed
              rules-of-engagement agreement for each engagement.
            </p>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
