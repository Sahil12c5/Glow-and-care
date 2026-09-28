import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  MapPin,
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Package,
  Calendar,
  Lock
} from 'lucide-react';

export const CheckoutPage = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    cartTotal,
    placeOrder,
    user,
    stores,
    navigateTo
  } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Delivery Option, 3: Payment, 4: Confirmed
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: user ? user.name.split(' ')[0] : 'Elena',
    lastName: user ? user.name.split(' ')[1] || 'Vance' : 'Vance',
    email: user ? user.email : 'elena.vance@example.com',
    phone: user ? user.phone : '+91 98201 55678',
    address: '402, Sea Breeze Apartments, Hill Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    deliveryType: 'standard', // 'standard' or 'pickup'
    pickupStoreId: stores[0]?.id || 'store-1',
    paymentMethod: 'upi', // 'upi', 'card', 'cod', 'netbanking'
    upiId: 'elena@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvv: '•••'
  });

  if (cart.length === 0 && !confirmedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500">Add products to your bag before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 rounded-full sage-gradient-btn text-white text-xs font-bold"
        >
          Explore Products
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    // Trigger festive celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5f8f7c', '#c69943', '#f5dad2', '#ffffff']
    });

    const orderData = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone
      },
      deliveryType: formData.deliveryType,
      shippingAddress: formData.deliveryType === 'pickup'
        ? `In-Store Pickup: ${stores.find(s => s.id === formData.pickupStoreId)?.name}`
        : `${formData.address}, ${formData.city}, ${formData.state} - ${formData.postalCode}`,
      paymentMethod:
        formData.paymentMethod === 'upi' ? `UPI (${formData.upiId})` :
        formData.paymentMethod === 'card' ? 'Credit Card (ending 4242)' :
        formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Net Banking'
    };

    const newOrder = placeOrder(orderData);
    setConfirmedOrder(newOrder);
    setStep(4);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-24 sm:pb-8">
      
      {/* Checkout Progress Stepper */}
      {step < 4 && (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cream-200 dark:bg-stone-800 -translate-y-1/2 -z-0" />
            
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Delivery' },
              { num: 3, label: 'Payment' }
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => step > s.num && setStep(s.num)}
                  disabled={step < s.num}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step === s.num
                      ? 'bg-sage-700 text-white shadow-md ring-4 ring-sage-200 dark:ring-sage-900'
                      : step > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-cream-200 dark:bg-stone-800 text-stone-400'
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </button>
                <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: ORDER CONFIRMED CELEBRATION */}
      {step === 4 && confirmedOrder ? (
        <div className="max-w-2xl mx-auto py-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
              Payment & Order Successful
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 mt-1">
              Thank You for Your Radiance Order!
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
              Your order confirmation and tax invoice have been dispatched to <strong>{confirmedOrder.customer?.email || formData.email}</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200 dark:border-stone-800 shadow-sm text-left text-xs space-y-3">
            <div className="flex justify-between pb-3 border-b border-cream-200 dark:border-stone-800">
              <span className="text-stone-500">Order Reference:</span>
              <strong className="text-sage-800 dark:text-gold-300 font-mono text-sm">{confirmedOrder.id}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Tracking Number:</span>
              <strong className="text-stone-800 dark:text-stone-200 font-mono">{confirmedOrder.trackingNumber}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Delivery Destination:</span>
              <span className="text-right text-stone-800 dark:text-stone-200 max-w-[260px] font-medium">
                {confirmedOrder.shippingAddress}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-stone-500">Payment Option:</span>
              <span className="text-stone-800 dark:text-stone-200">{confirmedOrder.paymentMethod}</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-cream-200 dark:border-stone-800 font-bold text-sm text-stone-900 dark:text-cream-100">
              <span>Total Paid:</span>
              <span className="text-sage-700 dark:text-gold-300">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('account')}
              className="px-6 py-3 rounded-full sage-gradient-btn text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              Track Order in Account
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3 rounded-full border border-cream-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-cream-100 dark:hover:bg-stone-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        /* MULTI-STEP CHECKOUT FORM + SUMMARY */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Step Forms (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: SHIPPING ADDRESS */}
            {step === 1 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-stone-800">
                  <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-cream-100 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sage-600 dark:text-gold-400" />
                    <span>Shipping Address</span>
                  </h2>
                  <span className="text-xs text-stone-400 font-medium">Step 1 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Email Address (for order tracking) *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Phone Number (for SMS & delivery) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Street Address & Apartment / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Postal Code / PIN *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full sage-gradient-btn text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Continue to Delivery Options</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DELIVERY METHOD (ONLINE OR IN-STORE PICKUP) */}
            {step === 2 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-stone-800">
                  <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-cream-100 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-sage-600 dark:text-gold-400" />
                    <span>Choose Delivery Method</span>
                  </h2>
                  <span className="text-xs text-stone-400 font-medium">Step 2 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Standard Express Doorstep */}
                  <label
                    onClick={() => setFormData({ ...formData, deliveryType: 'standard' })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.deliveryType === 'standard'
                        ? 'border-sage-600 bg-sage-50/50 dark:bg-stone-900 dark:border-gold-400'
                        : 'border-cream-300 dark:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-cream-100">
                          Express Doorstep Delivery
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                        Dispatched in temperature-controlled eco packaging. Delivery in 2-3 business days.
                      </p>
                    </div>
                    <div className="mt-4 text-[11px] text-sage-700 dark:text-gold-300 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Includes live SMS & WhatsApp tracking
                    </div>
                  </label>

                  {/* Free In-Store Pickup */}
                  <label
                    onClick={() => setFormData({ ...formData, deliveryType: 'pickup' })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.deliveryType === 'pickup'
                        ? 'border-sage-600 bg-sage-50/50 dark:bg-stone-900 dark:border-gold-400'
                        : 'border-cream-300 dark:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-cream-100">
                          Click & Collect (In-Store Pickup)
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          FREE
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                        Ready within 60 minutes at your chosen boutique. Includes complimentary mini skin scan.
                      </p>
                    </div>
                    <div className="mt-4 text-[11px] text-sage-700 dark:text-gold-300 font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Select boutique sanctuary below
                    </div>
                  </label>
                </div>

                {/* If In-Store Pickup selected, show store selector */}
                {formData.deliveryType === 'pickup' && (
                  <div className="p-4 rounded-2xl bg-cream-100 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 space-y-3">
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                      Select Boutique for Pickup:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {stores.map(st => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, pickupStoreId: st.id })}
                          className={`p-3 rounded-xl text-left border transition-all text-xs ${
                            formData.pickupStoreId === st.id
                              ? 'border-sage-600 bg-white dark:bg-stone-800 shadow font-semibold text-sage-900 dark:text-gold-300'
                              : 'border-cream-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                          }`}
                        >
                          <strong className="block text-stone-800 dark:text-stone-200">{st.city} Boutique</strong>
                          <span className="text-[11px] text-stone-500 truncate block">{st.address}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-full border border-cream-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold"
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-full sage-gradient-btn text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-stone-800">
                  <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-cream-100 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-sage-600 dark:text-gold-400" />
                    <span>Secure Payment</span>
                  </h2>
                  <span className="text-xs text-stone-400 font-medium">Step 3 of 3</span>
                </div>

                {/* Payment Options Radio Cards */}
                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-sage-600 bg-sage-50/50 dark:bg-stone-900 dark:border-gold-400'
                        : 'border-cream-300 dark:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sage-100 dark:bg-stone-800 flex items-center justify-center text-sage-700 dark:text-gold-400">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-xs font-bold text-stone-900 dark:text-cream-100">
                          UPI Instant (GPay / PhonePe / Paytm / QR)
                        </strong>
                        <span className="text-[11px] text-stone-500">Zero surcharge, instant confirmation</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-sage-700 dark:text-gold-300">
                      RECOMMENDED
                    </span>
                  </label>

                  {/* Cards */}
                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-sage-600 bg-sage-50/50 dark:bg-stone-900 dark:border-gold-400'
                        : 'border-cream-300 dark:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sage-100 dark:bg-stone-800 flex items-center justify-center text-sage-700 dark:text-gold-400">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-xs font-bold text-stone-900 dark:text-cream-100">
                          Credit / Debit Card (Visa, Mastercard, RuPay)
                        </strong>
                        <span className="text-[11px] text-stone-500">Encrypted 256-bit card transaction</span>
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery (COD) */}
                  <label
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-sage-600 bg-sage-50/50 dark:bg-stone-900 dark:border-gold-400'
                        : 'border-cream-300 dark:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sage-100 dark:bg-stone-800 flex items-center justify-center text-sage-700 dark:text-gold-400">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-xs font-bold text-stone-900 dark:text-cream-100">
                          Cash on Delivery (Pay at Doorstep)
                        </strong>
                        <span className="text-[11px] text-stone-500">Pay cash or UPI to delivery agent</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Sub-inputs depending on method */}
                {formData.paymentMethod === 'upi' && (
                  <div className="p-4 rounded-2xl bg-cream-100 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 space-y-2">
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      placeholder="yourname@okhdfcbank"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100"
                    />
                    <span className="text-[10px] text-stone-400">A payment prompt will be sent to your UPI app.</span>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-cream-100 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Expiry</label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">CVV</label>
                        <input
                          type="password"
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Place Order Button */}
                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-full border border-cream-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold"
                  >
                    Back to Delivery
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="px-8 py-4 rounded-full bg-gold-400 hover:bg-gold-500 text-stone-950 font-bold text-sm shadow-xl shadow-gold-400/25 flex items-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Authorize & Place Order (₹{cartTotal.toLocaleString('en-IN')})</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right: Sticky Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm space-y-4 sticky top-28">
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-cream-100 pb-2 border-b border-cream-200 dark:border-stone-800">
                Order Items ({cart.length})
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-cream-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-stone-900 dark:text-cream-100 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-stone-900 dark:text-cream-100 shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
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
                  <span>Delivery</span>
                  <span>{formData.deliveryType === 'pickup' || shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 dark:text-cream-100 pt-2 border-t border-cream-200 dark:border-stone-800">
                  <span>Grand Total</span>
                  <span className="text-lg font-extrabold text-sage-800 dark:text-gold-300">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sage-50 dark:bg-stone-900 text-[11px] text-sage-800 dark:text-stone-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0" />
                <span>Protected by Glow & Care 100% Genuine Product Promise.</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
