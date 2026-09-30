import Image from "next/image";
import { UtensilsCrossed, Wine } from "lucide-react";
import { formatPrice, type MenuItem } from "@/lib/menu";

export default function MenuCard({ item }: { item: MenuItem }) {
  const isDrink = item.kind === "bebida";
  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5 transition-shadow hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-red-deep">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-brand-red-deep text-brand-sand">
            {isDrink ? (
              <Wine className="h-10 w-10 text-brand-glow" />
            ) : (
              <UtensilsCrossed className="h-10 w-10 text-brand-glow" />
            )}
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-brand-white/70">
              Plankstek
            </p>
          </div>
        )}
        <span className="font-display absolute bottom-3 right-3 rounded-full bg-brand-glow px-3.5 py-1 text-sm font-bold text-brand-ink shadow">
          {formatPrice(item.price)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-brand-coal">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-brand-coal/70">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
