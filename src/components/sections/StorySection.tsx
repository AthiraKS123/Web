import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Award, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { CAFE_STATS } from '../../data/menuData';

export const StorySection: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: 'Cast-Iron Searing at 700°F',
      desc: 'Our Wagyu patties are smashed onto smoking-hot seasoned cast iron to create that legendary crunchy Maillard crust while locking in juices.',
    },
    {
      icon: Clock,
      title: '72-Hour Sourdough Ferment',
      desc: 'We cultivate wild sourdough starter over 3 days, yielding a digestible, ultra-airy, charred leopard-spotted pizza crust.',
    },
    {
      icon: Award,
      title: 'Small-Batch Craft Sauces',
      desc: 'From hot wildflower honey to bourbon-smoked chipotle aioli, every sauce is simmered in-house with zero artificial preservatives.',
    },
  ];

  return (
    <section id="story" className="relative py-28 bg-charcoal-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-ember-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Rich Visual Graphic with 3D Spinning Badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
                alt="Chef grilling smash burger on cast iron flame"
                className="w-full h-[450px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-black/30" />

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-white/10">
                <p className="text-xs italic text-stone-300">
                  "Cooking with open fire is not merely a cooking technique. It is the purest conversation between heat, smoke, and primal appetite."
                </p>
                <span className="text-[11px] font-bold text-ember-400 mt-2 block uppercase tracking-wider">
                  — Chef Antoine Rossi, Founder & Master of Flame
                </span>
              </div>
            </div>

            {/* Floating 3D Spinning Craft Badge */}
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-ember-500 via-ember-600 to-crimson-600 p-1 shadow-glow-ember-lg animate-float hidden sm:block">
              <div className="w-full h-full rounded-full bg-charcoal-950 flex flex-col items-center justify-center text-center p-2 border border-ember-500/50">
                <Flame className="w-6 h-6 text-ember-400 animate-pulse" />
                <span className="font-display font-black text-[10px] text-white tracking-widest mt-0.5">
                  SINCE 2019
                </span>
                <span className="text-[8px] text-stone-400 font-bold uppercase">
                  Craft Lab
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story & Craftsmanship Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
                The Ember Philosophy
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mt-2 leading-tight">
                BORN IN EMBERS, <br />
                <span className="text-gradient-flame">OBSESSED WITH HEAT.</span>
              </h2>
              <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
                Ember Craft started with a single cast-iron skillet and a relentless mission: to redefine fast-casual dining into a high-art culinary experience. No shortcuts, no pre-frozen shortcuts—just roaring flame, premium wagyu beef, and artisan technique.
              </p>
            </div>

            {/* Three Pillars Cards */}
            <div className="space-y-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                    className="p-4 sm:p-5 rounded-2xl bg-charcoal-900/80 border border-white/10 hover:border-ember-500/40 transition-all flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-ember-500/15 border border-ember-500/30 flex items-center justify-center text-ember-400 shrink-0 group-hover:scale-110 group-hover:bg-ember-500 group-hover:text-white transition-all shadow-glow-ember">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Sizzle Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              {CAFE_STATS.map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-charcoal-900/50 border border-white/5 text-center">
                  <span className="font-display font-black text-xl text-gradient-flame block">
                    {st.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mt-0.5 block">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
