import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Flame, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../../data/menuData';
import { sfx } from '../../sound/sfx';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const prevSlide = () => {
    sfx.playClick();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    sfx.playClick();
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="relative py-28 bg-charcoal-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-ember-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            Foodie Accolades & Critics
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mt-2">
            PRAISED BY <span className="text-gradient-flame">THE CRITICS</span>
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3">
            Over 12,000 satisfied diners, Michelin critics, and burger enthusiasts can't get enough of our wood-fired flavors.
          </p>
        </div>

        {/* Carousel Card */}
        <div
          className="relative bg-charcoal-900/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-ember-500/20">
            <Quote className="w-16 h-16 sm:w-24 sm:h-24 stroke-[1]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="relative z-10 space-y-6"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-display font-medium text-lg sm:text-2xl text-stone-100 leading-relaxed italic">
                "{current.quote}"
              </p>

              {/* Reviewer Meta & Favorite Dish */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3.5">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-ember-500/50 shadow-glow-ember"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-bold text-base text-white">
                        {current.name}
                      </h4>
                      {current.verified && (
                        <span title="Verified Reviewer" className="inline-flex">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400">{current.role}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-950 border border-white/10 text-xs">
                  <Flame className="w-3.5 h-3.5 text-ember-400" />
                  <span className="text-stone-400">Favorite Dish:</span>
                  <span className="font-bold text-white">{current.favoriteDish}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sfx.playClick();
                    setCurrentIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === i
                      ? 'w-8 bg-gradient-to-r from-ember-500 to-gold-500 shadow-glow-ember'
                      : 'w-2 bg-charcoal-700 hover:bg-stone-500'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-xl bg-charcoal-950 hover:bg-charcoal-800 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl bg-charcoal-950 hover:bg-charcoal-800 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
