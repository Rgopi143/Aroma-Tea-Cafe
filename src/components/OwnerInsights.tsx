import React, { useState, useEffect } from 'react';
import { Coins, GraduationCap, Briefcase, Heart, Users, TrendingUp, Sparkles, Award, PlusCircle, CheckCircle, Smartphone, ClipboardList, Clock, Truck } from 'lucide-react';
import { CUSTOMER_SEGMENTS, CAFE_INSIGHTS, SAMPLE_REVIEWS, OWNER_DETAILS } from '../data';
import { CafeOrder } from '../types';

export default function OwnerInsights() {
  // Simulator State variables for Ch. Pawan Kumar to test strategies
  const [dailyVisitors, setDailyVisitors] = useState<number>(280);
  const [percentBuyingSnacks, setPercentBuyingSnacks] = useState<number>(35);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [liveOrders, setLiveOrders] = useState<CafeOrder[]>([]);

  // Load live orders on mount to display real-time statistics
  useEffect(() => {
    try {
      const saved = localStorage.getItem('py_aromaa_orders');
      if (saved) {
        setLiveOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load live orders for owner insights', e);
    }
  }, []);

  // Real-time sales statistics from checkout order items
  const completedOrders = liveOrders.filter(o => o.status === 'Delivered');
  const totalLiveSales = completedOrders.reduce((sum, o) => sum + o.subtotal, 0);
  const activeOrdersCount = liveOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  // Math simulation for target metric insights
  const avgBeveragePrice = 35; // average over entire menu
  const avgSnackPrice = 23; // average over available snacks
  
  // Calculate average ticket price based on user inputs
  const simulatedAvgTicket = avgBeveragePrice + (avgSnackPrice * (percentBuyingSnacks / 100));
  const dailyRevenue = dailyVisitors * simulatedAvgTicket;
  const monthlyRevenue = dailyRevenue * 30;

  // Render Audience Segment Icons
  const getSegmentIcon = (name: string, size = 20) => {
    switch (name) {
      case 'College Students':
        return <GraduationCap size={size} className="text-emerald-400" />;
      case 'Office Employees':
        return <Briefcase size={size} className="text-sky-400" />;
      case 'Tea Enthusiasts & Purists':
        return <Heart size={size} className="text-red-400" />;
      default:
        return <Users size={size} className="text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8 text-[#F9E8D2]">
      {/* Intro branding plaque */}
      <div className="rounded-2xl bg-gradient-to-br from-[#2F1A0E] to-[#1C0F08] p-6 border-2 border-[#D4AF37] shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 font-serif text-8xl font-black select-none pointer-events-none text-amber-500">
          OWNER
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 rounded bg-[#D4AF37]/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">
              <Award className="h-3.5 w-3.5" /> Management Dashboard
            </span>
            <h2 className="text-2xl font-serif font-black tracking-tight text-white sm:text-3xl">
              Hello, <span className="text-[#D4AF37]">{OWNER_DETAILS.name}</span>!
            </h2>
            <p className="text-sm text-[#EAD2B6]/70 max-w-xl">
              Optimize menu visibility, simulate cross-selling strategies, and understand your customers to grow average ticket size and profitability.
            </p>
          </div>

          <div className="rounded-xl bg-black/40 p-3.5 border border-[#D4AF37]/10 text-center flex-shrink-0">
            <span className="text-xs text-stone-400 uppercase tracking-widest block font-bold">
              Current UPI Active Payee
            </span>
            <span className="text-sm font-black text-white block mt-0.5">
              {OWNER_DETAILS.upiId}
            </span>
            <span className="inline-block rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 mt-1 border border-emerald-500/20">
              ● Active Receiving
            </span>
          </div>
        </div>
      </div>

      {/* Target Audiences Bento Blocks */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-serif font-black text-[#D4AF37] tracking-wider uppercase">
            👥 Target Audience Breakdown
          </h3>
          <p className="text-xs text-[#EAD2B6]/60 mt-0.5">
            Identify key user personas visiting Py's Aromaa Cafe and their favorite drinks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CUSTOMER_SEGMENTS.map((segment) => (
            <div
              key={segment.name}
              className="rounded-xl bg-[#211209] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 p-5 flex flex-col justify-between gap-4 transition-all hover:scale-[1.01]"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-black/40 p-2 border border-[#D4AF37]/15">
                    {getSegmentIcon(segment.name, 22)}
                  </div>
                  <h4 className="text-base font-black text-white leading-tight">
                    {segment.name}
                  </h4>
                </div>
                <p className="text-xs text-[#EAD2B6]/70 leading-relaxed">
                  {segment.description}
                </p>
              </div>

              <div className="border-t border-[#D4AF37]/10 pt-3.5 mt-2 space-y-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-stone-400 block">
                    Sip Preferences
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {segment.preferredDrinks.map((drink, idx) => (
                      <span
                        key={idx}
                        className="inline-block rounded bg-stone-900/90 text-[10px] font-semibold text-[#EAD2B6]/90 px-1.5 py-0.5 border border-stone-800"
                      >
                        {drink}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-1.5 border-t border-stone-900/50">
                  <span className="text-stone-400">Peak Hour:</span>
                  <span className="text-white">{segment.timing}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-stone-400">Est. Spend:</span>
                  <span className="text-[#D4AF37]">{segment.averageSpend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Ticket Size Simulator */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Simulator controls */}
        <div className="rounded-2xl bg-gradient-to-br from-[#2C160B] to-[#170C05] p-6 border-2 border-amber-900/40 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black text-amber-500 uppercase tracking-widest block">
              Strategy Playground
            </span>
            <h3 className="text-xl font-serif font-black text-white">
              Revenue & Ticket Simulator
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Drag parameters to calculate how increasing snack attach rate affects Py's Aromaa daily margins and monthly revenue goals!
            </p>
          </div>

          {/* Slider 1: Daily Visitors */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-white">Daily Visitors Count</span>
              <span className="text-[#D4AF37] bg-black/40 px-2.5 py-0.5 rounded border border-amber-900/35">
                {dailyVisitors} customers
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="600"
              step="10"
              value={dailyVisitors}
              onChange={(e) => setDailyVisitors(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#170B05] rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-stone-500">
              <span>50 (Slow Day)</span>
              <span>280 (Average)</span>
              <span>600 (High Footfall)</span>
            </div>
          </div>

          {/* Slider 2: Snack Attach Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-white">Snack Attach Rate (%)</span>
              <span className="text-[#D4AF37] bg-black/40 px-2.5 py-0.5 rounded border border-amber-900/35">
                {percentBuyingSnacks}% of users
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="95"
              step="5"
              value={percentBuyingSnacks}
              onChange={(e) => setPercentBuyingSnacks(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#170B05] rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-stone-500">
              <span>5% (Drinks Only)</span>
              <span>35% (Current)</span>
              <span>95% (Perfect Pairing)</span>
            </div>
          </div>

          {/* Educational Insights Box */}
          <div className="rounded-xl bg-amber-950/20 border border-amber-900/30 p-3.5 text-xs text-amber-100/80 leading-relaxed">
            📢 <strong>Pawan's Playbook:</strong> College students have a lower budget (₹40–₹60), but pairing <strong>Osmania Biscuits (₹10)</strong> with <strong>Traditional Tea (₹12)</strong> is a quick sell. For high-spend families, push <strong>Mojitos (₹59)</strong> alongside <strong>Paneer Puffs (₹30)</strong> for an ₹89 ticket size!
          </div>
        </div>

        {/* Simulator Outputs */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1C0F08] to-[#0A0502] p-6 border-2 border-[#D4AF37]/30 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-black text-stone-400 uppercase tracking-widest">
              Simulated Financial Performance
            </h3>

            {/* Metrics list */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-black/40 p-4 border border-stone-800">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Simulated Ticket Avg
                </span>
                <span className="text-2xl font-black text-[#D4AF37] block mt-1">
                  ₹{simulatedAvgTicket.toFixed(2)}
                </span>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Current: ₹62.50
                </span>
              </div>

              <div className="rounded-xl bg-black/40 p-4 border border-stone-800">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Daily Revenue
                </span>
                <span className="text-2xl font-black text-emerald-400 block mt-1">
                  ₹{dailyRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Estimated Gross
                </span>
              </div>
            </div>

            {/* Real Counter Live Performance telemetry */}
            <div className="bg-amber-950/25 rounded-xl border border-[#D4AF37]/20 p-4 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#D4AF37] block">
                ⚡ LIVE SESSION METRICS (FROM ACTIVE checkouts)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/60 p-3 rounded-lg border border-stone-800">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tight block">
                    Live Completed Sales
                  </span>
                  <span className="text-xl font-black text-emerald-400 block mt-0.5">
                    ₹{totalLiveSales.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-stone-500">
                    From {completedOrders.length} completed tickets
                  </span>
                </div>
                <div className="bg-black/60 p-3 rounded-lg border border-stone-800">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tight block">
                    Active Kitchen Queue
                  </span>
                  <span className="text-xl font-black text-yellow-400 block mt-0.5 animate-pulse">
                    {activeOrdersCount} orders
                  </span>
                  <span className="text-[9px] text-stone-500">
                    Pending prep or transit
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-black/40 p-4 border border-stone-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Monthly Gross Revenue
                </span>
                <span className="text-3xl font-serif font-black text-white mt-1 block">
                  ₹{monthlyRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block rounded bg-emerald-950 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  Target Met
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800/80 pt-4 mt-6">
            <div className="flex items-center gap-1.5 text-xs text-amber-500">
              <TrendingUp className="h-4 w-4 animate-bounce" />
              <span>Mojitos are high profit. Highlight them in summer!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Feedbacks panel */}
      <div className="rounded-2xl bg-gradient-to-br from-[#211209] to-[#1C0F08] p-6 border border-[#D4AF37]/20 shadow-xl space-y-4">
        <div>
          <h3 className="text-lg font-serif font-black text-[#D4AF37] tracking-wider uppercase">
            💌 Voice of the Customer
          </h3>
          <p className="text-xs text-[#EAD2B6]/60 mt-0.5">
            Real feedback collected via Py's digital app review system.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {SAMPLE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-xl bg-black/30 p-4 border border-amber-900/10 space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-white">
                  {review.name}
                </span>
                <span className="text-xs text-stone-500">
                  {review.date}
                </span>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-[#D4AF37] text-sm">★</span>
                ))}
              </div>

              <p className="text-xs text-[#EAD2B6]/80 leading-relaxed italic">
                "{review.review}"
              </p>

              <div className="flex items-center gap-1 bg-amber-900/20 border border-amber-800/10 rounded px-2 py-0.5 text-[10px] font-semibold text-[#D4AF37] w-fit">
                <span>Ordered:</span>
                <strong>{review.itemApproved}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
