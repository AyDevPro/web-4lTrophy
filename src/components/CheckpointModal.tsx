"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface CheckpointData {
  id: number;
  title: string;
  location: string;
  date: string;
  icon: string;
  description: string;
  details: string[];
  zone: string;
}

interface CheckpointModalProps {
  checkpoint: CheckpointData;
  onClose: () => void;
}

export default function CheckpointModal({ checkpoint, onClose }: CheckpointModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getZoneColor = () => {
    switch (checkpoint.zone) {
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

  const getZoneLabel = () => {
    switch (checkpoint.zone) {
      case 'forest':
        return 'Europe';
      case 'ferry':
        return 'Traversée';
      case 'desert':
        return 'Désert';
      default:
        return 'Route';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal - design moderne */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        >
          {/* Header avec design moderne et image de fond */}
          <div className="relative h-64 overflow-hidden">
            {/* Background gradient animé */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${color}ee 0%, ${color} 50%, ${color}dd 100%)`,
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
              style={{ background: 'white' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            {/* Content centré dans le header */}
            <div className="relative h-full flex flex-col items-center justify-center text-white p-8 text-center">
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors border-2 border-white/30"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Zone badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="inline-block bg-white/25 backdrop-blur-md px-5 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-6 border-2 border-white/40"
              >
                {getZoneLabel()}
              </motion.div>

              {/* Icon avec effet */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                className="text-8xl mb-6 filter drop-shadow-2xl"
              >
                {checkpoint.icon}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-archivo font-black text-5xl mb-4 drop-shadow-lg"
              >
                {checkpoint.title}
              </motion.h2>

              {/* Location & Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-6 justify-center text-white"
              >
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="font-bold">{checkpoint.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
                  </svg>
                  <span className="font-bold">{checkpoint.date}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Body avec overflow */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
            {/* Description avec style moderne */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-l-4" style={{ borderColor: color }}>
                <p className="text-gray-800 text-lg leading-relaxed font-medium">
                  {checkpoint.description}
                </p>
              </div>
            </motion.div>

            {/* Details list avec cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-archivo font-black text-2xl text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 rounded-full" style={{ backgroundColor: color }}></span>
                Points clés
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checkpoint.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.08 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all border-2 border-gray-100"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: color }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium leading-snug">{detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Footer action avec style moderne */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 rounded-2xl font-black text-lg text-white shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={false}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Continuer l'aventure
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
