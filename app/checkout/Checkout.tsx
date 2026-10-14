'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { categoriaDoProduto, getProduto, nomeCompleto } from '@/lib/catalogo';
import { brl, waLink } from '@/lib/site';
import { mascaraCNPJ, mascaraCPF, mascaraTelefone, mensagemPedido, salvarPedido, type Pedido } from '@/lib/pedido';
import { Check, WhatsIcon } from '@/components/Icones';
import { track } from '@/lib/track';

const PJ = ['e-cnpj', 'nfe-cte', 'bird-id-pj'];

export default function Checkout() {
  const params = useSearchParams();
  const produto = getProduto(params.get('p') || '');
  const categoria = produto ? categoriaDoProduto(produto.id) : undefined;
  const ehPJ = categoria ? PJ.includes(categoria.slug) : false;

  const [form, setForm] = useState({ nome: '', email: '', documento: '', telefone: '', cidade: '' });
  const [aceite, setAceite] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const numeroPedido = useMemo(() => `RVX${Date.now().toString(36).toUpperCase().slice(-6)}`, []);

  if (!produto || !categoria) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-extrabold">Escolha um certificado</h1>
        <p className="mt-3 text-ink/60">Não encontramos o produto selecionado.</p>
        <Link href="/certificados" className="btn-primary mt-8">
          Ver certificados
        </Link>
      </div>
    );
  }

  const set = (campo: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (campo === 'documento') v = ehPJ ? mascaraCNPJ(v) : mascaraCPF(v);
    if (campo === 'telefone') v = mascaraTelefone(v);
    setForm((f) => ({ ...f, [campo]: v }));
  };

  const montarPedido = (): Pedido => ({
    pedido: numeroPedido,
    produtoId: produto.id,
    produto: nomeCompleto(produto),
    preco: produto.preco,
    ...form,
    criadoEm: Date.now(),
  });

  const validar = () => {
    const doc = form.documento.replace(/\D/g, '');
    if (form.nome.trim().split(' ').length < 2) return 'Digite seu nome completo.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Digite um e-mail válido.';
    if (doc.length !== (ehPJ ? 14 : 11)) return `Digite um ${ehPJ ? 'CNPJ' : 'CPF'} válido.`;
    if (form.telefone.replace(/\D/g, '').length < 10) return 'Digite seu WhatsApp com DDD.';
    if (!form.cidade.trim()) return 'Informe sua cidade e estado.';
    if (!aceite) return 'Confirme que leu a Política de Privacidade.';
    return '';
  };

  const pagar = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validar();
    if (msg) return setErro(msg);
    setErro('');
    setEnviando(true);
    const pedido = montarPedido();
    salvarPedido(pedido);
    try {
      const res = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produtoId: produto.id, ...form }),
      });
      const data = await res.json();
      if (data?.init_point) {
        if (data.pedido) salvarPedido({ ...pedido, pedido: data.pedido });
        track('begin_checkout', { value: produto.preco, item: produto.id });
        window.location.href = data.init_point;
        return;
      }
      setErro(data?.error || 'Não foi possível abrir o pagamento. Tente de novo ou finalize pelo WhatsApp.');
    } catch {
      setErro('Falha de conexão. Tente de novo ou finalize pelo WhatsApp.');
    }
    setEnviando(false);
  };

  const finalizarNoWhats = () => {
    const msg = validar();
    if (msg) return setErro(msg);
    const pedido = montarPedido();
    salvarPedido(pedido);
    window.open(waLink(mensagemPedido(pedido, 'Quero comprar este certificado e combinar o pagamento:')), '_blank', 'noopener');
  };

  return (
    <div className="container-x grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_380px]">
      <form onSubmit={pagar} noValidate className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card md:p-8">
        <p className="eyebrow">Passo 1 de 2</p>
        <h1 className="mt-1 text-3xl font-extrabold">Seus dados</h1>
        <p className="mt-2 text-ink/60">Usamos esses dados para emitir o certificado e agendar sua videoconferência.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="nome" className="label">Nome completo</label>
            <input id="nome" className="input" value={form.nome} onChange={set('nome')} autoComplete="name" required />
          </div>
          <div>
            <label htmlFor="documento" className="label">{ehPJ ? 'CNPJ da empresa' : 'CPF'}</label>
            <input
              id="documento"
              className="input"
              value={form.documento}
              onChange={set('documento')}
              inputMode="numeric"
              placeholder={ehPJ ? '00.000.000/0000-00' : '000.000.000-00'}
              required
            />
          </div>
          <div>
            <label htmlFor="telefone" className="label">WhatsApp</label>
            <input
              id="telefone"
              className="input"
              value={form.telefone}
              onChange={set('telefone')}
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="label">E-mail</label>
            <input id="email" type="email" className="input" value={form.email} onChange={set('email')} autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="cidade" className="label">Cidade / UF</label>
            <input id="cidade" className="input" value={form.cidade} onChange={set('cidade')} placeholder="Ex.: Ubá / MG" autoComplete="address-level2" required />
          </div>
        </div>

        <label className="mt-6 flex items-start gap-3 text-sm text-ink/70">
          <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} className="mt-0.5 h-5 w-5 accent-navy" />
          <span>
            Li e concordo com a{' '}
            <Link href="/politica-de-privacidade" target="_blank" className="font-medium text-carimbo underline">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>

        {erro && (
          <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {erro}
          </p>
        )}

        <button type="submit" disabled={enviando} className="btn-primary mt-6 w-full py-4 text-base">
          {enviando ? 'Abrindo pagamento seguro…' : `Pagar ${brl(produto.preco)} com Pix ou cartão`}
        </button>
        <button type="button" onClick={finalizarNoWhats} className="btn mt-3 w-full border border-wa/40 text-[#128C4B] hover:bg-wa/5">
          <WhatsIcon /> Prefiro finalizar pelo WhatsApp
        </button>
        <p className="mt-4 text-center text-xs text-ink/50">Pagamento processado pelo Mercado Pago. Não guardamos dados do seu cartão.</p>
      </form>

      <aside className="h-fit rounded-2xl bg-ink p-6 text-white lg:sticky lg:top-24">
        <p className="text-sm text-white/60">Resumo do pedido</p>
        <h2 className="mt-1 text-xl font-bold">{produto.nome}</h2>
        <p className="text-white/70">{produto.midia}</p>
        <div className="my-5 border-t border-white/10" />
        <div className="flex items-end justify-between">
          <span className="text-white/70">Total</span>
          <span className="font-display text-3xl font-extrabold text-carimbo-300">{brl(produto.preco)}</span>
        </div>
        <ul className="mt-6 space-y-2.5 text-sm text-white/80">
          {produto.itens.map((i) => (
            <li key={i} className="flex gap-2">
              <Check className="h-4 w-4 shrink-0 text-carimbo-300" /> {i}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl bg-white/5 p-4 text-sm text-white/70">
          <strong className="text-white">Depois do pagamento:</strong> você vai direto para o nosso WhatsApp para agendar a videoconferência.
        </div>
        <Link href={`/solucoes/${categoria.slug}`} className="mt-5 inline-block text-sm text-white/60 underline underline-offset-4 hover:text-white">
          Trocar de modelo
        </Link>
      </aside>
    </div>
  );
}

