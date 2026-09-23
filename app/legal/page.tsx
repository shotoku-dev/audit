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
              Breakpoint is operated by Issa Prunier, an independent
              practitioner based in France.
            </p>
            <p>
              Publisher: Issa Prunier
              <br />
              Contact:{" "}
              <a
                href="mailto:issa@shotoku.dev"
                className="text-[var(--fg)] underline decoration-[var(--faint)] underline-offset-4"
              >
                issa@shotoku.dev
              </a>
              <br />
              Status: micro-entreprise registration in progress. The SIRET
              number and registered address will be published here as soon as
              they are issued.
              <br />
              Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
              United States.
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
