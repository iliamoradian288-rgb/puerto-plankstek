import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import SwedishFlag from "@/components/SwedishFlag";

export const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z"/>
  </svg>
);

export const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.11V9.4a8.16 8.16 0 0 0 4.78 1.52v-3.4a4.85 4.85 0 0 1-.93-.92z"/>
  </svg>
);

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-white/70 relative">
      {/* Franja escandinava superior */}
      <div className="h-1 flex">
        <div className="flex-1 bg-sweden-blue" />
        <div className="flex-1 bg-sweden-yellow" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <SwedishFlag className="h-4 w-auto rounded-[2px] ring-1 ring-white/30" />
              <p className="font-display text-2xl font-bold uppercase tracking-wider text-brand-white">
                Puerto <span className="text-sweden-yellow">Plankstek</span>
              </p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Brasa, cocina persa y clásicos internacionales en Puerto
              Deportivo Fuengirola.
            </p>
          </div>
          <div>
            <h4 className="font-display mb-4 text-sm font-bold uppercase tracking-widest text-brand-glow">
              Secciones
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/menu", t: "Menú" },
                { href: "/menu?cat=bebida", t: "Bebidas" },
                { href: "/eventos", t: "Eventos" },
                { href: "/fotos", t: "Fotos" },
                { href: "/ofertas", t: "Ofertas" },
                { href: "/reserva-eventos", t: "Reservar evento" },
                { href: "/contacto", t: "Contacto" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-white">{l.t}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display mb-4 text-sm font-bold uppercase tracking-widest text-brand-glow">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                Puerto Deportivo Fuengirola, 29640 Fuengirola, Málaga
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <a href="tel:+34624992209" className="hover:text-brand-white">+34 624 99 22 09</a>
              </li>
              <li className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                Lun–Dom · 17:00 – 01:00
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display mb-4 text-sm font-bold uppercase tracking-widest text-brand-glow">
              Reservas +20
            </h4>
            <p className="mb-4 text-sm">
              Cenas de empresa, cumpleaños y celebraciones.
            </p>
            <Link
              href="/reserva-eventos"
              className="font-display inline-flex items-center gap-2 rounded-full bg-sweden-blue px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-sweden-yellow ring-1 ring-sweden-yellow/60 transition-all hover:bg-sweden-blue/80 hover:scale-105"
            >
              <SwedishFlag className="h-2.5 w-auto" />
              Solicitar reserva
            </Link>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brand-white/40 hover:text-brand-white">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-brand-white/40 hover:text-brand-white">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="https://wa.me/34619028260" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-brand-white/40 hover:text-brand-white">
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-white/10 pt-6 text-center text-xs text-brand-white/40">
          <Link href="/admin" className="hover:text-brand-white/70">admin</Link>
          <span className="mx-2">·</span>
          © {new Date().getFullYear()} Puerto Plankstek ·{" "}
          <a href="https://virallooms.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-white/70">Virallooms Group</a>
        </div>
      </div>
    </footer>
  );
}
