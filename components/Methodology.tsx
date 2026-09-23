import { Section, Heading, Lede } from "./Container";
import { OWASP_LLM_TOP_10, TESTED_COUNT } from "@/lib/owasp";

export function Methodology() {
  return (
    <Section id="method" index="03" label="What gets tested">
      <Heading>
        Every finding maps to a category. Here are all ten, including the ones
        I don&apos;t test.
      </Heading>
      <Lede>
        {`${TESTED_COUNT} of the 10 OWASP LLM categories are reachable from a running agent in 72 hours. The other ${10 - TESTED_COUNT} need training pipelines, dependency trees, or load generation — access I don't ask for and testing the agreement forbids. Anyone claiming full coverage at this price is selling you a scanner.`}
      </Lede>

      <div className="mt-10 overflow-hidden rounded-lg border border-[var(--border)]">
        {OWASP_LLM_TOP_10.map((category, i) => (
          <div
            key={category.id}
            className={`flex flex-col gap-1.5 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-5 sm:px-5 ${
              i > 0 ? "border-t border-[var(--border)]" : ""
            } ${category.tested ? "" : "bg-[var(--surface)]"}`}
          >
            <div className="mono flex shrink-0 items-center gap-2.5 text-[12px] sm:w-[92px]">
              <span
                aria-hidden
                style={{
                  color: category.tested ? "var(--green)" : "var(--faint)",
                }}
              >
                {category.tested ? "✓" : "—"}
              </span>
              <span
                className={
                  category.tested ? "text-[var(--fg)]" : "text-[var(--faint)]"
                }
              >
                {category.id}
              </span>
            </div>

            <div className="sm:flex-1">
              <div
                className={`text-sm ${
                  category.tested
                    ? "text-[var(--fg)]"
                    : "text-[var(--faint)] line-through decoration-[var(--faint)]"
                }`}
              >
                {category.name}
              </div>
              <div className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
                {category.note}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mono mt-5 text-[11px] text-[var(--faint)]">
        Reference: OWASP Top 10 for LLM Applications, 2025.
      </p>
    </Section>
  );
}
