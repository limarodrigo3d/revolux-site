import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import SiteChrome from '@/components/SiteChrome';
import Analytics from '@/components/Analytics';
import { JsonLd } from '@/components/Blocos';
import { SITE } from '@/lib/site';
import { MENOR_PRECO } from '@/lib/catalogo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Certificado Digital por Videoconferência para todo o Brasil | Revolux',
    template: '%s | Revolux Certificado Digital',
  },
  description: SITE.descricao,
  keywords: [
    'certificado digital',
    'certificado digital online',
    'certificado digital por videoconferência',
    'e-CPF',
    'e-CNPJ',
    'certificado A1',
    'certificado A3',
    'Bird ID',
    'certificado digital MEI',
    'renovar certificado digital',
  ],
  applicationName: SITE.nome,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE.nome,
    title: 'Certificado digital sem sair de casa, para todo o Brasil',
    description: SITE.descricao,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Revolux Certificado Digital' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A1428',
  width: 'device-width',
  initialScale: 1,
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.nome,
  url: SITE.url,
  logo: `${SITE.url}/img/logo.png`,
  image: `${SITE.url}/og.png`,
  description: SITE.descricao,
  telephone: `+${SITE.whatsapp}`,
  areaServed: { '@type': 'Country', name: 'Brasil' },
  priceRange: `A partir de R$ ${MENOR_PRECO.toFixed(2).replace('.', ',')}`,
  sameAs: [SITE.instagram],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${SITE.whatsapp}`,
    contactType: 'customer service',
    areaServed: 'BR',
    availableLanguage: 'Portuguese',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <JsonLd data={orgJsonLd} />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Pular para o conteúdo
        </a>
        <SiteChrome>
          <Header />
        </SiteChrome>
        <main id="conteudo">{children}</main>
        <SiteChrome>
          <Footer />
          <WhatsappButton />
        </SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
