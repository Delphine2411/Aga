"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaFacebook, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/src/components/contexts/language_context";
import Link from "next/link";

export default function HeroSection() {
  const translations = {
    fr: {
      title: "Télécharger le CV",
      role: "Nutrition Business development & Inclusive innovation & Food systems scientist, R&D, PhD & Data and impact & Management, Leadership and Entrepreneurship",
      intro: `Je suis titulaire d’un Master en nutrition humaine et sécurité alimentaire ainsi que d’un doctorat (PhD) en nutrition et systèmes alimentaires, avec un intérêt particulier pour la création d’environnements alimentaires plus sains favorisant l’accès à des aliments nutritifs dans les zones arides africaines. Mon objectif est d’accompagner les organisations dans la lutte contre la malnutrition en Afrique, qui touche près de 30 % des enfants de moins de cinq ans.`,
      desc: `Fort de plus de 8 années d’expérience professionnelle dans la mise en œuvre de projets et programmes de sécurité alimentaire, ainsi que dans l’entrepreneuriat des jeunes et des femmes et le développement des entreprises agroalimentaires, je suis convaincu que l’éradication de la malnutrition passe par une transformation inclusive et durable des systèmes alimentaires dans les pays africains, avec un accent particulier sur le lien entre la nutrition et le business.`,
      button: "Découvrir mes réalisations",
    },
    en: {
      title: "Download CV",
      role: "Nutrition Business development & Inclusive innovation & Food systems scientist, R&D, PhD & Data and impact & Management, Leadership and Entrepreneurship",
      intro: `I hold a Master's degree in human nutrition and food security as well as a PhD in nutrition and food systems, with a particular interest in creating healthier food environments that promote access to nutritious food in African drylands. My goal is to support organizations in the fight against malnutrition in Africa, which affects nearly 30% of children under five.`,
      desc: `With over 8 years of professional experience in implementing food security projects and programs, as well as in youth and women's entrepreneurship and agribusiness development, I am convinced that eradicating malnutrition requires an inclusive and sustainable transformation of food systems in African countries, with a particular focus on the link between nutrition and business.`,
      button: "Discover my projects",
    },
    es: {
      title: "Descargar el CV",
      role: "Desarrollo de Negocios de Nutrición e Innovación Inclusiva y Científico de Sistemas Alimentarios, I+D, PhD y Datos e Impacto y Gestión, Liderazgo y Emprendimiento",
      intro: `Tengo una Maestría en nutrición humana y seguridad alimentaria, así com un doctorado (PhD) en nutrición y sistemas alimentarios, con un interés particular en la creación de entornos alimentarios más saludables que promuevan el acceso a alimentos nutritivos en las zonas áridas de África. Mi objetivo es apoyar a las organizaciones en la lucha contra la desnutrición en África, que afecta a casi el 30% de los niños menores de cinco años.`,
      desc: `Con más de 8 años de experiencia profesional en la implementación de proyectos y programas de seguridad alimentaria, así como en el emprendimiento de jóvenes y mujeres y el desarrollo de empresas agroalimentarias, estoy convencido de que la erradicación de la desnutrición requiere una transformación inclusiva y sostenible de los sistemas alimentarios en los países africanos, con un enfoque particular en el vínculo entre la nutrición y los negocios.`,
      button: "Descubrir mis proyectos",
    },
  };

  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-6 md:px-10 py-10 md:py-20">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-10">

        {/* --- TEXTE À GAUCHE --- */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mt-3">
            Adrien DOGO
          </h1>
          <h3 className="text-lg sm:text-xl lg:text-2xl mt-3 text-blue-500 font-semibold">
            {t.role}
          </h3>
          <p className="text-gray-300 mt-4 max-w-2lg mx-auto md:mx-0  sm:text-base">
            {t.intro}
          </p>
          <p className="text-gray-300 mt-4 max-w-2lg mx-auto md:mx-0  sm:text-base">
            {t.desc}
          </p>

          {/* --- Bouton + Icônes --- */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-5 mt-8">
            <a href="/files/CV_Adrien_DOGO.pdf" download="CV_Adrien_DOGO.pdf">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-500 hover:text-black transition-all flex items-center text-sm sm:text-base"
              >
                <FaDownload className="inline-block mr-2" />
                {t.title}
              </motion.button>
            </a>

            <div className="flex gap-4 text-blue-500 text-xl sm:text-2xl">
              { /*             <Link href="https://github.com/awogbin2411" target="_blank" rel="noopener noreferrer">
                <FaGithub className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
              </Link>*/}
              <Link href="https://www.linkedin.com/in/adrien-dogo-8290a9167/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
              </Link>
              <Link href="mailto:adriendogo@gmail.com">
                <FaEnvelope className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
              </Link>
              <Link href="https://web.facebook.com/agaadrien.dogo.37?locale=fr_FR" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
              </Link>
              <Link href="tel:+22994792134">
                <FaPhone className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* --- IMAGE RESPONSIVE --- */}
        <div className="relative flex items-center justify-center w-[400px] h-[500px]">
          {/* --- Conteneur de l'image --- */}

          <div className="relative w-70 h-70 rounded-full p-[3px] bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 animate-spin-slow">
            <img
              src="/image/ad.png"
              alt="Adrien DOGO"
              className="w-full h-full rounded-full object-cover shadow-lg border-[3px] border-transparent"
            />
          </div>
          {/* --- Second demi-cercle (sort, rotation inverse) --- */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute w-[320px] h-[320px] rounded-full border-b-[6px] border-blue-500 border-l-transparent border-r-transparent border-t-transparent"
            style={{
              //boxShadow: "0 0 20px rgba(0,255,102,0.3)",
            }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
}
