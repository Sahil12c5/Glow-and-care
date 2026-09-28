import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Calendar, Clock, MapPin, Sparkles, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';

export const ConsultationModal = () => {
  const {
    isConsultationOpen,
    setIsConsultationOpen,
    stores,
    showToast
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    storeId: stores[0]?.id || 'store-1',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '11:00 AM - 11:45 AM',
    concern: 'Dullness & Radiance Boosting',
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isConsultationOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }
    const ref = `GC-CONSULT-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsSuccess(true);
    showToast('Your in-store skin consultation has been reserved!', 'success');
  };

  const handleClose = () => {
    setIsConsultationOpen(false);
    setIsSuccess(false);
  };

  const selectedStore = stores.find(s => s.id === formData.storeId) || stores[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-white dark:bg-[#1a231f] rounded-3xl shadow-2xl border border-cream-200 dark:border-stone-800 overflow-hidden z-10">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-sage-800 to-sage-900 text-cream-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-300/40 flex items-center justify-center text-gold-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Book In-Store Skin Consultation
              </h3>
              <p className="text-xs text-stone-300">
                Complimentary AI Dermascan & personalized regimen at our sanctuary
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-gold-400">
                  Appointment Confirmed
                </span>
                <h4 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100 mt-1">
                  We look forward to welcoming you, {formData.name}!
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-cream-100 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-cream-200 dark:border-stone-800">
                  <span className="text-stone-500">Booking Reference:</span>
                  <strong className="text-sage-800 dark:text-gold-300 font-mono">{bookingRef}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Store Sanctuary:</span>
                  <strong className="text-stone-800 dark:text-stone-200">{selectedStore.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Address:</span>
                  <span className="text-right text-stone-700 dark:text-stone-300 max-w-[200px]">{selectedStore.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Scheduled Date & Time:</span>
                  <strong className="text-stone-800 dark:text-stone-200">{formData.date} at {formData.timeSlot}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Consultation Focus:</span>
                  <span className="text-sage-700 dark:text-sage-300">{formData.concern}</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                A confirmation SMS & WhatsApp reminder have been dispatched to <strong>{formData.phone}</strong>.
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-sage-700 hover:bg-sage-800 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Elena Vance"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98201 55678"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Select Boutique Sanctuary *
                  </label>
                  <select
                    value={formData.storeId}
                    onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  >
                    {stores.map(store => (
                      <option key={store.id} value={store.id}>
                        {store.name} ({store.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Primary Skin / Care Concern
                  </label>
                  <select
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  >
                    <option value="Dullness & Radiance Boosting">Dullness & Radiance Boosting</option>
                    <option value="Hyperpigmentation & Dark Spots">Hyperpigmentation & Dark Spots</option>
                    <option value="Barrier Repair & Sensitive Skin">Barrier Repair & Sensitive Skin</option>
                    <option value="Acne & Pore Refining">Acne & Pore Refining</option>
                    <option value="Hair Fall & Scalp Health">Hair Fall & Scalp Health</option>
                    <option value="Bridal Glow Masterclass">Bridal Glow Masterclass</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  >
                    <option value="10:30 AM - 11:15 AM">10:30 AM - 11:15 AM</option>
                    <option value="11:30 AM - 12:15 PM">11:30 AM - 12:15 PM</option>
                    <option value="02:00 PM - 02:45 PM">02:00 PM - 02:45 PM</option>
                    <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM</option>
                    <option value="06:00 PM - 06:45 PM">06:00 PM - 06:45 PM</option>
                    <option value="07:30 PM - 08:15 PM">07:30 PM - 08:15 PM</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sage-50 dark:bg-stone-900 border border-sage-200 dark:border-stone-800 flex items-center gap-3 text-xs text-sage-900 dark:text-stone-300">
                <ShieldCheck className="w-5 h-5 text-sage-600 shrink-0" />
                <span>
                  Includes <strong>15% in-store discount voucher</strong> on all products purchased during your visit!
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl sage-gradient-btn text-white text-xs sm:text-sm font-bold shadow-lg shadow-sage-700/20 hover:shadow-xl transition-all"
                >
                  Confirm Free In-Store Appointment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
