// ============================================================
//  CONFIGURAÇÕES DO SITE — altere aqui e o site inteiro acompanha.
//  Campos vazios ('') simplesmente não aparecem no site.
// ============================================================

export const SITE = {
  nome: 'Revolux Certificado Digital',
  nomeCurto: 'Revolux',
  // Defina NEXT_PUBLIC_SITE_URL no Vercel quando tiver domínio próprio (ex.: https://revoluxcertificados.com.br)
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://revolux-site.vercel.app').replace(/\/$/, ''),
  whatsapp: '553235328411', // só números, com 55 + DDD
  whatsappFormatado: '(32) 3532-8411',
  instagram: 'https://www.instagram.com/revolux_certificadodigital',
  instagramUser: '@revolux_certificadodigital',
  anosExperiencia: 9,
  descricao:
    'Certificado digital e-CPF, e-CNPJ, A1, A3 e Bird ID com emissão por videoconferência para todo o Brasil. Atendimento humano pelo WhatsApp, do pedido à instalação.',

  // ---- Confiança (preencha para aparecer no site) ----
  cnpj: '18.814.733/0001-25', // ex.: '12.345.678/0001-90'
  razaoSocial: '', // ex.: 'Revolux Certificação Digital LTDA'
  acParceira: '', // nome da Autoridade Certificadora parceira, ex.: 'AC Soluti'
  horario: 'Seg. a sex., 8h às 18h', // horário de atendimento

  // ---- Agenda externa (Cal.com, Calendly...) — OPCIONAL ----
  // O site já tem agenda própria (veja AGENDA abaixo). Só preencha se preferir usar outra.
  agendaUrl: '',

  // ---- Avaliações do Google ----
  // Link "Escrever uma avaliação" do Perfil da Empresa no Google (opcional)
  googleAvaliarUrl: '',
  // Link para ver as avaliações no Google (opcional)
  googleAvaliacoesUrl: '',
};

// Números reais (deixe 0 para esconder). Ex.: certificados: 3200, estados: 18
export const NUMEROS = {
  certificadosEmitidos: 0,
  estadosAtendidos: 0,
  notaGoogle: 0, // ex.: 4.9
  totalAvaliacoes: 0,
};

// Avaliações REAIS copiadas do Google (com autorização). Deixe vazio para esconder a seção.
export const AVALIACOES: { nome: string; cidade?: string; texto: string; nota: number }[] = [
  // { nome: 'Maria S.', cidade: 'Belo Horizonte/MG', texto: 'Atendimento excelente...', nota: 5 },
];

export function waLink(mensagem?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export function brl(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ---- Agenda de videochamadas (o cliente escolhe o horário depois de comprar) ----
// Os horários ocupados ou bloqueados no painel (/painel/agenda) não aparecem para o cliente.
export const AGENDA = {
  diasDaSemana: [1, 2, 3, 4, 5], // 0 = domingo, 1 = segunda ... 6 = sábado
  inicio: '08:00',
  fim: '18:00', // último horário começa antes disso
  duracaoMin: 30, // tamanho de cada horário
  pausas: [['12:00', '13:00']] as [string, string][], // almoço etc.
  antecedenciaHoras: 2, // não deixa marcar em cima da hora
  diasAFrente: 14, // até quantos dias à frente o cliente pode marcar
};
