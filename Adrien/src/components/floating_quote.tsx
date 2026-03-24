"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./contexts/language_context";

const quotes = {
  fr: "Il n'y a pas d'hommes, il n'y a pas de femmes, il n'y a pas de races, il n'y a pas de couleur, il n'y a pas de petits, il n'y a pas de grands, il n'y a pas d'âges. Il n'y a que des actes qui comptent. Osez agir.",
  en: "There are no men, there are no women, there are no races, there is no color, there are no small, there are no great, there are no ages. There are only acts that count. Dare to act.",
  es: "No hay hombres, no hay mujeres, no hay razas, no hay color, no hay pequeños, no hay grandes, no hay edades. Solo cuentan los actos. Atrévete a actuar."
};

export default function FloatingQuote() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quote = quotes[language as keyof typeof quotes] || quotes.fr;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: hasScrolled ? 10 : 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={`fixed top-15 -right-30 -translate-x-1/2 z-[200] w-[65%] max-w-sm mt-4 md:mt-2 transition-all duration-300`}
        >
          <div className="bg-blue-500/20 text-white p-4 md:p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-black/5 relative group">
            {/* Quotation Marks */}
            <span className="absolute top-2 left-3 text-3xl font-serif text-black/20 group-hover:text-black/40 transition-colors">“</span>
            
            <p className="text-blue-500 text-center font-bold text-sm md:text-base leading-snug px-6">
              {quote}
            </p>

            <span className="absolute bottom-2 right-3 text-3xl font-serif text-black/20 group-hover:text-black/40 transition-colors">”</span>

            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/50 hover:text-black transition-all"
              title="Fermer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
