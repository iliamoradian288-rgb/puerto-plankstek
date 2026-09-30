import { NextRequest, NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase-server";
import { getClientId } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const db = await serverSupabase();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const clientId = getClientId();
  if (!clientId) return NextResponse.json({ error: "Cliente no configurado" }, { status: 400 });

  const { data: link } = await db
    .from("client_users")
    .select("client_id")
    .eq("user_id", user.id)
    .eq("client_id", clientId)
    .maybeSingle();
  if (!link) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  const folder = (form.get("folder") as string) || "misc";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${clientId}/${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await db.storage
    .from("restaurant-images")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: pub } = db.storage.from("restaurant-images").getPublicUrl(path);
  return NextResponse.json({ url: pub.publicUrl });
}
