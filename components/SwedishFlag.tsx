/** Bandera de Suecia inline SVG — cruz nórdica amarilla sobre fondo azul.
 *  Usar en tamaños pequeños (h-2 / h-3) como acento escandinavo. */
export default function SwedishFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 10" className={className} aria-hidden>
      <rect width="16" height="10" rx="1.5" fill="#006aa7" />
      <rect x="5" width="2.5" height="10" rx="0.5" fill="#fecc00" />
      <rect y="3.75" width="16" height="2.5" rx="0.5" fill="#fecc00" />
    </svg>
  );
}
