import { getClientId, isConfigured, supabase } from "@/lib/supabase";

export interface Offer {
  id: string;
  title: string;
  description: string | null;
  discount_tag: string;
  image_url: string | null;
  is_active: boolean;
}

export const OFFERS_SEED: Offer[] = [
  { id: "seed-o1", title: "2×1 en Hamburguesas", description: "Doble burger al precio de una. Solo en sala.", discount_tag: "2x1", image_url: "/menu/dish-08.jpg", is_active: true },
  { id: "seed-o2", title: "Hora Feliz de Cócteles", description: "Mojitos y margaritas a 5 €. J-D 19:00-21:00.", discount_tag: "50%", image_url: "/menu/dish-24.jpg", is_active: true },
];

export async function loadOffers(): Promise<{ items: Offer[]; source: "supabase" | "seed" }> {
  const cid = getClientId();
  if (isConfigured() && cid) {
    try {
      const { data, error } = await supabase
        .from("offers")
        .select("id,title,description,discount_tag,image_url,is_active")
        .eq("client_id", cid)
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) return { items: data, source: "supabase" };
    } catch {
      /* cae a semilla */
    }
  }
  return { items: OFFERS_SEED.filter((o) => o.is_active), source: "seed" };
}
