import { getClientId, isConfigured, supabase } from "@/lib/supabase";

export type MenuCategory = "comida" | "bebida";

export interface MenuItem {
  id: string;
  kind: MenuCategory;
  title: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
}

export const FOOD_SUBS = [
  { value: "entrantes", label: "Entrantes" },
  { value: "principales", label: "Principales" },
  { value: "postres", label: "Postres" },
] as const;

export const DRINK_SUBS = [
  { value: "cocteles", label: "Cócteles" },
  { value: "vinos", label: "Vinos" },
  { value: "cervezas", label: "Cervezas" },
  { value: "refrescos", label: "Refrescos" },
  { value: "cafes", label: "Cafés" },
] as const;

// --- Semilla local (solo se usa si Supabase no está configurado) ---
export const MENU_SEED: MenuItem[] = [
  { id: "seed-09", kind: "comida", title: "Pan de ajo con tzatziki", description: "Pan de ajo al horno con aceitunas, tzatziki y hierbas.", price: 6.5, category: "entrantes", image_url: "/menu/dish-09.jpg" },
  { id: "seed-19", kind: "comida", title: "Nachos Plankstek", description: "Nachos con carne, queso fundido y tres salsas.", price: 9.9, category: "entrantes", image_url: "/menu/dish-19.jpg" },
  { id: "seed-08", kind: "comida", title: "Burger Double", description: "Doble smash burger con queso, salsa y patatas.", price: 13.9, category: "principales", image_url: "/menu/dish-08.jpg" },
  { id: "seed-10", kind: "comida", title: "Pepper Steak", description: "Filete de ternera a la pimienta con verduras.", price: 19.9, category: "principales", image_url: "/menu/dish-10.jpg" },
  { id: "seed-04", kind: "comida", title: "Fish & Chips", description: "Pescado crujiente con patatas y tártara.", price: 12.5, category: "principales", image_url: "/menu/dish-04.jpg" },
  { id: "seed-p1", kind: "comida", title: "Tarta de queso", description: "Cremosa, al horno, con base de galleta.", price: 6.9, category: "postres", image_url: null },
  { id: "seed-07", kind: "bebida", title: "Mojito clásico", description: "Ron, hierbabuena, lima y soda.", price: 8.0, category: "cocteles", image_url: "/menu/dish-07.jpg" },
  { id: "seed-24", kind: "bebida", title: "Margarita frozen", description: "Frozen con escarchado de sal.", price: 8.5, category: "cocteles", image_url: "/menu/dish-24.jpg" },
  { id: "seed-v1", kind: "bebida", title: "Rioja Crianza", description: "Copa / botella: 4,50 € / 22 €.", price: 4.5, category: "vinos", image_url: null },
  { id: "seed-c1", kind: "bebida", title: "Caña", description: "De barril, bien tirada.", price: 3.0, category: "cervezas", image_url: null },
  { id: "seed-r1", kind: "bebida", title: "Refresco", description: "Cola, limón, naranja o tónica.", price: 2.8, category: "refrescos", image_url: null },
  { id: "seed-k1", kind: "bebida", title: "Espresso / Cortado", description: "Café de especialidad.", price: 2.2, category: "cafes", image_url: null },
];

export async function loadMenuItems(): Promise<{ items: MenuItem[]; source: "supabase" | "seed" }> {
  const cid = getClientId();
  if (isConfigured() && cid) {
    try {
      const [foodRes, drinkRes] = await Promise.all([
        supabase
          .from("food_items")
          .select("id,title,description,price,category,image_url")
          .eq("client_id", cid)
          .order("created_at", { ascending: true }),
        supabase
          .from("drink_items")
          .select("id,title,description,price,category,image_url")
          .eq("client_id", cid)
          .order("created_at", { ascending: true }),
      ]);
      if (foodRes.error) throw foodRes.error;
      if (drinkRes.error) throw drinkRes.error;
      const food: MenuItem[] = (foodRes.data ?? []).map((i) => ({
        id: i.id,
        kind: "comida" as const,
        title: i.title,
        description: i.description,
        price: Number(i.price),
        category: i.category,
        image_url: i.image_url,
      }));
      const drinks: MenuItem[] = (drinkRes.data ?? []).map((i) => ({
        id: i.id,
        kind: "bebida" as const,
        title: i.title,
        description: i.description,
        price: Number(i.price),
        category: i.category,
        image_url: i.image_url,
      }));
      const items = [...food, ...drinks];
      if (items.length > 0) return { items, source: "supabase" };
    } catch {
      /* cae a semilla */
    }
  }
  return { items: MENU_SEED, source: "seed" };
}

export function formatPrice(n: number) {
  return `${Number(n).toFixed(2).replace(".", ",")} €`;
}
