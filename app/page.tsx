import {
  HeroSection,
  VantagensSection,
  CertificadosSection,
} from '@/components';

export default function Home() {
  return (
    <main className="bg-[#F2F5F9]">
      <HeroSection />
      <VantagensSection />
      <CertificadosSection />
    </main>
  );
}
