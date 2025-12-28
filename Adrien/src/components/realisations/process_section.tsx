"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context";
import { HiOutlineSearch, HiOutlineBeaker, HiOutlineAdjustments, HiOutlineChartBar } from "react-icons/hi";

const translations = {
  fr: {
    title: "Méthodologie",
    subtitle: "Une approche rigoureuse et axée sur les résultats pour vos projets de nutrition.",
    steps: [
      {
        number: "01",
        title: "Audit & Diagnostic",
        description: "Analyse approfondie de votre écosystème, identification des lacunes et des opportunités de croissance.",
        icon: HiOutlineSearch,
        color: "from-emerald-500 to-blue-500"
      },
      {
        number: "02",
        title: "Stratégie & Formulation",
        description: "Élaboration de solutions sur mesure et optimisation des formulations nutritionnelles pour maximiser l'impact.",
        icon: HiOutlineBeaker,
        color: "from-blue-500 to-cyan-500"
      },
      {
        number: "03",
        title: "Déploiement & Assistance",
        description: "Accompagnement opérationnel et assistance technique continue pour assurer une mise en œuvre sans faille.",
        icon: HiOutlineAdjustments,
        color: "from-cyan-500 to-blue-500"
      },
      {
        number: "04",
        title: "Impact & Évaluation",
        description: "Mesure des indicateurs de performance et ajustements stratégiques pour garantir des résultats durables.",
        icon: HiOutlineChartBar,
        color: "from-blue-500 to-indigo-500"
      },
    ],
  },
  en: {
    title: "Methodology",
    subtitle: "A rigorous, results-oriented approach for your nutrition projects.",
    steps: [
      {
        number: "01",
        title: "Audit & Diagnosis",
        description: "In-depth analysis of your ecosystem, identifying gaps and growth opportunities.",
        icon: HiOutlineSearch,
        color: "from-emerald-500 to-blue-500"
      },
      {
        number: "02",
        title: "Strategy & Formulation",
        description: "Development of tailor-made solutions and optimization of nutritional formulations to maximize impact.",
        icon: HiOutlineBeaker,
        color: "from-blue-500 to-cyan-500"
      },
      {
        number: "03",
        title: "Deployment & Assistance",
        description: "Operational support and continuous technical assistance to ensure flawless implementation.",
        icon: HiOutlineAdjustments,
        color: "from-cyan-500 to-blue-500"
      },
      {
        number: "04",
        title: "Impact & Evaluation",
        description: "Measurement of performance indicators and strategic adjustments to guarantee sustainable results.",
        icon: HiOutlineChartBar,
        color: "from-blue-500 to-indigo-500"
      },
    ],
  },
  es: {
    title: "Metodología",
    subtitle: "Un enfoque riguroso y orientado a resultados para sus proyectos de nutrición.",
    steps: [
      {
        number: "01",
        title: "Auditoría y Diagnóstico",
        description: "Análisis profond de su ecosystème, identificando brechas et oportunidades de crecimiento.",
        icon: HiOutlineSearch,
        color: "from-emerald-500 to-blue-500"
      },
      {
        number: "02",
        title: "Estrategia y Formulación",
        description: "Desarrollo de soluciones a medida y optimización de formulaciones nutricionales para maximizar el impacto.",
        icon: HiOutlineBeaker,
        color: "from-blue-500 to-cyan-500"
      },
      {
        number: "03",
        title: "Despliegue y Asistencia",
        description: "Apoyo operativo y asistencia técnica continua para garantizar una implementación impecable.",
        icon: HiOutlineAdjustments,
        color: "from-cyan-500 to-blue-500"
      },
      {
        number: "04",
        title: "Impacto y Evaluación",
        description: "Medición de indicadores de desempeño y ajustes estratégicos para garantizar resultados sostenibles.",
        icon: HiOutlineChartBar,
        color: "from-blue-500 to-indigo-500"
      },
    ],
  },
};

export default function ProcessSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-gray-950 py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:text-5xl text-4xl font-bold text-white mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-indigo-500/20 -z-10" />

          {t.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full flex flex-col items-center text-center hover:bg-white/[0.07] transition-all duration-300">
                {/* Step Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/10`}>
                  <div className="w-full h-full bg-gray-900 rounded-[15px] flex items-center justify-center">
                    <step.icon className="text-3xl text-white" />
                  </div>
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-4 right-8 bg-gray-900 border border-white/10 text-emerald-400 font-mono text-sm px-3 py-1 rounded-full shadow-xl">
                  STEP {step.number}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                  {step.description}
                </p>
              </div>

              {/* Decorative Accent Glow */}
              <div className={`absolute -inset-1 rounded-[32px] bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

