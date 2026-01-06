"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context";

const translations = {
  fr: {
    title1: "Ce qu'ils",
    title: "disent",
    testimonials: [
      {
        name: "Amelia Nora d’ALMEIDA",
        role: "Gestion de projet | Marketing | Développement d’entreprises | résolution de problèmes",
        text: "L'expertise d'Adrien en développement de produits nutritionnels a été déterminante pour notre dernière gamme. Sa vision stratégique est un atout rare.",
        rating: 5,
      },
      {
        name: "Marine Buisson",
        role: "Responsable senior de projets – Programmes mondiaux, Cartier Women’s Initiative",
        text: "J’ai travaillé deux ans avec Adrien sur le projet BeniBiz au Bénin. Adrien est un véritable expert en nutrition et en entreprenariat (notamment des femmes et des jeunes). Sa passion, sa rigueur et sa créativité ont grandement contribué au succès du projet. ",
        rating: 5,
      },
      {
        name: "Ange-Marie Nicodème ESSE",
        role: "Coordinateur exécutif à l’Initiative pour l’Accès à la Santé (Health Access Initiative – HAI)",
        text: "Très dynamique, créatif et doté d'un bon sens d'analyse situationnelle. Un véritable acteur de changement du monde agricole notamment de l'agrobusiness.",
        rating: 5,
      },
      {
        name: "Pierre Yemalin Kpoffon",
        role: "Finance Inclusive | Finance Rurale | Finance Agricole | Éducation Financière |Entrepreneuriat & Genre | Gestion de Projet |",
        text: "Adrien est un jeune talentueux, compétent et très orienté résultat dans ses actions.",
        rating: 5,
      },
     // {
       // name: "Marc Ouédraogo",
       // role: "Investisseur, Sahel Ventures",
       // text: "Son analyse du marché nutritionnel est d'une précision chirurgicale. Il sait transformer des défis techniques en opportunités de business.",
       // rating: 5,
      //},
     // {
      //  name: "Lucie Zoma",
      //  role: "Coordinatrice de Projet, ONG SantéPlus",
      //  text: "Efficace et passionné. Adrien a su mobiliser les acteurs clés pour la réussite de notre programme de fortification alimentaire.",
      //  rating: 5,
      //},
    ],
  },
  en: {
    title1: "What they",
    title: "say",
    testimonials: [
      {
        name: "Amelia Nora d’ALMEIDA",
        role: "Gestion de projet | Marketing | Développement d’entreprises | résolution de problèmes",
        text: "Adrien DOGO is one of those young Beninese professionals with a pleasantly surprising profile. Over the past few years, he has successfully trained and gained knowledge in the fields of nutrition, innovation for development, and inclusive agribusiness. Dynamic and eager to learn, Adrien is a problem-solver who goes beyond his area of expertise to support entrepreneurs of all sizes.",
        rating: 5,
      },
      {
        name: "Marine Buisson",
        role: "Senior Project Manager Global Programs, Cartier Women's Initiative",
        text: "I worked with Adrien for two years on the BeniBiz project in Benin. Adrien is a true expert in nutrition and entrepreneurship, particularly in supporting women and young people. His passion, rigor, and creativity greatly contributed to the success of the project.",
        rating: 5,
      },
      {
        name: "Ange-Marie Nicodème ESSE",
        role: "Executive Coordinator at Health Access Initiative (HAI)",
        text: "Highly dynamic, creative, and equipped with strong situational analysis skills. A true agent of change in the agricultural sector, particularly in agribusiness.",
        rating: 5,
      },
      {
        name: "Pierre Yemalin Kpoffon",
        role: "Inclusive Finance | Rural Finance | Agricultural Finance | Financial Education | Entrepreneurship & Gender | Project Management |",
        text: "Adrien is a young talent, competent and very result-oriented in his actions.",
        rating: 5,
      },
     // {
      //  name: "Marc Ouédraogo",
      //  role: "Investor, Sahel Ventures",
      //  text: "His analysis of the nutritional market is surgically precise. He knows how to transform technical challenges into business opportunities.",
      //  rating: 5,
      //},
     // {
      //  name: "Lucie Zoma",
      //  role: "Project Coordinator, ONG SantéPlus",
      //  text: "Efficient and passionate. Adrien was able to mobilize key stakeholders for the success of our food fortification program.",
      //  rating: 5,
      //},
    ],
  },
  es: {
    title1: "Lo que",
    title: "dicen",
    testimonials: [
      {
        name: "Amelia Nora d’ALMEIDA",
        role: "Directora de Proyectos | Marketing | Desarrollo de Empresas | Resolución de Problemas",
        text: "Adrien DOGO forma parte de esos jóvenes benineses con un perfil gratamente sorprendente. En pocos años, ha sabido formarse y adquirir conocimientos en los ámbitos de la nutrición, la innovación para el desarrollo y el agronegocio inclusivo. Dinámico y con una gran sed de aprendizaje, Adrien es una verdadera fuente de soluciones y va más allá de su área de especialización para apoyar a emprendedores de cualquier tamaño.",
        rating: 5,
      },
      {
        name: "Marine Buisson",
        role: "Gerente sénior de proyectos – Programas globales, Cartier Women’s Initiative",
        text: "Trabajé con Adrien durante dos años en el proyecto BeniBiz en Benín. Adrien es un verdadero experto en nutrición y en emprendimiento, especialmente en el apoyo a mujeres y jóvenes. Su pasión, su rigor y su creatividad contribuyeron en gran medida al éxito del proyecto.",
        rating: 5,
      },
      {
        name: "Ange-Marie Nicodème ESSE",
        role: "Coordinador ejecutivo en la Iniciativa de Acceso a la Salud (Health Access Initiative – HAI)",
        text: "Muy dinámico, creativo y con un sólido sentido del análisis situacional. Un verdadero agente de cambio en el sector agrícola, especialmente en el agronegocio.",
        rating: 5,
      },
      {
        name: "Pierre Yemalin Kpoffon",
        role: "Finanzas inclusivas | Finanzas rurales | Finanzas agrícolas | Educación financiera | Emprendimiento y género | Gestión de proyectos |",
        text: "Adrien es un joven talento, competente y muy orientado resultado en sus acciones.",
        rating: 5,
      },
    //  {
     //   name: "Marc Ouédraogo",
      //  role: "Inversor, Sahel Ventures",
      //  text: "Su análisis del mercado nutricional es de una precisión quirúrgica. Sabe transformar los desafíos técnicos en oportunidades de negocio.",
      //  rating: 5,
      //},
     // {
       // name: "Lucie Zoma",
       // role: "Coordinadora de Proyectos, ONG SantéPlus",
       // text: "Eficiente y apasionado. Adrien supo movilizar a los actores clave para el éxito de nuestro programa de fortificación alimentaria.",
       // rating: 5,
      //},
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
          className="text-3xl md:text-5xl font-bold text-gray-200 text-center"
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


