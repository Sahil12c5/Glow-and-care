import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    navigateTo
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Ctrl+K or / to open/close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName))) {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.ingredients.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ['Vitamin C', 'Bakuchiol', 'Ceramide', 'Rosehip', 'Hair Elixir', 'Lip Oil'];

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false);
    navigateTo('product', productId);
  };

  const handleSelectCategory = (category) => {
    setIsSearchOpen(false);
    navigateTo('shop', category);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a231f] rounded-3xl shadow-2xl border border-cream-200 dark:border-stone-800 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Box */}
        <div className="flex items-center px-6 py-4 border-b border-cream-200 dark:border-stone-800 gap-3">
          <Search className="w-5 h-5 text-sage-600 dark:text-gold-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, ingredients (Vitamin C, Squalane), brands..."
            className="w-full bg-transparent text-base sm:text-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs bg-cream-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-1 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {query.trim() === '' ? (
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-cream-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-sage-100 hover:text-sage-800 dark:hover:bg-sage-900/60 dark:hover:text-gold-300 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Category */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span>Explore Collections</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Skincare', 'Hair Care', 'Makeup', 'Body Care', "Men's Grooming", 'Gift Sets'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleSelectCategory(cat)}
                      className="p-3 text-left rounded-xl bg-cream-50 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 hover:border-sage-400 hover:bg-sage-50/50 transition-all flex items-center justify-between"
                    >
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">{cat}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                Found {filteredProducts.length} Results
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    No radiance products found matching &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-stone-400 text-xs mt-1">
                    Try searching for &ldquo;Serum&rdquo;, &ldquo;Rose&rdquo;, or &ldquo;Glow&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-cream-100 dark:hover:bg-stone-800/80 cursor-pointer transition-colors border border-transparent hover:border-cream-200 dark:hover:border-stone-700"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-xl bg-cream-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-sage-600 dark:text-gold-400">
                          {p.category} • {p.brand}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-cream-100 truncate">
                          {p.name}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          {p.subtitle}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-stone-900 dark:text-cream-100">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-cream-100/60 dark:bg-stone-900/60 border-t border-cream-200 dark:border-stone-800 flex justify-between items-center text-xs text-stone-500">
          <span>Need custom skin advice? Visit our flagship boutique.</span>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              navigateTo('shop');
            }}
            className="text-sage-700 dark:text-gold-300 font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
