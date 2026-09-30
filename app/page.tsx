import Image from "next/image";
import Link from "next/link";
import {
  UtensilsCrossed,
  CalendarDays,
  Camera,
  Users,
  BadgePercent,
  MapPin,
  Clock,
  ArrowRight,
  Flame,
  Sparkles,
} from "lucide-react";
import { loadMenuItems } from "@/lib/menu";
import { loadEvents, nextUpcoming } from "@/lib/events";
import { loadOffers } from "@/lib/offers";
import Countdown from "@/components/events/Countdown";
import SwedishFlag from "@/components/SwedishFlag";
import MenuCard from "@/components/menu/MenuCard";

export default async function HomePage() {
  const [{ items: menuItems }, { items: events }, { items: offers }] =
    await Promise.all([loadMenuItems(), loadEvents(), loadOffers()]);

  const nextEvent = nextUpcoming(events);
  const featuredFood = menuItems
    .filter((i) => i.kind === "comida")
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-red-deep text-brand-white">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/menu/dish-27.jpg"
            alt="Fondo brasa"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-sweden-blue" />
            <span className="w-1 h-1 rounded-full bg-sweden-yellow" />
            <span className="w-1 h-1 rounded-full bg-sweden-blue" />
          </div>
          <span className="font-display inline-flex items-center gap-2 rounded-full bg-brand-glow/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-brand-glow ring-1 ring-brand-glow/40 backdrop-blur">
            <Flame className="h-4 w-4" /> Brasa & Cocina Nórdica
          </span>
          <h1 className="font-display mt-6 text-4xl font-bold uppercase tracking-tight text-brand-white sm:text-6xl md:text-7xl">
            El auténtico sabor <br />
            <span className="text-brand-glow">frente al puerto</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-white/80 sm:text-lg">
            Plankstek sobre tabla de roble, cortes a la brasa, especialidades
            persas y coctelería de autor. Noches con música en vivo y sala para
            eventos privados.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="font-display inline-flex items-center justify-center gap-2 rounded-full bg-brand-glow px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-brand-ink transition-colors hover:bg-brand-glow-soft"
            >
              <UtensilsCrossed className="h-4 w-4" />
              Ver la Carta
            </Link>
            <Link
              href="/reserva-eventos"
              className="font-display inline-flex items-center justify-center gap-2 rounded-full bg-sweden-blue border-2 border-sweden-yellow px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-sweden-yellow transition-all hover:bg-sweden-blue/90 hover:scale-105 shadow-lg"
            >
              <SwedishFlag className="h-3.5 w-auto" />
              Reserva de Eventos +20
            </Link>
          </div>

          {/* Tarjetas rápidas */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Menú", href: "/menu", icon: UtensilsCrossed, desc: "Comida y bebida" },
              { label: "Eventos", href: "/eventos", icon: CalendarDays, desc: "Música en vivo" },
              { label: "Galería", href: "/fotos", icon: Camera, desc: "El local y platos" },
              { label: "Ofertas", href: "/ofertas", icon: BadgePercent, desc: "Promociones" },
            ].map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="group rounded-xl bg-white/5 p-4 text-left ring-1 ring-white/10 backdrop-blur transition-all hover:bg-white/10 hover:ring-brand-glow/50"
              >
                <s.icon className="h-5 w-5 text-brand-glow transition-transform group-hover:scale-110" />
                <p className="font-display mt-2 text-sm font-bold uppercase tracking-wider text-brand-white">
                  {s.label}
                </p>
                <p className="text-xs text-brand-white/60">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Próximo evento + Countdown */}
      {nextEvent && (
        <section className="bg-brand-ink text-brand-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:flex-row sm:p-8">
              <div className="text-center sm:text-left">
                <span className="font-display inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand-glow">
                  <Sparkles className="h-3.5 w-3.5" /> Próximo Evento
                </span>
                <h2 className="font-display mt-2 text-2xl font-bold uppercase tracking-wide sm:text-3xl">
                  {nextEvent.title}
                </h2>
                <p className="mt-1 text-sm text-brand-white/70">
                  {new Date(nextEvent.date).toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <Countdown target={nextEvent.date} />
                <Link
                  href="/eventos"
                  className="font-display flex shrink-0 items-center gap-1.5 rounded-full bg-brand-glow px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-brand-ink hover:bg-brand-glow-soft"
                >
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platos destacados */}
      {featuredFood.length > 0 && (
        <section className="bg-brand-sand-light py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
                  De la brasa a tu mesa
                </span>
                <h2 className="font-display mt-1 text-3xl font-bold uppercase tracking-wide text-brand-coal sm:text-4xl">
                  Platos destacados
                </h2>
              </div>
              <Link
                href="/menu"
                className="font-display flex items-center gap-1.5 rounded-full bg-brand-red px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-red-dark"
              >
                Ver carta completa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredFood.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ofertas activas */}
      {offers.length > 0 && (
        <section className="bg-brand-red-deep py-14 text-brand-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-brand-glow">
                Promociones de la casa
              </span>
              <h2 className="font-display mt-1 text-3xl font-bold uppercase tracking-wide text-brand-white sm:text-4xl">
                Ofertas activas
              </h2>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {offers.slice(0, 2).map((o) => (
                <div
                  key={o.id}
                  className="flex flex-col justify-between rounded-2xl bg-brand-red p-6 ring-1 ring-white/10"
                >
                  <div>
                    <span className="font-display inline-block rounded-full bg-brand-glow px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-ink">
                      {o.discount_tag}
                    </span>
                    <h3 className="font-display mt-3 text-2xl font-bold uppercase tracking-wide">
                      {o.title}
                    </h3>
                    {o.description && (
                      <p className="mt-2 text-sm text-brand-white/80">
                        {o.description}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/ofertas"
                    className="font-display mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-glow hover:underline"
                  >
                    Ver detalles <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Eventos +20 */}
      <section className="bg-brand-sand-light py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-red to-brand-red-dark p-8 text-brand-white shadow-xl sm:p-12">
            <div className="max-w-2xl">
              <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-brand-glow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-ink">
                <Users className="h-4 w-4" /> Grupos de +20 personas
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold uppercase tracking-wide sm:text-5xl">
                ¿Organizas un evento especial?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-white/80 sm:text-base">
                Cumpleaños, cenas de empresa, despedidas y celebraciones.
                Ofrecemos sala privada, menús personalizados y ambientación a
                medida.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/reserva-eventos"
                  className="font-display inline-flex items-center gap-2 rounded-full bg-sweden-blue px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-sweden-yellow ring-2 ring-sweden-yellow shadow-lg transition-all hover:bg-sweden-blue/80 hover:scale-105"
                >
                  <Users className="h-4 w-4" />
                  Solicitar reserva
                </Link>
                <Link
                  href="/contacto"
                  className="font-display inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/30 hover:ring-white"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info rápida / Localización */}
      <section className="bg-brand-ink py-12 text-brand-white/80">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
            <MapPin className="h-8 w-8 shrink-0 text-brand-glow" />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-white">
                Ubicación
              </p>
              <p className="text-xs text-brand-white/60">
                Puerto Deportivo Fuengirola, 29640
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
            <Clock className="h-8 w-8 shrink-0 text-brand-glow" />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-white">
                Horario
              </p>
              <p className="text-xs text-brand-white/60">
                Lun–Dom · 17:00 – 01:00
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
            <Flame className="h-8 w-8 shrink-0 text-brand-glow" />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-white">
                Ambiente
              </p>
              <p className="text-xs text-brand-white/60">
                Brasa, terraza & música en vivo
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
