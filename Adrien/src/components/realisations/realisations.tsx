"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/src/components/contexts/language_context";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment, MeshWobbleMaterial, OrbitControls, Points, PointMaterial } from '@react-three/drei';
import Link from 'next/link';
import CTASection from './cta_section';

const translations = {
  fr: {
    heroTitle1: "Mes",
    heroTitle: "Réalisations",
    heroSubtitle: "Expertise en nutrition, innovation inclusive et systèmes alimentaires",
    filters: ["Tous", "R&D Nutrition", "Innovation Inclusive", "Impact & Data", "Leadership"],
    viewDetails: "Détails de l'atelier",
    ngo: "ONG",
    location: "Lieu",
    date: "Date",
  },
  en: {
    heroTitle1: "My",
    heroTitle: "Achievements",
    heroSubtitle: "Expertise in nutrition, inclusive innovation, and food systems",
    filters: ["All", "R&D Nutrition", "Inclusive Innovation", "Impact & Data", "Leadership"],
    viewDetails: "Workshop Details",
    ngo: "NGO",
    location: "Location",
    date: "Date",
  },
  es: {
    heroTitle1: "Mis",
    heroTitle: "Logros",
    heroSubtitle: "Experiencia en nutrición, innovación inclusiva y sistemas alimentarios",
    filters: ["Todos", "I+D Nutrición", "Innovación Inclusiva", "Impacto y Datos", "Liderazgo"],
    viewDetails: "Detalles del taller",
    ngo: "ONG",
    location: "Ubicación",
    date: "Fecha",
  },
};

// Section Hero avec animation 3D
function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[2, 1, -2]}>
          <MeshDistortMaterial color="#10b981" speed={3} distort={0.4} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-2, -1, -3]}>
          <octahedronGeometry args={[1]} />
          <MeshWobbleMaterial color="#3b82f6" speed={2} factor={0.6} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[0, 2, -5]}>
          <torusGeometry args={[0.8, 0.3, 16, 100]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
    </>
  );
}

function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
          <FloatingShapes />
        </Canvas>
      </div>

      <motion.div style={{ y }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-white/10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            {t.heroTitle1} <span className="bg-gradient-to-r from-[#10b981] via-[#3b82f6] to-[#f59e0b] bg-clip-text text-transparent">{t.heroTitle}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t.heroSubtitle}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function BackgroundParticles() {
  const points = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

// Section Filtres
interface FilterSectionProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

function FilterSection({ activeFilter, setActiveFilter }: FilterSectionProps) {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  return (
    <section className="bg-black pt-20 pb-10 px-6 sticky top-0 z-20 backdrop-blur-3xl bg-black/50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
        {t.filters.map((filter: string) => (
          <motion.button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
              ? 'bg-gradient-to-r from-[#10b981] to-[#3b82f6] text-white shadow-lg shadow-[#10b981]/20 border-transparent'
              : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
          >
            {filter}
          </motion.button>
        ))}
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
      className="group relative bg-[#0a0a0a] max-w-[600px] max-h-[650px] overflow-hidden cursor-pointer border border-white/5 hover:border-[#10b981]/30 transition-colors duration-500"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <motion.img
          src={project.image || `https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop`}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-[#10b981]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
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
          <span className="px-4 py-1.5 rounded-full bg-white/5 text-[#10b981] text-xs font-bold tracking-wider uppercase border border-[#10b981]/20">
            {project.category}
          </span>
          <span className="text-gray-500 text-sm font-medium">{project.date}</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#10b981] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#10b981] font-bold mb-1">{t.ngo}</p>
            <p className="text-white text-xs font-medium truncate">{project.ngo}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#3b82f6] font-bold mb-1">{t.location}</p>
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
                        className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-[#10b981] scale-105' : 'border-white/10 opacity-50 hover:opacity-100'
                          }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#10b981]/10 text-[#10b981] text-xs font-bold tracking-wider mb-6 border border-[#10b981]/20">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {project.title}
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed text-lg italic border-l-2 border-[#10b981] pl-4">
                    {project.description}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-8 py-8 border-t border-white/10">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-[#10b981] font-bold mb-2">{t.ngo}</h4>
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
          title: "Atelier sur l'innovation des systèmes alimentaires",
          description: "Conception de solutions durables pour la sécurité alimentaire communautaire.",
          fullDescription: "Cet atelier intensif de trois jours a réuni des chercheurs, des agriculteurs locaux et des décideurs politiques pour explorer des technologies de fortification alimentaire à bas coût. Nous avons élaboré une feuille de route pour l'adoption de semences biofortifiées, visant à réduire les carences en micronutriments dans les zones rurales. L'accent a été mis sur l'innovation inclusive, plaçant les petits exploitants au cœur du processus de R&D.",
          category: "Innovation Inclusive",
          ngo: "Action Contre la Faim",
          location: "Dakar, Sénégal",
          date: "Mars 2025",
          image: "https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Food Systems", "Inclusive Innovation", "R&D"],
          gradient: "from-blue-600 to-indigo-800",
        },
        {
          id: 2,
          title: "Évaluation d'impact nutritionnel à grande échelle",
          description: "Analyse data-driven des interventions de fortification en fer.",
          fullDescription: "Direction d'une équipe pluridisciplinaire pour évaluer l'efficacité des programmes de supplémentation en fer chez les femmes enceintes. Utilisation de modèles statistiques avancés pour isoler l'impact du programme par rapport aux variables environnementales. Les résultats ont permis de réorienter les budgets vers les districts les plus vulnérables, augmentant l'efficacité globale de 25%.",
          category: "Impact & Data",
          ngo: "UNICEF",
          location: "Nairobi, Kenya",
          date: "Juillet 2024",
          image: "https://images.unsplash.com/photo-1576089234161-48396a3cd67c?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1576089234161-48396a3cd67c?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Impact Assessment", "Data Science", "PhD Research"],
          gradient: "from-pink-600 to-rose-800",
        },
        {
          id: 3,
          title: "Sommet sur le Leadership en Bio-Innovation",
          description: "Encadrer la prochaine génération d'entrepreneurs en agritech.",
          fullDescription: "Une masterclass destinée aux fondateurs de startups africaines dans le domaine de la biotechnologie alimentaire. J'ai partagé des stratégies de business development adaptées aux contextes fragiles et des cadres de gouvernance éthique pour la recherche privée. Le sommet a abouti à la création d'un hub d'incubation pour les solutions de conservation post-récolte.",
          category: "Leadership",
          ngo: "Fondation Bill & Melinda Gates",
          location: "Accra, Ghana",
          date: "Novembre 2024",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Management", "Entrepreneurship", "Biotech"],
          gradient: "from-yellow-600 to-orange-800",
        },
        {
          id: 4,
          title: "Recherche Avancée sur les Protéines Végétales",
          description: "Optimisation des procédés de transformation des légumineuses locales.",
          fullDescription: "Projet de R&D industrielle visant à créer des substituts de viande riches en protéines à partir de niébé et de soja produits localement. Travail de laboratoire sur l'extrusion à haute humidité et l'amélioration du profil sensoriel. Ce projet a démontré la viabilité économique de la transformation locale pour soutenir les chaînes de valeur agricoles nationales.",
          category: "R&D Nutrition",
          ngo: "World Food Programme (WFP)",
          location: "Lagos, Nigeria",
          date: "Janvier 2025",
          image: "https://images.unsplash.com/photo-1532187875460-120c1bcde00b?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1532187875460-120c1bcde00b?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581093148119-01e63a8a3036?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Scientific Research", "R&D", "Food Tech"],
          gradient: "from-teal-600 to-emerald-800",
        }
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
          title: "Food Systems Innovation Workshop",
          description: "Designing sustainable solutions for community food security.",
          fullDescription: "This three-day intensive workshop brought together researchers, local farmers, and policy makers to explore low-cost food fortification technologies. We developed a roadmap for the adoption of biofortified seeds, aiming to reduce micronutrient deficiencies in rural areas. The focus was on inclusive innovation, placing smallholders at the heart of the R&D process.",
          category: "Inclusive Innovation",
          ngo: "Action Against Hunger",
          location: "Dakar, Senegal",
          date: "March 2025",
          image: "https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Food Systems", "Inclusive Innovation", "R&D"],
          gradient: "from-blue-600 to-indigo-800",
        },
        {
          id: 2,
          title: "Large-Scale Nutritional Impact Assessment",
          description: "Data-driven analysis of iron fortification interventions.",
          fullDescription: "Led a multidisciplinary team to evaluate the effectiveness of iron supplementation programs among pregnant women. Used advanced statistical models to isolate program impact from environmental variables. The results helped redirect budgets toward the most vulnerable districts, increasing overall efficiency by 25%.",
          category: "Impact & Data",
          ngo: "UNICEF",
          location: "Nairobi, Kenya",
          date: "July 2024",
          image: "https://images.unsplash.com/photo-1576089234161-48396a3cd67c?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1576089234161-48396a3cd67c?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Impact Assessment", "Data Science", "PhD Research"],
          gradient: "from-pink-600 to-rose-800",
        },
        {
          id: 3,
          title: "Bio-Innovation Leadership Summit",
          description: "Mentoring the next generation of agritech entrepreneurs.",
          fullDescription: "A masterclass for founders of African startups in the food biotechnology sector. I shared business development strategies tailored to fragile contexts and ethical governance frameworks for private research. The summit resulted in the creation of an incubation hub for post-harvest conservation solutions.",
          category: "Leadership",
          ngo: "Bill & Melinda Gates Foundation",
          location: "Accra, Ghana",
          date: "November 2024",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Management", "Entrepreneurship", "Biotech"],
          gradient: "from-yellow-600 to-orange-800",
        },
        {
          id: 4,
          title: "Advanced Plant-Based Protein Research",
          description: "Optimizing processing methods for local legumes.",
          fullDescription: "Industrial R&D project aimed at creating high-protein meat substitutes from locally produced cowpea and soy. Laboratory work on high-moisture extrusion and sensory profile improvement. This project demonstrated the economic viability of local processing to support national agricultural value chains.",
          category: "R&D Nutrition",
          ngo: "World Food Programme (WFP)",
          location: "Lagos, Nigeria",
          date: "January 2025",
          image: "https://images.unsplash.com/photo-1532187875460-120c1bcde00b?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1532187875460-120c1bcde00b?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581093148119-01e63a8a3036?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Scientific Research", "R&D", "Food Tech"],
          gradient: "from-teal-600 to-emerald-800",
        }
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
          title: "Taller de Innovación en Sistemas Alimentarios",
          description: "Diseño de soluciones sostenibles para la seguridad alimentaria comunitaria.",
          fullDescription: "Este taller intensivo de tres días reunió a investigadores, agricultores locales y responsables políticos para explorar tecnologías de fortificación de alimentos a bajo costo. Desarrollamos una hoja de ruta para la adopción de semillas biofortificadas, con el objetivo de reducir las deficiencias de micronutrientes en las zonas rurales. El enfoque fue la innovación inclusiva, situando a los pequeños agricultores en el corazón del proceso de I+D.",
          category: "Innovación Inclusiva",
          ngo: "Acción Contra el Hambre",
          location: "Dakar, Senegal",
          date: "Marzo 2025",
          image: "https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Sistemas Alimentarios", "Innovación Inclusiva", "I+D"],
          gradient: "from-blue-600 to-indigo-800",
        },
        {
          id: 2,
          title: "Evaluación de Impacto Nutricional a Gran Escala",
          description: "Análisis basado en datos de intervenciones de fortificación de hierro.",
          fullDescription: "Lideré un equipo multidisciplinario para evaluar la efectividad de los programas de suplementación con hierro en mujeres embarazadas. Se utilizaron modelos estadísticos avanzados para aislar el impacto del programa de las variables ambientales. Los resultados ayudaron a redirigir los presupuestos hacia los distritos más vulnerables, aumentando la eficiencia global en un 25%.",
          category: "Impacto y Datos",
          ngo: "UNICEF",
          location: "Nairobi, Kenia",
          date: "Julio 2024",
          image: "https://images.unsplash.com/photo-1576089234161-48396a3cd67c?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1576089234161-48396a3cd67c?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Evaluación de Impacto", "Ciencia de Datos", "Investigación de Doctorado"],
          gradient: "from-pink-600 to-rose-800",
        },
        {
          id: 3,
          title: "Cumbre de Liderazgo en Bio-Innovación",
          description: "Mentoria de la próxima generación de emprendedores agrotecnológicos.",
          fullDescription: "Una clase magistral para fundadores de startups africanas en el sector de la biotecnología alimentaria. Compartí estrategias de desarrollo de negocios adaptadas a contextos frágiles y marcos de gobernanza ética para la investigación privada. La cumbre dio como resultado la creación de un centro de incubación para soluciones de conservación postcosecha.",
          category: "Liderazgo",
          ngo: "Fundación Bill y Melinda Gates",
          location: "Accra, Ghana",
          date: "Noviembre 2024",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Gestión", "Emprendimiento", "Biotecnología"],
          gradient: "from-yellow-600 to-orange-800",
        },
        {
          id: 4,
          title: "Investigación Avanzada sobre Proteínas Vegetales",
          description: "Optimización de los métodos de procesamiento de las legumbres locales.",
          fullDescription: "Proyecto de I+D industrial destinado a crear sustitutos de carne con alto contenido de proteínas a partir de caupí y soja producidos localmente. Trabajo de laboratorio sobre extrusión de alta humedad y mejora del perfil sensorial. Este proyecto demostró la viabilidad económica del procesamiento local para apoyar las cadenas de valor agrícolas nacionales.",
          category: "I+D Nutrición",
          ngo: "Programa Mundial de Alimentos (PMA)",
          location: "Lagos, Nigeria",
          date: "Enero 2025",
          image: "https://images.unsplash.com/photo-1532187875460-120c1bcde00b?q=80&w=1000&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1532187875460-120c1bcde00b?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581093148119-01e63a8a3036?q=80&w=1000&auto=format&fit=crop"
          ],
          tags: ["Investigación Científica", "I+D", "Tecnología Alimentaria"],
          gradient: "from-teal-600 to-emerald-800",
        }
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
    <section className="bg-black py-24 px-6 relative z-10">
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
function ProcessSection() {
  return null; // À remplir si nécessaire ou garder l'ancien code
}

function TestimonialSection() {
  return null; // À remplir si nécessaire ou garder l'ancien code
}

// Page principale
export default function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-black min-h-screen selection:bg-[#10b981] selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Canvas>
          <BackgroundParticles />
        </Canvas>
      </div>

      <HeroSection />

      <div className="relative z-10">
        <FilterSection activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <ProjectsSection activeFilter={activeFilter} onOpenModal={handleOpenModal} />

        <div className="bg-gradient-to-b from-black to-gray-900">
          <CTASection />
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}