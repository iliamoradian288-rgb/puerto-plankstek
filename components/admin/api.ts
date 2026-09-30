export async function api(path: string, init?: RequestInit) {
  const res = await fetch(path, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Error en el servidor");
  return data;
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Error al subir la imagen");
  return data.url as string;
}

export const btn =
  "font-display rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50";
export const btnRed = `${btn} bg-brand-red text-white hover:bg-brand-red-dark`;
export const btnGold = `${btn} bg-brand-glow text-brand-ink hover:bg-brand-glow-soft`;
export const btnGhost = `${btn} ring-1 ring-brand-coal/20 text-brand-coal hover:ring-brand-red`;
export const input =
  "w-full rounded-xl border border-brand-coal/15 bg-white px-4 py-2.5 text-sm text-brand-coal placeholder:text-brand-coal/40 focus:border-brand-red focus:outline-none";
export const label =
  "font-display mb-1 block text-[11px] font-bold uppercase tracking-widest text-brand-coal/60";
