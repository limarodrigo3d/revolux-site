// Agenda pública: lista horários (GET) e reserva um horário para um pedido (POST).
import { NextResponse } from 'next/server';
import { agendaPublica, instante, reservar } from '@/lib/agenda';
import { dbAtivo, getPedido } from '@/lib/db';
import { enviarEmail, esc } from '@/lib/email';
import { SITE } from '@/lib/site';
import { agendarLembrete, notificar } from '@/lib/push';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!dbAtivo()) return NextResponse.json({ ativo: false, dias: [] });
  try {
    return NextResponse.json({ ativo: true, dias: await agendaPublica() });
  } catch (e) {
    console.error('Erro ao ler a agenda', e);
    return NextResponse.json({ ativo: false, dias: [] });
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const txt = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
  const pedido = txt(body.pedido, 40);
  const data = txt(body.data, 10);
  const hora = txt(body.hora, 5);
  try {
    const r = await reservar(pedido, txt(body.documento, 20), data, hora);
    if (!r.ok) return NextResponse.json(r, { status: 409 });

    const p = await getPedido(pedido);
    await Promise.all([
      notificar({
        titulo: `📅 Videochamada marcada: ${r.quando}`,
        corpo: `${p?.nome || 'Cliente'} · ${p?.produto || ''}`,
        url: '/painel/agenda',
        tag: `agenda-${pedido}`,
      }),
      agendarLembrete(data, hora, pedido, instante(data, hora)),
    ]);
    if (p && process.env.EMAIL_AVISOS) {
      await enviarEmail(
        process.env.EMAIL_AVISOS,
        `Videochamada marcada: ${r.quando} · ${p.nome}`,
        `<h2>Nova videochamada marcada pelo site</h2>
         <p><b>${esc(r.quando)}</b></p>
         <p>${esc(p.nome)}<br>${esc(p.produto)}<br>${esc(p.telefone)}</p>
         <p><a href="${SITE.url}/painel/agenda">Abrir a agenda</a></p>`,
      );
    }
    return NextResponse.json(r);
  } catch (e) {
    console.error('Erro ao reservar horário', e);
    return NextResponse.json({ ok: false, erro: 'Não foi possível reservar agora. Agende pelo WhatsApp.' }, { status: 500 });
  }
}
