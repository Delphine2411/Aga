"use client";

import React, { useState, useRef, useEffect } from "react"; // 👈 useEffect ajouté
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"; // 👈 AnimatePresence ajouté
import { useLanguage } from "@/src/components/contexts/language_context";
import Footer3D from "./Footer3D";
import { FaLinkedin, FaWhatsapp, FaEnvelope, FaFacebook } from "react-icons/fa";

// --- AJOUT : Liste des images ---
const backgroundImages = [
  "/image/about1.jpeg",
  "/image/about2.jpeg",
  "/image/about3.jpeg",
  "/image/about4.jpeg",
  "/image/cta1.jpeg",
  "/image/real1.jpeg",
  "/image/real2.jpeg",
  "/image/real3.jpeg",
];

const footerText = {
  fr: {
    title1: "PRET A INCLURE LES JEUNES DANS LA",
    title2: "TRANSFORMATION DES SYSTÈMES ALIMENTAIRES ?",
    subtitle: "Discutons-en !",
    contact: "COORDONNÉES",
    social: "RÉSEAUX",
    rights: "Tous droits réservés",
    cta: "Me contacter",
  },
  en: {
    title1: "READY TO INCLUDE YOUTH IN THE",
    title2: "TRANSFORMATION OF FOOD SYSTEMS?",
    subtitle: "Let's discuss it!",
    contact: "CONTACT INFO",
    social: "SOCIAL",
    rights: "All rights reserved",
    cta: "Contact me",
  },
  es: {
    title1: "¿LISTO PARA INCLUIR A LOS JÓVENES EN LA",
    title2: "TRANSFORMACIÓN DE LOS SISTEMAS ALIMENTARIOS?",
    subtitle: "¡Hablemos!",
    contact: "CONTACTO",
    social: "REDES",
    rights: "Todos los derechos reservados",
    cta: "Contactarme",
  },
};

function MagneticLink({ children, href, className = "" }: { children: React.ReactNode, href: string, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block transition-colors hover:text-blue-500 ${className}`}
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  const { language: lang } = useLanguage();
  const year = new Date().getFullYear();

  // --- AJOUT : Logique du Carrousel ---
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-black text-white pt-18 pb-12 overflow-hidden border-t border-gray-900">
      
      {/* --- AJOUT : Carrousel d'images en BG (z-0) --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }} // Opacité faible pour le footer
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3D Background Scene (z-1) */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <Footer3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Vision & CTA */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                {footerText[lang].title1} <br />
                <span className="text-blue-500">
                  {footerText[lang].title2}
                </span>
              </h2>
              <p className="mt-6 text-gray-400 text-lg max-w-md leading-relaxed">
                {footerText[lang].subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MagneticLink
                href="mailto:adriendogo@gmail.com"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-black font-bold rounded-full overflow-hidden inline-flex items-center gap-2 hover:bg-transparent hover:text-white border border-white transition-all duration-300"
              >
                <span className="relative z-10">{footerText[lang].cta}</span>
                <FaEnvelope className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </MagneticLink>
            </motion.div>
          </div>

          {/* Right Column: Links & Social */}
          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                {footerText[lang].contact}
              </h3>
              <ul className="space-y-4">
                <li>
                  <MagneticLink href="mailto:adriendogo@gmail.com" className="text-lg text-gray-300">
                    Email
                  </MagneticLink>
                </li>
                <li>
                  <MagneticLink href="tel:+22994792134" className="text-lg text-gray-300">
                    +229 01 94 79 21 34
                  </MagneticLink>
                </li>
                <li>
                  <MagneticLink href="tel:+22961338022" className="text-lg text-gray-300">
                    +229 01 61 33 80 22
                  </MagneticLink>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                {footerText[lang].social}
              </h3>
              <div className="flex flex-col gap-4">
                <MagneticLink href="https://www.linkedin.com/in/adrien-dogo-8290a9167/" className="flex items-center gap-3 text-lg text-gray-300">
                  <FaLinkedin /> LinkedIn
                </MagneticLink>
                <MagneticLink href="https://wa.me/22994792134" className="flex items-center gap-3 text-lg text-gray-300">
                  <FaWhatsapp /> WhatsApp
                </MagneticLink>
                <MagneticLink href="https://web.facebook.com/agaadrien.dogo.37?locale=fr_FR" className="flex items-center gap-3 text-lg text-gray-300">
                  <FaFacebook /> Facebook
                </MagneticLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-4 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4 text-center md:text-left">
          <p>© {year} — Adrien DOGO. {footerText[lang].rights}.</p>
          <div className="flex gap-8">
            <MagneticLink href="#" className="hover:text-white transition-colors">Privacy Policy</MagneticLink>
            <MagneticLink href="#" className="hover:text-white transition-colors">Terms of Service</MagneticLink>
          </div>
        </div>
      </div>
    </footer>
  );
}