'use client';

import {
  HeroSection,
  VantagensSection,
  CertificadosSection,
  CustomButton,
} from '@/components';

export default function Home() {
  return (
    <main className="space-y-24 bg-white text-gray-800">
      <HeroSection />
      <VantagensSection />
      <CertificadosSection />

      <div className="text-center pb-24 animate-fade-in">
        <CustomButton href="/contato">
          Fale com a Revolux
        </CustomButton>
      </div>
    </main>
  );
}
