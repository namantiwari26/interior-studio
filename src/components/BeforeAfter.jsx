import React, { useState, useRef, useCallback } from 'react';
import { IMAGES } from '../data/images';
import { MoveHorizontal } from 'lucide-react';

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
      {/* Slider Window */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={(e) => handleMove(e.clientX)}
        className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[rgba(60,45,30,0.14)] shadow-md"
      >
        {/* After Image */}
        <img
          src={afterImage}
          alt="Completed architectural interior"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt="Original site condition prior to renovation"
            className="absolute inset-0 w-full h-full object-cover filter brightness-95"
          />
        </div>

        {/* Divider line and brass handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#A9814A] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FAF6EF] text-[#2B2118] border border-[#A9814A] flex items-center justify-center shadow-md cursor-ew-resize">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
          </div>
        </div>

        {/* Editorial Badges */}
        <div className="absolute top-4 left-4 z-10 bg-[#FAF6EF]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-[#2B2118] border border-[rgba(60,45,30,0.12)] pointer-events-none">
          Site Condition Before
        </div>
        <div className="absolute top-4 right-4 z-10 bg-[#2B2118]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-[#FAF6EF] border border-[rgba(255,255,255,0.1)] pointer-events-none">
          Completed Realization
        </div>
      </div>

      {/* Description Dossier */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-ivory p-6 rounded-2xl border border-[rgba(60,45,30,0.12)]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.16em] text-[#A9814A] font-medium">
            Renovation Case Study
          </span>
          <h4 className="text-lg font-serif text-[#2B2118] mt-0.5">{title}</h4>
          <p className="text-xs text-[#6F6254] mt-1 leading-relaxed max-w-xl">{description}</p>
        </div>
        <div className="shrink-0 text-left sm:text-right border-t sm:border-t-0 sm:border-l border-[rgba(60,45,30,0.1)] pt-3 sm:pt-0 sm:pl-6">
          <span className="text-[10px] uppercase font-mono text-[#6F6254]">Location</span>
          <p className="text-xs font-medium text-[#2B2118]">{location}</p>
        </div>
      </div>
    </div>
  );
}
