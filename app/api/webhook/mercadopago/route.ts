// O Mercado Pago chama esta rota quando um pagamento muda de status.
// Por segurança, NÃO confiamos no conteúdo recebido: consultamos o pagamento
// direto na API do Mercado Pago usando o nosso token.
import { NextResponse } from 'next/server';
import { atualizarPedido, dbAtivo, getPedido, salvarPedido } from '@/lib/db';
import { enviarEmail, esc } from '@/lib/email';
import { brl, SITE } from '@/lib/site';

export async function POST(req: Request) {
  if (!dbAtivo() || !process.env.MP_ACCESS_TOKEN) return NextResponse.json({ ok: true });

  try {
    const url = new URL(req.url);
    const body = await req.json().catch(() => ({}));
    const tipo = body?.type || body?.topic || url.searchParams.get('type') || url.searchParams.get('topic');
    const id = String(body?.data?.id || url.searchParams.get('data.id') || url.searchParams.get('id') || '').replace(/\D/g, '');
    if (tipo !== 'payment' || !id) return NextResponse.json({ ok: true });

    const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
      cache: 'no-store',
    });
    if (!res.ok) return NextResponse.json({ ok: true });
    const pg = await res.json();

    const ref = String(pg.external_reference || '');
    if (!ref || pg.status !== 'approved') return NextResponse.json({ ok: true });

    const existente = await getPedido(ref);
    if (existente && existente.status !== 'aguardando') return NextResponse.json({ ok: true }); // já processado

    const md = pg.metadata || {};
    const pedido = existente
      ? await atualizarPedido(ref, { status: 'pago', pagamentoId: id, pagoEm: Date.now() })
      : await (async () => {
          const novo = {
            id: ref,
            criadoEm: Date.now(),
            origem: 'site' as const,
            produtoId: String(pg.additional_info?.items?.[0]?.id || ''),
            produto: String(md.produto || pg.description || 'Certificado'),
            preco: Number(pg.transaction_amount || 0),
            nome: String(md.nome || ''),
            email: String(pg.payer?.email || ''),
            documento: String(md.documento || ''),
            telefone: String(md.telefone || ''),
            cidade: String(md.cidade || ''),
            status: 'pago' as const,
            pagamentoId: id,
            pagoEm: Date.now(),
          };
          await salvarPedido(novo);
          return novo;
        })();

    if (pedido && process.env.EMAIL_AVISOS) {
      await enviarEmail(
        process.env.EMAIL_AVISOS,
        `Nova venda: ${pedido.produto} (${pedido.id})`,
        `<h2>Nova venda pelo site</h2>
         <p><b>${esc(pedido.produto)}</b> — ${brl(pedido.preco)}</p>
         <p>${esc(pedido.nome)}<br>${esc(pedido.documento)}<br>${esc(pedido.telefone)}<br>${esc(pedido.email)}<br>${esc(pedido.cidade)}</p>
         <p><a href="${SITE.url}/painel">Abrir o painel</a></p>`,
      );
    }
  } catch (e) {
    console.error('Erro no webhook do Mercado Pago', e);
  }
  // Sempre responde 200 para o Mercado Pago não ficar reenviando
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
