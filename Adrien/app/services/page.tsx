import HeroSection from "@/src/components/hero_section";
import Footer from "../../src/components/footer";
import Navbar from "../../src/components/navbar";
import CTASection from "../../src/components/realisations/cta_section";
import Service from "../../src/components/services_section";
import EngagementsSection from "@/src/components/engagements";
import Realisations from "@/src/components/realisation";


export default function Services() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <br />
      <HeroSection />
      <EngagementsSection />
      <Realisations />
      <CTASection />
      <Footer />
    </main>
  );
}