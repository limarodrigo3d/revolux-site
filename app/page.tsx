import HeroSection from '@/components/ui/HeroSection';
import VantagensSection from '@/components/ui/VantagensSection';
import CertificadosSection from '@/components/ui/CertificadosSection';

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <VantagensSection />
      <CertificadosSection />
    </div>
  );
}
