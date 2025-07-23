// app/api/mercadopago/route.ts
import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN!, // Adicione sua chave no .env
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: body.title,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: body.price,
        },
      ],
      back_urls: {
        success: 'https://revoluxcertificados.com.br/obrigado',
        failure: 'https://revoluxcertificados.com.br/erro',
        pending: 'https://revoluxcertificados.com.br/pendente',
      },
      auto_return: 'approved',
    });

    return NextResponse.json({ init_point: preference.body.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json({ error: 'Erro ao criar preferência' }, { status: 500 });
  }
}
