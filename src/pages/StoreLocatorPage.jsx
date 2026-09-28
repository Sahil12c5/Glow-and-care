import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export const StoreLocatorPage = () => {
  const { stores, setIsConsultationOpen } = useStore();
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0]?.id || 'store-1');

  const selectedStore = stores.find(s => s.id === selectedStoreId) || stores[0];

  const handleWhatsApp = (number) => {
    const clean = number.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${clean}?text=Hi!%20I%20am%20interested%20in%20visiting%20the%20${encodeURIComponent(selectedStore.name)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8 sm:space-y-12 pb-24 sm:pb-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
          Physical Sanctuaries & Boutiques
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-cream-100">
          Visit Us In Person
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
          Step into our serene, sensorial spaces. Touch, feel, and test all formulations. Receive complimentary AI Dermascan skin testing with our licensed estheticians.
        </p>
      </div>

      {/* Store Location Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {stores.map((store) => (
          <button
            key={store.id}
            onClick={() => setSelectedStoreId(store.id)}
            className={`px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              selectedStoreId === store.id
                ? 'bg-sage-700 text-white shadow-lg shadow-sage-700/20'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-cream-200 dark:border-stone-700 hover:bg-cream-100'
            }`}
          >
            <MapPin className={`w-3.5 h-3.5 ${selectedStoreId === store.id ? 'text-gold-300' : 'text-stone-400'}`} />
            <span>{store.city} {store.isFlagship ? '(Flagship)' : ''}</span>
          </button>
        ))}
      </div>

      {/* Selected Store Hero Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Store Details Card (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {selectedStore.isFlagship && (
                <span className="px-3 py-1 bg-gold-400 text-stone-950 font-bold text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                  Flagship Experience Sanctuary
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Open Today
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-cream-100">
              {selectedStore.name}
            </h2>

            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 dark:text-stone-100 text-sm">
                    {selectedStore.address}
                  </strong>
                  <span className="text-stone-400">{selectedStore.landmark}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0" />
                <span>{selectedStore.hours}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0" />
                <a href={`tel:${selectedStore.phone}`} className="hover:text-sage-700 font-medium">
                  {selectedStore.phone}
                </a>
              </div>
            </div>

            {/* In-store Services Checklist */}
            <div className="pt-4 border-t border-cream-200 dark:border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-sage-800 dark:text-gold-300 block mb-2.5">
                Available In-Store Experiences:
              </span>
              <div className="space-y-2">
                {selectedStore.services.map((srv, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 dark:text-gold-400 shrink-0" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-cream-200 dark:border-stone-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="flex-1 py-3 px-4 rounded-xl sage-gradient-btn text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book In-Store Visit</span>
            </button>

            <button
              onClick={() => handleWhatsApp(selectedStore.whatsapp)}
              className="py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Store</span>
            </button>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.address)}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl border border-cream-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-cream-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Right: Store Photo & Interactive Embedded Map (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-md border border-cream-200 dark:border-stone-800">
            <img
              src={selectedStore.image}
              alt={selectedStore.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Map Embed or Live Map Card */}
          <div className="flex-1 min-h-[220px] rounded-3xl overflow-hidden border border-cream-200 dark:border-stone-800 shadow-sm relative bg-cream-100 dark:bg-stone-900">
            <iframe
              title={`Map of ${selectedStore.name}`}
              src={selectedStore.mapEmbed}
              className="w-full h-full border-0 min-h-[220px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
