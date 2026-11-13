import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 30);

    const fadeTimer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsFading(true);
      onComplete?.();
    }, 600);

    const removeTimer = setTimeout(() => {
      setIsGone(true);
    }, 1100);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (isGone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4EEE4] text-[#1C140D] select-none pointer-events-none transition-opacity duration-500 ease-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Subtle warm center glow */}
      <div className="absolute w-[360px] h-[360px] bg-[#EAE1D3]/80 rounded-full blur-[80px] pointer-events-none" />

      {/* Studio Monogram */}
      <div className="flex flex-col items-center gap-3 relative z-10 transition-transform duration-300">
        <div className="w-14 h-14 rounded-full border border-[rgba(60,45,30,0.2)] bg-[#FAF6EF] flex items-center justify-center font-serif text-2xl font-bold text-[#1C140D] shadow-sm">
          A
        </div>
        <div className="text-center">
          <h1 className="font-serif text-xl tracking-[0.24em] text-[#1C140D] font-medium uppercase">
            AAKRITI
          </h1>
          <p className="text-[9px] tracking-[0.3em] text-[#8A5620] uppercase mt-0.5 font-semibold">
            Architecture & Interiors
          </p>
        </div>
      </div>

      {/* Slender Brass Progress Line */}
      <div className="w-56 mt-10 flex flex-col gap-2 relative z-10">
        <div className="h-[2px] w-full bg-[#EAE1D3] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8A5620] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-[#574839]">
          <span>INITIALIZING ATELIER</span>
          <span className="text-[#8A5620] font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
