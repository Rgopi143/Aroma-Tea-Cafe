import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle2, Phone, Clock, MessageSquare, MapPin, Coffee, ClipboardList, AlertCircle, Play, Sparkles, Navigation, Check, X, Edit2, Save, Undo, Trash2 } from 'lucide-react';
import { CafeOrder, OrderStatus } from '../types';

export default function DeliveryView() {
  const [orders, setOrders] = useState<CafeOrder[]>([]);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'All'>('All');
  
  // Admin operation states
  const [rejectingOrderId, setRejectingOrderId] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>('Kitchen overload / too busy');
  const [customReason, setCustomReason] = useState<string>('');
  
  const [editingNotesOrderId, setEditingNotesOrderId] = useState<string | null>(null);
  const [adminNoteText, setAdminNoteText] = useState<string>('');
  
  const [editingAddressOrderId, setEditingAddressOrderId] = useState<string | null>(null);
  const [addressText, setAddressText] = useState<string>('');

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const saved = localStorage.getItem('py_aromaa_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      } else {
        // Seed 3 realistic orders if empty to demonstrate functionality
        const seedOrders: CafeOrder[] = [
          {
            id: 'ord-seed-1',
            tokenNumber: 42,
            items: [
              {
                id: 'cl-1',
                menuItem: {
                  id: 'special-1',
                  name: 'Special Bellam Tea',
                  price: 25,
                  category: 'specials',
                  description: 'Our top recommendation: Hand-brewed strong tea sweetened purely with rich local Jaggery.',
                  image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400'
                },
                quantity: 2,
                sweetness: 'Bellam (Jaggery)',
                temperature: 'Hot',
                selectedSnack: {
                  id: 'snack-samosa',
                  name: 'Hot Vegetable Samosa (1 Pc)',
                  price: 20,
                  description: 'Crispy pastry sheet stuffed with spiced potatoes and peas'
                }
              }
            ],
            subtotal: 90,
            customerName: 'Nikhitha Reddy',
            customerPhone: '9848529320',
            orderType: 'Pickup',
            status: 'Preparing',
            createdAt: '10:15 AM',
            notes: 'Send hot and pack samosas separately'
          },
          {
            id: 'ord-seed-2',
            tokenNumber: 57,
            items: [
              {
                id: 'cl-2',
                menuItem: {
                  id: 'cooler-5',
                  name: 'Mango Mint Mojito',
                  price: 59,
                  category: 'coolers',
                  description: 'Tropical rich mango nectar paired with fresh lime juice, muddled mint, and sparkling water.',
                  image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400'
                },
                quantity: 1,
                sweetness: 'Normal',
                temperature: 'Iced',
              },
              {
                id: 'cl-3',
                menuItem: {
                  id: 'coffee-2',
                  name: 'Classic Coffee',
                  price: 25,
                  category: 'coffee',
                  description: 'Rich, frothy South Indian style filter coffee with creamy milk.',
                  image: '/src/assets/images/filter_coffee_1782320718674.jpg'
                },
                quantity: 1,
                sweetness: 'Normal',
                temperature: 'Hot',
                selectedSnack: {
                  id: 'snack-bunmaska',
                  name: 'Bun Maska',
                  price: 30,
                  description: 'Soft fruit bun sliced and generously slathered with butter'
                }
              }
            ],
            subtotal: 114,
            customerName: 'Anil Kumar',
            customerPhone: '9392737210',
            deliveryAddress: 'Green Towers, Flat 302, 3rd Floor',
            orderType: 'Local Delivery',
            status: 'Received',
            createdAt: '10:22 AM',
            notes: 'Extra butter on Bun Maska please!'
          },
          {
            id: 'ord-seed-3',
            tokenNumber: 19,
            items: [
              {
                id: 'cl-4',
                menuItem: {
                  id: 'tea-3',
                  name: 'Ginger Tea',
                  price: 20,
                  category: 'tea',
                  description: 'Aromatic tea crushed with fresh organic ginger root.',
                  image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400'
                },
                quantity: 3,
                sweetness: 'Less',
                temperature: 'Hot',
                selectedSnack: {
                  id: 'snack-osmania',
                  name: 'Osmania Biscuits (Set of 2)',
                  price: 10,
                  description: 'Traditional salty-sweet biscuits, perfect for dipping'
                }
              }
            ],
            subtotal: 90,
            customerName: 'Vikram Singh',
            customerPhone: '9440539111',
            orderType: 'Pickup',
            status: 'Ready',
            createdAt: '10:02 AM'
          }
        ];
        localStorage.setItem('py_aromaa_orders', JSON.stringify(seedOrders));
        setOrders(seedOrders);
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  };

  useEffect(() => {
    loadOrders();
    // Poll every 5 seconds for newly placed customer orders
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update specific order status
  const handleUpdateStatus = (orderId: string, nextStatus: OrderStatus) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: nextStatus };
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem('py_aromaa_orders', JSON.stringify(updated));
  };

  // Toggle item prepared state
  const handleToggleItemCheck = (orderId: string, itemId: string) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        const checkedItems = { ...(order.checkedItems || {}) };
        checkedItems[itemId] = !checkedItems[itemId];
        return { ...order, checkedItems };
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem('py_aromaa_orders', JSON.stringify(updated));
  };

  // Reject order helper
  const handleRejectOrder = (orderId: string, reason: string) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return { 
          ...order, 
          status: 'Cancelled' as OrderStatus, 
          rejectionReason: reason 
        };
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem('py_aromaa_orders', JSON.stringify(updated));
    setRejectingOrderId(null);
    setSelectedReason('Kitchen overload / too busy');
    setCustomReason('');
  };

  // Save admin notes helper
  const handleSaveAdminNote = (orderId: string, note: string) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, adminNotes: note };
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem('py_aromaa_orders', JSON.stringify(updated));
    setEditingNotesOrderId(null);
  };

  // Toggle order type helper
  const handleToggleOrderType = (orderId: string) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        const nextType = order.orderType === 'Pickup' ? 'Local Delivery' : 'Pickup';
        return { 
          ...order, 
          orderType: nextType as 'Pickup' | 'Local Delivery',
          deliveryAddress: nextType === 'Local Delivery' ? (order.deliveryAddress || 'Customer Waiting Table') : undefined
        };
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem('py_aromaa_orders', JSON.stringify(updated));
  };

  // Update delivery address helper
  const handleUpdateDeliveryAddress = (orderId: string, address: string) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, deliveryAddress: address };
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem('py_aromaa_orders', JSON.stringify(updated));
    setEditingAddressOrderId(null);
  };

  // Cancel order helper
  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      handleUpdateStatus(orderId, 'Cancelled');
    }
  };

  // Delete/Clear completed orders
  const handleClearCompleted = () => {
    if (window.confirm('Clear all delivered/cancelled orders from the display?')) {
      const active = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
      setOrders(active);
      localStorage.setItem('py_aromaa_orders', JSON.stringify(active));
    }
  };

  // Get filtered counts
  const countByStatus = (status: OrderStatus) => orders.filter(o => o.status === status).length;

  const filteredOrders = filterStatus === 'All'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Visual Stats Banner */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        {/* Received */}
        <div className="rounded-xl bg-amber-950/40 border border-amber-500/20 p-4 text-center space-y-1 shadow-md">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Incoming (Received)</span>
          <div className="text-2xl font-black text-white">{countByStatus('Received')}</div>
        </div>
        {/* Preparing */}
        <div className="rounded-xl bg-amber-950/40 border border-amber-500/20 p-4 text-center space-y-1 shadow-md">
          <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400">In Kitchen (Preparing)</span>
          <div className="text-2xl font-black text-white animate-pulse">{countByStatus('Preparing')}</div>
        </div>
        {/* Ready */}
        <div className="rounded-xl bg-emerald-950/40 border border-emerald-500/20 p-4 text-center space-y-1 shadow-md">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Ready at Counter</span>
          <div className="text-2xl font-black text-white">{countByStatus('Ready')}</div>
        </div>
        {/* Out for Delivery */}
        <div className="rounded-xl bg-teal-950/40 border border-teal-500/20 p-4 text-center space-y-1 shadow-md">
          <span className="text-[10px] font-black uppercase tracking-wider text-teal-400">Out for Delivery</span>
          <div className="text-2xl font-black text-white">{countByStatus('Out for Delivery')}</div>
        </div>
        {/* Delivered */}
        <div className="rounded-xl bg-stone-900/40 border border-stone-800 p-4 text-center space-y-1 shadow-md col-span-2 md:col-span-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Completed (Delivered)</span>
          <div className="text-2xl font-black text-white">{countByStatus('Delivered')}</div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-black/30 border border-stone-800 rounded-2xl p-4 shadow-xl">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-xs font-black uppercase tracking-wider text-[#D4AF37] mr-2">Filter Board:</span>
          {(['All', 'Received', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'] as const).map((status) => {
            const isSelected = filterStatus === status;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white border border-emerald-400 shadow'
                    : 'text-[#EAD2B6]/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {status} {status === 'All' ? `(${orders.length})` : `(${orders.filter(o => o.status === status).length})`}
              </button>
            );
          })}
        </div>

        {/* Clear Actions */}
        <button
          onClick={handleClearCompleted}
          className="rounded-lg bg-stone-800 hover:bg-stone-700 px-4 py-2 text-xs font-black text-stone-300 border border-stone-700 self-start sm:self-center uppercase tracking-wider transition-all"
        >
          Clear Finished Queue
        </button>
      </div>

      {/* Orders grid */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-[#D4AF37]/20 p-12 text-center space-y-4 bg-black/10">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#D4AF37]/5 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-[#D4AF37]/40" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">No Orders on this Board</h4>
            <p className="text-xs text-[#EAD2B6]/50 max-w-sm mx-auto mt-1">
              There are no orders with status "{filterStatus}". Create some custom order items in the Customer Lounge to test.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => {
            // Distinct colored frames per status to enhance readability
            let statusBorderColor = 'border-stone-800';
            let statusBg = 'bg-stone-900/50';
            let statusTagColor = 'bg-stone-800 text-stone-300';
            
            if (order.status === 'Received') {
              statusBorderColor = 'border-amber-500/40';
              statusBg = 'bg-amber-950/10';
              statusTagColor = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
            } else if (order.status === 'Preparing') {
              statusBorderColor = 'border-yellow-500/40 animate-pulse';
              statusBg = 'bg-yellow-950/10';
              statusTagColor = 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
            } else if (order.status === 'Ready') {
              statusBorderColor = 'border-emerald-500/40';
              statusBg = 'bg-emerald-950/10';
              statusTagColor = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
            } else if (order.status === 'Out for Delivery') {
              statusBorderColor = 'border-teal-500/40';
              statusBg = 'bg-teal-950/10';
              statusTagColor = 'bg-teal-500/20 text-teal-400 border border-teal-500/30';
            } else if (order.status === 'Delivered') {
              statusBorderColor = 'border-stone-700/50';
              statusBg = 'bg-black/20';
              statusTagColor = 'bg-stone-800 text-stone-400';
            } else if (order.status === 'Cancelled') {
              statusBorderColor = 'border-red-500/30';
              statusBg = 'bg-red-950/5';
              statusTagColor = 'bg-red-500/20 text-red-400';
            }

            return (
              <div
                key={order.id}
                className={`rounded-2xl border-2 ${statusBorderColor} ${statusBg} p-5 shadow-lg space-y-4 relative flex flex-col justify-between transition-all hover:scale-[1.01]`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-serif font-black text-[#D4AF37]">
                          Token #{order.tokenNumber}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${statusTagColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-400 text-xs font-semibold">
                        <Clock className="h-3 w-3 text-amber-600" />
                        <span>Placed at {order.createdAt}</span>
                        <span className="text-stone-700">•</span>
                        <button
                          onClick={() => handleToggleOrderType(order.id)}
                          className="text-[#D4AF37] hover:text-amber-300 font-black bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/35 text-[10px] flex items-center gap-1 transition-all"
                          title="Click to toggle Pickup / Local Delivery"
                        >
                          🔄 {order.orderType}
                        </button>
                      </div>
                    </div>

                    <span className="text-lg font-black text-white">
                      ₹{order.subtotal}
                    </span>
                  </div>

                  {/* Customer Metadata Block */}
                  <div className="py-3 text-xs space-y-1.5 border-b border-stone-800/50">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span className="flex items-center gap-1 text-stone-300">
                        👤 Customer: {order.customerName}
                      </span>
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="text-[#D4AF37] hover:underline flex items-center gap-1 text-[10px]"
                      >
                        <Phone size={10} /> Dial {order.customerPhone}
                      </a>
                    </div>

                    {order.orderType === 'Local Delivery' && (
                      <div className="flex items-start gap-1 text-[#EAD2B6]/80 bg-black/30 p-2 rounded border border-stone-800">
                        <MapPin className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-bold text-[10px] text-stone-400 uppercase block leading-none mb-1">
                            Home Delivery Destination (Click to Edit)
                          </span>
                          {editingAddressOrderId === order.id ? (
                            <div className="flex items-center gap-1.5 mt-1">
                              <input
                                type="text"
                                value={addressText}
                                onChange={(e) => setAddressText(e.target.value)}
                                className="bg-stone-900 border border-stone-700 rounded px-1.5 py-0.5 text-xs text-white flex-1 font-bold"
                              />
                              <button
                                onClick={() => handleUpdateDeliveryAddress(order.id, addressText)}
                                className="bg-emerald-800 p-1 rounded hover:bg-emerald-700 text-white cursor-pointer"
                              >
                                <Save size={12} />
                              </button>
                              <button
                                onClick={() => setEditingAddressOrderId(null)}
                                className="bg-stone-800 p-1 rounded hover:bg-stone-700 text-white cursor-pointer"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold leading-relaxed block text-emerald-400">
                                {order.deliveryAddress || 'No address specified'}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingAddressOrderId(order.id);
                                  setAddressText(order.deliveryAddress || '');
                                }}
                                className="text-[#D4AF37] hover:text-amber-300 cursor-pointer"
                              >
                                <Edit2 size={10} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {order.notes && (
                      <div className="flex items-start gap-1 text-yellow-300 bg-amber-950/25 p-2 rounded border border-yellow-500/15">
                        <MessageSquare className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[10px] text-yellow-500 uppercase block leading-none mb-0.5">
                            Customer Instructions
                          </span>
                          <span className="font-medium">{order.notes}</span>
                        </div>
                      </div>
                    )}

                    {order.status === 'Cancelled' && order.rejectionReason && (
                      <div className="flex items-start gap-1 text-red-400 bg-red-950/20 p-2 rounded border border-red-500/15">
                        <AlertCircle className="h-3.5 w-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[10px] text-red-500 uppercase block leading-none mb-0.5">
                            Rejection Reason
                          </span>
                          <span className="font-semibold leading-relaxed block text-red-300">
                            {order.rejectionReason}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Admin / Kitchen Internal Notes */}
                    <div className="bg-stone-950/40 p-2.5 rounded-xl border border-stone-800 text-xs mt-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase text-stone-500 tracking-wider">
                          📝 Kitchen / Admin Notes
                        </span>
                        {editingNotesOrderId !== order.id && (
                          <button
                            onClick={() => {
                              setEditingNotesOrderId(order.id);
                              setAdminNoteText(order.adminNotes || '');
                            }}
                            className="text-[9px] text-[#D4AF37] hover:underline font-bold cursor-pointer"
                          >
                            {order.adminNotes ? 'Edit' : '+ Add Note'}
                          </button>
                        )}
                      </div>
                      
                      {editingNotesOrderId === order.id ? (
                        <div className="flex items-center gap-1.5 mt-1">
                          <input
                            type="text"
                            value={adminNoteText}
                            onChange={(e) => setAdminNoteText(e.target.value)}
                            placeholder="e.g. John is delivering, make extra sweet..."
                            className="bg-stone-900 border border-stone-700 rounded px-1.5 py-0.5 text-xs text-white flex-1 font-bold"
                          />
                          <button
                            onClick={() => handleSaveAdminNote(order.id, adminNoteText)}
                            className="bg-emerald-800 p-1 rounded hover:bg-emerald-700 text-white cursor-pointer"
                          >
                            <Save size={12} />
                          </button>
                          <button
                            onClick={() => setEditingNotesOrderId(null)}
                            className="bg-stone-800 p-1 rounded hover:bg-stone-700 text-white cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <p className={`italic leading-relaxed ${order.adminNotes ? 'text-amber-200/90 font-semibold' : 'text-stone-500 text-[10px]'}`}>
                          {order.adminNotes || 'No internal preparation notes added yet.'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Items Checklist */}
                  <div className="py-3 space-y-3">
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider block">
                      📋 Item Checklist (Click to toggle)
                    </span>
                    <div className="space-y-2">
                      {order.items.map((item) => {
                        const isChecked = !!order.checkedItems?.[item.id];
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleToggleItemCheck(order.id, item.id)}
                            className={`w-full text-left flex items-start gap-2.5 bg-black/20 p-2 rounded-lg border transition-all cursor-pointer ${
                              isChecked 
                                ? 'border-emerald-500/30 bg-emerald-950/10 opacity-75' 
                                : 'border-stone-800/40 hover:border-stone-700'
                            }`}
                          >
                            <div className="flex items-center justify-center mt-1">
                              <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center ${
                                isChecked ? 'bg-emerald-800 border-emerald-500' : 'border-stone-600'
                              }`}>
                                {isChecked && <Check size={10} className="text-white font-black" />}
                              </div>
                            </div>
                            
                            {item.menuItem.image && (
                              <img
                                src={item.menuItem.image}
                                alt={item.menuItem.name}
                                className={`h-9 w-9 object-cover rounded border border-stone-800 flex-shrink-0 ${isChecked ? 'grayscale opacity-50' : ''}`}
                              />
                            )}
                            
                            <div className="flex-1 text-xs space-y-0.5">
                              <div className={`flex items-center justify-between text-white font-black ${isChecked ? 'line-through text-stone-500' : ''}`}>
                                <span>
                                  {item.menuItem.name} <span className="text-[#D4AF37] ml-0.5">x{item.quantity}</span>
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1 text-[9px]">
                                <span className="bg-amber-950/40 text-[#EAD2B6]/80 px-1.5 py-0.2 rounded border border-amber-950">
                                  {item.sweetness} Sweet
                                </span>
                                <span className="bg-stone-800 text-stone-300 px-1.5 py-0.2 rounded">
                                  {item.temperature}
                                </span>
                                {item.selectedSnack && (
                                  <span className={`bg-emerald-950/40 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-950/60 font-bold block mt-0.5 w-full ${isChecked ? 'line-through text-stone-500 border-stone-800/20 bg-transparent' : ''}`}>
                                    🥐 Side: {item.selectedSnack.name} (+₹{item.selectedSnack.price})
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Status action buttons */}
                <div className="border-t border-stone-800 pt-3 flex flex-wrap gap-1.5">
                  {rejectingOrderId === order.id ? (
                    <div className="w-full bg-red-950/20 border border-red-900/30 rounded-xl p-3 space-y-2 text-xs animate-fadeIn">
                      <span className="font-bold text-red-400 block">Reject Order Reason:</span>
                      <select
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded px-2 py-1 text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                      >
                        <option value="Kitchen overload / too busy">Kitchen overload / too busy</option>
                        <option value="Ingredients out of stock">Ingredients out of stock</option>
                        <option value="Invalid delivery address / out of range">Invalid delivery address / out of range</option>
                        <option value="Incorrect customer phone number">Incorrect customer phone number</option>
                        <option value="Store closing soon / closed">Store closing soon / closed</option>
                        <option value="Custom Reason">Custom Reason...</option>
                      </select>

                      {selectedReason === 'Custom Reason' && (
                        <input
                          type="text"
                          placeholder="Type custom reason here..."
                          value={customReason}
                          onChange={(e) => setCustomReason(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-700 rounded px-2 py-1 text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      )}

                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => setRejectingOrderId(null)}
                          className="bg-stone-850 text-stone-300 hover:bg-stone-800 px-3 py-1 rounded font-bold text-[11px] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            const reason = selectedReason === 'Custom Reason' ? (customReason.trim() || 'Unspecified reason') : selectedReason;
                            handleRejectOrder(order.id, reason);
                          }}
                          className="bg-red-800 text-white hover:bg-red-700 px-3 py-1 rounded font-black text-[11px] uppercase tracking-wider shadow cursor-pointer"
                        >
                          Confirm Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {order.status === 'Received' && (
                        <div className="w-full flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'Preparing')}
                            className="flex-1 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:brightness-110 text-white py-2.5 text-xs font-black uppercase tracking-wider shadow flex items-center justify-center gap-1 border border-emerald-500/30 cursor-pointer"
                          >
                            <Check size={12} /> Accept & Prep
                          </button>
                          <button
                            onClick={() => {
                              setRejectingOrderId(order.id);
                              setSelectedReason('Kitchen overload / too busy');
                              setCustomReason('');
                            }}
                            className="rounded-xl bg-red-950/60 hover:bg-red-900 text-red-400 hover:text-white px-3.5 py-2.5 text-xs font-black uppercase border border-red-900/30 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <X size={12} /> Reject
                          </button>
                        </div>
                      )}

                      {order.status === 'Preparing' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Ready')}
                          className="flex-1 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-700 hover:brightness-110 text-white py-2.5 text-xs font-black uppercase tracking-wider shadow flex items-center justify-center gap-1 border border-yellow-500/30 animate-pulse cursor-pointer"
                        >
                          <CheckCircle2 size={12} /> Mark Ready at Counter
                        </button>
                      )}

                      {order.status === 'Ready' && (
                        <>
                          {order.orderType === 'Local Delivery' ? (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'Out for Delivery')}
                              className="flex-1 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-800 hover:from-teal-600 text-white py-2.5 text-xs font-black uppercase tracking-wider shadow flex items-center justify-center gap-1 border border-teal-500/30 cursor-pointer"
                            >
                              <Truck size={12} /> Dispatch Driver
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                              className="flex-1 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-700 text-[#1F1008] py-2.5 text-xs font-black uppercase tracking-wider shadow flex items-center justify-center gap-1 border border-amber-400 cursor-pointer"
                            >
                              <CheckCircle2 size={12} /> Picked Up (Done)
                            </button>
                          )}
                        </>
                      )}

                      {order.status === 'Out for Delivery' && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:brightness-110 text-white py-2.5 text-xs font-black uppercase tracking-wider shadow flex items-center justify-center gap-1 border border-emerald-500/30 cursor-pointer"
                        >
                          <CheckCircle2 size={12} /> Confirm Delivered
                        </button>
                      )}

                      {/* Cancel Order Action */}
                      {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="rounded-xl bg-stone-800/50 hover:bg-red-950/20 px-3.5 py-2.5 text-xs font-bold text-red-400/80 hover:text-red-400 border border-stone-800 hover:border-red-900/30 cursor-pointer"
                          title="Cancel Order"
                        >
                          ✕
                        </button>
                      )}

                      {/* Completed visual text */}
                      {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                        <div className="w-full text-center text-[11px] font-black text-stone-500 uppercase py-1">
                          ✓ Order Processing Archived
                        </div>
                      )}
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
