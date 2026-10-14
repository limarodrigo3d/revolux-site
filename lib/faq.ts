export type Pergunta = { id?: string; p: string; r: string };

export const FAQ: Pergunta[] = [
  {
    id: 'videoconferencia',
    p: 'Consigo emitir meu certificado sem sair de casa?',
    r: 'Sim. A validação da sua identidade é feita por videoconferência, pelo celular ou computador, de qualquer cidade do Brasil. Você só precisa de um documento com foto e de uma conexão de internet.',
  },
  {
    id: 'documentos',
    p: 'Quais documentos eu preciso?',
    r: 'Para e-CPF: documento oficial com foto (RG, CNH ou passaporte). Para e-CNPJ: os documentos do responsável legal e os documentos da empresa (contrato social ou requerimento de empresário/CCMEI). Antes da videoconferência, conferimos tudo com você pelo WhatsApp.',
  },
  {
    id: 'a1-ou-a3',
    p: 'Qual a diferença entre A1 e A3?',
    r: 'O A1 é um arquivo instalado no computador, com validade de 12 meses, e é o mais prático para emitir notas fiscais. O A3 fica guardado em um token USB ou cartão com leitora, que você leva para qualquer computador. Se tiver dúvida, chame no WhatsApp que indicamos o ideal para o seu uso.',
  },
  {
    id: 'bird-id',
    p: 'O que é o Bird ID (certificado em nuvem)?',
    r: 'É um certificado digital guardado na nuvem. Você assina e autentica pelo celular, sem token e sem instalar nada no computador. É muito usado por médicos para receitas digitais e por quem trabalha em vários computadores.',
  },
  {
    id: 'prazo',
    p: 'Quanto tempo demora para ficar pronto?',
    r: 'Depois do pagamento, agendamos a videoconferência no horário que for melhor para você. Com os documentos em ordem, o certificado é emitido logo após a validação.',
  },
  {
    id: 'instalacao',
    p: 'Como instalo o certificado A1?',
    r: 'Depois da emissão você recebe as instruções para baixar o arquivo do certificado. Se preferir, fazemos a instalação junto com você pelo WhatsApp ou por acesso remoto, e já testamos no sistema que você usa (emissor de nota, e-CAC, PJe etc.).',
  },
  {
    id: 'usos',
    p: 'Para que serve um certificado digital?',
    r: 'Para assinar documentos com validade jurídica e acessar sistemas do governo com segurança: e-CAC, Imposto de Renda, emissão de NF-e e CT-e, eSocial, SPED, PJe, Conectividade Social, receitas médicas digitais, gov.br e muito mais.',
  },
  {
    id: 'pagamento',
    p: 'Quais as formas de pagamento?',
    r: 'Pix e cartão de crédito (Visa, Mastercard, Elo, Hipercard, American Express e Diners), processados com segurança pelo Mercado Pago.',
  },
  {
    id: 'renovacao',
    p: 'Meu certificado venceu. E agora?',
    r: 'Basta comprar um novo e fazer a validação. Se o seu certificado ainda está dentro da validade, em alguns casos é possível renovar de forma ainda mais simples. Chame no WhatsApp que verificamos o seu caso.',
  },
];
