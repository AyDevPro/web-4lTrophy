"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const storyBeats = [
  {
    id: "bordeaux",
    phase: "Europe",
    title: "Village départ",
    subtitle: "Biarritz, France",
    description: "Vérif techniques, premiers sponsors au paddock et briefing média avant de passer la ligne de départ.",
    stats: [
      { label: "Checkpoints", value: "4" },
      { label: "Km", value: "0 → 650" },
    ],
    highlight: "On filme les saynètes pour le portfolio (making-of + setup caméra).",
    tone: "forest",
    emoji: "🏁",
  },
  {
    id: "espagne",
    phase: "Transit",
    title: "Cap vers le sud",
    subtitle: "Espagne",
    description: "Autoroutes + nationales, relais entre Antonin & Loric. On documente la 4L en mouvement pour la partie folio.",
    stats: [
      { label: "Étapes", value: "2" },
      { label: "Km", value: "650 → 1800" },
    ],
    highlight: "Plans drone + dashcam utilisés dans la section motion design du CV.",
    tone: "sunset",
    emoji: "🚗",
  },
  {
    id: "detroit",
    phase: "Transition",
    title: "Traversée du détroit",
    subtitle: "Ferry Algeciras → Tanger",
    description: "Pause mécanique, shoot des détails (stickers, rivets) + carnet de bord numérique pour les recruteurs.",
    stats: [
      { label: "Durée", value: "2 h" },
      { label: "Check docs", value: "100%" },
    ],
    highlight: "Séquence timeline + motion graphics importée dans le portfolio.",
    tone: "ocean",
    emoji: "⛴️",
  },
  {
    id: "desert",
    phase: "Raid",
    title: "Grand Sud",
    subtitle: "Désert marocain",
    description: "Roadbook, dunes, nuit en bivouac. On mixe 3D/vidéo pour visualiser la navigation et la solidarité.",
    stats: [
      { label: "Étapes", value: "6" },
      { label: "Temp.", value: "5° → 28°" },
    ],
    highlight: "Création d'un module interactif \"challenge\" pour montrer la résilience dans le folio.",
    tone: "desert",
    emoji: "🏜️",
  },
  {
    id: "arrivee",
    phase: "Final",
    title: "Arrivée",
    subtitle: "Marrakech",
    description: "Podium final + rencontres avec les enfants; on capture des portraits pour la partie storytelling du portfolio.",
    stats: [
      { label: "Km total", value: "6000" },
      { label: "Soutiens", value: "+30" },
    ],
    highlight: "Clôture de la vidéo case study avec mix 3D/overlay UI.",
    tone: "celebration",
    emoji: "🎯",
  },
];

type StoryBeat = (typeof storyBeats)[number];

function StoryPanel({ beat, index, total }: { beat: StoryBeat; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  const gradients: Record<string, string> = {
    forest: "from-[#04291f] via-[#0b3b2d] to-[#0f513c]",
    sunset: "from-[#421907] via-[#b34719] to-[#f88b29]",
    ocean: "from-[#071f2d] via-[#0f3d5e] to-[#2b8fbf]",
    desert: "from-[#2f1c01] via-[#a05f11] to-[#f2d2a2]",
    celebration: "from-[#281144] via-[#7a2f87] to-[#f88b29]",
  };

  return (
    <div ref={ref} className="relative min-h-[80vh] grid lg:grid-cols-2 gap-10 items-center">
      {/* Timeline dot */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-5 h-5 rounded-full border-4 border-white/40 bg-[#f88b29] shadow-2xl"
          animate={{ scale: isInView ? [1, 1.3, 1] : 1, opacity: isInView ? 1 : 0.4 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        />
      </div>

      <motion.div
        style={{ y: translateY }}
        className="space-y-4"
      >
        <motion.span
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-white/60"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {String(index + 1).padStart(2, "0")} / {total} · {beat.phase}
        </motion.span>
        <motion.h3
          className="font-archivo font-black text-4xl md:text-5xl text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {beat.title}
        </motion.h3>
        <motion.p
          className="flex items-center gap-3 text-[#f88b29] text-lg font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-3xl">{beat.emoji}</span>
          {beat.subtitle}
        </motion.p>
        <motion.p
          className="text-white/80 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          {beat.description}
        </motion.p>
        <motion.div
          className="grid sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {beat.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur"
            >
              <div className="text-white/50 text-sm uppercase tracking-wider">{stat.label}</div>
              <div className="text-white text-2xl font-black">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Visual card */}
      <motion.div
        style={{ rotate }}
        className="relative"
      >
        <motion.div
          className={`rounded-[32px] border border-white/10 p-8 min-h-[320px] flex flex-col justify-between overflow-hidden bg-gradient-to-br ${gradients[beat.tone]}`}
          initial={{ opacity: 0.6, scale: 0.96 }}
          animate={{ opacity: isInView ? 1 : 0.6, scale: isInView ? 1 : 0.96 }}
          transition={{ type: "spring", damping: 18, stiffness: 120 }}
        >
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 bg-white/10 blur-3xl"
          />
          <div className="relative z-10">
            <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-4">Micro-animation</p>
            <p className="text-white text-xl leading-relaxed font-semibold">
              {beat.highlight}
            </p>
          </div>
          <motion.div
            className="relative z-10 flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <div>
              <div className="text-white/70 text-sm">Story beat</div>
              <div className="text-white font-black text-3xl">#{index + 1}</div>
            </div>
            <motion.div
              animate={{ rotate: isInView ? [0, 4, -2, 0] : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl"
            >
              {beat.emoji}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function RouteStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-24 bg-[#050c14] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(248,139,41,0.25),_transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] text-white/50 mb-4">Story mode</p>
          <h2 className="font-archivo font-black text-4xl md:text-6xl mb-6">
            Scroll & play
          </h2>
          <p className="text-white/70 text-lg">
            Chaque checkpoint déclenche sa micro animation, utile pour le portfolio et pour suivre l'aventure en direct.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10" />
          <motion.span
            style={{ height: progress }}
            className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#f88b29] via-[#f2d2a2] to-transparent"
          />

          <div className="space-y-24">
            {storyBeats.map((beat, index) => (
              <StoryPanel key={beat.id} beat={beat} index={index} total={storyBeats.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
