import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  ChevronDown,
  Star,
  Check,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';

export const ShopPage = () => {
  const {
    products,
    shopCategoryFilter,
    setShopCategoryFilter,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo
  } = useStore();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(shopCategoryFilter || 'All');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sorting & Layout
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'newest'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 6;

  // Extract unique brands and skin types from products
  const allBrands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);
  const allSkinTypes = useMemo(() => [...new Set(products.map(p => p.skinType))], [products]);
  const categoriesList = ['All', 'Skincare', 'Hair Care', 'Makeup', 'Body Care', "Men's Grooming", 'Gift Sets'];

  // Keep selectedCategory in sync if context changed it
  React.useEffect(() => {
    if (shopCategoryFilter && shopCategoryFilter !== selectedCategory) {
      setSelectedCategory(shopCategoryFilter);
      setCurrentPageNum(1);
    }
  }, [shopCategoryFilter]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      // Skin Type
      if (selectedSkinTypes.length > 0 && !selectedSkinTypes.includes(p.skinType)) {
        return false;
      }
      // Price
      if (p.price > maxPrice) {
        return false;
      }
      // Rating
      if (p.rating < minRating) {
        return false;
      }
      // In stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedBrands, selectedSkinTypes, maxPrice, minRating, inStockOnly, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPageNum - 1) * itemsPerPage,
    currentPageNum * itemsPerPage
  );

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setShopCategoryFilter('All');
    setSelectedBrands([]);
    setSelectedSkinTypes([]);
    setMaxPrice(150);
    setMinRating(0);
    setInStockOnly(false);
    setCurrentPageNum(1);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPageNum(1);
  };

  const toggleSkinType = (type) => {
    setSelectedSkinTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPageNum(1);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedBrands.length > 0 ||
    selectedSkinTypes.length > 0 ||
    maxPrice < 150 ||
    minRating > 0 ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-20 sm:pb-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sage-100 via-cream-100 to-cream-50 dark:from-[#1b2520] dark:via-[#161d19] dark:to-[#141a17] p-5 sm:p-10 border border-cream-200/80 dark:border-stone-800">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
          The Boutique Apothecary
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 mt-0.5 sm:mt-1">
          {selectedCategory === 'All' ? 'All Formulations' : selectedCategory}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 sm:mt-2 max-w-2xl leading-relaxed">
          Clean active botanicals, antioxidant-infused serums, and restorative treatments formulated with dermatological precision.
        </p>

        {/* Quick Category Pills - Swipeable on mobile! */}
        <div className="flex gap-2 mt-4 sm:mt-6 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShopCategoryFilter(cat);
                setCurrentPageNum(1);
              }}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sage-700 text-white shadow-md'
                  : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-200 hover:bg-sage-100 dark:hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Shop Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/80 dark:border-stone-800 shadow-sm sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-sage-600 dark:text-gold-400" />
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-cream-100">
                Filters
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-rose-500 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-stone-700 dark:text-stone-200 mb-2">
              <span>Max Price</span>
              <span className="font-bold text-sage-700 dark:text-gold-300">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPageNum(1);
              }}
              className="w-full accent-sage-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹500</span>
              <span>₹5,000</span>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="pt-4 border-t border-cream-200 dark:border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Brand
            </h4>
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {allBrands.map(brand => (
                <label key={brand} className="flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300 cursor-pointer hover:text-sage-700">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="rounded text-sage-600 focus:ring-sage-500 accent-sage-600"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Skin Type Filter */}
          <div className="pt-4 border-t border-cream-200 dark:border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Skin & Hair Type
            </h4>
            <div className="space-y-2">
              {allSkinTypes.map(st => (
                <label key={st} className="flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300 cursor-pointer hover:text-sage-700">
                  <input
                    type="checkbox"
                    checked={selectedSkinTypes.includes(st)}
                    onChange={() => toggleSkinType(st)}
                    className="rounded text-sage-600 focus:ring-sage-500 accent-sage-600"
                  />
                  <span>{st}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="pt-4 border-t border-cream-200 dark:border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Minimum Rating
            </h4>
            <div className="space-y-1.5">
              {[4.8, 4.5, 0].map(rating => (
                <button
                  key={rating}
                  onClick={() => {
                    setMinRating(rating);
                    setCurrentPageNum(1);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    minRating === rating
                      ? 'bg-sage-100 dark:bg-stone-800 font-bold text-sage-800 dark:text-gold-300'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-cream-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {rating > 0 ? (
                      <>
                        <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        <span>{rating}★ & above</span>
                      </>
                    ) : (
                      <span>All Ratings</span>
                    )}
                  </div>
                  {minRating === rating && <Check className="w-3.5 h-3.5 text-sage-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Availability */}
          <div className="pt-4 border-t border-cream-200 dark:border-stone-800">
            <label className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300 cursor-pointer">
              <span className="font-medium">In-Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  setCurrentPageNum(1);
                }}
                className="w-4 h-4 accent-sage-600 rounded"
              />
            </label>
          </div>

        </aside>

        {/* Product Catalog Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Bar: Count, Sort Dropdown, View Mode, Mobile Filter Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#1a231f] border border-cream-200/80 dark:border-stone-800 shadow-sm">
            
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                Showing <strong className="text-stone-900 dark:text-cream-100">{filteredProducts.length}</strong> formulations
              </span>

              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sage-100 text-sage-800 text-xs font-bold"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              {/* Sort By Select */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 hidden md:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-sage-500 font-medium"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* Grid / List Mode */}
              <div className="flex items-center p-1 bg-cream-100 dark:bg-stone-800 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-stone-700 text-sage-700 dark:text-gold-300 shadow-sm'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  aria-label="Grid layout"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-stone-700 text-sage-700 dark:text-gold-300 shadow-sm'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  aria-label="List layout"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-stone-400">Active Filters:</span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sage-100 dark:bg-stone-800 text-sage-800 dark:text-gold-300">
                  Category: {selectedCategory}
                  <button onClick={() => { setSelectedCategory('All'); setShopCategoryFilter('All'); }}>
                    <X className="w-3 h-3 ml-1" />
                  </button>
                </span>
              )}
              {selectedBrands.map(b => (
                <span key={b} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sage-100 dark:bg-stone-800 text-sage-800 dark:text-gold-300">
                  Brand: {b}
                  <button onClick={() => toggleBrand(b)}>
                    <X className="w-3 h-3 ml-1" />
                  </button>
                </span>
              ))}
              {selectedSkinTypes.map(st => (
                <span key={st} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sage-100 dark:bg-stone-800 text-sage-800 dark:text-gold-300">
                  {st}
                  <button onClick={() => toggleSkinType(st)}>
                    <X className="w-3 h-3 ml-1" />
                  </button>
                </span>
              ))}
              {maxPrice < 5000 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sage-100 dark:bg-stone-800 text-sage-800 dark:text-gold-300">
                  Under ₹{maxPrice.toLocaleString('en-IN')}
                  <button onClick={() => setMaxPrice(5000)}>
                    <X className="w-3 h-3 ml-1" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sage-100 dark:bg-stone-800 text-sage-800 dark:text-gold-300">
                  ★ {minRating}+
                  <button onClick={() => setMinRating(0)}>
                    <X className="w-3 h-3 ml-1" />
                  </button>
                </span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-xs text-rose-500 hover:underline font-semibold ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Products List Rendering */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-[#1a231f] rounded-3xl border border-cream-200 dark:border-stone-800 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-200">
                No formulations match your filters
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your price range, clearing brand selections, or exploring all product categories.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 rounded-full bg-sage-700 text-white text-xs font-semibold hover:bg-sage-800 transition-colors shadow"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Horizontal List View */
            <div className="space-y-4">
              {paginatedProducts.map(product => {
                const inWishlist = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => navigateTo('product', product.id)}
                    className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm hover:shadow-card transition-all flex flex-col sm:flex-row gap-5 items-center cursor-pointer group"
                  >
                    <div className="w-full sm:w-44 aspect-square rounded-2xl overflow-hidden bg-cream-100 shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                          <span className="uppercase font-bold tracking-wider text-sage-600 dark:text-gold-400 text-[11px]">
                            {product.category} • {product.brand}
                          </span>
                          <div className="flex items-center gap-1 text-gold-500 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                            <span>{product.rating}</span>
                            <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
                          </div>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 group-hover:text-sage-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-cream-200/80 dark:border-stone-800 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-stone-900 dark:text-cream-100">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-stone-400 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                            className="px-4 py-2 rounded-xl sage-gradient-btn text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-xl border border-cream-300 dark:border-stone-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream-100 dark:hover:bg-stone-800"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPageNum(i + 1)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                    currentPageNum === i + 1
                      ? 'bg-sage-700 text-white shadow-md'
                      : 'border border-cream-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-cream-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPageNum === totalPages}
                onClick={() => setCurrentPageNum(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 rounded-xl border border-cream-300 dark:border-stone-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream-100 dark:hover:bg-stone-800"
              >
                Next
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white dark:bg-[#1a231f] p-6 shadow-2xl overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-stone-800">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
                  Filter Products
                </h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              {/* Price slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span>Max Price</span>
                  <span className="font-bold text-sage-700 dark:text-gold-300">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-sage-600"
                />
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Brand
                </h4>
                <div className="space-y-2">
                  {allBrands.map(b => (
                    <label key={b} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleBrand(b)}
                        className="rounded accent-sage-600"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-cream-200 dark:border-stone-800 flex gap-2">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-2.5 rounded-xl border border-cream-300 text-xs font-semibold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-sage-700 text-white text-xs font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
