import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  ChevronRight,
  Check,
  Clock,
  Send,
  Leaf,
  Info
} from 'lucide-react';

export const ProductDetailPage = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    addProductReview,
    stores,
    setIsConsultationOpen
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'ingredients', 'howToUse', 'reviews'
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // New review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Related products from same category or brand
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigateTo('checkout');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;
    addProductReview(product.id, {
      id: `r-${Date.now()}`,
      author: reviewAuthor,
      rating: reviewRating,
      title: reviewTitle || 'Verified Experience',
      comment: reviewComment,
      date: 'Just now'
    });
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
        <button onClick={() => navigateTo('home')} className="hover:text-sage-700">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => navigateTo('shop')} className="hover:text-sage-700">Shop</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => navigateTo('shop', product.category)} className="hover:text-sage-700">{product.category}</button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-800 dark:text-stone-200 font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Showcase: Gallery + Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Gallery with Zoom (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-cream-100 dark:bg-stone-900 border border-cream-200/90 dark:border-stone-800 shadow-md cursor-crosshair group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                  : undefined
              }
            />

            {/* Badges on main image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              {product.isBestSeller && (
                <span className="px-3 py-1 bg-gold-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-sm">
                  Best Seller
                </span>
              )}
              {hasDiscount && (
                <span className="px-3 py-1 bg-blush-400 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-sm">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 pointer-events-none bg-black/40 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm">
              Hover to Zoom
            </div>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-sage-600 scale-105 shadow-md'
                      : 'border-cream-300 dark:border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Clean Formulation Guarantee Note */}
          <div className="p-4 rounded-2xl bg-sage-50/70 dark:bg-stone-900 border border-sage-200 dark:border-stone-800 flex items-center gap-3 text-xs text-sage-900 dark:text-stone-300">
            <Leaf className="w-5 h-5 text-sage-600 dark:text-gold-400 shrink-0" />
            <span>
              <strong>Dermatologically Approved:</strong> Free from mineral oil, silicones, artificial fragrance, parabens, and microplastics.
            </span>
          </div>
        </div>

        {/* Right: Buy Box & Product Info (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="uppercase font-bold tracking-widest text-sage-600 dark:text-gold-400 text-xs">
                {product.brand} • {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-gold-500 font-semibold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-gold-400 text-gold-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="text-stone-400 text-xs">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 font-light mt-1.5">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing & Size */}
          <div className="flex items-baseline gap-4 pt-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discountPercent}% Off)
                </span>
              </>
            )}
          </div>

          {/* Specification Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-cream-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
              Size: {product.size}
            </span>
            <span className="px-3 py-1 rounded-full bg-cream-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
              Target: {product.skinType}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              In Stock ({product.stock} units ready to dispatch)
            </span>
          </div>

          {/* Key Benefits Checklist */}
          {product.benefits && (
            <div className="p-4 rounded-2xl bg-cream-100/70 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sage-800 dark:text-gold-300 block">
                Clinical & Sensory Benefits:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              
              {/* Quantity selector */}
              <div className="flex items-center border border-cream-300 dark:border-stone-700 rounded-2xl px-3 py-2 bg-white dark:bg-stone-900 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 font-bold text-stone-500 hover:text-sage-700 text-base"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-stone-900 dark:text-cream-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 font-bold text-stone-500 hover:text-sage-700 text-base"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-2xl sage-gradient-btn text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sage-700/20 hover:shadow-xl transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag - ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-2xl border transition-colors shadow-sm ${
                  inWishlist
                    ? 'bg-blush-50 border-blush-300 text-blush-500'
                    : 'border-cream-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-blush-500'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-blush-500' : ''}`} />
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-2xl bg-gold-400 hover:bg-gold-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Zap className="w-4 h-4 fill-stone-950" />
              <span>Instant Buy Now & Checkout</span>
            </button>
          </div>

          {/* Delivery & Physical Store In-Stock Checker */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200 dark:border-stone-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-800 dark:text-stone-200">Express Delivery</strong>
                  <span className="text-stone-500">Ships today. Delivered in 2-3 business days.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-800 dark:text-stone-200">14-Day Returns</strong>
                  <span className="text-stone-500">Online or return at any physical boutique.</span>
                </div>
              </div>
            </div>

            {/* In-Store Availability Live Check */}
            <div className="pt-3 border-t border-cream-200 dark:border-stone-800">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-sage-600 dark:text-gold-400" />
                <span>Physical Store Availability:</span>
              </span>
              <div className="space-y-1.5 text-xs">
                {stores.map(s => (
                  <div key={s.id} className="flex items-center justify-between text-stone-600 dark:text-stone-400">
                    <span>{s.city} ({s.name.split(' ')[2]})</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      In Stock for Pickup
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Product Information Tabs */}
      <div className="rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200 dark:border-stone-800 p-6 sm:p-10 shadow-sm">
        
        {/* Tab Headers */}
        <div className="flex border-b border-cream-200 dark:border-stone-800 gap-6 overflow-x-auto">
          {[
            { id: 'description', label: 'Full Description & Bio-Actives' },
            { id: 'ingredients', label: 'Ingredients & Clean Standard' },
            { id: 'howToUse', label: 'How to Use & Ritual Steps' },
            { id: 'reviews', label: `Verified Reviews (${product.reviewCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-serif font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-sage-600 text-sage-800 dark:border-gold-400 dark:text-gold-300'
                  : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="pt-6">
          
          {/* 1. Description */}
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-light">
              <p>{product.description}</p>
              <h4 className="font-serif text-base font-bold text-stone-900 dark:text-cream-100 pt-2">
                Why It Works
              </h4>
              <p>
                Our formulation scientists synergistically blend fat-soluble and water-soluble antioxidants to ensure deep trans-epidermal absorption. By balancing pH at 5.5, it protects the microbiome mantle while driving visible luminosity.
              </p>
            </div>
          )}

          {/* 2. Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-4 rounded-2xl bg-cream-100 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 text-xs font-mono text-stone-700 dark:text-stone-300 leading-relaxed">
                {product.ingredients}
              </div>
              <p className="text-xs text-stone-500">
                Formula transparently declared. 100% Vegan, Cruelty-Free certified by PETA, Dermatologist Tested.
              </p>
            </div>
          )}

          {/* 3. How to Use */}
          {activeTab === 'howToUse' && (
            <div className="space-y-4 max-w-3xl text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              <p>{product.howToUse}</p>
              <div className="p-4 rounded-2xl bg-gold-50 dark:bg-stone-900 border border-gold-200 dark:border-stone-800 text-xs space-y-1">
                <strong className="text-stone-900 dark:text-gold-300 block font-serif text-sm">
                  Esthetician Ritual Tip:
                </strong>
                <p className="text-stone-600 dark:text-stone-400">
                  For an elevated facial massage, chill your jade roller in the refrigerator for 10 minutes before applying. Gently stroke upward from jawline to temple to boost lymphatic circulation.
                </p>
              </div>
            </div>
          )}

          {/* 4. Reviews & Submission */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-4xl">
              
              {/* Reviews Summary Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-cream-50 dark:bg-stone-900 border border-cream-200 dark:border-stone-800">
                <div className="flex items-center gap-4">
                  <div className="font-serif text-4xl font-bold text-stone-900 dark:text-cream-100">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex text-gold-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500">
                      Based on {product.reviewCount} customer ratings
                    </span>
                  </div>
                </div>

                <div className="text-xs text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">98% of clients</span> recommend this formulation
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map(r => (
                    <div
                      key={r.id}
                      className="p-5 rounded-2xl border border-cream-200/90 dark:border-stone-800 bg-cream-50/50 dark:bg-stone-900/50 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <strong className="text-stone-900 dark:text-cream-100">{r.author}</strong>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Verified Purchase
                          </span>
                        </div>
                        <span className="text-stone-400">{r.date}</span>
                      </div>
                      <div className="flex text-gold-400">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        ))}
                      </div>
                      <h5 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-200">
                        {r.title}
                      </h5>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        {r.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500 italic">Be the first to share your radiance review for this formulation!</p>
                )}
              </div>

              {/* Write a Review Form */}
              <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl bg-cream-50 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 space-y-4">
                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-cream-100">
                  Share Your Glow Experience
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      placeholder="e.g. Maya Patel"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Rating *
                    </label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-sage-500 font-semibold text-gold-500"
                    >
                      <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                      <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                      <option value="3">★★★☆☆ (3 Stars - Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. My new holy grail serum!"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe texture, skin feel, fragrance, and noticeable results..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl sage-gradient-btn text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Verified Review</span>
                </button>
              </form>

            </div>
          )}

        </div>

      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
                Complete Your Ritual
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-cream-100">
                Complementary Formulations
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop', product.category)}
              className="text-xs font-bold text-sage-700 dark:text-gold-300 hover:underline"
            >
              View More in {product.category} →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Floating Sticky Buy Bar */}
      <div className="md:hidden fixed bottom-14 inset-x-0 z-30 bg-white/95 dark:bg-[#141a17]/95 backdrop-blur-md border-t border-cream-200 dark:border-stone-800 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-sm font-bold text-stone-900 dark:text-cream-100 block">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-stone-400 block truncate max-w-[120px]">
            {product.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-xl border ${inWishlist ? 'text-blush-500 bg-blush-50 border-blush-300' : 'text-stone-500 border-cream-300 dark:border-stone-700'}`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-blush-500' : ''}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className="px-5 py-2.5 rounded-xl sage-gradient-btn text-white text-xs font-bold shadow flex items-center gap-1.5 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

    </div>
  );
};
