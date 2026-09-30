import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function getClientId() {
  return process.env.NEXT_PUBLIC_CLIENT_ID ?? "";
}

export function isConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      getClientId()
  );
}

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase no está configurado. Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local"
    );
  }
  _client = createClient(url, key);
  return _client;
}

/**
 * Proxy de Supabase que se inicializa bajo demanda (lazy).
 * Permite usar `supabase.from(...)` sin lanzar error durante la compilación/evaluación de módulos si faltan variables de entorno.
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getClient();
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function"
      ? (val as (...args: unknown[]) => unknown).bind(client)
      : val;
  },
});
