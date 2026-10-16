// Envia uma notificação de teste para os aparelhos cadastrados. Só com login no painel.
import { NextResponse } from 'next/server';
import { logado } from '@/lib/auth';
import { notificar } from '@/lib/push';

export async function POST() {
  if (!(await logado())) return NextResponse.json({ erro: 'não autorizado' }, { status: 401 });
  const enviados = await notificar({ titulo: '✅ Notificações ativadas', corpo: 'Você vai receber aqui as vendas, os agendamentos e os lembretes.', url: '/painel', tag: 'teste' });
  return NextResponse.json({ ok: enviados > 0, enviados });
}
