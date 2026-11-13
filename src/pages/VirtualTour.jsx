import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { PANORAMAS } from '../data/models';
import { 
  Compass, ArrowLeft, Layers, Sparkles, 
  Share2, Info, Check, ShieldCheck 
} from 'lucide-react';

const PanoramaCanvas = lazy(() => import('../components/3d/PanoramaCanvas'));

export default function VirtualTour() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-neutral-950 text-white select-none">
      {/* 360 Panorama Canvas */}
      <Suspense fallback={
        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 text-amber-400 gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <span className="font-serif text-lg tracking-widest uppercase">Loading 360° VR Spatial Environment...</span>
        </div>
      }>
        <PanoramaCanvas embedded={false} initialRoomId="living" />
      </Suspense>

      {/* Floating Top Navigation Pill */}
      <div className="absolute top-6 left-6 z-30 pointer-events-auto">
        <Link
          to="/"
          className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-white hover:border-amber-400/50 transition-all shadow-2xl"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Exit to Studio Home</span>
        </Link>
      </div>

      {/* Share / Info Pill Top Right */}
      <div className="absolute top-6 right-6 z-30 pointer-events-auto flex items-center gap-2">
        <button
          onClick={handleShare}
          className="glass-pill px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-white transition-all cursor-pointer"
          title="Share Tour Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
          <span>{copied ? 'Link Copied' : 'Share VR'}</span>
        </button>
      </div>

      {/* Floating Info Overlay (Bottom Left on desktop) */}
      <div className="absolute top-20 left-6 hidden lg:block z-20 pointer-events-none max-w-xs">
        <div className="glass-panel p-4 rounded-2xl border border-white/10 text-xs text-neutral-300 pointer-events-auto shadow-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase text-[10px] tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Controls</span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            • Click & drag cursor or swipe screen to rotate 360° view.<br />
            • Use mouse wheel or pinch gesture to zoom in/out.<br />
            • Click glowing golden rings inside rooms to teleport.<br />
            • Use bottom bar thumbnails to switch salon environments.
          </p>
        </div>
      </div>
    </div>
  );
}
