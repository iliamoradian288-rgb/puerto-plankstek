"use client";

import { useMemo, useState } from "react";
import { UtensilsCrossed, Wine, Search } from "lucide-react";
import { DRINK_SUBS, FOOD_SUBS, type MenuCategory, type MenuItem } from "@/lib/menu";
import MenuCard from "./MenuCard";

export default function MenuSection({
  items,
  source,
  initialCategory = "comida",
}: {
  items: MenuItem[];
  source: "supabase" | "seed";
  initialCategory?: MenuCategory;
}) {
  const [tab, setTab] = useState<MenuCategory>(initialCategory);
  const [sub, setSub] = useState<string>("todas");
  const [query, setQuery] = useState("");

  const subs = tab === "comida" ? FOOD_SUBS : DRINK_SUBS;

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (i.kind !== tab) return false;
      if (sub !== "todas" && i.category !== sub) return false;
      if (query.trim() && !`${i.title} ${i.description ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()))
        return false;
      return true;
    });
  }, [items, tab, sub, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const i of items) {
      if (i.kind !== tab) continue;
      c[i.category] = (c[i.category] ?? 0) + 1;
    }
    return c;
  }, [items, tab]);

  function switchTab(t: MenuCategory) {
    setTab(t);
    setSub("todas");
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-brand-ink p-1.5 shadow-lg">
          <button
            onClick={() => switchTab("comida")}
            className={`font-display flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              tab === "comida" ? "bg-brand-red text-brand-white" : "text-brand-white/60 hover:text-brand-white"
            }`}
          >
            <UtensilsCrossed className="h-4 w-4 text-brand-glow" />
            Comida
          </button>
          <button
            onClick={() => switchTab("bebida")}
            className={`font-display flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              tab === "bebida" ? "bg-brand-red text-brand-white" : "text-brand-white/60 hover:text-brand-white"
            }`}
          >
            <Wine className="h-4 w-4 text-brand-glow" />
            Bebida
          </button>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-md">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-coal/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar en ${tab === "comida" ? "comida" : "bebida"}…`}
            className="w-full rounded-full border border-brand-coal/15 bg-white py-2.5 pl-11 pr-4 text-sm text-brand-coal placeholder:text-brand-coal/40 focus:border-brand-red focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSub("todas")}
          className={`font-display rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
            sub === "todas" ? "bg-brand-glow text-brand-ink" : "bg-white text-brand-coal/70 ring-1 ring-brand-coal/15 hover:ring-brand-red"
          }`}
        >
          Todo
        </button>
        {subs.map((s) => (
          <button
            key={s.value}
            onClick={() => setSub(s.value)}
            className={`font-display rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
              sub === s.value ? "bg-brand-glow text-brand-ink" : "bg-white text-brand-coal/70 ring-1 ring-brand-coal/15 hover:ring-brand-red"
            }`}
          >
            {s.label}
            {counts[s.value] ? <span className="ml-1.5 opacity-60">{counts[s.value]}</span> : null}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-8 max-w-md rounded-xl bg-white p-10 text-center shadow ring-1 ring-black/5">
          <p className="font-display text-lg font-bold uppercase tracking-widest text-brand-coal">Nada por aquí</p>
          <p className="mt-2 text-sm text-brand-coal/60">
            No hay platos en esta categoría todavía. Prueba con otro filtro o pregunta en sala por las sugerencias del día.
          </p>
        </div>
      )}

      {source === "seed" && (
        <p className="mt-8 text-center text-xs text-brand-coal/40">
          Carta de muestra con fotos del local — se actualiza sola al conectar Supabase.
        </p>
      )}
    </div>
  );
}
