"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  UtensilsCrossed,
  Wine,
  CalendarDays,
  Camera,
  Users,
  BadgePercent,
  Phone,
} from "lucide-react";
import SwedishFlag from "@/components/SwedishFlag";

const NAV = [
  { label: "Eventos", href: "/eventos", icon: CalendarDays },
  { label: "Fotos del Local", href: "/fotos", icon: Camera },
  { label: "Reserva de Eventos", href: "/reserva-eventos", icon: Users, badge: "+20" },
  { label: "Ofertas", href: "/ofertas", icon: BadgePercent },
  { label: "Contacto", href: "/contacto", icon: Phone },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Franja superior: logo centrado sobre rojo marca con ribete escandinavo */}
      <div className="bg-brand-red border-b-4 border-brand-sand relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sweden-blue via-sweden-yellow to-sweden-blue opacity-80" />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-4">
          <Link href="/" className="flex flex-col items-center gap-2">
            <Image
              src="/logo/plankstek-horizontal.png"
              alt="Puerto Plankstek — Restaurant & Events"
              width={420}
              height={224}
              priority
              className="h-16 w-auto sm:h-20"
            />
          </Link>
          <div className="flex items-center gap-2">
            <SwedishFlag className="h-3 w-auto rounded-[2px] ring-1 ring-white/30" />
            <p className="font-display text-[11px] font-medium uppercase tracking-[0.35em] text-brand-white/80">
              Puerto · Cocina Escandinava & Brasa
            </p>
            <SwedishFlag className="h-3 w-auto rounded-[2px] ring-1 ring-white/30 scale-x-[-1]" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-sweden-yellow/70">
            Puerto Deportivo Fuengirola · Málaga
          </p>
        </div>
      </div>

      {/* Barra de navegación */}
      <nav className="bg-brand-ink text-brand-white shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          {/* Desktop */}
          <ul className="hidden items-stretch lg:flex">
            <li
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <Link
                href="/menu"
                className="font-display flex items-center gap-1.5 px-5 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors hover:bg-brand-red hover:text-brand-white"
              >
                <UtensilsCrossed className="h-4 w-4 text-brand-glow" />
                Menú
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                />
              </Link>
              {menuOpen && (
                <div className="absolute left-0 top-full min-w-52 overflow-hidden rounded-b-lg border-t-2 border-brand-glow bg-brand-ink shadow-xl">
                  <Link
                    href="/menu?cat=comida"
                    className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-brand-red"
                  >
                    <UtensilsCrossed className="h-4 w-4 text-brand-sand" />
                    <span>
                      <span className="font-display block font-semibold uppercase tracking-widest">
                        Comida
                      </span>
                      <span className="text-xs text-brand-white/60">
                        Entrantes · Principales · Postres
                      </span>
                    </span>
                  </Link>
                  <Link
                    href="/menu?cat=bebida"
                    className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-brand-red"
                  >
                    <Wine className="h-4 w-4 text-brand-sand" />
                    <span>
                      <span className="font-display block font-semibold uppercase tracking-widest">
                        Bebida
                      </span>
                      <span className="text-xs text-brand-white/60">
                        Vinos · Cócteles · Cervezas
                      </span>
                    </span>
                  </Link>
                </div>
              )}
            </li>

            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-display flex items-center gap-1.5 px-5 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors hover:bg-brand-red hover:text-brand-white"
                >
                  <item.icon className="h-4 w-4 text-brand-glow" />
                  {item.label}
                  {item.badge && (
                    <span className="flex items-center gap-1 rounded-full bg-sweden-blue px-2 py-0.5 text-[10px] font-bold text-sweden-yellow ring-1 ring-sweden-yellow/50">
                      <SwedishFlag className="h-2 w-auto" />
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Reserva — azul sueco con borde amarillo */}
          <Link
            href="/reserva-eventos"
            className="font-display hidden items-center gap-2 rounded-full bg-sweden-blue px-5 py-2 text-xs font-bold uppercase tracking-widest text-sweden-yellow ring-2 ring-sweden-yellow shadow-md transition-all hover:bg-sweden-blue/80 hover:scale-105 lg:flex"
          >
            <SwedishFlag className="h-2.5 w-auto" />
            Reserva Eventos +20
          </Link>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex w-full items-center justify-between py-3 text-sm font-semibold uppercase tracking-widest lg:hidden"
          >
            <span className="font-display">Navegación</span>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Panel móvil */}
        {mobileOpen && (
          <div className="border-t border-brand-white/10 lg:hidden">
            <div className="space-y-1 px-4 py-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="font-display flex w-full items-center gap-2 rounded px-3 py-2.5 text-sm font-semibold uppercase tracking-widest hover:bg-brand-red"
              >
                <UtensilsCrossed className="h-4 w-4 text-brand-glow" />
                Menú
                <ChevronDown
                  className={`ml-auto h-4 w-4 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileMenuOpen && (
                <div className="ml-6 space-y-1 border-l-2 border-brand-glow/50 pl-3">
                  <Link
                    href="/menu?cat=comida"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-brand-red"
                  >
                    <UtensilsCrossed className="h-4 w-4 text-brand-sand" />
                    Comida
                  </Link>
                  <Link
                    href="/menu?cat=bebida"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-brand-red"
                  >
                    <Wine className="h-4 w-4 text-brand-sand" />
                    Bebida
                  </Link>
                </div>
              )}
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display flex items-center gap-2 rounded px-3 py-2.5 text-sm font-semibold uppercase tracking-widest hover:bg-brand-red"
                >
                  <item.icon className="h-4 w-4 text-brand-glow" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto flex items-center gap-1 rounded-full bg-sweden-blue px-2 py-0.5 text-[10px] font-bold text-sweden-yellow">
                      <SwedishFlag className="h-2 w-auto" />
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                href="/reserva-eventos"
                onClick={() => setMobileOpen(false)}
                className="font-display mt-2 flex items-center justify-center gap-2 rounded-full bg-sweden-blue px-5 py-3 text-center text-sm font-bold uppercase tracking-widest text-sweden-yellow ring-1 ring-sweden-yellow/60"
              >
                <SwedishFlag className="h-2.5 w-auto" />
                Reservar evento +20
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
