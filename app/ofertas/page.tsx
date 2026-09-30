import Image from "next/image";
import Link from "next/link";
import { BadgePercent, ArrowRight } from "lucide-react";
import { loadOffers } from "@/lib/offers";

export const metadata = {
  title: "Ofertas — Puerto Plankstek",
  description: "Promociones activas: 2x1, hora feliz y menús especiales.",
};

const TAG_STYLE: Record<string, string> = {
  "2x1": "bg-brand-glow text-brand-ink",
  "50%": "bg-brand-red text-white",
  Especial: "bg-brand-ink text-brand-glow",
};

export default async function OfertasPage() {
  const { items } = await loadOffers();

  return (
    <div className="bg-brand-sand-light">
      <div className="bg-brand-red-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-brand-glow">
            No te lo pierdas
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-wide text-brand-white sm:text-5xl">
            Ofertas
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-white/70">
            Promociones activas de la casa. Pregunta en sala por las
            condiciones del día.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((o) => (
              <article
                key={o.id}
                className="group overflow-hidden rounded-2xl bg-brand-red text-brand-white shadow-lg"
              >
                {o.image_url && (
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <Image
                      src={o.image_url}
                      alt={o.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span
                      className={`font-display absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-widest shadow ${TAG_STYLE[o.discount_tag] ?? "bg-brand-glow text-brand-ink"}`}
                    >
                      <BadgePercent className="h-4 w-4" />
                      {o.discount_tag}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  {!o.image_url && (
                    <span
                      className={`font-display inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-widest ${TAG_STYLE[o.discount_tag] ?? "bg-brand-glow text-brand-ink"}`}
                    >
                      <BadgePercent className="h-4 w-4" />
                      {o.discount_tag}
                    </span>
                  )}
                  <h2 className="font-display mt-3 text-2xl font-bold uppercase tracking-wide">
                    {o.title}
                  </h2>
                  {o.description && (
                    <p className="mt-2 text-sm leading-relaxed text-brand-white/80">
                      {o.description}
                    </p>
                  )}
                  <Link
                    href="/reserva-eventos"
                    className="font-display mt-5 inline-flex items-center gap-2 rounded-full bg-brand-glow px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-brand-ink transition-colors hover:bg-brand-glow-soft"
                  >
                    Aprovechar
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-xl bg-white p-10 text-center shadow ring-1 ring-black/5">
            <p className="font-display text-lg font-bold uppercase tracking-widest text-brand-coal">
              Sin ofertas ahora mismo
            </p>
            <p className="mt-2 text-sm text-brand-coal/60">
              Vuelve pronto o síguenos en redes para enterarte antes que nadie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
