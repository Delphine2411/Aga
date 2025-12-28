"use client";

import { FaFlask, FaChartLine, FaUsers, FaTruck, FaBullhorn, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

const translations = {
  fr: {
    sectionTitle: "Qu'est-ce que je fais?",
    button: "En savoir plus",
    services: [
      {
        title: "Développement d’entreprises nutritionnelles et assistance technique",
        description:
          "J'accompagne le développement de votre entreprise nutritionnelle grâce à une expertise technique pointue. De la formulation de produits à la conformité réglementaire, je vous aide à bâtir des solutions durables, performantes et adaptées au marché.",
      },
      {
        title: "Données, impact et gestion de projets",
        description:
          "Je transforme vos données en levier de performance et d'impact. Grâce à une gestion de projet rigoureuse, je pilote vos initiatives pour maximiser leur efficacité et mesurer concrètement leurs retombées sur le terrain.",
      },
      {
        title: "Entrepreneuriat des jeunes et des femmes",
        description:
          "Je soutiens l'essor entrepreneurial des jeunes et des femmes par des programmes d'accompagnement sur mesure. En renforçant leur leadership et leurs compétences, je contribue à créer des opportunités économiques inclusives et durables.",
      },
      {
        title: "Plaidoyer, partenariats et engagement du secteur privé",
        description:
          "Je catalyse le changement en bâtissant des partenariats solides entre le public et le privé. Par un plaidoyer ciblé, je mobilise les parties prenantes pour influencer les politiques et maximiser l'impact sur la nutrition.",
      },
      {
        title: "Distribution du dernier kilomètre et systèmes d’approvisionnement en aliments nutritifs",
        description:
          "Je structure des systèmes d'approvisionnement efficaces pour rendre les aliments nutritifs accessibles à tous. Mon expertise en distribution du dernier kilomètre garantit que les produits atteignent les populations qui en ont le plus besoin.",
      },
      {
        title: "Recherche et développement (R&D) en aliments nutritifs, environnement alimentaire, politiques alimentaires et nutrition humaine",
        description:
          "Je pilote la R&D pour concevoir des aliments à haute valeur nutritionnelle et analyser les environnements alimentaires. Mes travaux guident l'élaboration de politiques publiques et de stratégies nutritionnelles fondées sur la science.",
      },
    ],
  },
  en: {
    sectionTitle: "What I’ll do for you",
    button: "Read More",
    services: [
      {
        title: "Nutritional Enterprise Development & Technical Assistance",
        description:
          "I support the development of your nutritional business with specialized technical expertise. From product formulation to regulatory compliance, I help you build sustainable, high-performing market-ready solutions.",
      },
      {
        title: "Data, Impact & Project Management",
        description:
          "I turn your data into drivers for performance and impact. Through rigorous project management, I steer your initiatives to maximize efficiency and measure concrete ground-level outcomes.",
      },
      {
        title: "Youth & Women Entrepreneurship",
        description:
          "I support the entrepreneurial rise of youth and women through tailored coaching programs. By strengthening leadership and skills, I help create inclusive and sustainable economic opportunities.",
      },
      {
        title: "Advocacy, Partnerships & Private Sector Engagement",
        description:
          "I catalyze change by building solid public-private partnerships. Through targeted advocacy, I mobilize stakeholders to influence policies and maximize nutritional impact.",
      },
      {
        title: "Last Mile Distribution & Nutritious Food Supply Systems",
        description:
          "I structure efficient supply systems to make nutritious food accessible to all. My last-mile distribution expertise ensures products reach the populations that need them most.",
      },
      {
        title: "R&D in Nutritious Foods, Food Environments & Policy",
        description:
          "I lead R&D to design high-value nutritional foods and analyze food environments. My work guides the creation of science-based public policies and nutrition strategies.",
      },
    ],
  },
  es: {
    sectionTitle: "Lo que haré por ti",
    button: "Leer más",
    services: [
      {
        title: "Desarrollo de Empresas Nutricionales y Asistencia Técnica",
        description:
          "Apoyo el desarrollo de su empresa nutricional con experiencia técnica especializada. Desde la formulación de productos hasta el cumplimiento normativo, le ayudo a construir soluciones sostenibles, eficaces y adaptadas al mercado.",
      },
      {
        title: "Datos, Impacto y Gestión de Proyectos",
        description:
          "Transformo sus datos en motores de rendimiento e impacto. Gracias a una gestión de proyectos rigurosa, dirijo sus iniciativas para maximizar la eficacia y medir los resultados concretos en el terreno.",
      },
      {
        title: "Emprendimiento de Jóvenes y Mujeres",
        description:
          "Apoyo el auge empresarial de jóvenes y mujeres mediante programas de acompañamiento a medida. Al fortalecer el liderazgo y las competencias, contribuyo a crear oportunidades económicas inclusivas y sostenibles.",
      },
      {
        title: "Abogacía, Alianzas y Compromiso del Sector Privado",
        description:
          "Catalizo el cambio construyendo alianzas sólidas entre los sectores público y privado. A través de una abogacía dirigida, movilizo a las partes interesadas para influir en las políticas y maximizar el impacto nutricional.",
      },
      {
        title: "Distribución de Última Milla y Sistemas de Suministro",
        description:
          "Estructuro sistemas de suministro eficientes para hacer accesibles los alimentos nutritivos a todos. Mi experiencia en distribución de última milla garantiza que los productos lleguen a las poblaciones que más los necesitan.",
      },
      {
        title: "I+D en Alimentos Nutritivos, Entornos y Políticas Alimentarias",
        description:
          "Dirijo la I+D para diseñar alimentos de alto valor nutricional y analizar entornos alimentarios. Mis trabajos guían la elaboración de políticas públicas y estrategias nutricionales basadas en la ciencia.",
      },
    ],
  },
};

export default function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const icons = [
    FaBriefcase,   // 1. Business Dev
    FaChartLine,   // 2. Data/Impact
    FaUsers,       // 3. Women/Youth
    FaBullhorn,    // 4. Advocacy
    FaTruck,       // 5. Distribution
    FaFlask        // 6. R&D
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="lg:text-4xl text-3xl font-bold mt-2 text-blue-500">{t.sectionTitle}</h2>
      </div>

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

              {/* ✅ Bouton poussé en bas */}
              <div className="mt-auto">
                <Link href="/contact">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(14, 158, 241, 0.6)",
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-black font-semibold rounded-full shadow-lg hover:bg-blue-400 transition-all"
                  >
                    {t.button}
                  </motion.button>
                </Link>
              </div>
            </motion.div>

          );
        })}
      </div>
    </section>
  );
}
