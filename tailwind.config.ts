// tailwind.config.ts
// Conceito visual “Sem balcão”: o site usa a linguagem de um documento oficial
// (papel de segurança, guilhoché, campos de formulário, carimbo) para mostrar
// que a burocracia ficou para trás.
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Public Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Archivo Variable"', '"Arial Narrow"', 'sans-serif'],
        inter: ['"Public Sans Variable"', 'sans-serif'],
      },
      colors: {
        paper: '#EEF1F5', // papel de segurança (fundo)
        ink: '#14213D', // tinta (texto e áreas escuras)
        navy: { DEFAULT: '#2F4870', 600: '#253A5C', 50: '#E3E8F1' }, // azul da logo
        carimbo: { DEFAULT: '#2B3BE0', 600: '#1F2DC4', 300: '#A9B1FF', 50: '#E8EAFF' }, // tinta de carimbo: ações principais
        selo: { DEFAULT: '#0E8A72', 50: '#DDF3EE' }, // verde de “válido”
        wa: { DEFAULT: '#25D366', 600: '#1EBE5A' }, // WhatsApp
        // nomes antigos mantidos para compatibilidade
        lime: { DEFAULT: '#2B3BE0', 600: '#1F2DC4' },
        primary: '#2F4870',
        logoBlue: '#2F4870',
        gold: '#D4AF37',
        dark: '#14213D',
      },
      boxShadow: {
        card: '0 1px 0 rgba(20,33,61,.06), 0 10px 30px -18px rgba(20,33,61,.35)',
        lift: '0 2px 0 rgba(20,33,61,.05), 0 30px 60px -30px rgba(20,33,61,.45)',
      },
      keyframes: {
        carimbar: {
          '0%': { opacity: '0', transform: 'rotate(-14deg) scale(1.9)' },
          '60%': { opacity: '1', transform: 'rotate(-10deg) scale(.94)' },
          '100%': { opacity: '1', transform: 'rotate(-10deg) scale(1)' },
        },
        riscar: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        carimbar: 'carimbar .55s cubic-bezier(.2,.8,.2,1) .7s both',
        'fade-in': 'fade-in .4s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
