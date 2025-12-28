
import Navbar from '../../src/components/navbar';
import Hero from '../../src/components/hero';
import Service from '../../src/components/services_section';
import SkillsSection from '../../src/components/skills-section';
import Footer from '../../src/components/footer';
import CTASection from '../../src/components/realisations/cta_section';
import MissionValuesSection from '@/src/components/mission_values_section';
import TestimonialsSection from '@/src/components/realisations/testimonials_section';


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      
      <Navbar />
      <br />
      <br />
      <Hero />
      <Service />
      <MissionValuesSection />
      <div className="bg-dark text-white">
      <SkillsSection />
    </div>
    <CTASection />
    <TestimonialsSection />
    <Footer />
    </main>
  );
}
