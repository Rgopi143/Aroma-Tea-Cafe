import React, { useState, useEffect } from 'react';
import { Coffee, Sparkles, Gift, RotateCcw, Plus, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n';

interface LoyaltyRewardsProps {
  language: Language;
}

export default function LoyaltyRewards({ language }: LoyaltyRewardsProps) {
  const t = TRANSLATIONS[language];
  const [cupsCount, setCupsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('py_aromaa_loyalty_cups');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Keep state in sync with localStorage
  useEffect(() => {
    localStorage.setItem('py_aromaa_loyalty_cups', cupsCount.toString());
  }, [cupsCount]);

  // Handle outside events (e.g., order successfully placed increments the loyalty rewards counts)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('py_aromaa_loyalty_cups');
        if (saved) {
          setCupsCount(parseInt(saved, 10));
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event to update in real-time when checkout is placed in the same window
    window.addEventListener('py_aromaa_order_placed', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('py_aromaa_order_placed', handleStorageChange);
    };
  }, []);

  const totalRequired = 6;
  const earnedFreeDrinks = Math.floor(cupsCount / totalRequired);
  const currentProgressCups = cupsCount % totalRequired;
  const percent = (currentProgressCups / totalRequired) * 100;
  const remaining = totalRequired - currentProgressCups;

  // Add mock cup to let the user immediately test and preview the loyalty system
  const handleAddMockCup = () => {
    setCupsCount((prev) => prev + 1);
  };

  const handleClaimReward = () => {
    if (cupsCount >= totalRequired) {
      setCupsCount((prev) => Math.max(0, prev - totalRequired));
    }
  };

  const handleResetLoyalty = () => {
    if (window.confirm(language === 'te' ? 'లాయల్టీ కౌంటర్‌ను రీసెట్ చేయాలనుకుంటున్నారా?' : language === 'hi' ? 'क्या आप लॉयल्टी काउंटर रीसेट करना चाहते हैं?' : 'Are you sure you want to reset your loyalty cup counter?')) {
      setCupsCount(0);
    }
  };

  // Generate localized text replacements
  const pointsLabel = t.loyaltyPointsCount.replace('{count}', currentProgressCups.toString());
  const remainingLabel = t.buyMoreDrinks.replace('{remaining}', remaining.toString());

  return (
    <div className="relative overflow-hidden rounded-3xl border-4 border-[#D4AF37] bg-radial from-[#351E12] to-[#1F1008] p-6 shadow-2xl text-[#F9E8D2] font-sans">
      {/* Absolute top badge decorative line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-500"></div>
      
      {/* Interactive Sparkle Elements */}
      <div className="absolute right-3 top-3 opacity-30 animate-pulse pointer-events-none">
        <Sparkles className="h-6 w-6 text-[#D4AF37]" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left column info */}
        <div className="space-y-2 text-left max-w-lg">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-amber-950/80 border border-[#D4AF37]/50 px-2.5 py-1 text-[11px] font-black uppercase tracking-widest text-[#D4AF37] shadow-inner">
              <Gift className="h-3.5 w-3.5 animate-bounce" /> {t.loyaltyTitle}
            </span>
            {earnedFreeDrinks > 0 && (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-950 border border-emerald-500 px-2.5 py-1 text-[11px] font-black uppercase tracking-widest text-emerald-400 shadow animate-pulse">
                🏆 {earnedFreeDrinks} FREE DRINK{earnedFreeDrinks > 1 ? 'S' : ''} READY!
              </span>
            )}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight">
            {t.loyaltySub}
          </h3>
          <p className="text-xs sm:text-sm text-[#EAD2B6]/80 leading-relaxed">
            {cupsCount >= totalRequired 
              ? t.freeDrinkEarned 
              : remainingLabel}
          </p>
        </div>

        {/* Action Controls for Testing */}
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <button
            onClick={handleAddMockCup}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold px-3 py-1.5 border border-white/10 transition-colors"
            title="Simulate adding a beverage purchase"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span>{language === 'te' ? '+ కప్పు చేర్చు' : language === 'hi' ? '+ कप जोड़ें' : '+ Purchase Cup'}</span>
          </button>
          
          <button
            onClick={handleResetLoyalty}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-red-400 transition-colors border border-white/5"
            title="Reset Counter"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Progress Bar Section */}
      <div className="mt-6 space-y-4">
        {/* The connecting progress line path and individual cup nodes */}
        <div className="relative py-2">
          {/* Background track line */}
          <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-black/40 rounded-full -translate-y-1/2 border border-white/5"></div>
          
          {/* Active progress fill track */}
          <div 
            style={{ width: `${percent}%` }}
            className="absolute top-1/2 left-4 h-1.5 bg-gradient-to-r from-amber-600 to-[#D4AF37] rounded-full -translate-y-1/2 transition-all duration-500 ease-out"
          ></div>

          {/* Individual cup milestone node nodes */}
          <div className="relative flex justify-between items-center z-10">
            {[...Array(totalRequired)].map((_, index) => {
              const cupNumber = index + 1;
              const isFilled = currentProgressCups >= cupNumber;
              const isLast = cupNumber === totalRequired;

              return (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-md ${
                      isFilled
                        ? 'bg-gradient-to-br from-amber-400 to-[#D4AF37] text-[#1F1008] border-[#F9E8D2] scale-110'
                        : isLast
                        ? 'bg-[#1F1008] text-amber-400 border-[#D4AF37] border-dashed animate-pulse'
                        : 'bg-[#2D160B] text-[#EAD2B6]/40 border-stone-800'
                    }`}
                  >
                    {isLast ? (
                      <Gift className={`h-5 w-5 ${isFilled ? 'text-stone-900 animate-spin' : ''}`} />
                    ) : (
                      <Coffee className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-[10px] font-black mt-1.5 text-stone-400 block tracking-tight">
                    {cupNumber === totalRequired ? 'FREE!' : `${cupNumber}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Text descriptions and claims */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/5">
          <div className="text-left text-xs font-bold text-amber-500 tracking-wider uppercase">
            🚀 {pointsLabel}
          </div>

          {cupsCount >= totalRequired && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <span className="text-[11px] text-stone-300 max-w-xs text-left italic">
                {t.freeDrinkInstruction}
              </span>
              <button
                onClick={handleClaimReward}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:brightness-110 active:scale-[0.98] px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all border border-emerald-400"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{t.claimFreeDrink}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
