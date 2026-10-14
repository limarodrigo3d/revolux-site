// Envio de e-mail OPCIONAL via Resend (resend.com — plano grátis).
// Variáveis no Vercel:
//   RESEND_API_KEY   chave da conta Resend
//   EMAIL_REMETENTE  ex.: "Revolux <contato@seudominio.com.br>" (domínio verificado no Resend)
//   EMAIL_AVISOS     e-mail que recebe o aviso de cada venda (ex.: o e-mail da sua irmã)
// Sem essas variáveis, nada é enviado e o site segue normalmente.

export const emailAtivo = () => Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_REMETENTE);

export async function enviarEmail(para: string, assunto: string, html: string) {
  if (!emailAtivo() || !para) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.EMAIL_REMETENTE, to: [para], subject: assunto, html }),
    });
    return res.ok;
  } catch (e) {
    console.error('Falha ao enviar e-mail', e);
    return false;
  }
}

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
