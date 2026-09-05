import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowRight,
  Star,
  UtensilsCrossed,
  Clock,
} from 'lucide-react';
import { HeroBurgerAssembly } from '../3d/HeroBurgerAssembly';
import { sfx } from '../../sound/sfx';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOpenReservation,
}) => {
  const [activeFood, setActiveFood] = useState<'burger' | 'pizza' | 'fries'>('burger');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // GSAP Animation Refs for Left Text Stack & Background
  const containerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);
  const foodSwitcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Synchronized Left Text Entry Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state
      gsap.set([glowRef.current, watermarkRef.current], {
        opacity: 0,
        scale: 0.88,
      });

      gsap.set(
        [
          eyebrowRef.current,
          headlineRef.current,
          subtextRef.current,
          ctaGroupRef.current,
          socialProofRef.current,
        ],
        {
          opacity: 0,
          y: 24,
          filter: 'blur(6px)',
        }
      );

      gsap.set(foodSwitcherRef.current, {
        opacity: 0,
        y: 20,
      });

      // Background atmosphere fade in
      tl.to([glowRef.current, watermarkRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.1);

      // Snappy text stack entrance (arrives as burger layers drop)
      tl.to(
        [
          eyebrowRef.current,
          headlineRef.current,
          subtextRef.current,
          ctaGroupRef.current,
          socialProofRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
        },
        0.45
      );

      tl.to(
        foodSwitcherRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.85
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const foodOptions = [
    {
      id: 'burger' as const,
      label: 'Inferno Wagyu Burger',
      icon: '🍔',
      image: '/images/custom-burger-hero.png',
      tagline: '700°F Cast Iron Searing',
      highlight: 'Molten Aged Cheddar & Japanese Wagyu',
    },
    {
      id: 'pizza' as const,
      label: 'Wood-Fired Diavola',
      icon: '🍕',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85',
      tagline: '900°F Oak Wood Sourdough',
      highlight: 'Calabrian Salami & San Marzano',
    },
    {
      id: 'fries' as const,
      label: 'Volcano Loaded Fries',
      icon: '🍟',
      image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=85',
      tagline: 'Hand-Cut Russet & Truffle',
      highlight: 'Cascading Molten Beer-Cheese',
    },
  ];

  const currentFood = foodOptions.find((f) => f.id === activeFood) || foodOptions[0];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[94vh] w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoal-950 bg-noise select-none"
    >
      {/* 1. LAYER 0: Ambient Spotlights & Atmosphere */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] bg-ember-500/14 rounded-full blur-[160px]" />
        <div className="absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-crimson-600/12 rounded-full blur-[150px]" />
        <div className="absolute top-12 right-12 w-[350px] h-[350px] bg-gold-500/10 rounded-full blur-[130px]" />
      </div>

      {/* 2. LAYER 1: Large Watermark Text */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span
          className="font-clash font-extrabold text-[clamp(8rem,22vw,24rem)] tracking-[-0.04em] text-stroke-faint opacity-20 uppercase leading-none transform -translate-y-6"
          style={{
            transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -12}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          EMBER
        </span>
      </div>

      {/* 3. LAYER 2 & 3: Two-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center z-10">
        
        {/* Left Column: Compact, Tightly-Animated Text Stack (~Left 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
          
          {/* Eyebrow Label with Live Pulsing Dot */}
          <div ref={eyebrowRef}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-900/90 border border-white/10 backdrop-blur-xl shadow-md">
              <span className="w-2 h-2 rounded-full bg-ember-500 animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-stone-300 font-mono">
                FRESH · BOLD · FLAME-CRAFTED
              </span>
            </div>
          </div>

          {/* Compact Headline (clamp 2.1rem to 3.6rem) */}
          <h1
            ref={headlineRef}
            className="font-clash font-bold text-[clamp(2.1rem,4.2vw,3.6rem)] tracking-[-0.03em] leading-[1.04] text-stone-100"
          >
            Fast-Casual Dining{' '}
            <span className="text-gradient-flame block sm:inline drop-shadow-[0_4px_16px_rgba(255,85,0,0.3)]">
              Refined by Fire.
            </span>
          </h1>

          {/* Short Supporting Subtext */}
          <p
            ref={subtextRef}
            className="text-stone-400 font-sans text-sm sm:text-[15px] max-w-md leading-relaxed font-normal"
          >
            Double-smashed Japanese A5 Wagyu seared over 700°F cast iron, blanketed in molten aged cheddar and artisan wood-fired sourdough.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaGroupRef}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1 w-full"
          >
            {/* Primary Action Button */}
            <button
              onClick={() => {
                sfx.playSwoosh();
                onExploreMenu();
              }}
              className="relative group px-7 py-3.5 rounded-xl bg-gradient-to-r from-ember-500 via-ember-600 to-crimson-600 hover:from-ember-400 hover:to-crimson-500 text-white font-clash font-semibold text-sm tracking-wide shadow-glow-ember hover:shadow-glow-ember-lg transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="relative z-10 font-bold uppercase tracking-wider">
                Order Sizzling Now
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary VIP Table Reservation */}
            <button
              onClick={() => {
                sfx.playSwoosh();
                onOpenReservation();
              }}
              className="px-5 py-3.5 rounded-xl bg-charcoal-900/80 hover:bg-charcoal-800 border border-white/10 hover:border-ember-500/40 text-stone-200 hover:text-white font-clash font-medium text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <UtensilsCrossed className="w-4 h-4 text-ember-400" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Social Proof Strip */}
          <div
            ref={socialProofRef}
            className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400 border-t border-white/10 w-full justify-center lg:justify-start font-sans"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9</span>
              <span className="text-stone-500">(12k+ Foodies)</span>
            </div>

            <div className="flex items-center gap-1 text-emerald-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>~10 Min Express Prep</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Food Showcase Stage */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[440px] h-[440px] bg-gradient-to-tr from-ember-500/25 via-crimson-600/15 to-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Food Display with Mouse Parallax */}
          <motion.div
            style={{
              x: mousePos.x * 14,
              y: mousePos.y * 10,
            }}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="relative w-full max-w-[560px] flex flex-col items-center justify-center p-2 z-10"
          >
            {/* Soft Ground Contact Shadow */}
            <div className="absolute bottom-4 w-3/4 h-8 bg-black/90 rounded-full blur-xl pointer-events-none" />

            {/* Custom Hero Burger Image */}
            <img
              src={activeFood === 'burger' ? '/images/custom-burger-hero.png' : currentFood.image}
              alt={currentFood.label}
              className="relative z-10 w-full h-auto max-h-[480px] sm:max-h-[520px] object-contain rounded-3xl filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Food Switcher Quick Selector (Bottom Center) */}
          <div
            ref={foodSwitcherRef}
            className="absolute -bottom-4 sm:bottom-0 left-1/2 -translate-x-1/2 z-20 bg-charcoal-950/90 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-2xl flex gap-1 font-clash"
          >
            {foodOptions.map((opt) => {
              const isSelected = activeFood === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    sfx.playClick();
                    setActiveFood(opt.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-ember-500 to-crimson-600 text-white shadow-glow-ember scale-[1.02]'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                  }`}
                >
                  <span>{opt.icon}</span>
                  <span className="hidden sm:inline">{opt.label.split(' ')[1] || opt.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 4. Subtle Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-stone-500 z-10 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-stone-400">
          Scroll
        </span>
        <div className="w-[1px] h-6 bg-charcoal-800 relative overflow-hidden rounded-full">
          <motion.div
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-ember-500 to-gold-400"
          />
        </div>
      </div>
    </section>
  );
};
