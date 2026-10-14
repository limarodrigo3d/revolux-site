'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { entrar, logado, sair, senhaCorreta } from '@/lib/auth';
import { atualizarPedido, excluirPedido, getPedido, salvarPedido, somarMeses, type Status } from '@/lib/db';
import { getProduto, nomeCompleto } from '@/lib/catalogo';

async function exigirLogin() {
  if (!(await logado())) redirect('/painel/entrar');
}

const txt = (f: FormData, k: string, max = 200) => String(f.get(k) ?? '').trim().slice(0, max);

export async function acaoEntrar(_: unknown, f: FormData) {
  await new Promise((r) => setTimeout(r, 400)); // dificulta tentativas em massa
  if (!senhaCorreta(txt(f, 'senha', 100))) return { erro: 'Senha incorreta.' };
  await entrar();
  redirect('/painel');
}

export async function acaoSair() {
  await sair();
  redirect('/painel/entrar');
}

export async function acaoStatus(f: FormData) {
  await exigirLogin();
  const id = txt(f, 'id', 40);
  const status = txt(f, 'status', 20) as Status;
  const atual = await getPedido(id);
  if (!atual) return;
  const patch: Parameters<typeof atualizarPedido>[1] = { status };
  if (status === 'pago' && !atual.pagoEm) patch.pagoEm = Date.now();
  if (status === 'emitido' && !atual.emitidoEm) {
    patch.emitidoEm = Date.now();
    const meses = getProduto(atual.produtoId)?.validadeMeses;
    if (meses && !atual.validade) patch.validade = somarMeses(new Date(), meses);
  }
  await atualizarPedido(id, patch);
  revalidatePath('/painel');
}

export async function acaoDetalhes(f: FormData) {
  await exigirLogin();
  const id = txt(f, 'id', 40);
  const validade = txt(f, 'validade', 10);
  await atualizarPedido(id, {
    agendadoPara: txt(f, 'agendadoPara', 60),
    validade: /^\d{4}-\d{2}-\d{2}$/.test(validade) ? validade : undefined,
    notas: txt(f, 'notas', 1000),
  });
  revalidatePath('/painel');
}

export async function acaoAvisado(f: FormData) {
  await exigirLogin();
  const id = txt(f, 'id', 40);
  const p = await getPedido(id);
  if (!p) return;
  await atualizarPedido(id, { avisos: [...(p.avisos || []), `manual:${new Date().toISOString().slice(0, 10)}`] });
  revalidatePath('/painel');
}

export async function acaoExcluir(f: FormData) {
  await exigirLogin();
  await excluirPedido(txt(f, 'id', 40));
  revalidatePath('/painel');
}

/** Cadastro manual: vendas feitas pelo WhatsApp ou clientes antigos (para lembrar da renovação). */
export async function acaoNovo(f: FormData) {
  await exigirLogin();
  const produto = getProduto(txt(f, 'produtoId', 40));
  const validade = txt(f, 'validade', 10);
  const status = (txt(f, 'status', 20) || 'pago') as Status;
  await salvarPedido({
    id: `MAN${Date.now().toString(36).toUpperCase()}`,
    criadoEm: Date.now(),
    origem: 'manual',
    produtoId: produto?.id || '',
    produto: produto ? nomeCompleto(produto) : txt(f, 'produtoLivre', 80) || 'Certificado',
    preco: Number(txt(f, 'preco', 12).replace(',', '.')) || produto?.preco || 0,
    nome: txt(f, 'nome', 120),
    email: txt(f, 'email', 120),
    documento: txt(f, 'documento', 20),
    telefone: txt(f, 'telefone', 20),
    cidade: txt(f, 'cidade', 80),
    status,
    pagoEm: status !== 'aguardando' && f.get('venda') === 'on' ? Date.now() : undefined,
    emitidoEm: status === 'emitido' ? Date.now() : undefined,
    validade: /^\d{4}-\d{2}-\d{2}$/.test(validade) ? validade : undefined,
  });
  revalidatePath('/painel');
  redirect('/painel');
}
