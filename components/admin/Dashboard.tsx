"use client";

import { useState } from "react";
import { UtensilsCrossed, CalendarDays, Camera, BadgePercent, ClipboardList, LogOut, Wine } from "lucide-react";
import { browserSupabase } from "@/lib/supabase-browser";
import FoodTab from "./tabs/FoodTab";
import DrinksTab from "./tabs/DrinksTab";
import EventsTab from "./tabs/EventsTab";
import GalleryTab from "./tabs/GalleryTab";
import OffersTab from "./tabs/OffersTab";
import ReservationsTab from "./tabs/ReservationsTab";

const TABS = [
  { value: "reservas", label: "Reservas", icon: ClipboardList, el: <ReservationsTab /> },
  { value: "comida", label: "Comida", icon: UtensilsCrossed, el: <FoodTab /> },
  { value: "bebidas", label: "Bebidas", icon: Wine, el: <DrinksTab /> },
  { value: "eventos", label: "Eventos", icon: CalendarDays, el: <EventsTab /> },
  { value: "galeria", label: "Galería", icon: Camera, el: <GalleryTab /> },
  { value: "ofertas", label: "Ofertas", icon: BadgePercent, el: <OffersTab /> },
] as const;

export default function Dashboard() {
  const [tab, setTab] = useState<string>("reservas");

  async function logout() {
    await browserSupabase().auth.signOut();
    window.location.reload();
  }

  const active = TABS.find((t) => t.value === tab)!;

  return (
    <div className="min-h-[70vh] bg-brand-sand-light">
      <div className="bg-brand-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em]">
            Panel <span className="text-brand-glow">Plankstek</span>
          </p>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            Salir
          </button>
        </div>
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 scrollbar-none">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`font-display flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                tab === t.value
                  ? "bg-brand-red text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <t.icon className="h-3.5 w-3.5 text-brand-glow" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="font-display mb-4 flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-brand-coal">
          <active.icon className="h-5 w-5 text-brand-red" />
          {active.label}
        </h1>
        {active.el}
      </div>
    </div>
  );
}