import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowUpRight, Compass, Phone, Sparkles 
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past threshold
      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: '360° Tour', path: '/tour' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 px-4 sm:px-8 py-4 sm:py-6 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div
          className={`w-full max-w-7xl flex items-center justify-between rounded-full transition-all duration-300 px-5 sm:px-8 py-3.5 ${
            scrolled
              ? 'glass-pill shadow-2xl border border-white/10 backdrop-blur-xl'
              : 'bg-neutral-950/40 backdrop-blur-md border border-white/5'
          }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-neutral-950 font-serif font-bold text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm sm:text-base tracking-widest text-white uppercase group-hover:text-amber-400 transition-colors">
                AAKRITI
              </span>
              <span className="text-[9px] tracking-[0.25em] text-neutral-400 uppercase -mt-0.5">
                Architecture & Interiors
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/60 border border-white/5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'text-neutral-950 font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-amber-400 rounded-full -z-10 shadow-md shadow-amber-400/25"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Consultation Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/tour"
              className="hidden md:flex items-center gap-1.5 text-xs text-amber-300 font-medium px-3 py-1.5 rounded-full glass-panel-gold border border-amber-500/20 hover:border-amber-400 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Virtual 360°</span>
            </Link>

            <Link
              to="/contact"
              className="group flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-amber-400 text-neutral-950 font-semibold text-xs tracking-wide hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
            >
              <span>Consultation</span>
              <div className="w-6 h-6 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-pill border border-white/10 text-neutral-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-neutral-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-widest text-amber-400/80 font-mono">
                Navigation
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-serif text-white hover:text-amber-400 transition-colors flex items-center justify-between py-2 border-b border-white/5"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-neutral-500" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="text-xs text-neutral-400">
                <p className="text-white font-medium mb-1">Ambala Studio Headquarters</p>
                <p>{BRAND.headquarters}</p>
                <p className="mt-2 text-amber-400 font-mono">{BRAND.phone}</p>
              </div>

              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-amber-400 text-neutral-950 font-semibold text-sm"
              >
                <span>Book Architectural Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

