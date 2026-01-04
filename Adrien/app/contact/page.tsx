import ContactForm from "../../src/components/contact_form";
import Footer from "../../src/components/footer";
import Navbar from "../../src/components/navbar";
import CTASection from "../../src/components/realisations/cta_section";
import { Toaster } from 'react-hot-toast';

export default function ContactPage() {
  return (
    <main className="">
      
      <Navbar />
      <br />
      <br />
    <ContactForm />
    <CTASection />
    <Footer />
    </main>
  );
}       