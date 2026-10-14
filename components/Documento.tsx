// Elementos gráficos de “documento oficial”: guilhoché, carimbo e o certificado do topo.

function rosa(n: number, R: number, a: number, fase: number, pontos = 260) {
  let d = '';
  for (let i = 0; i <= pontos; i++) {
    const t = (i / pontos) * Math.PI * 2;
    const r = R + a * Math.sin(n * t + fase);
    const x = (r * Math.cos(t)).toFixed(1);
    const y = (r * Math.sin(t)).toFixed(1);
    d += `${i ? 'L' : 'M'}${x} ${y}`;
  }
  return d + 'Z';
}

/** Roseta de guilhoché, como nas cédulas e certidões */
export function Guilhoche({ className = '', cor = 'currentColor', espessura = 0.35 }: { className?: string; cor?: string; espessura?: number }) {
  const camadas = [
    [24, 80, 9, 0],
    [24, 80, 9, Math.PI / 24],
    [18, 62, 7, 0],
    [18, 62, 7, Math.PI / 18],
    [30, 94, 5, 0],
  ];
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true" fill="none" stroke={cor} strokeWidth={espessura}>
      {camadas.map(([n, R, a, f], i) => (
        <path key={i} d={rosa(n, R, a, f)} />
      ))}
      <circle r="44" />
      <circle r="41" />
    </svg>
  );
}

/** Carimbo circular com texto em volta */
export function Carimbo({ className = '', texto = 'REVOLUX · CERTIFICADO DIGITAL · POR VIDEOCHAMADA · ', centro = 'EMITIDO' }: { className?: string; texto?: string; centro?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id="carimbo-circulo" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        <filter id="carimbo-textura">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.55" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <g fill="none" stroke="currentColor" filter="url(#carimbo-textura)">
        <circle cx="100" cy="100" r="94" strokeWidth="5" />
        <circle cx="100" cy="100" r="84" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="52" strokeWidth="1.5" />
        <text fill="currentColor" stroke="none" fontFamily="'Archivo Variable', sans-serif" fontSize="13" fontWeight="700">
          <textPath href="#carimbo-circulo" textLength="446" lengthAdjust="spacing">{texto}</textPath>
        </text>
        <text x="100" y="108" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="'Archivo Variable', sans-serif" fontSize="19" fontWeight="900" letterSpacing="0.5">
          {centro}
        </text>
      </g>
    </svg>
  );
}

/** O “certificado” do topo da página, com campos e o carimbo que bate ao carregar */
export function CertificadoDoc() {
  const campos: [string, string][] = [
    ['Titular', 'Você'],
    ['Modelo', 'e-CNPJ A1'],
    ['Validação', 'Por videochamada'],
    ['Local', 'Na sua casa'],
    ['Fila', 'Nenhuma'],
    ['Válido até', 'Daqui a 12 meses'],
  ];
  return (
    <div className="relative mx-auto w-full max-w-[460px]" role="img" aria-label="Ilustração de um certificado digital emitido por videochamada, com carimbo de emitido">
      <div className="relative rotate-[1.5deg] overflow-hidden rounded-[6px] bg-white p-6 shadow-lift sm:p-8">
        <Guilhoche className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 text-selo/25" />
        <Guilhoche className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 text-navy/15" />

        <div className="relative flex items-start justify-between gap-4 border-b-[1.5px] border-ink pb-4">
          <div>
            <p className="font-display text-[13px] font-semibold text-ink/60" style={{ fontStretch: '90%' }}>
              Padrão ICP-Brasil
            </p>
            <p className="mt-1 font-display text-[26px] font-extrabold leading-none" style={{ fontStretch: '115%' }}>
              Certificado digital
            </p>
          </div>
          <svg viewBox="0 0 5 9" className="h-12 shrink-0 text-navy" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
            {[[2, 0], [0, 2], [3, 3], [1, 4], [4, 5], [2, 6], [0, 7], [3, 8]].map(([x, y]) => (
              <rect key={`${x}${y}`} x={x} y={y} width=".8" height=".8" />
            ))}
          </svg>
        </div>

        <dl className="relative mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
          {campos.map(([k, v]) => (
            <div key={k} className="border-b border-dashed border-ink/20 pb-1.5">
              <dt className="campo">{k}</dt>
              <dd className="font-display text-[17px] font-semibold leading-tight" style={{ fontStretch: '100%' }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-7 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <svg viewBox="0 0 160 40" className="h-9 text-ink/80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M4 30c10-18 18-22 20-12s-6 14-2 6 12-16 16-8-4 12 2 6 10-10 14-4 6 6 12 0 8-8 14-2 10 4 18 2 14-6 22-4 14 2 26 0" />
            </svg>
            <p className="campo border-t border-ink/30 pt-1">Assinatura digital</p>
          </div>
          <p className="truncate font-display text-[9px] text-ink/40" style={{ fontStretch: '75%' }}>
            SHA-256 · 9F3A 21C7 E0B4 5D18 A6F2 0C9E 77B1 3D40
          </p>
        </div>
      </div>

      <Carimbo className="absolute -bottom-12 right-2 h-40 w-40 animate-carimbar text-carimbo sm:-right-6 sm:h-52 sm:w-52" />
    </div>
  );
}
