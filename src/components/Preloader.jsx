import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 18;
      });
    }, 35);

    const safetyTimer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setVisible(false);
      onComplete?.();
    }, 750);

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
            transition: { duration: 0.45, ease: 'easeInOut' } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4EEE4] text-[#2B2118] select-none pointer-events-none"
        >
          {/* Subtle warm center glow */}
          <div className="absolute w-[360px] h-[360px] bg-[#EAE1D3]/80 rounded-full blur-[80px] pointer-events-none" />

          {/* Studio Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-3 relative z-10"
          >
            <div className="w-14 h-14 rounded-full border border-[rgba(60,45,30,0.2)] bg-[#FAF6EF] flex items-center justify-center font-serif text-2xl font-bold text-[#2B2118] shadow-sm">
              A
            </div>
            <div className="text-center">
              <h1 className="font-serif text-xl tracking-[0.24em] text-[#2B2118] font-medium uppercase">
                AAKRITI
              </h1>
              <p className="text-[9px] tracking-[0.3em] text-[#A9814A] uppercase mt-0.5 font-medium">
                Architecture & Interiors
              </p>
            </div>
          </motion.div>

          {/* Slender Brass Progress Line */}
          <div className="w-56 mt-10 flex flex-col gap-2 relative z-10">
            <div className="h-[2px] w-full bg-[#EAE1D3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#A9814A] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#6F6254]">
              <span>INITIALIZING ATELIER</span>
              <span className="text-[#A9814A] font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
