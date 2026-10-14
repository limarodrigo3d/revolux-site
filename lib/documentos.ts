// Documentos que o cliente deve separar antes da videoconferência.
// Ajuste conforme as exigências da sua Autoridade de Registro.

const PF = ['Documento oficial com foto (RG, CNH ou passaporte), dentro da validade', 'Celular com câmera e internet para a videochamada', 'E-mail e WhatsApp ativos'];

const PJ = [
  'Documento oficial com foto do responsável legal (RG, CNH ou passaporte)',
  'Contrato social e última alteração, ou CCMEI / Requerimento de Empresário',
  'Cartão CNPJ (nós podemos emitir para você)',
  'Celular com câmera e internet para a videochamada',
];

export function documentosDoProduto(produtoId: string): string[] {
  if (/^(ecnpj|nfe|birdidpj)/.test(produtoId)) return PJ;
  return PF;
}
