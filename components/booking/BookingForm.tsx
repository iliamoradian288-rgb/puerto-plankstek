"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  CalendarDays,
  Cake,
  Briefcase,
  PartyPopper,
  MessageCircle,
} from "lucide-react";

const EVENT_TYPES = [
  { value: "cumpleanos", label: "Cumpleaños", icon: Cake },
  { value: "empresa", label: "Cena de empresa", icon: Briefcase },
  { value: "grupo", label: "Grupo +20", icon: Users },
  { value: "otro", label: "Otra celebración", icon: PartyPopper },
] as const;

const EVENT_LABELS: Record<string, string> = {
  cumpleanos: "Cumpleaños",
  empresa: "Cena de empresa",
  grupo: "Grupo +20",
  otro: "Otra celebración",
};

const OWNER_PHONE = "34619028260";

type Status = "idle" | "sending" | "ok";

export default function BookingForm() {
  const [form, setForm] = useState({
    client_name: "",
    email: "",
    phone: "",
    event_type: "cumpleanos",
    guest_count: 20,
    date: "",
    notes: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const guests = Number(form.guest_count) || 0;
  const underMin = guests > 0 && guests < 20;

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  /** Genera el mensaje formateado para WhatsApp */
  function buildWhatsAppMessage(): string {
    const tipo = EVENT_LABELS[form.event_type] || form.event_type;
    const fecha = form.date
      ? new Date(form.date + "T00:00:00").toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Sin fecha";

    let msg = `🍽️ *NUEVA RESERVA — Plankstek El Puerto*\n\n`;
    msg += `👤 *Nombre:* ${form.client_name}\n`;
    msg += `📞 *Teléfono:* ${form.phone}\n`;
    msg += `📧 *Email:* ${form.email}\n`;
    msg += `🎯 *Tipo:* ${tipo}\n`;
    msg += `👥 *Asistentes:* ${guests} personas\n`;
    msg += `📅 *Fecha:* ${fecha}\n`;
    if (form.notes) {
      msg += `📝 *Notas:* ${form.notes}\n`;
    }
    msg += `\n📍 Puerto Deportivo Fuengirola, 29640 Málaga`;
    return msg;
  }

  /** Genera link de Google Calendar para añadir el evento */
  function buildCalendarLink(): string {
    const tipo = EVENT_LABELS[form.event_type] || form.event_type;
    const dateStr = form.date?.replace(/-/g, "") || "";
    // Evento de 3 horas por defecto
    const startDate = dateStr ? dateStr + "T190000" : "";
    const endDate = dateStr ? dateStr + "T220000" : "";

    const title = encodeURIComponent(
      `${tipo} — ${form.client_name} (${guests} pax)`
    );
    const details = encodeURIComponent(
      `Reserva de ${tipo}\n` +
        `Cliente: ${form.client_name}\n` +
        `Tel: ${form.phone}\n` +
        `Email: ${form.email}\n` +
        `Asistentes: ${guests}\n` +
        (form.notes ? `Notas: ${form.notes}\n` : "") +
        `\n📍 Puerto Deportivo Fuengirola, 29640 Fuengirola, Málaga`
    );
    const location = encodeURIComponent(
      "Puerto Deportivo Fuengirola, 29640 Fuengirola, Málaga"
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (underMin || guests < 1) {
      setError("Este formulario es para grupos de 20 o más personas.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al enviar");
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar");
      setStatus("idle");
    }
  }

  if (status === "ok") {
    const waMsg = buildWhatsAppMessage();
    const calLink = buildCalendarLink();

    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg ring-1 ring-black/5">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
        <h2 className="font-display mt-4 text-2xl font-bold uppercase tracking-widest text-brand-coal">
          ¡Reserva recibida!
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-coal/70">
          Gracias, <strong>{form.client_name}</strong>. Hemos registrado tu{" "}
          <strong>{EVENT_LABELS[form.event_type]}</strong> para{" "}
          <strong>{guests} personas</strong>.
        </p>

        {/* WhatsApp + Calendar actions */}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={`https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-green-700 hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar por WhatsApp al restaurante
          </a>
          <a
            href={calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-700 hover:scale-105"
          >
            <CalendarDays className="h-4 w-4" />
            Añadir a mi Google Calendar
          </a>
        </div>

        <p className="mt-4 text-xs text-brand-coal/50">
          Te llamaremos al <strong>{form.phone}</strong> para confirmar
          disponibilidad en menos de 24 h.
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/eventos"
            className="font-display rounded-full bg-brand-red px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-red-dark"
          >
            Ver eventos
          </Link>
          <button
            onClick={() => {
              setStatus("idle");
              setForm({
                client_name: "",
                email: "",
                phone: "",
                event_type: "cumpleanos",
                guest_count: 20,
                date: "",
                notes: "",
              });
            }}
            className="font-display rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-brand-coal ring-1 ring-brand-coal/20 hover:ring-brand-red"
          >
            Nueva reserva
          </button>
        </div>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-brand-coal/15 bg-white px-4 py-3 text-sm text-brand-coal placeholder:text-brand-coal/40 focus:border-brand-red focus:outline-none";
  const label =
    "font-display mb-1.5 block text-xs font-bold uppercase tracking-widest text-brand-coal/70";

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 sm:p-8"
    >
      {/* Tipo de evento */}
      <div>
        <span className={label}>Tipo de evento</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {EVENT_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => set("event_type", t.value)}
              className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                form.event_type === t.value
                  ? "bg-brand-red text-white"
                  : "bg-brand-sand-light text-brand-coal/70 hover:ring-1 hover:ring-brand-red"
              }`}
            >
              <t.icon className="h-5 w-5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Nombre *</label>
          <input
            id="name"
            required
            value={form.client_name}
            onChange={(e) => set("client_name", e.target.value)}
            placeholder="Tu nombre"
            className={input}
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Teléfono *</label>
          <input
            id="phone"
            required
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+34 600 000 000"
            className={input}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={label}>Email *</label>
        <input
          id="email"
          required
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="tu@email.com"
          className={input}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="guests" className={label}>
            Nº de asistentes * <span className="text-brand-red">(mín. 20)</span>
          </label>
          <div className="relative">
            <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-coal/40" />
            <input
              id="guests"
              required
              type="number"
              min={1}
              value={form.guest_count}
              onChange={(e) => set("guest_count", Number(e.target.value))}
              className={`${input} pl-11 ${underMin ? "border-amber-500 ring-1 ring-amber-500" : ""}`}
            />
          </div>
          {underMin && (
            <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2.5 text-xs leading-relaxed text-amber-800">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Para menos de 20 personas llama directo al restaurante y te
              sentamos en sala sin reserva de evento.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="date" className={label}>Fecha deseada *</label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-coal/40" />
            <input
              id="date"
              required
              type="date"
              value={form.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => set("date", e.target.value)}
              className={`${input} pl-11`}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="notes" className={label}>Notas adicionales</label>
        <textarea
          id="notes"
          rows={4}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Alergias, tarta de cumpleaños, decoración, horario preferido…"
          className={`${input} resize-none`}
        />
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-brand-red/10 p-3 text-sm font-medium text-brand-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="font-display mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-glow px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-brand-ink transition-colors hover:bg-brand-glow-soft disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          "Solicitar reserva +20"
        )}
      </button>
      <p className="mt-3 text-center text-xs text-brand-coal/50">
        Sin pago por adelantado. Confirmamos por teléfono en menos de 24 h.
      </p>
    </form>
  );
}
