"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, Users, CalendarDays, Trash2 } from "lucide-react";
import { api } from "../api";

interface Row {
  id: string;
  name: string;        // client_name from DB
  email: string;
  phone: string;
  event_type: string;
  guests_count: number;
  target_date: string;  // date from DB
  comments: string | null;
  status: string;
  created_at: string;
}

const TYPE_LABEL: Record<string, string> = {
  cumpleanos: "Cumpleaños",
  empresa: "Cena de empresa",
  grupo: "Grupo +20",
  otro: "Otro",
};

const STATUS_STYLE: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-800",
  confirmada: "bg-green-100 text-green-800",
  cancelada: "bg-brand-red/10 text-brand-red",
};

export default function ReservationsTab() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("todas");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const d = await api("/api/admin/data?resource=inquiries");
      const sorted = (d.items as Row[]).sort(
        (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
      );
      setRows(sorted);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    await api("/api/admin/data?resource=inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar esta solicitud?")) return;
    await api(`/api/admin/data?resource=inquiries&id=${id}`, { method: "DELETE" });
    await load();
  }

  const filtered = filter === "todas" ? rows : rows.filter((r) => r.status === filter);
  const pending = rows.filter((r) => r.status === "pendiente").length;

  if (loading) return <p className="py-8 text-center text-sm">Cargando reservas…</p>;
  if (error) return <div className="rounded-xl bg-brand-red/10 p-6 text-center text-sm font-medium text-brand-red">{error}</div>;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <p className="mr-auto text-sm text-brand-coal/60">
          {rows.length} solicitudes ·{" "}
          <strong className="text-amber-700">{pending} pendientes</strong>
        </p>
        {["todas", "pendiente", "confirmada", "cancelada"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`font-display rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest ${
              filter === s
                ? "bg-brand-glow text-brand-ink"
                : "bg-white text-brand-coal/60 ring-1 ring-brand-coal/15"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-bold text-brand-coal">{r.name}</p>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase ${STATUS_STYLE[r.status] ?? "bg-brand-coal/10 text-brand-coal"}`}>
                {r.status}
              </span>
              <span className="ml-auto text-xs text-brand-coal/50">
                {new Date(r.created_at).toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="mt-2 grid gap-1 text-sm text-brand-coal/70 sm:grid-cols-2">
              <p className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-brand-red" />
                {new Date(r.target_date).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short", year: "numeric" })} · {TYPE_LABEL[r.event_type] ?? r.event_type}
              </p>
              <p className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-brand-red" />
                {r.guests_count} personas
              </p>
              <a href={`tel:${r.phone}`} className="flex items-center gap-1.5 font-semibold text-brand-red hover:underline">
                <Phone className="h-3.5 w-3.5" /> {r.phone}
              </a>
              <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 truncate hover:underline">
                <Mail className="h-3.5 w-3.5 text-brand-red" /> {r.email}
              </a>
            </div>
            {r.comments && <p className="mt-2 rounded-lg bg-brand-sand-light p-2.5 text-xs leading-relaxed text-brand-coal/70">{r.comments}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {r.status === "pendiente" && (
                <button onClick={() => setStatus(r.id, "confirmada")} className="font-display rounded-full bg-green-600 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-green-700">
                  Confirmar
                </button>
              )}
              {r.status !== "cancelada" && (
                <button onClick={() => setStatus(r.id, "cancelada")} className="font-display rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-coal ring-1 ring-brand-coal/20 hover:ring-brand-red">
                  Cancelar
                </button>
              )}
              {r.status !== "pendiente" && (
                <button onClick={() => setStatus(r.id, "pendiente")} className="font-display rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-coal ring-1 ring-brand-coal/20 hover:ring-brand-red">
                  Reabrir
                </button>
              )}
              <button onClick={() => remove(r.id)} aria-label="Eliminar" className="ml-auto rounded-full p-1.5 text-brand-coal/40 hover:bg-brand-red/10 hover:text-brand-red">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-brand-coal/50">
            No hay solicitudes {filter === "todas" ? "todavía" : `con estado "${filter}"`}.
          </p>
        )}
      </div>
    </div>
  );
}
