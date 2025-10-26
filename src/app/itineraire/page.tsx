"use client";

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RouteGlobe from '@/components/RouteGlobe';
import CartoonRoute from '@/components/CartoonRoute';
import RouteStats from '@/components/RouteStats';

export default function ItinerairePage() {
  return (
    <>
      <Navigation />

      <main className="bg-gradient-to-b from-[#0b1e2d] via-[#1a3a52] to-[#0b1e2d] text-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-36 pb-12">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e2d] via-[#1a3a52] to-[#f88b29] opacity-80" />

          {/* Floating particles - optimized */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{
                  opacity: Math.random() * 0.3,
                }}
                animate={{
                  y: [0, -800],
                  opacity: [null, 0],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Title and intro */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block bg-gradient-to-r from-[#f88b29] to-[#e67a20] text-white px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-white/30"
                >
                  ITINÉRAIRE 2026
                </motion.div>

                <h1 className="font-archivo font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-none">
                  6000 KM
                  <br />
                  <span className="text-[#f88b29]">D'AVENTURE</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  De Biarritz à Marrakech, suivez notre périple à travers l'Europe et le désert marocain.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                    <span className="text-2xl">🏁</span>
                    <span className="font-semibold">18 Février 2026</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                    <span className="text-2xl">🎯</span>
                    <span className="font-semibold">27 Février 2026</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: 3D Globe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative h-[400px] md:h-[500px] lg:h-[600px]"
              >
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white/50 text-xl">Chargement de la carte 3D...</div>
                  </div>
                }>
                  <RouteGlobe className="w-full h-full" />
                </Suspense>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-center"
          >
            <div className="text-sm mb-2">Scroll pour découvrir</div>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f88b29]/10 to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-archivo font-black text-4xl md:text-6xl mb-4">
                Le raid en chiffres
              </h2>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
                Une aventure hors du commun à travers deux continents
              </p>
            </motion.div>

            <RouteStats />
          </div>
        </section>

        {/* Interactive Route Section */}
        <section className="relative -mt-20">
          <CartoonRoute />
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f88b29] via-[#e67a20] to-[#f88b29] opacity-20" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-2 border-white/20 rounded-3xl p-12"
            >
              <h2 className="font-archivo font-black text-3xl md:text-5xl mb-6">
                Suivez l'aventure en direct
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
                Pendant le raid, retrouvez nos actualités quotidiennes, photos et vidéos en temps réel sur nos réseaux sociaux.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#f88b29] to-[#e67a20] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Nous contacter
                </motion.a>
                <motion.a
                  href="/sponsors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  Devenir partenaire
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
