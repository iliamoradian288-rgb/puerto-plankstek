import { getClientId, isConfigured, supabase } from "@/lib/supabase";

export interface EventItem {
  id: string;
  title: string;
  description: string | null;
  date: string;
  image_url: string | null;
}

function inDays(days: number, hour = 21): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const EVENTS_SEED: EventItem[] = [
  { id: "seed-e1", title: "Noche de Rock en Vivo", description: "Banda tributo + parrillada especial.", date: inDays(4), image_url: "/menu/dish-22.jpg" },
  { id: "seed-e2", title: "Hora Feliz de Cócteles", description: "Mojitos y margaritas frozen 2×10 €.", date: inDays(2, 19), image_url: "/menu/dish-24.jpg" },
  { id: "seed-e3", title: "Noche Persa", description: "Menú degustación persa con música tradicional.", date: inDays(9), image_url: "/menu/dish-06.jpg" },
];

export async function loadEvents(): Promise<{ items: EventItem[]; source: "supabase" | "seed" }> {
  const cid = getClientId();
  if (isConfigured() && cid) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("id,title,description,event_date,image_url")
        .eq("client_id", cid)
        .order("event_date", { ascending: true });
      if (!error && data && data.length > 0) {
        const items = data.map((e) => ({
          id: e.id,
          title: e.title,
          description: e.description,
          date: e.event_date,
          image_url: e.image_url,
        }));
        return { items, source: "supabase" };
      }
    } catch {
      /* cae a semilla */
    }
  }
  return { items: EVENTS_SEED, source: "seed" };
}

export function nextUpcoming(items: EventItem[]): EventItem | null {
  const now = Date.now();
  const upcoming = items
    .filter((e) => new Date(e.date).getTime() > now)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return upcoming[0] ?? null;
}
