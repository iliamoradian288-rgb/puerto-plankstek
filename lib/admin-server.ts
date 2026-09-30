import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getClientId } from "@/lib/supabase";

async function supabaseServer() {
  const store = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => store.getAll(),
        setAll: (toSet) => {
          try { toSet.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* Server Component */ }
        },
      },
    }
  );
}

export async function getSession() {
  const db = await supabaseServer();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { user: null, clientId: null as string | null };
  const clientId = getClientId();
  if (!clientId) return { user: null, clientId: null };
  const { data } = await db
    .from("client_users")
    .select("client_id")
    .eq("user_id", user.id)
    .eq("client_id", clientId)
    .maybeSingle();
  if (!data) return { user: null, clientId: null };
  return { user, clientId };
}

export async function isAdmin() {
  const s = await getSession();
  return !!s.user;
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      getClientId()
  );
}
