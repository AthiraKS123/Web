import React from 'react';
import { Flame, Sparkles, Star } from 'lucide-react';

export const MarqueeStrip: React.FC = () => {
  const items = [
    '100% JAPANESE A5 WAGYU',
    '72HR FERMENTED SOURDOUGH CRUST',
    '900°F OAK WOOD OVEN',
    'TRIPLE-COOKED CRISPY FRIES',
    'BLACK TRUFFLE AIOLI',
    'SMOKED GHOST PEPPER CHEDDAR',
    'MOLTEN CAST-IRON BROOKIES',
    'INTERACTIVE 3D ORDERING',
  ];

  return (
    <div className="relative py-4 bg-gradient-to-r from-ember-950 via-charcoal-900 to-ember-950 border-y border-ember-500/20 overflow-hidden shadow-[0_0_30px_rgba(255,85,0,0.1)]">
      {/* Glow sides */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-charcoal-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-charcoal-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee space-x-8">
        {/* Double array for seamless loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-6 text-stone-200">
            <span className="font-display font-black text-sm sm:text-base uppercase tracking-widest text-gradient-flame">
              {text}
            </span>
            {idx % 2 === 0 ? (
              <Flame className="w-4 h-4 text-ember-500 fill-ember-500" />
            ) : (
              <Sparkles className="w-4 h-4 text-gold-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
