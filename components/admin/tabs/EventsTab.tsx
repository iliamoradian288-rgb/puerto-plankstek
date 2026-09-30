"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Loader2, CalendarDays } from "lucide-react";
import ImagePicker from "../ImagePicker";
import { api, btnRed, btnGhost, btnGold, input, label } from "../api";

interface Row {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  image_url: string | null;
}

const EMPTY = { title: "", description: "", event_date: "", image_url: "" };

export default function EventsTab() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const d = await api("/api/admin/data?resource=events");
      setRows(d.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!form.title.trim() || !form.event_date) return;
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        event_date: new Date(form.event_date).toISOString(),
        image_url: form.image_url || null,
      };
      if (editing === "new") {
        await api("/api/admin/data?resource=events", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
        });
      } else {
        await api("/api/admin/data?resource=events", {
          method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing, ...payload }),
        });
      }
      setEditing(null);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar este evento?")) return;
    await api(`/api/admin/data?resource=events&id=${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <p className="py-8 text-center text-sm">Cargando eventos…</p>;
  if (error) return <div className="rounded-xl bg-brand-red/10 p-6 text-center text-sm font-medium text-brand-red">{error}</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-coal/60">{rows.length} eventos</p>
        <button onClick={() => { setEditing("new"); setForm(EMPTY); }} className={btnRed}>
          <Plus className="mr-1 inline h-4 w-4" /> Nuevo evento
        </button>
      </div>

      {editing && (
        <div className="mb-6 rounded-2xl bg-white p-5 shadow ring-1 ring-black/5">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-coal">
            {editing === "new" ? "Nuevo evento" : "Editar evento"}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <span className={label}>Título *</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Noche de Rock" className={input} />
            </div>
            <div className="sm:col-span-2">
              <span className={label}>Descripción</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className={`${input} resize-none`} />
            </div>
            <div>
              <span className={label}>Fecha y hora *</span>
              <input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className={input} />
            </div>
            <div>
              <span className={label}>Foto</span>
              <ImagePicker value={form.image_url} onChange={(u) => setForm({ ...form, image_url: u })} folder="events" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={save} disabled={saving} className={btnGold}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
            </button>
            <button onClick={() => setEditing(null)} className={btnGhost}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
            <CalendarDays className="h-5 w-5 shrink-0 text-brand-red" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-brand-coal">{r.title}</p>
              <p className="text-xs text-brand-coal/50">
                {new Date(r.event_date).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <button onClick={() => { setEditing(r.id); setForm({ title: r.title, description: r.description ?? "", event_date: r.event_date.slice(0, 16), image_url: r.image_url ?? "" }); }} aria-label="Editar" className="rounded-full p-2 text-brand-coal/60 hover:bg-brand-sand-light hover:text-brand-red"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => remove(r.id)} aria-label="Eliminar" className="rounded-full p-2 text-brand-coal/60 hover:bg-brand-red/10 hover:text-brand-red"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {rows.length === 0 && <p className="py-6 text-center text-sm text-brand-coal/50">Sin eventos. Crea el primero.</p>}
      </div>
    </div>
  );
}
