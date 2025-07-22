// app/api/verify-recaptcha/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return NextResponse.json(
      { success: false, error: "Secret key não configurada" },
      { status: 500 }
    );
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await res.json();

  if (!data.success) {
    return NextResponse.json({ success: false, error: data["error-codes"] }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
