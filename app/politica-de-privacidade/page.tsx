import type { Metadata } from 'next';
import { TopoPagina } from '@/components/Blocos';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Saiba como a Revolux Certificado Digital coleta, usa e protege os seus dados pessoais, de acordo com a LGPD.',
  alternates: { canonical: '/politica-de-privacidade' },
};

// Modelo de política baseado na LGPD (Lei 13.709/2018). Recomenda-se revisão por um profissional
// e a inclusão da razão social e do CNPJ da empresa no item 1.
export default function PoliticaPage() {
  const secoes: [string, string[]][] = [
    [
      '1. Quem somos',
      [
        `A ${SITE.nome} ("Revolux", "nós") é responsável pelo tratamento dos dados pessoais coletados neste site. Para falar conosco sobre seus dados, use o WhatsApp ${SITE.whatsappFormatado}.`,
      ],
    ],
    [
      '2. Quais dados coletamos',
      [
        'Dados que você informa ao comprar ou falar conosco: nome, CPF ou CNPJ, e-mail, telefone/WhatsApp e cidade.',
        'Para a emissão do certificado digital, a Autoridade de Registro coleta documentos de identificação, imagem e dados biométricos durante a videoconferência, conforme as normas da ICP-Brasil.',
        'Dados de pagamento são processados diretamente pelo Mercado Pago. Não temos acesso nem armazenamos os dados do seu cartão.',
      ],
    ],
    [
      '3. Para que usamos',
      [
        'Emitir, instalar e dar suporte ao seu certificado digital.',
        'Processar o pagamento e emitir comprovantes.',
        'Entrar em contato sobre o seu pedido e avisar sobre o vencimento do certificado.',
        'Cumprir obrigações legais e regulatórias, incluindo as exigências da ICP-Brasil.',
      ],
    ],
    [
      '4. Com quem compartilhamos',
      [
        'Com a Autoridade Certificadora e a Autoridade de Registro responsáveis pela emissão, com o Mercado Pago (pagamento) e com autoridades públicas quando exigido por lei. Não vendemos seus dados.',
      ],
    ],
    [
      '5. Por quanto tempo guardamos',
      ['Pelo tempo necessário para prestar o serviço e cumprir os prazos de guarda exigidos pela legislação e pelas normas da ICP-Brasil.'],
    ],
    [
      '6. Seus direitos',
      [
        'Você pode pedir a confirmação do tratamento, o acesso, a correção, a portabilidade ou a eliminação dos seus dados, além de revogar consentimentos, nos termos do art. 18 da LGPD. Basta nos chamar pelo WhatsApp.',
      ],
    ],
    [
      '7. Segurança',
      ['Usamos conexão criptografada (HTTPS) e acesso restrito às informações. Pagamentos são feitos em ambiente seguro do Mercado Pago.'],
    ],
    ['8. Alterações', ['Esta política pode ser atualizada. A versão vigente estará sempre nesta página.']],
  ];

  return (
    <>
      <TopoPagina eyebrow="LGPD" titulo="Política de Privacidade" sub="Como coletamos, usamos e protegemos os seus dados pessoais." />
      <section className="py-14 md:py-20">
        <div className="container-x max-w-3xl space-y-10">
          {secoes.map(([t, ps]) => (
            <div key={t}>
              <h2 className="text-xl font-bold">{t}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-ink/75">
                {ps.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
