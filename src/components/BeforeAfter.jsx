import React, { useState, useRef, useCallback } from 'react';
import { IMAGES } from '../data/images';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function BeforeAfter({
  beforeImage = IMAGES.beforeAfter.before,
  afterImage = IMAGES.beforeAfter.after,
  title = IMAGES.beforeAfter.title,
  location = IMAGES.beforeAfter.location,
  description = IMAGES.beforeAfter.description
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Container with clip path comparison */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={(e) => handleMove(e.clientX)}
        className="relative h-[380px] sm:h-[500px] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="Completed luxury transformation"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Before interior renovation"
            className="absolute inset-0 w-full h-full object-cover filter brightness-90 grayscale-30"
          />
        </div>

        {/* Divider line and handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 shadow-[0_0_15px_rgba(201,164,106,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-xl border-2 border-white cursor-ew-resize hover:scale-110 transition-transform">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Badges on left and right */}
        <div className="absolute top-4 left-4 z-10 glass-pill px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-200 border border-white/10 pointer-events-none">
          BEFORE RENOVATION
        </div>
        <div className="absolute top-4 right-4 z-10 glass-panel-gold px-3 py-1.5 rounded-full text-xs font-semibold text-amber-300 border border-amber-500/30 pointer-events-none">
          AFTER AAKRITI REALIZATION
        </div>
      </div>

      {/* Description Below */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Transformation Case</span>
          </div>
          <h4 className="text-xl font-serif text-white">{title}</h4>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">{description}</p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <span className="text-xs text-neutral-400">Location:</span>
          <p className="text-sm font-semibold text-amber-300">{location}</p>
        </div>
      </div>
    </div>
  );
}

