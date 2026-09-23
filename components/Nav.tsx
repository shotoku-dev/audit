import Link from "next/link";
import { Container } from "./Container";

const LINKS = [
  { href: "#proof", label: "Findings" },
  { href: "#method", label: "Method" },
  { href: "#operator", label: "Who" },
  { href: "#pricing", label: "Price" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="mono flex items-center gap-2 text-[13px]">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--red)" }}
          />
          <span className="font-medium tracking-tight">breakpoint</span>
        </Link>

        <div className="hidden items-center gap-7 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mono text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#audit"
          className="mono rounded-md border border-[var(--border)] px-3 py-1.5 text-[12px] transition-colors hover:border-[var(--border-hover)]"
        >
          Start
        </a>
      </Container>
    </nav>
  );
}
