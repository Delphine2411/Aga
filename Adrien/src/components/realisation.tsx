 
"use client";

import React, { useEffect, useState} from 'react';
import { motion,  AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/src/components/contexts/language_context";
import TestimonialsSection from '@/src/components/realisations/testimonials_section';

const translations = {
  fr: {
    heroTitle1: "Mon",
    heroTitle: "Expertise",
    heroSubtitle: "Expertise en nutrition, innovation inclusive et systèmes alimentaires",
    filters: ["Tous", "R&D Nutrition", "Innovation Inclusive", "Impact & Data", "Leadership"],
    viewDetails: "Détails de l'atelier",
    ngo: "Lieu",
    location: "Institution",
    date: "Date",
    scientific: {
      title: "Réalisations Scientifiques",
      clickDetails: "Cliquez pour voir les détails",
      items: [
        { text: "Toward local nutritious foods for a healthy food environment for children : a community-led food innovation in Benin’s drylands.", icon: "microscope", Link: "https://doi.org/10.1016/j.foodpol.2025.103004" },
        { text: "Quality Attributes in Child Food Packaging Design: Photovoice Study with Beninese Mothers.", icon: "talk", Link: "https://dx.doi.org/10.18461/ijfsd.v14i3.G4" },
        { text: "Research trends on the contribution of traditional food products to child nutrition in Africa’s drylands.", icon: "network", Link: "https://doi.org/10.5281/ZENODO.10429307" },
        { text: "Characterization and challenges of food environments of children-under-five in north Benin drylands.", icon: "pioneer", Link: "https://doi.org/10.1016/j.jafr.2023.100682" },
        { text: "The Influence from Packaging Design Elements of Child Food on Quality Perceptions of Beninese Consumers.", icon: "pioneer", Link: "http://dx.doi.org/10.18461/pfsd.2023.2306" }
      ]
    }
  },

  en: {
    heroTitle1: "My",
    heroTitle: "Expertise",
    heroSubtitle: "Expertise in nutrition, inclusive innovation, and food systems",
    filters: ["All", "R&D Nutrition", "Inclusive Innovation", "Impact & Data", "Leadership"],
    viewDetails: "Workshop Details",
    ngo: "Institution",
    location: "Location",
    date: "Date",
    scientific: {
      title: "Scientific Achievements",
      clickDetails: "Click to view details",
      items: [
        { text: "Toward local nutritious foods for a healthy food environment for children : a community-led food innovation in Benin’s drylands.", icon: "microscope", Link: "https://doi.org/10.1016/j.foodpol.2025.103004" },
        { text: "Quality Attributes in Child Food Packaging Design: Photovoice Study with Beninese Mothers.", icon: "talk", Link: "https://dx.doi.org/10.18461/ijfsd.v14i3.G4" },
        { text: "Research trends on the contribution of traditional food products to child nutrition in Africa’s drylands.", icon: "network", Link: "https://doi.org/10.5281/ZENODO.10429307" },
        { text: "Characterization and challenges of food environments of children-under-five in north Benin drylands.", icon: "pioneer", Link: "https://doi.org/10.1016/j.jafr.2023.100682" },
        { text: "The Influence from Packaging Design Elements of Child Food on Quality Perceptions of Beninese Consumers.", icon: "pioneer", Link: "http://dx.doi.org/10.18461/pfsd.2023.2306" }
      ]
    }
  },
  es: {
    heroTitle1: "Mi",
    heroTitle: "Experiencia",
    heroSubtitle: "Experiencia en nutrición, innovación inclusiva y sistemas alimentarios",
    filters: ["Todos", "I+D Nutrición", "Innovación Inclusiva", "Impacto y Datos", "Liderazgo"],
    viewDetails: "Detalles del taller",
    ngo: "Institución",
    location: "Ubicación",
    date: "Fecha",
    scientific: {
      title: "Logros Científicos",
      clickDetails: "Haga clic para ver detalles",
      items: [
        { text: "Toward local nutritious foods for a healthy food environment for children : a community-led food innovation in Benin’s drylands.", icon: "microscope", Link: "https://doi.org/10.1016/j.foodpol.2025.103004" },
        { text: "Quality Attributes in Child Food Packaging Design: Photovoice Study with Beninese Mothers.", icon: "talk", Link: "https://dx.doi.org/10.18461/ijfsd.v14i3.G4" },
        { text: "Research trends on the contribution of traditional food products to child nutrition in Africa’s drylands.", icon: "network", Link: "https://doi.org/10.5281/ZENODO.10429307" },
        { text: "Characterization and challenges of food environments of children-under-five in north Benin drylands.", icon: "pioneer", Link: "https://doi.org/10.1016/j.jafr.2023.100682" },
        { text: "The Influence from Packaging Design Elements of Child Food on Quality Perceptions of Beninese Consumers.", icon: "pioneer", Link: "http://dx.doi.org/10.18461/pfsd.2023.2306" }
      ]
    }
  },
};


// Section Filtres
interface FilterSectionProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

function FilterSection({ activeFilter, setActiveFilter }: FilterSectionProps) {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  return (
    <section className="bg-black pt-20 px-6 sticky top-0 z-20 backdrop-blur-3xl bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {t.filters.map((filter: string) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeFilter === filter
                ? 'bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-white shadow-lg shadow-blue-500/20 border-transparent'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Carte de projet avec effet 3D
interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  date: string;
  ngo: string;
  location: string;
  image?: string;
  images?: string[];
  tags?: string[];
  gradient?: string;
}

function ProjectCard({ project, index, onOpenModal }: { project: Project; index: number; onOpenModal: (p: Project) => void }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: (y - centerY) / 20,
      y: (centerX - x) / 20,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(project)}
      style={{
        perspective: 1000,
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      className="group relative bg-[#0a0a0a] max-w-[680px] max-h-[680px] overflow-hidden cursor-pointer border border-white/5 hover:border-blue-500 transition-colors duration-500"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <motion.img
          src={project.image || `https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop`}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-xl"
          >
            {t.viewDetails}
          </motion.button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <span className="px-4 py-1.5 rounded-full bg-white/5 text-blue-500 text-xs font-bold tracking-wider uppercase border border-blue-500/20">
            {project.category}
          </span>
          <span className="text-gray-500 text-sm font-medium">{project.date}</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">{t.ngo}</p>
            <p className="text-white text-xs font-medium truncate">{project.ngo}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">{t.location}</p>
            <p className="text-white text-xs font-medium truncate">{project.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentImageIndex(0);
      setIsAutoPlaying(true);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isAutoPlaying && project?.images && project.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isAutoPlaying, project?.images]);

  const nextImage = () => {
    if (project?.images?.length) {
      setIsAutoPlaying(false);
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = () => {
    if (project?.images?.length) {
      setIsAutoPlaying(false);
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#0a0a0a] w-full max-w-6xl max-h-[90vh] overflow-y-auto overflow-hidden border border-white/10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2">
              <div className="group md:h-full relative overflow-hidden bg-white/5 flex flex-col">
                <div className="relative h-[300px] md:h-full flex-shrink-0">
                  <img
                    src={project.images?.[currentImageIndex] || `https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Navigation Arrows */}
                  {project.images && project.images.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Thumbnails Row */}
                {project.images && project.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar bg-black/20">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setCurrentImageIndex(idx);
                        }}
                        className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-blue-500 scale-105' : 'border-white/10 opacity-50 hover:opacity-100'
                          }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold tracking-wider mb-6 border border-blue-500/20">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {project.title}
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed text-lg italic border-l-2 border-blue-500 pl-4">
                    {project.description}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-8 py-8 border-t border-white/10">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-2">{t.ngo}</h4>
                    <p className="text-white font-medium">{project.ngo}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-[#3b82f6] font-bold mb-2">{t.date}</h4>
                    <p className="text-white font-medium">{project.date}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-bold mb-2">{t.location}</h4>
                    <p className="text-white font-medium">{project.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 text-gray-400 rounded-md border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Section Projets avec grille
function ProjectsSection({ activeFilter, onOpenModal }: { activeFilter: string; onOpenModal: (p: Project) => void }) {
  const translations = {
    fr: {
      categories: {
        all: "Tous",
        nutrition: "R&D Nutrition",
        innovation: "Innovation Inclusive",
        data: "Impact & Data",
        leadership: "Leadership",
      },
      projects: [
        {
          id: 1,
          title: "Conférence IAAS – Université de Parakou",
          description: "Intervention sur l'employabilité et l'insertion professionnelle des jeunes agronomes au Bénin.",
          fullDescription: "Plus de 150 étudiants en sciences agronomiques se sont réunis autour d'une thématique stratégique : « Emploi professionnel en sciences agronomiques : comment s'y prendre ? ». Cette conférence, organisée par IAAS UP avec le soutien de ABED ONG, s'inscrit dans le programme #Dcroch. Les échanges ont porté sur les réalités du marché de l'emploi agricole, les compétences clés à développer et les opportunités entrepreneuriales. Dr Aga Adrien Dogo, conférencier principal, a partagé des orientations précieuses pour préparer l'agriculture responsable de demain.",
          category: "Leadership",
          ngo: "ABED ONG & Fondation FDC",
          location: "Parakou, Bénin",
          date: "Décembre 2024",
          image: "/image/issa1.jpg",
          images: [
            "/image/iaas2.jpg",
            "/image/iaas3.jpg",
            "/image/iaas4.jpg"
          ],
          tags: ["Employabilité", "Agronomie", "Leadership"],
          gradient: "from-blue-600 to-indigo-800",
        },
        {
          id: 2,
          title: "Conférence « Mon Projet Pro, Mon Avenir » – Abomey",
          description: "Session d'inspiration et d'orientation pour 131 étudiants sur la construction d'un projet professionnel unique.",
          fullDescription: "Organisée par la FEUNSTIM avec le soutien de l'ABED ONG dans le cadre du projet #Dcroch, cette conférence a réuni 131 étudiants déterminés. Dr. Aga Adrien Dogo y a partagé les clés pour construire un projet professionnel cohérent et acquérir des compétences techniques et transversales. À travers son parcours inspirant, il a donné aux jeunes les outils pour anticiper et réussir leur insertion professionnelle.",
          category: "Leadership",
          ngo: "FEUNSTIM & ABED ONG (Projet #Dcroch)",
          location: "Abomey, Bénin",
          date: "Décembre 2024",
          image: "/image/mpav1.jpg",
          images: [
            "/image/mpav2.jpg",
            "/image/mpav3.jpg",
            "/image/mpav4.jpg"
          ],
          tags: ["#Dcroch", "Employabilité", "Jeunesse", "Leadership"],
          gradient: "from-pink-600 to-rose-800",
        },
        {
          id: 3,
          title: "Conférence « Mon Projet Pro, Mon Avenir » – Dassa",
          description: "Accompagnement enthousiaste des jeunes pour dessiner leur futur et favoriser l'épanouissement professionnel.",
          fullDescription: "Un moment inspirant à Dassa organisé par la FEUNSTIM en collaboration avec la Fondation FDC. Dr. Aga Adrien Dogo, co-fondateur de la FDC, y a apporté sa sagesse et ses conseils avisés pour guider les étudiants dans leur quête d'employabilité. Chaque échange a été une preuve palpable de l'engagement envers une jeunesse ambitieuse et un avenir prometteur.",
          category: "Leadership",
          ngo: "Fondation FDC & FEUNSTIM",
          location: "Dassa, Bénin",
          date: "Novembre 2024",
          image: "/image/avdassa1.jpg",
          images: [
            "/image/avdassa2.jpg",
            "/image/avdassa3.jpg",
            "/image/avdassa4.jpg"
          ],
          tags: ["Fondation FDC", "Employabilité", "Jeunesse", "Dassa"],
          gradient: "from-orange-600 to-orange-800",
        },
        {
          id: 4,
          title: "Concours de Génie en Herbe – CEG Tchetti",
          description: "Initiative éducative et spirituelle pour éveiller la jeunesse à la connaissance et aux valeurs d'excellence.",
          fullDescription: "Lancé officiellement par la FDC, ce concours a réuni 40 participants du CEG Tchetti autour du thème « Introduction à la Bible ». Sous la direction du Dr Adrien Dogo, cette initiative vise à promouvoir l'excellence scolaire et les valeurs chrétiennes, tout en offrant des kits scolaires aux élèves pour préparer leur rentrée. Un projet porteur pour former une génération éclairée et engagée.",
          category: "Education",
          ngo: "Fondation FDC",
          location: "Tchetti, Bénin",
          date: "Septembre 2025",
          image: "/image/tchetti1.jpg",
          images: [
            "/image/tchetti2.jpg",
            "/image/tchetti3.jpg",
            "/image/tchetti4.jpg"
          ],
          tags: ["Jeunesse", "Éducation", "Excellence", "FDC"],
          gradient: "from-teal-600 to-emerald-800",
        },
      ],
    },
    en: {
      categories: {
        all: "All",
        nutrition: "R&D Nutrition",
        innovation: "Inclusive Innovation",
        data: "Impact & Data",
        leadership: "Leadership",
      },
      projects: [
        {
          id: 1,
          title: "IAAS Conference – University of Parakou",
          description: "Speech on employability and professional insertion of young agronomists in Benin.",
          fullDescription: "More than 150 agronomical science students gathered around a strategic theme: 'Professional employment in agronomical sciences: how to go about it?'. This conference, organized by IAAS UP with the support of ABED NGO, is part of the #Dcroch program. Discussions focused on agricultural labor market realities, key skills to develop, and entrepreneurial opportunities. Dr. Aga Adrien Dogo, as the keynote speaker, shared valuable guidance to prepare for the responsible agriculture of tomorrow.",
          category: "Leadership",
          ngo: "ABED NGO & FDC Foundation",
          location: "Parakou, Benin",
          date: "December 2024",
          image: "/image/issa1.jpg",
          images: [
            "/image/iaas2.jpg",
            "/image/iaas3.jpg",
            "/image/iaas4.jpg"
          ],
          tags: ["Employability", "Agronomy", "Leadership"],
          gradient: "from-blue-600 to-indigo-800",
        },
        {
          id: 2,
          title: "“My Professional Project, My Future” Conference – Abomey",
          description: "Inspiration and orientation session for 131 students on building a unique professional career path.",
          fullDescription: "Organized by FEUNSTIM with the support of ABED ONG under the #Dcroch project, this conference brought together 131 determined students. Dr. Aga Adrien Dogo shared keys to building a coherent professional project and acquiring technical and soft skills. Through his inspiring journey, he provided youth with the tools to anticipate and succeed in their professional integration.",
          category: "Leadership",
          ngo: "FEUNSTIM & ABED ONG (#Dcroch Project)",
          location: "Abomey, Benin",
          date: "December 2024",
          image: "/image/mpav1.jpg",
          images: [
            "/image/mpav2.jpg",
            "/image/mpav3.jpg",
            "/image/mpav4.jpg"
          ],
          tags: ["#Dcroch", "Employability", "Youth", "Leadership"],
          gradient: "from-pink-600 to-rose-800",
        },
        {
          id: 3,
          title: "“My Professional Project, My Future” Conference – Dassa",
          description: "Enthusiastic mentoring of young people to shape their future and foster professional growth.",
          fullDescription: "An inspiring moment in Dassa organized by FEUNSTIM in collaboration with the FDC Foundation. Dr. Aga Adrien Dogo, co-founder of FDC, shared his wisdom and expert advice to guide students in their quest for employability. Each interaction served as tangible proof of the commitment to ambitious youth and a promising future.",
          category: "Leadership",
          ngo: "FDC Foundation & FEUNSTIM",
          location: "Dassa, Benin",
          date: "November 2024",
          image: "/image/avdassa1.jpg",
          images: [
            "/image/avdassa2.jpg",
            "/image/avdassa3.jpg",
            "/image/avdassa4.jpg"
          ],
          tags: ["FDC Foundation", "Employability", "Youth", "Dassa"],
          gradient: "from-orange-600 to-orange-800",
        },
        {
          id: 4,
          title: "“Génie en Herbe” Competition – CEG Tchetti",
          description: "Educational and spiritual initiative to awaken youth to knowledge and excellence values.",
          fullDescription: "Officially launched by FDC, this competition brought together 40 participants from CEG Tchetti around the theme 'Introduction to the Bible'. Led by Dr. Adrien Dogo, this initiative aims to promote academic excellence and Christian values, while providing school kits to students to prepare for their return. A promising project to train an enlightened and committed generation.",
          category: "Education",
          ngo: "FDC Foundation",
          location: "Tchetti, Benin",
          date: "September 2025",
          image: "/image/tchetti1.jpg",
          images: [
            "/image/tchetti2.jpg",
            "/image/tchetti3.jpg",
            "/image/tchetti4.jpg"
          ],
          tags: ["Youth", "Education", "Excellence", "FDC"],
          gradient: "from-teal-600 to-emerald-800",
        },
      ],
    },
    es: {
      categories: {
        all: "Todos",
        nutrition: "I+D Nutrición",
        innovation: "Innovación Inclusiva",
        data: "Impacto y Datos",
        leadership: "Liderazgo",
      },
      projects: [
        {
          id: 1,
          title: "Conferencia IAAS – Universidad de Parakou",
          description: "Intervención sobre empleabilidad e inserción profesional de jóvenes agrónomos en Benín.",
          fullDescription: "Más de 150 estudiantes de ciencias agronómicas se reunieron en torno a un tema estratégico: “Empleo profesional en ciencias agronómicas: ¿cómo hacerlo?”. Esta conferencia, organizada por IAAS UP con el apoyo de ABED ONG, forma parte del programa #Dcroch. Los intercambios se centraron en las realidades del mercado laboral agrícola, las competencias clave a desarrollar y las oportunidades empresariales. El Dr. Aga Adrien Dogo, conferencista principal, compartió valiosas orientaciones para preparar la agricultura responsable del mañana.",
          category: "Liderazgo",
          ngo: "ABED ONG y Fundación FDC",
          location: "Parakou, Benín",
          date: "Diciembre 2024",
          image: "/image/issa1.jpg",
          images: [
            "/image/iaas2.jpg",
            "/image/iaas3.jpg",
            "/image/iaas4.jpg"
          ],
          tags: ["Empleabilidad", "Agronomía", "Liderazgo"],
          gradient: "from-blue-600 to-indigo-800",
        },
        {
          id: 2,
          title: "Conferencia “Mi Proyecto Pro, Mi Futuro” – Abomey",
          description: "Sesión de inspiración y orientación para 131 estudiantes sobre la construcción de un proyecto profesional único.",
          fullDescription: "Organizada por la FEUNSTIM con el apoyo de la ONG ABED en el marco del proyecto #Dcroch, esta conferencia reunió a 131 estudiantes decididos. El Dr. Aga Adrien Dogo compartió las claves para construir un proyecto profesional coherente y adquirir habilidades técnicas y transversales. A través de su trayectoria inspiradora, brindó a los jóvenes las herramientas para anticipar y lograr su inserción profesional.",
          category: "Liderazgo",
          ngo: "FEUNSTIM y ONG ABED (Proyecto #Dcroch)",
          location: "Abomey, Benín",
          date: "Diciembre 2024",
          image: "/image/mpav1.jpg",
          images: [
            "/image/mpav2.jpg",
            "/image/mpav3.jpg",
            "/image/mpav4.jpg"
          ],
          tags: ["#Dcroch", "Empleabilidad", "Juventud", "Liderazgo"],
          gradient: "from-pink-600 to-rose-800",
        },
        {
          id: 3,
          title: "Conferencia “Mi Proyecto Pro, Mi Futuro” – Dassa",
          description: "Mentoria entusiasta de jóvenes para diseñar su futuro y fomentar el crecimiento profesional.",
          fullDescription: "Un momento inspirador en Dassa organizado por FEUNSTIM en colaboración con la Fundación FDC. El Dr. Aga Adrien Dogo, cofundador de la FDC, aportó su sabiduría y valiosos consejos para orientar a los estudiantes en su búsqueda de empleabilidad. Cada intercambio fue una prueba palpable del compromiso con una juventud ambiciosa y un futuro prometedor.",
          category: "Liderazgo",
          ngo: "Fundación FDC y FEUNSTIM",
          location: "Dassa, Benín",
          date: "Noviembre 2024",
          image: "/image/avdassa1.jpg",
          images: [
            "/image/avdassa2.jpg",
            "/image/avdassa3.jpg",
            "/image/avdassa4.jpg"
          ],
          tags: ["Fundación FDC", "Empleabilidad", "Juventud", "Dassa"],
          gradient: "from-orange-600 to-orange-800",
        },
        {
          id: 4,
          title: "Concurso “Génie en Herbe” – CEG Tchetti",
          description: "Iniciativa educativa y espiritual para despertar a la juventud al conocimiento y los valores de excelencia.",
          fullDescription: "Lanzado oficialmente por la FDC, este concurso reunió a 40 participantes del CEG Tchetti en torno al tema “Introducción a la Biblia”. Bajo la dirección del Dr. Adrien Dogo, esta iniciativa busca promover la excelencia académica y los valores cristianos, ofreciendo kits escolares a los estudiantes para preparar su regreso. Un proyecto prometedor para formar una generación iluminada y comprometida.",
          category: "Educación",
          ngo: "Fundación FDC",
          location: "Tchetti, Benín",
          date: "Septiembre 2025",
          image: "/image/tchetti1.jpg",
          images: [
            "/image/tchetti2.jpg",
            "/image/tchetti3.jpg",
            "/image/tchetti4.jpg"
          ],
          tags: ["Juventud", "Educación", "Excelencia", "FDC"],
          gradient: "from-teal-600 to-emerald-800",
        },
      ],
    }
  };

  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  const translatedFilter = Object.values(t.categories).includes(activeFilter)
    ? activeFilter
    : t.categories.all;

  const filteredProjects =
    translatedFilter === t.categories.all
      ? t.projects
      : t.projects.filter((p: Project) => p.category === translatedFilter);

  return (
    <section className="bg-black px-6 relative z-10 mb-10">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={translatedFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-10"
          >
            {filteredProjects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.id}
                project={project as Project}
                index={index}
                onOpenModal={onOpenModal}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Composants existants conservés (simplifiés pour l'exemple, garder les originaux si nécessaire)
// Le code des composants inutilisés a été supprimé pour nettoyer le projet.

// Page principale
export default function Realisations() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-black min-h-screen selection:bg-blue-500 selection:text-white">
      <div className="relative z-10">
        <FilterSection activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <ProjectsSection activeFilter={activeFilter} onOpenModal={handleOpenModal} />
        <TestimonialsSection />
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}