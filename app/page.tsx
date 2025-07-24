'use client';

import {
  HeroSection,
  VantagensSection,
  CertificadosSection,
  CustomButton,
} from '@/components';

export default function Home() {
  return (
    <main className="space-y-16">
      <HeroSection />
      <VantagensSection />
      <CertificadosSection />

      <div className="text-center">
        <CustomButton href="/contato">
          Fale com a Revolux
        </CustomButton>
      </div>
    </main>
  );
}
