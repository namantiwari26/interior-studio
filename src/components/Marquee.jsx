import React from 'react';
import { MARQUEE_ITEMS } from '../data/content';

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden py-3.5 border-y border-[rgba(60,45,30,0.1)] bg-[#EAE1D3]/70 select-none">
      <div className="flex w-max animate-marquee">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-5">
            <span className="font-serif text-xs sm:text-sm tracking-[0.18em] text-[#2B2118] uppercase">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A9814A]" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 38s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
