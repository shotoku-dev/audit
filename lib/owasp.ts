// OWASP Top 10 for LLM Applications (2025). Every finding in a Breakpoint
// report is mapped to one of these IDs.
//
// `tested` marks what a 72-hour black/grey-box audit of a running agent can
// actually exercise. The rest need source, training-pipeline, or
// infrastructure access we don't ask for — we say so rather than implying
// coverage we can't deliver.
export interface OwaspCategory {
  readonly id: string;
  readonly name: string;
  readonly note: string;
  readonly tested: boolean;
}

export const OWASP_LLM_TOP_10: readonly OwaspCategory[] = [
  {
    id: "LLM01",
    name: "Prompt Injection",
    note: "Direct and indirect — including payloads hidden in content the agent retrieves.",
    tested: true,
  },
  {
    id: "LLM02",
    name: "Sensitive Information Disclosure",
    note: "Data from other users, other tenants, or internal context leaking into output.",
    tested: true,
  },
  {
    id: "LLM03",
    name: "Supply Chain",
    note: "Needs dependency and model-provenance review. Out of scope at this tier.",
    tested: false,
  },
  {
    id: "LLM04",
    name: "Data and Model Poisoning",
    note: "Needs training-pipeline access. Out of scope at this tier.",
    tested: false,
  },
  {
    id: "LLM05",
    name: "Improper Output Handling",
    note: "Model output reaching a shell, a browser, SQL, or a downstream parser unescaped.",
    tested: true,
  },
  {
    id: "LLM06",
    name: "Excessive Agency",
    note: "Tools the agent can call beyond what the task needs — the one that moves money.",
    tested: true,
  },
  {
    id: "LLM07",
    name: "System Prompt Leakage",
    note: "Extraction of instructions, tool schemas, or secrets embedded in the prompt.",
    tested: true,
  },
  {
    id: "LLM08",
    name: "Vector and Embedding Weaknesses",
    note: "RAG retrieval crossing tenant boundaries or returning poisoned context.",
    tested: true,
  },
  {
    id: "LLM09",
    name: "Misinformation",
    note: "Only where a confident wrong answer causes a concrete downstream action.",
    tested: true,
  },
  {
    id: "LLM10",
    name: "Unbounded Consumption",
    note: "Reviewed by inspection only — no load testing, ever. It's in the agreement.",
    tested: false,
  },
];

export const TESTED_COUNT = OWASP_LLM_TOP_10.filter((c) => c.tested).length;
