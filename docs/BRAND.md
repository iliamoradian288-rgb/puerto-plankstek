# PLANKSTEK — Identidad de marca (fuente de verdad)

Paleta extraída de los 3 PDFs oficiales en `C:\Users\Ilia\Downloads\plankstek\logo\`
(Logo Final, Logo Redondo, Logo sin luz). Verificada por visión + muestreo de píxeles.

## Colores

| Token Tailwind      | HEX     | Uso                                                   |
|---------------------|---------|-------------------------------------------------------|
| `brand-red`         | #A01D28 | Fondo principal, secciones marca, header              |
| `brand-red-dark`    | #7C1420 | Hover, footer, bordes profundos                       |
| `brand-red-deep`    | #5C0E16 | Hero oscuro, overlays, modo neón nocturno             |
| `brand-sand`        | #CBBC9E | Marco, fondos claros, mitad "STEK" del logo           |
| `brand-sand-light`  | #E4DCCD | Fondo base de página, tarjetas claras                 |
| `brand-coal`        | #2A2929 | Texto sobre claro, mitad "PLANK" del logo             |
| `brand-ink`         | #171515 | Header, body oscuro, texto máximo contraste           |
| `brand-glow`        | #D7BF61 | Dorado neón: CTAs, badges 2x1, contadores, acentos    |
| `brand-glow-soft`   | #F0E2AE | Highlights, hover de dorado                           |
| `brand-white`       | #FFFFFF | Texto sobre rojo, contornos, secundarios              |

## Reglas

- Fondo base de página: `brand-sand-light`. Secciones de marca: `brand-red`.
- Texto sobre rojo SIEMPRE blanco (`brand-white`), nunca beige (legibilidad).
- `brand-glow` (dorado) SOLO para acentos: CTA reservar, badges de oferta,
  contador de eventos, iconos activos. Nunca como fondo de sección.
- Header: `brand-ink` o `brand-red-deep` con logo; texto blanco.
- Tipografía display (titulares estilo cartel): Oswald / Arial Narrow, mayúsculas.
- Logo: mitad PLANK en `brand-coal`, mitad STEK en `brand-sand`, sobre `brand-red`.
