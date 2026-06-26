import React, { useState, useEffect, useRef } from 'react';
import { Coffee, ShieldCheck, Heart, Sparkles, Navigation, Info, ShoppingCart, MessageSquare, Utensils } from 'lucide-react';
import { MenuItem, CartItem } from './types';
import { HERO_BANNER_PATH, OWNER_DETAILS } from './data';
import { Language, TRANSLATIONS } from './i18n';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import CartBuilder from './components/CartBuilder';
import OwnerInsights from './components/OwnerInsights';
import DeliveryView from './components/DeliveryView';
import LoyaltyRewards from './components/LoyaltyRewards';
import Footer from './components/Footer';

export default function App() {
  const [viewMode, setViewMode] = useState<'customer' | 'admin' | 'delivery'>('customer');
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('py_aromaa_lang');
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  // Persist language state
  useEffect(() => {
    localStorage.setItem('py_aromaa_lang', language);
  }, [language]);

  const [weeklyOrdersCount, setWeeklyOrdersCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('py_aromaa_weekly_orders');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem('py_aromaa_weekly_orders', weeklyOrdersCount.toString());
  }, [weeklyOrdersCount]);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('py_aromaa_weekly_orders');
        if (saved) {
          setWeeklyOrdersCount(parseInt(saved, 10));
        }
      } catch (e) {}
    };
    window.addEventListener('py_aromaa_order_placed', handleUpdate);
    return () => {
      window.removeEventListener('py_aromaa_order_placed', handleUpdate);
    };
  }, []);

  const handleIncrementWeeklyOrders = () => {
    setWeeklyOrdersCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('py_aromaa_weekly_orders', next.toString());
      return next;
    });
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('py_aromaa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [cartShakeTrigger, setCartShakeTrigger] = useState(0);

  const cartSectionRef = useRef<HTMLDivElement>(null);

  // Sync cart state with localStorage
  useEffect(() => {
    localStorage.setItem('py_aromaa_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle adding a menu item into the cart
  const handleAddItemToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      // If the exact item with standard settings already exists, increment quantity
      const existingIdx = prevCart.findIndex(
        (i) => i.menuItem.id === item.id && i.sweetness === 'Normal' && i.temperature === 'Hot' && !i.selectedSnack
      );

      if (existingIdx !== -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      }

      // Add as a new custom line item
      const newCartLine: CartItem = {
        id: `cart-line-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        menuItem: item,
        quantity: 1,
        sweetness: item.name.includes('Bellam') ? 'Bellam (Jaggery)' : 'Normal',
        temperature: item.category === 'coolers' ? 'Iced' : 'Hot',
      };
      
      return [...prevCart, newCartLine];
    });

    // Trigger cart shake animation
    setCartShakeTrigger((prev) => prev + 1);

    // Auto scroll to cart section on mobile to prevent missing it
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        scrollToCart();
      }, 100);
    }
  };

  const handleUpdateQuantity = (lineId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === lineId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (lineId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== lineId));
  };

  const handleCustomizeItem = (lineId: string, updates: Partial<CartItem>) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === lineId) {
          return { ...item, ...updates };
        }
        return item;
      })
    );
  };

  const scrollToCart = () => {
    cartSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#140A04] text-[#F9E8D2] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#1F1008] relative">
      {/* Absolute background wooden pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] opacity-25 pointer-events-none"></div>

      {/* Top micro-announcement panel */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 text-white py-2 text-center text-xs font-black tracking-widest uppercase border-b border-[#D4AF37]/25 flex items-center justify-center gap-2 px-4 z-50 relative">
        <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" />
        <span>🌟 SPECIAL PROMO: Enjoy free organic Osmania biscuits with any Aromaa Specials Tea! 🌟</span>
      </div>

      {/* Core Header Navigation */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        cartCount={totalCartCount}
        scrollToCart={scrollToCart}
        language={language}
        setLanguage={setLanguage}
        cartShakeTrigger={cartShakeTrigger}
      />

      {/* Primary Layout Frame */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        
        {viewMode === 'customer' && (
          <div className="space-y-10">
            {/* Visual Invitation Banner Card */}
            <div className="group relative overflow-hidden rounded-3xl border-4 border-[#D4AF37] shadow-2xl bg-black/60">
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
              
              {/* Image component */}
              <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
                <img
                  src={HERO_BANNER_PATH}
                  alt="Py's Aromaa Cafe Heritage Banner"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to picsum if local image is busy loading
                    e.currentTarget.src = "https://picsum.photos/seed/vintagecafe/1200/500?blur=1";
                  }}
                />
              </div>

              {/* Text overlay Plaque inside Hero */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:max-w-2xl text-left space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-gradient-to-r from-amber-700 to-amber-900 border border-[#D4AF37]/50 text-[10px] font-black tracking-widest text-white px-2.5 py-1 uppercase">
                    💯 Hand-Brewed Heritage
                  </span>
                  <span className="rounded bg-black/40 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 px-2 py-1 uppercase tracking-wider">
                    Pure Jaggery Sweetener
                  </span>
                </div>

                <h2 className="font-serif text-3xl font-black text-white sm:text-4xl md:text-5xl tracking-tight leading-none drop-shadow-md">
                  A Cozy Traditional <br/>
                  <span className="text-[#D4AF37]">Tea-House</span> Retreat.
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-[#EAD2B6]/90 leading-relaxed max-w-lg font-medium antialiased drop-shadow">
                  Tired of small font-sizes on hard-to-read chalkboards? Use our ultra-clear, high-readability digital menu to order, customize sweetness, and pair with fresh local snacks!
                </p>


              </div>
            </div>

            {/* Loyalty Rewards Progress Tracker */}
            <LoyaltyRewards language={language} />

            {/* Main Interactive Grid: Left Column = Menu Catalog, Right Column = Sticky Cart Builder */}
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              
              {/* Menu Catalog Section - taking 7 cols */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-black tracking-wide text-white uppercase flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-[#D4AF37]" /> Py's Aromaa Interactive Menu
                  </h3>
                  <p className="text-xs text-[#EAD2B6]/60 mt-0.5">
                    Click "Order" on any specialty brew to builder-customize your beverage preferences.
                  </p>
                </div>



                <MenuSection
                  onAddItemToCart={handleAddItemToCart}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>

              {/* Cart Receipt & Checkout Column - taking 5 cols */}
              <div ref={cartSectionRef} className="lg:col-span-5 lg:sticky lg:top-6 space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-black tracking-wide text-white uppercase flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-[#D4AF37]" /> Interactive Order Plate
                  </h3>
                  <p className="text-xs text-[#EAD2B6]/60 mt-0.5">
                    Tweak beverage details, attach snacks, calculate average ticket stats, and scan UPI.
                  </p>
                </div>

                <CartBuilder
                  cart={cart}
                  setCart={setCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCustomizeItem={handleCustomizeItem}
                  language={language}
                  cartShakeTrigger={cartShakeTrigger}
                  onTriggerCartShake={() => setCartShakeTrigger((prev) => prev + 1)}
                />
              </div>

            </div>
          </div>
        )}

        {viewMode === 'admin' && (
          /* Owner Strategy & Business Insights View */
          <OwnerInsights />
        )}

        {viewMode === 'delivery' && (
          /* Live Delivery Dispatch & Kitchen Prep View */
          <DeliveryView />
        )}

      </main>

      {/* Cozy Brand footer detailing contacts, location and QR Codes */}
      <Footer />
    </div>
  );
}
