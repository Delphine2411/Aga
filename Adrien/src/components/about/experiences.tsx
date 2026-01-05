"use client";

import { useState } from "react";
import { motion , AnimatePresence } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context";
import { useEffect } from "react";

// Liste des images pour le fond
const backgroundImages = [
  "/image/bg1.jpg",
  "/image/bg2.jpg",
  "/image/bg3.jpg",
];

export default function ExperienceSection() {
  type Language = "fr" | "en" | "es";
  //const { language } = useLanguage();
  
  interface Experience {
    year: string;
    title: string;
    company: string;
    description?: string;
    tasks: string[];
  }

  const texts: Record<Language, { title: string; markerTitle: string; experiences: Experience[] }> = {
    fr: {
      title: "Expériences Professionnelles",
      markerTitle: "Expérience",
      experiences: [
        {
          year: "Mars 2024 - À ce jour",
          title: "Associé Principal Assistance technique et mesure d’impact",
          company: "Global Alliance for Improved Nutrition (GAIN), Bénin",
          tasks: [
            "Responsable du développement du pipeline de PME en Afrique de l’Ouest et Centrale",
            "Développer et entretenir une communication active avec un réseau d’organisations de soutien aux entreprises (OSE)",
            "Prospecter et identifier des PME opérant dans les chaînes de valeur des aliments nutritifs",
            "Valider le profil nutritionnel des PME utilisant un outil de scoring nutritionnel",
            "Évaluer les besoins en assistance technique des PME en Afrique subsaharienne",
            "Recruter des consultants seniors pour fournir l’assistance technique dans 10 domaines clés",
            "Coordonner et assurer la qualité de la prestation d’assistance technique aux PME bénéficiaires",
            "Suivi de l’impact des projets sur l’accès aux aliments nutritifs pour les populations à faibles revenus",
            "Mise en œuvre du plan de suivi-évaluation-apprentissage du programme",
            "Développer des récits de réussite et des études de cas sur l’impact de l’assistance technique"
          ],
        },
        {
          year: "Août - Oct 2025",
          title: "Consultant Principal : Mission d’Assistance technique pour le développement et la planification d’entreprise 2025-20230",
          company: "Société Longue Vie SARL, Abomey-Calavi, Bénin",
          tasks: [
            "Conduire le diagnostic technique, organisationnel et financier de l’entreprise ",
            "Conduire les entretiens et élaborer le plan développement stratégique de l’entreprise",
            "Conduire l’étude de marché au profit de l’entreprise",
            "Elaborer et faire valider le plan d’affaire opérationnel 2025-2030 de l’entreprise",
          ],
        },
        {
          year: "Déc 2023 - Juil 2024",
          title: "Chef de Mission Adjoint - Stratégie Nationale SBN",
          company: "Global Alliance for Improved Nutrition (GAIN), Bénin",
          tasks: [
            "Conception du projet, planification, gestion budgétaire et coordination opérationnelle",
            "Revue de littérature sur l’environnement du secteur privé et les politiques de nutrition",
            "Engagement des PME et du secteur privé dans le Réseau SUN Business Network (SBN)",
            "Formation et supervision de terrain de 5 enquêteurs",
            "Développement d’une base de données en ligne des membres potentiels du SBN Bénin",
            "Cartographie des bailleurs potentiels, OSE et prestataires privés",
            "Co-facilitation des ateliers nationaux de validation de la stratégie nationale SBN",
            "Garantir la qualité des livrables et rapports du projet"
          ],
        },
        {
          year: "Nov - Déc 2023",
          title: "Consultant en Entrepreneuriat",
          company: "OneHope (West Africa Office)",
          tasks: [
            "Développement d'un parcours entrepreneurial pour les étudiants stagiaires",
            "Formation sur : culture entrepreneuriale, agro-industrie innovante, idéation, business model, leadership"
          ],
        },
        {
          year: "Août 2023",
          title: "Consultant Évaluation des besoins OSE",
          company: "Global Alliance for Improved Nutrition (GAIN), Bénin",
          tasks: [
            "Revue de l'outil d'évaluation des besoins",
            "Évaluation de 4 ESO et Incubateurs au Bénin pour des programmes axés sur la nutrition",
            "Analyse des besoins et rédaction du rapport de mission"
          ],
        },
        {
          year: "Juil 2022 - Août 2023",
          title: "Chargé de Programme Entrepreneuriat",
          company: "ONG ABED, Bénin",
          tasks: [
            "Responsable de l’intervention d’ABED en entrepreneuriat des jeunes et des femmes",
            "Pilotage des projets JFAII (Agrobusiness innovant) et WiBIZ (Inclusion numérique des femmes)",
            "Suivi des dynamiques contextuelles et adaptation des activités",
            "Veille à la conformité aux politiques des bailleurs et aux bonnes pratiques",
            "Appui au recrutement des équipes seniors de projets"
          ],
        },
        {
          year: "Oct 2021 - Juin 2022",
          title: "Responsable Suivi-Évaluation, Approvisionnement et Distribution",
          company: "BoPinc, Bénin (Projet BeniBiz)",
          tasks: [
            "Développement stratégique de la distribution du dernier kilomètre d'aliments nutritifs",
            "Analyse du panier de produits nutritifs et suivi du Global Nutrition Score",
            "Digitalisation de la supply chain et gestion des ventes NutriBiz",
            "Implémentation d’innovations de services (mobile money, recharge solaire)",
            "Coordination de la collecte et de l’analyse continue des données",
            "Analyse de performance et programme d’incitation pour les vendeuses"
          ],
        },
        {
          year: "Déc 2020 - Oct 2021",
          title: "Conseiller d’entreprise & Assistant S&E",
          company: "BoPinc, Bénin (Projet BeniBiz)",
          tasks: [
            "Accompagnement d'un plan logistique pour 150 vendeuses de produits nutritifs",
            "Autonomisation de la supply chain et développement des partenariats",
            "Développement de la stratégie marketing et plan de distribution dernier kilomètre",
            "Gestion du tableau de bord des indicateurs et rapports semestriels/annuels"
          ],
        },
        {
          year: "Mars - Déc 2020",
          title: "Conseiller d’entreprise : Approvisionnement & Distribution",
          company: "BoPinc, Bénin (Projet BeniBiz)",
          tasks: [
            "Organisation d'un réseau de distribution dans 3 départements pour 150 femmes NutriBiz",
            "Sélection des produits nutritifs (abordabilité, désirabilité, accessibilité)",
            "Stratégie d'approvisionnement spécifique aux contraintes locales",
            "Plan d'accompagnement financier, matériel et marketing des acteurs du réseau",
            "Appui technique au développement de nouveaux aliments (Projet BeninCaju)"
          ],
        },
        {
          year: "Avril - Déc 2019",
          title: "Consultant associé Assistance Technique PME",
          company: "Technoserve Inc. / Cabinet Réponse, Bénin",
          tasks: [
            "Développement d'un outil d'évaluation technique pour PME agroalimentaires",
            "Diagnostic technique de 25 PME agroalimentaires",
            "Co-développement et animation de formations en technologie alimentaire et marketing",
            "Assistance technique à 17 PME pour l'accès aux marchés"
          ],
        },
        {
          year: "Fév - Juil 2018",
          title: "Assistant technique en Transformation Agroalimentaire",
          company: "Technoserve Inc. Bénin (Projet BeninCajù)",
          tasks: [
            "Évaluation des besoins de 10 PME agroalimentaires",
            "Formation sur la transformation du jus de pomme de cajou",
            "Mise en œuvre d'outils de gestion de la qualité et nouveaux produits à base de cajou",
            "Accompagnement du développement du marché pour 10 PME"
          ],
        },
        {
          year: "Juil 2016 - Déc 2017",
          title: "Associé de projet junior",
          company: "Faculté d'Agronomie, Université de Parakou (R&D MicroVeg)",
          tasks: [
            "Développement de technologies 'Food to food fortification' pour légumes feuilles",
            "Tester les modèles économiques innovants associés ainsi que leur incubation au niveau de l’entreprise.",
            "En charge de la production d'aliments enrichis de légumes",
            "Elaboration de fiches techniques et formation des Organisations Non Gouvernementales partenaires."
          ],
        },
      ],
    },

    en: {
      title: "Work Experience",
      markerTitle: "Experience",
      experiences: [
        {
          year: "March 2024 - Present",
          title: "Senior Associate Technical Assistance & Impact Measurement",
          company: "Global Alliance for Improved Nutrition (GAIN), Benin",
          tasks: [
            "Responsible for SME pipeline development in West and Central Africa",
            "Build and maintain active communication with Business Support Organizations (BSOs)",
            "Prospect and identify SMEs operating in nutritious food value chains",
            "Validate SME nutritional profiles using nutritional scoring tools",
            "Assess technical assistance needs for SMEs in Sub-Saharan Africa",
            "Lead recruitment of senior consultants for TA in 10 key domains",
            "Coordinate and ensure TA delivery quality for investee SMEs",
            "Monitor project impact on access to nutritious foods for low-income populations",
            "Implement the program monitoring, evaluation, and learning (MEL) plan",
            "Develop success stories and case studies on TA and financing impact"
          ],
        },
        {
          year: "August – October 2025",
          title: "Lead Consultant: Technical Assistance Mission for Business Development and Planning 2025–2030",
          company: "Société Longue Vie SARL, Abomey-Calavi, Benin",
          tasks: [
            "Conduct the technical, organizational, and financial diagnosis of the company",
            "Conduct interviews and develop the company’s strategic development plan",
            "Carry out a market study for the benefit of the company",
            "Develop and validate the company’s operational business plan for 2025–2030",
          ],
        },
        {
          year: "Dec 2023 - July 2024",
          title: "Deputy Chief of Mission - National SBN Strategy",
          company: "Global Alliance for Improved Nutrition (GAIN), Benin",
          tasks: [
            "Project design, planning, budget management, and operational coordination",
            "Literature review on private sector environment and nutrition policies",
            "SME and private sector engagement in SUN Business Network (SBN) Benin",
            "Field training and supervision of 5 surveyors",
            "Development of an online database for potential SBN Benin members",
            "Mapping of potential donors, BSOs, and private providers",
            "Co-facilitation of national workshops for SBN strategy validation",
            "Ensure project deliverables and reports quality"
          ],
        },
        {
          year: "Nov - Dec 2023",
          title: "Entrepreneurship Consultant",
          company: "OneHope (West Africa Office)",
          tasks: [
            "Development of an entrepreneurial pathway for student interns",
            "Training sessions on: startup culture, innovation, business models, leadership"
          ],
        },
        {
          year: "Aug 2023",
          title: "BSO Needs Assessment Consultant",
          company: "Global Alliance for Improved Nutrition (GAIN), Benin",
          tasks: [
            "Review of the needs assessment tool",
            "Needs assessment for 4 BSOs and Incubators in Benin",
            "Needs analysis and drafting of mission report"
          ],
        },
        {
          year: "July 2022 - Aug 2023",
          title: "Entrepreneurship Program Manager",
          company: "ABED NGO, Benin",
          tasks: [
            "Responsible for ABED's youth and women entrepreneurship intervention",
            "Strategic leadership for JFAII (Innovative Agribusiness) and WiBIZ (Women in Tech) projects",
            "Contextual dynamics monitoring and activity adaptation",
            "Ensure compliance with donor policies and best practices",
            "Support recruitment for project senior teams"
          ],
        },
        {
          year: "Oct 2021 - June 2022",
          title: "MEL, Procurement and Distribution Manager",
          company: "BoPinc, Benin (BeniBiz Project)",
          tasks: [
            "Strategic development of last-mile distribution chain for nutritious foods",
            "Product basket analysis and Global Nutrition Score monitoring",
            "Supply chain digitalization and NutriBiz sales management",
            "Implementation of service innovations (mobile money, solar charging)",
            "Coordination of continuous data collection and analysis",
            "Performance analysis and incentive program for NutriBiz ladies"
          ],
        },
        {
          year: "Dec 2020 - Oct 2021",
          title: "Business Advisor & MEL Assistant",
          company: "BoPinc, Benin (BeniBiz Project)",
          tasks: [
            "Local implementation mirroring for 150 nutritious product sellers",
            "Supply chain empowerment and partnership development",
            "Marketing strategy and last-mile distribution plan development",
            "Indicator dashboard management and reporting"
          ],
        },
        {
          year: "March - Dec 2020",
          title: "Business Advisor: Food Supply & Distribution",
          company: "BoPinc, Benin (BeniBiz Project)",
          tasks: [
            "Organization of last-mile distribution network in 3 regions for 150 ladies",
            "Selection of nutritious products (affordability, desirability, accessibility)",
            "Localization-specific supply strategy design",
            "Financial, material, and marketing support plan for network actors",
            "Technical support for new food development (BeninCaju Project)"
          ],
        },
        {
          year: "April - Dec 2019",
          title: "Associate Consultant SME Technical Assistance",
          company: "Technoserve Inc. / Cabinet Réponse, Benin",
          tasks: [
            "Development of technical evaluation tool for agri-SMEs",
            "Technical diagnosis of 25 agri-SMEs",
            "Co-development of food technology and marketing training",
            "Technical assistance for 17 SMEs for market access"
          ],
        },
        {
          year: "Feb - July 2018",
          title: "Agri-food Transformation Technical Assistant",
          company: "Technoserve Inc. Benin (BeninCajù Project)",
          tasks: [
            "Assessment of 10 agri-SME needs",
            "Training on cashew apple juice processing",
            "Quality management tools and cashew-based product development",
            "Market development support for 10 SMEs"
          ],
        },
        {
          year: "July 2016 - Dec 2017",
          title: "Junior Project Associate",
          company: "University of Parakou (R&D MicroVeg)",
          tasks: [
            "Development of 'Food to food fortification' for traditional vegetables",
            "Testing innovative business models and SME incubation",
            "Production of fortified foods and technical datasheets creation"
          ],
        },
      ],
    },

    es: {
      title: "Experiencia Laboral",
      markerTitle: "Experiencia",
      experiences: [
        {
          year: "Marzo 2024 - Presente",
          title: "Asociado Principal Asistencia Técnica y Medición de Impacto",
          company: "Global Alliance for Improved Nutrition (GAIN), Benín",
          tasks: [
            "Responsable del desarrollo de la cartera de PYMES en África Occidental y Central",
            "Desarrollar y mantener comunicación activa con organizaciones de apoyo empresarial (BSO)",
            "Prospectar e identificar PYMES en las cadenas de valor de alimentos nutritivos",
            "Validar perfiles nutricionales de PYMES usando herramientas de puntuación",
            "Evaluar necesidades de asistencia técnica para PYMES en África subsahariana",
            "Liderar el reclutamiento de consultores senior para asistencia técnica",
            "Coordinar y asegurar la calidad de la entrega de asistencia técnica",
            "Monitoreo del impacto en el acceso a alimentos nutritivos",
            "Implementar el plan de monitoreo, evaluación y aprendizaje",
            "Desarrollar historias de éxito y estudios de caso de impacto"
          ],
        },
        {
          year: "Dic 2023 - Jul 2024",
          title: "Jefe de Misión Ajunto - Estrategia Nacional SBN",
          company: "Global Alliance for Improved Nutrition (GAIN), Benín",
          tasks: [
            "Diseño del proyecto, planificación, gestión presupuestaria y coordinación",
            "Revisión de literatura sobre entorno empresarial y políticas de nutrición",
            "Participación de PYMES en la Red de Negocios SUN (SBN) Benín",
            "Capacitación y supervisión de campo de 5 encuestadores",
            "Desarrollo de base de datos en línea para miembros de SBN Benín",
            "Mapeo de donantes potenciales y prestadores privados",
            "Cofacilitación de talleres nacionales para la validación de la estrategia SBN",
            "Garantizar la calidad de los entregables e informes"
          ],
        },
        {
          year: "Agosto – Octubre 2025",
          title: "Consultor Principal: Misión de Asistencia Técnica para el Desarrollo y la Planificación Empresarial 2025–2030",
          company: "Société Longue Vie SARL, Abomey-Calavi, Benín",
          tasks: [
            "Realizar el diagnóstico técnico, organizativo y financiero de la empresa",
            "Conducir entrevistas y elaborar el plan estratégico de desarrollo de la empresa",
            "Realizar el estudio de mercado en beneficio de la empresa",
            "Elaborar y validar el plan de negocio operativo de la empresa para el período 2025–2030",
          ],
        },

        {
          year: "Nov - Dic 2023",
          title: "Consultor de Emprendimiento",
          company: "OneHope (Oficina de África Occidental)",
          tasks: [
            "Desarrollo de una trayectoria emprendedora para estudiantes pasantes",
            "Sesiones sobre: cultura startup, innovación, modelos de negocio, liderazgo"
          ],
        },
        {
          year: "Ago 2023",
          title: "Consultor de Evaluación de Necesidades BSO",
          company: "Global Alliance for Improved Nutrition (GAIN), Benín",
          tasks: [
            "Revisión de la herramienta de evaluación de necesidades",
            "Evaluación de necesidades para 4 BSO e Incubadoras en Benín",
            "Análisis de necesidades y redacción del informe de misión"
          ],
        },
        {
          year: "Jul 2022 - Ago 2023",
          title: "Gerente de Programa de Emprendimiento",
          company: "ONG ABED, Benín",
          tasks: [
            "Responsable de la intervención en emprendimiento juvenil y femenino",
            "Liderazgo estratégico para proyectos JFAII (Agronegocios) y WiBIZ (Mujeres Tech)",
            "Monitoreo de dinámicas contextuales y adaptación de actividades",
            "Asegurar cumplimiento de políticas de donantes y buenas prácticas",
            "Apoyo al reclutamiento de equipos senior de proyectos"
          ],
        },
        {
          year: "Oct 2021 - Jun 2022",
          title: "Responsable de MEL, Adquisición y Distribución",
          company: "BoPinc, Benín (Proyecto BeniBiz)",
          tasks: [
            "Desarrollo estratégico de la cadena de distribución de última milla",
            "Análisis de canasta de productos y monitoreo del Global Nutrition Score",
            "Digitalización de la cadena de suministro y gestión de ventas NutriBiz",
            "Implementación de innovaciones de servicios (dinero móvil, carga solar)",
            "Coordinación de recolección y análisis continuo de datos",
            "Análisis de desempeño y programa de incentivos para vendedoras"
          ],
        },
        {
          year: "Dic 2020 - Oct 2021",
          title: "Asesor Empresarial y Asistente de MEL",
          company: "BoPinc, Benín (Proyecto BeniBiz)",
          tasks: [
            "Implementación local de logística para 150 vendedoras de productos nutritivos",
            "Empoderamiento de la cadena de suministro y desarrollo de alianzas",
            "Desarrollo de estrategia de marketing y plan de distribución",
            "Gestión del panel de indicadores e informes semestrales/anuales"
          ],
        },
        {
          year: "Mar - Dic 2020",
          title: "Asesor Empresarial: Suministro y Distribución Alimentaria",
          company: "BoPinc, Benín (Proyecto BeniBiz)",
          tasks: [
            "Organización de red de distribución en 3 regiones para 150 mujeres",
            "Selección de productos nutritivos (asequibilidad, deseabilidad)",
            "Diseño de estrategia de suministro adaptada a limitaciones locales",
            "Plan de apoyo financiero, material y marketing para actores de la red",
            "Apoyo técnico al desarrollo de nuevos alimentos (Proyecto BeninCaju)"
          ],
        },
        {
          year: "Abr - Dic 2019",
          title: "Consultor Asociado de Asistencia Técnica PYME",
          company: "Technoserve Inc. / Gabinete Réponse, Benín",
          tasks: [
            "Desarrollo de herramienta de evaluación técnica para PYMES agro",
            "Diagnóstico técnico de 25 PYMES agroalimentarias",
            "Codesarrollo de capacitación en tecnología alimentaria y marketing",
            "Asistencia técnica para 17 PYMES para acceso a mercados"
          ],
        },
        {
          year: "Feb - Jul 2018",
          title: "Asistente Técnico en Transformación Agroalimentaria",
          company: "Technoserve Inc. Benín (Proyecto BeninCajù)",
          tasks: [
            "Evaluación de necesidades de 10 PYMES agroalimentarias",
            "Capacitación en procesamiento de jugo de manzana de marañón",
            "Herramientas de gestión de calidad y desarrollo de productos",
            "Apoyo al desarrollo de mercado para 10 PYME"
          ],
        },
        {
          year: "Jul 2016 - Dic 2017",
          title: "Asociado de Proyecto Junior",
          company: "Universidad de Parakou (R&D MicroVeg)",
          tasks: [
            "Desarrollo de tecnologías de fortificación para vegetales tradicionales",
            "Prueba de modelos de negocio innovadores e incubación de PYMES",
            "Producción de alimentos fortificados y creación de fichas técnicas"
          ],
        },
      ],
    },
  };

  const researchTexts: Record<Language, { title: string; experiences: Experience[] }> = {
    fr: {
      title: "Expériences de Recherche",
      experiences: [
        {
          year: "Oct 2020 – Sept 2023",
          title: "Chercheur associé, doctorant en nutrition et système alimentaire",
          company: "Projet NaviNut (Université de Parakou)",
          tasks: [
            "Analyser la littérature (bibliométrique et interprétative) sur les environnements alimentaires et produits traditionnels",
            "Piloter une approche collaborative et transdisciplinaire au Nord Bénin",
            "Caractériser les environnements alimentaires des enfants âgés de 6 à 59 mois",
            "Analyser le potentiel nutritionnel des produits alimentaires traditionnels",
            "Co-développer des aliments nutritifs à base de produits disponibles localement",
            "Évaluer l’acceptabilité et l’intention d’achat des nouveaux aliments développés",
            "Rédaction de rapports sur les livrables du projet",
            "Communication lors de conférences internationales"
          ],
        },
      ],
    },
    en: {
      title: "Research Experiences",
      experiences: [
        {
          year: "Oct 2020 – Sept 2023",
          title: "Associate Researcher, PhD in Nutrition and Food Systems",
          company: "NaviNut Research Project (University of Parakou)",
          tasks: [
            "Analyze bibliometric and interpretative literature on food environments and traditional products",
            "Lead a collaborative and transdisciplinary research approach in Northern Benin",
            "Characterize food environments for children aged 6 to 59 months",
            "Analyze the nutritional potential of traditional food products currently in use",
            "Co-develop nutritious foods with local stakeholders using locally available products",
            "Evaluate acceptability and purchase intention of the newly developed foods",
            "Draft reports on project deliverables",
            "Present findings at international conferences"
          ],
        },
      ],
    },
    es: {
      title: "Experiencias de Investigación",
      experiences: [
        {
          year: "Oct 2020 – Sept 2023",
          title: "Investigador Asociado, Doctorando en Nutrición y Sistemas Alimentarios",
          company: "Proyecto de Investigación NaviNut (Universidad de Parakou)",
          tasks: [
            "Analizar la literatura bibliométrica e interpretativa sobre entornos alimentarios y productos tradicionales",
            "Liderar un enfoque de investigación colaborativo y transdisciplinario en el norte de Benín",
            "Caracterizar los entornos alimentarios de niños de 6 a 59 meses",
            "Analizar el potencial nutricional de los productos alimentarios tradicionales actuales",
            "Codesarrollar alimentos nutritivos con actores sociales utilizando productos locales",
            "Evaluar la aceptabilidad e intención de compra de los nuevos alimentos desarrollados",
            "Redacción de informes sobre los entregables del proyecto",
            "Comunicación en conferencias internacionales"
          ],
        },
      ],
    },
  };

  const leadershipTexts: Record<Language, { title: string; items: { year: string; title: string; desc: string }[] }> = {
    fr: {
      title: "Leadership & Entrepreneuriat",
      items: [
        {
          year: "2012",
          title: "Co-fondateur et lead du Group DANA NAF",
          desc: "Conceptions de manuel scolaire, Collection Conquête de compétence et Recueil de poèmes."
        },
        {
          year: "2017",
          title: "Co-fondateur et lead de Légumes Services",
          desc: "Transformation des légumes"
        },
        {
          year: "2020",
          title: "Fusion et co-fondateur de AFOSEC GROUP",
          desc: "Consulting et services multidisciplinaires."
        },
        {
          year: "2021",
          title: "Boursier YALI DAKAR",
          desc: "Parcours Business et Entrepreneurship du Centre Régional de Leadership YALI DAKAR."
        }
      ]
    },
    en: {
      title: "Leadership & Entrepreneurship",
      items: [
        {
          year: "2012",
          title: "Co-founder & Lead of Group DANA NAF",
          desc: "Design of textbooks, 'Conquête de compétence' collection, and poetry books."
        },
        {
          year: "2017",
          title: "Co-founder & Lead of Légumes Services",
          desc: "Vegetable processing and transformation."
        },
        {
          year: "2020",
          title: "Co-founder of AFOSEC GROUP",
          desc: "Multidisciplinary consulting and services."
        },
        {
          year: "2021",
          title: "YALI DAKAR Fellow",
          desc: "Business & Entrepreneurship at the YALI Dakar Regional Leadership Center."
        }
      ]
    },
    es: {
      title: "Liderazgo y Emprendimiento",
      items: [
        {
          year: "2012",
          title: "Cofundador y Líder del Grupo DANA NAF",
          desc: "Diseño de libros de texto, colección 'Conquête de compétence' y libros de poesía."
        },
        {
          year: "2017",
          title: "Cofundador y Líder de Légumes Services",
          desc: "Transformación y procesamiento de hortalizas."
        },
        {
          year: "2020",
          title: "Cofundador de AFOSEC GROUP",
          desc: "Consultoría y servicios multidisciplinarios."
        },
        {
          year: "2021",
          title: "Becario YALI DAKAR",
          desc: "Negocios y Emprendimiento en el Centro Regional de Liderazgo YALI Dakar."
        }
      ]
    }
  };

  const activismTexts: Record<Language, { title: string; items: { year: string; title: string; desc: string }[] }> = {
    fr: {
      title: "Leadership & Activisme",
      items: [
        {
          year: "2014",
          title: "SG du Mouvement des Jeunes pour le Développement durable (MJ3D)",
          desc: "Secrétaire Général engagé pour le développement durable."
        },
        {
          year: "2015",
          title: "DVP AEFAP",
          desc: "Association des Etudiants de la Faculté d’Agronomie de l’UP."
        },
        {
          year: "2016",
          title: "Président UJES-UP",
          desc: "Union de la Jeuness Estudiantine Savaloise."
        },
        {
          year: "2018",
          title: "Membre fondateur de ABED-ONG",
          desc: "Membre fondateur, SGCA (2018-2022) et Coordonnateur (2020-2023)."
        },
        {
          year: "2024",
          title: "Président du Club MANSSAH",
          desc: "Club MANSSAH Ab-Calavi H.K.Maga."
        },
        {
          year: "2025",
          title: "Président de la Fondation FDC",
          desc: "DOGO pour Christ"
        }
      ]
    },
    en: {
      title: "Leadership & Activism",
      items: [
        {
          year: "2014",
          title: "GS of the Youth Movement for Sustainable Development (MJ3D)",
          desc: "General Secretary committed to sustainable development."
        },
        {
          year: "2015",
          title: "DVP AEFAP",
          desc: "Agronomy Faculty Students Association of the University of Parakou."
        },
        {
          year: "2016",
          title: "President of UJES-UP",
          desc: "Savalou Student Youth Union."
        },
        {
          year: "2018",
          title: "Founding Member of ABED NGO",
          desc: "Founding member, GS/Board (2018-2022) and Coordinator (2020-2023)."
        },
        {
          year: "2024",
          title: "President of Club MANSSAH",
          desc: "Club MANSSAH Ab-Calavi H.K.Maga."
        },
        {
          year: "2025",
          title: "President of the FDC Foundation",
          desc: "DOGO for Christ"
        }

      ]
    },
    es: {
      title: "Liderazgo y Activismo",
      items: [
        {
          year: "2014",
          title: "SG del Movimiento de Jóvenes por el Desarrollo Sostenible (MJ3D)",
          desc: "Secretario General dedicado al desarrollo sostenible."
        },
        {
          year: "2015",
          title: "DVP AEFAP",
          desc: "Asociación de Estudiantes de la Facultad de Agronomía de la UP."
        },
        {
          year: "2016",
          title: "Presidente UJES-UP",
          desc: "Unión de la Juventud Estudiantil Savalesa."
        },
        {
          year: "2018",
          title: "Miembro fundador de ABED-ONG",
          desc: "Miembro fundador, SGCA (2018-2022) y Coordinador (2020-2023)."
        },
        {
          year: "2024",
          title: "Presidente del Club MANSSAH",
          desc: "Club MANSSAH Ab-Calavi H.K.Maga."
        },
        {
          year: "2025",
          title: "Presidente de la Fundación FDC",
          desc: "DOGO para Cristo"
        }

      ]
    }
  };

  const { language } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const content = texts[language as Language] || texts.en;
  const researchContent = researchTexts[language as Language] || researchTexts.en;
  const leadershipContent = leadershipTexts[language as Language] || leadershipTexts.en;
  const activismContent = activismTexts[language as Language] || activismTexts.en;

  
  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:text-5xl text-3xl font-bold text-white text-center mb-24"
        >
          {content.title.split(" ")[0]}{" "}
          <span className="text-blue-500">
            {content.title.replace(content.title.split(" ")[0], "")}
          </span>
        </motion.h2>

        <div className="relative mb-32">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-blue-500/10" />

          {content.experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-8 md:w-1/2 ${index % 2 === 0 ? "md:pr-4 md:text-right ml-12 md:ml-0" : "md:pl-4 md:ml-auto md:text-left ml-12 md:ml-0"
                }`}
            >
              {/* Timeline Marker */}
              <div className="absolute top-2 -left-[35px] md:left-auto md:right-auto md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10" />
                <div className="absolute w-8 h-8 rounded-full border border-blue-500/20 animate-ping" />
              </div>

              <motion.div
                whileHover={{ y: -5 }}
                onClick={() => handleCardClick(index)}
                className={`bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden cursor-pointer ${expandedIndex === index ? 'border-blue-500/30' : ''}`}
              >
                {/* Background Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] transition-colors ${expandedIndex === index ? 'bg-blue-500/10' : 'group-hover:bg-blue-500/10'}`} />

                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold tracking-widest mb-4">
                  {exp.year}
                </span>

                <h3 className={`text-2xl font-bold text-white mb-2 transition-colors leading-tight ${expandedIndex === index ? 'text-blue-500' : 'group-hover:text-blue-500'}`}>
                  {exp.title}
                </h3>

                <p className="text-gray-400 font-medium mb-6 text-sm">
                  {exp.company}
                </p>

                {/* Tasks displayed on hover or click */}
                <div className={`space-y-3 mt-6 border-t border-white/5 transition-all duration-500 overflow-hidden ${expandedIndex === index ? 'opacity-100 max-h-[1000px] pt-6' : 'opacity-0 max-h-0 pt-0 group-hover:opacity-100 group-hover:max-h-[1000px] group-hover:pt-6'}`}>
                  {exp.tasks.map((task, tIndex) => (
                    <div key={tIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <p className="text-gray-400 text-sm leading-relaxed text-left">
                        {task}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Visual Indicator for hover - hide when expanded */}
                <div className={`absolute bottom-4 right-8 flex items-center gap-2 transition-opacity ${expandedIndex === index ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Détails</p>
                  <div className="w-1 h-1 rounded-full bg-gray-500 animate-bounce" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Research Experience Section */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-white mb-4">
              {researchContent.title.split(" ")[0]}{" "}
              <span className="text-blue-500">
                {researchContent.title.replace(researchContent.title.split(" ")[0], "")}
              </span>
            </h3>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {researchContent.experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 md:p-16 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] group-hover:bg-blue-500/10 transition-colors" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold tracking-widest mb-4">
                      {exp.year}
                    </span>
                    <h4 className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-xl text-gray-400 mt-2">{exp.company}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {exp.tasks.map((task, tIndex) => (
                    <motion.div
                      key={tIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: tIndex * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-blue-500/20 hover:bg-white/10 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm leading-relaxed">{task}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership and Entrepreneurship Section */}
        <div className="mt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-white mb-4">
              {leadershipContent.title.split(" ")[0]}{" "}
              <span className="text-amber-500">
                {leadershipContent.title.replace(leadershipContent.title.split(" ")[0], "")}
              </span>
            </h3>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipContent.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:border-amber-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />

                <span className="text-amber-500 font-bold text-2xl mb-4 block group-hover:scale-110 transition-transform origin-left">
                  {item.year}
                </span>

                <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership and Activism Section */}
        <div className="mt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-white mb-4">
              {activismContent.title.split(" ")[0]}{" "}
              <span className="text-indigo-500">
                {activismContent.title.replace(activismContent.title.split(" ")[0], "")}
              </span>
            </h3>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activismContent.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />

                <span className="bg-indigo-500/10 text-indigo-500 font-bold px-4 py-1 rounded-full text-sm mb-4 inline-block">
                  {item.year}
                </span>

                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
