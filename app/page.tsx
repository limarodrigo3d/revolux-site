'use client';

import {
  HeroSection,
  VantagensSection,
  CertificadosSection,
  CustomButton,
} from '@/components';

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <VantagensSection />
      <CertificadosSection />

      {/* Exemplo de uso do botão personalizado */}
      <div className="text-center">
        <CustomButton href="/contato">
          Fale com a Revolux
        </CustomButton>
      </div>
    </div>
  );
}
