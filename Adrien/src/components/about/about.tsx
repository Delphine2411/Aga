"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

const translations = {
  fr: {
    title1: "A propos de ",
    title: " Moi",
    subtitle: `Spécialiste en Nutrition et Systèmes agro-alimentaires, PhD
Avec près de 10 ans d’expérience professionnelle dans l’appui et la gestion de projets et programmes en agriculture, sécurité alimentaire et entrepreneuriat en Afrique subsaharienne, je dispose d’une solide capacité à diriger des équipes et à accompagner des organisations dans l’amélioration durable des systèmes alimentaires.
Mon expertise porte notamment sur l’entrepreneuriat des jeunes et des femmes, les partenariats et l’engagement du secteur privé, le développement de l’agrobusiness et des marchés, ainsi que la recherche et développement (R&D) dans les domaines des aliments nutritifs, de l’environnement alimentaire, des politiques alimentaires et de la nutrition humaine.
Pays d’expérience : Bénin, Togo, Côte d’Ivoire, Burkina Faso, Sénégal, Nigeria, Rwanda, Kenya, Zambie, Tanzania.`,
  },
  en: {
    title1: "About ",
    title: " Me",
    subtitle: `PhD Specialist in Nutrition and Agri-food Systems
With nearly 10 years of professional experience in supporting and managing projects and programs in agriculture, food security, and entrepreneurship in sub-Saharan Africa, I possess a strong ability to lead teams and support organizations in the sustainable improvement of food systems.
My expertise includes youth and women's entrepreneurship, private sector partnerships and engagement, agribusiness and market development, as well as research and development (R&D) in the fields of nutritious foods, food environments, food policies, and human nutrition.
Countries of experience: Benin, Togo, Côte d'Ivoire, Burkina Faso, Senegal, Nigeria, Rwanda, Kenya, Zambia, Tanzania.`,
  },
  es: {
    title1: "Sobre",
    title: " Mí",
    subtitle: `Especialista en Nutrición y Sistemas Agroalimentarios, PhD
Con cerca de 10 años de experiencia profesional en el apoyo y la gestión de proyectos y programas en agricultura, seguridad alimentaria y emprendimiento en África subsahariana, dispongo de una sólida capacidad para dirigir equipos y acompañar a organizaciones en la mejora sostenible de los sistemas alimentarios.
Mi experiencia abarca notablemente el emprendimiento de jóvenes y mujeres, las asociaciones y el compromiso del sector privado, el desarrollo de agronegocios y mercados, así como la investigación y desarrollo (I+D) en los ámbitos de alimentos nutritivos, entorno alimentario, políticas alimentarias y nutrición humana.
Países de experiencia: Benín, Togo, Costa de Marfil, Burkina Faso, Senegal, Nigeria, Ruanda, Kenia, Zambia, Tanzania.`,
  },
};

// Liste de vos images
const backgroundImages = [
  "/image/real1.jpeg",
  "/image/real2.jpeg",
  "/image/real3.jpeg",
  "/image/dogd.jpeg",
];

function HeroSection() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const { language } = useLanguage();
  const t = translations[language];

  // État pour le carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ff66, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff66,
      wireframe: true,
      metalness: 0.8,
      roughness: 0.2,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00ff66,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;
      mesh.rotation.x = time * 0.3;
      mesh.rotation.y = time * 0.5;
      particles.rotation.y = time * 0.1;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <motion.section
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Carrousel d'images en BG (Z-index 0) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }} // Opacité faible pour laisser briller le Three.js
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animation Three.js (Z-index 1) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-1 opacity-70" />
      
      {/* Contenu Texte (Z-index 2) */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-gray-200 mb-6"
        >
          {t.title1}{" "}
          <span className="text-blue-500">{t.title}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto"
        >
          {t.subtitle}
        </motion.p>
      </div>
    </motion.section>
  );
}

export default HeroSection;