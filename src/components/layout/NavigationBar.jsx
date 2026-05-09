import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Writers', path: '/writers' },
  { label: 'Journals', path: '/journals' },
  { label: 'Editions', path: '/editions' },
  { label: 'Residency', path: '/residency' },
  { label: 'About', path: '/about' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Manifesto', path: '/manifesto' },
];

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-[0_1px_0_0_#000]' : 'border-b border-black'}`}>
      {/* Top ticker */}
      <div className="hidden md:block overflow-hidden bg-black text-white py-1.5 border-b border-black">
        <div className="flex gap-12 animate-[navticker_22s_linear_infinite] whitespace-nowrap">
          {['The Garden', '✦', 'A platform for writers', '✦', 'Free forever', '✦', 'Not a feed', '✦', 'The Garden', '✦', 'A platform for writers', '✦', 'Free forever', '✦', 'Not a feed', '✦'].map((t, i) => (
            <span key={i} className="font-mono text-[10px] uppercase tracking-[0.25em]">{t}</span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="font-serif text-xl font-black tracking-tight text-black leading-none">
            The Garden
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity ${
                  location.pathname === link.path ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              to="/garden"
              className="font-mono text-[10px] uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-black/70 transition-colors"
            >
              Enter the Garden
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-1 text-black">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-t border-black"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block font-mono text-xs uppercase tracking-widest py-1.5 transition-opacity ${
                    location.pathname === link.path ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-black/10">
                <Link
                  to="/garden"
                  onClick={() => setIsOpen(false)}
                  className="inline-block font-mono text-xs uppercase tracking-widest bg-black text-white px-5 py-2.5"
                >
                  Enter the Garden
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes navticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </nav>
  );
}