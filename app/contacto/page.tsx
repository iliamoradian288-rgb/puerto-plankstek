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
    lines: ["Puerto Deportivo Fuengirola", "29640 Fuengirola, Málaga"],
  },
  {
    icon: Phone,
    title: "Teléfono",
    lines: ["+34 619 02 82 60"],
    href: "tel:+34000000000",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["plankstek3000@gmail.com"],
    href: "mailto:plankstek3000@gmail.com",
  },
  {
    icon: Clock,
    title: "Horario",
    lines: ["Lun–Dom · 17:00 – 01:00", "Hasta tarde en eventos"],
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
            En Puerto Deportivo Fuengirola. Llámanos o pásate — la brasa siempre
            está encendida.
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

        {/* WhatsApp directo */}
        <div className="mt-8 rounded-2xl bg-green-600 p-8 text-center text-white shadow-lg">
          <p className="font-display text-sm font-bold uppercase tracking-widest">
            ¿Prefieres hablar directamente?
          </p>
          <p className="mt-2 text-sm text-green-100">
            Escríbenos por WhatsApp y te respondemos en menos de 19 minutos.
          </p>
          <a
            href="https://wa.me/34619028260?text=%C2%A1Hola!%20Quisiera%20hacer%20una%20reserva%20o%20consulta%20en%20Plankstek%20El%20Puerto."
            target="_blank"
            rel="noopener noreferrer"
            className="font-display mt-4 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-green-700 shadow transition-all hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Abrir WhatsApp
          </a>
        </div>

        {/* Mapa */}
        <div className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
          <iframe
            title="Mapa — Puerto Plankstek"
            src="https://www.google.com/maps?q=Puerto+Deportivo+Fuengirola,+29640+Fuengirola,+M%C3%A1laga&output=embed"
            className="h-96 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="mt-3 text-center text-xs text-brand-coal/50">
          Plankstek El Puerto · Puerto Deportivo Fuengirola, 29640 Fuengirola, Málaga.
        </p>
      </div>
    </div>
  );
}
