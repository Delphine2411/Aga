"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

const translations = {
  fr: {
    title: "Mon Processus",
    steps: [
      { number: "01", title: "Découverte", description: "Analyse des besoins et définition des objectifs", icon: "🔍" },
      { number: "02", title: "Conception", description: "Création des maquettes et prototypes interactifs", icon: "✏️" },
      { number: "03", title: "Développement", description: "Codage et intégration des fonctionnalités", icon: "💻" },
      { number: "04", title: "Livraison", description: "Tests, déploiement et formation", icon: "🚀" },
    ],
  },
  en: {
    title: "My Process",
    steps: [
      { number: "01", title: "Discovery", description: "Needs analysis and goal definition", icon: "🔍" },
      { number: "02", title: "Design", description: "Wireframes and interactive prototypes creation", icon: "✏️" },
      { number: "03", title: "Development", description: "Coding and feature integration", icon: "💻" },
      { number: "04", title: "Delivery", description: "Testing, deployment and training", icon: "🚀" },
    ],
  },
  es: {
    title: "Mi Proceso",
    steps: [
      { number: "01", title: "Descubrimiento", description: "Análisis de necesidades y definición de objetivos", icon: "🔍" },
      { number: "02", title: "Diseño", description: "Creación de maquetas y prototipos interactivos", icon: "✏️" },
      { number: "03", title: "Desarrollo", description: "Codificación e integración de funcionalidades", icon: "💻" },
      { number: "04", title: "Entrega", description: "Pruebas, despliegue y formación", icon: "🚀" },
    ],
  },
};

export default function ProcessSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white text-center mb-16"
        >
          {t.title.split(" ")[0]} <span className="text-[#10b981]">{t.title.split(" ")[1]}</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative bg-gray-800 rounded-2xl p-6 border-2 border-[#10b981]/30 hover:border-[#00FF66] transition-all"
            >
              <div className="text-6xl mb-4">{step.icon}</div>
              <div className="text-[#10b981] text-5xl font-bold mb-2 opacity-20">{step.number}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
