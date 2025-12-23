"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Float, Icosahedron } from "@react-three/drei";
import { Mesh } from "three";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";


// 💎 Élément 3D Professionnel (Icosaèdre avec distorsion)
function ProfessionalShape() {
  const meshRef = useRef<Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 15]}>
        <MeshDistortMaterial
          color="#3b82f6"
          speed={3}
          distort={0.4}
          radius={1}
          wireframe={true} // Effet technique/pro
        />
      </Icosahedron>
      {/* Deuxième couche pour donner de la profondeur */}
      <Icosahedron args={[1, 2]}>
        <meshStandardMaterial color="#0731ec" emissive="#0731ec" emissiveIntensity={0.5} wireframe />
      </Icosahedron>
    </Float>
  );
}
// 🌍 Sphère animée
function MovingSphere({ color, speed, offset }: { color: string; speed: number; offset: number }) {
  const meshRef = useRef<Mesh | null>(null);


  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    meshRef.current.position.x = Math.sin(clock.getElapsedTime() * speed + offset) * 8;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * speed * 0.5) * 1.8;
  });

  return (
    <Sphere ref={meshRef} args={[1, 54, 54]}>
      <MeshDistortMaterial color={color} distort={0.3} speed={speed} />
    </Sphere>
  );
}

export default function Hero3D() {
  const [showButton, setShowButton] = useState(false);
  const [lang, setLang] = useState<"fr" | "en" | "es">("fr"); // 🌍 Langue par défaut

  // 🌍 Textes multilingues
  const text = {
    fr: {
      hello: "Salut, je suis Adrien DOGO 👋",
      job: "Développeuse Web / Mobile & Designer 3D & Créateur de portfolio",
      welcome: "Bienvenue dans mon espace personnel !",
      button: "Lisez-moi !",
    },
    en: {
      hello: "Hi, I'm Adrien DOGO👋",
      job: "Nutrition Business development | Inclusive innovation | \nFood systems scientist, R&D, PhD | Management, Leadership and Entrepreneurship",
      welcome: "Welcome to my personal space!",
      button: "Read Me!",
    },
    es: {
      hello: "Hola, soy Adrien DOGO 👋",
      job: "Nutricionista | Desarrollador Web / Mobile | Diseñador 3D | Creador de Portafolios",
      welcome: "¡Bienvenido a mi espacio personal!",
      button: "Léeme!",
    },
  };

  // Affichage du bouton après l'animation
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 to-black flex items-center justify-center relative">

      {/* 📸 Image de profil */}

      <div className="absolute top-6 left-6 z-50">
        <div className="relative flex items-center justify-center w-[200px] h-[200px]">

          <div className="relative w-30 h-30 rounded-full  p-[3px] bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 animate-spin-slow">
            <img
              src="/image/ad.png"
              alt="Adrien DOGO"
              className="w-full h-full rounded-full object-cover shadow-lg border-[3px] border-transparent"
            />
          </div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute w-[160px] h-[160px] rounded-full border-b-[6px] border-blue-500 border-l-transparent border-r-transparent border-t-transparent"
            style={{
              //boxShadow: "0 0 20px rgba(0,255,102,0.3)",
            }}
          ></motion.div>
        </div>
      </div>
      {/* 🌍 Sélecteur de langue */}
      <div className="absolute top-6 right-6 z-50 flex gap-3">
        {["fr", "en", "es"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l as "fr" | "en" | "es")}
            className={`px-4 py-1 rounded-full border transition ${lang === l
              ? "bg-blue-500 text-black"
              : "border-gray-600 text-white hover:bg-gray-800"
              }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* --- SCÈNE 3D --- */}
      {/*<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 1]} />
        <OrbitControls enableZoom={false} />

        <MovingSphere color="#dd0606" speed={1.5} offset={0} />
        <MovingSphere color="#10b981" speed={1.2} offset={2} />
        <MovingSphere color="#f59e0b" speed={1.0} offset={4} />
      </Canvas>*/}

      {/* --- CONTENU TEXTE --- */}
      <div className="absolute text-center text-white">

        {/* Titre */}
        <h1 className="lg:text-5xl text-3xl font-bold">{text[lang].hello}</h1>

        {/* Job animé */}
        <p className="lg:text-lg mt-3 text-blue-500">
          <TypeAnimation
            key={lang}
            sequence={[text[lang].job]}
            wrapper="span"
            cursor={true}
            repeat={0}
            style={{ display: "inline-block" }}
          />
        </p>

        {/* Sous-texte animé */}
        <h2 className="lg:text-3xl text-2xl text-gray-400 mt-5">

          {text[lang].welcome}

        </h2>

        {/* --- BOUTON ANIMÉ --- */}
        <Link href={"/home"}>
          {showButton && (
            <motion.button
              initial={{ y: 100, scale: 0.5, opacity: 0 }}
              animate={{
                y: 0,
                scale: [1, 1.1, 1],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileInView={{
                opacity: [1, 0.6, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.2,
                },
              }}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                boxShadow: "0px 0px 25px #f59e0b",
              }}
              className="mt-8 px-10 py-3 bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 border-white border-[1px] text-white font-semibold rounded-xl shadow-lg hover:bg-transparent transition-all duration-300"
            >
              {text[lang].button}
            </motion.button>
          )}
        </Link>
      </div>

      {/* --- CANVAS EN BAS À DROITE --- */}
      <div className="absolute bottom-0 right-0 z-10 w-[420px] h-[420px] pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          // Forcer le Canvas à respecter le conteneur
          className="!absolute !inset-0 !w-full !h-full"
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
          <ProfessionalShape />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>


    </div>
  );
}
