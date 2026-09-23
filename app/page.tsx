import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProofBlock } from "@/components/ProofBlock";
import { Operator } from "@/components/Operator";
import { Methodology } from "@/components/Methodology";
import { Deliverables } from "@/components/Deliverables";
import { Guarantee } from "@/components/Guarantee";
import { Pricing } from "@/components/Pricing";
import { Boundaries } from "@/components/Boundaries";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { IntakeForm } from "@/components/IntakeForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProofBlock />
      <Operator />
      <Methodology />
      <Deliverables />
      <Guarantee />
      <Pricing />
      <Boundaries />
      <HowItWorks />
      <FAQ />
      <IntakeForm />
      <Footer />
    </>
  );
}
