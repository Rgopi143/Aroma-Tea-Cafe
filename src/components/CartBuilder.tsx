import React from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, Check, Award, QrCode, Sparkles, MessageSquare, Heart, Clock, RefreshCw, Coffee, Truck, AlertCircle } from 'lucide-react';
import { MenuItem, CartItem, SnackOption, CafeOrder, OrderStatus } from '../types';
import { SNACK_OPTIONS, OWNER_DETAILS } from '../data';
import { Language, TRANSLATIONS } from '../i18n';
import vintageReceiptImg from '../assets/images/vintage_receipt_1782328783632.jpg';

interface CartBuilderProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCustomizeItem: (id: string, updates: Partial<CartItem>) => void;
  language: Language;
  cartShakeTrigger?: number;
  onTriggerCartShake?: () => void;
}

export default function CartBuilder({
  cart,
  setCart,
  onUpdateQuantity,
  onRemoveItem,
  onCustomizeItem,
  language,
  cartShakeTrigger,
  onTriggerCartShake,
}: CartBuilderProps) {
  const t = TRANSLATIONS[language];
  const [checkoutStep, setCheckoutStep] = React.useState<'cart' | 'checkout' | 'success'>('cart');
  const [tokenNumber, setTokenNumber] = React.useState<number>(0);
  const [feedbackText, setFeedbackText] = React.useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);

  // Delivery & Customer inputs
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [orderType, setOrderType] = React.useState<'Pickup' | 'Local Delivery'>('Pickup');
  const [deliveryAddress, setDeliveryAddress] = React.useState('');
  const [specialNotes, setSpecialNotes] = React.useState('');
  
  const [activeOrderId, setActiveOrderId] = React.useState<string | null>(null);
  const [activeOrder, setActiveOrder] = React.useState<CafeOrder | null>(null);

  // Poll for live status updates from the cafeteria admin
  React.useEffect(() => {
    if (!activeOrderId || checkoutStep !== 'success') return;

    const interval = setInterval(() => {
      try {
        const existing = localStorage.getItem('py_aromaa_orders');
        if (existing) {
          const orders: CafeOrder[] = JSON.parse(existing);
          const found = orders.find(o => o.id === activeOrderId);
          if (found) {
            setActiveOrder(found);
          }
        }
      } catch (e) {
        console.error('Error polling order status:', e);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeOrderId, checkoutStep]);

  const [recentOrders, setRecentOrders] = React.useState<{
    id: string;
    items: CartItem[];
    total: number;
    createdAt: string;
    dateStr: string;
  }[]>(() => {
    try {
      const saved = localStorage.getItem('py_aromaa_recent_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Totals calculations
  const calculateItemTotal = (item: CartItem) => {
    const basePrice = item.menuItem.price;
    const snackPrice = item.selectedSnack ? item.selectedSnack.price : 0;
    return (basePrice + snackPrice) * item.quantity;
  };

  const subtotal = cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  
  // Calculate average ticket size metrics
  const avgTicketSize = cart.length > 0 ? (subtotal / cart.reduce((acc, i) => acc + i.quantity, 0)) : 0;

  // Calculate estimated wait time based on the number of items currently in the cart
  const totalBeveragesCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalSnacksCount = cart.reduce((acc, item) => acc + (item.selectedSnack ? item.quantity : 0), 0);
  const totalItemsCount = totalBeveragesCount + totalSnacksCount;
  const estimatedWaitTime = totalItemsCount > 0 ? (5 + (totalItemsCount * 2)) : 0;

  const handlePlaceOrder = () => {
    const randomToken = Math.floor(Math.random() * 90) + 10;
    setTokenNumber(randomToken);
    setCheckoutStep('checkout');
  };

  const handleConfirmPayment = () => {
    const finalToken = tokenNumber || Math.floor(Math.random() * 90) + 10;
    const newOrderId = `ord-${Date.now()}`;
    
    const newOrder: CafeOrder = {
      id: newOrderId,
      tokenNumber: finalToken,
      items: cart,
      subtotal: subtotal,
      customerName: customerName.trim() || 'Cozy Guest',
      customerPhone: customerPhone.trim() || '9999999999',
      deliveryAddress: orderType === 'Local Delivery' ? (deliveryAddress.trim() || 'Main Counter') : undefined,
      orderType: orderType,
      status: 'Received',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: specialNotes.trim() || undefined
    };

    try {
      setActiveOrderId(newOrderId);
      setActiveOrder(newOrder);
      const existing = localStorage.getItem('py_aromaa_orders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(newOrder); // Add as newest first
      localStorage.setItem('py_aromaa_orders', JSON.stringify(orders));

      // Save last 3 completed orders for Quick Re-order
      const recentExisting = localStorage.getItem('py_aromaa_recent_orders');
      const recentOrdersList = recentExisting ? JSON.parse(recentExisting) : [];
      const newRecentOrder = {
        id: `recent-${Date.now()}`,
        items: cart,
        total: subtotal,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dateStr: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
      };
      recentOrdersList.unshift(newRecentOrder);
      const updatedRecentOrders = recentOrdersList.slice(0, 3);
      localStorage.setItem('py_aromaa_recent_orders', JSON.stringify(updatedRecentOrders));
      setRecentOrders(updatedRecentOrders);

      // Auto-accumulate Loyalty Program points/cups
      const savedCups = localStorage.getItem('py_aromaa_loyalty_cups');
      const currentCups = savedCups ? parseInt(savedCups, 10) : 0;
      const beverageCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem('py_aromaa_loyalty_cups', (currentCups + beverageCount).toString());

      // Increment simulated weekly order count
      const savedWeeklyOrders = localStorage.getItem('py_aromaa_weekly_orders');
      const currentWeeklyOrders = savedWeeklyOrders ? parseInt(savedWeeklyOrders, 10) : 0;
      localStorage.setItem('py_aromaa_weekly_orders', (currentWeeklyOrders + 1).toString());

      window.dispatchEvent(new Event('py_aromaa_order_placed'));

      // Trigger subtle celebratory confetti animation
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#EAD2B6', '#F59E0B', '#1F1008', '#F9E8D2'],
        disableForReducedMotion: true
      });
    } catch (e) {
      console.error('Failed to save order to queue or update loyalty:', e);
    }

    setCheckoutStep('success');
  };

  const handleReset = () => {
    setCart([]);
    setCheckoutStep('cart');
    setFeedbackText('');
    setFeedbackSubmitted(false);
    setCustomerName('');
    setCustomerPhone('');
    setOrderType('Pickup');
    setDeliveryAddress('');
    setSpecialNotes('');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      setFeedbackSubmitted(true);
    }
  };

  // Construct a standard UPI URI for QR Simulation
  // upi://pay?pa=9392737210@ybl&pn=Pys%20Aromaa%20Cafe&am=75.00&cu=INR&tn=Order%20Token%20Py%20Aromaa
  const upiUrl = `upi://pay?pa=${OWNER_DETAILS.phone}@ybl&pn=Pys%20Aromaa%20Cafe&am=${subtotal.toFixed(2)}&cu=INR&tn=Aromaa%20Cafe%20Order`;

  return (
    <motion.div
      key={`cart-builder-${cartShakeTrigger || 0}`}
      animate={cartShakeTrigger && cartShakeTrigger > 0 ? {
        x: [0, -6, 6, -6, 6, -3, 3, 0],
        rotate: [0, -1, 1, -1, 1, -0.5, 0.5, 0]
      } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative w-full overflow-hidden rounded-3xl bg-radial from-[#F5E6D3] to-[#E5D4BF] text-[#2C160B] border-4 border-[#D4AF37] shadow-2xl"
    >
      {/* Vintage Receipt rustic paper background texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.28] pointer-events-none mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url(${vintageReceiptImg})` }}
      />

      {/* Wooden Header Bar */}
      <div className="bg-[#2C160B] text-[#F9E8D2] px-6 py-4 flex items-center justify-between border-b-2 border-[#D4AF37]">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-[#D4AF37]" />
          <span className="font-serif font-black tracking-widest text-sm sm:text-base uppercase">
            PY'S COZY CART RECEIPT
          </span>
        </div>
        {cart.length > 0 && (
          <button
            onClick={() => setCart([])}
            className="text-xs font-bold text-amber-500 hover:underline cursor-pointer flex items-center gap-1"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="p-6">
        {checkoutStep === 'cart' && (
          <div className="space-y-6">
            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#2C160B]/10 flex items-center justify-center border-2 border-dashed border-[#2C160B]/20">
                  <ShoppingBag className="h-8 w-8 text-[#2C160B]/40" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#2C160B]">{t.yourCart}</h3>
                  <p className="text-sm text-[#2C160B]/70 max-w-xs mx-auto mt-1">
                    {t.cartEmpty}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-4 divide-y divide-[#2C160B]/10 max-h-[400px] overflow-y-auto pr-2">
                  {cart.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`pt-4 ${idx === 0 ? 'pt-0' : ''} space-y-3`}
                    >
                      {/* Item Row */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-lg font-black tracking-tight leading-none text-[#1F1008]">
                              {item.menuItem.name}
                            </span>
                            {item.menuItem.isBestseller && (
                              <span className="rounded bg-amber-800 text-[9px] font-black text-white px-1.5 py-0.5 uppercase tracking-wider">
                                Bestseller
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-[#2C160B]/60 uppercase block">
                            Base: ₹{item.menuItem.price} Each
                          </span>
                        </div>

                        {/* Price Display */}
                        <div className="text-right">
                          <span className="text-xl font-black text-[#1F1008] block">
                            ₹{calculateItemTotal(item)}
                          </span>
                        </div>
                      </div>

                      {/* Customizers - Sweetness & Temperature */}
                      <div className="grid grid-cols-2 gap-2 bg-[#2C160B]/5 p-2.5 rounded-xl border border-[#2C160B]/10">
                        {/* Sweetness Selector */}
                        <div>
                          <label className="text-[10px] font-black uppercase text-[#2C160B]/60 block mb-1">
                            {t.sweetness}
                          </label>
                          <select
                            value={item.sweetness}
                            onChange={(e) => onCustomizeItem(item.id, { sweetness: e.target.value as any })}
                            className="w-full text-xs font-bold bg-white/80 border border-[#2C160B]/20 rounded px-1.5 py-1 text-[#2C160B] focus:ring-1 focus:ring-amber-800"
                          >
                            <option value="Normal">{t.sweetnessNormal}</option>
                            <option value="Less">{t.sweetnessLess}</option>
                            <option value="No Sugar">{t.sweetnessNone}</option>
                            <option value="Bellam (Jaggery)">{t.sweetnessBellam}</option>
                          </select>
                        </div>

                        {/* Temp Selector */}
                        <div>
                          <label className="text-[10px] font-black uppercase text-[#2C160B]/60 block mb-1">
                            {t.temperature}
                          </label>
                          <select
                            value={item.temperature}
                            onChange={(e) => onCustomizeItem(item.id, { temperature: e.target.value as any })}
                            className="w-full text-xs font-bold bg-white/80 border border-[#2C160B]/20 rounded px-1.5 py-1 text-[#2C160B] focus:ring-1 focus:ring-amber-800"
                          >
                            <option value="Hot">{t.tempHot}</option>
                            <option value="Iced">{t.tempIced}</option>
                            <option value="Normal">Normal Room</option>
                          </select>
                        </div>
                      </div>

                      {/* Cross Selling Snack Builder - Solves "Prices Blend / Average Ticket Simulator" */}
                      <div className="space-y-1.5 pt-1">
                        <label className="text-[11px] font-black uppercase tracking-wider text-[#2C160B] block">
                          🥐 Pair with a Delicious Snack (Increases Ticket Size)
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {SNACK_OPTIONS.slice(1).map((snack) => {
                            const isSelected = item.selectedSnack?.id === snack.id;
                            return (
                              <button
                                key={snack.id}
                                onClick={() => {
                                  onCustomizeItem(item.id, {
                                    selectedSnack: isSelected ? undefined : snack
                                  });
                                }}
                                className={`text-left p-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#2C160B] text-white border-[#D4AF37] ring-1 ring-[#D4AF37]/50'
                                    : 'bg-white/45 text-[#2C160B]/80 hover:bg-white/85 border-[#2C160B]/10 shadow-sm'
                                }`}
                              >
                                {snack.image && (
                                  <img
                                    src={snack.image}
                                    alt={snack.name}
                                    className="h-10 w-10 object-cover rounded-lg border border-[#2C160B]/10 flex-shrink-0"
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="line-clamp-1 text-[10px] leading-tight font-black">{snack.name}</p>
                                  <p className={`text-[10px] mt-0.5 font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-amber-800'}`}>
                                    +₹{snack.price}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Quantity & Delete Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 border border-[#2C160B]/25 rounded-lg bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 px-2.5 hover:bg-[#2C160B]/10 text-stone-700 font-extrabold"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-3 text-sm font-black text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 px-2.5 hover:bg-[#2C160B]/10 text-stone-700 font-extrabold"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-700 hover:text-red-900 flex items-center gap-1 text-xs font-black uppercase cursor-pointer"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal block & Ticket metrics */}
                <div className="border-t-2 border-[#2C160B]/15 pt-4 space-y-4">
                  {/* Interactive Analytics showing Average Ticket size simulator */}
                  <div className="bg-amber-950/5 rounded-xl border border-amber-900/10 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                        Average Item Value in Cart
                      </span>
                      <span className="text-xs font-black text-white bg-amber-800 rounded px-2 py-0.5">
                        ₹{avgTicketSize.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-amber-950/80 leading-relaxed">
                      💡 <strong>Business Insight:</strong> When you pair a beverage with a snack (e.g., Samosa/Bun Maska), you elevate the ticket size from ~₹20 to <strong>₹50+</strong>, driving a 150% boost in transaction profitability!
                    </p>
                  </div>

                  {/* Estimated Wait Time block */}
                  <div className="bg-[#2C160B]/5 rounded-xl border border-[#2C160B]/10 p-3.5 flex items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-amber-900/10 border border-amber-900/20">
                        <Clock className="h-5 w-5 text-amber-800 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-[#2C160B] block leading-none">
                          Estimated Wait Time
                        </span>
                        <span className="text-[10px] text-[#2C160B]/70 block mt-1 font-medium">
                          Freshly prepared & hand-crafted
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-[#1F1008] block leading-none">
                        ~{estimatedWaitTime} mins
                      </span>
                      <span className="text-[10px] text-[#2C160B]/60 block mt-1 font-bold">
                        {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} total
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold font-serif uppercase tracking-tight text-[#2C160B]">
                      Subtotal
                    </span>
                    <span className="text-3xl font-black text-[#1F1008]">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Place simulated order */}
                  <button
                    id="btn-place-order"
                    onClick={handlePlaceOrder}
                    className="w-full rounded-xl bg-[#2C160B] text-[#F9E8D2] hover:bg-[#1E0E06] active:scale-[0.98] py-4 text-base font-serif font-black tracking-widest uppercase shadow-xl transition-all border-2 border-[#D4AF37]"
                  >
                    {t.payScanConfirm}
                  </button>
                </div>
              </>
            )}

            {/* Recent Orders Section */}
            <div className="mt-4 pt-6 border-t border-[#2C160B]/15 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#2C160B]/80 flex items-center gap-1.5">
                  <Clock size={13} className="text-[#D4AF37]" />
                  {t.recentOrders}
                </h4>
                {recentOrders.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm(language === 'te' ? 'ఇటీవలి ఆర్డర్ల హిస్టరీని క్లియర్ చేయాలనుకుంటున్నారా?' : language === 'hi' ? 'क्या आप हाल ही के ऑर्डर इतिहास को मिटाना चाहते हैं?' : 'Clear recent order history?')) {
                        localStorage.removeItem('py_aromaa_recent_orders');
                        setRecentOrders([]);
                      }
                    }}
                    className="text-[10px] font-black text-red-700 hover:underline cursor-pointer"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {recentOrders.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#2C160B]/5 border border-[#2C160B]/10 text-center text-xs text-[#2C160B]/60 italic">
                  {t.noRecentOrders}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-3.5 rounded-xl bg-white/60 hover:bg-white/90 border border-[#2C160B]/15 hover:border-[#D4AF37]/50 transition-all space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-[#2C160B]/60">
                          {t.orderedOn} {order.dateStr || ''} @ {order.createdAt}
                        </span>
                        <span className="font-black text-[#1F1008] bg-[#D4AF37]/25 px-2 py-0.5 rounded border border-[#D4AF37]/40">
                          ₹{order.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Items list */}
                      <div className="space-y-1">
                        {order.items.map((item, i) => (
                          <div key={i} className="text-xs flex items-center justify-between text-[#2C160B]/85">
                            <span className="font-bold line-clamp-1">
                              • {item.menuItem.name} 
                              <span className="text-[10px] text-stone-500 font-medium ml-1">
                                ({item.sweetness}, {item.temperature}
                                {item.selectedSnack ? `, +${item.selectedSnack.name}` : ''})
                              </span>
                            </span>
                            <span className="font-black text-stone-700 ml-2">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action trigger button */}
                      <button
                        onClick={() => {
                          const newItems = order.items.map(item => ({
                            ...item,
                            id: `${item.menuItem.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                          }));
                          setCart(prev => [...prev, ...newItems]);
                          onTriggerCartShake?.();
                        }}
                        className="w-full flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-[#2C160B] hover:bg-[#1E0E06] active:scale-[0.98] text-white text-[11px] font-black uppercase tracking-wider transition-all border border-[#D4AF37]/35 cursor-pointer"
                      >
                        <RefreshCw size={11} className="animate-spin [animation-duration:6s]" />
                        <span>{t.reorderAll}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {checkoutStep === 'checkout' && (
          <div className="space-y-6 text-center">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 rounded bg-[#D4AF37]/20 px-3 py-1 text-xs font-black uppercase text-amber-900 border border-[#D4AF37]/40">
                Token Pending Payment
              </span>
              <h3 className="text-2xl font-serif font-black text-[#1F1008] mt-2">
                Scan UPI QR to Confirm
              </h3>
              <p className="text-sm text-[#2C160B]/70 max-w-sm mx-auto">
                Please scan and pay the exact bill of <strong>₹{subtotal.toFixed(2)}</strong> to Ch. Pawan Kumar.
              </p>
            </div>

            {/* Customer & Delivery Form Info */}
            <div className="bg-white/40 p-4 rounded-xl border border-amber-900/15 text-left space-y-3.5 max-w-md mx-auto">
              <span className="text-xs font-black uppercase text-[#2C160B] block tracking-wider">
                {t.checkoutDetails}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-black uppercase text-stone-600 block mb-0.5">{t.customerName}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Srinivas" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs font-bold rounded bg-white border border-stone-300 p-2 text-stone-950 focus:ring-1 focus:ring-amber-800"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-stone-600 block mb-0.5">{t.phoneNumber}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 9392737210" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs font-bold rounded bg-white border border-stone-300 p-2 text-stone-950 focus:ring-1 focus:ring-amber-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-stone-600 block">{t.orderDeliveryType}</label>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setOrderType('Pickup')}
                    className={`flex-1 text-xs py-2 px-3 rounded font-black border transition-all ${
                      orderType === 'Pickup' 
                        ? 'bg-[#2C160B] text-white border-amber-500 shadow' 
                        : 'bg-white/80 text-stone-700 border-stone-300'
                    }`}
                  >
                    {t.counterPickup}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setOrderType('Local Delivery')}
                    className={`flex-1 text-xs py-2 px-3 rounded font-black border transition-all ${
                      orderType === 'Local Delivery' 
                        ? 'bg-[#2C160B] text-white border-amber-500 shadow' 
                        : 'bg-white/80 text-stone-700 border-stone-300'
                    }`}
                  >
                    {t.localDelivery}
                  </button>
                </div>
              </div>

              {orderType === 'Local Delivery' && (
                <div className="animate-fadeIn">
                  <label className="text-[10px] font-black uppercase text-stone-600 block mb-0.5">{t.deliveryAddress}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Near Main Street, Block 2C, Apt 104" 
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full text-xs font-bold rounded bg-white border border-stone-300 p-2 text-stone-950 focus:ring-1 focus:ring-amber-800"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase text-stone-600 block mb-0.5">{t.specialInstructions}</label>
                <input 
                  type="text" 
                  placeholder="e.g. Extra hot, separate ginger spices..." 
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full text-xs font-bold rounded bg-white border border-stone-300 p-2 text-stone-950 focus:ring-1 focus:ring-amber-800"
                />
              </div>
            </div>

            {/* Simulated UPI QR Code Plate */}
            <div className="mx-auto max-w-[260px] bg-white rounded-2xl border-4 border-[#2C160B] p-4 shadow-xl space-y-3 relative">
              <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 border border-emerald-400">
                <span className="text-emerald-700 text-[10px] font-black">₹</span>
              </div>
              
              {/* Fake visually beautiful QR SVG */}
              <div className="h-44 w-44 mx-auto bg-stone-100 flex items-center justify-center rounded-lg border border-stone-200 relative overflow-hidden">
                {/* Visual patterns to simulate QR code */}
                <div className="absolute inset-4 grid grid-cols-5 gap-1 opacity-90">
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-stone-100"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>

                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-stone-100"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>

                  <div className="bg-stone-100"></div>
                  <div className="bg-stone-100"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>

                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-stone-100"></div>
                  <div className="bg-stone-100"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>

                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                  <div className="bg-stone-100"></div>
                  <div className="bg-[#1F1008] rounded-sm"></div>
                </div>

                {/* Simulated center logo overlay */}
                <div className="absolute bg-[#2C160B] text-white font-serif text-[10px] font-bold p-1 border-2 border-white rounded shadow-md">
                  Aromaa
                </div>
              </div>

              {/* UPI and Payment badges */}
              <div className="space-y-1">
                <span className="text-xs font-black text-[#2C160B] block">
                  UPI ID: {OWNER_DETAILS.phone}@ybl
                </span>
                <span className="text-[10px] font-medium text-stone-500 block">
                  Accepted via GPay, PhonePe, Paytm, BHIM
                </span>
              </div>
            </div>

            {/* Quick Links / Mobile Deeplink Simulation */}
            <div className="space-y-3">
              <a
                href={upiUrl}
                className="inline-flex items-center gap-1.5 rounded bg-emerald-850 text-white px-4 py-2 text-xs font-bold hover:bg-emerald-800 transition-all border border-emerald-500/35"
              >
                <QrCode className="h-3.5 w-3.5" /> Mobile UPI Direct Pay Link
              </a>

              <div className="flex gap-2 justify-center pt-2">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="rounded-lg bg-stone-300 hover:bg-stone-400/80 px-4 py-2.5 text-xs font-bold text-stone-800 border border-stone-400"
                >
                  Back to Edit
                </button>
                <button
                  id="btn-confirm-payment"
                  onClick={handleConfirmPayment}
                  className="rounded-lg bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 px-5 py-2.5 text-xs font-bold text-white border border-[#D4AF37]/35 shadow"
                >
                  I've Paid Successfully!
                </button>
              </div>
            </div>
          </div>
        )}

        {checkoutStep === 'success' && (
          <div className="space-y-6 text-center py-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-800/20 text-emerald-800 flex items-center justify-center border-2 border-emerald-700 animate-pulse">
              <Check className="h-8 w-8 text-emerald-800" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-black text-emerald-950">
                {t.paymentSuccess}
              </h3>
              <p className="text-base text-[#2C160B]/80 max-w-xs mx-auto">
                {t.successSub}
              </p>
            </div>

            {/* Token details badge */}
            <div className="bg-[#2C160B] text-[#F9E8D2] rounded-2xl border-2 border-[#D4AF37] p-5 max-w-sm mx-auto shadow-lg space-y-1">
              <span className="text-xs font-bold tracking-wider text-amber-500 uppercase block">
                {t.tokenAssigned}
              </span>
              <span className="text-4xl font-black block tracking-tight text-white py-1">
                #{tokenNumber}
              </span>
              <span className="text-xs text-stone-400 block pt-1.5 border-t border-stone-800">
                Present this token at Py's counter to pick up your beverages.
              </span>
            </div>

            {/* Live Order Tracker */}
            {activeOrder && (
              <div className="bg-stone-50 rounded-2xl border border-[#2C160B]/10 p-5 max-w-sm mx-auto shadow-sm space-y-4 text-left animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-[#2C160B]/60 tracking-wider flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span> Live Tracker
                  </span>
                  <span className="text-[10px] font-bold text-stone-500 bg-stone-200/50 px-2 py-0.5 rounded-full">
                    {activeOrder.orderType}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-950/5 border border-amber-950/10 flex-shrink-0">
                    {activeOrder.status === 'Received' && <Clock className="h-5 w-5 text-amber-700 animate-pulse" />}
                    {activeOrder.status === 'Preparing' && <Coffee className="h-5 w-5 text-yellow-600 animate-spin" />}
                    {activeOrder.status === 'Ready' && <Sparkles className="h-5 w-5 text-emerald-600 animate-bounce" />}
                    {activeOrder.status === 'Out for Delivery' && <Truck className="h-5 w-5 text-teal-600 animate-pulse" />}
                    {activeOrder.status === 'Delivered' && <Check className="h-5 w-5 text-emerald-600 font-bold" />}
                    {activeOrder.status === 'Cancelled' && <AlertCircle className="h-5 w-5 text-red-600" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1F1008] uppercase tracking-tight">
                      {activeOrder.status === 'Received' && 'Waiting for Cafe Approval'}
                      {activeOrder.status === 'Preparing' && 'Accepted & Brewing'}
                      {activeOrder.status === 'Ready' && (activeOrder.orderType === 'Local Delivery' ? 'Ready for Dispatch' : 'Ready at Counter')}
                      {activeOrder.status === 'Out for Delivery' && 'Out for Delivery'}
                      {activeOrder.status === 'Delivered' && 'Order Completed'}
                      {activeOrder.status === 'Cancelled' && (activeOrder.rejectionReason ? 'Order Rejected' : 'Order Cancelled')}
                    </h4>
                    <p className="text-[10px] text-[#2C160B]/75 mt-0.5 font-bold leading-normal">
                      {activeOrder.status === 'Received' && 'Ch. Pawan Kumar is reviewing your order details.'}
                      {activeOrder.status === 'Preparing' && 'Our kitchen crew is currently preparing your fresh hand-brewed beverages.'}
                      {activeOrder.status === 'Ready' && (activeOrder.orderType === 'Local Delivery' ? 'Your beverages are ready and awaiting a driver.' : 'Your beverages are ready for pickup! Walk to the counter.')}
                      {activeOrder.status === 'Out for Delivery' && `Our delivery partner is currently on their way to: ${activeOrder.deliveryAddress || 'your address'}`}
                      {activeOrder.status === 'Delivered' && 'Thank you for ordering! Enjoy your drinks.'}
                      {activeOrder.status === 'Cancelled' && (activeOrder.rejectionReason ? `Reason: ${activeOrder.rejectionReason}` : 'This order was cancelled by the store.')}
                    </p>
                  </div>
                </div>

                {/* Checklist Completion Status */}
                {activeOrder.status === 'Preparing' && activeOrder.checkedItems && Object.keys(activeOrder.checkedItems).length > 0 && (
                  <div className="bg-emerald-950/5 border border-emerald-500/10 rounded-xl p-2.5 text-[10px] text-[#2C160B]/80 font-semibold space-y-1">
                    <span className="font-bold text-[#1F1008] block text-[9px] uppercase tracking-wider text-emerald-800">
                      Kitchen Preparation Progress:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 bg-stone-300 rounded-full flex-1 overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 transition-all duration-300"
                          style={{
                            width: `${(Object.values(activeOrder.checkedItems).filter(Boolean).length / activeOrder.items.length) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="font-black text-stone-600">
                        {Object.values(activeOrder.checkedItems).filter(Boolean).length}/{activeOrder.items.length} Checked
                      </span>
                    </div>
                  </div>
                )}

                {/* Progress Visual Stepper */}
                {activeOrder.status !== 'Cancelled' && (
                  <div className="pt-2">
                    <div className="relative flex items-center justify-between">
                      {/* Base Track */}
                      <div className="absolute left-1 right-1 top-1/2 h-1 bg-stone-300 -translate-y-1/2 rounded-full z-0"></div>
                      
                      {/* Active Fill Track */}
                      <div 
                        className="absolute left-1 top-1/2 h-1 bg-[#D4AF37] -translate-y-1/2 rounded-full transition-all duration-500 z-0"
                        style={{
                          width: 
                            activeOrder.status === 'Received' ? '15%' :
                            activeOrder.status === 'Preparing' ? '45%' :
                            activeOrder.status === 'Ready' ? '75%' :
                            '96%'
                        }}
                      ></div>

                      {/* Step 1: Placed */}
                      <div className="flex flex-col items-center gap-1 z-10">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          activeOrder.status === 'Received' 
                            ? 'bg-amber-100 border-[#D4AF37] text-amber-800 animate-pulse' 
                            : 'bg-[#D4AF37] border-[#D4AF37] text-[#1F1008]'
                        }`}>
                          ✓
                        </div>
                        <span className="text-[8px] font-black uppercase text-[#2C160B]/60 tracking-wider">Placed</span>
                      </div>

                      {/* Step 2: Brewing */}
                      <div className="flex flex-col items-center gap-1 z-10">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          ['Preparing', 'Ready', 'Out for Delivery', 'Delivered'].includes(activeOrder.status)
                            ? (activeOrder.status === 'Preparing' ? 'bg-amber-100 border-[#D4AF37] text-amber-800 animate-pulse' : 'bg-[#D4AF37] border-[#D4AF37] text-[#1F1008]')
                            : 'bg-white border-stone-300 text-stone-400'
                        }`}>
                          {['Ready', 'Out for Delivery', 'Delivered'].includes(activeOrder.status) ? '✓' : '2'}
                        </div>
                        <span className="text-[8px] font-black uppercase text-[#2C160B]/60 tracking-wider">Brewing</span>
                      </div>

                      {/* Step 3: Ready */}
                      <div className="flex flex-col items-center gap-1 z-10">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          ['Ready', 'Out for Delivery', 'Delivered'].includes(activeOrder.status)
                            ? (activeOrder.status === 'Ready' ? 'bg-amber-100 border-[#D4AF37] text-amber-800 animate-pulse' : 'bg-[#D4AF37] border-[#D4AF37] text-[#1F1008]')
                            : 'bg-white border-stone-300 text-stone-400'
                        }`}>
                          {['Out for Delivery', 'Delivered'].includes(activeOrder.status) ? '✓' : '3'}
                        </div>
                        <span className="text-[8px] font-black uppercase text-[#2C160B]/60 tracking-wider">Ready</span>
                      </div>

                      {/* Step 4: Finished / Dispatched */}
                      <div className="flex flex-col items-center gap-1 z-10">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          ['Out for Delivery', 'Delivered'].includes(activeOrder.status)
                            ? (activeOrder.status === 'Out for Delivery' ? 'bg-amber-100 border-[#D4AF37] text-amber-800 animate-pulse' : 'bg-[#D4AF37] border-[#D4AF37] text-[#1F1008]')
                            : 'bg-white border-stone-300 text-stone-400'
                        }`}>
                          {activeOrder.status === 'Delivered' ? '✓' : '4'}
                        </div>
                        <span className="text-[8px] font-black uppercase text-[#2C160B]/60 tracking-wider">
                          {activeOrder.orderType === 'Local Delivery' ? 'On Way' : 'Done'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Customer Review Form Mockup - Engaging! */}
            <div className="border-t border-[#2C160B]/15 pt-5 text-left max-w-md mx-auto">
              {!feedbackSubmitted ? (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-amber-900" />
                    <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
                      Leave Ch. Pawan Kumar a Review
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="We loved the bellam jaggery coffee! Very sweet and rich..."
                    className="w-full text-sm font-semibold rounded-xl bg-white border border-[#2C160B]/25 p-3 text-[#2C160B] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#2C160B] text-[#F9E8D2] hover:bg-[#1E0E06] py-2 text-xs font-bold"
                  >
                    Submit Feedback
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-950/5 rounded-xl border border-emerald-500/10 p-4 text-center space-y-2">
                  <Heart className="h-5 w-5 text-red-600 animate-bounce mx-auto" />
                  <p className="text-xs font-black text-emerald-950">
                    Feedback received! Pawan Kumar is reading your response.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="text-sm font-black text-amber-900 hover:underline cursor-pointer"
              >
                Order Something Else
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
