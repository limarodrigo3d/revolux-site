/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} 
                https://gc.kis.v2.scr.kaspersky-labs.com 
                https://2checkout.com 
                https://*.2checkout.com 
                https://secure.2checkout.com
                https://js.stripe.com
                https://checkout.stripe.com;
              style-src 'self' 'unsafe-inline' 
                https://fonts.googleapis.com
                https://2checkout.com
                https://*.2checkout.com;
              font-src 'self' 
                https://fonts.gstatic.com 
                https://2checkout.com 
                https://*.2checkout.com 
                data:;
              img-src 'self' data: blob: 
                https://2checkout.com 
                https://*.2checkout.com;
              connect-src 'self' 
                https://gc.kis.v2.scr.kaspersky-labs.com
                https://2checkout.com
                https://*.2checkout.com
                https://secure.2checkout.com
                https://api.stripe.com
                https://checkout.stripe.com;
              frame-src 'self'
                https://2checkout.com
                https://*.2checkout.com
                https://secure.2checkout.com
                https://js.stripe.com
                https://checkout.stripe.com;
              object-src 'none';
              frame-ancestors 'none';
              base-uri 'self';
            `.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Mudei de DENY para SAMEORIGIN para permitir iframes de pagamento
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;