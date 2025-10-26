"use client";

import { motion } from 'framer-motion';

type Car4LProps = {
  showLabel?: boolean;
  className?: string;
};

export default function Car4L({ showLabel = true, className = '' }: Car4LProps) {
  return (
    <motion.div className={`relative ${className}`}>
      {/* Car body - FIXED in center, no scroll movement */}
      <div className="relative w-24 h-16 sm:w-28 sm:h-18 md:w-32 md:h-20">
        {/* Dust particles behind car */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2"
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 2],
            x: [-10, -20, -30]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          <div className="w-6 h-6 rounded-full bg-[#f88b29]/40 blur-md" />
        </motion.div>

        {/* Main car body */}
        <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-2xl">
          {/* Car shadow */}
          <ellipse cx="50" cy="58" rx="35" ry="5" fill="rgba(0,0,0,0.3)" />

          {/* Car body - main */}
          <rect x="10" y="30" width="80" height="20" rx="3" fill="#f88b29" />

          {/* Car cabin */}
          <path
            d="M 25 30 L 30 15 L 70 15 L 75 30 Z"
            fill="#e67a20"
          />

          {/* Windows */}
          <path
            d="M 32 17 L 35 28 L 48 28 L 48 17 Z"
            fill="#60a5fa"
            opacity="0.7"
          />
          <path
            d="M 52 17 L 52 28 L 65 28 L 68 17 Z"
            fill="#60a5fa"
            opacity="0.7"
          />

          {/* Wheels - with rotation animation */}
          <g>
            <circle cx="25" cy="50" r="8" fill="#1f2937" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "25px 50px" }}
            >
              <circle cx="25" cy="50" r="5" fill="#4b5563" />
              <line x1="25" y1="45" x2="25" y2="55" stroke="#1f2937" strokeWidth="1.5" />
              <line x1="20" y1="50" x2="30" y2="50" stroke="#1f2937" strokeWidth="1.5" />
            </motion.g>
          </g>

          <g>
            <circle cx="75" cy="50" r="8" fill="#1f2937" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "75px 50px" }}
            >
              <circle cx="75" cy="50" r="5" fill="#4b5563" />
              <line x1="75" y1="45" x2="75" y2="55" stroke="#1f2937" strokeWidth="1.5" />
              <line x1="70" y1="50" x2="80" y2="50" stroke="#1f2937" strokeWidth="1.5" />
            </motion.g>
          </g>

          {/* Headlights */}
          <circle cx="88" cy="35" r="3" fill="#fef08a" opacity="0.9" />
          <circle cx="88" cy="45" r="3" fill="#fef08a" opacity="0.9" />

          {/* Door line */}
          <line x1="50" y1="30" x2="50" y2="50" stroke="#d97706" strokeWidth="1" />

          {/* Number #311 */}
          <text x="50" y="42" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            #311
          </text>
        </svg>

        {/* Speed lines when moving */}
        <motion.div
          className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            x: [-5, 0, -5]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="h-0.5 w-10 bg-white/50 rounded-full" />
          <div className="h-0.5 w-8 bg-white/40 rounded-full" />
          <div className="h-0.5 w-6 bg-white/30 rounded-full" />
        </motion.div>
      </div>

      {/* Driver indicator */}
      {showLabel && (
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-[#0b1e2d] whitespace-nowrap shadow-xl border-2 border-[#f88b29]/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          La Jerricane #311
        </motion.div>
      )}
    </motion.div>
  );
}
