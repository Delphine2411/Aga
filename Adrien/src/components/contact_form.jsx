"use client";

import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaFacebook, FaPhone } from "react-icons/fa";
import Link from 'next/link';
import { useLanguage } from "@/src/components/contexts/language_context";
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { toast } from "react-hot-toast";

// 🎯 Traductions locales (FR, EN, ES)
const translations = {
  fr: {
    title1: "Prêt à",
    title2: "Collaborer ?",
    subtitle: "Parlons de votre prochain projet nutritionnel.",
    fullName: "Nom complet",
    email: "E-mail",
    phone: "Téléphone",
    subject: "Sujet",
    message: "Votre message...",
    send: "Envoyer le message",
    contactInfo: "Informations de Contact",
    address: "Bénin, Afrique de l'Ouest",
  },
  en: {
    title1: "Ready to",
    title2: "Collaborate?",
    subtitle: "Let's discuss your next nutritional project.",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone Number",
    subject: "Subject",
    message: "Your message...",
    send: "Send Message",
    contactInfo: "Contact Information",
    address: "Benin, West Africa",
  },
  es: {
    title1: "¿Listo para",
    title2: "Colaborar?",
    subtitle: "Hablemos de su próximo proyecto nutricional.",
    fullName: "Nombre completo",
    email: "Correo",
    phone: "Teléfono",
    subject: "Asunto",
    message: "Tu mensaje...",
    send: "Enviar mensaje",
    contactInfo: "Información de contacto",
    address: "Benín, África Occidental",
  },
};

export default function ContactSection() {
  const canvasRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x60a5fa, 1.5, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    const spheres = [];
    const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);

    const mat1 = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.2
    });
    const s1 = new THREE.Mesh(sphereGeometry, mat1);
    s1.position.set(-3, 2, -5);
    scene.add(s1);
    spheres.push({ mesh: s1, speed: 0.5, offset: 0 });

    const mat2 = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x2563eb,
      emissiveIntensity: 0.2
    });
    const s2 = new THREE.Mesh(sphereGeometry, mat2);
    s2.position.set(3, -2, -8);
    scene.add(s2);
    spheres.push({ mesh: s2, speed: 0.7, offset: Math.PI });

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 150;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 25;
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.04,
      transparent: true,
      opacity: 0.4
    });
    const pts = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(pts);

    let frameId;
    let time = 0;
    const animate = () => {
      time += 0.008;
      spheres.forEach(({ mesh, speed, offset }) => {
        mesh.rotation.x = Math.sin(time * speed + offset) * 0.2;
        mesh.rotation.y = Math.cos(time * speed + offset) * 0.2;
        mesh.position.y += Math.sin(time * speed + offset) * 0.001;
      });
      pts.rotation.y = time * 0.05;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sphereGeometry.dispose();
      mat1.dispose();
      mat2.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Création d'une promesse pour un toast de chargement (optionnel mais très pro)
  const loadingToast = toast.loading("Envoi de votre message...");

  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("✅ Message envoyé avec succès !", { id: loadingToast });
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } else {
      toast.error("❌ Échec de l'envoi. Veuillez réessayer.", { id: loadingToast });
    }
  } catch (err) {
    toast.error("⚠️ Une erreur est survenue.", { id: loadingToast });
  }
};

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-24 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-black pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h2 className="text-6xl md:text-7xl font-black text-gray-200 leading-tight">
                {t.title1} <br />
                <span className="text-blue-500">{t.title2}</span>
              </motion.h2>
              <p className="text-gray-400 text-xl mt-6 font-medium leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-black transition-all">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Email</p>
                  <p className="text-white text-xl font-medium">adriendogo@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-black transition-all">
                  <FaPhone className="text-2xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Phone</p>
                  <p className="text-gray-200 text-xl font-medium">+229 01 94 79 21 34</p>
                </div>
              </div>
            </div>

            {/* Social Icons Integrated */}
            <div className="flex items-center gap-4 pt-10">
              {[
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/adrien-dogo-8290a9167/" },
                //{ icon: <FaGithub />, href: "https://github.com/adriendogo" },
                { icon: <FaFacebook />, href: "https://www.facebook.com/adrien.dogo" }
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:border-blue-500 transition-all text-xl"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-bold ml-4">{t.fullName}</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-bold ml-4">{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-bold ml-4">{t.subject}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-bold ml-4">{t.message}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-blue-500 hover:bg-blue-400 text-black font-black text-lg rounded-2xl transition-all shadow-xl shadow-blue-500/20 mt-4"
              >
                {t.send}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Floating Badge (Updated for Blue) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-10 right-0 hidden lg:flex items-center gap-4 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 px-6 py-3 rounded-2xl border-4 border-black group"
        >
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
          <p className="text-gray-200 font-black italic tracking-tighter">LET&apos;S GROW TOGETHER</p>
        </motion.div>
      </div>
    </div>
  );
}