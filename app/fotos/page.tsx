import GalleryGrid from "@/components/gallery/GalleryGrid";
import { loadGallery } from "@/lib/gallery";

export const metadata = {
  title: "Fotos — Puerto Plankstek",
  description: "Galería del local, comedores y ambiente de Puerto Plankstek.",
};

export default async function FotosPage() {
  const { items } = await loadGallery();

  return (
    <div className="bg-brand-sand-light">
      <div className="bg-brand-red-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-brand-glow">
            El local
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-wide text-brand-white sm:text-5xl">
            Fotos
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-white/70">
            Salas, brasa y ambiente. Toca cualquier foto para verla en grande.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <GalleryGrid items={items} />
      </div>
    </div>
  );
}
