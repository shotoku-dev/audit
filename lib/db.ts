import postgres from "postgres";

type Client = ReturnType<typeof postgres>;

declare global {
  // eslint-disable-next-line no-var
  var __breakpointSql: Client | undefined;
}

function connect(): Client {
  if (globalThis.__breakpointSql) return globalThis.__breakpointSql;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
    );
  }

  const client = postgres(connectionString, {
    ssl: connectionString.includes("localhost") ? false : "require",
  });
  globalThis.__breakpointSql = client;
  return client;
}

// Lazy tagged-template forwarder. The connection opens on the first query
// rather than at import, so the landing page builds and deploys before a
// database exists — otherwise collecting page data for the funnel routes
// throws at build time on any deploy that hasn't had DATABASE_URL set yet.
type TaggedQuery = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => unknown;

export const sql = ((strings: TemplateStringsArray, ...values: unknown[]) =>
  (connect() as unknown as TaggedQuery)(strings, ...values)) as unknown as Client;
