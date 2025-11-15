"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaFacebook, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/src/components/contexts/language_context";
import { useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  const translations = {
    fr: {
      title: "Télécharger le CV",
      role: "Développeuse Full Stack & Analyste-Économiste",
      intro: `Forte d’une double compétence en développement Full Stack et en analyse économique, 
      je m’investis dans la création de solutions logicielles fiables, performantes et pertinentes. 
      Mon approche repose sur la rigueur, la curiosité et une volonté constante d’apprendre. 
      J’accorde une importance particulière à la compréhension des besoins métiers afin de proposer des produits innovants et à forte valeur ajoutée.`,
      desc: `Passionnée par la création de solutions performantes, j’aime transformer des idées en produits concrets et utiles. 
      Les défis sont pour moi une source de motivation et d’innovation. Mon objectif : concevoir des logiciels intelligents et efficaces,
      capables de répondre avec précision aux besoins réels des utilisateurs.`,
      button: "Découvrir mes réalisations",
    },
    en: {
  title: "Download CV",
  role: "Full Stack Developer & Economic Analyst",
  intro: `With dual expertise in Full Stack development and economic analysis, 
  I am dedicated to creating reliable, efficient, and relevant software solutions. 
  My approach is based on rigor, curiosity, and a constant desire to learn. 
  I place particular importance on understanding business needs in order to deliver innovative, high-value products.`,
  desc: `Passionate about building efficient solutions, I enjoy transforming ideas into concrete and useful products. 
  Challenges are for me a source of motivation and innovation. My goal: to design intelligent and effective software,
  capable of precisely meeting the real needs of users.`,
  button: "Discover my projects",
},

    es: {
      title: "Descargar el CV",
      role: "Desarrolladora Full Stack y Analista-Economista",
      intro: `Con una doble competencia en desarrollo Full Stack y análisis económico, 
  me dedico a crear soluciones de software fiables, eficientes y relevantes. 
  Mi enfoque se basa en la rigurosidad, la curiosidad y una voluntad constante de aprender. 
  Doy especial importancia a la comprensión de las necesidades del negocio para proponer productos innovadores y de alto valor añadido.`,
      desc: `Apasionada por la creación de soluciones eficientes, me gusta transformar ideas en productos concretos y útiles. 
  Los desafíos son para mí una fuente de motivación e innovación. Mi objetivo: diseñar software inteligente y eficaz,
  capaz de responder con precisión a las necesidades reales de los usuarios.`,
      button: "Descubrir mis proyectos",
    },
  };

  const { language } = useLanguage()
  const t = translations[language];
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black  text-white flex items-center justify-center px-10 lg:py-0 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-10">
        {/* --- TEXTE À GAUCHE --- */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >

          <h1 className="text-6xl font-bold mt-3">Delphine KPANKPAN
          </h1>
          <h3 className="text-2xl mt-3 text-[#10b981] font-semibold">
            {t.role}
          </h3>
          <p className="text-gray-300 mt-4 max-w-md">
            {t.intro}
          </p>

          {/* --- Bouton + Icônes --- */}
          <div className="flex items-center gap-5 mt-8">
            <a
              href="/files/CV_Delphine_KPANKPAN.pdf"
              download="CV_Delphine_KPANKPAN.pdf"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-transparent border-2 border-[#10b981] text-[#10b981] font-semibold rounded-full hover:bg-[#10b981] hover:text-black transition-all flex items-center"
              >
                <FaDownload className="inline-block mr-2" />
                {t.title}
              </motion.button>
            </a>

            <div className="flex gap-4 text-[#10b981] text-2xl">
<Link
            href="https://github.com/awogbin2411"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil GitHub de Delphine Kpankpan"
          >
            <FaGithub className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/delphine-kpankpan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil LinkedIn de Delphine Kpankpan"
          >
            <FaLinkedin className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
          </Link>

          <Link href="mailto:delphinekpankpan11@gmail.com" aria-label="Envoyer un email">
            <FaEnvelope className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
          </Link>

          <Link
            href="https://www.facebook.com/ton.profil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil Facebook de Delphine Kpankpan"
          >
            <FaFacebook className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
          </Link>

          <Link href="tel:+22943832687" aria-label="Appeler Delphine Kpankpan">
            <FaPhone className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
          </Link>

            </div>
          </div>
        </motion.div>

        {/* --- IMAGE AVEC ANIMATION 3D --- */}
        <div className="relative flex items-center justify-center w-[400px] h-[500px]">
          {/* --- Conteneur de l'image --- */}

          <img src="/image/copilot.png" alt="Kladmok" className="w-full h-full objet-cover" />
          {/* --- Premier demi-cercle (entre) --- */}


          {/* --- Second demi-cercle (sort, rotation inverse) --- */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute w-[450px] h-[450px] rounded-full border-b-[6px] border-[#10b981] border-l-transparent border-r-transparent border-t-transparent"
            style={{
              //boxShadow: "0 0 20px rgba(0,255,102,0.3)",
            }}
          ></motion.div>
        </div>

      </div>
    </section>
  );
}
