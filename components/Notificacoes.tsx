'use client';

import { useEffect, useState } from 'react';

type Estado = 'carregando' | 'sem-suporte' | 'instalar-ios' | 'negado' | 'desligado' | 'ligado';

function chaveParaBytes(base64: string) {
  const pad = '='.repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

/** Cartão do painel para ativar as notificações neste aparelho (e ensinar a instalar no iPhone). */
export default function Notificacoes() {
  const [estado, setEstado] = useState<Estado>('carregando');
  const [msg, setMsg] = useState('');
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    (async () => {
      const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const instalado =
        window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
      const suporta = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

      if (ios && !instalado) return setEstado('instalar-ios');
      if (!suporta) return setEstado('sem-suporte');
      if (Notification.permission === 'denied') return setEstado('negado');
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        const sub = await reg.pushManager.getSubscription();
        setEstado(sub && Notification.permission === 'granted' ? 'ligado' : 'desligado');
      } catch {
        setEstado('sem-suporte');
      }
    })();
  }, []);

  async function ativar() {
    setOcupado(true);
    setMsg('');
    try {
      const perm = await Notification.requestPermission(); // precisa vir direto do toque no botão (iPhone)
      if (perm !== 'granted') return setEstado(perm === 'denied' ? 'negado' : 'desligado');
      const reg = await navigator.serviceWorker.ready;
      const { publicKey } = await (await fetch('/api/push/assinar')).json();
      const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: chaveParaBytes(publicKey) }));
      const r = await fetch('/api/push/assinar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sub.toJSON()) });
      if (!r.ok) throw new Error();
      setEstado('ligado');
      await testar();
    } catch {
      setMsg('Não deu certo. Feche o app, abra de novo pelo ícone e tente outra vez.');
    } finally {
      setOcupado(false);
    }
  }

  async function testar() {
    const r = await fetch('/api/push/teste', { method: 'POST' }).then((x) => x.json()).catch(() => ({}));
    setMsg(r.ok ? 'Enviamos uma notificação de teste. Chegou?' : 'Não conseguimos enviar o teste. Tente ativar de novo.');
  }

  async function desativar() {
    setOcupado(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch('/api/push/assinar', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) });
        await sub.unsubscribe();
      }
      setEstado('desligado');
      setMsg('');
    } finally {
      setOcupado(false);
    }
  }

  if (estado === 'carregando' || estado === 'sem-suporte') return null;

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <p className="font-display font-bold">🔔 Notificações neste celular</p>

      {estado === 'instalar-ios' && (
        <div className="mt-2 text-sm text-ink/70">
          <p>Para receber avisos de venda, agendamento e lembrete no iPhone, instale o painel como app:</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              Toque em <b>Compartilhar</b> (quadrado com seta, na barra do Safari).
            </li>
            <li>
              Escolha <b>Adicionar à Tela de Início</b> e toque em <b>Adicionar</b>.
            </li>
            <li>
              Abra o app <b>Revolux</b> pelo ícone novo, entre com a senha e toque em <b>Ativar notificações</b>.
            </li>
          </ol>
        </div>
      )}

      {estado === 'negado' && (
        <p className="mt-2 text-sm text-ink/70">
          As notificações foram bloqueadas. No iPhone: <b>Ajustes → Notificações → Revolux</b> e ative <b>Permitir Notificações</b>. Depois abra o app de novo.
        </p>
      )}

      {estado === 'desligado' && (
        <>
          <p className="mt-1 text-sm text-ink/65">Receba aqui cada venda, cada horário marcado e um lembrete 30 min antes da videochamada.</p>
          <button type="button" onClick={ativar} disabled={ocupado} className="btn-primary mt-3 w-full !py-2.5 sm:w-auto">
            {ocupado ? 'Ativando…' : 'Ativar notificações'}
          </button>
        </>
      )}

      {estado === 'ligado' && (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-selo/10 px-3 py-1 font-semibold text-selo">Ativadas ✓</span>
          <button type="button" onClick={testar} className="btn-outline !py-1.5">Enviar teste</button>
          <button type="button" onClick={desativar} disabled={ocupado} className="text-ink/50 underline underline-offset-4">Desativar</button>
        </div>
      )}

      {msg && <p className="mt-3 text-sm text-ink/70">{msg}</p>}
    </div>
  );
}
