"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/src/components/contexts/language_context";

const backgroundImages = [
  "/image/cta1.jpeg",
  "/image/cta2.jpeg",
  "/image/cta3.jpeg",
];

const translations = {
  fr: {
    title1: "Accelerons la transformation   ",
    title: "inclusive de systèmes alimentaires durables",
    subtitle: "en aliant expertise, accompagnement technique et engagement du secteur privé",
    button: "Contactez-moi",
  },
  en: {
    title1: "Let's accelerate the ",
    title: "inclusive transformation of sustainable food systems",
    subtitle: "by combining expertise, technical support, and private sector engagement",
    button: "Contact me",
  },
  es: {
    title1: "Aceleremos la transformación ",
    title: "inclusiva de sistemas alimentarios sostenibles",
    subtitle: "uniendo experiencia, asistencia técnica y compromiso del sector privado",
    button: "Contáctame",
  },
};

function CTASection() {
  const { language } = useLanguage();
  const t = translations[language];

  // Gestion du carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-black py-24 px-4 overflow-hidden min-h-[60vh] flex items-center">
      {/* Carrousel d'images en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }} // Opacité réglée pour garder le texte lisible
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-[5000ms] scale-100"
              style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
            />
            {/* Overlay dégradé pour améliorer le contraste */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          {t.title1}
          <span className="text-blue-500">
            {t.title}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 mb-8"
        >
          {t.subtitle}
        </motion.p>
        <Link href={'/contact'}>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 153, 255, 0.53)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-black text-lg font-bold rounded-full hover:bg-blue-600 transition-all"
          >
            {t.button}
          </motion.button>
        </Link>
      </div>
    </section>
  );
}

export default CTASection;