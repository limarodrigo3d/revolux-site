// Envia eventos para o Google Analytics 4 e o Pixel da Meta (se estiverem configurados).
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const META: Record<string, string> = {
  begin_checkout: 'InitiateCheckout',
  purchase: 'Purchase',
  clique_whatsapp: 'Contact',
  quiz_resultado: 'Lead',
};

export function track(evento: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', evento, { currency: 'BRL', ...params });
    const m = META[evento];
    if (m) window.fbq?.('track', m, { currency: 'BRL', ...params });
  } catch {}
}
