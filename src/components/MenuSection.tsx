import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Coffee, Milk, Sparkles, GlassWater, Layers, Star, Flame, Search, PlusCircle, Check, HelpCircle } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { MENU_ITEMS, CATEGORIES } from '../data';

interface MenuSectionProps {
  onAddItemToCart: (item: MenuItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function MenuSection({ onAddItemToCart, searchQuery, setSearchQuery }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter items based on search and selected category
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Category Icon Renderer
  const getCategoryIcon = (id: string, size = 20) => {
    switch (id) {
      case 'tea':
        return <Leaf size={size} className="text-emerald-500" />;
      case 'coffee':
        return <Coffee size={size} className="text-amber-700" />;
      case 'milk':
        return <Milk size={size} className="text-sky-400" />;
      case 'specials':
        return <Sparkles size={size} className="text-amber-500" />;
      case 'coolers':
        return <GlassWater size={size} className="text-teal-400" />;
      default:
        return <Layers size={size} className="text-stone-400" />;
    }
  };

  // Get count of items inside each category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return MENU_ITEMS.length;
    return MENU_ITEMS.filter(item => item.category === categoryId).length;
  };

  // Quick Bestseller Filter Shortcut
  const bestsellers = MENU_ITEMS.filter(item => item.isBestseller || item.isChefSpecial);

  return (
    <div className="space-y-8">
      {/* Search and Spotlights */}
      <div className="rounded-2xl bg-gradient-to-br from-[#2F1A0E] to-[#1C0F08] p-6 border-2 border-[#D4AF37]/35 shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-serif font-extrabold text-[#F9E8D2]">
              What would you like to sip today?
            </h2>
            <p className="text-sm text-[#EAD2B6]/70 mt-1">
              Filter by Parks or search for spices like ginger, elaichi, jaggery, or chocolate.
            </p>
          </div>

          {/* Large Highly Legible Search Bar */}
          <div className="relative w-full lg:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-5.5 w-5.5 text-amber-500" />
            </span>
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Ginger Tea, Irish Coffee, Mango Mojito..."
              className="w-full rounded-xl bg-[#170B05] border-2 border-[#D4AF37]/45 py-3.5 pl-12 pr-4 text-base font-semibold text-white placeholder-amber-900/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-500 hover:text-amber-400 font-bold text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Most Ordered Spotlight - Solves "Signature drinks not highlighted enough" */}
        <div className="mt-8 border-t border-[#D4AF37]/20 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-amber-500 animate-pulse" />
            <h3 className="text-lg font-serif font-black tracking-wide text-[#D4AF37] uppercase">
              ⭐ Chef's Recommendations & Bestsellers
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {bestsellers.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => onAddItemToCart(item)}
                className="group relative flex flex-col items-start rounded-xl bg-black/50 border border-[#D4AF37]/40 p-2.5 text-left hover:bg-amber-950/30 hover:border-amber-400 hover:scale-[1.03] transition-all duration-300 w-full overflow-hidden"
              >
                {item.image && (
                  <div className="w-full h-24 rounded-lg overflow-hidden border border-[#D4AF37]/15 mb-2.5 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1F1008]/80 border border-[#D4AF37]/60">
                      <Star className="h-2.5 w-2.5 fill-[#D4AF37] text-[#D4AF37]" />
                    </div>
                  </div>
                )}
                <span className="text-[9px] font-black tracking-widest text-[#D4AF37] uppercase">
                  {item.category === 'specials' ? 'SPECIAL' : 'BESTSELLER'}
                </span>
                <span className="text-sm font-extrabold text-white mt-0.5 group-hover:text-[#D4AF37] transition-colors leading-tight line-clamp-1">
                  {item.name}
                </span>
                <span className="text-base font-black text-[#F9E8D2] mt-1">
                  ₹{item.price}
                </span>
                <div className="mt-2.5 flex w-full items-center justify-between text-[10px] font-bold text-[#EAD2B6]/60 border-t border-[#D4AF37]/10 pt-2">
                  <span className="capitalize">{item.category} Park</span>
                  <span className="text-[#D4AF37] group-hover:underline flex items-center gap-0.5">
                    Order <PlusCircle className="h-3 w-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category selector (Parks) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-black tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-amber-500 animate-pulse" /> Select Cafe Park
          </label>
          <span className="text-[10px] text-[#EAD2B6]/60 font-black bg-stone-900/60 px-2.5 py-0.5 rounded-full border border-stone-800 uppercase tracking-wider">
            {filteredItems.length} listed
          </span>
        </div>

        {/* Compact, Highly Interactive Horizontal Pill Slider with Custom Hide Scrollbar */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="overflow-x-auto scrollbar-none flex gap-2 pb-1.5 pt-1 touch-pan-x">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  id={`btn-park-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer select-none flex-shrink-0 duration-200 outline-none ${
                    isActive
                      ? 'text-white'
                      : 'bg-[#25130A]/65 text-[#EAD2B6]/70 hover:text-white border border-[#D4AF37]/10 hover:border-[#D4AF37]/35 hover:bg-[#3D2314]/30'
                  }`}
                >
                  {/* Smooth sliding active background highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryHighlight"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-700 to-[#8B4513] border border-[#D4AF37] shadow-lg shadow-amber-950/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{ zIndex: 0 }}
                    />
                  )}

                  {/* Icon & Label & Count Badge */}
                  <span className="relative z-10 flex items-center gap-1.5 select-none">
                    {getCategoryIcon(cat.id, 14)}
                    <span className="tracking-wide text-xs font-black uppercase">{cat.name.replace(' Park', '')}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive 
                        ? 'bg-amber-950/65 text-[#D4AF37]' 
                        : 'bg-[#170B05] text-[#D4AF37]/75'
                    }`}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Description Drawer */}
        <AnimatePresence mode="wait">
          {(() => {
            const currentCat = CATEGORIES.find(c => c.id === selectedCategory);
            if (!currentCat) return null;
            return (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="bg-stone-950/45 border border-[#D4AF37]/15 rounded-xl p-3 flex items-center gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-[#D4AF37]/15 text-[#D4AF37] flex-shrink-0">
                  {getCategoryIcon(selectedCategory, 18)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-black text-[#D4AF37] text-sm leading-tight uppercase tracking-wider mb-0.5">
                    {currentCat.name}
                  </h4>
                  <p className="text-[#EAD2B6]/70 text-[11px] leading-snug">
                    {currentCat.description}
                  </p>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Main Grid of items: High Contrast, Highly Readable, combats Blurriness */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
          <span className="text-sm font-bold text-[#EAD2B6]/60 uppercase tracking-widest">
            Showing {filteredItems.length} specialty items
          </span>
          <span className="text-xs text-stone-400 italic">
            Tap item to customize and add to cart
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="rounded-xl border border-[#D4AF37]/20 bg-black/30 p-12 text-center text-[#EAD2B6]/60">
            <HelpCircle className="h-12 w-12 text-amber-600/60 mx-auto mb-2" />
            <p className="text-lg font-bold">No drinks match your criteria.</p>
            <p className="text-sm mt-1">Try resetting the filters or searching for another keyword.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-lg bg-amber-800 hover:bg-amber-700 px-4 py-2 font-bold text-white text-xs border border-amber-600/30"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredItems.map((item) => {
              const hasBestsellerTag = item.isBestseller || item.isChefSpecial;
              return (
                <div
                  key={item.id}
                  id={`menu-item-${item.id}`}
                  className={`group relative overflow-hidden rounded-2xl bg-[#1C0F08] border-2 transition-all duration-300 ${
                    item.isChefSpecial 
                      ? 'border-[#D4AF37] bg-gradient-to-r from-[#211209] to-[#2B160A] shadow-[#D4AF37]/5' 
                      : 'border-[#422213] hover:border-[#D4AF37]/60'
                  } p-5 hover:scale-[1.01] hover:shadow-xl shadow-black/40`}
                >
                  {/* Item Spotlight Border Glow for Specials */}
                  {item.isChefSpecial && (
                    <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-l from-amber-600 to-[#D4AF37] px-3 py-1 text-[10px] font-black tracking-widest text-[#1F1008] uppercase z-10 shadow-md">
                      Chef's Recommend
                    </div>
                  )}

                  {/* Standard Bestseller Label */}
                  {!item.isChefSpecial && item.isBestseller && (
                    <div className="absolute top-0 right-0 rounded-bl-xl bg-amber-700 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase z-10 shadow-md border-b border-l border-amber-500/30">
                      ★ Bestseller
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 h-full items-start sm:items-stretch">
                    {/* Beautiful cover image of drink/snack */}
                    {item.image && (
                      <div className="w-full sm:w-28 md:w-32 aspect-video sm:aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/25 flex-shrink-0 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-2">
                        {/* Name & Badge Row */}
                        <div className="flex items-start justify-between gap-4 pr-16">
                          <h4 className="text-xl font-black text-white leading-snug tracking-tight group-hover:text-[#D4AF37] transition-colors">
                            {item.name}
                          </h4>
                        </div>

                        {/* Description - Large and highly legible (+30% size, premium spacing) */}
                        <p className="text-[14px] font-medium leading-relaxed text-[#EAD2B6]/80 antialiased">
                          {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-block rounded-full bg-stone-900/80 px-2.5 py-0.5 text-xs font-semibold text-[#EAD2B6]/70 border border-stone-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price and Add button section - highly contrasted */}
                      <div className="flex items-center justify-between border-t border-[#D4AF37]/10 pt-4 mt-3">
                        <div>
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block leading-none mb-0.5">
                            Price
                          </span>
                          <span className="text-2xl font-serif font-black text-[#D4AF37] drop-shadow-sm">
                            ₹{item.price}
                          </span>
                        </div>

                        <button
                          id={`btn-add-${item.id}`}
                          onClick={() => onAddItemToCart(item)}
                          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-700 hover:to-amber-900 active:scale-95 text-white px-5 py-2.5 font-bold text-sm shadow-lg hover:shadow-amber-950/40 border border-[#D4AF37]/30 transition-all cursor-pointer"
                        >
                          <PlusCircle size={16} className="text-[#D4AF37]" />
                          <span>Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
