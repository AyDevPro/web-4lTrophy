"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const stages = [
  {
    date: '18-19 FÉV',
    title: 'Village Départ',
    location: 'Biarritz, France',
    icon: '🏁',
    description: 'Vérifications techniques, briefing sécurité et départ officiel devant plus de 20 000 spectateurs.',
    color: '#7fb069',
    image: '🇫🇷',
  },
  {
    date: '20 FÉV',
    title: 'Cap vers le Sud',
    location: 'Route vers Algeciras',
    icon: '🚗',
    description: 'Traversée de l\'Espagne en direction du détroit de Gibraltar. Premiers kilomètres d\'adaptation.',
    color: '#f88b29',
    image: '🇪🇸',
  },
  {
    date: '21 FÉV',
    title: 'Traversée du Détroit',
    location: 'Algeciras → Tanger',
    icon: '⛴️',
    description: 'Passage mythique du détroit de Gibraltar. Arrivée en Afrique, début de l\'aventure marocaine.',
    color: '#f57c1f',
    image: '🌊',
  },
  {
    date: '22-26 FÉV',
    title: 'Grand Sud Marocain',
    location: 'Désert & Pistes',
    icon: '🏜️',
    description: '6 étapes de navigation au roadbook dans le désert. Dunes, pistes, oasis et bivouacs sous les étoiles.',
    color: '#f88b29',
    image: '🐪',
  },
  {
    date: '26 FÉV',
    title: 'Erg Chebbi',
    location: 'Merzouga',
    icon: '⛰️',
    description: 'Arrivée aux mythiques dunes de Merzouga. Point culminant de l\'aventure dans le désert.',
    color: '#e67a20',
    image: '🏔️',
  },
  {
    date: '27 FÉV',
    title: 'Ligne d\'Arrivée',
    location: 'Marrakech',
    icon: '🎯',
    description: 'Arrivée triomphale à Marrakech après 6000 km. Célébration avec tous les participants du raid.',
    color: '#e67a20',
    image: '🎉',
  },
];

export default function RouteTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative py-20">
      {/* Ligne de progression */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-white/20 hidden md:block">
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-gradient-to-b from-[#7fb069] via-[#f88b29] to-[#e67a20]"
        />
      </div>

      {/* Étapes */}
      <div className="space-y-24 md:space-y-32">
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative grid md:grid-cols-2 gap-8 items-center ${
              index % 2 === 0 ? '' : 'md:flex-row-reverse'
            }`}
          >
            {/* Contenu gauche/droite */}
            <div
              className={`${
                index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:order-2 md:pl-16'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-block bg-gradient-to-r from-[#f88b29] to-[#e67a20] text-white px-4 py-1 rounded-full text-sm font-bold mb-3"
              >
                {stage.date}
              </motion.div>
              <h3 className="font-archivo font-black text-3xl md:text-4xl text-white mb-2">
                {stage.title}
              </h3>
              <p className="text-[#f88b29] font-semibold text-lg mb-4 flex items-center gap-2 md:justify-end">
                <span className="text-2xl">{stage.icon}</span>
                {stage.location}
              </p>
              <p className="text-white/80 leading-relaxed max-w-md md:ml-auto">
                {stage.description}
              </p>
            </div>

            {/* Point central */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                style={{ backgroundColor: stage.color }}
              >
                {stage.image}
              </motion.div>
            </div>

            {/* Image/Stats droite/gauche */}
            <div className={index % 2 === 0 ? 'md:order-2' : ''}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 text-center"
              >
                <div className="text-8xl mb-4">{stage.image}</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">
                  Étape {index + 1} / {stages.length}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
