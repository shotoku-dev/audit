export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  index,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  index?: string;
  label?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-[var(--border)] py-20 sm:py-28 ${className}`}
    >
      <Container>
        {label && <SectionHeader index={index} label={label} />}
        {children}
      </Container>
    </section>
  );
}

export function SectionHeader({
  index,
  label,
}: {
  index?: string;
  label: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-4">
      {index && (
        <span className="mono text-[11px] text-[var(--faint)]">{index}</span>
      )}
      <span className="label">{label}</span>
      <span className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}

export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-2xl text-2xl font-medium leading-[1.25] tracking-tight sm:text-[32px]">
      {children}
    </h2>
  );
}

export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
      {children}
    </p>
  );
}
