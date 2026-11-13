import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';
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

      if (currentScrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

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
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 px-4 sm:px-8 py-3.5 sm:py-5 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div
          className={`w-full max-w-7xl flex items-center justify-between rounded-full transition-all duration-300 px-5 sm:px-8 py-3 ${
            scrolled
              ? 'bg-[#FAF6EF] shadow-[0_8px_24px_rgba(43,33,24,0.06)] border border-[rgba(60,45,30,0.12)]'
              : 'glass-cream border border-[rgba(60,45,30,0.1)]'
          }`}
        >
          {/* Studio Monogram Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-[rgba(60,45,30,0.2)] bg-[#FAF6EF] flex items-center justify-center text-[#2B2118] font-serif font-semibold text-sm shadow-sm group-hover:border-[#A9814A] transition-colors">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-sm sm:text-base tracking-[0.16em] text-[#2B2118] uppercase">
                AAKRITI
              </span>
              <span className="text-[9px] tracking-[0.24em] text-[#6F6254] uppercase -mt-0.5 font-medium">
                Architecture & Interiors
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF6EF]/60 border border-[rgba(60,45,30,0.08)]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'text-[#2B2118] font-semibold'
                      : 'text-[#6F6254] hover:text-[#2B2118] hover:bg-black/[0.03]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#EAE1D3] rounded-full -z-10 shadow-sm"
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
              className="hidden md:flex items-center gap-2 text-xs text-[#1C140D] font-medium px-3.5 py-1.5 rounded-full border border-[rgba(60,45,30,0.18)] hover:border-[#8A5620] hover:text-[#8A5620] transition-all bg-[#FAF6EF]"
            >
              <Compass className="w-3.5 h-3.5 text-[#8A5620]" strokeWidth={1.5} />
              <span>360 Virtual Study</span>
            </Link>

            <Link
              to="/contact"
              className="group flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full btn-primary text-xs tracking-wide shadow-sm"
            >
              <span className="font-medium text-[#FAF6EF]">Consultation</span>
              <div className="w-6 h-6 rounded-full bg-[#8A5620] text-white flex items-center justify-center group-hover:bg-[#634015] transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </div>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-[rgba(60,45,30,0.15)] bg-[#FAF6EF] text-[#2B2118]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#F4EEE4]/98 backdrop-blur-xl flex flex-col justify-between p-6 pt-24"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9814A] font-mono font-semibold pb-2">
                Navigation
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx }}
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-serif text-[#2B2118] hover:text-[#A9814A] transition-colors flex items-center justify-between py-2.5 border-b border-[rgba(60,45,30,0.08)]"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#A9814A]" strokeWidth={1.4} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-[rgba(60,45,30,0.12)] flex flex-col gap-4">
              <div className="text-xs text-[#6F6254]">
                <p className="text-[#2B2118] font-medium mb-1">Ambala Studio</p>
                <p>{BRAND.headquarters}</p>
                <p className="mt-2 text-[#A9814A] font-mono">{BRAND.phone}</p>
              </div>

              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full btn-primary text-xs font-medium"
              >
                <span>Book Architectural Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
