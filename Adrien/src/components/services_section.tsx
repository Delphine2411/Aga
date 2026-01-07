"use client";

import { useState } from "react"; // Ajouté
import { FaFlask, FaChartLine, FaUsers, FaTruck, FaBullhorn, FaBriefcase, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Ajouté AnimatePresence
import Link from "next/link";
import { useLanguage } from "@/src/components/contexts/language_context";

const translations = {
  fr: {
    sectionTitle: "Mon expertise",
    button: "En savoir plus",
    services: [
      {
        title: "Développement d’entreprises de nutrition et assistance technique",
        description:
          "J'accompagne le développement de votre entreprise de nutrition grâce à une expertise technique pointue. De la formulation de produits à la conformité réglementaire, je vous aide à bâtir des solutions durables, performantes et adaptées au marché.",
        stats: ["53 PME agroalimentaires assistées techniquement", "10 Projets d'assistance technique coordonnés"]
      },
      {
        title: "Données, impact et gestion de projets",
        description:
          "Je transforme vos données en levier de performance et d'impact. Grâce à une gestion de projet rigoureuse, je pilote vos initiatives pour maximiser leur efficacité et mesurer concrètement leurs retombées sur le terrain.",
        stats: ["5 Rapports d'impact de projet", "3 Projets gérés"]
      },
      {
        title: "Entrepreneuriat des jeunes et des femmes",
        description:
          "Je soutiens l'essor entrepreneurial des jeunes et des femmes par des programmes d'accompagnement sur mesure. En renforçant leur leadership et leurs compétences, je contribue à créer des opportunités économiques inclusives et durables.",
        stats: ["156 Jeunes initiés à l'entrepreneuriat innovant et inclusif", "3 Programmes d'entrepreneuriat conçus", "44 AGR renforcées"]
      },
      {
        title: "Plaidoyer, partenariats et engagement du secteur privé",
        description:
          "Je catalyse le changement en bâtissant des partenariats solides entre le public et le privé. Par un plaidoyer ciblé, je mobilise les parties prenantes pour influencer les politiques et maximiser l'impact sur la nutrition.",
        stats: ["170 PME engagées dans la nutrition", "1 Stratégie d'engagement du secteur privé élaborée", "20 Partenariats facilités"]
      },
      {
        title: "Distribution du dernier kilomètre et systèmes d’approvisionnement en aliments nutritifs",
        description:
          "Je structure des systèmes d'approvisionnement efficaces pour rendre les aliments nutritifs accessibles à tous. Mon expertise en distribution du dernier kilomètre garantit que les produits atteignent les populations qui en ont le plus besoin.",
        stats: ["3 Réseaux de distribution du dernier kilomètre installés", "172 Détaillants du dernier kilomètre accompagnés"]
      },
      {
        title: "Recherche et développement (R&D) en aliments nutritifs, environnement alimentaire, politiques alimentaires et nutrition humaine",
        description:
          "Je pilote la R&D pour concevoir des aliments à haute valeur nutritionnelle et analyser les environnements alimentaires. Mes travaux guident l'élaboration de politiques publiques et de stratégies nutritionnelles fondées sur la science.",
        stats: ["12 Aliments nutritifs développés", "5 Guides techniques élaborés", "2 Notes de politique élaborées", "5 Articles scientifiques publiés"]
      },
    ],
  },
  en: {
    sectionTitle: "My Expertise",
    button: "Read More",
    services: [
      {
        title: "Nutritional Enterprise Development & Technical Assistance",
        description:
          "I support the development of your nutritional business with specialized technical expertise. From product formulation to regulatory compliance, I help you build sustainable, high-performing market-ready solutions.",
        stats: ["53 Agrifood SMEs technically assisted", "10 Coordinated technical assistance projects"]
      },
      {
        title: "Data, Impact & Project Management",
        description:
          "I turn your data into drivers for performance and impact. Through rigorous project management, I steer your initiatives to maximize efficiency and measure concrete ground-level outcomes.",
        stats: ["5 Project impact reports", "3 Managed projects"]
      },
      {
        title: "Youth & Women Entrepreneurship",
        description:
          "I support the entrepreneurial rise of youth and women through tailored coaching programs. By strengthening leadership and skills, I help create inclusive and sustainable economic opportunities.",
        stats: ["156 Youth introduced to innovative entrepreneurship", "Entrepreneurship programs designed: 3", "Income-generating activities reinforced: 44"]
      },
      {
        title: "Advocacy, Partnerships & Private Sector Engagement",
        description:
          "I catalyze change by building solid public-private partnerships. Through targeted advocacy, I mobilize stakeholders to influence policies and maximize nutritional impact.",
        stats: ["170 SMEs engaged in nutrition", "Private sector engagement strategies developed: 1", "Facilitated partnerships: 20"]
      },
      {
        title: "Last Mile Distribution & Nutritious Food Supply Systems",
        description:
          "I structure efficient supply systems to make nutritious food accessible to all. My last-mile distribution expertise ensures products reach the populations that need them most.",
        stats: ["3 Last-mile distribution networks installed", "172 Last-mile retailers supported"]
      },
      {
        title: "R&D in Nutritious Foods, Food Environments & Policy",
        description:
          "I lead R&D to design high-value nutritional foods and analyze food environments. My work guides the creation of science-based public policies and nutrition strategies.",
        stats: ["12 Nutritious foods developed", "5 Technical guides produced", "2 Policy briefs developed", "5 Scientific articles published"]
      },
    ],
  },
  es: {
    sectionTitle: "Mi Experiencia",
    button: "Leer más",
    services: [
      {
        title: "Desarrollo de Empresas Nutricionales y Asistencia Técnica",
        description:
          "Apoyo el desarrollo de su empresa nutricional con experiencia técnica especializada. Desde la formulación de productos hasta el cumplimiento normativo, le ayudo a construir soluciones sostenibles, eficaces y adaptadas al mercado.",
        stats: ["53 PYMES agroalimentarias con asistencia técnica", "10 Proyectos de asistencia técnica coordinados"]
      },
      {
        title: "Datos, Impacto y Gestión de Proyectos",
        description:
          "Transformo sus datos en motores de rendimiento e impacto. Gracias a una gestión de proyectos rigurosa, dirijo sus iniciativas para maximizar la eficacia y medir los resultados concretos en el terreno.",
        stats: ["5 Informes de impacto de proyecto", "3 Proyectos gestionados"]
      },
      {
        title: "Emprendimiento de Jóvenes y Mujeres",
        description:
          "Apoyo el auge empresarial de jóvenes y mujeres mediante programas de acompañamiento a medida. Al fortalecer el liderazgo y las competencias, contribuyo a créer oportunidades económicas inclusivas y sostenibles.",
        stats: ["156 Jóvenes iniciados en emprendimiento innovador", "3 Programas de emprendimiento diseñados", "44 Actividades generadoras de ingresos reforzadas"]
      },
      {
        title: "Abogacía, Alianzas y Compromiso del Sector Privado",
        description:
          "Catalizo el cambio construyendo alianzas sólidas entre los sectores público y privado. A través de una abogacía dirigida, movilizo a las partes interesadas para influir en las políticas y maximizar el impacto nutricional.",
        stats: ["170 PYMES comprometidas con la nutrición", "Estrategia de compromiso del sector privado elaborada: 1", "Alianzas facilitadas: 20"]
      },
      {
        title: "Distribución de Última Milla y Sistemas de Suministro",
        description:
          "Estructuro sistemas de suministro eficientes para hacer accesibles los alimentos nutritivos a todos. Mi experiencia en distribución de última milla garantiza que los productos lleguen a las poblaciones que más los necesitan.",
        stats: ["3 Redes de distribución de última milla instaladas", "172 Minoristas de última milla acompañados"]
      },
      {
        title: "I+D en Alimentos Nutritivos, Entornos y Políticas Alimentarias",
        description:
          "Dirijo la I+D para diseñar alimentos de alto valor nutricional et analizar entornos alimentarios. Mis trabajos guían la elaboración de políticas públicas y estrategias nutricionales basadas en la ciencia.",
        stats: ["12 Alimentos nutritivos desarrollados", "5 Guías técnicas elaboradas", "2 Notas de política elaboradas", "5 Artículos científicos publicados"]
      },
    ],
  },
};



export default function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const icons = [FaBriefcase, FaChartLine, FaUsers, FaBullhorn, FaTruck, FaFlask];
  // Fonction pour styliser les chiffres dynamiquement
  const formatStat = (text: string) => {
    const parts = text.split(/(\d+)/); // Découpe le texte au niveau des chiffres
    return parts.map((part, i) =>
      /\d+/.test(part) ? (
        <span key={i} className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mr-2">
          {part}
        </span>
      ) : (
        <span key={i} className="text-gray-200 text-lg font-medium">{part}</span>
      )
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 py-20 px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-4xl font-bold bg-clip-text text-blue-500 bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          {t.sectionTitle}
        </h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {t.services.map((service, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, rotateY: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: index * 0.2, type: "spring" }}
              whileHover={{
                rotateY: 10,
                scale: 1.05,
                boxShadow: "0px 0px 40px rgba(14, 158, 241, 0.3)",
              }}
              className="bg-gray-900/50 p-8 rounded-2xl border border-blue-500 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex flex-col text-center"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 flex items-center justify-center bg-[#1a0f3d] rounded-full shadow-inner"
                >
                  <Icon size={40} className="text-blue-500" />
                </motion.div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-blue-500">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

              <div className="mt-auto">
                <motion.button
                  onClick={() => setSelectedService(index)}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(14, 158, 241, 0.6)" }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-black font-semibold rounded-full shadow-lg transition-all"
                >
                  {t.button}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MODALE */}
      <AnimatePresence>
        {selectedService !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md "
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`
    relative bg-gray-900 border-2 border-blue-500 p-8 rounded-3xl max-w-lg w-full 
    shadow-[0_0_50px_rgba(59,130,246,0.5)] 
    max-h-[75vh] overflow-y-auto 
    
    /* Style de la barre de scroll */
    scrollbar-thin 
    scrollbar-thumb-gray-400 
    scrollbar-track-gray-800
    
    /* Largeur de la barre */
    [&::-webkit-scrollbar]:w-2
    
    /* Track (Fond) */
    [&::-webkit-scrollbar-track]:bg-gray-800
    [&::-webkit-scrollbar-track]:rounded-full

    /* Thumb (Le curseur) */
    [&::-webkit-scrollbar-thumb]:bg-gray-400
    [&::-webkit-scrollbar-thumb]:rounded-full
    
    /* ASTUCE : On ajoute une bordure de la couleur du fond en haut et en bas 
       pour réduire visuellement la hauteur du curseur */
    [&::-webkit-scrollbar-thumb]:border-y-[20px] 
    [&::-webkit-scrollbar-thumb]:border-x-0
    [&::-webkit-scrollbar-thumb]:border-solid
    [&::-webkit-scrollbar-thumb]:border-gray-900
    
    /* Optionnel : couleur au survol */
    hover:[&::-webkit-scrollbar-thumb]:bg-blue-500
  `}           >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <FaTimes size={24} />
              </button>

              <h3 className="text-2xl font-bold text-blue-500 mb-6">{t.services[selectedService].title}</h3>

              <div className="space-y-6">
                {t.services[selectedService].stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10"
                  >
                    <div className="flex flex-wrap items-baseline">
                      {formatStat(stat)}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Link href="/contact" onClick={() => setSelectedService(null)}>
                  <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-gray-200 font-bold rounded-full transition-all">
                    Me contacter
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}