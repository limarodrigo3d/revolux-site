import { NextResponse } from 'next/server';
import { MercadoPagoConfig } from 'mercadopago';

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const preference = await mercadopago.preferences.create({
      body: {
        items: [
          {
            title: body.title,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: body.price,
          },
        ],
        back_urls: {
          success: 'https://seusite.com.br/obrigado',
          failure: 'https://seusite.com.br/erro',
          pending: 'https://seusite.com.br/pendente',
        },
        auto_return: 'approved',
      },
    });

    return NextResponse.json({ init_point: preference.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json({ error: 'Erro ao criar preferência' }, { status: 500 });
  }
}
