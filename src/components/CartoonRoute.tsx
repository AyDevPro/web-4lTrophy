"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CheckpointModal from './CheckpointModal';
import RouteEnvironment from './RouteEnvironment';
import Car4L from './Car4L';

const checkpoints = [
  {
    id: 1,
    position: 5,
    title: 'Village Départ',
    location: 'Biarritz, France',
    date: '18-19 FÉV',
    icon: '🏁',
    description: 'Vérifications techniques, briefing sécurité et départ officiel.',
    details: ['Contrôle technique', 'Roadbooks', 'Briefing', 'Cérémonie'],
    zone: 'forest'
  },
  {
    id: 2,
    position: 25,
    title: 'Cap vers le Sud',
    location: 'Espagne',
    date: '20 FÉV',
    icon: '🚗',
    description: 'Traversée de l\'Espagne vers Gibraltar.',
    details: ['~1200 km', 'Traversée Espagne', 'Adaptations mécaniques', 'Bivouac'],
    zone: 'forest'
  },
  {
    id: 3,
    position: 40,
    title: 'Détroit',
    location: 'Ferry',
    date: '21 FÉV',
    icon: '⛴️',
    description: 'Passage du détroit de Gibraltar.',
    details: ['Ferry', '2h traversée', 'Douanes', 'Arrivée Maroc'],
    zone: 'ferry'
  },
  {
    id: 4,
    position: 60,
    title: 'Grand Sud',
    location: 'Désert',
    date: '22-26 FÉV',
    icon: '🏜️',
    description: 'Navigation au roadbook dans le désert.',
    details: ['Roadbook', 'Dunes', 'Bivouacs', 'Assistance'],
    zone: 'desert'
  },
  {
    id: 5,
    position: 80,
    title: 'Erg Chebbi',
    location: 'Merzouga',
    date: '26 FÉV',
    icon: '⛰️',
    description: 'Dunes mythiques de Merzouga.',
    details: ['Erg Chebbi', 'Hautes dunes', 'Nuit étoiles', 'Rencontres'],
    zone: 'desert'
  },
  {
    id: 6,
    position: 95,
    title: 'Arrivée',
    location: 'Marrakech',
    date: '27 FÉV',
    icon: '🎯',
    description: 'Arrivée triomphale à Marrakech!',
    details: ['Arrivée officielle', 'Podium', 'Prix', 'Fête'],
    zone: 'desert'
  }
];

export default function CartoonRoute() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<typeof checkpoints[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const kmProgress = useTransform(scrollYProgress, [0, 1], [0, 6000]);
  const leadCarDistance = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const scoutCarDistance = useTransform(scrollYProgress, [0, 1], ['-12%', '88%']);
  const alumniCarDistance = useTransform(scrollYProgress, [0, 1], ['-8%', '104%']);

  // Le path SVG pour CSS offset-path - S simple répété
  const roadPathString = "M250,100 Q200,200 250,300 Q300,400 250,500 Q200,600 250,700 Q300,800 250,900 Q200,1000 250,1100 Q300,1200 250,1300 Q200,1400 250,1500 Q300,1600 250,1700";

  return (
    <>
      <div ref={containerRef} className="relative w-full min-h-[400vh]">
        {/* Titre qui apparaît au début */}
        <div className="container mx-auto px-6 pt-20 pb-10 relative z-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-archivo font-black text-4xl md:text-6xl mb-4 text-white drop-shadow-lg">
              Suivez notre route
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
              Scrollez pour suivre la 4L #311 à travers l'Europe et le désert marocain
            </p>
          </motion.div>
        </div>

        <div
          className="sticky left-0 w-full overflow-hidden"
          style={{ top: 'var(--nav-height)', height: 'calc(100vh - var(--nav-height))' }}
        >
          {/* Use the existing RouteEnvironment component for cleaner backgrounds */}
          <RouteEnvironment scrollProgress={scrollYProgress} />

          {/* SVG Route sinueuse - ULTRA zoomée sur la gauche */}
          <div className="absolute -left-10 md:-left-32 top-0 bottom-0 w-[90%] md:w-[50%] pointer-events-none">
            <svg className="w-full h-full" viewBox="180 400 140 800" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6B7280" />
                  <stop offset="20%" stopColor="#6B7280" />
                  <stop offset="30%" stopColor="#8B8B8B" />
                  <stop offset="40%" stopColor="#f88b29" />
                  <stop offset="65%" stopColor="#f88b29" />
                  <stop offset="100%" stopColor="#f2d2a2" />
                </linearGradient>
              </defs>

              {/* Route principale en S */}
              <path
                id="roadPath"
                d={roadPathString}
                stroke="url(#roadGrad)"
                strokeWidth="40"
                strokeLinecap="round"
                fill="none"
              />

              {/* Ligne centrale pointillée */}
              <motion.path
                d={roadPathString}
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="15,10"
                fill="none"
                opacity="0.6"
                style={{
                  strokeDashoffset: useTransform(scrollYProgress, [0, 1], [0, -1000]),
                }}
              />

              {/* Checkpoints visuels simples - positionnés sur le nouveau S */}
              <circle cx="250" cy="200" r="14" fill="#7fb069" stroke="white" strokeWidth="4" opacity="0.9" />
              <circle cx="250" cy="500" r="14" fill="#f57c1f" stroke="white" strokeWidth="4" opacity="0.9" />
              <circle cx="250" cy="700" r="14" fill="#f57c1f" stroke="white" strokeWidth="4" opacity="0.9" />
              <circle cx="250" cy="900" r="14" fill="#f57c1f" stroke="white" strokeWidth="4" opacity="0.9" />
              <circle cx="250" cy="1100" r="14" fill="#f57c1f" stroke="white" strokeWidth="4" opacity="0.9" />
              <circle cx="250" cy="1500" r="14" fill="#e67a20" stroke="white" strokeWidth="4" opacity="0.9" />
            </svg>
          </div>

          {/* Checkpoint cards sur la droite - style jeu vidéo PLUS GROS */}
          <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-[90%] md:w-[500px] max-w-[calc(100vw-2rem)] pointer-events-auto z-30">
              {checkpoints.map((checkpoint) => {
                const checkpointProgress = checkpoint.position / 100;
                const distanceFromCheckpoint = useTransform(
                  scrollYProgress,
                  [Math.max(0, checkpointProgress - 0.08), checkpointProgress, Math.min(1, checkpointProgress + 0.08)],
                  [0, 1, 0]
                );

                return (
                  <motion.div
                    key={checkpoint.id}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      opacity: distanceFromCheckpoint,
                      scale: useTransform(distanceFromCheckpoint, [0, 1], [0.8, 1]),
                      x: useTransform(distanceFromCheckpoint, [0, 1], [50, 0]),
                    }}
                  >
                    <motion.div
                      onClick={() => setSelectedCheckpoint(checkpoint)}
                      whileHover={{ scale: 1.02, boxShadow: "0 25px 60px rgba(0,0,0,0.35)" }}
                      className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl p-7 shadow-2xl border-4 border-white cursor-pointer backdrop-blur-sm"
                      style={{
                        background: checkpoint.zone === 'forest'
                          ? 'linear-gradient(135deg, #ffffff 0%, #e8f5e9 100%)'
                          : checkpoint.zone === 'ferry'
                          ? 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)'
                          : 'linear-gradient(135deg, #ffffff 0%, #fff3e0 100%)'
                      }}
                    >
                      {/* Header avec icône PLUS GROS */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl md:text-6xl bg-gradient-to-br from-[#f88b29] to-[#e67a20] w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg">
                          {checkpoint.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-1">
                            {checkpoint.date}
                          </div>
                          <h3 className="font-black text-2xl md:text-3xl text-gray-900 leading-tight">
                            {checkpoint.title}
                          </h3>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 mb-4 text-base md:text-lg font-semibold text-gray-600">
                        <span className="text-xl">📍</span>
                        <span>{checkpoint.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                        {checkpoint.description}
                      </p>

                      {/* Details list */}
                      <div className="grid grid-cols-2 gap-3">
                        {checkpoint.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm md:text-base bg-white/50 rounded-xl px-3 py-2.5">
                            <span className="text-[#f88b29] mt-0.5 text-lg">✓</span>
                            <span className="text-gray-700 font-medium">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Click hint */}
                      <div className="mt-4 text-center">
                        <span className="inline-block text-sm md:text-base font-bold text-[#f88b29] bg-orange-50 px-5 py-2 rounded-full">
                          Cliquez pour plus d'infos
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
          </div>

          {/* 4L qui suit le chemin avec CSS offset-path - container séparé pour être sur la route */}
          <div className="absolute -left-10 md:-left-32 top-0 bottom-0 w-[90%] md:w-[50%] pointer-events-none z-20">
            <svg className="w-full h-full" viewBox="180 400 140 800" preserveAspectRatio="xMidYMid meet" style={{ opacity: 0 }}>
              <path d={roadPathString} />
            </svg>
            <motion.div
              className="absolute w-[100px] h-[100px] md:w-[140px] md:h-[140px]"
              style={{
                offsetPath: `path('${roadPathString}')`,
                WebkitOffsetPath: `path('${roadPathString}')`,
                offsetDistance: leadCarDistance,
                WebkitOffsetDistance: leadCarDistance,
                offsetRotate: 'auto',
              }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2 scale-[1.3] md:scale-[1.5]">
                <Car4L showLabel={false} />
              </div>
            </motion.div>

            <motion.div
              className="absolute w-[70px] h-[70px] md:w-[110px] md:h-[110px]"
              style={{
                offsetPath: `path('${roadPathString}')`,
                WebkitOffsetPath: `path('${roadPathString}')`,
                offsetDistance: scoutCarDistance,
                WebkitOffsetDistance: scoutCarDistance,
                offsetRotate: 'auto',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 70 70" className="-translate-x-1/2 -translate-y-1/2 drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]">
                <rect x="15" y="5" width="40" height="60" rx="6" fill="#0ea5e9" />
                <rect x="18" y="8" width="34" height="15" rx="4" fill="#38bdf8" />
                <rect x="20" y="24" width="30" height="10" rx="2" fill="#bae6fd" opacity="0.8" />
                <rect x="20" y="46" width="30" height="8" rx="2" fill="#bae6fd" opacity="0.8" />
                <rect x="16" y="60" width="38" height="6" rx="2" fill="#0284c7" />
                <rect x="12" y="18" width="6" height="12" rx="2" fill="#111827" />
                <rect x="52" y="18" width="6" height="12" rx="2" fill="#111827" />
                <rect x="12" y="42" width="6" height="12" rx="2" fill="#111827" />
                <rect x="52" y="42" width="6" height="12" rx="2" fill="#111827" />
                <circle cx="24" cy="12" r="4" fill="#fef3c7" />
                <circle cx="46" cy="12" r="4" fill="#fef3c7" />
                <circle cx="24" cy="58" r="3" fill="#fef08a" />
                <circle cx="46" cy="58" r="3" fill="#fef08a" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute w-[90px] h-[90px] md:w-[120px] md:h-[120px]"
              style={{
                offsetPath: `path('${roadPathString}')`,
                WebkitOffsetPath: `path('${roadPathString}')`,
                offsetDistance: alumniCarDistance,
                WebkitOffsetDistance: alumniCarDistance,
                offsetRotate: 'auto',
              }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2 scale-125">
                <Car4L showLabel={false} className="[&_rect]:fill-[#fbbf24] [&_path]:fill-[#f97316]" />
              </div>
            </motion.div>
          </div>

          {/* Fun kilometer counter - responsive */}
          <motion.div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-40">
            <motion.div
              className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white px-6 md:px-10 py-3 md:py-5 rounded-2xl md:rounded-3xl shadow-2xl border-2 md:border-4 border-white"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-[10px] md:text-xs font-black uppercase tracking-wider mb-1">🚗 Distance</div>
                <div className="flex items-baseline justify-center gap-1 md:gap-2">
                  <motion.span className="font-black text-3xl md:text-5xl">
                    {Math.round(kmProgress.get())}
                  </motion.span>
                  <span className="font-bold text-lg md:text-2xl opacity-90">km</span>
                </div>
                <div className="text-[10px] md:text-xs font-bold mt-1">sur 6000 km</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Progress bar - responsive */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[min(80%,320px)] z-40 px-3"
            style={{ bottom: 'clamp(2rem, 8vh, 5rem)' }}
          >
            <div className="bg-white rounded-full h-3 md:h-4 p-1 shadow-xl border-2 md:border-3 border-gray-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500"
                style={{
                  width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                }}
              />
            </div>
            <div className="flex justify-between mt-2 md:mt-3 text-gray-800 font-bold text-xs md:text-sm">
              <span className="bg-white px-2 md:px-3 py-1 rounded-full shadow text-xs md:text-sm">🏁 Biarritz</span>
              <span className="bg-white px-2 md:px-3 py-1 rounded-full shadow text-xs md:text-sm">Marrakech 🎯</span>
            </div>
          </div>

          {/* Scroll hint - responsive */}
          <motion.div
            className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-40"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-gray-900 text-white px-4 md:px-8 py-2 md:py-4 rounded-full font-bold shadow-2xl border-2 md:border-4 border-white text-sm md:text-base"
            >
              ↓ Scrollez ↓
            </motion.div>
          </motion.div>

          {/* Fade mask to hide any leftover route */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0b1e2d]" />
        </div>
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
