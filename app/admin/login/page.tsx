"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Wrong password.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container className="max-w-sm">
        <form onSubmit={onSubmit} className="space-y-4">
          <h1 className="text-lg font-semibold">Breakpoint admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[var(--border-hover)]"
          />
          {error && <p className="text-sm text-[var(--red)]">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[var(--fg)] px-4 py-2.5 text-sm font-medium text-[var(--bg)] hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </Container>
    </div>
  );
}
