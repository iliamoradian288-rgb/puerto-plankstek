"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import ImagePicker from "../ImagePicker";
import { api, btnRed, btnGhost, btnGold, input, label } from "../api";

interface Row { id: string; title: string; description: string | null; discount_tag: string; image_url: string | null; is_active: boolean; }
const EMPTY = { title: "", description: "", discount_tag: "Especial", image_url: "", is_active: true };
const TAGS = ["2x1", "50%", "Especial"];

export default function OffersTab() {
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
      const d = await api("/api/admin/data?resource=offers");
      setRows(d.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = { title: form.title.trim(), description: form.description.trim() || null, discount_tag: form.discount_tag, image_url: form.image_url || null, is_active: form.is_active };
      if (editing === "new") {
        await api("/api/admin/data?resource=offers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        await api("/api/admin/data?resource=offers", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing, ...payload }) });
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
    if (!confirm("¿Eliminar esta oferta?")) return;
    await api(`/api/admin/data?resource=offers&id=${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <p className="py-8 text-center text-sm">Cargando ofertas…</p>;
  if (error) return <div className="rounded-xl bg-brand-red/10 p-6 text-center text-sm font-medium text-brand-red">{error}</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-coal/60">{rows.length} ofertas</p>
        <button onClick={() => { setEditing("new"); setForm(EMPTY); }} className={btnRed}>
          <Plus className="mr-1 inline h-4 w-4" /> Nueva oferta
        </button>
      </div>

      {editing && (
        <div className="mb-6 rounded-2xl bg-white p-5 shadow ring-1 ring-black/5">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-coal">
            {editing === "new" ? "Nueva oferta" : "Editar oferta"}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <span className={label}>Título *</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="2x1 en Hamburguesas" className={input} />
            </div>
            <div className="sm:col-span-2">
              <span className={label}>Descripción</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className={`${input} resize-none`} />
            </div>
            <div>
              <span className={label}>Etiqueta</span>
              <select value={form.discount_tag} onChange={(e) => setForm({ ...form, discount_tag: e.target.value })} className={input}>
                {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <span className={label}>Foto</span>
              <ImagePicker value={form.image_url} onChange={(u) => setForm({ ...form, image_url: u })} folder="offers" />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-brand-red" />
                <span className="text-brand-coal/70">Activa (visible en la web)</span>
              </label>
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
            <span className="shrink-0 rounded-full bg-brand-glow px-2.5 py-0.5 text-[11px] font-bold text-brand-ink">{r.discount_tag}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-brand-coal">{r.title}</p>
              <p className="text-xs text-brand-coal/50">{r.is_active ? "Activa" : "Inactiva"}</p>
            </div>
            <button onClick={() => { setEditing(r.id); setForm({ title: r.title, description: r.description ?? "", discount_tag: r.discount_tag, image_url: r.image_url ?? "", is_active: r.is_active }); }} aria-label="Editar" className="rounded-full p-2 text-brand-coal/60 hover:bg-brand-sand-light hover:text-brand-red"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => remove(r.id)} aria-label="Eliminar" className="rounded-full p-2 text-brand-coal/60 hover:bg-brand-red/10 hover:text-brand-red"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {rows.length === 0 && <p className="py-6 text-center text-sm text-brand-coal/50">Sin ofertas. Crea la primera.</p>}
      </div>
    </div>
  );
}
