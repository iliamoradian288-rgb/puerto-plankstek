import { NextRequest, NextResponse } from "next/server";
import { getClientId, isConfigured, supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const cid = getClientId();
  if (!isConfigured() || !cid) {
    return NextResponse.json({ error: "Sistema no configurado" }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { client_name, email, phone, event_type, guest_count, date, notes } = body;

  if (!client_name || !email || !phone || !date) {
    return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
  }

  const guests = Number(guest_count) || 0;
  if (guests < 20) {
    return NextResponse.json({ error: "Este formulario es para grupos de 20 o más personas." }, { status: 400 });
  }

  const { error } = await supabase.from("event_inquiries").insert({
    client_id: cid,
    name: client_name,
    email,
    phone,
    event_type: event_type || "otro",
    guests_count: guests,
    target_date: new Date(date).toISOString(),
    comments: notes || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
