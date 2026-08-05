import React, { useState } from 'react';
import { Flame, ArrowUp, Send, CheckCircle2, Instagram, Twitter, Youtube } from 'lucide-react';
import { sfx } from '../../sound/sfx';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sfx.playSuccess();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    sfx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-charcoal-950 text-stone-300 pt-20 pb-10 border-t border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-ember-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ember-500 to-crimson-600 flex items-center justify-center shadow-glow-ember">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                EMBER <span className="text-ember-500">CRAFT</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Artisan smashed Japanese Wagyu, 900°F oak wood-fired sourdough pizzas, and triple-cooked loaded fries. Redefining modern fast-casual culinary craft.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    onClick={() => sfx.playClick()}
                    aria-label={item.label}
                    className="w-9 h-9 rounded-xl bg-charcoal-900 border border-white/10 hover:border-ember-500/40 hover:bg-ember-500/10 flex items-center justify-center text-stone-400 hover:text-ember-400 transition-all hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              {['Home', 'Menu', 'Craft & Story', 'Gallery', 'Reviews', 'Find Us'].map((name, i) => (
                <li key={i}>
                  <a
                    href={`#${name.toLowerCase().replace(/[^a-z]/g, '')}`}
                    onClick={() => sfx.playClick()}
                    className="hover:text-ember-400 transition-colors"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizzle Specials */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              Kitchen Specials
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              <li><span className="text-stone-300">Wagyu Smash Wednesdays</span></li>
              <li><span className="text-stone-300">Late Night Sizzle (10PM - 2AM)</span></li>
              <li><span className="text-stone-300">Oak Fire Pizza Flights</span></li>
              <li><span className="text-stone-300">VIP Chef Counter Dining</span></li>
              <li><span className="text-stone-300">Craft Secret Sauces</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              Join the Ember Guild
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Get secret drops, VIP table invitations, and 20% off your first 3D food order.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're in the Guild! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:border-ember-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-ember-500 to-crimson-600 text-white font-bold text-xs shadow-glow-ember hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe for Perks</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} EMBER CRAFT Hospitality Group. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Nutritional Guide</span>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-charcoal-900 border border-white/10 hover:border-ember-500/40 hover:text-white flex items-center justify-center text-stone-400 transition-colors"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
