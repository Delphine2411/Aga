"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from "@/src/components/contexts/language_context";
import { useEffect } from "react";



// Section Bio avec cartes animées
function BioSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const texts = {
    fr: {
      years: "Né le 27 Février 1996 à Tchetti , Savalou , Collines, Bénin",
      matrimonial: "Disciple de Jésus Christ et étudiant à l'Université de la Côte d'Ivoire",
      title: "À propos de moi",
      role: "Expert en Systèmes Alimentaires & Business Development Nutritionnel",
      intro: `Je me distingue par ma passion pour l'innovation inclusive et mon engagement à transformer les systèmes alimentaires africains.`,
      desc: `Je suis du genre à vouloir créer des opportunités pour les autres en permanence, avec tous les outils ou toutes les compétences dont je dispose. Je veux créer des innovations ou des entreprises capables de générer des opportunités pour les autres, pour le plus grand nombre de personnes possible.
`,
      button: "Découvrir mes réalisations",
      button1: "Télécharger CV",
      me: "Je suis ",
      academicTitle: "Parcours Académique",
      academic: [
        { year: "2024", title: "Doctorat", desc: "Étude des environnements alimentaires en zones sèches." },
        { year: "2019", title: "Master", desc: "Nutrition humaine et sécurité alimentaire (Université d’Abomey-Calavi)." },
        { year: "2016", title: "Licence", desc: "Nutrition et sciences agroalimentaires (Université de Parakou)." },
        { year: "2013", title: "Baccalauréat", desc: "Série D, CEG1 Abomey-Calavi." }
      ]
    },
    en: {
      years: "Born on February 27, 1996 in Tchetti, Savalou, Collines, Benin",
      title: "About Me",
      role: "Food Systems Expert & Nutritional Business Development",
      intro: `I stand out for my passion for inclusive innovation and my commitment to transforming African food systems.`,
      desc: `I combine scientific expertise and entrepreneurial vision to combat malnutrition. My background, marked by a PhD in nutrition, has allowed me to develop healthier food environments and support the development of agribusiness in Africa.`,
      button: "View My Work",
      button1: "Download CV",
      me: "I'm ",
      academicTitle: "Academic Background",
      academic: [
        { year: "2024", title: "PhD", desc: "Study of food environments in drylands." },
        { year: "2019", title: "Master's Degree", desc: "Human Nutrition and Food Security (University of Abomey-Calavi)." },
        { year: "2016", title: "Bachelor's Degree", desc: "Nutrition and Agri-food Sciences (University of Parakou)." },
        { year: "2013", title: "High School Diploma", desc: "Science Major, CEG1 Abomey-Calavi." }
      ]
    },
    es: {
      years: "Nacido el 27 de febrero de 1996 en Tchetti, Savalou, Collines, Benin",
      title: "Sobre Mí",
      role: "Experto en Sistemas Alimentarios y Desarrollo de Negocios Nutricionales",
      intro: `Me destaco por mi pasión por la innovación inclusiva y mi compromiso con la transformación de los sistemas alimentarios africanos.`,
      desc: `Combino experiencia científica y visión emprendedora para combatir la desnutrición. Mi formación, marcada por un doctorado en nutrición, me ha permitido desarrollar entornos alimentarios más saludables y apoyar el desarrollo de los agronegocios en África.`,
      button: "Ver Mis Proyectos",
      button1: "Descargar CV",
      me: "Soy ",
      academicTitle: "Formación Académica",
      academic: [
        { year: "2024", title: "Doctorado", desc: "Estudio de los entornos alimentarios en zonas secas." },
        { year: "2019", title: "Maestría", desc: "Nutrición Humana y Seguridad Alimentaria (Universidad de Abomey-Calavi)." },
        { year: "2016", title: "Licenciatura", desc: "Nutrición y Ciencias Agroalimentarias (Universidad de Parakou)." },
        { year: "2013", title: "Bachillerato", desc: "Serie D, CEG1 Abomey-Calavi." }
      ]
    },

  };

  const { language, setLanguage } = useLanguage();
  // Sauvegarder la langue
  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const t = texts[language as keyof typeof texts] || texts.en;

  return (
    <section className="relative bg-gradient-to-b from-black to-gray-900 py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative w-full aspect-square bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/image/ad.png" alt="Adrien DOGO" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-16 -right-16">
                <div className="w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
              </div>

            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-5xl font-bold text-white">
              {t.me} <span className="text-blue-500">Adrien DOGO</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t.years}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t.intro}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {t.desc}
            </p>
            <a
              href="/files/CV_Adrien_DOGO.pdf"
              download="CV_Adrien_DOGO.pdf"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(13, 106, 212, 0.59)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-500 text-black font-bold rounded-full hover:bg-blue-600 transition-all"
              >
                {t.button1}
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        {/* Dynamic Academic Background Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">{t.academicTitle}</h3>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.academic.map((edu, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all group"
              >
                <span className="text-blue-500 font-bold text-2xl mb-4 block group-hover:scale-110 transition-transform">{edu.year}</span>
                <h4 className="text-xl font-bold text-white mb-2">{edu.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default BioSection;