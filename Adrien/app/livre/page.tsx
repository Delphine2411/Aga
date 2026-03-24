"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../src/components/navbar";
import { FaWhatsapp, FaGlobe } from "react-icons/fa";
import { useLanguage } from "../../src/components/contexts/language_context";

interface SalesPitchItem {
  type: "highlight" | "text" | "heading" | "list";
  content: string | string[];
}

interface LanguageContent {
  heroTitle: string;
  bookTitle: string;
  bookSubtitle: string;
  ctaPrimary: string;
  ctaWhatsapp: string;
  publisher: string;
  authorTitle: string;
  bookDescriptionTitle: string;
  authorBio: string;
  bookDescription: string[];
  salesPitch: SalesPitchItem[];
  contactInfo: string;
}

const translations: Record<string, LanguageContent> = {
  fr: {
    heroTitle: "À paraître",
    bookTitle: "La République Nouvelle",
    bookSubtitle: "Essai, de Aga Adrien DOGO",
    ctaPrimary: "Acheter sur le site",
    ctaWhatsapp: "Commander via WhatsApp",
    publisher: "Editions Essaim Plumes",
    authorTitle: "L'Auteur",
    bookDescriptionTitle: "Description du livre",
    authorBio: "Aga Adrien Dogo est né le 27 février 1996 à Tchetti (Savalou), en République du Bénin. Il est agent de développement international et acteur engagé dans la transformation socio-économique de l'Afrique subsaharienne. Passionné par l'innovation, l'entrepreneuriat et la gouvernance, il s'impose comme une voix lucide et déterminée en faveur de la renaissance et de l'émancipation du continent.",
    bookDescription: [
      "Dans cet essai engagé, Aga Adrien Dogo interroge l’héritage institutionnel de la colonisation et les dérives des indépendances africaines, marquées par une démocratie importée source de dépendance et d’instabilité.",
      "Face à ces impasses, il propose un nouveau modèle de gouvernance fondée sur les valeurs et les réalités africaines, pour restaurer la souveraineté, refonder la participation citoyenne et promouvoir un développement équitable.",
      "Il appelle la jeunesse africaine à bâtir un modèle politique authentique et à porter la renaissance du continent."
    ],
    salesPitch: [
      { type: "highlight", content: "Et si l’Afrique arrêtait enfin de copier pour commencer à diriger ?" },
      { type: "text", content: "Depuis des décennies, l’Afrique avance avec des systèmes hérités de la colonisation. Des modèles politiques importés, souvent déconnectés de nos réalités." },
      { type: "text", content: "Résultat ? Des États fragiles, une dépendance persistante, et une instabilité qui freine notre véritable potentiel." },
      { type: "heading", content: "Ce que cela coûte vraiment" },
      { type: "text", content: "Chaque jour, cette situation nous éloigne un peu plus de notre souveraineté. Elle étouffe l’innovation, affaiblit la participation citoyenne et maintient une jeunesse brillante… en attente." },
      { type: "text", content: "Une question se pose alors : Combien de temps allons-nous continuer à subir un modèle qui ne nous correspond pas ?" },
      { type: "heading", content: "La solution : LA RÉPUBLIQUE NOUVELLE" },
      { type: "text", content: "Ce livre n’est pas un simple essai. C’est une vision. Une rupture. Un appel." },
      { type: "text", content: "Une nouvelle manière de penser la gouvernance africaine, basée sur nos valeurs, nos réalités, notre identité." },
      { type: "heading", content: "Ce que vous allez découvrir" },
      { type: "list", content: [
          "Comment restaurer la souveraineté africaine de manière concrète",
          "Comment refonder la participation citoyenne pour redonner le pouvoir au peuple",
          "Comment bâtir un système capable de générer un développement équitable et durable",
          "Pourquoi la jeunesse est la clé de la renaissance du continent"
      ]},
      { type: "heading", content: "Pourquoi ce livre est différent" },
      { type: "text", content: "Parce qu’il ne se contente pas de critiquer. Il propose une voie." },
      { type: "text", content: "Une vision claire, lucide et engagée, portée par une compréhension profonde des enjeux africains actuels." },
      { type: "heading", content: "Le moment d’agir, c’est maintenant" },
      { type: "text", content: "L’Afrique de demain ne se construira pas sans toi." },
      { type: "text", content: "Si tu veux comprendre. Si tu veux agir. Si tu veux faire partie de ceux qui bâtissent un nouveau modèle…" },
      { type: "highlight", content: "👉 Alors ce livre est pour toi. Achète le maintenant" },
      { type: "highlight", content: "📖 Prends ta place dans la renaissance africaine. Lis La République Nouvelle dès aujourd’hui." }
    ],
    contactInfo: "Contactez l'éditeur pour plus d'informations."
  },
  en: {
    heroTitle: "Forthcoming",
    bookTitle: "The New Republic",
    bookSubtitle: "Essay, by Aga Adrien DOGO",
    ctaPrimary: "Buy on Website",
    ctaWhatsapp: "Order via WhatsApp",
    publisher: "Essaim Plumes Editions",
    authorTitle: "The Author",
    bookDescriptionTitle: "Book Description",
    authorBio: "Aga Adrien Dogo was born on February 27, 1996, in Tchetti (Savalou), Benin. He is an international development agent and an active player in the socio-economic transformation of sub-Saharan Africa. Passionate about innovation, entrepreneurship, and governance, he stands out as a voice for the continent's rebirth and emancipation.",
    bookDescription: [
      "In this committed essay, Aga Adrien Dogo questions the institutional heritage of colonization and the pitfalls of African independence, marked by an imported democracy that is a source of dependence and instability.",
      "Faced with these dead ends, he proposes a new model of governance based on African values and realities, to restore sovereignty, rebuild citizen participation, and promote equitable development.",
      "He calls on African youth to build an authentic political model and to carry the continent's rebirth."
    ],
    salesPitch: [
      { type: "highlight", content: "What if Africa finally stopped copying and started leading?" },
      { type: "text", content: "For decades, Africa has been moving forward with systems inherited from colonization. Imported political models, often disconnected from our realities." },
      { type: "text", content: "The result? Fragile states, persistent dependency, and instability that holds back our true potential." },
      { type: "heading", content: "What it really costs" },
      { type: "text", content: "Every day, this situation takes us a step further away from our sovereignty. It stifles innovation, weakens citizen participation, and keeps a brilliant youth... waiting." },
      { type: "text", content: "A question then arises: How long are we going to continue to suffer from a model that does not suit us?" },
      { type: "heading", content: "The solution: THE NEW REPUBLIC" },
      { type: "text", content: "This book is not a simple essay. It is a vision. A rupture. A call." },
      { type: "text", content: "A new way of thinking about African governance, based on our values, our realities, our identity." },
      { type: "heading", content: "What you will discover" },
      { type: "list", content: [
          "How to restore African sovereignty in a concrete way",
          "How to rebuild citizen participation to give power back to the people",
          "How to build a system capable of generating equitable and sustainable development",
          "Why youth is the key to the continent's renaissance"
      ]},
      { type: "heading", content: "Why this book is different" },
      { type: "text", content: "Because it doesn't just criticize. It proposes a way." },
      { type: "text", content: "A clear, lucid, and committed vision, driven by a deep understanding of current African issues." },
      { type: "heading", content: "The time to act is now" },
      { type: "text", content: "Tomorrow's Africa will not be built without you." },
      { type: "text", content: "If you want to understand. If you want to act. If you want to be part of those who build a new model…" },
      { type: "highlight", content: "👉 Then this book is for you. Buy it now" },
      { type: "highlight", content: "📖 Take your place in the African renaissance. Read The New Republic today." }
    ],
    contactInfo: "Contact the publisher for more information."
  },
  es: {
    heroTitle: "Próximamente",
    bookTitle: "La Nueva República",
    bookSubtitle: "Ensayo, de Aga Adrien DOGO",
    ctaPrimary: "Comprar en el sitio web",
    ctaWhatsapp: "Pedir por WhatsApp",
    publisher: "Ediciones Essaim Plumes",
    authorTitle: "El Autor",
    bookDescriptionTitle: "Descripción del libro",
    authorBio: "Aga Adrien Dogo nació el 27 de febrero de 1996 en Tchetti (Savalou), en la República de Benín. Es agente de desarrollo internacional y actor comprometido en la transformación socioeconómica del África subsahariana. Apasionado por la innovación, el espíritu empresarial y la gobernanza, se impone como una voz lúcida y decidida a favor del renacimiento y la emancipación del continente.",
    bookDescription: [
      "En este ensayo comprometido, Aga Adrien Dogo cuestiona el legado institucional de la colonización y las derivas de las independencias africanas, marcadas por una democracia importada que es fuente de dependencia e inestabilidad.",
      "Frente a estos callejones sin salida, propone un nuevo modelo de gobernanza basado en los valores y las realidades africanas, para restaurar la soberanía, refundar la participación ciudadana y promover un desarrollo equitativo.",
      "Hace un llamado a la juventud africana para construir un modelo político auténtico y liderar el renacimiento del continente."
    ],
    salesPitch: [
      { type: "highlight", content: "¿Y si África finalmente dejara de copiar y comenzara a dirigir?" },
      { type: "text", content: "Durante décadas, África ha avanzado con sistemas heredados de la colonización. Modelos políticos importados, a menudo desconectados de nuestras realidades." },
      { type: "text", content: "¿El resultado? Estados frágiles, dependencia persistente e inestabilidad que frena nuestro verdadero potencial." },
      { type: "heading", content: "Lo que realmente cuesta" },
      { type: "text", content: "Cada día, esta situación nos aleja un poco más de nuestra soberanía. Sofoca la innovación, debilita la participación ciudadana y mantiene a una juventud brillante… en espera." },
      { type: "text", content: "Entonces surge una pregunta: ¿Cuánto tiempo vamos a seguir sufriendo un modelo que no nos corresponde?" },
      { type: "heading", content: "La solución: LA NUEVA REPÚBLICA" },
      { type: "text", content: "Este libro no es un simple ensayo. Es una visión. Una ruptura. Un llamado." },
      { type: "text", content: "Una nueva forma de pensar la gobernanza africana, basada en nuestros valores, nuestras realidades, nuestra identidad." },
      { type: "heading", content: "Lo que vas a descubrir" },
      { type: "list", content: [
          "Cómo restaurar la soberanía africana de manera concreta",
          "Cómo refundar la participación ciudadana para devolver el poder al pueblo",
          "Cómo construir un sistema capaz de generar un desarrollo equitativo y sostenible",
          "Por qué la juventud es la clave del renacimiento del continente"
      ]},
      { type: "heading", content: "Por qué este libro es diferente" },
      { type: "text", content: "Porque no se limita a criticar. Propone un camino." },
      { type: "text", content: "Una visión clara, lúcida y comprometida, impulsada por una comprensión profunda de los problemas africanos actuales." },
      { type: "heading", content: "El momento de actuar es ahora" },
      { type: "text", content: "El África del mañana no se construirá sin ti." },
      { type: "text", content: "Si quieres entender. Si quieres actuar. Si quieres ser parte de quienes construyen un nuevo modelo…" },
      { type: "highlight", content: "👉 Entonces este libro es para ti. Cómpralo ahora" },
      { type: "highlight", content: "📖 Toma tu lugar en el renacimiento africano. Lee La Nueva República hoy mismo." }
    ],
    contactInfo: "Contacte al editor para más información."
  }
};

export default function BookPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.fr;

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        {/* Title Section (Above Book) */}
        <section className="mb-12 text-center md:text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold tracking-wider uppercase border border-blue-500/20 mb-4">
              {t.heroTitle}
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-none italic mb-4">
              {t.bookTitle}
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
              {t.bookSubtitle}
            </h2>
          </motion.div>
        </section>


        {/* Hero Section: Book + Pitch Card */}
        <section className="flex flex-col md:flex-row gap-16 items-start mb-12">
          {/* Left Column: Book Image */}
          <div className="w-full md:w-3/5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group w-full flex flex-col"
            >
              <div className="flex flex-col mb-12 sm:flex-row gap-6 w-full max-w-4xl px-4">
            <Link href="https://www.editionsessaimplumes.org" target="_blank" className="flex-1">
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-black rounded-2xl text-xl shadow-2xl flex items-center justify-center gap-3 transition-all"
              >
                <FaGlobe className="text-2xl" /> {t.ctaPrimary}
              </motion.button>
            </Link>
            <Link href="https://wa.me/22995802007" target="_blank" className="flex-1">
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(34, 197, 94, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-green-600 text-white font-black rounded-2xl text-xl shadow-2xl flex items-center justify-center gap-3 transition-all"
              >
                <FaWhatsapp className="text-xl" /> {t.ctaWhatsapp}
              </motion.button>
            </Link>
          </div>
              <div className="absolute flex flex-col -inset-12 bg-white/40 rounded-full blur-[100px] opacity-50 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
              <Image 
                src="/image/livre.png" 
                alt={t.bookTitle} 
                width={1200} 
                height={1300} 
                className="relative rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.6)] object-contain hover:scale-105 transition-transform duration-700 cursor-pointer w-full h-auto max-w-2xl"
              />

                  {/* Description below everything */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl py-12 space-y-8 text-center bg-gradient-to-r from-blue-600/30 to-pink-600/30"
          >
            <h3 className="text-3xl font-bold text-blue-500 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-blue-500" /> {t.bookDescriptionTitle} <span className="h-px w-12 bg-blue-500" />
            </h3>
            <div className="space-y-6 text-justify text-gray-300 text-lg md:text-xl leading-relaxed italic border-x border-white/5 px-8 md:px-16">
              {t.bookDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            
          </motion.div>
            </motion.div>
         
          </div>

          {/* Right Column: Sales Pitch (Le texte à droite) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-2/5"
          >
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-pink-500" />
              <div className="space-y-4">
                {t.salesPitch.map((item, i) => {
                  if (item.type === "highlight") {
                    const isPurchaseCTA = typeof item.content === 'string' && item.content.includes("Lis La République Nouvelle");
                    return (
                      <div key={i} className="space-y-3 pt-4 border-t border-white/5 first:border-t-0 first:pt-0">
                        {isPurchaseCTA && (
                          <Link href="https://www.editionsessaimplumes.org" target="_blank" className="inline-block">
                            <motion.button 
                              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full text-sm shadow-lg flex items-center gap-2 mb-2"
                            >
                              <FaGlobe /> {t.ctaPrimary}
                            </motion.button>
                          </Link>
                        )}
                        <p className="text-blue-400 font-bold italic text-lg leading-tight">{item.content}</p>
                      </div>
                    );
                  }
                  if (item.type === "heading") {
                    return <h4 key={i} className="text-pink-400 font-black tracking-wider uppercase text-sm pt-4">{item.content}</h4>;
                  }
                  if (item.type === "list") {
                    return (
                      <ul key={i} className="space-y-2 pl-4 border-l border-white/10">
                        {(item.content as string[]).map((li, j) => (
                          <li key={j} className="text-gray-400 text-sm flex gap-2">
                            <span className="text-blue-500">•</span> {li}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="text-gray-300 text-sm leading-relaxed">{item.content} </p> ;
                })}
              </div>
            </div>
          </motion.div>
        </section>

       
      </div>

     
    </main>
  );
}
