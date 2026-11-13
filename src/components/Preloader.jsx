import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Smooth progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 40);

    // Hard fallback safety: never keep preloader visible for more than 900ms
    const safetyTimer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setVisible(false);
      onComplete?.();
    }, 850);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white select-none pointer-events-none"
        >
          {/* Subtle warm glow circle */}
          <div className="absolute w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Logo Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 rounded-full border border-amber-400/40 bg-neutral-900/80 flex items-center justify-center font-serif text-3xl font-bold text-amber-400 shadow-2xl shadow-amber-500/20">
              A
            </div>
            <div className="text-center">
              <h1 className="font-serif text-2xl tracking-[0.25em] text-white font-medium uppercase">
                AAKRITI
              </h1>
              <p className="text-[10px] tracking-[0.35em] text-amber-300 uppercase mt-1">
                Interiors & Architecture
              </p>
            </div>
          </motion.div>

          {/* Gold Progress Bar & Counter */}
          <div className="w-64 mt-12 flex flex-col gap-2">
            <div className="h-[2px] w-full bg-neutral-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>INITIALIZING ATELIER</span>
              <span className="text-amber-400 font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
