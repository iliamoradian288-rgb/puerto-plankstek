"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import ImagePicker from "../ImagePicker";
import { api, btnRed, btnGhost, btnGold, input, label } from "../api";
import { GALLERY_CATS } from "@/lib/gallery";

interface Row { id: string; title: string | null; image_url: string; category: string; }
const EMPTY = { title: "", image_url: "", category: "local" };

export default function GalleryTab() {
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
      const d = await api("/api/admin/data?resource=gallery");
      setRows(d.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!form.image_url) return;
    setSaving(true);
    try {
      const payload = { title: form.title.trim() || null, image_url: form.image_url, category: form.category };
      if (editing === "new") {
        await api("/api/admin/data?resource=gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        await api("/api/admin/data?resource=gallery", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing, ...payload }) });
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
    if (!confirm("¿Eliminar esta foto?")) return;
    await api(`/api/admin/data?resource=gallery&id=${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <p className="py-8 text-center text-sm">Cargando galería…</p>;
  if (error) return <div className="rounded-xl bg-brand-red/10 p-6 text-center text-sm font-medium text-brand-red">{error}</div>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-coal/60">{rows.length} fotos</p>
        <button onClick={() => { setEditing("new"); setForm(EMPTY); }} className={btnRed}>
          <Plus className="mr-1 inline h-4 w-4" /> Subir foto
        </button>
      </div>

      {editing && (
        <div className="mb-6 rounded-2xl bg-white p-5 shadow ring-1 ring-black/5">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-coal">
            {editing === "new" ? "Nueva foto" : "Editar foto"}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <span className={label}>Título</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Parrillada" className={input} />
            </div>
            <div>
              <span className={label}>Categoría</span>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={input}>
                {GALLERY_CATS.filter((c) => c.value !== "todas").map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <span className={label}>Foto *</span>
              <ImagePicker value={form.image_url} onChange={(u) => setForm({ ...form, image_url: u })} folder="gallery" />
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

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {rows.map((r) => (
          <div key={r.id} className="group relative overflow-hidden rounded-xl bg-brand-sand-light">
            <Image src={r.image_url} alt={r.title ?? ""} width={200} height={150} className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center gap-1 bg-brand-ink/0 transition-colors group-hover:bg-brand-ink/50">
              <button onClick={() => { setEditing(r.id); setForm({ title: r.title ?? "", image_url: r.image_url, category: r.category }); }} className="rounded-full bg-white/90 p-1.5 text-brand-coal opacity-0 transition-opacity group-hover:opacity-100 hover:text-brand-red">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => remove(r.id)} className="rounded-full bg-white/90 p-1.5 text-brand-coal opacity-0 transition-opacity group-hover:opacity-100 hover:text-brand-red">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="col-span-full py-6 text-center text-sm text-brand-coal/50">Galería vacía.</p>}
      </div>
    </div>
  );
}
