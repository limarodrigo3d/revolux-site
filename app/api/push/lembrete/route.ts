// Chamado pelo QStash alguns minutos antes da videochamada (agendado em lib/push.ts).
// Antes de avisar, confere se a reserva ainda existe (pode ter sido desmarcada ou remarcada).
import { NextResponse } from 'next/server';
import { ocupacao, rotuloDia, type Reserva } from '@/lib/agenda';
import { getPedido } from '@/lib/db';
import { LEMBRETE_MINUTOS, notificar, segredoValido } from '@/lib/push';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const k = new URL(req.url).searchParams.get('k') || '';
  if (!(await segredoValido(k))) return NextResponse.json({ erro: 'não autorizado' }, { status: 401 });

  const { data, hora, pedido } = await req.json().catch(() => ({}));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data)) || !/^\d{2}:\d{2}$/.test(String(hora))) return NextResponse.json({ ok: true });

  const reserva = (await ocupacao([data]))[data]?.[hora];
  if (!reserva || reserva === 'BLOQ' || (reserva as Reserva).pedido !== pedido) return NextResponse.json({ ok: true, ignorado: 'reserva mudou' });

  const p = await getPedido(pedido);
  if (p?.status === 'cancelado' || p?.status === 'emitido') return NextResponse.json({ ok: true, ignorado: p.status });

  const r = reserva as Reserva;
  await notificar({
    titulo: `⏰ Em ${LEMBRETE_MINUTOS} min: videochamada às ${hora}`,
    corpo: `${r.nome} · ${r.produto} · ${rotuloDia(data)}`,
    url: '/painel/agenda',
    tag: `lembrete-${pedido}`,
  });
  return NextResponse.json({ ok: true });
}
