import { NextRequest, NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase-server";
import { getClientId } from "@/lib/supabase";

const TABLES: Record<string, string> = {
  food: "food_items",
  drinks: "drink_items",
  events: "events",
  gallery: "gallery_photos",
  offers: "offers",
  inquiries: "event_inquiries",
};

const SELECTS: Record<string, string> = {
  food: "id,title,description,price,category,image_url,created_at",
  drinks: "id,title,description,price,category,image_url,created_at",
  events: "id,title,description,event_date,image_url,created_at",
  gallery: "id,title,image_url,category,created_at",
  offers: "id,title,description,discount_tag,image_url,is_active,created_at",
  inquiries: "id,name,email,phone,event_type,guests_count,target_date,comments,status,created_at",
};

async function auth() {
  const db = await serverSupabase();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return null;
  const clientId = getClientId();
  if (!clientId) return null;
  const { data } = await db
    .from("client_users")
    .select("client_id")
    .eq("user_id", user.id)
    .eq("client_id", clientId)
    .maybeSingle();
  if (!data) return null;
  return { db, clientId };
}

export async function GET(req: NextRequest) {
  const a = await auth();
  if (!a) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const resource = req.nextUrl.searchParams.get("resource");
  if (!resource || !TABLES[resource]) {
    return NextResponse.json({ error: "Recurso inválido" }, { status: 400 });
  }

  const { data, error } = await a.db
    .from(TABLES[resource])
    .select(SELECTS[resource])
    .eq("client_id", a.clientId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: NextRequest) {
  const a = await auth();
  if (!a) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const resource = req.nextUrl.searchParams.get("resource");
  if (!resource || !TABLES[resource]) {
    return NextResponse.json({ error: "Recurso inválido" }, { status: 400 });
  }

  const body = await req.json();
  const payload = { ...body, client_id: a.clientId };

  const { data, error } = await a.db
    .from(TABLES[resource])
    .insert(payload)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

export async function PATCH(req: NextRequest) {
  const a = await auth();
  if (!a) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const resource = req.nextUrl.searchParams.get("resource");
  if (!resource || !TABLES[resource]) {
    return NextResponse.json({ error: "Recurso inválido" }, { status: 400 });
  }

  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });

  const { data, error } = await a.db
    .from(TABLES[resource])
    .update(updates)
    .eq("id", id)
    .eq("client_id", a.clientId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

export async function DELETE(req: NextRequest) {
  const a = await auth();
  if (!a) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const resource = req.nextUrl.searchParams.get("resource");
  const id = req.nextUrl.searchParams.get("id");
  if (!resource || !TABLES[resource] || !id) {
    return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  const { error } = await a.db
    .from(TABLES[resource])
    .delete()
    .eq("id", id)
    .eq("client_id", a.clientId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
