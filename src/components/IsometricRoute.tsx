"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Car4L from './Car4L';
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
    description: 'Traversée de l\'Espagne en direction du détroit de Gibraltar.',
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
    description: 'Passage mythique du détroit de Gibraltar. Arrivée en Afrique.',
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
    description: '6 étapes de navigation au roadbook dans le désert.',
    details: [
      'Navigation au roadbook',
      'Pistes et dunes',
      'Bivouacs dans le désert',
      'Assistance mutuelle'
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
    description: 'Arrivée aux mythiques dunes de Merzouga.',
    details: [
      'Dunes de l\'Erg Chebbi',
      'Plus hautes dunes du Maroc',
      'Nuit sous les étoiles',
      'Rencontre avec les locaux'
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
    description: 'Arrivée triomphale à Marrakech après 6000 km.',
    details: [
      'Arrivée officielle',
      'Podium et classement',
      'Remise des prix',
      'Célébration'
    ],
    zone: 'desert'
  }
];

export default function IsometricRoute() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<typeof checkpoints[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const kmProgress = useTransform(scrollYProgress, [0, 1], [0, 6000]);

  // Color zones
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.35, 0.45, 1],
    ['#e0f2fe', '#e0f2fe', '#fef3c7', '#fef3c7', '#1e293b']
  );

  return (
    <>
      <div ref={containerRef} className="relative w-full min-h-[400vh]">
        <motion.div
          className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          {/* Isometric grid background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,0.1) 35px, rgba(0,0,0,0.1) 37px),
                repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(0,0,0,0.1) 35px, rgba(0,0,0,0.1) 37px)
              `,
              y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            }}
          />

          {/* Main isometric road container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Simple isometric road */}
            <motion.div
              className="relative w-48 h-full"
              style={{
                background: useTransform(
                  scrollYProgress,
                  [0, 0.3, 0.35, 0.45, 1],
                  [
                    'linear-gradient(to bottom, #6b7280 0%, #4b5563 100%)',
                    'linear-gradient(to bottom, #6b7280 0%, #4b5563 100%)',
                    'linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%)',
                    'linear-gradient(to bottom, #d97706 0%, #b45309 100%)',
                    'linear-gradient(to bottom, #b45309 0%, #92400e 100%)'
                  ]
                ),
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            >
              {/* Road markings */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-1 h-full"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to bottom, #fbbf24 0%, #fbbf24 8%, transparent 8%, transparent 16%)',
                  y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                }}
              />

              {/* Road edges */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/30" />
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white/30" />
            </motion.div>

            {/* Fixed car in center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <Car4L />
            </div>

            {/* Checkpoints */}
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

            {/* Side decorations - minimalist */}
            <motion.div
              className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.3], [0.3, 0]),
              }}
            >
              {/* Simple trees on sides */}
              {[...Array(6)].map((_, i) => (
                <div key={`left-${i}`} className="absolute left-8" style={{ top: `${i * 18}%` }}>
                  <div className="w-4 h-8 bg-green-600/40 rounded-t" />
                </div>
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={`right-${i}`} className="absolute right-8" style={{ top: `${i * 18}%` }}>
                  <div className="w-4 h-8 bg-green-600/40 rounded-t" />
                </div>
              ))}
            </motion.div>

            {/* Water waves - ferry zone */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: useTransform(scrollYProgress, [0.3, 0.35, 0.4, 0.45], [0, 1, 1, 0]),
              }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 h-1 bg-blue-400/20"
                  style={{ top: `${25 + i * 15}%` }}
                  animate={{ x: [-20, 20, -20] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                />
              ))}
            </motion.div>

            {/* Sand dunes - desert zone */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: useTransform(scrollYProgress, [0.45, 0.5], [0, 0.3]),
              }}
            >
              <svg className="absolute bottom-0 w-full h-1/3 opacity-50" viewBox="0 0 1000 300" preserveAspectRatio="none">
                <path d="M 0 150 Q 250 100, 500 150 T 1000 150 L 1000 300 L 0 300 Z" fill="#d97706" />
              </svg>
            </motion.div>
          </div>

          {/* Kilometer counter - clean design */}
          <motion.div className="absolute top-8 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-2xl border-2 border-gray-200">
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Distance</div>
                <div className="flex items-baseline justify-center gap-2">
                  <motion.span className="font-bold text-4xl text-gray-900">
                    {Math.round(kmProgress.get())}
                  </motion.span>
                  <span className="font-medium text-xl text-gray-500">/ 6000 km</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress bar - minimal */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80 z-40">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-orange-500"
                style={{
                  width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-gray-700 text-xs font-medium">
              <span>🏁 Biarritz</span>
              <span>Marrakech 🎯</span>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg"
            >
              Scrollez pour avancer
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {selectedCheckpoint && (
        <CheckpointModal
          checkpoint={selectedCheckpoint}
          onClose={() => setSelectedCheckpoint(null)}
        />
      )}
    </>
  );
}
