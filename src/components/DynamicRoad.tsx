"use client";

import { motion, MotionValue, useTransform } from 'framer-motion';

interface DynamicRoadProps {
  scrollProgress: MotionValue<number>;
}

export default function DynamicRoad({ scrollProgress }: DynamicRoadProps) {
  // Determine road style based on scroll progress
  const roadColor = useTransform(
    scrollProgress,
    [0, 0.3, 0.35, 0.4, 0.45, 1],
    ['#4b5563', '#4b5563', '#6b7280', '#8b7355', '#a67c52', '#c19a6b']
  );

  const roadWidth = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    ['160px', '140px', '120px'] // Narrows as we go into desert
  );

  // Create winding effect - the road sways left and right
  const roadOffset = useTransform(
    scrollProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    ['0%', '-15%', '12%', '-10%', '15%', '-12%', '8%', '0%']
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 3D Perspective container */}
      <div className="absolute inset-0" style={{ perspective: '600px' }}>
        {/* Main road with perspective */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 origin-bottom"
          style={{
            width: roadWidth,
            x: roadOffset,
            translateX: '-50%',
            transformStyle: 'preserve-3d',
            rotateX: '60deg',
            scaleY: '2.5',
          }}
        >
          {/* Road base with gradient for depth */}
          <motion.div
            className="absolute inset-0 rounded-t-3xl"
            style={{
              background: useTransform(
                scrollProgress,
                [0, 0.3, 0.4, 1],
                [
                  'linear-gradient(to bottom, #374151 0%, #4b5563 50%, #6b7280 100%)',
                  'linear-gradient(to bottom, #374151 0%, #4b5563 50%, #6b7280 100%)',
                  'linear-gradient(to bottom, #8b7355 0%, #a67c52 50%, #c19a6b 100%)',
                  'linear-gradient(to bottom, #a67c52 0%, #c19a6b 50%, #d4af85 100%)'
                ]
              ),
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 -10px 30px rgba(0,0,0,0.2)',
            }}
          >
            {/* Road edge lines (white) */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/40" />
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40" />

            {/* Center dashed line - animated */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-1 h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0%, transparent 40%, #fbbf24 40%, #fbbf24 80%, transparent 80%)',
                backgroundSize: '100% 80px',
                y: useTransform(scrollProgress, (v) => `${(v * 200) % 100}%`),
              }}
            />

            {/* Tire marks (appear in curves) */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                opacity: useTransform(
                  scrollProgress,
                  [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.55, 0.6],
                  [0, 0.3, 0, 0.4, 0, 0.3, 0, 0.2]
                ),
              }}
            >
              <div className="absolute left-[20%] top-0 w-4 h-full bg-black/20 blur-sm" style={{ transform: 'skewY(-2deg)' }} />
              <div className="absolute right-[20%] top-0 w-4 h-full bg-black/20 blur-sm" style={{ transform: 'skewY(2deg)' }} />
            </motion.div>

            {/* Road cracks (appear more in desert) */}
            <motion.div
              style={{
                opacity: useTransform(scrollProgress, [0, 0.4, 1], [0.1, 0.2, 0.5]),
              }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-black/30"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${i * 12}%`,
                    width: `${20 + Math.random() * 30}%`,
                    transform: `rotate(${-10 + Math.random() * 20}deg)`,
                  }}
                />
              ))}
            </motion.div>

            {/* Puddles/water on road (rainy sections) */}
            <motion.div
              style={{
                opacity: useTransform(scrollProgress, [0.1, 0.15, 0.2, 0.25], [0, 0.3, 0.3, 0]),
              }}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/30 blur-sm"
                  style={{
                    left: `${20 + i * 25}%`,
                    top: `${i * 30}%`,
                    width: `${40 + Math.random() * 20}px`,
                    height: `${20 + Math.random() * 10}px`,
                  }}
                />
              ))}
            </motion.div>

            {/* Dust/sand particles (desert sections) */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: useTransform(scrollProgress, [0.4, 0.5, 1], [0, 0.4, 0.6]),
              }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-600/40 rounded-full blur-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, -20, -40],
                    opacity: [0.4, 0.6, 0],
                    scale: [0.5, 1, 1.5],
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'linear',
                  }}
                />
              ))}
            </motion.div>

            {/* Road bumps/elevation changes */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(to bottom, transparent 0%, transparent 48%, rgba(0,0,0,0.05) 48%, rgba(0,0,0,0.05) 52%, transparent 52%)',
                backgroundSize: '100% 150px',
                y: useTransform(scrollProgress, (v) => `${(v * 300) % 100}%`),
                opacity: 0.3,
              }}
            />
          </motion.div>

          {/* Road shoulders/edges with grass/sand */}
          <motion.div
            className="absolute -left-8 top-0 bottom-0 w-8 rounded-l-2xl"
            style={{
              background: useTransform(
                scrollProgress,
                [0, 0.3, 0.4, 1],
                ['#22c55e', '#22c55e', '#c19a6b', '#d4af85']
              ),
              opacity: 0.6,
            }}
          />
          <motion.div
            className="absolute -right-8 top-0 bottom-0 w-8 rounded-r-2xl"
            style={{
              background: useTransform(
                scrollProgress,
                [0, 0.3, 0.4, 1],
                ['#22c55e', '#22c55e', '#c19a6b', '#d4af85']
              ),
              opacity: 0.6,
            }}
          />
        </motion.div>

        {/* Horizon line effect */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            opacity: useTransform(scrollProgress, [0, 0.5, 1], [0.3, 0.5, 0.2]),
          }}
        />
      </div>
    </div>
  );
}
