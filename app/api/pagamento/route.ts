import { NextResponse } from 'next/server';
import { MercadoPago, Preference } from 'mercadopago';

// Cria cliente MercadoPago com seu token
const mercadopago = new MercadoPago({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://revolux-site.vercel.app';

    // Cria objeto Preference para gerar preferência de pagamento
    const preference = new Preference(mercadopago);

    const result = await preference.create({
      items: body.items.map((item: any) => ({
        id: item.id || 'produto-1',
        title: item.nome || item.title,
        quantity: item.quantidade || 1,
        currency_id: 'BRL',
        unit_price: item.preco || item.price,
      })),
      back_urls: {
        success: `${baseURL}/obrigado`,
        failure: `${baseURL}/erro`,
        pending: `${baseURL}/pendente`,
      },
      auto_return: 'approved',
      payer: {
        name: body.nome,
        email: body.email,
      },
    });

    return NextResponse.json({ init_point: result.body.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json(
      { error: 'Erro ao criar preferência' },
      { status: 500 }
    );
  }
}
