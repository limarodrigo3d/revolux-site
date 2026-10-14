'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProduto, nomeCompleto } from '@/lib/catalogo';
import { brl, waLink } from '@/lib/site';
import { track } from '@/lib/track';
import { Check, Seta, WhatsIcon } from '@/components/Icones';

type Resp = { quem?: 'pf' | 'pj'; uso?: string; onde?: 'um' | 'varios' | 'celular' };

const USOS: Record<'pf' | 'pj', { id: string; t: string }[]> = {
  pf: [
    { id: 'receita', t: 'Imposto de Renda, e-CAC e gov.br' },
    { id: 'assinar', t: 'Assinar contratos e documentos' },
    { id: 'saude', t: 'Receitas e atestados médicos' },
    { id: 'juridico', t: 'Processos judiciais (PJe, e-SAJ)' },
  ],
  pj: [
    { id: 'nota', t: 'Emitir nota fiscal (NF-e / NFC-e)' },
    { id: 'transporte', t: 'Emitir CT-e / MDF-e (transporte)' },
    { id: 'contabil', t: 'eSocial, e-CAC e contabilidade' },
    { id: 'assinar', t: 'Assinar contratos da empresa' },
  ],
};

function recomendar(r: Required<Resp>) {
  const precisaComputador = ['nota', 'transporte', 'contabil'].includes(r.uso);
  if (r.quem === 'pf') {
    if (r.onde === 'celular') return { id: 'birdidpf', porque: 'Você assina pelo celular, sem token e sem instalar nada.' };
    if (r.uso === 'juridico' || r.onde === 'varios')
      return { id: 'ecpf-token', porque: 'O token vai com você para qualquer computador e é aceito nos sistemas dos tribunais.' };
    return { id: 'ecpf-a1', porque: 'É o mais prático e econômico para usar sempre no mesmo computador.' };
  }
  if (r.uso === 'transporte') {
    return r.onde === 'varios'
      ? { id: 'nfe-a3', porque: 'Com o token você emite CT-e e MDF-e de qualquer computador.' }
      : { id: 'nfe-pj', porque: 'Feito para emitir CT-e e MDF-e direto no seu emissor.' };
  }
  if (r.onde === 'celular' && !precisaComputador) return { id: 'birdidpj', porque: 'Os sócios assinam pelo celular, de qualquer lugar.' };
  if (r.onde === 'varios') return { id: 'ecnpj-token', porque: 'O token vai junto para qualquer computador da empresa ou do contador.' };
  return {
    id: 'ecnpj-a1',
    porque:
      r.onde === 'celular'
        ? 'Para emitir notas e usar o e-CAC o certificado precisa ficar no computador ou no sistema emissor. O A1 é o mais indicado.'
        : 'É o mais usado por empresas e MEI: instala no emissor de nota e no computador do contador.',
  };
}

export default function Quiz() {
  const [r, setR] = useState<Resp>({});
  const passo = !r.quem ? 1 : !r.uso ? 2 : !r.onde ? 3 : 4;

  const Opcao = ({ ativo, onClick, children }: { ativo?: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-5 text-left text-[17px] font-semibold transition hover:border-navy ${
        ativo ? 'border-navy bg-navy-50' : 'border-ink/10 bg-white'
      }`}
    >
      {children}
      <Seta className="h-5 w-5 shrink-0 text-navy" />
    </button>
  );

  const resultado = passo === 4 ? recomendar(r as Required<Resp>) : null;
  const produto = resultado ? getProduto(resultado.id) : undefined;

  useEffect(() => {
    if (produto) track('quiz_resultado', { item: produto.id });
  }, [produto]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-2" aria-label={`Passo ${Math.min(passo, 3)} de 3`}>
        {[1, 2, 3].map((n) => (
          <span key={n} className={`h-2 flex-1 rounded-full ${passo > n ? 'bg-navy' : passo === n ? 'bg-carimbo' : 'bg-ink/10'}`} />
        ))}
      </div>

      {passo === 1 && (
        <div className="animate-fade-in space-y-3">
          <h2 className="mb-5 text-2xl font-extrabold md:text-3xl">Para quem é o certificado?</h2>
          <Opcao onClick={() => setR({ quem: 'pf' })}>Para mim (pessoa física / CPF)</Opcao>
          <Opcao onClick={() => setR({ quem: 'pj' })}>Para minha empresa ou MEI (CNPJ)</Opcao>
        </div>
      )}

      {passo === 2 && r.quem && (
        <div className="animate-fade-in space-y-3">
          <h2 className="mb-5 text-2xl font-extrabold md:text-3xl">Para que você vai usar?</h2>
          {USOS[r.quem].map((u) => (
            <Opcao key={u.id} onClick={() => setR({ ...r, uso: u.id })}>
              {u.t}
            </Opcao>
          ))}
        </div>
      )}

      {passo === 3 && (
        <div className="animate-fade-in space-y-3">
          <h2 className="mb-5 text-2xl font-extrabold md:text-3xl">Como prefere usar?</h2>
          <Opcao onClick={() => setR({ ...r, onde: 'um' })}>Sempre no mesmo computador</Opcao>
          <Opcao onClick={() => setR({ ...r, onde: 'varios' })}>Em computadores diferentes</Opcao>
          <Opcao
            onClick={() => {
              setR({ ...r, onde: 'celular' });
            }}
          >
            No celular, sem instalar nada
          </Opcao>
        </div>
      )}

      {passo === 4 && produto && resultado && (
        <div className="animate-fade-in rounded-3xl border border-navy bg-white p-7 shadow-lift md:p-9">
          <p className="eyebrow">O ideal para você</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">{nomeCompleto(produto)}</h2>
          <p className="mt-3 text-lg text-ink/70">{resultado.porque}</p>
          <p className="mt-5 font-display text-4xl font-extrabold">{brl(produto.preco)}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {produto.itens.map((i) => (
              <li key={i} className="flex gap-2 text-[15px]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-selo" /> {i}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/checkout?p=${produto.id}`} className="btn-primary flex-1 py-4 text-base">
              Comprar agora
            </Link>
            <a
              href={waLink(`Olá! Fiz o teste no site e deu ${nomeCompleto(produto)}. Pode confirmar se é o ideal para mim?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn flex-1 border border-wa/40 py-4 text-[#128C4B] hover:bg-wa/5"
            >
              <WhatsIcon /> Confirmar no WhatsApp
            </a>
          </div>
          <button type="button" onClick={() => setR({})} className="mt-6 text-sm text-ink/55 underline underline-offset-4">
            Refazer o teste
          </button>
        </div>
      )}

      {passo > 1 && passo < 4 && (
        <button type="button" onClick={() => setR(passo === 2 ? {} : { quem: r.quem })} className="mt-6 text-sm text-ink/55 underline underline-offset-4">
          Voltar
        </button>
      )}
    </div>
  );
}
