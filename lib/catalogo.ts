// Catálogo único de certificados.
// IMPORTANTE: o servidor (app/api/pagamento) usa ESTES preços para cobrar.
// Para mudar um preço, altere somente aqui.

export type Produto = {
  id: string;
  nome: string;
  midia: string; // como o certificado é guardado
  preco: number;
  precoOriginal?: number;
  destaque?: boolean;
  validadeMeses?: number; // usado no painel para calcular o vencimento
  itens: string[];
};

export type Categoria = {
  slug: string;
  nome: string;
  tag: string;
  seoTitulo: string;
  seoDescricao: string;
  titulo: string;
  resumo: string;
  paraQuem: string[];
  usos: string[];
  produtos: Produto[];
};

export const CATEGORIAS: Categoria[] = [
  {
    slug: 'e-cpf',
    nome: 'e-CPF',
    tag: 'Pessoa física',
    seoTitulo: 'Certificado Digital e-CPF A1 e A3 por Videoconferência',
    seoDescricao:
      'Compre seu certificado digital e-CPF A1 ou A3 com emissão por videoconferência, de qualquer lugar do Brasil. A partir de R$ 149,90 e com atendimento humano.',
    titulo: 'Certificado e-CPF',
    resumo:
      'Sua identidade digital com validade jurídica. Assine documentos, acesse o e-CAC, declare o Imposto de Renda e entre no gov.br sem sair de casa.',
    paraQuem: [
      'Profissionais liberais e autônomos',
      'Médicos, dentistas e psicólogos (receita e prontuário digital)',
      'Advogados (PJe e processos eletrônicos)',
      'Produtor rural e quem precisa do e-CAC',
    ],
    usos: ['Imposto de Renda e e-CAC', 'Assinatura de contratos e PDFs', 'PJe e tribunais', 'gov.br nível ouro'],
    produtos: [
      {
        id: 'ecpf-a1',
        validadeMeses: 12,
        nome: 'e-CPF A1',
        midia: 'Arquivo no computador',
        preco: 149.9,
        precoOriginal: 189.9,
        destaque: true,
        itens: ['Validade de 12 meses', 'Instalado no seu computador', 'Emissão por videoconferência', 'Ajuda na instalação'],
      },
      {
        id: 'ecpf-cartao',
        nome: 'e-CPF A3',
        midia: 'Cartão + leitora',
        preco: 239.9,
        precoOriginal: 269.9,
        itens: ['Leitora inclusa', 'Leve para qualquer computador', 'Emissão por videoconferência', 'Ajuda na instalação'],
      },
      {
        id: 'ecpf-token',
        nome: 'e-CPF A3',
        midia: 'Token USB',
        preco: 299.9,
        precoOriginal: 329.9,
        itens: ['Token USB incluso', 'Leve para qualquer computador', 'Emissão por videoconferência', 'Ajuda na instalação'],
      },
    ],
  },
  {
    slug: 'e-cnpj',
    nome: 'e-CNPJ',
    tag: 'Empresas e MEI',
    seoTitulo: 'Certificado Digital e-CNPJ A1 e A3 para Empresas e MEI',
    seoDescricao:
      'Certificado digital e-CNPJ A1 e A3 para empresas e MEI, com emissão por videoconferência em todo o Brasil. Emita NF-e, acesse o e-CAC e envie o eSocial.',
    titulo: 'Certificado e-CNPJ',
    resumo:
      'O certificado da sua empresa para emitir notas fiscais, enviar eSocial e acessar a Receita Federal com segurança. Serve para empresas de todos os portes e para MEI.',
    paraQuem: ['MEI, ME e EPP', 'Empresas do Simples, Lucro Presumido e Real', 'Escritórios de contabilidade', 'Lojas e e-commerces'],
    usos: ['Emissão de NF-e e NFC-e', 'eSocial, DCTFWeb e SPED', 'e-CAC da empresa', 'Conectividade Social (FGTS)'],
    produtos: [
      {
        id: 'ecnpj-a1',
        validadeMeses: 12,
        nome: 'e-CNPJ A1',
        midia: 'Arquivo no computador',
        preco: 169.9,
        destaque: true,
        itens: ['Validade de 12 meses', 'Ideal para emissor de nota', 'Emissão por videoconferência', 'Ajuda na instalação'],
      },
      {
        id: 'ecnpj-cartao',
        nome: 'e-CNPJ A3',
        midia: 'Cartão + leitora',
        preco: 279.9,
        itens: ['Leitora inclusa', 'Leve para qualquer computador', 'Emissão por videoconferência', 'Ajuda na instalação'],
      },
      {
        id: 'ecnpj-token',
        nome: 'e-CNPJ A3',
        midia: 'Token USB',
        preco: 329.9,
        itens: ['Token USB incluso', 'Leve para qualquer computador', 'Emissão por videoconferência', 'Ajuda na instalação'],
      },
    ],
  },
  {
    slug: 'nfe-cte',
    nome: 'NF-e / CT-e',
    tag: 'Notas e transporte',
    seoTitulo: 'Certificado Digital NF-e e CT-e para Emitir Notas Fiscais',
    seoDescricao:
      'Certificado digital para emissão de NF-e e CT-e, ideal para lojas, indústrias e transportadoras. Emissão por videoconferência para todo o Brasil.',
    titulo: 'Certificado NF-e / CT-e',
    resumo:
      'Feito para quem precisa emitir Nota Fiscal Eletrônica e Conhecimento de Transporte sem dor de cabeça, direto no seu sistema emissor.',
    paraQuem: ['Transportadoras e caminhoneiros', 'Indústrias e distribuidoras', 'Lojas que emitem nota todos os dias'],
    usos: ['Emissão de NF-e', 'Emissão de CT-e e MDF-e', 'Integração com seu ERP'],
    produtos: [
      {
        id: 'nfe-pj',
        validadeMeses: 12,
        nome: 'NF-e / CT-e A1',
        midia: 'Arquivo no computador',
        preco: 199.9,
        destaque: true,
        itens: ['Para pessoa jurídica', 'Instala no seu emissor', 'Emissão por videoconferência', 'Ajuda na instalação'],
      },
      {
        id: 'nfe-a3',
        nome: 'NF-e A3',
        midia: 'Token USB',
        preco: 299.9,
        itens: ['Token USB incluso', 'Leve para qualquer computador', 'Emissão por videoconferência', 'Ajuda na instalação'],
      },
    ],
  },
  {
    slug: 'bird-id-pf',
    nome: 'Bird ID PF',
    tag: 'Na nuvem · pessoa física',
    seoTitulo: 'Bird ID Pessoa Física: Certificado Digital em Nuvem',
    seoDescricao:
      'Bird ID PF é o certificado digital em nuvem: assine pelo celular, sem token e sem instalar nada. Emissão online para todo o Brasil.',
    titulo: 'Bird ID Pessoa Física',
    resumo:
      'Seu certificado digital fica na nuvem e vai junto no celular. Você assina documentos de qualquer lugar, sem token, cartão ou instalação.',
    paraQuem: ['Quem trabalha em vários computadores', 'Profissionais da saúde (receita digital)', 'Quem quer praticidade total'],
    usos: ['Assinatura pelo celular', 'Receitas e atestados digitais', 'Acesso a sistemas do governo'],
    produtos: [
      {
        id: 'birdidpf',
        nome: 'Bird ID PF',
        midia: 'Nuvem (celular)',
        preco: 169.9,
        destaque: true,
        itens: ['Sem token e sem instalação', 'Use no celular e no computador', 'Emissão 100% online', 'Ajuda na ativação'],
      },
    ],
  },
  {
    slug: 'bird-id-pj',
    nome: 'Bird ID PJ',
    tag: 'Na nuvem · empresas',
    seoTitulo: 'Bird ID Pessoa Jurídica: Certificado Digital em Nuvem para Empresas',
    seoDescricao:
      'Bird ID PJ é o certificado digital em nuvem para empresas: assinatura pelo celular, sem token. Emissão online para todo o Brasil.',
    titulo: 'Bird ID Pessoa Jurídica',
    resumo:
      'O certificado da sua empresa na nuvem. Assine e autentique pelo celular, de qualquer lugar, sem depender de token ou de um computador específico.',
    paraQuem: ['Empresas com sócios em cidades diferentes', 'Quem trabalha remoto', 'Escritórios que assinam muitos documentos'],
    usos: ['Assinatura de contratos', 'Acesso a sistemas da empresa', 'Autenticação pelo celular'],
    produtos: [
      {
        id: 'birdidpj',
        nome: 'Bird ID PJ',
        midia: 'Nuvem (celular)',
        preco: 189.9,
        destaque: true,
        itens: ['Sem token e sem instalação', 'Use no celular e no computador', 'Emissão 100% online', 'Ajuda na ativação'],
      },
    ],
  },
];

export const PRODUTOS: Produto[] = CATEGORIAS.flatMap((c) => c.produtos);

export function getCategoria(slug: string) {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function getProduto(id: string) {
  return PRODUTOS.find((p) => p.id === id);
}

export function categoriaDoProduto(id: string) {
  return CATEGORIAS.find((c) => c.produtos.some((p) => p.id === id));
}

export function nomeCompleto(p: Produto) {
  return `${p.nome} (${p.midia})`;
}

export const MENOR_PRECO = Math.min(...PRODUTOS.map((p) => p.preco));
