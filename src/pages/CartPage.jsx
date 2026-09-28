import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Gift,
  ArrowLeft,
  Truck
} from 'lucide-react';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingLeft,
    shippingFee,
    appliedCoupon,
    discountAmount,
    cartTotal,
    applyCouponCode,
    removeCoupon,
    navigateTo
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    if (applyCouponCode(couponCode)) {
      setCouponCode('');
    }
  };

  const shippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-cream-200 dark:bg-stone-800 flex items-center justify-center mx-auto text-sage-600 dark:text-gold-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-cream-100">
          Your Radiance Bag is Empty
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Explore our award-winning botanical serums, restorative hair masks, and luxury ritual gift boxes.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 rounded-full sage-gradient-btn text-white font-bold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
        >
          <span>Explore The Apothecary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-24 sm:pb-8">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-stone-500 hover:text-sage-700 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-cream-100">
            Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
          </h1>
        </div>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="p-4 rounded-2xl bg-sage-50 dark:bg-[#18231f] border border-sage-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-sage-600 dark:text-gold-400" />
          {freeShippingLeft > 0 ? (
            <span>
              Add <strong className="text-sage-800 dark:text-gold-300 font-bold">₹{freeShippingLeft.toLocaleString('en-IN')}</strong> more to qualify for <strong>FREE Doorstep Delivery</strong>!
            </span>
          ) : (
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Congratulations! Your order qualifies for FREE Express Delivery.
            </span>
          )}
        </div>
        <div className="w-full sm:w-48 h-2 bg-cream-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sage-500 to-gold-400 transition-all duration-500"
            style={{ width: `${shippingProgress}%` }}
          />
        </div>
      </div>

      {/* Grid: Cart Items List + Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 p-6 shadow-sm divide-y divide-cream-200 dark:divide-stone-800">
            {cart.map((item) => (
              <div key={item.product.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-2xl object-cover bg-cream-100 shrink-0 cursor-pointer"
                    onClick={() => navigateTo('product', item.product.id)}
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sage-600 dark:text-gold-400">
                      {item.product.brand}
                    </span>
                    <h3
                      onClick={() => navigateTo('product', item.product.id)}
                      className="font-serif text-base font-bold text-stone-900 dark:text-cream-100 hover:text-sage-700 cursor-pointer line-clamp-1"
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">{item.product.size}</p>
                    <div className="text-sm font-bold text-stone-800 dark:text-stone-200 mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')} each
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-cream-300 dark:border-stone-700 rounded-xl bg-cream-50 dark:bg-stone-900 px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="p-1 hover:text-sage-600 text-stone-600 dark:text-stone-300"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="p-1 hover:text-sage-600 text-stone-600 dark:text-stone-300"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="text-base font-bold text-stone-900 dark:text-cream-100 min-w-[70px] text-right">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Complimentary Gift Box / Handwritten Note Option */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200 dark:border-stone-800 shadow-sm space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeGiftWrap}
                onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                className="w-4 h-4 accent-sage-600 rounded"
              />
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-gold-500" />
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  Complimentary Luxury Gift Packaging & Handwritten Calligraphy Card
                </span>
              </div>
            </label>

            {includeGiftWrap && (
              <div className="pt-2 animate-fadeIn">
                <textarea
                  rows="2"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Enter your personal gift message for the recipient..."
                  className="w-full p-3 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-sage-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Order Summary & Coupon (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 p-6 shadow-sm space-y-6">
            
            <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 pb-3 border-b border-cream-200 dark:border-stone-800">
              Order Summary
            </h2>

            {/* Promo Code section */}
            <div>
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2 block">
                Promo or Gift Voucher
              </span>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-sage-50 dark:bg-sage-950/60 border border-sage-300 dark:border-sage-800 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-sage-600 dark:text-gold-400" />
                    <div>
                      <span className="font-bold text-sage-800 dark:text-gold-300">{appliedCoupon.code}</span>
                      <span className="text-[11px] text-stone-500 block">-{appliedCoupon.description}</span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-rose-500 text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 uppercase tracking-wider focus:outline-none focus:border-sage-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 dark:bg-stone-700 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Suggestions */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-stone-400">Available:</span>
                <button
                  onClick={() => applyCouponCode('GLOW10')}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream-100 dark:bg-stone-800 text-sage-700 dark:text-gold-300"
                >
                  GLOW10 (10% off)
                </button>
                <button
                  onClick={() => applyCouponCode('WELCOME20')}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream-100 dark:bg-stone-800 text-sage-700 dark:text-gold-300"
                >
                  WELCOME20 (20% off)
                </button>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300 pt-3 border-t border-cream-200 dark:border-stone-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Doorstep Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax / GST</span>
                <span>Included in price</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 dark:text-cream-100 pt-3 border-t border-cream-200 dark:border-stone-800">
                <span>Estimated Total</span>
                <span className="text-lg font-extrabold text-sage-800 dark:text-gold-300">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 rounded-2xl sage-gradient-btn text-white font-bold text-sm shadow-lg shadow-sage-700/20 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-sage-600 dark:text-gold-400" />
              <span>SSL 256-bit Encrypted Checkout</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
