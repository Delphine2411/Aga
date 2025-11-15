import HeroSection from "@/src/components/hero_section";
import Footer from "../../src/components/footer";
import Navbar from "../../src/components/navbar";
import CTASection from "../../src/components/realisations/cta_section";
import Service from "../../src/components/services_section";


export default function Services() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <br />
      <HeroSection />
      <Service />
      <CTASection />
      <Footer />
    </main>
  );
}