import { NextResponse } from 'next/server';
import { MercadoPagoConfig } from 'mercadopago';

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.json();

  const items = body.cart.map((item: any) => ({
    title: item.nome,
    quantity: item.quantidade || 1,
    unit_price: item.preco,
    currency_id: 'BRL',
  }));

  try {
    const preference = await mercadopago.preferences.create({
      body: {
        items,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/obrigado`,
          failure: `${process.env.NEXT_PUBLIC_URL}/checkout`,
          pending: `${process.env.NEXT_PUBLIC_URL}/checkout`,
        },
        auto_return: 'approved',
      },
    });

    return NextResponse.json({ init_point: preference.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json({ error: 'Erro ao criar link de pagamento' }, { status: 500 });
  }
}
