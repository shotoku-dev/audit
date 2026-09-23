import { notFound } from "next/navigation";
import { getSubmission } from "@/lib/submissions";
import { VerifyWizard } from "@/components/VerifyWizard";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getSubmission(id);
  if (!submission) notFound();

  return (
    <>
      <Nav />
      <div className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="label mb-8">
            {submission.company_name} — {submission.target_url}
          </div>
          <VerifyWizard submission={submission} />
        </Container>
      </div>
      <Footer />
    </>
  );
}
