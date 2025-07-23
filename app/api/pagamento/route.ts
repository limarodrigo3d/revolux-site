import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.json();

  const items = body.cart.map((item: any) => ({
    title: item.nome,
    quantity: item.quantidade || 1,
    unit_price: item.preco,
    currency_id: 'BRL',
  }));

  const preference = {
    items,
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_URL}/obrigado`,
      failure: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      pending: `${process.env.NEXT_PUBLIC_URL}/checkout`,
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return NextResponse.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json({ error: 'Erro ao criar link de pagamento' }, { status: 500 });
  }
}
