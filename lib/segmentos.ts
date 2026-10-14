// Páginas por público (ajudam o Google a mostrar o site para quem procura algo específico)

export type Segmento = {
  slug: string;
  menu: string;
  seoTitulo: string;
  seoDescricao: string;
  titulo: string;
  sub: string;
  usos: string[];
  recomendados: string[]; // ids de produto em lib/catalogo.ts
  ctaWhats: string;
};

export const SEGMENTOS: Segmento[] = [
  {
    slug: 'mei',
    menu: 'MEI',
    seoTitulo: 'Certificado Digital para MEI: e-CNPJ por Videoconferência',
    seoDescricao:
      'Certificado digital para MEI emitir nota fiscal e acessar o e-CAC. e-CNPJ A1 a partir de R$ 169,90, com emissão por videoconferência em todo o Brasil.',
    titulo: 'Certificado digital para MEI',
    sub: 'Emita nota fiscal, acesse a Receita e resolva tudo da sua empresa sem sair de casa. A gente te guia em cada passo.',
    usos: ['Emitir NF-e de produto e serviço', 'Acessar o e-CAC do CNPJ', 'Assinar contratos com clientes', 'Cadastro em marketplaces e prefeituras'],
    recomendados: ['ecnpj-a1', 'ecnpj-token'],
    ctaWhats: 'Olá! Sou MEI e preciso de um certificado digital. Pode me ajudar?',
  },
  {
    slug: 'contadores',
    menu: 'Contadores',
    seoTitulo: 'Certificado Digital para Contadores e Escritórios de Contabilidade',
    seoDescricao:
      'Certificados e-CPF e e-CNPJ para os clientes do seu escritório, emitidos por videoconferência em todo o Brasil. Atendimento rápido e humano pelo WhatsApp.',
    titulo: 'Para escritórios de contabilidade',
    sub: 'Seus clientes de qualquer cidade emitem o certificado por videoconferência, e você para de correr atrás de agenda presencial. Atendimento direto pelo WhatsApp.',
    usos: ['e-CNPJ dos clientes para NF-e, eSocial e SPED', 'e-CPF para procurações e e-CAC', 'Aviso antes do vencimento', 'Suporte na instalação para o cliente'],
    recomendados: ['ecnpj-a1', 'ecpf-a1'],
    ctaWhats: 'Olá! Sou contador(a) e quero conversar sobre certificados para os clientes do meu escritório.',
  },
  {
    slug: 'saude',
    menu: 'Médicos e saúde',
    seoTitulo: 'Certificado Digital para Médicos: Receita e Atestado Digital',
    seoDescricao:
      'Certificado digital para médicos, dentistas e psicólogos assinarem receitas, atestados e prontuários. e-CPF ou Bird ID em nuvem, emissão para todo o Brasil.',
    titulo: 'Certificado digital para médicos e profissionais da saúde',
    sub: 'Assine receitas, atestados e prontuários com validade jurídica. Com o Bird ID, você assina direto pelo celular, no consultório ou na telemedicina.',
    usos: ['Receita e atestado digital', 'Prontuário eletrônico', 'Telemedicina', 'Acesso ao e-CAC e gov.br'],
    recomendados: ['birdidpf', 'ecpf-a1'],
    ctaWhats: 'Olá! Sou profissional da saúde e preciso de certificado digital para assinar receitas.',
  },
  {
    slug: 'advogados',
    menu: 'Advogados',
    seoTitulo: 'Certificado Digital para Advogados: PJe e Processos Eletrônicos',
    seoDescricao:
      'Certificado digital e-CPF A3 para advogados peticionarem no PJe, e-SAJ, Projudi e demais tribunais. Emissão por videoconferência para todo o Brasil.',
    titulo: 'Certificado digital para advogados',
    sub: 'Peticione no PJe, e-SAJ, Projudi e nos sistemas dos tribunais com segurança. Ajudamos na instalação para você não perder prazo.',
    usos: ['PJe, e-SAJ, Projudi e eproc', 'Assinatura de petições e contratos', 'Acesso ao e-CAC', 'Procurações eletrônicas'],
    recomendados: ['ecpf-token', 'ecpf-cartao'],
    ctaWhats: 'Olá! Sou advogado(a) e preciso de certificado digital para o PJe.',
  },
  {
    slug: 'transportadores',
    menu: 'Transportadores',
    seoTitulo: 'Certificado Digital para Transportadoras e Caminhoneiros (CT-e e MDF-e)',
    seoDescricao:
      'Certificado digital para emitir CT-e e MDF-e. Ideal para transportadoras e caminhoneiros, com emissão por videoconferência de qualquer lugar do Brasil.',
    titulo: 'Certificado digital para transportadores',
    sub: 'Emita CT-e e MDF-e sem parar a operação. Você faz a validação por videoconferência, de onde estiver.',
    usos: ['Emissão de CT-e', 'Emissão de MDF-e', 'NF-e de serviço de transporte', 'Integração com o seu emissor'],
    recomendados: ['nfe-pj', 'nfe-a3'],
    ctaWhats: 'Olá! Trabalho com transporte e preciso de certificado para emitir CT-e/MDF-e.',
  },
];

export function getSegmento(slug: string) {
  return SEGMENTOS.find((s) => s.slug === slug);
}
