"use client";
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from "@/src/components/contexts/language_context";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { FaDownload, FaPaperPlane, FaTimes } from 'react-icons/fa';
import Image from "next/image";



// Section Bio avec cartes animées
function BioSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: ""
  });

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Envoi de la demande...");

    try {
      const res = await fetch("/api/request-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Demande envoyée ! Adrien vous répondra bientôt.", { id: loadingToast });
        setIsOpen(false);
        setFormData({ name: "", email: "", reason: "" });
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Erreur lors de l'envoi de la demande.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const texts = {
    fr: {
      years: "Né le 27 Février 1996 à Tchetti , Savalou , Collines, Bénin",
      matrimonial: "Disciple de Jésus Christ et étudiant à l'Université de la Côte d'Ivoire",
      title: "À propos de moi",
      role: "Expert en Systèmes Alimentaires & Business Development Nutritionnel",
      intro: `Je me distingue par ma passion pour l'innovation inclusive et mon engagement à transformer les systèmes alimentaires africains.`,
      desc: `Je suis du genre à vouloir créer des opportunités pour les autres en permanence, avec tous les outils ou toutes les compétences dont je dispose. Je veux créer des innovations ou des entreprises capables de générer des opportunités pour les autres, pour le plus grand nombre de personnes possible.
`,
      button: "Découvrir mes réalisations",
      button1: "Télécharger CV",
      cvDes: "Veuillez justifier votre demande pour recevoir le CV d'Adrien.",
      cvDemande: "Demander le CV",
      nam: "Nom Complet",
      email: "Votre Email",
      reason: "Raison de la demande",
      sendRequest: "Envoyer la demande",
      me: "Je suis ",
      academicTitle: "Parcours Académique",
      academic: [
        { year: "2024", title: "Doctorat", desc: "Étude des environnements alimentaires en zones sèches." },
        { year: "2019", title: "Master", desc: "Nutrition humaine et sécurité alimentaire (Université d’Abomey-Calavi)." },
        { year: "2016", title: "Licence", desc: "Nutrition et sciences agroalimentaires (Université de Parakou)." },
        { year: "2013", title: "Baccalauréat", desc: "Série D, CEG1 Abomey-Calavi." }
      ]
    },
    en: {
      years: "Born on February 27, 1996 in Tchetti, Savalou, Collines, Benin",
      title: "About Me",
      role: "Food Systems Expert & Nutritional Business Development",
      intro: `I stand out for my passion for inclusive innovation and my commitment to transforming African food systems.`,
      desc: `I combine scientific expertise and entrepreneurial vision to combat malnutrition. My background, marked by a PhD in nutrition, has allowed me to develop healthier food environments and support the development of agribusiness in Africa.`,
      button: "View My Work",
      button1: "Download CV",
      cvDes: "Please justify your request to receive Adrien's CV.",
      cvDemande: "Request the CV",
      nam: "Full Name",
      email: "Your Email",
      reason: "Reason for the request",
      sendRequest: "Send request",
      me: "I'm ",
      academicTitle: "Academic Background",
      academic: [
        { year: "2024", title: "PhD", desc: "Study of food environments in drylands." },
        { year: "2019", title: "Master's Degree", desc: "Human Nutrition and Food Security (University of Abomey-Calavi)." },
        { year: "2016", title: "Bachelor's Degree", desc: "Nutrition and Agri-food Sciences (University of Parakou)." },
        { year: "2013", title: "High School Diploma", desc: "Science Major, CEG1 Abomey-Calavi." }
      ]
    },
    es: {
      years: "Nacido el 27 de febrero de 1996 en Tchetti, Savalou, Collines, Benin",
      title: "Sobre Mí",
      role: "Experto en Sistemas Alimentarios y Desarrollo de Negocios Nutricionales",
      intro: `Me destaco por mi pasión por la innovación inclusiva y mi compromiso con la transformación de los sistemas alimentarios africanos.`,
      desc: `Combino experiencia científica y visión emprendedora para combatir la desnutrición. Mi formación, marcada por un doctorado en nutrición, me ha permitido desarrollar entornos alimentarios más saludables y apoyar el desarrollo de los agronegocios en África.`,
      button: "Ver Mis Proyectos",
      button1: "Descargar CV",
      cvDes: "Por favor, justifique su solicitud para recibir el CV de Adrien.",
      cvDemande: "Solicitar el CV",
      nam: "Nombre completo",
      email: "Su correo electrónico",
      reason: "Motivo de la solicitud",
      sendRequest: "Enviar solicitud",
      me: "Soy ",
      academicTitle: "Formación Académica",
      academic: [
        { year: "2024", title: "Doctorado", desc: "Estudio de los entornos alimentarios en zonas secas." },
        { year: "2019", title: "Maestría", desc: "Nutrición Humana y Seguridad Alimentaria (Universidad de Abomey-Calavi)." },
        { year: "2016", title: "Licenciatura", desc: "Nutrición y Ciencias Agroalimentarias (Universidad de Parakou)." },
        { year: "2013", title: "Bachillerato", desc: "Serie D, CEG1 Abomey-Calavi." }
      ]
    },

  };

  const { language, setLanguage } = useLanguage();
  // Sauvegarder la langue
  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const t = texts[language as keyof typeof texts] || texts.en;

  return (
    <section className="relative bg-gradient-to-b from-black to-gray-900 py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative w-full aspect-square bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 " />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/image/adrien.png" alt="Adrien DOGO" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-16 -right-16">
                <div className="w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
              </div>

            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-5xl font-bold text-white">
              {t.me} <span className="text-blue-500">Adrien DOGO</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t.years}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t.intro}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {t.desc}
            </p>
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-blue-500 text-blue-500 font-semibold rounded-full hover:bg-blue-500 hover:text-black transition-all flex items-center text-sm sm:text-base"
            >
              <FaDownload className="inline-block mr-2" />
              {t.button1}
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  />

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative bg-gray-900 border border-blue-500/30 p-8 rounded-3xl max-w-md w-full shadow-2xl"
                  >
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                      <FaTimes size={20} />
                    </button>

                    <h3 className="text-2xl font-bold text-white mb-2">{t.cvDemande}</h3>
                    <p className="text-gray-400 mb-6 text-sm">{t.cvDes}</p>

                    <form onSubmit={handleRequest} className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">{t.nam}</label>
                        <input
                          required type="text"
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">{t.email}</label>
                        <input
                          required type="email"
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">{t.reason}</label>
                        <textarea
                          required rows={3}
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                          placeholder="Ex: Recrutement pour le poste de..."
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        />
                      </div>

                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        <FaPaperPlane size={14} />
                        {isSubmitting ? "Envoi..." : t.sendRequest}
                      </button>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Dynamic Academic Background Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">{t.academicTitle}</h3>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </div>

          {/* Nouveau conteneur Flex pour diviser Gauche (Cartes) et Droite (Image) */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">

            {/* Section de gauche : Grille de 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-2/3">
              {t.academic.map((edu, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all group"
                >
                  <span className="text-blue-500 font-bold text-2xl mb-4 block group-hover:scale-110 transition-transform">
                    {edu.year}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2">{edu.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Section de droite : Image */}
            <div className="w-full lg:w-1/3 h-full flex justify-center">
              <div className="relative w-full h-full rounded-full aspect-square max-w-[400px]">
                <Image
                  src="/image/dogd.jpeg" // Remplacez par votre chemin d'image
                  alt="Education Illustration"
                  fill
                  className="object-contain rounded-full border-4 border-l-blue-500"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default BioSection;