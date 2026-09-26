"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthShell, PasswordInput, authButtonClass, authInputClass, authLabelClass } from "@/components/AuthShell";

function LoginForm() {
  const router = useRouter();
  const resetDone = useSearchParams().get("reset") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed. Check your details and try again.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("We couldn't reach StockSense. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Log in"
      subtitle="Use your work email to open the inventory dashboard."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-medium text-zinc-900 hover:underline hover:underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5" aria-busy={loading}>
        <div>
          <label className={authLabelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authInputClass}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label className={authLabelClass} htmlFor="password" style={{ marginBottom: 0 }}>
              Password
            </label>
            <Link href="/forgot" className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {resetDone && !error ? (
          <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-[13px] font-medium text-emerald-700">Password updated. Log in with the new one.</p>
        ) : null}
        {error ? <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[13px] font-medium text-red-700">{error}</p> : null}
        <button type="submit" disabled={loading} className={authButtonClass}>
          {loading ? "Signing in…" : "Continue"}
        </button>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
