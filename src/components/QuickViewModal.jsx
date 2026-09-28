import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, Heart, ShoppingBag, ArrowRight, Check, ShieldCheck, Sparkles } from 'lucide-react';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo
  } = useStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedImgIndex(0);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleGoToDetails = () => {
    handleClose();
    navigateTo('product', product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-[#1a231f] rounded-3xl shadow-2xl border border-cream-200 dark:border-stone-800 overflow-hidden z-10">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:scale-105 transition-transform shadow"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="p-6 bg-cream-100 dark:bg-stone-900 flex flex-col justify-between">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-inner">
              <img
                src={product.images[selectedImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImgIndex === idx
                        ? 'border-sage-600 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="uppercase font-bold tracking-wider text-sage-600 dark:text-gold-400">
                  {product.category} • {product.brand}
                </span>
                <div className="flex items-center gap-1 text-gold-500 font-semibold">
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <span>{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-cream-100">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-extrabold text-stone-900 dark:text-cream-100">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold">
                  In Stock ({product.stock} available)
                </span>
              </div>

              {/* Description preview */}
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-3 line-clamp-3">
                {product.description}
              </p>

              {/* Key Benefits */}
              {product.benefits && (
                <div className="mt-3 space-y-1">
                  {product.benefits.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                      <Check className="w-3.5 h-3.5 text-sage-600 dark:text-gold-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-cream-200 dark:border-stone-800">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-cream-300 dark:border-stone-700 rounded-xl px-2 py-1 bg-cream-50 dark:bg-stone-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-sage-600"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-sage-600"
                  >
                    +
                  </button>
                </div>

                {/* Add to bag button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl sage-gradient-btn text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag - ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border border-cream-300 dark:border-stone-700 transition-colors ${
                    inWishlist ? 'text-blush-500 border-blush-300 bg-blush-50' : 'text-stone-500 hover:text-blush-500'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-blush-500' : ''}`} />
                </button>
              </div>

              {/* View Full Details Button */}
              <button
                onClick={handleGoToDetails}
                className="w-full text-center text-xs font-semibold text-sage-700 dark:text-gold-300 hover:underline flex items-center justify-center gap-1 py-1"
              >
                <span>View Full Formulation, Routine & All Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
