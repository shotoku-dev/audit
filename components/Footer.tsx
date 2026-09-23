import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="mono flex items-center gap-2 text-[13px]">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--red)" }}
              />
              <span className="font-medium tracking-tight">breakpoint</span>
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--muted)]">
              Manual red-team audits for AI agents, run by one person in
              France. Testing is performed only within the scope you sign.
            </p>
            <a
              href="mailto:issa@shotoku.dev"
              className="mono mt-4 inline-block text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              issa@shotoku.dev
            </a>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="label mb-3">Legal</div>
              <ul className="space-y-2">
                {[
                  { href: "/terms", label: "Terms of sale" },
                  { href: "/privacy", label: "Privacy" },
                  { href: "/legal", label: "Legal notice" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[12.5px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="label mb-3">Elsewhere</div>
              <ul className="space-y-2">
                {[
                  { href: "https://shotoku.dev", label: "Shotoku" },
                  {
                    href: "https://github.com/shotoku-dev/shotoku",
                    label: "GitHub",
                  },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[12.5px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mono mt-10 border-t border-[var(--border)] pt-6 text-[11px] text-[var(--faint)]">
          © {new Date().getFullYear()} Breakpoint · Issa Prunier ·
          Micro-entreprise registration in progress
        </div>
      </Container>
    </footer>
  );
}
