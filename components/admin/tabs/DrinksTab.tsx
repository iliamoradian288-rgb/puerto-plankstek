"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { DRINK_SUBS } from "@/lib/menu";
import ImagePicker from "../ImagePicker";
import { api, btnRed, btnGhost, btnGold, input, label } from "../api";

interface Row { id: string; title: string; description: string | null; price: number; category: string; image_url: string | null; }
const EMPTY = { title: "", description: "", price: 8, category: "cocteles", image_url: "" };

export default function DrinksTab() {
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
      const d = await api("/api/admin/data?resource=drinks");
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
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        price: Number(form.price),
        category: form.category,
        image_url: form.image_url || null,
      };
      if (editing === "new") {
        await api("/api/admin/data?resource=drinks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        await api("/api/admin/data?resource=drinks", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing, ...payload }) });
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
    if (!confirm("¿Eliminar esta bebida?")) return;
    await api(`/api/admin/data?resource=drinks&id=${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <p className="py-8 text-center text-sm">Cargando bebidas…</p>;
  if (error) return <div className="rounded-xl bg-brand-red/10 p-6 text-center text-sm font-medium text-brand-red">{error}</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-coal/60">{rows.length} bebidas</p>
        <button onClick={() => { setEditing("new"); setForm(EMPTY); }} className={btnRed}>
          <Plus className="mr-1 inline h-4 w-4" /> Añadir bebida
        </button>
      </div>
      {editing && (
        <div className="mb-6 rounded-2xl bg-white p-5 shadow ring-1 ring-black/5">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-coal">
            {editing === "new" ? "Nueva bebida" : "Editar bebida"}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <span className={label}>Título *</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Mojito clásico" className={input} />
            </div>
            <div className="sm:col-span-2">
              <span className={label}>Descripción</span>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className={`${input} resize-none`} />
            </div>
            <div>
              <span className={label}>Precio (€) *</span>
              <input type="number" min={0} step={0.1} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className={input} />
            </div>
            <div>
              <span className={label}>Subcategoría</span>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={input}>
                {DRINK_SUBS.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
              </select>
            </div>
            <div>
              <span className={label}>Foto</span>
              <ImagePicker value={form.image_url} onChange={(u) => setForm({ ...form, image_url: u })} folder="drinks" />
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
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-brand-coal">{r.title}</p>
              <p className="text-xs text-brand-coal/50">{r.category} · {Number(r.price).toFixed(2)} €</p>
            </div>
            <button onClick={() => { setEditing(r.id); setForm({ title: r.title, description: r.description ?? "", price: r.price, category: r.category, image_url: r.image_url ?? "" }); }} aria-label="Editar" className="rounded-full p-2 text-brand-coal/60 hover:bg-brand-sand-light hover:text-brand-red"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => remove(r.id)} aria-label="Eliminar" className="rounded-full p-2 text-brand-coal/60 hover:bg-brand-red/10 hover:text-brand-red"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {rows.length === 0 && <p className="py-6 text-center text-sm text-brand-coal/50">Sin bebidas.</p>}
      </div>
    </div>
  );
}
