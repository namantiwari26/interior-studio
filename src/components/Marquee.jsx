import React from 'react';
import { MARQUEE_ITEMS } from '../data/content';

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/10 bg-neutral-950/80 select-none">
      <div className="flex w-max animate-marquee">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4">
            <span className="font-serif text-sm sm:text-base tracking-widest text-neutral-300 uppercase">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

