import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin-server";

export async function GET() {
  const s = await getSession();
  if (!s.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  return NextResponse.json({ user: { id: s.user.id, email: s.user.email }, clientId: s.clientId });
}
