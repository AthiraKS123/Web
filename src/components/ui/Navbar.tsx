import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShoppingBag, Volume2, VolumeX, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { sfx } from '../../sound/sfx';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sfx.getMutedState());
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'menu', 'story', 'gallery', 'reviews', 'location'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
    if (!muted) sfx.playClick();
  };

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Craft & Story', href: '#story', id: 'story' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Find Us', href: '#location', id: 'location' },
  ];

  const handleLinkClick = (href: string) => {
    sfx.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-charcoal-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-500 to-crimson-600 flex items-center justify-center shadow-glow-ember group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1">
                EMBER <span className="text-ember-500">CRAFT</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-semibold">
                Fast-Casual Lab
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-charcoal-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive ? 'text-white' : 'text-stone-400 hover:text-stone-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-ember-500/20 border border-ember-500/40 rounded-full shadow-glow-ember"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className="w-9 h-9 rounded-xl bg-charcoal-900/80 border border-white/10 hover:border-ember-500/40 flex items-center justify-center text-stone-300 hover:text-white transition-all"
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              aria-label="Sound Toggle"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-ember-400 animate-pulse" />}
            </button>

            {/* Table Reservation Button */}
            <button
              onClick={() => {
                sfx.playSwoosh();
                onOpenReservation();
              }}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal-900/80 border border-white/10 hover:border-ember-500/40 text-stone-200 hover:text-white text-xs font-semibold tracking-wide transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-ember-400" />
              <span>Book Table</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => {
                sfx.playSwoosh();
                onOpenCart();
              }}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-ember-500 to-ember-600 hover:from-ember-600 hover:to-crimson-600 text-white text-xs font-bold tracking-wide shadow-glow-ember hover:shadow-glow-ember-lg transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="w-5 h-5 rounded-full bg-white text-ember-600 text-[11px] font-black flex items-center justify-center shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => {
                sfx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden w-10 h-10 rounded-xl bg-charcoal-900/90 border border-white/10 flex items-center justify-center text-stone-200"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-ember-500" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-in Fullscreen Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-charcoal-950/95 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6 border-l border-white/10"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase font-bold tracking-widest text-ember-500">
                Navigation
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-2xl font-display font-bold py-2 border-b border-white/5 flex items-center justify-between ${
                    activeSection === link.id ? 'text-ember-400' : 'text-stone-300'
                  }`}
                >
                  <span>{link.name}</span>
                  {activeSection === link.id && <Sparkles className="w-4 h-4 text-ember-400" />}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3.5 rounded-xl bg-charcoal-800 border border-ember-500/30 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-ember-400" />
                Reserve a Table
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ember-500 to-crimson-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-ember"
              >
                <ShoppingBag className="w-4 h-4" />
                View Cart ({cartCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
