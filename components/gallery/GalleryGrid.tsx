"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { GALLERY_CATS, type GalleryPhoto } from "@/lib/gallery";

export default function GalleryGrid({ items }: { items: GalleryPhoto[] }) {
  const [cat, setCat] = useState("todas");
  const [light, setLight] = useState<number | null>(null);

  const filtered =
    cat === "todas" ? items : items.filter((p) => p.category === cat);

  function step(dir: 1 | -1) {
    if (light === null) return;
    setLight((light + dir + filtered.length) % filtered.length);
  }

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2">
        {GALLERY_CATS.map((c) => (
          <button
            key={c.value}
            onClick={() => {
              setCat(c.value);
              setLight(null);
            }}
            className={`font-display rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
              cat === c.value
                ? "bg-brand-glow text-brand-ink"
                : "bg-white text-brand-coal/70 ring-1 ring-brand-coal/15 hover:ring-brand-red"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 columns-2 gap-4 space-y-4 md:columns-3">
        {filtered.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setLight(i)}
            className="group relative block w-full overflow-hidden rounded-xl shadow-md"
          >
            <Image
              src={p.image_url}
              alt={p.title ?? "Foto del local"}
              width={600}
              height={450}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-brand-ink/0 transition-colors group-hover:bg-brand-ink/40">
              <Expand className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            {p.title && (
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-ink/80 to-transparent px-3 pb-2 pt-6 text-left text-xs font-semibold text-white">
                {p.title}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-brand-coal/60">
          No hay fotos en esta categoría todavía.
        </p>
      )}

      {/* Lightbox */}
      {light !== null && filtered[light] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-ink/95 p-4"
          onClick={() => setLight(null)}
        >
          <button
            aria-label="Cerrar"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <figure
            className="max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[light].image_url}
              alt={filtered[light].title ?? "Foto ampliada"}
              width={1200}
              height={800}
              className="max-h-[78vh] w-auto rounded-lg object-contain"
            />
            {filtered[light].title && (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {filtered[light].title} · {light + 1}/{filtered.length}
              </figcaption>
            )}
          </figure>
          <button
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
