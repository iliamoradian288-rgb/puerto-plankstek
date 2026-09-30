"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImage } from "./api";

/* Sube una imagen a Supabase Storage y devuelve la URL pública. */
export default function ImagePicker({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(f, folder));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={pick}
      />
      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt="Vista previa"
            width={220}
            height={150}
            className="h-28 w-auto rounded-lg object-cover ring-1 ring-black/10"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Quitar imagen"
            className="absolute -right-2 -top-2 rounded-full bg-brand-red p-1 text-white shadow"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="flex items-center gap-2 rounded-xl border-2 border-dashed border-brand-coal/20 px-4 py-3 text-sm text-brand-coal/60 hover:border-brand-red hover:text-brand-red disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {busy ? "Subiendo…" : "Subir imagen"}
        </button>
      )}
      {error && <p className="mt-1 text-xs font-medium text-brand-red">{error}</p>}
    </div>
  );
}
