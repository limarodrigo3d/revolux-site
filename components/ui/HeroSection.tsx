'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/mulher-1.jpg',
  '/mulher-2.jpg',
  '/mulher-3.jpg',
  '/mulher-4.jpg',
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Pré-carrega a imagem atual
  useEffect(() => {
    const img = new Image();
    img.src = images[index];
    img.onload = () => setLoaded(true);
    img.onerror = () => {
      console.error(`Erro ao carregar imagem: ${images[index]}`);
      setLoaded(true);
    };
  }, [index]);

  // Troca a imagem a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setLoaded(false);
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] pt-24 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {loaded && (
          <motion.div
            key={`bg-${index}`}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2, scale: 0.98 }}
            transition={{ duration: 1 }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${images[index]})`,
              }}
              role="img"
              aria-label="Mulher representando confiança"
            >
              <div className="w-full h-full bg-gradient-to-b from-black/60 to-black/80" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center z-10 px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-8 leading-tight">
            Certificação digital com atendimento humano,<br className="hidden md:inline" />
            seguro e sem complicações.
          </h1>
          <a
            href="/contato"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Solicitar Certificado
          </a>
        </div>
      </div>
    </section>
  );
}
