import { Suspense } from "react";
import { UtensilsCrossed } from "lucide-react";
import MenuSection from "@/components/menu/MenuSection";
import { loadMenuItems } from "@/lib/menu";

export const metadata = {
  title: "Menú — Puerto Plankstek",
  description:
    "Carta completa de comida y bebida: entrantes, principales, postres, cócteles, vinos y cervezas.",
};

async function MenuContent({ cat }: { cat: string }) {
  const { items, source } = await loadMenuItems();
  const initial = cat === "bebida" ? "bebida" : "comida";
  return <MenuSection items={items} source={source} initialCategory={initial} />;
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;

  return (
    <div className="bg-brand-sand-light">
      <div className="bg-brand-red-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-brand-glow">
            Nuestra carta
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-wide text-brand-white sm:text-5xl">
            Menú
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-white/70">
            Brasa, cocina persa y clásicos internacionales. Todo hecho con
            producto fresco del día.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <Suspense
          fallback={
            <div className="py-12 text-center text-sm text-brand-coal/60">
              Cargando carta…
            </div>
          }
        >
          <MenuContent cat={cat ?? ""} />
        </Suspense>
      </div>
    </div>
  );
}
