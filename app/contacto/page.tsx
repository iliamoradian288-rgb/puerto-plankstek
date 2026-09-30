import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contacto — Puerto Plankstek",
  description:
    "Dirección, teléfono, horarios y mapa de Puerto Plankstek Restaurant & Events.",
};

const INFO = [
  {
    icon: MapPin,
    title: "Dirección",
    lines: ["Puerto Deportivo, Local XX", "Benalmádena, Málaga"],
  },
  {
    icon: Phone,
    title: "Teléfono",
    lines: ["+34 000 000 000"],
    href: "tel:+34000000000",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hola@plankstek.es"],
    href: "mailto:hola@plankstek.es",
  },
  {
    icon: Clock,
    title: "Horario",
    lines: ["Lun–Dom · 13:00–23:30", "Eventos hasta tarde"],
  },
];

export default function ContactoPage() {
  return (
    <div className="bg-brand-sand-light">
      <div className="bg-brand-red-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-brand-glow">
            Encuéntranos
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-wide text-brand-white sm:text-5xl">
            Contacto
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-white/70">
            Frente al puerto, a un paseo del centro. Llámanos o pásate — la
            brasa siempre está encendida.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Tarjetas de info */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFO.map((c) => (
            <div
              key={c.title}
              className="rounded-xl bg-white p-6 text-center shadow ring-1 ring-black/5"
            >
              <c.icon className="mx-auto h-6 w-6 text-brand-red" />
              <h2 className="font-display mt-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-coal">
                {c.title}
              </h2>
              <div className="mt-2 text-sm leading-relaxed text-brand-coal/70">
                {c.lines.map((l) =>
                  c.href ? (
                    <a
                      key={l}
                      href={c.href}
                      className="block font-semibold text-brand-red hover:underline"
                    >
                      {l}
                    </a>
                  ) : (
                    <p key={l}>{l}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mapa */}
        <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
          <iframe
            title="Mapa — Puerto Plankstek"
            src="https://www.google.com/maps?q=Puerto+Deportivo+Benalm%C3%A1dena&output=embed"
            className="h-96 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="mt-3 text-center text-xs text-brand-coal/50">
          Puerto Deportivo de Benalmádena — actualiza la dirección exacta en
          esta página cuando la confirmes.
        </p>
      </div>
    </div>
  );
}
