// Guarda os dados do pedido no navegador do cliente para montar
// a mensagem do WhatsApp depois do pagamento (página /obrigado).

export type Pedido = {
  pedido: string;
  produtoId: string;
  produto: string;
  preco: number;
  nome: string;
  email: string;
  documento: string;
  telefone: string;
  cidade: string;
  criadoEm: number;
};

const CHAVE = 'revolux_pedido';

export function salvarPedido(p: Pedido) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(p));
  } catch {}
}

export function lerPedido(): Pedido | null {
  try {
    const raw = localStorage.getItem(CHAVE);
    return raw ? (JSON.parse(raw) as Pedido) : null;
  } catch {
    return null;
  }
}

export function mensagemPedido(p: Pedido, status: string) {
  return [
    `Olá! ${status}`,
    '',
    `*Pedido:* ${p.pedido}`,
    `*Certificado:* ${p.produto}`,
    `*Nome:* ${p.nome}`,
    `*${p.documento.replace(/\D/g, '').length > 11 ? 'CNPJ' : 'CPF'}:* ${p.documento}`,
    `*WhatsApp:* ${p.telefone}`,
    `*E-mail:* ${p.email}`,
    `*Cidade/UF:* ${p.cidade}`,
    '',
    'Quero agendar a minha videoconferência.',
  ].join('\n');
}

export const mascaraCPF = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

export const mascaraCNPJ = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');

export const mascaraTelefone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 10) return d.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  return d.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
};
