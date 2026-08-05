import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Award, Utensils, HeartHandshake } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const galleryPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      title: 'Cast-Iron Wagyu Smash',
      tag: 'Craft Searing',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      title: 'Oak Wood-Fired Diavola',
      tag: '900°F Fire Oven',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
      title: 'Molten Volcano Fries',
      tag: 'Truffle & Beer Cheese',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      title: 'Flambé & Sizzle Kitchen',
      tag: 'Behind the Scenes',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
      title: 'Smoked Bourbon Shakes',
      tag: 'Craft Drinks',
      span: 'md:col-span-1 md:row-span-1',
    },
  ];

  const craftHighlights = [
    {
      icon: Flame,
      title: '100% Japanese Wagyu',
      desc: 'Ethically raised, heavily marbled, and seasoned with our proprietary smoked peppercorn blend.',
    },
    {
      icon: Award,
      title: 'Zero Pre-Fabricated Sauces',
      desc: 'Our secret burger sauces, hot wildflower honey, and black garlic aioli are made fresh daily.',
    },
    {
      icon: Utensils,
      title: 'Hand-Cut Triple-Cooked Fries',
      desc: 'Blanched, steamed, and fried twice in pure tallow for the crispiest exterior and fluffiest interior.',
    },
    {
      icon: HeartHandshake,
      title: 'Atmospheric Night Dining',
      desc: 'Dark moody industrial lounge with immersive lighting, fiery scents, and curated music vibes.',
    },
  ];

  return (
    <section id="gallery" className="relative py-28 bg-charcoal-900/60 overflow-hidden border-y border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-ember-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            Visual Craft Showcase
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mt-2">
            WHERE FLAME MEETS <span className="text-gradient-flame">FLAVOR</span>
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Feast your eyes on the sizzling art created in our open flame kitchen every single day.
          </p>
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {galleryPhotos.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative rounded-3xl overflow-hidden group border border-white/10 ${item.span}`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Tag & Caption */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-charcoal-950/70 backdrop-blur-md border border-white/10 flex items-center justify-between transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ember-400 block">
                    {item.tag}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white">{item.title}</h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-ember-500/20 border border-ember-500/40 flex items-center justify-center text-ember-400 group-hover:bg-ember-500 group-hover:text-white transition-colors">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Craft Highlights 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {craftHighlights.map((hl, i) => {
            const Icon = hl.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-5 rounded-2xl bg-charcoal-950/80 border border-white/10 hover:border-ember-500/40 transition-all flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-ember-500/15 border border-ember-500/30 flex items-center justify-center text-ember-400 mb-3 shadow-glow-ember">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white mb-1">{hl.title}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">{hl.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
