import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const ContactPage = () => {
  const { showToast, setIsConsultationOpen } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setIsSubmitted(true);
    showToast('Your message has been sent to our concierge desk!', 'success');
  };

  const faqs = [
    {
      q: 'How fast will my online skincare order ship?',
      a: 'All orders placed before 2:00 PM are dispatched on the same business day from our climate-controlled Mumbai facility. Standard express shipping arrives within 2 to 3 business days across India.'
    },
    {
      q: 'Can I pick up my online order at a physical boutique?',
      a: 'Yes! Select "Click & Collect (In-Store Pickup)" during checkout. Your package will be hand-packed and ready at your chosen boutique sanctuary (Mumbai, Delhi, or Bengaluru) in just 60 minutes.'
    },
    {
      q: 'What is the complimentary In-Store AI Dermascan consultation?',
      a: 'Our complimentary 30-minute in-person consultation utilizes optical bio-imaging to assess barrier hydration, pore micro-congestion, and hyperpigmentation depth. Our certified estheticians then recommend a bespoke regimen tailored precisely to your skin.'
    },
    {
      q: 'Are Glow & Care formulations suitable for sensitive or acne-prone skin?',
      a: 'Yes, 100%. Our formulations are formulated without artificial fragrance, parabens, sulfates, comedogenic mineral oils, or drying alcohols. Every batch undergoes rigorous patch testing on reactive skin.'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We offer an unconditional 14-Day Radiance Guarantee. If any product does not agree with your skin, you may request a free return or exchange either online or directly in any physical boutique.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8 sm:space-y-12 pb-24 sm:pb-8">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
          Client Concierge & Support
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-cream-100">
          We&apos;re Here to Help You Glow
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          Have an inquiry about our ingredients, order tracking, or in-store consultations? Reach out to our dedicated client care specialists.
        </p>
      </div>

      {/* Grid: Form + Direct Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100">
            Send Us a Message
          </h2>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-cream-100">
                Message Dispatched
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Thank you, {form.name}. A beauty advisor will review your message and reply via email within 2-4 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                }}
                className="px-6 py-2 rounded-full border border-cream-300 text-xs font-semibold hover:bg-cream-100"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Elena Vance"
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="elena@example.com"
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98201 55678"
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking & Delivery">Order Tracking & Delivery</option>
                    <option value="In-Store Skin Consultation">In-Store Skin Consultation</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Wholesale & Corporate Gifting">Wholesale & Corporate Gifting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Your Message *
                </label>
                <textarea
                  rows="4"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can our botanical beauty advisors assist you today?"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl sage-gradient-btn text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Concierge</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick WhatsApp Chat Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#128C7E] to-[#075E54] text-white space-y-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Instant WhatsApp Desk</h3>
                <p className="text-xs text-emerald-100">Live replies from boutique estheticians</p>
              </div>
            </div>
            <p className="text-xs text-emerald-50 leading-relaxed">
              Prefer real-time chat? Connect with our flagship team for immediate stock checks, advice, or appointment bookings.
            </p>
            <a
              href="https://wa.me/919820144521?text=Hello%20Glow%20and%20Care%20Concierge"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#075E54] font-bold text-xs shadow hover:bg-emerald-50 transition-colors"
            >
              <span>Chat on WhatsApp</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Details Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-cream-100 pb-2 border-b border-cream-200 dark:border-stone-800">
              Direct Contact Channels
            </h3>

            <div className="flex items-start gap-3 text-stone-600 dark:text-stone-300">
              <Phone className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 dark:text-cream-100 font-semibold">Phone Support</strong>
                <a href="tel:+919820144521" className="hover:underline">+91 98201 44521</a>
                <span className="block text-[11px] text-stone-400">Mon - Sun: 10:00 AM - 9:00 PM</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-stone-600 dark:text-stone-300">
              <Mail className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 dark:text-cream-100 font-semibold">Email Concierge</strong>
                <a href="mailto:concierge@glowandcare.store" className="hover:underline">concierge@glowandcare.store</a>
                <span className="block text-[11px] text-stone-400">Response within 2-4 hours</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-stone-600 dark:text-stone-300">
              <MapPin className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900 dark:text-cream-100 font-semibold">Flagship Sanctuary</strong>
                <span>Shop 4 & 5, Hill Road, Bandra West, Mumbai, MH 400050</span>
              </div>
            </div>

            <div className="pt-3 border-t border-cream-200 dark:border-stone-800">
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="w-full py-2.5 rounded-xl bg-sage-100 dark:bg-stone-800 text-sage-800 dark:text-gold-300 font-bold text-xs text-center hover:bg-sage-200 transition-colors"
              >
                Book Skin Consultation Appointment
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto pt-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-gold-400">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-cream-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 overflow-hidden shadow-sm transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-stone-900 dark:text-cream-100"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ml-2 ${
                    openFaq === idx ? 'rotate-180 text-sage-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
