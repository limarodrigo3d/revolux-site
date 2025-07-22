// app/api/mercadopago/checkout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const preference = {
    items: [
      {
        title: body.title,
        quantity: 1,
        unit_price: body.price,
      },
    ],
    back_urls: {
      success: "https://seusite.com.br/sucesso",
      failure: "https://seusite.com.br/erro",
      pending: "https://seusite.com.br/pendente",
    },
    auto_return: "approved",
  };

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preference),
  });

  const data = await response.json();

  return NextResponse.json({ init_point: data.init_point });
}
