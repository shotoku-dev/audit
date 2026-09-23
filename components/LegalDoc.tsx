import { Container } from "./Container";

export function LegalDoc({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mono mt-2 text-[11px] text-[var(--faint)]">
          Last updated {updated}
        </p>
        <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-[var(--muted)]">
          Written in plain language on purpose. If anything here is unclear,
          ask before you buy — not after.
        </p>
        <div className="mt-10 space-y-8">{children}</div>
      </Container>
    </div>
  );
}

export function Clause({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--border)] pt-6">
      <div className="flex items-baseline gap-3">
        <span className="mono text-[11px] text-[var(--faint)]">{n}</span>
        <h2 className="text-sm font-medium">{title}</h2>
      </div>
      <div className="mt-3 pl-0 text-[13.5px] leading-relaxed text-[var(--muted)] sm:pl-7">
        {children}
      </div>
    </section>
  );
}
