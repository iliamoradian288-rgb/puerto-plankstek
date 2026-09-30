import { CalendarDays, Sparkles } from "lucide-react";
import Image from "next/image";
import { loadEvents, nextUpcoming } from "@/lib/events";
import Countdown from "@/components/events/Countdown";

export const metadata = {
  title: "Eventos — Puerto Plankstek",
  description:
    "Próximos eventos en Puerto Plankstek: música en vivo, noches temáticas y más.",
};

export default async function EventosPage() {
  const { items, source } = await loadEvents();
  const next = nextUpcoming(items);

  return (
    <div className="bg-brand-sand-light">
      <div className="bg-brand-red-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-brand-glow">
            Noche a noche
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-wide text-brand-white sm:text-5xl">
            Eventos
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-white/70">
            Música en vivo, noches temáticas y celebraciones. Reserva tu
            sitio o pásate directo.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Próximo evento + countdown */}
        {next && (
          <div className="mb-12 overflow-hidden rounded-2xl bg-brand-ink text-brand-white shadow-xl">
            <div className="grid gap-0 sm:grid-cols-2">
              {next.image_url && (
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[320px]">
                  <Image
                    src={next.image_url}
                    alt={next.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center p-8">
                <p className="font-display inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-glow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-ink">
                  <Sparkles className="h-3.5 w-3.5" /> Próximo evento
                </p>
                <h2 className="font-display mt-4 text-3xl font-bold uppercase tracking-wide">
                  {next.title}
                </h2>
                {next.description && (
                  <p className="mt-3 text-sm leading-relaxed text-brand-white/70">
                    {next.description}
                  </p>
                )}
                <div className="mt-6">
                  <Countdown target={next.date} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de eventos */}
        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((e) => (
              <article
                key={e.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5"
              >
                {e.image_url && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={e.image_url}
                      alt={e.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-xs text-brand-coal/50">
                    <CalendarDays className="h-3.5 w-3.5 text-brand-red" />
                    {new Date(e.date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <h3 className="font-display mt-2 text-lg font-bold uppercase tracking-wide text-brand-coal">
                    {e.title}
                  </h3>
                  {e.description && (
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-brand-coal/70">
                      {e.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-xl bg-white p-10 text-center shadow ring-1 ring-black/5">
            <p className="font-display text-lg font-bold uppercase tracking-widest text-brand-coal">
              Sin eventos programados
            </p>
            <p className="mt-2 text-sm text-brand-coal/60">
              Vuelve pronto o síguenos en redes para enterarte antes que nadie.
            </p>
          </div>
        )}

        {source === "seed" && (
          <p className="mt-8 text-center text-xs text-brand-coal/40">
            Eventos de muestra — se actualizan solos al conectar Supabase.
          </p>
        )}
      </div>
    </div>
  );
}
