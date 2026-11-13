import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

import Home from './pages/Home';
import VirtualTour from './pages/VirtualTour';
import Projects from './pages/Projects';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const isTourPage = location.pathname === '/tour';

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((e.scroll / total) * 100);
      }
    });

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white selection:bg-amber-400 selection:text-neutral-950">
      {/* Film grain noise overlay */}
      <div className="film-grain" />

      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Preloader animation */}
      <Preloader onComplete={() => setLoading(false)} />

      {/* Top Gold Scroll Progress Bar (hidden on VR Tour) */}
      {!isTourPage && (
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-900 z-50">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Global Navigation Bar (hidden on VR Tour) */}
      {!isTourPage && <Navbar />}

      {/* Main Pages with Framer Motion Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/tour" element={<VirtualTour />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* Global Footer (hidden on VR Tour) */}
      {!isTourPage && <Footer />}
    </div>
  );
}
