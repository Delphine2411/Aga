"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

type StatKey = "experience" | "smes" | "academic" | "leadership";

const translations = {
  fr: {
    stats: [
      { label: "Années d'expérience", value: 10, key: "experience" },
      { label: "PME & Entreprises accompagnées", value: 50, key: "smes" },
      //{ label: "Titres Académiques", value: 4, key: "academic" },
      { label: "Leadership & Initiatives", value: 10, key: "leadership" },
    ],
  },
  en: {
    stats: [
      { label: "Years of Experience", value: 10, key: "experience" },
      { label: "SMEs & Businesses Supported", value: 50, key: "smes" },
      //{ label: "Academic Milestones", value: 4, key: "academic" },
      { label: "Leadership & Initiatives", value: 10, key: "leadership" },
    ],
  },
  es: {
    stats: [
      { label: "Años de experiencia", value: 10, key: "experience" },
      { label: "Pymes y Empresas acompañadas", value: 50, key: "smes" },
      //{ label: "Títulos Académicos", value: 4, key: "academic" },
      { label: "Liderazgo e Iniciativas", value: 10, key: "leadership" },
    ],
  },
};

function StatsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const [counts, setCounts] = useState<Record<StatKey, number>>({
    experience: 0,
    smes: 0,
    academic: 0,
    leadership: 0,
  });

  useEffect(() => {
    t.stats.forEach((stat) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCounts((prev) => ({ ...prev, [stat.key]: end }));
          clearInterval(timer);
        } else {
          setCounts((prev) => ({ ...prev, [stat.key]: Math.floor(start) }));
        }
      }, 16);
    });
  }, [t.stats]);

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {t.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-blue-500 mb-2">
                {counts[stat.key as StatKey]}+
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
