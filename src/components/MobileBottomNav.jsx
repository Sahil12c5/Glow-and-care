import React from 'react';
import { useStore } from '../context/StoreContext';
import { Home, Sparkles, Search, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileBottomNav = () => {
  const {
    currentPage,
    navigateTo,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    user,
    setIsAuthOpen
  } = useStore();

  const handleNav = (page) => {
    navigateTo(page);
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#141a17]/95 backdrop-blur-lg border-t border-cream-200 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-5 items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            currentPage === 'home'
              ? 'text-sage-700 dark:text-gold-300 font-bold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
          }`}
        >
          <Home className={`w-5 h-5 ${currentPage === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => handleNav('shop')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
            currentPage === 'shop'
              ? 'text-sage-700 dark:text-gold-300 font-bold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${currentPage === 'shop' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Shop</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 transition-colors"
        >
          <div className="p-1 rounded-full bg-cream-100 dark:bg-stone-800">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => handleNav('account')}
          className="relative flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 transition-colors"
        >
          <Heart className="w-5 h-5 stroke-2" />
          {wishlist.length > 0 && (
            <span className="absolute top-0.5 right-4 w-4 h-4 bg-blush-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] tracking-tight mt-0.5">Saved</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 transition-colors"
        >
          <ShoppingBag className="w-5 h-5 stroke-2" />
          {cartItemCount > 0 && (
            <span className="absolute top-0.5 right-4 w-4 h-4 bg-sage-700 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="text-[10px] tracking-tight mt-0.5">Bag</span>
        </button>

      </div>
    </nav>
  );
};
