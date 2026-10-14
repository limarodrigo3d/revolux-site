'use client';

// Google Analytics 4 e Pixel da Meta. Só carregam se as variáveis estiverem no Vercel:
//   NEXT_PUBLIC_GA_ID          ex.: G-XXXXXXXXXX
//   NEXT_PUBLIC_META_PIXEL_ID  ex.: 123456789012345
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/track';

const GA = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function Analytics() {
  const pathname = usePathname();

  // Conta cliques em qualquer botão/link de WhatsApp do site
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href*="wa.me/"]');
      if (a) track('clique_whatsapp', { pagina: window.location.pathname });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Pixel: registra as trocas de página seguintes (a primeira já é registrada no carregamento)
  const primeira = useRef(true);
  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  if (pathname.startsWith('/painel')) return null;

  return (
    <>
      {GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}');`}
          </Script>
        </>
      )}
      {PIXEL && (
        <Script id="pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
