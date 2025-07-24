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

  useEffect(() => {
    const img = new Image();
    img.src = images[index];
    img.onload = () => setLoaded(true);
    img.onerror = () => {
      console.error(`Erro ao carregar imagem: ${images[index]}`);
      setLoaded(true);
    };
  }, [index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoaded(false);
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen pt-24 overflow-hidden">
      <AnimatePresence mode="wait">
        {loaded && (
          <motion.div
            key={`bg-${index}`}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
          >
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${images[index]})`,
                backgroundPosition: 'center center',
              }}
            >
              <div className="w-full h-full bg-black/50" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center z-10 text-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-6">
            A confiança que você busca,<br className="hidden md:block" />
            a segurança que você precisa.
          </h1>
          <a
            href="/contato"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg transition"
          >
            Fale com a Revolux
          </a>
        </div>
      </div>
    </section>
  );
}
