import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/ui/Preloader';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeStrip } from './components/sections/MarqueeStrip';
import { StorySection } from './components/sections/StorySection';
import { MenuSection } from './components/sections/MenuSection';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { LocationContactSection } from './components/sections/LocationContactSection';
import { Footer } from './components/sections/Footer';
import { CartDrawer } from './components/ui/CartDrawer';
import { ItemQuickViewModal } from './components/ui/ItemQuickViewModal';
import { ReservationModal } from './components/ui/ReservationModal';
import { ToastContainer, ToastMessage } from './components/ui/Toast';
import { MenuItem, MenuItemAddon, CartItem, TableReservation } from './types/menu';

export function App() {
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (
    item: MenuItem,
    quantity: number = 1,
    selectedAddons: MenuItemAddon[] = [],
    specialInstructions: string = ''
  ) => {
    const cartItemId = `${item.id}-${selectedAddons.map((a) => a.id).sort().join('-')}-${specialInstructions.slice(0, 10)}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: item,
          quantity,
          selectedAddons,
          specialInstructions,
        },
      ];
    });

    addToast('flame', `Added ${quantity}x ${item.name}`, 'Order updated in cart');
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('info', 'Item removed from order');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-charcoal-950 text-stone-100 selection:bg-ember-500 selection:text-white">
      {/* Cinematic Intro Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Sticky Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenReservation={() => setReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="w-full">
        <HeroSection
          onExploreMenu={scrollToMenu}
          onOpenReservation={() => setReservationOpen(true)}
        />
        <MarqueeStrip />
        <StorySection />
        <MenuSection
          onSelectItem={(item) => setQuickViewItem(item)}
          onQuickAdd={(item) => handleAddToCart(item, 1, [])}
        />
        <WhyUsSection />
        <ReviewsSection />
        <LocationContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 3D Food Item Quick View Modal */}
      <ItemQuickViewModal
        item={quickViewItem}
        isOpen={!!quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        onSuccess={(res: TableReservation) => {
          addToast('success', 'VIP Table Reserved!', `${res.guests} guests on ${res.date} at ${res.time}`);
        }}
      />
    </div>
  );
}
export default App;
