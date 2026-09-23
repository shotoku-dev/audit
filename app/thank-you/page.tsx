import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <div className="py-24">
        <Container className="max-w-3xl">
          <div className="label" style={{ color: "var(--green)" }}>
            ✓ Payment received
          </div>
          <h1 className="mt-4 text-2xl font-semibold">
            You&apos;re booked.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
            Check your inbox for a scope recap and what we need from you.
            The 72-hour clock starts once we receive working access — not
            right now.
          </p>
        </Container>
      </div>
      <Footer />
    </>
  );
}
