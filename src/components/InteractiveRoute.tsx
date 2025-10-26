"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Car4L from './Car4L';
import RouteEnvironment from './RouteEnvironment';
import DynamicRoad from './DynamicRoad';
import Checkpoint from './Checkpoint';
import CheckpointModal from './CheckpointModal';

const checkpoints = [
  {
    id: 1,
    position: 5,
    title: 'Village Départ',
    location: 'Biarritz, France',
    date: '18-19 FÉV',
    icon: '🏁',
    description: 'Vérifications techniques, briefing sécurité et départ officiel devant plus de 20 000 spectateurs.',
    details: [
      'Contrôle technique obligatoire',
      'Distribution des roadbooks',
      'Briefing de sécurité',
      'Cérémonie de départ'
    ],
    zone: 'forest'
  },
  {
    id: 2,
    position: 20,
    title: 'Cap vers le Sud',
    location: 'Route vers Algeciras',
    date: '20 FÉV',
    icon: '🚗',
    description: 'Traversée de l\'Espagne en direction du détroit de Gibraltar. Premiers kilomètres d\'adaptation.',
    details: [
      '~1200 km de route',
      'Traversée de l\'Espagne',
      'Premières adaptations mécaniques',
      'Bivouac en autonomie'
    ],
    zone: 'forest'
  },
  {
    id: 3,
    position: 35,
    title: 'Traversée du Détroit',
    location: 'Algeciras → Tanger',
    date: '21 FÉV',
    icon: '⛴️',
    description: 'Passage mythique du détroit de Gibraltar. Arrivée en Afrique, début de l\'aventure marocaine.',
    details: [
      'Ferry Algeciras-Tanger',
      '~2h de traversée',
      'Formalités douanières',
      'Arrivée au Maroc'
    ],
    zone: 'ferry'
  },
  {
    id: 4,
    position: 55,
    title: 'Grand Sud Marocain',
    location: 'Désert & Pistes',
    date: '22-26 FÉV',
    icon: '🏜️',
    description: '6 étapes de navigation au roadbook dans le désert. Dunes, pistes, oasis et bivouacs sous les étoiles.',
    details: [
      'Navigation au roadbook',
      'Pistes et dunes',
      'Bivouacs dans le désert',
      'Assistance mutuelle entre équipages'
    ],
    zone: 'desert'
  },
  {
    id: 5,
    position: 75,
    title: 'Erg Chebbi',
    location: 'Merzouga',
    date: '26 FÉV',
    icon: '⛰️',
    description: 'Arrivée aux mythiques dunes de Merzouga. Point culminant de l\'aventure dans le désert.',
    details: [
      'Dunes de l\'Erg Chebbi',
      'Plus hautes dunes du Maroc',
      'Nuit sous les étoiles',
      'Rencontre avec les populations locales'
    ],
    zone: 'desert'
  },
  {
    id: 6,
    position: 95,
    title: 'Ligne d\'Arrivée',
    location: 'Marrakech',
    date: '27 FÉV',
    icon: '🎯',
    description: 'Arrivée triomphale à Marrakech après 6000 km. Célébration avec tous les participants du raid.',
    details: [
      'Arrivée officielle',
      'Podium et classement',
      'Remise des prix',
      'Célébration collective'
    ],
    zone: 'desert'
  }
];

export default function InteractiveRoute() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<typeof checkpoints[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate kilometer progress
  const kmProgress = useTransform(scrollYProgress, [0, 1], [0, 6000]);

  return (
    <>
      <div ref={containerRef} className="relative w-full min-h-[400vh]">
        {/* Sticky container for the route visualization */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-gradient-to-b from-[#0b1e2d] to-[#1a3a52]">
          {/* Environment backgrounds - these scroll */}
          <RouteEnvironment scrollProgress={scrollYProgress} />

          {/* Dynamic winding road with 3D perspective */}
          <DynamicRoad scrollProgress={scrollYProgress} />

          {/* Fixed 4L Car in center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <Car4L />
          </div>

          {/* Checkpoints - positioned absolutely, scroll reveals them */}
          <div className="absolute inset-0 pointer-events-none">
            {checkpoints.map((checkpoint) => {
              const checkpointProgress = checkpoint.position / 100;
              const distanceFromCar = useTransform(
                scrollYProgress,
                [Math.max(0, checkpointProgress - 0.1), checkpointProgress, Math.min(1, checkpointProgress + 0.1)],
                [100, 0, -100]
              );

              return (
                <motion.div
                  key={checkpoint.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 pointer-events-auto"
                  style={{
                    y: useTransform(distanceFromCar, (v) => `${v}vh`),
                  }}
                >
                  <Checkpoint
                    checkpoint={checkpoint}
                    onClick={() => setSelectedCheckpoint(checkpoint)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Kilometer counter - much more visible */}
          <motion.div className="absolute top-8 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-gradient-to-br from-[#f88b29] to-[#e67a20] text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-white/30">
              <div className="text-center">
                <div className="text-sm font-bold opacity-90 mb-1">DISTANCE PARCOURUE</div>
                <div className="flex items-baseline justify-center gap-2">
                  <motion.span className="font-archivo font-black text-5xl">
                    {Math.round(kmProgress.get())}
                  </motion.span>
                  <span className="font-bold text-2xl opacity-80">km</span>
                </div>
                <div className="text-xs opacity-75 mt-1">sur 6000 km</div>
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 md:w-96 z-40">
            <div className="bg-white/10 backdrop-blur-sm rounded-full h-3 overflow-hidden border-2 border-white/30">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7fb069] via-[#f88b29] to-[#e67a20]"
                style={{
                  width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-white text-xs font-bold">
              <span>🏁 Biarritz</span>
              <span>Marrakech 🎯</span>
            </div>
          </div>

          {/* Scroll hint (appears at start) */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/80 text-center pointer-events-none z-40"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm font-semibold bg-[#f88b29] px-6 py-2 rounded-full shadow-lg">
                Scrollez pour avancer
              </span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Checkpoint Modal */}
      {selectedCheckpoint && (
        <CheckpointModal
          checkpoint={selectedCheckpoint}
          onClose={() => setSelectedCheckpoint(null)}
        />
      )}
    </>
  );
}
