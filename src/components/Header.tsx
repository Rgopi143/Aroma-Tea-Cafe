import React from 'react';
import { Coffee, Flame, Phone, MapPin, Sparkles, TrendingUp, ShoppingCart, Award, Truck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OWNER_DETAILS, CAFE_LOGO_PATH } from '../data';
import { Language, TRANSLATIONS } from '../i18n';

interface HeaderProps {
  viewMode: 'customer' | 'admin' | 'delivery';
  setViewMode: (mode: 'customer' | 'admin' | 'delivery') => void;
  cartCount: number;
  scrollToCart: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  cartShakeTrigger?: number;
}

export default function Header({ viewMode, setViewMode, cartCount, scrollToCart, language, setLanguage, cartShakeTrigger }: HeaderProps) {
  const t = TRANSLATIONS[language];

  return (
    <header className="relative w-full overflow-hidden border-b-4 border-[#D4AF37] bg-radial from-[#3D2314] to-[#1F1008] text-[#F9E8D2] shadow-2xl">
      {/* Decorative top gold line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-600"></div>

      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo & Cafe Title */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#D4AF37] bg-[#2C160B] shadow-lg shadow-black/50">
              <img
                src={CAFE_LOGO_PATH}
                alt="Py's Aromaa Cafe Logo"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/aroma/100/100";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/40 to-transparent"></div>
            </div>

            <div>

              <h1 id="main-title" className="mt-1 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Py's <span className="text-[#D4AF37]">Aromaa</span> Cafe
              </h1>
              <p className="mt-1 text-sm font-medium tracking-wide text-[#EAD2B6]/80 sm:text-base italic">
                “{t.tagline}”
              </p>
            </div>
          </div>

          {/* Contact details & Mode Toggles */}
          <div className="flex flex-col items-center gap-4 sm:flex-row md:items-end md:flex-col lg:flex-row lg:items-center">
            {/* Quick Contact Badge */}
            <div className="hidden rounded-lg bg-[#25130A] border border-[#D4AF37]/20 px-4 py-2 text-xs text-[#EAD2B6]/90 sm:block shadow-inner">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Phone className="h-3.5 w-3.5 text-[#D4AF37]" /> {OWNER_DETAILS.phone}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-stone-400">
                <MapPin className="h-3.5 w-3.5 text-amber-700" /> Vinukonda Road
              </div>
            </div>



            {/* Floating Quick Cart Trigger */}
            {viewMode === 'customer' && (
              <motion.button
                key={`cart-trigger-${cartShakeTrigger || 0}`}
                id="cart-trigger"
                onClick={scrollToCart}
                animate={cartShakeTrigger && cartShakeTrigger > 0 ? {
                  x: [0, -8, 8, -8, 8, -4, 4, 0],
                  rotate: [0, -4, 4, -4, 4, -2, 2, 0]
                } : {}}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative flex items-center gap-2 rounded-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 font-bold text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 border border-amber-400/30"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{t.cart}</span>
                <AnimatePresence mode="popLayout">
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ 
                         type: 'spring', 
                         stiffness: 600, 
                         damping: 18,
                         mass: 0.8
                      }}
                      className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black ring-2 ring-[#3D2314]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </div>


      </div>
    </header>
  );
}
