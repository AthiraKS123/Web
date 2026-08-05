import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { Flame, RotateCcw } from 'lucide-react';
import { sfx } from '../../sound/sfx';

interface HeroBurgerAssemblyProps {
  mousePos: { x: number; y: number };
  onAssemblyComplete?: () => void;
}

export const HeroBurgerAssembly: React.FC<HeroBurgerAssemblyProps> = ({
  mousePos,
  onAssemblyComplete,
}) => {
  const [isAssembled, setIsAssembled] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // Refs for the 8 individual layers (Layer 0 to Layer 7)
  const containerRef = useRef<HTMLDivElement>(null);
  const layer0BottomBunRef = useRef<HTMLDivElement>(null);
  const layer1BottomPattyRef = useRef<HTMLDivElement>(null);
  const layer2LettuceRef = useRef<HTMLDivElement>(null);
  const layer3OnionRef = useRef<HTMLDivElement>(null);
  const layer4TomatoRef = useRef<HTMLDivElement>(null);
  const layer5CheeseRef = useRef<HTMLDivElement>(null);
  const layer6TopPattyRef = useRef<HTMLDivElement>(null);
  const layer7BunRef = useRef<HTMLDivElement>(null);

  // Decorative & Impact Refs
  const shadowRef = useRef<HTMLDivElement>(null);
  const impactFlashRef = useRef<HTMLDivElement>(null);
  const bunGlintRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Parallax Tilt
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 };
  const mouseXSpring = useSpring(0, springConfig);
  const mouseYSpring = useSpring(0, springConfig);

  const rotateX = useTransform(mouseYSpring, [-1, 1], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], [-14, 14]);
  const translateX = useTransform(mouseXSpring, [-1, 1], [-12, 12]);
  const translateY = useTransform(mouseYSpring, [-1, 1], [-8, 8]);

  useEffect(() => {
    mouseXSpring.set(mousePos.x);
    mouseYSpring.set(mousePos.y);
  }, [mousePos, mouseXSpring, mouseYSpring]);

  // Master 8-Layer Physics Falling & Stacking GSAP Timeline
  const runAnimation = useCallback(() => {
    setIsAssembled(false);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAssembled(true);
          onAssemblyComplete?.();
        },
      });

      // ─────────────────────────────────────────────────────────────
      // 1. INITIAL SCATTERED STARTING POSITIONS (High Above Viewport)
      // ─────────────────────────────────────────────────────────────
      // Layer 0: Toasted Bottom Bun Heel (Start: y: -650, x: -20, rot: -6°)
      gsap.set(layer0BottomBunRef.current, {
        y: -650,
        x: -20,
        rotation: -6,
        scale: 1.05,
        opacity: 0,
      });

      // Layer 1: Bottom Patty (Start: y: -750, x: 25, rot: 7°)
      gsap.set(layer1BottomPattyRef.current, {
        y: -750,
        x: 25,
        rotation: 7,
        scale: 1.06,
        opacity: 0,
      });

      // Layer 2: Lettuce (Start: y: -850, x: -30, rot: -8°)
      gsap.set(layer2LettuceRef.current, {
        y: -850,
        x: -30,
        rotation: -8,
        scale: 1.08,
        opacity: 0,
      });

      // Layer 3: Onion Ring (Start: y: -950, x: 35, rot: 180°) - Spin drop!
      gsap.set(layer3OnionRef.current, {
        y: -950,
        x: 35,
        rotation: 180,
        scale: 1.08,
        opacity: 0,
      });

      // Layer 4: Tomato Slice (Start: y: -1050, x: -20, rot: -7°)
      gsap.set(layer4TomatoRef.current, {
        y: -1050,
        x: -20,
        rotation: -7,
        scale: 1.1,
        scaleY: 1.0,
        opacity: 0,
      });

      // Layer 5: Cheese Slice (Start: y: -1150, x: 20, rot: 8°)
      gsap.set(layer5CheeseRef.current, {
        y: -1150,
        x: 20,
        rotation: 8,
        scale: 1.1,
        opacity: 0,
      });

      // Layer 6: Top Patty (Start: y: -1250, x: -25, rot: -6°)
      gsap.set(layer6TopPattyRef.current, {
        y: -1250,
        x: -25,
        rotation: -6,
        scale: 1.12,
        opacity: 0,
      });

      // Layer 7: Golden Sesame Top Bun (Start: y: -1350, x: 20, rot: 7°)
      gsap.set(layer7BunRef.current, {
        y: -1350,
        x: 20,
        rotation: 7,
        scale: 1.15,
        opacity: 0,
      });

      // Ambient Ground Shadow & Impact Flashes
      gsap.set(shadowRef.current, { scale: 0.2, opacity: 0 });
      gsap.set(impactFlashRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(bunGlintRef.current, { opacity: 0, scale: 0.3 });
      gsap.set([stampRef.current, tagRef.current], { scale: 0, opacity: 0 });

      // ─────────────────────────────────────────────────────────────
      // 2. CHOREOGRAPHED 8-LAYER SEQUENCE (Staggered ~0.15s)
      // ─────────────────────────────────────────────────────────────

      // ── LAYER 0: TOASTED BOTTOM BUN (Falls first, sets ground base) ──
      tl.to(
        layer0BottomBunRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.in',
        },
        0.05
      )
        .to(
          layer0BottomBunRef.current,
          {
            y: -8,
            duration: 0.1,
            ease: 'power1.out',
            onStart: () => sfx.playClick(),
          },
          0.60
        )
        .to(
          layer0BottomBunRef.current,
          {
            y: 0,
            duration: 0.18,
            ease: 'bounce.out',
          },
          0.70
        )
        .to(
          shadowRef.current,
          {
            opacity: 0.65,
            scale: 0.75,
            duration: 0.4,
            ease: 'power2.out',
          },
          0.28
        );

      // ── LAYER 1: BOTTOM PATTY (Firm landing on bottom bun) ──
      tl.to(
        layer1BottomPattyRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.in',
        },
        0.20
      )
        .to(
          layer1BottomPattyRef.current,
          {
            y: -6,
            duration: 0.09,
            ease: 'power1.out',
            onStart: () => sfx.playClick(),
          },
          0.75
        )
        .to(
          layer1BottomPattyRef.current,
          {
            y: 0,
            duration: 0.16,
            ease: 'bounce.out',
          },
          0.84
        );

      // ── LAYER 2: LETTUCE (Floaty, leaf flutter/wobble, settles gently) ──
      tl.to(
        layer2LettuceRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.62,
          ease: 'power1.inOut',
        },
        0.35
      )
        .to(
          layer2LettuceRef.current,
          {
            rotation: 2.5,
            duration: 0.08,
          },
          0.97
        )
        .to(
          layer2LettuceRef.current,
          {
            rotation: -1,
            duration: 0.1,
          },
          1.05
        )
        .to(
          layer2LettuceRef.current,
          {
            rotation: 0,
            duration: 0.12,
            ease: 'power2.out',
          },
          1.15
        );

      // ── LAYER 3: RED ONION RING (Spinning 180° -> 0° fall, small bounce) ──
      tl.to(
        layer3OnionRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.in',
        },
        0.50
      )
        .to(
          layer3OnionRef.current,
          {
            y: -5,
            duration: 0.08,
            onStart: () => sfx.playClick(),
          },
          1.05
        )
        .to(
          layer3OnionRef.current,
          {
            y: 0,
            duration: 0.14,
            ease: 'bounce.out',
          },
          1.13
        );

      // ── LAYER 4: TOMATO SLICE (Straight fall, soft squish bounce scaleY 0.94 -> 1) ──
      tl.to(
        layer4TomatoRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.in',
        },
        0.65
      )
        .to(
          layer4TomatoRef.current,
          {
            scaleY: 0.94,
            scaleX: 1.04,
            duration: 0.09,
            ease: 'power1.out',
            onStart: () => sfx.playClick(),
          },
          1.20
        )
        .to(
          layer4TomatoRef.current,
          {
            scaleY: 1.0,
            scaleX: 1.0,
            duration: 0.18,
            ease: 'elastic.out(1.2, 0.4)',
          },
          1.29
        );

      // ── LAYER 5: CHEESE SLICE (Lighter/slower fall, melting wobble drape) ──
      tl.to(
        layer5CheeseRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        0.80
      )
        .to(
          layer5CheeseRef.current,
          {
            rotation: 2.5,
            scaleY: 0.97,
            duration: 0.1,
          },
          1.45
        )
        .to(
          layer5CheeseRef.current,
          {
            rotation: -1,
            scaleY: 1.01,
            duration: 0.12,
          },
          1.55
        )
        .to(
          layer5CheeseRef.current,
          {
            rotation: 0,
            scaleY: 1.0,
            duration: 0.15,
            ease: 'power2.out',
          },
          1.67
        );

      // ── LAYER 6: TOP PATTY (Weighted heavy drop, firm landing bounce) ──
      tl.to(
        layer6TopPattyRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.56,
          ease: 'power2.in',
        },
        0.95
      )
        .to(
          layer6TopPattyRef.current,
          {
            scaleY: 0.93,
            scaleX: 1.05,
            duration: 0.09,
            ease: 'power1.out',
            onStart: () => {
              sfx.playClick();
              gsap.fromTo(
                impactFlashRef.current,
                { opacity: 0.4, scale: 0.8 },
                { opacity: 0, scale: 1.3, duration: 0.3, ease: 'power2.out' }
              );
            },
          },
          1.51
        )
        .to(
          layer6TopPattyRef.current,
          {
            scaleY: 1.0,
            scaleX: 1.0,
            duration: 0.22,
            ease: 'elastic.out(1.2, 0.4)',
          },
          1.60
        );

      // ── LAYER 7: GOLDEN SESAME TOP BUN (Highest drop, biggest bounce + shine glint) ──
      tl.to(
        layer7BunRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.in',
        },
        1.15
      )
        .to(
          layer7BunRef.current,
          {
            y: -12,
            scale: 1.05,
            duration: 0.12,
            ease: 'power1.out',
            onStart: () => {
              sfx.playClick();
              // Sesame seed gleam flash
              gsap.fromTo(
                bunGlintRef.current,
                { opacity: 0.9, scale: 0.4, x: -60, y: -20 },
                { opacity: 0, scale: 1.6, x: 60, y: -20, duration: 0.55, ease: 'power2.out' }
              );
            },
          },
          1.80
        )
        .to(
          layer7BunRef.current,
          {
            y: 0,
            scale: 1.0,
            duration: 0.24,
            ease: 'bounce.out',
          },
          1.92
        )
        .to(
          shadowRef.current,
          {
            opacity: 0.95,
            scale: 1.0,
            duration: 0.35,
          },
          1.70
        );

      // ── REVEAL ACCENTS (Stamp & Tag) ──
      tl.to(
        stampRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        1.98
      ).to(
        tagRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(1.8)',
        },
        2.08
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onAssemblyComplete]);

  useEffect(() => {
    runAnimation();
  }, [runAnimation, animKey]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[560px] sm:h-[640px] lg:h-[700px] flex items-center justify-center [perspective:1200px] select-none overflow-visible"
    >
      {/* 1. Atmospheric Ambient Glow */}
      <div className="absolute inset-2 sm:inset-6 rounded-full bg-gradient-to-tr from-ember-500/25 via-gold-500/10 to-crimson-600/20 blur-3xl pointer-events-none" />

      {/* 2. Impact Radial Flash Wave */}
      <div
        ref={impactFlashRef}
        className="absolute w-80 h-80 rounded-full bg-radial-spotlight pointer-events-none"
      />

      {/* 3. Grouped Assembled Burger Unit with 3D Parallax & Idle Floating */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: 'preserve-3d',
        }}
        animate={
          isAssembled
            ? {
                y: [0, -10, 0],
              }
            : {}
        }
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full max-w-[640px] sm:max-w-[700px] h-[520px] sm:h-[600px] lg:h-[660px] flex items-center justify-center"
      >
        {/* Soft Contact Ground Shadow */}
        <div
          ref={shadowRef}
          className="absolute bottom-4 sm:bottom-6 w-4/5 h-12 bg-black/95 rounded-full blur-xl pointer-events-none"
        />

        {/* ─────────────────────────────────────────────────────────────
            8 ISOLATED TRANSPARENT PNG LAYERS (Matching Photorealistic Set):
            0. Toasted Bottom Bun Heel (layer_0_bottom_bun.png) [Z: 10]
            1. Bottom Wagyu Patty (layer_1_bottom_patty.png) [Z: 15]
            2. Crisp Lettuce (layer_2_lettuce.png) [Z: 20]
            3. Red Onion Ring (layer_3_onion.png) [Z: 25]
            4. Tomato Slice (layer_4_tomato.png) [Z: 30]
            5. Melted Cheddar (layer_5_cheese.png) [Z: 35]
            6. Top Wagyu Patty (layer_6_top_patty.png) [Z: 40]
            7. Golden Sesame Top Bun Crown (layer_7_top_bun.png) [Z: 45]
           ───────────────────────────────────────────────────────────── */}

        {/* LAYER 0: TOASTED BOTTOM BUN HEEL */}
        <div
          ref={layer0BottomBunRef}
          style={{ zIndex: 10, transform: 'translateZ(10px)' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/burger-layers/layer_0_bottom_bun.png"
            alt="Toasted Bottom Bun Heel"
            className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)]"
          />
        </div>

        {/* LAYER 1: BOTTOM PATTY */}
        <div
          ref={layer1BottomPattyRef}
          style={{ zIndex: 15, transform: 'translateZ(15px)' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/burger-layers/layer_1_bottom_patty.png"
            alt="Bottom Grilled Patty"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* LAYER 2: CRISP LETTUCE */}
        <div
          ref={layer2LettuceRef}
          style={{ zIndex: 20, transform: 'translateZ(20px)' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/burger-layers/layer_2_lettuce.png"
            alt="Crisp Green Lettuce"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* LAYER 3: RED ONION RING */}
        <div
          ref={layer3OnionRef}
          style={{ zIndex: 25, transform: 'translateZ(25px)' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/burger-layers/layer_3_onion.png"
            alt="Purple Red Onion Ring"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* LAYER 4: TOMATO SLICE */}
        <div
          ref={layer4TomatoRef}
          style={{ zIndex: 30, transform: 'translateZ(30px)' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/burger-layers/layer_4_tomato.png"
            alt="Ripe Heirloom Tomato Slice"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.75)]"
          />
        </div>

        {/* LAYER 5: CHEDDAR CHEESE SLICE */}
        <div
          ref={layer5CheeseRef}
          style={{ zIndex: 35, transform: 'translateZ(35px)' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/burger-layers/layer_5_cheese.png"
            alt="Aged Cheddar Cheese Slice"
            className="w-full h-full object-contain filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* LAYER 6: TOP PATTY */}
        <div
          ref={layer6TopPattyRef}
          style={{ zIndex: 40, transform: 'translateZ(40px)' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/burger-layers/layer_6_top_patty.png"
            alt="Top Grilled Wagyu Patty"
            className="w-full h-full object-contain filter drop-shadow-[0_14px_26px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* LAYER 7: GOLDEN SESAME TOP BUN CROWN */}
        <div
          ref={layer7BunRef}
          style={{ zIndex: 45, transform: 'translateZ(45px)' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/burger-layers/layer_7_top_bun.png"
            alt="Golden Sesame Top Bun Crown"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
          />

          {/* Sesame Seed Impact Glint Flash */}
          <div
            ref={bunGlintRef}
            className="absolute top-8 sm:top-10 w-28 h-8 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px] rounded-full pointer-events-none rotate-12"
          />
        </div>

        {/* Rotating Circular Stamp Badge */}
        <div
          ref={stampRef}
          style={{ zIndex: 50, transform: 'translateZ(50px)' }}
          className="absolute -top-2 -right-2 sm:top-2 sm:right-2 pointer-events-none hidden sm:block"
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full animate-spin-slow text-stone-200 font-mono text-[8.5px] uppercase tracking-widest fill-current opacity-90"
            >
              <path
                id="assemblyStampPath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text>
                <textPath href="#assemblyStampPath" startOffset="0%">
                  ★ 100% FLAME CRAFTED ★ 8-LAYER STACK ★
                </textPath>
              </text>
            </svg>

            <div className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-ember-500 to-crimson-600 flex items-center justify-center text-white shadow-glow-ember">
              <Flame className="w-4 h-4 fill-white" />
            </div>
          </div>
        </div>

        {/* Floating Flavor Callout Tag */}
        <div
          ref={tagRef}
          style={{ zIndex: 50, transform: 'translateZ(45px)' }}
          className="absolute bottom-4 -left-2 sm:bottom-6 sm:left-0 pointer-events-none p-3 rounded-2xl bg-charcoal-950/90 backdrop-blur-xl border border-white/10 shadow-2xl hidden md:block max-w-[230px]"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ember-500 animate-pulse" />
            <span className="text-[10.5px] font-bold text-white uppercase tracking-wider font-clash">
              8-Piece Artisan Stack
            </span>
          </div>
          <p className="text-[9.5px] text-stone-400 mt-0.5 font-medium font-sans">
            Toasted Heel · Double Patty · Cheddar · Greens · Crown
          </p>
        </div>
      </motion.div>

      {/* Interactive Replay Animation Button */}
      {isAssembled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => {
            sfx.playSwoosh();
            setAnimKey((k) => k + 1);
          }}
          className="absolute top-2 left-2 z-30 px-3 py-1.5 rounded-xl bg-charcoal-900/85 hover:bg-charcoal-800 border border-white/10 text-stone-300 hover:text-white text-xs font-mono flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-all shadow-lg hover:border-ember-500/40"
          title="Replay 8-Layer Falling Sequence"
        >
          <RotateCcw className="w-3.5 h-3.5 text-ember-400" />
          <span>Replay 8-Layer Fall</span>
        </motion.button>
      )}
    </div>
  );
};
