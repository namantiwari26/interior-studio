import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'view' | 'drag' | 'pointer'
  const [isVisible, setIsVisible] = useState(false);
  const trailingPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hovered element
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorType(target.getAttribute('data-cursor'));
      } else if (e.target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // RAF loop for smooth trailing ring
    let animationId;
    const animate = () => {
      trailingPos.current.x += (position.x - trailingPos.current.x) * 0.15;
      trailingPos.current.y += (position.y - trailingPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailingPos.current.x}px, ${trailingPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [position]);

  if (!isVisible) return null;

  const isSpecial = cursorType === 'view' || cursorType === 'drag';

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Center Small Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-400 transition-opacity duration-200 ${
          isSpecial ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-200 ${
          cursorType === 'drag'
            ? 'w-16 h-16 bg-neutral-900/90 border border-amber-400/80 text-[10px] tracking-widest text-amber-300 font-mono font-bold shadow-2xl'
            : cursorType === 'view'
            ? 'w-16 h-16 bg-neutral-900/90 border border-white/80 text-[10px] tracking-widest text-white font-mono font-bold shadow-2xl'
            : cursorType === 'pointer'
            ? 'w-10 h-10 border border-amber-400/60 bg-amber-400/10'
            : 'w-7 h-7 border border-white/30'
        }`}
      >
        {cursorType === 'drag' && <span>DRAG</span>}
        {cursorType === 'view' && <span>VIEW</span>}
      </div>
    </div>
  );
}

