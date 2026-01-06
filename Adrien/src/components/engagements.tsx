"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/src/components/contexts/language_context";

const engagements = {
  fr: {
    title: "Mes Engagements",
    title1: " Professionnels et Bénévoles",
    proActuels: "Professionnels - Actuels",
    proPrecedents: "Professionnels - Précédents",
    benevole: "Bénévolat & Engagement Social",
    items: [
      { name: "Global Alliance for Improved Nutrition (GAIN)", logo: "/image/logo-gain-health.svg", category: "actuel", url: "https://www.gainhealth.org/" },
      { name: "Laboratoire de Nutrition et des Sciences alimentaires, Université de Parakou", logo: "/image/universite.png", category: "actuel", url: "https://share.google/OHSwEyzBvAoMOOr3J" },
      { name: "BoPinc", logo: "/image/bopinc_logo.png", category: "precedent", url: "https://bopinc.org/" },
      { name: "Technoserve", logo: "/image/technologo.png", category: "precedent", url: "https://www.technoserve.org/" },
      { name: "MANSSAH", logo: "/image/manssa.webp", category: "benevole", url: "https://www.manssah.com/" },
      { name: "ABED ONG", logo: "/image/abed.png", category: "precedent", url: "https://abedong.org/" },
    ]
  },
  en: {
    title: "My Engagements",
    title1: "Professional and Volunteer",
    proActuels: "Professional - Current",
    proPrecedents: "Professional - Past",
    benevole: "Volunteer & Social Work",
    items: [
      { name: "Global Alliance for Improved Nutrition (GAIN)", logo: "/image/logo-gain-health.svg", category: "actuel", url: "https://www.gainhealth.org/" },
      { name: "Laboratoire de Nutrition et des Sciences alimentaires, Université de Parakou", logo: "/image/universite.png", category: "actuel", url: "https://share.google/OHSwEyzBvAoMOOr3J" },
      { name: "BoPinc", logo: "/image/bopinc_logo.png", category: "precedent", url: "https://bopinc.org/" },
      { name: "Technoserve", logo: "/image/technologo.png", category: "precedent", url: "https://www.technoserve.org/" },
      { name: "MANSSAH", logo: "/image/manssa.webp", category: "benevole", url: "https://www.manssah.com/" },
      { name: "ABED ONG", logo: "/image/abed.png", category: "precedent", url: "https://abedong.org/" },
    ]
  },
  es: {
    title: "Mis compromisos",
    title1: " profesionales y de voluntariado",
    proActuels: "Profesional - Actual",
    proPrecedents: "Profesional - Pasado",
    benevole: "Voluntariado y Trabajo Social",
    items: [
      { name: "Global Alliance for Improved Nutrition (GAIN)", logo: "/image/logo-gain-health.svg", category: "actuel", url: "https://www.gainhealth.org/" },
      { name: "Laboratoire de Nutrition et des Sciences alimentaires, Université de Parakou", logo: "/image/universite.png", category: "actuel", url: "https://share.google/OHSwEyzBvAoMOOr3J" },
      { name: "BoPinc", logo: "/image/bopinc_logo.png", category: "precedent", url: "https://bopinc.org/" },
      { name: "Technoserve", logo: "/image/technologo.png", category: "precedent", url: "https://www.technoserve.org/" },
      { name: "MANSSAH", logo: "/image/manssa.webp", category: "benevole", url: "https://www.manssah.com/" },
      { name: "ABED ONG", logo: "/image/abed.png", category: "precedent", url: "https://abedong.org/" },
    ]
  },
};

export default function EngagementsSection() {
  const { language } = useLanguage();
  const t = engagements[language as keyof typeof engagements] || engagements.fr;

  const renderCategory = (categoryTitle: string, filter: string) => {
    const filteredItems = t.items.filter((item) => item.category === filter);

    if (filteredItems.length === 0) return null;

    return (
      <div className="mb-20 w-full flex flex-col items-center">
        {/* Titre de catégorie */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h3 className="text-xl font-bold text-gray-200 uppercase">
            {categoryTitle}
          </h3>
          <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
        </div>

        {/* Conteneur Flex pour un centrage dynamique des cartes */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
          {filteredItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                y: -10,
                scale: 1.03,
                boxShadow: "0px 15px 35px rgba(59, 130, 246, 0.25)" 
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex flex-col items-center justify-center bg-gray-900/40 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-gray-800/60 w-[280px] min-h-[320px] text-center"
            >
              {/* Conteneur de l'image (Centré et en couleur) */}
              <div className="flex flex-col items-center gap-6">
                 <div className="relative w-32 h-32 rounded-full bg-gray-100 p-4 shadow-xl flex items-center justify-center overflow-hidden border-2 border-blue-500/20">
                  <Image 
                    src={item.logo} 
                    alt={item.name} 
                    width={100} 
                    height={100} 
                    className="object-contain" 
                  />
                 </div>

                {/* Texte de l'organisation */}
                <span className="text-gray-200 font-bold text-sm md:text-base uppercase tracking-wider leading-relaxed px-2 group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>

              {/* Indicateur de lien externe */}
              <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-black py-24 px-6 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl w-full">
        
        {/* Titre Principal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <h2 className="lg:text-5xl text-3xl font-bold text-gray-200 mb-6">
            {t.title} <span className="text-blue-500">{t.title1} </span>
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 rounded-full"></div>
        </motion.div>

        {/* Contenu des catégories */}
        <div className="w-full flex flex-col items-center">
          {renderCategory(t.proActuels, "actuel")}
          {renderCategory(t.proPrecedents, "precedent")}
          {renderCategory(t.benevole, "benevole")}
        </div>
      </div>
    </section>
  );
}