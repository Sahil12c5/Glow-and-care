import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, CheckCheck } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const quickPrompts = [
    'Hi! I would like to book a skin consultation.',
    'Is the Botanical Radiance Serum in stock in Mumbai?',
    'What routine do you recommend for dry skin?'
  ];

  const handleSend = (textToSend = null) => {
    const finalMsg = textToSend || message;
    if (!finalMsg.trim()) return;
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/919820144521?text=${encoded}`, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40">
      {/* Pop-up Chat Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-88 max-w-sm bg-white dark:bg-[#1a231f] rounded-3xl shadow-2xl border border-cream-200 dark:border-stone-800 overflow-hidden animate-slide-in">
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/20 border border-white/40 flex items-center justify-center font-bold">
                <img
                  src="/logo.jpg"
                  alt="Glow and Care"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Glow & Care Advisor</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Online now • In-Store Concierge
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#f0f2f5] dark:bg-stone-900/90 text-xs space-y-3 max-h-60 overflow-y-auto">
            <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-stone-800 dark:text-stone-200">
              <p className="leading-relaxed">
                Hello! ✨ Welcome to Glow & Care Store. How can our botanical beauty consultants assist you today?
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 mt-1">
                <span>Just now</span>
                <CheckCheck className="w-3 h-3 text-emerald-500" />
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                Suggested Questions:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-2 rounded-xl bg-white/80 dark:bg-stone-800/80 hover:bg-emerald-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-colors block text-[11px]"
                >
                  💬 {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white dark:bg-[#1a231f] border-t border-cream-200 dark:border-stone-800 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-cream-50 dark:bg-stone-900 border border-cream-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button Trigger */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs shadow-xl shadow-emerald-600/30 hover:shadow-2xl transition-all duration-300 hover:scale-105"
        aria-label="Chat on WhatsApp with Glow and Care"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75"></span>
        </div>
        <span className="hidden sm:inline tracking-wide font-medium">
          Chat with Us
        </span>
      </button>
    </div>
  );
};
