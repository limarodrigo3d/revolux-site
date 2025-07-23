import { HeroSection, VantagensSection, CertificadosSection } from '@/components';

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <VantagensSection />
      <CertificadosSection />
    </div>
  );
}
