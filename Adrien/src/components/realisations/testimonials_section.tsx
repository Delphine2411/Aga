"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context";

const translations = {
  fr: {
    title1: "Ce qu'ils",
    title: "disent",
    testimonials: [
      {
        name: "Dr. Jean-Baptiste Koffi",
        role: "Directeur R&D, AgroCoton",
        text: "L'expertise d'Adrien en développement de produits nutritionnels a été déterminante pour notre dernière gamme. Sa vision stratégique est un atout rare.",
        rating: 5,
      },
      {
        name: "Marie-Louise Akpovi",
        role: "Fondatrice, BioSain Bénin",
        text: "Une collaboration exceptionnelle. Ses conseils en assistance technique nous ont permis d'optimiser nos processus de production de 30%.",
        rating: 5,
      },
      {
        name: "Thomas Durand",
        role: "Consultant International, FAO",
        text: "Professionnel, rigoureux et doté d'une excellente compréhension des enjeux nutritionnels en Afrique de l'Ouest. Je recommande vivement.",
        rating: 5,
      },
      {
        name: "Sophie Mensah",
        role: "Responsable Qualité, NutriGroup",
        text: "L'approche d'Adrien allie parfaitement rigueur scientifique et pragmatisme commercial. Un partenaire de confiance pour tout projet agro-industriel.",
        rating: 5,
      },
      {
        name: "Marc Ouédraogo",
        role: "Investisseur, Sahel Ventures",
        text: "Son analyse du marché nutritionnel est d'une précision chirurgicale. Il sait transformer des défis techniques en opportunités de business.",
        rating: 5,
      },
      {
        name: "Lucie Zoma",
        role: "Coordinatrice de Projet, ONG SantéPlus",
        text: "Efficace et passionné. Adrien a su mobiliser les acteurs clés pour la réussite de notre programme de fortification alimentaire.",
        rating: 5,
      },
    ],
  },
  en: {
    title1: "What they",
    title: "say",
    testimonials: [
      {
        name: "Dr. Jean-Baptiste Koffi",
        role: "R&D Director, AgroCoton",
        text: "Adrien's expertise in nutritional product development was instrumental for our latest range. His strategic vision is a rare asset.",
        rating: 5,
      },
      {
        name: "Marie-Louise Akpovi",
        role: "Founder, BioSain Benin",
        text: "An exceptional collaboration. His technical assistance advice allowed us to optimize our production processes by 30%.",
        rating: 5,
      },
      {
        name: "Thomas Durand",
        role: "International Consultant, FAO",
        text: "Professional, rigorous, and with an excellent understanding of nutritional challenges in West Africa. I highly recommend him.",
        rating: 5,
      },
      {
        name: "Sophie Mensah",
        role: "Quality Manager, NutriGroup",
        text: "Adrien's approach perfectly combines scientific rigor and commercial pragmatism. A trusted partner for any agro-industrial project.",
        rating: 5,
      },
      {
        name: "Marc Ouédraogo",
        role: "Investor, Sahel Ventures",
        text: "His analysis of the nutritional market is surgically precise. He knows how to transform technical challenges into business opportunities.",
        rating: 5,
      },
      {
        name: "Lucie Zoma",
        role: "Project Coordinator, ONG SantéPlus",
        text: "Efficient and passionate. Adrien was able to mobilize key stakeholders for the success of our food fortification program.",
        rating: 5,
      },
    ],
  },
  es: {
    title1: "Lo que",
    title: "dicen",
    testimonials: [
      {
        name: "Dr. Jean-Baptiste Koffi",
        role: "Director de I+D, AgroCoton",
        text: "La experiencia de Adrien en el desarrollo de productos nutricionales fue fundamental para nuestra última gama. Su visión estratégica es un activo poco común.",
        rating: 5,
      },
      {
        name: "Marie-Louise Akpovi",
        role: "Fundadora, BioSain Benin",
        text: "Una colaboración excepcional. Sus consejos en asistencia técnica nos permitieron optimizar nuestros procesos de producción en un 30%.",
        rating: 5,
      },
      {
        name: "Thomas Durand",
        role: "Consultor Internacional, FAO",
        text: "Profesional, riguroso y con un excelente conocimiento de los desafíos nutricionales en África Occidental. Lo recomiendo ampliamente.",
        rating: 5,
      },
      {
        name: "Sophie Mensah",
        role: "Gerente de Calidad, NutriGroup",
        text: "El enfoque de Adrien combina perfectamente el rigor científico y el pragmatismo comercial. Un socio de confianza para cualquier proyecto agroindustrial.",
        rating: 5,
      },
      {
        name: "Marc Ouédraogo",
        role: "Inversor, Sahel Ventures",
        text: "Su análisis del mercado nutricional es de una precisión quirúrgica. Sabe transformar los desafíos técnicos en oportunidades de negocio.",
        rating: 5,
      },
      {
        name: "Lucie Zoma",
        role: "Coordinadora de Proyectos, ONG SantéPlus",
        text: "Eficiente y apasionado. Adrien supo movilizar a los actores clave para el éxito de nuestro programa de fortificación alimentaria.",
        rating: 5,
      },
    ],
  },
};

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  // Create a doubled list for infinite scroll effect
  const doubledTestimonials = [...t.testimonials, ...t.testimonials];

  return (
    <section className="bg-gray-900 py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .pause-on-hover:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white text-center"
        >
          {t.title1} <span className="text-blue-500">{t.title}</span>
        </motion.h2>
      </div>

      <div className="relative flex overflow-hidden pause-on-hover">
        <div className="flex gap-8 whitespace-nowrap animate-scroll">
          {doubledTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-blue-500/50 transition-all w-[85vw] sm:w-[350px] lg:w-[450px] flex-shrink-0 whitespace-normal flex flex-col min-h-[280px] md:min-h-[300px]"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-blue-500 text-2xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic text-base md:text-lg leading-relaxed flex-grow">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="mt-auto pt-4 border-t border-gray-700/50">
                <p className="text-white font-bold text-lg">{testimonial.name}</p>
                <p className="text-blue-400 text-sm font-medium">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for professional feel */}
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}


