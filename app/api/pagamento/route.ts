import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

// ✅ Cria a instância da nova SDK (v2+)
const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

// ✅ Cria a instância da Preference
const preference = new Preference(mercadopago);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "https://revolux-site.vercel.app";

    const preferenceData = {
      items: body.items.map((item: any) => ({
        id: item.id || "produto-1",
        title: item.nome || item.title,
        quantity: item.quantidade || 1,
        currency_id: "BRL",
        unit_price: item.preco || item.price,
      })),
      back_urls: {
        success: `${baseURL}/obrigado`,
        failure: `${baseURL}/erro`,
        pending: `${baseURL}/pendente`,
      },
      auto_return: "approved" as const,
      payer: {
        name: body.nome,
        email: body.email,
      },
      notification_url: `${baseURL}/api/webhook/mercadopago`,
      statement_descriptor: "REVOLUX CERTIFICADOS",
      external_reference: `order_${Date.now()}`,
    };

    // ✅ Usa a instância da Preference para criar
    const response = await preference.create({ body: preferenceData });

    return NextResponse.json({ init_point: response.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json({ error: "Erro ao criar preferência" }, { status: 500 });
  }
}

// Método GET opcional para verificar se a API está funcionando
export async function GET() {
  return NextResponse.json({ 
    message: 'API de pagamento funcionando',
    timestamp: new Date().toISOString()
  });
}