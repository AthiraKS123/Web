import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Clock, Sparkles, Star, Plus, Minus, Check, Heart } from 'lucide-react';
import { MenuItem, MenuItemAddon } from '../../types/menu';
import { sfx } from '../../sound/sfx';

interface ItemQuickViewModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, selectedAddons: MenuItemAddon[], specialInstructions: string) => void;
}

export const ItemQuickViewModal: React.FC<ItemQuickViewModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<MenuItemAddon[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!item) return null;

  const toggleAddon = (addon: MenuItemAddon) => {
    sfx.playClick();
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((acc, a) => acc + a.price, 0);
  const unitPrice = item.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    sfx.playAddToCart();
    setAddedAnimation(true);
    onAddToCart(item, quantity, selectedAddons, specialInstructions);

    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
      // Reset state for next modal open
      setQuantity(1);
      setSelectedAddons([]);
      setSpecialInstructions('');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-4xl bg-charcoal-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-charcoal-900/90 border border-white/10 hover:border-ember-500/40 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: High-Res Appetizing Food Presentation Card */}
            <div className="w-full md:w-1/2 bg-gradient-to-b from-charcoal-900 to-charcoal-950 p-5 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden group">
              {/* Warm Ambient Glow Behind Dish */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-ember-500/20 via-gold-500/15 to-crimson-600/10 blur-3xl pointer-events-none" />

              {/* Top Badges Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-ember-400 bg-ember-500/15 border border-ember-500/30 rounded-full font-mono">
                    {item.category}
                  </span>
                  {item.dietary.includes('chef-special') && (
                    <span className="px-2.5 py-1 text-xs font-bold text-charcoal-950 bg-gold-400 rounded-full flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3 fill-charcoal-950" /> Chef Pick
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    sfx.playClick();
                    setIsFavorite(!isFavorite);
                  }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                    isFavorite
                      ? 'bg-crimson-500/20 border-crimson-500 text-crimson-400'
                      : 'bg-black/40 border-white/10 text-stone-400 hover:text-white'
                  }`}
                  title="Favorite Dish"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-crimson-500' : ''}`} />
                </button>
              </div>

              {/* Dish Visual Preview Showcase */}
              <div className="relative z-10 my-auto py-4 flex items-center justify-center min-h-[260px] sm:min-h-[320px]">
                <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-charcoal-900/80 flex items-center justify-center p-3 group-hover:border-ember-500/30 transition-all duration-500">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                </div>
              </div>

              {/* Bottom Prep & Calories Footer */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-1.5 text-ember-400 font-medium">
                  <Flame className="w-4 h-4 fill-ember-500/20 text-ember-400" />
                  <span>Artisan Recipe</span>
                </div>
                <div className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Prep: {item.prepTime}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Food Details & Customizer */}
            <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                {/* Dietary Tags & Spice */}
                <div className="flex flex-wrap items-center gap-2">
                  {item.spiceLevel > 0 && (
                    <span className="px-2.5 py-0.5 text-[11px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-1">
                      {Array.from({ length: item.spiceLevel }).map((_, i) => (
                        <Flame key={i} className="w-3 h-3 fill-red-500 text-red-500" />
                      ))}
                      <span>Level {item.spiceLevel}</span>
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 text-[11px] text-stone-300 bg-charcoal-800 rounded-md border border-white/5 font-mono">
                    {item.calories} kcal
                  </span>
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1 font-medium italic">
                    "{item.tagline}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-bold text-white">{item.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-stone-400">({item.reviewsCount} verified reviews)</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Ingredients Chips */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                    Core Ingredients
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-charcoal-900 border border-white/10 text-stone-200 px-2.5 py-1 rounded-lg"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Customizable Addons */}
                {item.customizableAddons && item.customizableAddons.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-ember-400" /> Customize Your Dish
                      </span>
                      <span className="text-[11px] text-stone-400">Optional</span>
                    </div>

                    <div className="space-y-1.5">
                      {item.customizableAddons.map((addon) => {
                        const isSelected = selectedAddons.some((a) => a.id === addon.id);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => toggleAddon(addon)}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-ember-500/15 border-ember-500/50 text-white'
                                : 'bg-charcoal-900/80 border-white/5 text-stone-300 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-ember-500 border-ember-500 text-white'
                                    : 'border-stone-600'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="font-medium">{addon.name}</span>
                            </div>
                            <span className="font-bold text-ember-400 font-mono">+${addon.price.toFixed(2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Special Instructions */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="special-notes" className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                    Special Kitchen Notes
                  </label>
                  <input
                    id="special-notes"
                    type="text"
                    placeholder="e.g. Extra crispy, dressing on the side..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-charcoal-900 border border-white/10 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-ember-500/60"
                  />
                </div>
              </div>

              {/* Bottom Sticky Action Bar: Quantity & Add to Cart */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center bg-charcoal-900 border border-white/10 rounded-xl p-1">
                  <button
                    onClick={() => {
                      sfx.playClick();
                      setQuantity((q) => Math.max(1, q - 1));
                    }}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => {
                      sfx.playClick();
                      setQuantity((q) => q + 1);
                    }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-ember-500 to-crimson-600 hover:from-ember-600 hover:to-crimson-700 text-white shadow-glow-ember hover:shadow-glow-crimson'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" /> Added to Order!
                      </>
                    ) : (
                      'Add to Order'
                    )}
                  </span>
                  <span className="font-mono font-bold tracking-tight">
                    ${totalPrice.toFixed(2)}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
