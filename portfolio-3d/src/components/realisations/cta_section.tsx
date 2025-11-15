"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useLanguage } from "@/src/components/contexts/language_context"; // 👈 important !

const translations = {
  fr: {
    title1: "Prêt à démarrer votre",
    title: " projet?",
    subtitle: "Travaillons ensemble pour créer quelque chose d’extraordinaire",
    button: "Contactez-moi",
  },
  en: {
    title1: "Ready to start your",
    title: " project?",
    subtitle: "Let's work together to create something extraordinary",
    button: "Contact me",
  },
  es: {
    title1: "¿Listo para iniciar tu ",
    title: " proyecto?",
    subtitle: "Trabajemos juntos para crear algo extraordinario",
    button: "Contáctame",
  },
};

function CTASection() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          {t.title1}
          <span className="text-[#10b981]">
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
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 255, 102, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-[#10b981] text-black text-lg font-bold rounded-full hover:bg-[#00FF66]/90 transition-all"
        >
          {t.button}
        </motion.button>
        </Link>
      </div>
    </section>
  );
}
export default CTASection;