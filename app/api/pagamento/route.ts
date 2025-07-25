import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const baseURL =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://revolux-site.vercel.app';

    const preference = new Preference(mercadopago);

    const result = await preference.create({
      body: {
        items: [
          {
            id: body.id || 'produto-1',
            title: body.title,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: body.price,
          },
        ],
        back_urls: {
          success: `${baseURL}/obrigado`,
          failure: `${baseURL}/erro`,
          pending: `${baseURL}/pendente`,
        },
        auto_return: 'approved',
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json(
      { error: 'Erro ao criar preferência' },
      { status: 500 }
    );
  }
}
