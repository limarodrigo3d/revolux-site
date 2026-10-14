// Ilustrações próprias da Revolux, no estilo “pixel” da logo (sem fotos de banco de imagem).
import { Check } from './Icones';

/** Rosto em pixels (genérico, sem identificar ninguém) */
function AvatarPixel({ className = '', pele = '#E9B48A', cabelo = '#2F4870', roupa = '#C8F560' }: { className?: string; pele?: string; cabelo?: string; roupa?: string }) {
  // 12x12: c = cabelo, p = pele, r = roupa, . = vazio
  const mapa = [
    '....cccc....',
    '...cccccc...',
    '..cccccccc..',
    '..cpppppppc.',
    '..cpppppppc.',
    '..cpppppppc.',
    '...ppppppp..',
    '....ppppp...',
    '.....ppp....',
    '..rrrrrrrr..',
    '.rrrrrrrrrr.',
    'rrrrrrrrrrrr',
  ];
  const cor: Record<string, string> = { c: cabelo, p: pele, r: roupa };
  return (
    <svg viewBox="0 0 12 12" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {mapa.flatMap((linha, y) =>
        linha.split('').map((ch, x) => (ch === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={cor[ch]} />)),
      )}
    </svg>
  );
}

/** Hero: celular em videochamada + certificado emitido */
export function HeroIlustracao() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px]" role="img" aria-label="Ilustração de uma videochamada pelo celular para validar o certificado digital">
      {/* Celular */}
      <div className="absolute left-[8%] top-0 h-[92%] w-[62%] rounded-[34px] border-[6px] border-white/90 bg-[#111C33] p-2.5 shadow-lift">
        <div className="relative h-full overflow-hidden rounded-[24px] bg-gradient-to-b from-navy to-[#16264A]">
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" />
          <AvatarPixel className="absolute bottom-[22%] left-1/2 w-[64%] -translate-x-1/2" />
          {/* auto-imagem */}
          <div className="absolute right-3 top-8 grid h-[22%] w-[30%] place-items-end overflow-hidden rounded-xl border border-white/20 bg-[#0B1530]">
            <AvatarPixel className="w-[80%]" pele="#C98E62" cabelo="#0A1428" roupa="#FFFFFF" />
          </div>
          <div className="absolute left-3 top-8 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold text-white">
            <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 align-middle" />
            Validação ao vivo
          </div>
          {/* controles */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
            <span className="h-9 w-9 rounded-full bg-white/15" />
            <span className="h-9 w-9 rounded-full bg-white/15" />
            <span className="grid h-9 w-12 place-items-center rounded-full bg-red-500">
              <span className="h-1 w-5 rounded bg-white" />
            </span>
          </div>
        </div>
      </div>

      {/* Certificado */}
      <div className="absolute bottom-[4%] right-0 w-[58%] rotate-[3deg] rounded-2xl bg-white p-4 text-ink shadow-lift md:p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-ink/50">Certificado digital</p>
            <p className="mt-1 font-display text-xl font-extrabold">e-CNPJ A1</p>
          </div>
          <svg viewBox="0 0 5 9" className="h-10 text-navy" shapeRendering="crispEdges" aria-hidden="true" fill="currentColor">
            {[[2, 0], [0, 2], [3, 3], [1, 4], [4, 5], [2, 6], [0, 7], [3, 8]].map(([x, y]) => (
              <rect key={`${x}${y}`} x={x} y={y} width=".8" height=".8" />
            ))}
          </svg>
        </div>
        <div className="mt-3 space-y-1.5">
          <span className="block h-2 w-full rounded bg-ink/10" />
          <span className="block h-2 w-4/5 rounded bg-ink/10" />
          <span className="block h-2 w-3/5 rounded bg-ink/10" />
        </div>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-xs font-bold">
          <Check className="h-3.5 w-3.5" /> Emitido
        </p>
      </div>

      {/* Pixels decorativos */}
      <svg viewBox="0 0 5 9" className="absolute -right-2 top-6 h-24 text-lime" shapeRendering="crispEdges" aria-hidden="true" fill="currentColor">
        {[[2, 0], [0, 2], [3, 3], [1, 4], [4, 5], [2, 6]].map(([x, y]) => (
          <rect key={`${x}${y}`} x={x} y={y} width=".8" height=".8" />
        ))}
      </svg>
    </div>
  );
}

/** Conversa ilustrativa mostrando como é o atendimento */
export function ConversaIlustracao() {
  const msgs: [boolean, string][] = [
    [false, 'Oi! Acabei de comprar o e-CNPJ pelo site.'],
    [true, 'Oi! Já recebemos seu pedido. Me manda uma foto do seu documento e do contrato social?'],
    [false, 'Enviado! Pode ser amanhã às 10h a chamada?'],
    [true, 'Agendado para amanhã às 10h. Te envio o link um pouco antes.'],
    [true, 'Certificado emitido e instalado no seu emissor de notas. Qualquer dúvida, é só chamar.'],
  ];
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-ink/10 bg-[#EFEAE2] shadow-lift" role="img" aria-label="Exemplo ilustrativo de conversa de atendimento pelo WhatsApp">
      <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white">
          <svg viewBox="0 0 5 9" className="h-6 text-navy" shapeRendering="crispEdges" aria-hidden="true" fill="currentColor">
            {[[2, 0], [0, 2], [3, 3], [1, 4], [4, 5], [2, 6], [0, 7], [3, 8]].map(([x, y]) => (
              <rect key={`${x}${y}`} x={x} y={y} width=".8" height=".8" />
            ))}
          </svg>
        </span>
        <div>
          <p className="font-semibold">Revolux Certificado Digital</p>
          <p className="text-xs text-white/60">online</p>
        </div>
      </div>
      <div className="space-y-2.5 p-4 text-[14px] leading-snug">
        {msgs.map(([nosso, t], i) => (
          <div key={i} className={`flex ${nosso ? 'justify-start' : 'justify-end'}`}>
            <p className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm ${nosso ? 'rounded-tl-sm bg-white text-ink' : 'rounded-tr-sm bg-[#D9FDD3] text-ink'}`}>{t}</p>
          </div>
        ))}
      </div>
      <p className="pb-4 text-center text-[11px] text-ink/45">Exemplo ilustrativo de atendimento</p>
    </div>
  );
}

/** Painel decorativo com a marca pixelada (Quem somos) */
export function PainelMarca({ anos }: { anos: number }) {
  const pontos = Array.from({ length: 64 }, (_, i) => i);
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-ink" role="img" aria-label="Padrão gráfico da marca Revolux">
      <div className="absolute inset-6 grid grid-cols-8 gap-2 opacity-90">
        {pontos.map((i) => {
          const aceso = [2, 9, 11, 19, 20, 26, 29, 34, 37, 41, 44, 50, 52, 59].includes(i);
          const lima = [11, 26, 44, 59].includes(i);
          return <span key={i} className={`rounded-[3px] ${aceso ? (lima ? 'bg-lime' : 'bg-white/80') : 'bg-white/[.04]'}`} />;
        })}
      </div>
      <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-5 text-ink">
        <p className="font-display text-4xl font-extrabold">+{anos} anos</p>
        <p className="text-sm text-ink/60">de experiência em certificação digital</p>
      </div>
    </div>
  );
}
