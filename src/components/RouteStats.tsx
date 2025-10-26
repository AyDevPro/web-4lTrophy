"use client";

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
  delay?: number;
}

function AnimatedCounter({ value, suffix, label, icon, color, delay = 0 }: StatCardProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const controls = animate(count, value, {
            duration: 2,
            delay,
            ease: "easeOut",
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [count, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-2 border-white/20 rounded-3xl p-8 text-center overflow-hidden">
        {/* Glow effect */}
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-80"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${color}, transparent)`
          }}
        />

        <div className="text-6xl mb-4">{icon}</div>
        <motion.div
          className="font-archivo font-black text-5xl md:text-6xl mb-2"
          style={{ color }}
        >
          <motion.span>{rounded}</motion.span>
          <span className="text-3xl ml-1">{suffix}</span>
        </motion.div>
        <div className="text-white/80 font-semibold text-lg">
          {label}
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-30"
              style={{ backgroundColor: color }}
              initial={{
                x: Math.random() * 100 + '%',
                y: '100%',
                scale: 0
              }}
              animate={{
                y: '-20%',
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function RouteStats() {
  const stats = [
    { value: 6000, suffix: 'km', label: 'Distance totale', icon: '🛣️', color: '#f88b29' },
    { value: 12, suffix: 'jours', label: 'Durée du raid', icon: '📅', color: '#7fb069' },
    { value: 6, suffix: 'étapes', label: 'Navigation désert', icon: '🧭', color: '#f57c1f' },
    { value: 2, suffix: 'pays', label: 'Traversés', icon: '🌍', color: '#e67a20' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <AnimatedCounter key={index} {...stat} delay={index * 0.1} />
      ))}
    </div>
  );
}
