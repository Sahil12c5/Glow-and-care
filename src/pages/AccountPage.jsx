import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  User,
  Package,
  Heart,
  MapPin,
  Sparkles,
  LogOut,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const AccountPage = () => {
  const {
    user,
    logoutUser,
    orders,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    navigateTo,
    setIsAuthOpen,
    setIsConsultationOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'wishlist', 'addresses', 'perks'

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-sage-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-sage-600 dark:text-gold-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100">
          Sign In to Your Account
        </h2>
        <p className="text-xs text-stone-500 max-w-xs mx-auto">
          Access your order history, track deliveries, manage your botanical wishlist, and redeem in-store vouchers.
        </p>
        <button
          onClick={() => setIsAuthOpen(true)}
          className="px-8 py-3 rounded-full sage-gradient-btn text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  // Find wishlist products
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-24 sm:pb-8">
      
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sage-800 to-sage-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gold-400/20 border-2 border-gold-300 flex items-center justify-center font-serif text-2xl font-bold text-gold-300">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-400 text-stone-950 text-[10px] font-bold uppercase tracking-wider">
                VIP Tier
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">{user.email}</p>
            <p className="text-[11px] text-gold-300 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 240 Radiance Reward Points Unlocked
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
          >
            Book In-Store Visit
          </button>
          <button
            onClick={logoutUser}
            className="p-2.5 rounded-full bg-white/10 hover:bg-rose-500/20 text-white/80 hover:text-white transition-colors"
            title="Log Out"
            aria-label="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-cream-200 dark:border-stone-800 gap-6 overflow-x-auto">
        {[
          { id: 'orders', label: `My Orders (${orders.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'wishlist', label: `Saved Wishlist (${wishlistProducts.length})`, icon: <Heart className="w-4 h-4" /> },
          { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" /> },
          { id: 'perks', label: 'Member Perks & Vouchers', icon: <Sparkles className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-sage-600 text-sage-800 dark:border-gold-400 dark:text-gold-300'
                : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        
        {/* 1. ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-white dark:bg-[#1a231f] rounded-3xl border border-cream-200 dark:border-stone-800 p-8">
                <Package className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="font-serif text-lg font-bold">No Orders Placed Yet</h3>
                <p className="text-xs text-stone-500">Your recent online & in-store orders will appear here.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-6 py-2.5 rounded-full sage-gradient-btn text-white text-xs font-bold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm space-y-6"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-200 dark:border-stone-800 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-stone-900 dark:text-cream-100">
                          {order.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status.includes('Delivered')
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : 'bg-gold-100 text-gold-800 dark:bg-gold-950/60 dark:text-gold-300'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-stone-400 block mt-0.5">Placed on {order.date}</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-stone-400 block text-[11px]">Total Amount</span>
                        <strong className="text-sm font-bold text-stone-900 dark:text-cream-100">
                          ₹{order.total.toLocaleString('en-IN')}
                        </strong>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 block text-[11px]">Tracking #</span>
                        <span className="font-mono text-xs font-semibold text-sage-700 dark:text-gold-300">
                          {order.trackingNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Timeline Visualizer */}
                  <div className="py-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3 block">
                      Delivery Progress:
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-1 shadow">
                          ✓
                        </div>
                        <span className="font-semibold text-stone-700 dark:text-stone-300">Order Placed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-1 shadow">
                          ✓
                        </div>
                        <span className="font-semibold text-stone-700 dark:text-stone-300">Eco-Packed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-1 shadow">
                          ✓
                        </div>
                        <span className="font-semibold text-stone-700 dark:text-stone-300">In Transit</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold mb-1 shadow ${
                          order.status.includes('Delivered')
                            ? 'bg-emerald-600 text-white'
                            : 'bg-cream-200 dark:bg-stone-800 text-stone-400'
                        }`}>
                          ✓
                        </div>
                        <span className="font-semibold text-stone-700 dark:text-stone-300">Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3 pt-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover bg-cream-100 shrink-0"
                          />
                          <div>
                            <h4
                              onClick={() => navigateTo('product', item.id)}
                              className="font-semibold text-stone-900 dark:text-cream-100 hover:text-sage-600 cursor-pointer"
                            >
                              {item.name}
                            </h4>
                            <span className="text-stone-400">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-stone-900 dark:text-cream-100">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Destination & Payment info footer */}
                  <div className="pt-3 border-t border-cream-200 dark:border-stone-800 flex flex-col sm:flex-row justify-between text-[11px] text-stone-500">
                    <span>Delivered to: <strong>{order.shippingAddress}</strong></span>
                    <span>Paid via: <strong>{order.paymentMethod}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 2. WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-white dark:bg-[#1a231f] rounded-3xl border border-cream-200 dark:border-stone-800 p-8">
                <Heart className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="font-serif text-lg font-bold">Your Wishlist is Empty</h3>
                <p className="text-xs text-stone-500">Save items by clicking the heart icon on any formulation.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-6 py-2.5 rounded-full sage-gradient-btn text-white text-xs font-bold"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border-2 border-sage-600/50 shadow-sm space-y-3 relative">
              <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[10px] font-bold uppercase tracking-wider">
                Default Shipping Address
              </span>
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-cream-100">
                Elena Vance (Home)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                402, Sea Breeze Apartments, Hill Road<br />
                Bandra West, Mumbai, Maharashtra - 400050<br />
                Phone: +91 98201 55678
              </p>
              <div className="pt-2 flex gap-3 text-xs">
                <button className="text-sage-700 dark:text-gold-300 font-semibold hover:underline">
                  Edit Address
                </button>
              </div>
            </div>

            <div className="p-6 rounded-3xl border-2 border-dashed border-cream-300 dark:border-stone-700 flex flex-col items-center justify-center text-center p-8 space-y-2 cursor-pointer hover:border-sage-500 transition-colors">
              <MapPin className="w-6 h-6 text-stone-400" />
              <h4 className="font-semibold text-xs text-stone-700 dark:text-stone-300">Add New Shipping Address</h4>
              <p className="text-[11px] text-stone-400">Save an office or secondary residence address for quick 1-click checkout</p>
            </div>
          </div>
        )}

        {/* 4. MEMBER PERKS & VOUCHERS */}
        {activeTab === 'perks' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-gold-50 to-cream-100 dark:from-stone-900 dark:to-stone-800 border border-gold-300/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                  In-Store Privilege
                </span>
                <span className="font-mono text-xs font-bold text-stone-800 dark:text-gold-300">
                  PASS #GC-VIP-99
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
                15% Off Any Physical Store Purchase
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Show this digital pass at the checkout counter of our Mumbai, Delhi, or Bangalore sanctuaries to receive 15% off.
              </p>
              <div className="pt-2 text-[10px] text-stone-500">
                Valid until: 31 Dec 2026 • Unlimited visits
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-600 dark:text-gold-400">
                  Online Code
                </span>
                <span className="font-mono text-xs font-bold text-emerald-600">
                  ACTIVE
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
                GLOW10 • 10% Off Online Order
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                Enjoy 10% off any routine or gift set with zero minimum spend threshold.
              </p>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-bold text-sage-700 dark:text-gold-300 hover:underline flex items-center gap-1 pt-1"
              >
                <span>Shop With Voucher</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
