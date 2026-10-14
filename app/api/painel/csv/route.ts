import { logado } from '@/lib/auth';
import { STATUS, listarPedidos } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await logado())) return new Response('Não autorizado', { status: 401 });
  const pedidos = await listarPedidos(5000);
  const col = ['Pedido', 'Data', 'Situação', 'Certificado', 'Valor', 'Nome', 'CPF/CNPJ', 'WhatsApp', 'E-mail', 'Cidade', 'Validade', 'Anotações'];
  const cel = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const linhas = pedidos.map((p) =>
    [
      p.id,
      new Date(p.criadoEm).toLocaleDateString('pt-BR'),
      STATUS.find((s) => s.id === p.status)?.nome,
      p.produto,
      p.preco.toFixed(2).replace('.', ','),
      p.nome,
      p.documento,
      p.telefone,
      p.email,
      p.cidade,
      p.validade?.split('-').reverse().join('/'),
      p.notas,
    ]
      .map(cel)
      .join(';'),
  );
  const csv = '﻿' + [col.map(cel).join(';'), ...linhas].join('\r\n');
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="pedidos-revolux-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
