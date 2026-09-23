import { Section, Heading, Lede } from "./Container";

const BOUNDARIES = [
  {
    title: "I never ask for an AI API key",
    body: "Not during intake, not for testing, not afterwards. There is no field for one on this site and no table to store one in. Anyone who asks you for a provider key to 'run a security scan' is the threat.",
  },
  {
    title: "Nothing is tested automatically",
    body: "This site qualifies you, verifies you own the target, takes your signed authorization, and charges you. It never sends a single request at your agent. All testing happens by hand, off this platform, after you've signed.",
  },
  {
    title: "No load testing, ever",
    body: "No stress tests, no flooding, no availability testing. It's an explicit exclusion in the agreement you sign, so a Breakpoint audit can't take your service down.",
  },
  {
    title: "No production data",
    body: "Staging endpoint, test account, or API docs. If the only access you can give me is production with real customer records in it, I'll tell you to fix that first and decline the job.",
  },
  {
    title: "No third parties",
    body: "I test what you own and authorized. If your agent calls a vendor's API, the vendor's systems are out of scope even when they're reachable from yours.",
  },
  {
    title: "No testing without a signature",
    body: "Ownership verification and a signed rules-of-engagement agreement both come before payment, not after. That protects you, and it's the only thing that makes this legal for me.",
  },
];

export function Boundaries() {
  return (
    <Section id="boundaries" index="07" label="What I don't do">
      <Heading>The limits are the product.</Heading>
      <Lede>
        Security work is bounded by what you authorize. Here is everything
        outside the line, stated before you pay rather than buried in a PDF.
      </Lede>

      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
        {BOUNDARIES.map((item) => (
          <div key={item.title} className="bg-[var(--bg)] p-5">
            <div className="flex gap-2.5">
              <span className="mono mt-px shrink-0 text-[var(--red)]">✗</span>
              <div>
                <div className="text-sm font-medium">{item.title}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
