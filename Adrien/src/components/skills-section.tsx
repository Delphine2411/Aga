"use client";

import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

const translations = {
  fr: {
    sectionSubtitle: "Technique & Professionnel",
    sectionTitle: "Mes Compétences",
    sectionDescription:
      "Chaque compétence représente une pierre essentielle de mon parcours : j’associe créativité et rigueur pour concevoir des solutions performantes et intuitives.",
    technicalTitle: "Compétences Techniques",
    professionalTitle: "Compétences Professionnelles",
    technicalSkills: [
      { name: "ONA / Kobocollect", level: 95 },
      { name: "CommCare / Power BI", level: 90 },
      { name: "SPSS / R", level: 85 },
      { name: "Statistica / XL stat", level: 82 },
      { name: "Eye tracking", level: 80 },
      { name: "Canva", level: 95 },
      { name: "Clipchamp / Inshot", level: 88 },
    ],
    professionalSkills: [
      { name: "Communication", level: 90 },
      { name: "Créativité", level: 85 },
      { name: "Gestion de projet", level: 70 },
      { name: "Travail d’équipe", level: 88 },
    ],
  },
  en: {
    sectionSubtitle: "Technical & Professional",
    sectionTitle: "My Skills",
    sectionDescription:
      "Each skill represents a cornerstone of my journey: I combine creativity and rigor to design efficient and intuitive solutions.",
    technicalTitle: "Technical Skills",
    professionalTitle: "Professional Skills",
    technicalSkills: [
      { name: "ONA / Kobocollect", level: 95 },
      { name: "CommCare / Power BI", level: 90 },
      { name: "SPSS / R", level: 85 },
      { name: "Statistica / XL stat", level: 82 },
      { name: "Eye tracking", level: 80 },
      { name: "Canva", level: 95 },
      { name: "Clipchamp / Inshot", level: 88 },
    ],
    professionalSkills: [
      { name: "Communication", level: 90 },
      { name: "Creativity", level: 85 },
      { name: "Project Management", level: 70 },
      { name: "Teamwork", level: 88 },
    ],
  },
  es: {
    sectionSubtitle: "Técnico & Profesional",
    sectionTitle: "Mis Habilidades",
    sectionDescription:
      "Cada habilidad representa una piedra angular de mi trayectoria: combino creatividad y rigor para diseñar soluciones eficientes e intuitivas.",
    technicalTitle: "Habilidades Técnicas",
    professionalTitle: "Habilidades Profesionales",
    technicalSkills: [
      { name: "ONA / Kobocollect", level: 95 },
      { name: "CommCare / Power BI", level: 90 },
      { name: "SPSS / R", level: 85 },
      { name: "Statistica / XL stat", level: 82 },
      { name: "Eye tracking", level: 80 },
      { name: "Canva", level: 95 },
      { name: "Clipchamp / Inshot", level: 88 },
    ],
    professionalSkills: [
      { name: "Comunicación", level: 90 },
      { name: "Creatividad", level: 85 },
      { name: "Gestión de proyectos", level: 70 },
      { name: "Trabajo en equipo", level: 88 },
    ],
  },
};

export default function SkillsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-20 px-6 overflow-hidden">
      {/* 🎇 Effet 3D de fond */}
      <Canvas className="absolute inset-0 z-0 opacity-30">
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} />
        <Sphere args={[1, 64, 64]} scale={6}>
          <MeshDistortMaterial color="#3b82f6" distort={0.5} speed={2} />
        </Sphere>
      </Canvas>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-gray-400 tracking-widest uppercase">
            {t.sectionSubtitle}
          </p>
          <h2 className="lg:text-4xl text-3xl font-bold text-blue-500 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t.sectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* --- TECHNICAL SKILLS --- */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-8">{t.technicalTitle}</h3>
            <div className="space-y-6">
              {t.technicalSkills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{skill.name}</span>
                    <span className="text-blue-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-orange-500 shadow-[0_0_10px_#00FFFF]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- PROFESSIONAL SKILLS --- */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-10 mt-25"
          >
            {t.professionalSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="w-28 h-28 mb-4">
                  <CircularProgressbar
                    value={skill.level}
                    text={`${skill.level}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#008cffff",
                      trailColor: "#403d2aff",
                      textSize: "16px",
                    })}
                  />
                </div>
                <p className="font-semibold text-sm mt-2">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
