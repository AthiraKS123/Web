import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, Flame, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TableReservation } from '../../types/menu';
import { sfx } from '../../sound/sfx';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (reservation: TableReservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [bookingRef, setBookingRef] = useState('');

  const [formData, setFormData] = useState<TableReservation>({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    seatingZone: 'chef-counter',
    specialRequests: '',
  });

  const timeSlots = ['17:00', '18:15', '19:30', '20:45', '22:00', '23:15'];

  const seatingZones: { id: TableReservation['seatingZone']; name: string; desc: string; icon: string }[] = [
    {
      id: 'chef-counter',
      name: "Chef's Flame Counter",
      desc: 'Front-row seats to our 900°F wood-fired oven and cast-iron grill.',
      icon: '🔥',
    },
    {
      id: 'vip-booth',
      name: 'Ember VIP Booth',
      desc: 'Moody, plush leather booth with intimate amber lighting.',
      icon: '✨',
    },
    {
      id: 'indoor-lounge',
      name: 'Main Lounge',
      desc: 'Lively atmosphere surrounded by modern industrial craft design.',
      icon: '🍸',
    },
    {
      id: 'patio-terrace',
      name: 'Patio & Fire Pit',
      desc: 'Open-air terrace dining under starry skies with outdoor heaters.',
      icon: '🌙',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    sfx.playSuccess();
    const ref = `EMB-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setStep('confirmed');
    onSuccess(formData);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5500', '#FFB800', '#FF1E56', '#FFFFFF'],
    });
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative z-10 w-full max-w-2xl bg-charcoal-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ember-500/20 border border-ember-500/40 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-ember-400" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">
                    Reserve a Table
                  </h3>
                  <p className="text-xs text-stone-400">
                    Experience craft burgers & wood-fired pizza in person
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {step === 'confirmed' ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce shadow-glow-gold">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-black text-2xl text-white">
                    Table Reserved!
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-ember-400 font-bold">
                    Reservation Code: {bookingRef}
                  </p>
                  <p className="text-sm text-stone-300 max-w-md mx-auto">
                    We've saved a prime table for <strong>{formData.guests} guests</strong> on{' '}
                    <strong>{formData.date}</strong> at <strong>{formData.time}</strong> in our{' '}
                    <strong>
                      {seatingZones.find((z) => z.id === formData.seatingZone)?.name}
                    </strong>
                    . A confirmation SMS & email have been dispatched.
                  </p>

                  <div className="p-4 rounded-xl bg-charcoal-900 border border-white/10 max-w-sm mx-auto text-left text-xs space-y-2 text-stone-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-ember-400" />
                      <span>742 Evergreen Sizzle Blvd, Craft District</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-ember-400" />
                      <span>Please arrive 5 minutes prior to your slot</span>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-ember-500 to-crimson-600 text-white font-bold text-sm shadow-glow-ember hover:opacity-95"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Party Size & Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Guests */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-ember-400" /> Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({ ...formData, guests: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-ember-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-ember-400" /> Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-ember-500"
                        required
                      />
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-ember-400" /> Time Slot
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-ember-500"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Seating Zone Preference */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-ember-400" /> Seating Zone
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {seatingZones.map((zone) => {
                        const isSelected = formData.seatingZone === zone.id;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => {
                              sfx.playClick();
                              setFormData({ ...formData, seatingZone: zone.id });
                            }}
                            className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-ember-500/15 border-ember-500 text-white shadow-glow-ember'
                                : 'bg-charcoal-900/70 border-white/5 text-stone-400 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-base">{zone.icon}</span>
                              <span className="font-bold text-xs text-stone-100">{zone.name}</span>
                            </div>
                            <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                              {zone.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-white/5">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Wick"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:border-ember-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:border-ember-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:border-ember-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Special Requests / Birthday / Anniversary (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Celebrating 5th Anniversary, need candle dessert!"
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({ ...formData, specialRequests: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-white text-xs placeholder-stone-600 focus:outline-none focus:border-ember-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ember-500 via-ember-600 to-crimson-600 hover:from-ember-600 hover:to-crimson-700 text-white font-bold text-sm shadow-glow-ember hover:shadow-glow-ember-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Confirm VIP Table Reservation</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
