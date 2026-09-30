import { getClientId, isConfigured, supabase } from "@/lib/supabase";

export interface GalleryPhoto {
  id: string;
  title: string | null;
  image_url: string;
  category: string;
}

export const GALLERY_SEED: GalleryPhoto[] = [
  { id: "seed-g1", title: "Cócteles", image_url: "/menu/dish-22.jpg", category: "ambiente" },
  { id: "seed-g2", title: "Parrillada", image_url: "/menu/dish-27.jpg", category: "comida" },
  { id: "seed-g3", title: "Burgers", image_url: "/menu/dish-08.jpg", category: "comida" },
  { id: "seed-g4", title: "Frozen", image_url: "/menu/dish-24.jpg", category: "ambiente" },
  { id: "seed-g5", title: "Mesa compartida", image_url: "/menu/dish-20.jpg", category: "local" },
  { id: "seed-g6", title: "Koobideh", image_url: "/menu/dish-06.jpg", category: "comida" },
  { id: "seed-g7", title: "Nachos", image_url: "/menu/dish-19.jpg", category: "comida" },
  { id: "seed-g8", title: "Daiquiri", image_url: "/menu/dish-25.jpg", category: "ambiente" },
  { id: "seed-g9", title: "Berenjena persa", image_url: "/menu/dish-17.jpg", category: "comida" },
  { id: "seed-g10", title: "Pepper steak", image_url: "/menu/dish-10.jpg", category: "comida" },
];

export const GALLERY_CATS = [
  { value: "todas", label: "Todo" },
  { value: "local", label: "Local" },
  { value: "ambiente", label: "Ambiente" },
  { value: "comida", label: "Comida" },
  { value: "eventos", label: "Eventos" },
] as const;

export async function loadGallery(): Promise<{ items: GalleryPhoto[]; source: "supabase" | "seed" }> {
  const cid = getClientId();
  if (isConfigured() && cid) {
    try {
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("id,title,image_url,category")
        .eq("client_id", cid)
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) return { items: data, source: "supabase" };
    } catch {
      /* cae a semilla */
    }
  }
  return { items: GALLERY_SEED, source: "seed" };
}
