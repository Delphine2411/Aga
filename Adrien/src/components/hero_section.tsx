"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

const translations = {
  fr: {
    title1: "Mes",
    title: "Engagements",
    subtitle: "Découvrez mes engagements.",
  },
  en: {
    title1: "My",
    title: "Engagements",
    subtitle: "Explore my engagements.",
  },
  es: {
    title1: "Mis",
    title: "Compromisos",
    subtitle: "Descubre mis compromisos.",
  },
};

export default function HeroSection() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x3b82f6, 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xff6b35, 1.5);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x3b82f6 : 0xff6b35,
        metalness: 0.8,
        roughness: 0.2,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      scene.add(cube);
      cubes.push(cube);
    }

    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      cubes.forEach((cube, i) => {
        cube.rotation.x = time * (0.5 + i * 0.1);
        cube.rotation.y = time * (0.3 + i * 0.1);
        cube.position.y = Math.sin(time + i) * 2;
      });

      pointLight1.position.x = Math.sin(time) * 5;
      pointLight2.position.x = Math.cos(time) * 5;

      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
      <motion.div style={{ y }} className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6"
        >
          {t.title1} <span className="text-blue-500">{t.title}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
        >
          {t.subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
