/* eslint-disable react-hooks/purity */
"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/src/components/contexts/language_context";
import * as THREE from 'three';
import Service from '../services_section';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Environment, MeshWobbleMaterial, Points, PointMaterial } from '@react-three/drei';
import CTASection from './cta_section';
import TestimonialsSection from './testimonials_section';
import { FaMicroscope, FaChalkboardTeacher, FaNetworkWired, FaLightbulb } from 'react-icons/fa';
import StatsSection from '../about/stats';


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
      title: "Publications Scientifiques",
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
      title: "Scientific publications",
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
      title: "Publicaciones Científicas",
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

// Section Hero avec animation 3D
function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[2, 1, -2]}>
          <MeshDistortMaterial color="#3b82f6" speed={3} distort={0.4} />
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



const backgroundImages = [
  "/image/about.jpeg",
  "/image/about1.jpeg",
  "/image/about2.jpeg",
  "/image/about3.jpeg",
  "/image/about4.jpeg",
];

function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Gestion du carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change toutes le 5 secondes
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Carrousel d'images en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }} // Opacité réduite pour laisser voir les animations 3D
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
            />
            {/* Overlay pour assurer la lisibilité du texte */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vos animations 3D (Canvas) */}
      <div className="absolute inset-0 z-1">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
          <FloatingShapes />
        </Canvas>
      </div>

      {/* Contenu Texte */}
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
            {t.heroTitle1} <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">{t.heroTitle}</span>
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
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

// Nouvelle section pour les réalisations scientifiques


function ScientificAchievements() {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];
  const scientific = t.scientific;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconMap: { [key: string]: any } = {
    microscope: FaMicroscope,
    talk: FaChalkboardTeacher,
    network: FaNetworkWired,
    pioneer: FaLightbulb
  };

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden group"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/30 transition-colors duration-700" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-colors duration-700" />

          <h2 className="text-3xl md:text-5xl font-bold text-blue-500 mb-12 text-center">
            {scientific.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {scientific.items.map((item: { text: string; icon: string; Link: string }, index: number) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.a
                  href={item.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-transparent flex items-end justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-2">
                    <p className="text-black font-semibold text-sm flex items-center gap-2 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 px-2 py-1 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {scientific.clickDetails} <span className="text-lg">↗</span>
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 text-2xl shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-gray-200 text-lg leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
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
        <motion.div className="w-full h-full">
          <Image
            src={project.image || `https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop`}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
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
                  <Image
                    src={project.images?.[currentImageIndex] || `https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000&auto=format&fit=crop`}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500"
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
                        <Image src={img} alt="" fill className="object-cover" />
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



// Composants existants conservés (simplifiés pour l'exemple, garder les originaux si nécessaire)
// Le code des composants inutilisés a été supprimé pour nettoyer le projet.

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
    <div className="bg-black min-h-screen selection:bg-blue-500 selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Canvas>
          <BackgroundParticles />
        </Canvas>
      </div>

      <HeroSection />

      <div className="relative z-10">
        <StatsSection />
        <Service />
        <ScientificAchievements />
        <TestimonialsSection />
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