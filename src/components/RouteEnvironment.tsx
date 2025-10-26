"use client";

import { motion, MotionValue, useTransform } from 'framer-motion';

interface RouteEnvironmentProps {
  scrollProgress: MotionValue<number>;
}

export default function RouteEnvironment({ scrollProgress }: RouteEnvironmentProps) {
  // Zone transitions
  const forestOpacity = useTransform(scrollProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const ferryOpacity = useTransform(scrollProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const desertOpacity = useTransform(scrollProgress, [0.45, 0.55, 1], [0, 1, 1]);

  return (
    <>
      {/* 3D Perspective container for all environments */}
      <div
        className="absolute inset-0"
        style={{
          perspective: '800px',
          perspectiveOrigin: 'center top',
          top: '-6vh',
          bottom: '-4vh',
        }}
      >

        {/* Forest Zone (France/Spain) - WITH 3D GROUND */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: forestOpacity,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Sky - stays flat */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#87ceeb] via-[#a8d8ea] to-[#c8e6f5]" />

          {/* Clouds - stays flat */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-30"
              style={{
                left: `${15 + i * 30}%`,
                top: `${8 + i * 5}%`,
              }}
              animate={{
                x: [0, 30, 0],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg width="100" height="50" viewBox="0 0 100 50">
                <ellipse cx="30" cy="30" rx="20" ry="15" fill="white" opacity="0.6" />
                <ellipse cx="50" cy="25" rx="25" ry="18" fill="white" opacity="0.6" />
                <ellipse cx="70" cy="30" rx="20" ry="15" fill="white" opacity="0.6" />
              </svg>
            </motion.div>
          ))}

          {/* Ground plane - 3D tilted */}
          <div
            className="absolute bottom-[12vh] left-0 right-0 h-[140vh] origin-top"
            style={{
              transform: 'rotateX(68deg) translateZ(-60px)',
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(to bottom, #22c55e 0%, #15803d 60%, #0f2c19 100%)',
            }}
          />

          {/* Mountains - in 3D space */}
          <svg
            className="absolute bottom-[-22vh] w-full opacity-45"
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            style={{
              transform: 'rotateX(50deg) translateZ(-10px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <path
              d="M 0 280 L 120 140 L 280 260 L 480 130 L 700 250 L 940 200 L 1200 300 L 1200 520 L 0 520 Z"
              fill="#2d5016"
            />
            <path
              d="M 0 360 L 160 220 L 340 320 L 560 210 L 780 320 L 1000 280 L 1200 360 L 1200 520 L 0 520 Z"
              fill="#1f3d11"
              opacity="0.8"
            />
            <path
              d="M 0 430 L 200 300 L 420 400 L 650 320 L 900 380 L 1200 420 L 1200 520 L 0 520 Z"
              fill="#13270a"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {/* Ferry Zone (Gibraltar Strait) - WITH 3D WATER - PLUS BLEU */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: ferryOpacity,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Sky gradient - PLUS BLEU */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#87CEEB] to-[#B0E2FF]" />

          {/* Sun */}
          <motion.div
            className="absolute top-24 right-32 opacity-60"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#f59e0b]" />
          </motion.div>

          {/* Water plane - 3D tilted - ENCORE PLUS BLEU */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[200vh] origin-top"
            style={{
              transform: 'rotateX(75deg) translateZ(-100px)',
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(to bottom, #1e90ff 0%, #1c86ee 50%, #1874cd 100%)',
            }}
          >
            {/* Wave patterns */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 3px, transparent 3px, transparent 100px)',
                y: useTransform(scrollProgress, [0.3, 0.5], ['0%', '100%']),
              }}
            />
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 80px)',
                x: useTransform(scrollProgress, [0.3, 0.5], ['0%', '50%']),
              }}
            />
          </div>

          {/* Ferry - on the water */}
          <motion.div
            className="absolute opacity-50"
            style={{
              left: '35%',
              bottom: '30%',
              transform: 'rotateX(-15deg) translateZ(20px)',
            }}
            animate={{
              y: [0, -10, 0],
              rotateZ: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="100" height="50" viewBox="0 0 100 50">
              <path d="M 5 30 L 0 40 L 100 40 L 95 30 Z" fill="#dc2626" />
              <rect x="15" y="18" width="70" height="12" rx="2" fill="white" />
              <rect x="40" y="10" width="10" height="8" fill="#6b7280" />
            </svg>
          </motion.div>

          {/* Seagulls */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-40"
              style={{
                left: `${30 + i * 40}%`,
                top: `${15 + i * 10}%`,
              }}
              animate={{
                x: [0, 150, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg width="20" height="15" viewBox="0 0 20 15">
                <path d="M 3 8 Q 8 3, 13 8 Q 15 3, 17 8" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </motion.div>
          ))}
        </motion.div>

        {/* Desert Zone (Morocco) - WITH 3D SAND */}
        <motion.div
          className="absolute left-0 right-0 overflow-hidden"
          style={{
            top: '2vh',
            bottom: '-10vh',
            opacity: desertOpacity,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Sky gradient */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: useTransform(
                scrollProgress,
                [0.5, 0.75, 1],
                [
                  'linear-gradient(to bottom, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)',
                  'linear-gradient(to bottom, #fb923c 0%, #f59e0b 50%, #fbbf24 100%)',
                  'linear-gradient(to bottom, #1e1b4b 0%, #312e81 50%, #4338ca 100%)'
                ]
              )
            }}
          />

          {/* Sun/Moon */}
          <motion.div
            className="absolute top-20 right-28"
            style={{
              opacity: useTransform(scrollProgress, [0.5, 0.8, 1], [0.6, 0.4, 0.2]),
            }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#f59e0b]"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Stars (night) */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useTransform(scrollProgress, [0.8, 1], [0, 0.8]),
            }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>

          {/* Sand ground plane - 3D tilted */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[200vh] origin-top"
            style={{
              transform: 'rotateX(75deg) translateZ(-100px)',
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(to bottom, #f59e0b 0%, #d97706 50%, #b45309 100%)',
            }}
          >
            {/* Sand ripples */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 40px)',
                y: useTransform(scrollProgress, [0.5, 1], ['0%', '100%']),
              }}
            />
          </div>

          {/* Dunes - in 3D space */}
          <svg
            className="absolute bottom-[-12vh] w-full opacity-55"
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            style={{
              transform: 'rotateX(52deg) translateZ(-20px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <path
              d="M 0 260 Q 160 140, 320 240 T 640 200 T 1000 260 L 1000 520 L 0 520 Z"
              fill="#d97706"
            />
            <path
              d="M 0 360 Q 220 220, 440 340 T 880 320 T 1200 360 L 1200 520 L 0 520 Z"
              fill="#b45309"
            />
            <path
              d="M 0 430 Q 200 300, 400 420 T 800 400 T 1100 430 L 1100 520 L 0 520 Z"
              fill="#92400e"
              opacity="0.8"
            />
          </svg>

          {/* Palm trees on sides - on ground */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className={`absolute opacity-35 ${i === 0 ? 'left-16' : 'right-16'}`}
              style={{
                bottom: '25%',
                transform: 'rotateX(-10deg) translateZ(15px)',
              }}
              animate={{
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="50" height="80" viewBox="0 0 50 80">
                <path d="M 23 80 Q 21 40, 23 25 Q 25 40, 23 80" fill="#6b4423" />
                <ellipse cx="25" cy="20" rx="15" ry="22" fill="#22c55e" />
                <ellipse cx="15" cy="25" rx="12" ry="18" fill="#16a34a" transform="rotate(-30 25 25)" />
                <ellipse cx="35" cy="25" rx="12" ry="18" fill="#16a34a" transform="rotate(30 25 25)" />
              </svg>
            </motion.div>
          ))}

          {/* Subtle sand particles */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useTransform(scrollProgress, [0.5, 0.7], [0, 0.4]),
            }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#fbbf24]/40 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `${20 + Math.random() * 30}%`,
                }}
                animate={{
                  x: [-10, -40],
                  y: [0, -20],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
