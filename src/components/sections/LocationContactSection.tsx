import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Flame, Navigation, CheckCircle2 } from 'lucide-react';
import { sfx } from '../../sound/sfx';

export const LocationContactSection: React.FC = () => {
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [formSent, setFormSent] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  useEffect(() => {
    // Check if open (11:00 AM - 02:00 AM)
    const now = new Date();
    const hours = now.getHours();
    setIsOpenNow(hours >= 11 || hours < 2);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) return;

    sfx.playSuccess();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="location" className="relative py-28 bg-charcoal-900/40 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-ember-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            Visit Our Craft Kitchen
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mt-2">
            LOCATION & <span className="text-gradient-flame">SIZZLE HOURS</span>
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3">
            Drop by our moody industrial lounge or reach out for catering, private parties, and VIP kitchen tours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours, Location Info & Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Open Status Card */}
            <div className="p-6 rounded-3xl bg-charcoal-900/90 border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-ember-500/15 border border-ember-500/30 flex items-center justify-center text-ember-400 shadow-glow-ember">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-display font-bold text-base text-white">
                      {isOpenNow ? 'GRILL IS SIZZLING (OPEN NOW)' : 'CURRENTLY CLOSED'}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">
                    {isOpenNow ? 'Open today until 2:00 AM Late Night' : 'Opens tomorrow at 11:00 AM'}
                  </span>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-stone-200 hover:text-white text-xs font-semibold border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-ember-400" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Address & Hours Detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-charcoal-950/80 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-ember-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Address & Parking</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-medium">
                  742 Evergreen Sizzle Blvd<br />
                  Craft Culinary District, NY 10012
                </p>
                <span className="text-[11px] text-stone-500 block">
                  * Complimentary Valet Parking available after 6 PM.
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-charcoal-950/80 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-ember-400 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Weekly Sizzle Hours</span>
                </div>
                <div className="text-xs text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Mon – Thu:</span>
                    <span>11:00 AM – Midnight</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Fri – Sat:</span>
                    <span className="text-ember-400 font-bold">11:00 AM – 2:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Sunday:</span>
                    <span>11:00 AM – 11:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Interactive Map Mockup */}
            <div className="relative h-60 rounded-3xl overflow-hidden border border-white/10 bg-charcoal-950 group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                alt="Map Graphic"
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-[1px]" />

              {/* Pin Indicator */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-ember-500/20 border-2 border-ember-500 flex items-center justify-center text-white shadow-glow-ember animate-bounce">
                  <Flame className="w-6 h-6 fill-ember-500 text-white" />
                </div>
                <div className="mt-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 text-xs font-bold text-white shadow-lg">
                  EMBER CRAFT • Kitchen & Bar
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact / Catering Form */}
          <div className="lg:col-span-6 bg-charcoal-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <h3 className="font-display font-black text-2xl text-white mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              Got catering questions, private event requests, or feedback for the kitchen? Let us know!
            </p>

            {formSent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce shadow-glow-gold">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">Message Sent!</h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Thanks for reaching out. Our craft manager will get back to your inquiry within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Alex Morgan"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-charcoal-950 border border-white/10 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:border-ember-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-charcoal-950 border border-white/10 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:border-ember-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Topic / Inquiry
                  </label>
                  <select
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-charcoal-950 border border-white/10 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-ember-500"
                  >
                    <option>General Inquiry</option>
                    <option>Private Event / Buyout</option>
                    <option>Corporate Catering</option>
                    <option>Dietary / Allergy Question</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you have in mind..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-charcoal-950 border border-white/10 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:border-ember-500 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ember-500 via-ember-600 to-crimson-600 hover:from-ember-600 hover:to-crimson-700 text-white font-bold text-xs uppercase tracking-wider shadow-glow-ember hover:shadow-glow-ember-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
