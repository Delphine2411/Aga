"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context";
import { FaHandHoldingHeart, FaLightbulb, FaBalanceScale, FaRocket, FaUsers, FaGlobe } from "react-icons/fa";

const translations = {
    fr: {
        title: "Ma Mission & Mes Valeurs",
        missionTitle: "Notre Mission",
        missionText:
            "Catalyser le changement dans les systèmes alimentaires en alliant science, innovation et engagement social. Je m'engage à construire un avenir où la nutrition est accessible, durable et vecteur d'équité pour toutes les communautés.",
        valuesTitle: "Nos Valeurs Fondamentales",
        values: [
            {
                title: "Intégrité",
                description: "Agir avec honnêteté et transparence pour bâtir des relations de confiance durables.",
            },
            {
                title: "Innovation",
                description: "Repousser les limites pour créer des solutions nutritionnelles novatrices et adaptées.",
            },
            {
                title: "Impact",
                description: "Viser des résultats concrets et mesurables pour améliorer réellement les vies.",
            },
            {
                title: "Inclusivité",
                description: "S'assurer que chaque voix compte et que les bénéfices sont partagés par tous.",
            },
        ],
    },
    en: {
        title: "My Mission & Values",
        missionTitle: "Our Mission",
        missionText:
            "To catalyze change in food systems by combining science, innovation, and social commitment. I am dedicated to building a future where nutrition is accessible, sustainable, and a driver of equity for all communities.",
        valuesTitle: "Our Core Values",
        values: [
            {
                title: "Integrity",
                description: "Acting with honesty and transparency to build lasting relationships of trust.",
            },
            {
                title: "Innovation",
                description: "Pushing boundaries to create innovative and tailored nutritional solutions.",
            },
            {
                title: "Impact",
                description: "Aiming for concrete, measurable results to truly improve lives.",
            },
            {
                title: "Inclusivity",
                description: "Ensuring every voice matters and benefits are shared by all.",
            },
        ],
    },
    es: {
        title: "Mi Misión y Valores",
        missionTitle: "Nuestra Misión",
        missionText:
            "Catalizar el cambio en los sistemas alimentarios combinando ciencia, innovación y compromiso social. Me dedico a construir un futuro donde la nutrición sea accesible, sostenible y un motor de equidad para todas las comunidades.",
        valuesTitle: "Nuestros Valores Fundamentales",
        values: [
            {
                title: "Integridad",
                description: "Actuar con honestidad y transparencia para construir relaciones de confianza duraderas.",
            },
            {
                title: "Innovación",
                description: "Superar los límites para crear soluciones nutricionales innovadoras y adaptadas.",
            },
            {
                title: "Impacto",
                description: "Buscar resultados concretos y medibles para mejorar realmente las vidas.",
            },
            {
                title: "Inclusividad",
                description: "Asegurar que cada voz cuente y que los beneficios sean compartidos por todos.",
            },
        ],
    },
};

export default function MissionValuesSection() {
    const { language } = useLanguage();
    const t = translations[language];

    // Icons array matching the values order
    const icons = [FaBalanceScale, FaLightbulb, FaRocket, FaUsers];

    return (
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white py-24 px-6">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
                        {t.title}
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
                </motion.div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-10 md:p-14 mb-24 border border-gray-700 shadow-2xl relative"
                >
                    <FaGlobe className="absolute top-6 right-6 text-gray-700 text-6xl opacity-20" />
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-4xl shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                                <FaHandHoldingHeart />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-semibold mb-4 text-white">{t.missionTitle}</h3>
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                                "{t.missionText}"
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Values Grid */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-white mb-10">{t.valuesTitle}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.values.map((value, index) => {
                        const Icon = icons[index];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300 group shadow-lg"
                            >
                                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-3xl text-gray-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                                    <Icon />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{value.title}</h4>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
