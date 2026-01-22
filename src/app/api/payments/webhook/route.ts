import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: validar firma del PSP (Yape/Plin) y hacer idempotencia
  const body = await req.json().catch(() => ({}));
  console.log("WEBHOOK PSP:", body);

  // TODO: actualizar orders -> "paid" y disparar mint server-side (Edge Function / server action)
  return NextResponse.json({ ok: true });
}
