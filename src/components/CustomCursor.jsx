import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'view' | 'drag' | 'pointer'
  const [isVisible, setIsVisible] = useState(false);
  const trailingPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

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

    let animationId;
    const animate = () => {
      trailingPos.current.x += (position.x - trailingPos.current.x) * 0.18;
      trailingPos.current.y += (position.y - trailingPos.current.y) * 0.18;

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
      {/* Center Espresso Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#2B2118] transition-opacity duration-150 pointer-events-none ${
          isSpecial ? 'opacity-0' : 'opacity-90'
        }`}
      />

      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-150 pointer-events-none ${
          cursorType === 'drag'
            ? 'w-16 h-16 bg-[#2B2118]/90 text-[10px] tracking-widest text-[#FAF6EF] font-mono font-medium shadow-md'
            : cursorType === 'view'
            ? 'w-16 h-16 bg-[#2B2118]/90 text-[10px] tracking-widest text-[#FAF6EF] font-mono font-medium shadow-md'
            : cursorType === 'pointer'
            ? 'w-9 h-9 border border-[#A9814A]/70 bg-[#A9814A]/10'
            : 'w-7 h-7 border border-[#2B2118]/25'
        }`}
      >
        {cursorType === 'drag' && <span>DRAG</span>}
        {cursorType === 'view' && <span>VIEW</span>}
      </div>
    </div>
  );
}
