import { Users } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";

export const metadata = {
  title: "Reserva de Eventos +20 — Puerto Plankstek",
  description:
    "Reserva tu cumpleaños, cena de empresa o celebración para grupos de más de 20 personas.",
};

const STEPS = [
  { n: "1", t: "Cuéntanos tu plan", d: "Fecha, asistentes y tipo de evento." },
  { n: "2", t: "Te llamamos", d: "Confirmamos disponibilidad en <24 h." },
  { n: "3", t: "A celebrar", d: "Menú cerrado, tarta y sala lista." },
];

export default function ReservaPage() {
  return (
    <div className="bg-brand-sand-light">
      <div className="bg-brand-red-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="font-display inline-flex items-center gap-2 rounded-full bg-brand-glow px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand-ink">
            <Users className="h-4 w-4" />
            Grupos de +20 personas
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold uppercase tracking-wide text-brand-white sm:text-5xl">
            Reserva tu evento
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-white/70">
            Cumpleaños, cenas de empresa y celebraciones. Sala privada,
            menú cerrado y música en vivo.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Pasos */}
        <div className="mx-auto mb-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-xl bg-white p-5 text-center shadow ring-1 ring-black/5"
            >
              <p className="font-display mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-base font-bold text-white">
                {s.n}
              </p>
              <p className="font-display mt-2 text-sm font-bold uppercase tracking-widest text-brand-coal">
                {s.t}
              </p>
              <p className="mt-1 text-xs text-brand-coal/60">{s.d}</p>
            </div>
          ))}
        </div>

        <BookingForm />
      </div>
    </div>
  );
}
