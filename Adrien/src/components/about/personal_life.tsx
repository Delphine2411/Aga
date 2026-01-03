"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context";
import { FaHeart, FaStar, FaUsers } from "react-icons/fa";

export default function PersonalLifeSection() {
    const { language } = useLanguage();

    const texts = {
        fr: {
            title: "Vie Spirituelle",
            items: [
                {
                    icon: <FaStar className="w-8 h-8 text-rose-500" />,
                    title: "Foi & Spiritualité",
                    desc: "Disciple de Jésus-Christ et étudiant à Charis Bible College.",
                },
            ],
        },
        en: {
            title: "Spiritual Life",
            items: [
                {
                    icon: <FaStar className="w-8 h-8 text-rose-500" />,
                    title: "Faith & Spirituality",
                    desc: "Disciple of Jesus Christ and student at Charis Bible College.",
                },
            ],
        },
        es: {
            title: "Vida Espiritual",
            items: [
                {
                    icon: <FaStar className="w-8 h-8 text-rose-500" />,
                    title: "Fe y Espiritualidad",
                    desc: "Discípulo de Jesucristo y estudiante en Charis Bible College.",
                },
            ],
        },
    };

    const content = texts[language as keyof typeof texts] || texts.en;

    return (
        <section className="relative bg-black py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {content.title.split(" ")[0]}{" "}
                        <span className="text-rose-500">
                            {content.title.replace(content.title.split(" ")[0], "")}
                        </span>
                    </h3>
                    <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full" />
                </motion.div>

                <div className="">
                    {content.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] hover:border-rose-500/30 transition-all group relative overflow-hidden text-center"
                        >
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors" />

                            <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>

                            <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-rose-400 transition-colors">
                                {item.title}
                            </h4>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
