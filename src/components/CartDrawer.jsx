import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartItemCount,
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

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    if (applyCouponCode(couponInput)) {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  const shippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-cream-50 dark:bg-[#141a17] text-stone-800 dark:text-stone-100 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-cream-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sage-600 dark:text-gold-300" />
              <h2 className="font-serif text-lg font-bold">Your Radiance Bag</h2>
              <span className="text-xs bg-sage-100 dark:bg-stone-800 text-sage-800 dark:text-gold-300 font-bold px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-cream-200 dark:hover:bg-stone-800 text-stone-500 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-sage-50/70 dark:bg-[#18231f] border-b border-sage-100 dark:border-stone-800">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {freeShippingLeft > 0 ? (
                <span>
                  Add <strong className="text-sage-700 dark:text-gold-300 font-bold">₹{freeShippingLeft.toLocaleString('en-IN')}</strong> more for <strong>FREE Express Shipping</strong>
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked: You have FREE Express Shipping!
                </span>
              )}
              <span className="text-[11px] text-stone-500">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-cream-200 dark:bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sage-500 to-gold-400 transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-sage-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-sage-600 dark:text-gold-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-200">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
                  Explore our nourishing serums, botanical crèmes, and luxury rituals to begin your glow.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-sage-700 text-cream-50 text-xs font-semibold hover:bg-sage-800 shadow transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white dark:bg-[#1a231f] rounded-2xl border border-cream-200/80 dark:border-stone-800 shadow-sm"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-cream-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('product', item.product.id);
                          }}
                          className="font-serif text-sm font-semibold text-stone-900 dark:text-cream-100 line-clamp-1 hover:text-sage-600 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
                        {item.product.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-cream-300 dark:border-stone-700 rounded-lg bg-cream-50 dark:bg-stone-800">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 hover:bg-cream-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1 hover:bg-cream-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <span className="text-sm font-bold text-stone-900 dark:text-cream-100">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-cream-200 dark:border-stone-800 bg-white/60 dark:bg-[#18231f]/60 backdrop-blur-md space-y-4">
              
              {/* Promo Code Input & Chips */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-sage-50 dark:bg-sage-950/60 border border-sage-300 dark:border-sage-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-sage-600 dark:text-gold-400" />
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
                  <div>
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon code (e.g. GLOW10)"
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 uppercase tracking-wider focus:outline-none focus:border-sage-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-stone-800 dark:bg-stone-700 text-white rounded-xl text-xs font-semibold hover:bg-stone-900 transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-stone-400">Try:</span>
                      <button
                        onClick={() => applyCouponCode('GLOW10')}
                        className="text-[10px] bg-cream-200 dark:bg-stone-800 px-2 py-0.5 rounded text-sage-700 dark:text-gold-300 hover:bg-sage-100"
                      >
                        GLOW10 (10% off)
                      </button>
                      <button
                        onClick={() => applyCouponCode('WELCOME20')}
                        className="text-[10px] bg-cream-200 dark:bg-stone-800 px-2 py-0.5 rounded text-sage-700 dark:text-gold-300 hover:bg-sage-100"
                      >
                        WELCOME20 (20% off)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-cream-100 pt-2 border-t border-cream-200 dark:border-stone-800">
                  <span>Total</span>
                  <span className="text-base font-extrabold text-sage-800 dark:text-gold-300">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-xl sage-gradient-btn text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-sage-700/20 hover:shadow-xl transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full py-2.5 rounded-xl border border-cream-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-cream-100 dark:hover:bg-stone-800 transition-colors text-center"
                >
                  View Full Cart & Options
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
