import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  MapPin,
  Sparkles,
  ChevronDown,
  CalendarCheck,
  PhoneCall
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentPage,
    navigateTo,
    cartItemCount,
    cartSubtotal,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    user,
    isDark,
    toggleTheme,
    setIsConsultationOpen
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);

  const categories = [
    { name: 'Skincare', desc: 'Serums, moisturisers, cleansers' },
    { name: 'Hair Care', desc: 'Restorative oils, hair masks' },
    { name: 'Makeup', desc: 'Dewy tints, mineral SPF, lip oils' },
    { name: 'Body Care', desc: 'Whipped soufflés, botanical washes' },
    { name: "Men's Grooming", desc: 'Calming balms, beard elixirs' },
    { name: 'Gift Sets', desc: 'Curated luxury ritual hampers' }
  ];

  const handleNav = (page, param = null) => {
    navigateTo(page, param);
    setMobileMenuOpen(false);
    setCategoriesDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-cream-50/95 dark:bg-[#141a17]/95 backdrop-blur-md border-b border-cream-200/80 dark:border-stone-800/80 transition-colors duration-200">
      {/* Top Notification Announcement Bar */}
      <div className="bg-sage-800 text-cream-50 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-medium mx-auto sm:mx-0 truncate">
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold-400 animate-pulse shrink-0"></span>
            <span className="truncate">
              Free Express Delivery on orders over ₹999 | Code <strong className="text-gold-300 font-bold tracking-wide">GLOW10</strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-stone-300 text-xs shrink-0">
            <button
              onClick={() => handleNav('stores')}
              className="hover:text-gold-300 flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>Flagship: Bandra, Mumbai</span>
            </button>
            <span className="text-stone-600">|</span>
            <a
              href="tel:+919820144521"
              className="flex items-center gap-1 hover:text-gold-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
              <span>+91 98201 44521</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none shrink-0"
            aria-label="Glow and Care Store Home"
          >
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border border-gold-300/40 bg-white">
              <img
                src="/logo.jpg"
                alt="Glow & Care Store Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-2xl font-bold tracking-wider text-sage-900 dark:text-cream-100 group-hover:text-sage-600 dark:group-hover:text-gold-300 transition-colors leading-none">
                GLOW & CARE
              </span>
              <span className="block text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                LUXURY BOTANICALS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700 dark:text-stone-200">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-sage-600 dark:hover:text-gold-300 transition-colors py-1 border-b-2 ${
                currentPage === 'home'
                  ? 'border-sage-600 dark:border-gold-400 text-sage-800 dark:text-gold-300 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('shop', 'All')}
              className={`hover:text-sage-600 dark:hover:text-gold-300 transition-colors py-1 border-b-2 ${
                currentPage === 'shop'
                  ? 'border-sage-600 dark:border-gold-400 text-sage-800 dark:text-gold-300 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Shop All
            </button>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdown(true)}
              onMouseLeave={() => setCategoriesDropdown(false)}
            >
              <button
                onClick={() => handleNav('shop')}
                className="flex items-center gap-1 hover:text-sage-600 dark:hover:text-gold-300 transition-colors py-1"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {categoriesDropdown && (
                <div className="absolute top-full -left-4 w-72 bg-white dark:bg-stone-900 shadow-xl rounded-2xl p-3 border border-cream-200 dark:border-stone-800 animate-fadeIn z-50">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-sage-600 dark:text-gold-400 px-3 py-1 mb-1">
                    Product Collections
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleNav('shop', cat.name)}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-sage-50 dark:hover:bg-stone-800/80 transition-colors group flex flex-col"
                    >
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-100 group-hover:text-sage-700 dark:group-hover:text-gold-300">
                        {cat.name}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {cat.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('about')}
              className={`hover:text-sage-600 dark:hover:text-gold-300 transition-colors py-1 border-b-2 ${
                currentPage === 'about'
                  ? 'border-sage-600 dark:border-gold-400 text-sage-800 dark:text-gold-300 font-semibold'
                  : 'border-transparent'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNav('stores')}
              className={`hover:text-sage-600 dark:hover:text-gold-300 transition-colors py-1 border-b-2 ${
                currentPage === 'stores'
                  ? 'border-sage-600 dark:border-gold-400 text-sage-800 dark:text-gold-300 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Store Locator
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`hover:text-sage-600 dark:hover:text-gold-300 transition-colors py-1 border-b-2 ${
                currentPage === 'contact'
                  ? 'border-sage-600 dark:border-gold-400 text-sage-800 dark:text-gold-300 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Skin Consultation CTA (Book In-Store) */}
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-sage-100 dark:bg-sage-950/60 text-sage-800 dark:text-sage-200 border border-sage-300/60 dark:border-sage-800 hover:bg-sage-200/80 transition-all shadow-sm"
              title="Book In-Store Skin Consultation"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-spin-slow" />
              <span>Book In-Store Visit</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:bg-cream-200/60 dark:hover:bg-stone-800 transition-colors"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:bg-cream-200/60 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle color mode"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-sage-700" />}
            </button>

            {/* Wishlist Icon (Desktop only, mobile has it in bottom nav) */}
            <button
              onClick={() => handleNav('account')}
              className="hidden md:block relative p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:bg-cream-200/60 dark:hover:bg-stone-800 transition-colors"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blush-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Login (Desktop only) */}
            <button
              onClick={() => {
                if (user) {
                  handleNav('account');
                } else {
                  setIsAuthOpen(true);
                }
              }}
              className="hidden md:block p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:bg-cream-200/60 dark:hover:bg-stone-800 transition-colors"
              aria-label="User Account"
              title={user ? `Signed in as ${user.name}` : "Sign in / Register"}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-sage-700 hover:bg-sage-800 text-cream-50 p-2 sm:px-3.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-gold-300" />
              <span className="hidden sm:inline font-medium">Bag</span>
              {cartItemCount > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 bg-gold-400 text-sage-950 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button (Touch target 40px) */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-stone-700 dark:text-stone-200 rounded-xl hover:bg-cream-200/60 dark:hover:bg-stone-800 min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50 dark:bg-[#141a17] border-b border-cream-200 dark:border-stone-800 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 text-base font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`text-left py-2 px-3 rounded-lg ${
                currentPage === 'home'
                  ? 'bg-sage-100 dark:bg-sage-900/50 text-sage-800 dark:text-gold-300'
                  : 'text-stone-700 dark:text-stone-200'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('shop', 'All')}
              className={`text-left py-2 px-3 rounded-lg ${
                currentPage === 'shop'
                  ? 'bg-sage-100 dark:bg-sage-900/50 text-sage-800 dark:text-gold-300'
                  : 'text-stone-700 dark:text-stone-200'
              }`}
            >
              Shop All Products
            </button>

            {/* Mobile Categories list */}
            <div className="pl-3 pr-2 py-2 border-l-2 border-sage-300 dark:border-sage-700 space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Categories
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {categories.map(c => (
                  <button
                    key={c.name}
                    onClick={() => handleNav('shop', c.name)}
                    className="text-left text-xs text-stone-600 dark:text-stone-300 hover:text-sage-700 py-1"
                  >
                    • {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNav('about')}
              className={`text-left py-2 px-3 rounded-lg ${
                currentPage === 'about'
                  ? 'bg-sage-100 dark:bg-sage-900/50 text-sage-800 dark:text-gold-300'
                  : 'text-stone-700 dark:text-stone-200'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNav('stores')}
              className={`text-left py-2 px-3 rounded-lg ${
                currentPage === 'stores'
                  ? 'bg-sage-100 dark:bg-sage-900/50 text-sage-800 dark:text-gold-300'
                  : 'text-stone-700 dark:text-stone-200'
              }`}
            >
              Store Locator & In-Store Visits
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`text-left py-2 px-3 rounded-lg ${
                currentPage === 'contact'
                  ? 'bg-sage-100 dark:bg-sage-900/50 text-sage-800 dark:text-gold-300'
                  : 'text-stone-700 dark:text-stone-200'
              }`}
            >
              Contact Us
            </button>
          </div>

          <div className="pt-4 border-t border-cream-200 dark:border-stone-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsConsultationOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sage-700 text-cream-50 font-semibold text-sm shadow-md"
            >
              <CalendarCheck className="w-4 h-4 text-gold-300" />
              <span>Book Skin Consultation</span>
            </button>

            {user ? (
              <button
                onClick={() => handleNav('account')}
                className="w-full py-2.5 rounded-xl border border-sage-600/40 text-sage-700 dark:text-stone-200 text-sm font-medium text-center"
              >
                My Account ({user.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="w-full py-2.5 rounded-xl border border-sage-600/40 text-sage-700 dark:text-stone-200 text-sm font-medium text-center"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
