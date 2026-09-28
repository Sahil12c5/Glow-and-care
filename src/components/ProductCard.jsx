import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setQuickViewProduct
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      onClick={() => navigateTo('product', product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white dark:bg-[#1a231f] rounded-2xl overflow-hidden border border-cream-200/90 dark:border-stone-800 shadow-sm hover:shadow-card transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-100 dark:bg-stone-900">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider bg-gold-400 text-stone-950 rounded-full shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider bg-sage-600 text-white rounded-full shadow-sm">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold tracking-tight bg-blush-400 text-white rounded-full shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Floating Wishlist Button (Min 40px touch target on mobile) */}
        <button
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 z-10 shadow-sm ${
            inWishlist
              ? 'bg-blush-400 text-white'
              : 'bg-white/85 dark:bg-stone-900/85 text-stone-600 dark:text-stone-300 hover:text-blush-400 active:scale-95'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button (Desktop hover only) */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickView}
            className="w-full py-2.5 px-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-xl text-stone-800 dark:text-cream-100 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md hover:bg-sage-600 hover:text-white dark:hover:bg-sage-600 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] sm:text-[11px] text-sage-600 dark:text-sage-400 truncate max-w-[65%]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-gold-500 font-medium shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold-400 text-gold-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-xs sm:text-base font-semibold text-stone-900 dark:text-cream-100 line-clamp-2 group-hover:text-sage-700 dark:group-hover:text-gold-300 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Subtitle / Key Ingredient */}
          <p className="text-[11px] text-stone-400 dark:text-stone-500 line-clamp-1 mt-0.5 font-light hidden sm:block">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & Add To Cart Button */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-cream-200/80 dark:border-stone-800/80 flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-cream-100">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-sage-600 dark:text-sage-400 font-medium truncate block">
              {product.skinType}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`min-h-[36px] min-w-[36px] sm:min-w-0 p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0 shadow-sm active:scale-95 ${
              isAdding
                ? 'bg-emerald-600 text-white'
                : 'bg-sage-100 hover:bg-sage-600 dark:bg-stone-800 dark:hover:bg-sage-600 text-sage-800 hover:text-white dark:text-stone-200 dark:hover:text-white'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
              {isAdding ? 'Added!' : 'Add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
