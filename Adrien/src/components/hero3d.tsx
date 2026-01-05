/* eslint-disable react-hooks/purity */
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Float, Icosahedron, Points, PointMaterial } from "@react-three/drei";
import { Mesh, Group, Vector3 } from "three";
import { useEffect, useRef, useState, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as THREE from 'three';

// --- AJOUT : Liste des images du carrousel ---
const backgroundImages = [
  "/image/aga1.jpeg",
  "/image/adrien-dogo.png",
  "/image/aga.jpeg",
];

// 💎 Dynamic Particle Background
function ParticleSystem() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <Points positions={points} ref={pointsRef}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// 💎 Glassmorphic Central Geometries
function ResponsiveGeometry() {
  const groupRef = useRef<Group>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setScale(0.6);
      else if (window.innerWidth < 1024) setScale(0.8);
      else setScale(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Icosahedron args={[1.5, 1]}>
          <MeshDistortMaterial
            color="#3b82f6"
            speed={2}
            distort={0.4}
            radius={1}
            wireframe
            opacity={0.3}
            transparent
          />
        </Icosahedron>
        <Icosahedron args={[0.8, 15]}>
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Icosahedron>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  const [showButton, setShowButton] = useState(false);
  const [lang, setLang] = useState<"fr" | "en" | "es">("fr");

  // --- AJOUT : État pour le carrousel ---
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Change toutes les 6 secondes
    return () => clearInterval(timer);
  }, []);

  const text = {
    fr: {
      hello: "Salut, je suis Adrien DOGO 👋",
      job: "Expert en Systèmes Alimentaires & Business Development Nutritionnel | Innovation Inclusive | R&D, PhD",
      welcome: "Bienvenue dans mon univers d'impact.",
      button: "Lisez-moi !",
    },
    en: {
      hello: "Hi, I'm Adrien DOGO 👋",
      job: "Nutrition Business Development Expert | Inclusive Innovation | Food Systems Scientist, R&D, PhD",
      welcome: "Welcome to my impact universe.",
      button: "Read Me!",
    },
    es: {
      hello: "Hola, soy Adrien DOGO 👋",
      job: "Experto en Desarrollo de Negocios Nutricionales | Innovación Inclusiva | Científico de Sistemas Alimentarios, I+D, PhD",
      welcome: "Bienvenido a mi universo de impacto.",
      button: "¡Léeme!",
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const gradientClasses = "bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500";

  return (
    <div className="h-screen w-full bg-[#030712] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* --- AJOUT : CARROUSEL D'IMAGES EN BG --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }} // Opacité 0.3 pour ne pas gêner le texte
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
            />
            {/* Overlay sombre pour assurer le contraste avec le texte */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- BACKGROUND EFFECTS (CANVAS) --- */}
      <div className="absolute inset-0 z-10 opacity-60 md:opacity-100 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.15),_transparent_70%)]" />
        <Canvas camera={{ position: [0, 0, 8], fov: typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ParticleSystem />
          <ResponsiveGeometry />
          {/* OrbitControls retiré ou réglé sur pointer-events car le Canvas est au milieu */}
        </Canvas>
      </div>

      {/* --- TOP NAVBAR ELEMENTS --- */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-3 md:gap-4">
        <div className={`relative p-[2px] md:p-[3px] rounded-full ${gradientClasses} group cursor-pointer shadow-2xl`}>
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-black">
            <img src="/image/ad.png" alt="Adrien DOGO" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className={`absolute -inset-2 rounded-full blur-xl opacity-20 ${gradientClasses} group-hover:opacity-40 transition-opacity`} />
        </div>
        <div className="hidden xs:block">
          <h3 className="text-white font-bold tracking-tight text-sm md:text-base uppercase">ADRIEN <span className="text-blue-500">DOGO</span></h3>
          <p className="text-blue-500 text-[10px] md:text-xs font-black tracking-widest leading-none">IMPACT DRIVEN</p>
        </div>
      </div>

      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 flex gap-1.5 md:gap-2">
        {["fr", "en", "es"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l as "fr" | "en" | "es")}
            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold transition-all border ${lang === l
              ? `${gradientClasses} text-black border-transparent shadow-lg`
              : "border-white/10 text-white/40 hover:text-white hover:border-white/20 bg-white/5"
              }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 text-center px-6 lg:py-0 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
            {text[lang].hello.split(" ")[0]} <span className="text-blue-500">{text[lang].hello.split(" ")[1]}</span> {text[lang].hello.split(" ")[2]}
          </h1>

          <div className="h-28 xs:h-20 sm:h-16 md:h-12 max-w-4xl mx-auto px-4">
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-400 leading-relaxed md:leading-normal">
              <TypeAnimation
                key={lang}
                sequence={[text[lang].job, 2000]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: "inline-block" }}
              />
            </p>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500 mt-8 md:mt-12"
          >
            {text[lang].welcome}
          </motion.h2>

          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-16"
              >
                <Link href="/home">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 md:px-12 md:py-5 rounded-xl md:rounded-2xl text-black font-black text-lg md:text-xl shadow-2xl transition-all ${gradientClasses}`}
                  >
                    {text[lang].button}
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-blue-500 text-[10px] uppercase font-black tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </div>
  );
}