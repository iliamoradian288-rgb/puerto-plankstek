"use client";

import { useEffect, useState } from "react";

function parts(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    mins: Math.floor(diff / 60_000) % 60,
    secs: Math.floor(diff / 1_000) % 60,
  };
}

export default function Countdown({ target }: { target: string }) {
  const [t, setT] = useState(() => parts(target));

  useEffect(() => {
    const id = setInterval(() => setT(parts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { v: t.days, l: "Días" },
    { v: t.hours, l: "Horas" },
    { v: t.mins, l: "Min" },
    { v: t.secs, l: "Seg" },
  ];

  return (
    <div className="flex gap-2 sm:gap-3">
      {cells.map((c) => (
        <div
          key={c.l}
          className="min-w-16 rounded-xl bg-brand-ink/70 px-3 py-3 text-center ring-1 ring-brand-glow/40 backdrop-blur sm:min-w-20"
        >
          <p className="font-display text-2xl font-bold tabular-nums text-brand-glow sm:text-3xl">
            {String(c.v).padStart(2, "0")}
          </p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-white/70">
            {c.l}
          </p>
        </div>
      ))}
    </div>
  );
}
