// Roda 1x por dia (configurado em vercel.json). Envia e-mail de lembrete ao cliente
// 30 e 7 dias antes do vencimento e um resumo para a Revolux.
// Precisa de: banco (Upstash) + Resend (RESEND_API_KEY, EMAIL_REMETENTE). Opcional: CRON_SECRET.
import { NextResponse } from 'next/server';
import { atualizarPedido, dbAtivo, diasParaVencer, listarPedidos } from '@/lib/db';
import { emailAtivo, enviarEmail, esc } from '@/lib/email';
import { SITE, waLink } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const segredo = process.env.CRON_SECRET;
  if (segredo && req.headers.get('authorization') !== `Bearer ${segredo}`) {
    return NextResponse.json({ erro: 'não autorizado' }, { status: 401 });
  }
  if (!dbAtivo()) return NextResponse.json({ ok: true, aviso: 'banco não configurado' });

  const pedidos = await listarPedidos(5000);
  const enviados: string[] = [];
  const vencendo: string[] = [];

  for (const p of pedidos) {
    if (p.status !== 'emitido') continue;
    const dias = diasParaVencer(p);
    if (dias === null) continue;
    if (dias <= 30 && dias >= 0) vencendo.push(`${p.nome} — ${p.produto} — vence em ${dias} dia(s)`);

    const marco = dias <= 7 && dias >= 0 ? '7d' : dias <= 30 && dias > 7 ? '30d' : null;
    if (!marco || p.avisos?.includes(marco) || !p.email || !emailAtivo()) continue;

    const ok = await enviarEmail(
      p.email,
      `Seu certificado digital vence em ${dias} dia(s)`,
      `<p>Olá, ${esc(p.nome.split(' ')[0])}!</p>
       <p>Seu certificado <b>${esc(p.produto)}</b> vence em <b>${p.validade?.split('-').reverse().join('/')}</b>.</p>
       <p>Renove com a Revolux sem sair de casa, por videoconferência:</p>
       <p><a href="${waLink(`Olá! Quero renovar meu certificado ${p.produto}.`)}">Renovar pelo WhatsApp</a> ou acesse <a href="${SITE.url}/renovacao">${SITE.url}/renovacao</a></p>
       <p>Equipe ${SITE.nome}</p>`,
    );
    if (ok) {
      await atualizarPedido(p.id, { avisos: [...(p.avisos || []), marco] });
      enviados.push(`${p.id}:${marco}`);
    }
  }

  if (vencendo.length && process.env.EMAIL_AVISOS) {
    const hoje = new Date();
    if (hoje.getDay() === 1) {
      // resumo semanal às segundas
      await enviarEmail(
        process.env.EMAIL_AVISOS,
        `Renovações dos próximos 30 dias (${vencendo.length})`,
        `<p>Clientes com certificado vencendo:</p><ul>${vencendo.map((v) => `<li>${esc(v)}</li>`).join('')}</ul><p><a href="${SITE.url}/painel?f=renovar">Abrir o painel</a></p>`,
      );
    }
  }

  return NextResponse.json({ ok: true, enviados });
}
