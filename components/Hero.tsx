import { Container } from "./Container";
import { FindingCard } from "./FindingCard";
import { PUBLIC_FINDINGS } from "@/lib/findings";
import { TESTED_COUNT } from "@/lib/owasp";

const FACTS = [
  { k: "Price", v: "99€" },
  { k: "Turnaround", v: "72h" },
  { k: "Scope", v: "1 agent" },
  { k: "OWASP coverage", v: `${TESTED_COUNT}/10` },
];

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="grid-wash pointer-events-none absolute inset-0" />

      <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mono mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-[11px] text-[var(--muted)]">
          Manual testing · OWASP LLM Top 10 · No API keys, ever
        </div>

        <h1 className="max-w-3xl text-[34px] font-medium leading-[1.1] tracking-tight sm:text-[52px]">
          We&apos;ll find a real vulnerability in your AI agent in 72 hours
          <span className="text-[var(--faint)]"> — or you don&apos;t pay.</span>
        </h1>

        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
          If your agent sends email, moves money, or calls tools on its own,
          then anything it reads is a potential instruction. Breakpoint is a
          fixed-scope manual audit that shows you exactly what an attacker can
          make it do — with the steps to reproduce it.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href="#audit"
            className="rounded-md bg-[var(--fg)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            Book an audit — 99€
          </a>
          <a
            href="#proof"
            className="mono text-[13px] text-[var(--muted)] underline decoration-[var(--faint)] underline-offset-4 transition-colors hover:text-[var(--fg)]"
          >
            See a real finding →
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)] sm:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.k} className="bg-[var(--bg)] px-4 py-3.5">
              <dt className="label">{fact.k}</dt>
              <dd className="mono mt-1.5 text-lg">{fact.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14">
          <FindingCard finding={PUBLIC_FINDINGS[0]} />
        </div>
      </Container>
    </header>
  );
}
