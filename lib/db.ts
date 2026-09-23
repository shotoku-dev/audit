import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __breakpointSql: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  return postgres(connectionString, { ssl: "require" });
}

// Reuse the connection across hot reloads / lambda invocations.
export const sql = globalThis.__breakpointSql ?? createClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.__breakpointSql = sql;
}
