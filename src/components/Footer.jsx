import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  Award,
  CreditCard
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, TwitterIcon } from './SocialIcons';

export const Footer = () => {
  const { navigateTo, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [discountUnlocked, setDiscountUnlocked] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setDiscountUnlocked(true);
    showToast('Welcome to the Radiance Circle! Use code GLOW10 for 10% off', 'success');
  };

  return (
    <footer className="bg-[#19221e] text-stone-300 border-t border-stone-800 transition-colors">
      
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-stone-800/80 bg-[#141b18] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-sage-900/60 border border-sage-700/50 flex items-center justify-center text-gold-300 mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white">100% Authentic</h4>
              <p className="text-xs text-stone-400 mt-1 max-w-[180px]">Directly sourced and batch-certified clean formulations</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-sage-900/60 border border-sage-700/50 flex items-center justify-center text-gold-300 mb-3">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white">Clean & Cruelty-Free</h4>
              <p className="text-xs text-stone-400 mt-1 max-w-[180px]">Zero parabens, sulfates, or animal testing</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-sage-900/60 border border-sage-700/50 flex items-center justify-center text-gold-300 mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white">Dermatologist Curated</h4>
              <p className="text-xs text-stone-400 mt-1 max-w-[180px]">Clinically tested for radiant, barrier-first results</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-sage-900/60 border border-sage-700/50 flex items-center justify-center text-gold-300 mb-3">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-sm font-bold text-white">Online + Physical Store</h4>
              <p className="text-xs text-stone-400 mt-1 max-w-[180px]">Free in-store pickup & complimentary skin testing</p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-300 shadow">
                <img src="/logo.jpg" alt="Glow & Care Store" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-white">
                  GLOW & CARE
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-gold-300 font-medium">
                  STORE & SANCTUARY
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Glow Naturally. Care Deeply. We unite clean botanical science with luxurious sensorial experiences. Available online across India & at our flagship experience sanctuaries.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-sage-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-sage-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-sage-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors" aria-label="YouTube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-sage-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter Instant Code Promo */}
            <div className="pt-4">
              <h5 className="font-serif text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Join the Radiance Circle</span>
              </h5>
              <p className="text-xs text-stone-400 mb-3">
                Subscribe for skincare ritual guides & receive 10% off your first online order.
              </p>

              {discountUnlocked ? (
                <div className="p-3 bg-sage-950/80 border border-gold-400/40 rounded-xl text-xs text-gold-200">
                  🎉 Code unlocked: <strong className="text-white font-mono bg-sage-800 px-2 py-0.5 rounded">GLOW10</strong> for 10% off!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-gold-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gold-400 hover:bg-gold-500 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    <span>Claim</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-xs">
              Collections
            </h5>
            <ul className="space-y-2 text-xs">
              {['Skincare', 'Hair Care', 'Makeup', 'Body Care', "Men's Grooming", 'Gift Sets'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigateTo('shop', cat)}
                    className="text-stone-400 hover:text-gold-300 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-xs">
              Experience & Care
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="text-stone-400 hover:text-gold-300 transition-colors"
                >
                  Our Philosophy & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('stores')}
                  className="text-stone-400 hover:text-gold-300 transition-colors"
                >
                  Boutique Store Locator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-stone-400 hover:text-gold-300 transition-colors"
                >
                  Skin Consultation Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="text-stone-400 hover:text-gold-300 transition-colors"
                >
                  Track Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-stone-400 hover:text-gold-300 transition-colors"
                >
                  Help & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-stone-400 hover:text-gold-300 transition-colors"
                >
                  Shipping & Return Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Store Locations & Contacts */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-xs">
              Visit Our Sanctuary
            </h5>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Shop 4 & 5, Hill Road, Bandra West, Mumbai, MH 400050</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Open Everyday: 10:00 AM - 9:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 98201 44521</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>concierge@glowandcare.store</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Glow & Care Store. All rights reserved. Handcrafted with clean botanical love.</p>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-stone-400">Secure Payments:</span>
            <div className="flex items-center gap-2 text-stone-400">
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-300">UPI</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-300">VISA</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-300">MASTERCARD</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-300">NETBANKING</span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 rounded text-[10px] font-mono text-stone-300">COD</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
