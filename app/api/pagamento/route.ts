import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getProduto, nomeCompleto } from '@/lib/catalogo';
import { SITE } from '@/lib/site';
import { dbAtivo, salvarPedido } from '@/lib/db';

const soNumeros = (v: unknown) => String(v ?? '').replace(/\D/g, '');
const texto = (v: unknown, max = 120) => String(v ?? '').trim().slice(0, max);

export async function POST(req: Request) {
  try {
    if (!process.env.MP_ACCESS_TOKEN) {
      console.error('MP_ACCESS_TOKEN não configurado');
      return NextResponse.json({ error: 'Pagamento indisponível no momento.' }, { status: 500 });
    }

    const body = await req.json();

    // O preço vem SEMPRE do catálogo do servidor, nunca do navegador.
    const produto = getProduto(texto(body.produtoId, 40));
    if (!produto) {
      return NextResponse.json({ error: 'Produto inválido.' }, { status: 400 });
    }

    const nome = texto(body.nome);
    const email = texto(body.email);
    const documento = soNumeros(body.documento);
    const telefone = soNumeros(body.telefone);
    const cidade = texto(body.cidade, 80);
    // Número do pedido gerado no servidor (não aceita número vindo do navegador)
    const pedido = `RVX${Date.now().toString(36).slice(-5)}${Math.random().toString(36).slice(2, 5)}`.toUpperCase();

    if (!nome || !/^\S+@\S+\.\S+$/.test(email) || ![11, 14].includes(documento.length) || telefone.length < 10) {
      return NextResponse.json({ error: 'Confira seus dados e tente novamente.' }, { status: 400 });
    }

    // Registra o pedido no painel (se o banco estiver configurado)
    try {
      await salvarPedido({
        id: pedido,
        criadoEm: Date.now(),
        origem: 'site',
        produtoId: produto.id,
        produto: nomeCompleto(produto),
        preco: produto.preco,
        nome,
        email,
        documento: texto(body.documento, 20),
        telefone: texto(body.telefone, 20),
        cidade,
        status: 'aguardando',
      });
    } catch (e) {
      console.error('Não foi possível salvar o pedido no banco', e);
    }

    const [primeiroNome, ...resto] = nome.split(' ');
    const baseURL = SITE.url;

    const preference = new Preference(new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN }));
    const response = await preference.create({
      body: {
        items: [
          {
            id: produto.id,
            title: nomeCompleto(produto),
            quantity: 1,
            currency_id: 'BRL',
            unit_price: produto.preco,
          },
        ],
        payer: {
          name: primeiroNome,
          surname: resto.join(' '),
          email,
          identification: { type: documento.length === 11 ? 'CPF' : 'CNPJ', number: documento },
          phone: { area_code: telefone.slice(0, 2), number: telefone.slice(2) },
        },
        // Aparece no painel do Mercado Pago junto com a venda
        metadata: { pedido, nome, documento, telefone, cidade, produto: nomeCompleto(produto) },
        back_urls: {
          success: `${baseURL}/obrigado`,
          pending: `${baseURL}/pagamento-pendente`,
          failure: `${baseURL}/pagamento-erro`,
        },
        auto_return: 'approved',
        ...(dbAtivo() ? { notification_url: `${baseURL}/api/webhook/mercadopago` } : {}),
        statement_descriptor: 'REVOLUX CERTIFICADOS',
        external_reference: pedido,
      },
    });

    return NextResponse.json({ init_point: response.init_point, pedido });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json({ error: 'Não foi possível iniciar o pagamento.' }, { status: 500 });
  }
}
