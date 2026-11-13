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
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const isTourPage = location.pathname === '/tour';

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
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
    <div className="relative min-h-screen bg-[#F4EEE4] text-[#2B2118] selection:bg-[#A9814A] selection:text-[#FAF6EF]">
      {/* Subtle warm film grain */}
      <div className="film-grain" />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Editorial Preloader */}
      <Preloader />

      {/* Top Slender Brass Scroll Progress Line */}
      {!isTourPage && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-[rgba(60,45,30,0.06)] z-50">
          <div
            className="h-full bg-[#A9814A] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Global Navigation Bar */}
      {!isTourPage && <Navbar />}

      {/* Main Pages with Smooth Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
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

      {/* Global Architectural Footer */}
      {!isTourPage && <Footer />}
    </div>
  );
}
