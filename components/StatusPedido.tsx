'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { lerPedido, mensagemPedido, type Pedido } from '@/lib/pedido';
import { SITE, waLink } from '@/lib/site';
import { documentosDoProduto } from '@/lib/documentos';
import { track } from '@/lib/track';
import { WhatsIcon } from './Icones';
import Agendamento from './Agendamento';

type Tipo = 'sucesso' | 'pendente' | 'erro';

const textos: Record<Tipo, { cor: string; selo: string; titulo: string; sub: string; status: string; botao: string }> = {
  sucesso: {
    cor: 'bg-selo text-white',
    selo: '✓',
    titulo: 'Pagamento aprovado!',
    sub: 'Agora faltam poucos passos para o seu certificado ficar pronto.',
    status: 'Acabei de pagar meu certificado pelo site.',
    botao: 'Agendar minha videoconferência',
  },
  pendente: {
    cor: 'bg-amber-300 text-ink',
    selo: '…',
    titulo: 'Pagamento em análise',
    sub: 'Se você pagou com Pix ou boleto, a confirmação pode levar alguns minutos. Já pode nos chamar para adiantar o agendamento.',
    status: 'Fiz o pagamento do meu certificado e está pendente.',
    botao: 'Adiantar meu agendamento',
  },
  erro: {
    cor: 'bg-red-200 text-red-900',
    selo: '!',
    titulo: 'O pagamento não foi concluído',
    sub: 'Nenhum valor foi cobrado. Você pode tentar novamente ou finalizar com a gente pelo WhatsApp.',
    status: 'Tentei pagar meu certificado pelo site e não consegui.',
    botao: 'Finalizar pelo WhatsApp',
  },
};

export default function StatusPedido({ tipo }: { tipo: Tipo }) {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [mpId, setMpId] = useState('');
  const [agendaOk, setAgendaOk] = useState(true); // false = sem agenda no site, agenda pelo WhatsApp
  const [quando, setQuando] = useState('');
  const t = textos[tipo];

  useEffect(() => {
    const p = lerPedido();
    setPedido(p);
    const q = new URLSearchParams(window.location.search);
    setMpId(q.get('payment_id') || q.get('collection_id') || '');
    // Conta a venda uma única vez por pedido (Google Analytics / Pixel)
    if (tipo === 'sucesso' && p) {
      try {
        const k = `rvx_track_${p.pedido}`;
        if (!localStorage.getItem(k)) {
          track('purchase', { value: p.preco, transaction_id: p.pedido, item: p.produtoId });
          localStorage.setItem(k, '1');
        }
      } catch {}
    }
  }, [tipo]);

  let mensagem = `Olá! ${t.status}`;
  if (pedido) mensagem = mensagemPedido(pedido, t.status);
  if (mpId) mensagem += `\n\n*ID do pagamento (Mercado Pago):* ${mpId}`;
  if (quando) mensagem = mensagem.replace('Quero agendar a minha videoconferência.', `*Videochamada marcada:* ${quando}\n\nVou enviar as fotos dos documentos.`);
  const agendaNoSite = !SITE.agendaUrl && agendaOk && !!pedido;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-x max-w-xl">
        <div className="rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-lift md:p-10">
          <span className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl font-display text-3xl font-extrabold ${t.cor}`}>{t.selo}</span>
          <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">{t.titulo}</h1>
          <p className="mt-3 text-ink/65">{t.sub}</p>

          {pedido && (
            <dl className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-paper p-4 text-left text-sm">
              <div>
                <dt className="text-ink/50">Pedido</dt>
                <dd className="font-semibold">{pedido.pedido}</dd>
              </div>
              <div>
                <dt className="text-ink/50">Certificado</dt>
                <dd className="font-semibold">{pedido.produto}</dd>
              </div>
            </dl>
          )}

          {tipo === 'sucesso' ? (
            <ol className="mt-8 space-y-4 text-left">
              <li className="rounded-2xl border border-ink/10 p-5">
                <p className="font-display font-bold">1. Separe seus documentos</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  {documentosDoProduto(pedido?.produtoId || '').map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-selo" aria-hidden="true" /> {d}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="rounded-2xl border border-ink/10 p-5">
                <p className="font-display font-bold">
                  2. {quando ? 'Videochamada marcada!' : agendaNoSite || SITE.agendaUrl ? 'Escolha o dia e o horário da sua videochamada' : 'Agende sua videoconferência pelo WhatsApp'}
                </p>
                {quando ? (
                  <p className="mt-3 rounded-xl bg-selo/10 p-4 font-display text-lg font-bold text-ink">{quando}</p>
                ) : agendaNoSite && pedido ? (
                  <Agendamento pedido={pedido} onAgendado={setQuando} onIndisponivel={() => setAgendaOk(false)} />
                ) : SITE.agendaUrl ? (
                  <a href={SITE.agendaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full">
                    Ver horários disponíveis
                  </a>
                ) : (
                  <a href={waLink(mensagem)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-4 w-full py-4 text-base">
                    <WhatsIcon /> {t.botao}
                  </a>
                )}
              </li>
              {(quando || agendaNoSite || SITE.agendaUrl) && (
                <li className="rounded-2xl border border-ink/10 p-5">
                  <p className="font-display font-bold">3. Envie as fotos dos documentos</p>
                  <p className="mt-1 text-sm text-ink/65">Assim conferimos tudo antes da chamada e ela fica bem rápida.</p>
                  <a href={waLink(mensagem)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-4 w-full">
                    <WhatsIcon /> {quando ? 'Confirmar no WhatsApp e enviar documentos' : 'Enviar pelo WhatsApp'}
                  </a>
                </li>
              )}
            </ol>
          ) : (
            <a href={waLink(mensagem)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-8 w-full py-4 text-base">
              <WhatsIcon /> {t.botao}
            </a>
          )}
          {tipo === 'erro' && pedido && (
            <Link href={`/checkout?p=${pedido.produtoId}`} className="btn-outline mt-3 w-full">
              Tentar pagar de novo
            </Link>
          )}
          <Link href="/" className="mt-6 inline-block text-sm text-ink/50 underline underline-offset-4">
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
