import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, CheckCircle2, Flame, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../../types/menu';
import { sfx } from '../../sound/sfx';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate pricing
  const subtotal = items.reduce((acc, item) => {
    const addonsTotal = item.selectedAddons.reduce((a, addon) => a + addon.price, 0);
    return acc + (item.menuItem.price + addonsTotal) * item.quantity;
  }, 0);

  const freeDeliveryThreshold = 45;
  const progressToFreeDelivery = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);
  const remainingForFreeDelivery = Math.max(freeDeliveryThreshold - subtotal, 0);
  const deliveryFee = subtotal === 0 || subtotal >= freeDeliveryThreshold ? 0 : 4.99;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(subtotal - discountAmount + deliveryFee, 0);

  const handleApplyPromo = () => {
    sfx.playClick();
    const code = promoCode.trim().toUpperCase();
    if (code === 'EMBER20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Ember VIP discount applied!');
      setPromoError('');
    } else if (code === 'EMBER10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Welcome discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "EMBER20"');
      setPromoSuccess('');
    }
  };

  const handleCheckout = () => {
    sfx.playSuccess();
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setOrderNumber(`EC-${Math.floor(100000 + Math.random() * 900000)}`);

      // Fire celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF5500', '#FFB800', '#FF1E56', '#FFFFFF'],
      });
    }, 1500);
  };

  const handleResetAndClose = () => {
    onClearCart();
    setOrderComplete(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative z-10 w-full max-w-md h-full bg-charcoal-950 border-l border-white/10 flex flex-col justify-between shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-charcoal-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-ember-500/20 border border-ember-500/40 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-ember-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Your Order</h3>
                  <p className="text-xs text-stone-400">
                    {items.length} {items.length === 1 ? 'item' : 'items'} in cart
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Delivery Tracker Bar */}
            {items.length > 0 && !orderComplete && (
              <div className="px-5 py-3 bg-charcoal-900/80 border-b border-white/5">
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  {remainingForFreeDelivery === 0 ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> FREE Express Delivery unlocked!
                    </span>
                  ) : (
                    <span className="text-stone-300">
                      Add <strong className="text-ember-400">${remainingForFreeDelivery.toFixed(2)}</strong> more for FREE delivery
                    </span>
                  )}
                  <span className="text-stone-500">{Math.round(progressToFreeDelivery)}%</span>
                </div>
                <div className="h-1.5 w-full bg-charcoal-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-ember-500 to-gold-500 rounded-full"
                    style={{ width: `${progressToFreeDelivery}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {orderComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-glow-gold animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-black text-2xl text-white">Order Confirmed!</h4>
                  <p className="text-xs uppercase tracking-widest text-ember-400 font-bold mt-1">
                    Order ID: {orderNumber}
                  </p>
                  <p className="text-sm text-stone-400 max-w-xs mt-3">
                    The kitchen has fired up the grill! Your order will be sizzling hot and ready in approximately <strong>20-25 mins</strong>.
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-charcoal-900/80 border border-white/10 w-full text-left space-y-2 text-xs">
                    <div className="flex justify-between text-stone-300">
                      <span>Status:</span>
                      <span className="text-ember-400 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> Sizzling on the Grill
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span>Estimated Arrival:</span>
                      <span className="text-white font-medium">8:45 PM</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetAndClose}
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-ember-500 to-crimson-600 text-white font-bold text-sm shadow-glow-ember hover:opacity-95"
                  >
                    Done & Back to Menu
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-charcoal-900 border border-white/10 flex items-center justify-center text-stone-500 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Your cart is empty</h4>
                  <p className="text-xs text-stone-400 max-w-xs mt-1">
                    Explore our wood-fired burgers, crispy pizzas, and loaded fries to add some heat!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-stone-200 text-xs font-semibold border border-white/10"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const itemAddonsTotal = item.selectedAddons.reduce((a, b) => a + b.price, 0);
                  const itemUnitPrice = item.menuItem.price + itemAddonsTotal;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3.5 rounded-xl bg-charcoal-900/80 border border-white/10 flex gap-3.5 relative group hover:border-ember-500/30 transition-all"
                    >
                      <img
                        src={item.menuItem.imageUrl}
                        alt={item.menuItem.name}
                        className="w-20 h-20 rounded-lg object-cover bg-charcoal-800"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-display font-bold text-sm text-white leading-tight">
                              {item.menuItem.name}
                            </h4>
                            <button
                              onClick={() => {
                                sfx.playClick();
                                onRemoveItem(item.id);
                              }}
                              className="text-stone-500 hover:text-crimson-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-ember-400 mt-0.5 block">
                            ${(itemUnitPrice * item.quantity).toFixed(2)}
                          </span>

                          {/* Selected Addons */}
                          {item.selectedAddons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {item.selectedAddons.map((addon) => (
                                <span
                                  key={addon.id}
                                  className="text-[10px] bg-charcoal-800 text-stone-300 px-1.5 py-0.5 rounded border border-white/5"
                                >
                                  +{addon.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              sfx.playClick();
                              onUpdateQuantity(item.id, item.quantity - 1);
                            }}
                            className="w-6 h-6 rounded-md bg-charcoal-800 hover:bg-charcoal-700 flex items-center justify-center text-stone-300 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              sfx.playClick();
                              onUpdateQuantity(item.id, item.quantity + 1);
                            }}
                            className="w-6 h-6 rounded-md bg-charcoal-800 hover:bg-charcoal-700 flex items-center justify-center text-stone-300 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer / Summary & Checkout */}
            {items.length > 0 && !orderComplete && (
              <div className="p-5 border-t border-white/10 bg-charcoal-900/90 backdrop-blur-md space-y-4">
                {/* Promo Code Input */}
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo Code (try EMBER20)"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-charcoal-950 border border-white/10 rounded-lg text-white focus:outline-none focus:border-ember-500"
                      />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      className="px-3.5 py-2 text-xs font-bold bg-charcoal-800 hover:bg-charcoal-700 text-stone-200 rounded-lg border border-white/10"
                    >
                      Apply
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-400 font-medium">{promoSuccess}</p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-crimson-400 font-medium">{promoError}</p>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-1.5 text-xs text-stone-400 pt-1 border-t border-white/5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-stone-200 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-stone-200 font-medium">
                      {deliveryFee === 0 ? <strong className="text-emerald-400 uppercase">FREE</strong> : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="text-gradient-flame text-base">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ember-500 via-ember-600 to-crimson-600 hover:from-ember-600 hover:to-crimson-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-ember hover:shadow-glow-ember-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isCheckingOut ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Proceed to Sizzle Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
