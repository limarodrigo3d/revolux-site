"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const images = ["/mulher-1.jpg", "/mulher-2.jpg", "/mulher-3.jpg"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Carrossel de imagens de fundo */}
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Fundo ${index + 1}`}
          fill
          priority={index === 0}
          className={`object-cover object-center absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Sobreposição escura */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-20" />

      {/* Conteúdo centralizado com animação */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white px-6"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
          Certificado Digital com{" "}
          <span className="text-[#D4AF37]">Excelência e Confiança</span>
        </h1>

        <p className="mt-6 text-base md:text-lg max-w-xl">
          Na{" "}
          <strong className="text-white font-semibold">Revolux</strong>, você
          emite seu certificado com agilidade, suporte premium e validação
          jurídica total — 100% online e personalizado.
        </p>

        <Link href="/certificados">
          <button className="mt-8 bg-[#D4AF37] hover:bg-[#c49e2c] text-[#0A0A23] font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Solicitar meu certificado
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
