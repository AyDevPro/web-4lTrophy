"use client";

import { motion } from 'framer-motion';

interface CheckpointData {
  id: number;
  position: number;
  title: string;
  location: string;
  date: string;
  icon: string;
  zone: string;
}

interface CheckpointProps {
  checkpoint: CheckpointData;
  onClick: () => void;
}

export default function Checkpoint({ checkpoint, onClick }: CheckpointProps) {
  const { position, title, icon, zone } = checkpoint;

  // Determine color based on zone
  const getZoneColor = () => {
    switch (zone) {
      case 'forest':
        return '#7fb069';
      case 'ferry':
        return '#3b82f6';
      case 'desert':
        return '#f59e0b';
      default:
        return '#f88b29';
    }
  };

  const color = getZoneColor();

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-pointer"
      style={{
        left: '50%',
        top: `${position}%`,
        x: '-50%',
        y: '-50%',
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring" }}
      onClick={onClick}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: color,
            opacity: 0.3,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        {/* Main checkpoint marker */}
        <motion.div
          className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl border-2 sm:border-3 md:border-4 border-white"
          style={{
            backgroundColor: color,
          }}
          whileHover={{
            boxShadow: `0 0 30px ${color}`,
          }}
        >
          <span className="text-2xl sm:text-2xl md:text-3xl">{icon}</span>
        </motion.div>

        {/* Checkpoint label - hidden on small screens, shown on hover on larger screens */}
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 sm:px-4 py-1 sm:py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg whitespace-nowrap hidden sm:block"
          initial={{ opacity: 0, y: -10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-xs font-bold text-[#0b1e2d]">{title}</div>
        </motion.div>

        {/* Connection line to route */}
        <div
          className="absolute top-1/2 left-1/2 w-0.5 h-8 -translate-x-1/2 -translate-y-full"
          style={{
            backgroundColor: color,
            opacity: 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
