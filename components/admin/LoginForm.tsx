"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { browserSupabase } from "@/lib/supabase-browser";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const sb = browserSupabase();
      const { error: signErr } = await sb.auth.signInWithPassword({ email, password });
      if (signErr) throw new Error("Email o contraseña incorrectos.");
      // Verifica vínculo con este restaurante
      const res = await fetch("/api/admin/me");
      if (!res.ok) {
        await sb.auth.signOut();
        throw new Error("Este usuario no tiene acceso a este restaurante.");
      }
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al entrar");
    } finally {
      setBusy(false);
    }
  }

  const input =
    "w-full rounded-xl border border-brand-coal/15 bg-white px-4 py-3 text-sm text-brand-coal placeholder:text-brand-coal/40 focus:border-brand-red focus:outline-none";

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4 py-16">
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-black/5">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-red">
          <Lock className="h-5 w-5 text-white" />
        </span>
        <h1 className="font-display mt-4 text-xl font-bold uppercase tracking-widest text-brand-coal">
          Panel admin
        </h1>
        <p className="mt-1 text-sm text-brand-coal/60">
          Solo para el equipo del restaurante.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            className={input}
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete="current-password"
            className={input}
          />
          {error && (
            <p className="rounded-lg bg-brand-red/10 p-2.5 text-sm font-medium text-brand-red">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !email || !password}
            className="font-display flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando…
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
