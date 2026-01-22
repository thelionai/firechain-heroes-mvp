import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: verificar en el PSP si la orden fue pagada usando orderId
  // y si fue pagada => actualizar DB y mintear
  const { orderId } = await req.json().catch(() => ({}));
  console.log("VERIFY ORDER:", orderId);

  return NextResponse.json({ ok: true, orderId });
}
