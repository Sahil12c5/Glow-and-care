import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';
import storesData from '../data/stores.json';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const DEFAULT_COUPONS = {
  'GLOW10': { discountPercent: 10, minSpend: 0, description: '10% off your entire order' },
  'WELCOME20': { discountPercent: 20, minSpend: 999, description: '20% off for new radiance lovers (orders > ₹999)' },
  'CARE50': { discountFixed: 300, minSpend: 1999, description: '₹300 off orders over ₹1,999' },
};

export const StoreProvider = ({ children }) => {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('glow_theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('glow_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('glow_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // Products
  const [products, setProducts] = useState(productsData);
  const [stores] = useState(storesData);

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('glow_cart');
      return saved ? JSON.parse(saved) : [
        { product: productsData[0], quantity: 1 },
        { product: productsData[1], quantity: 1 }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('glow_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('glow_wishlist');
      return saved ? JSON.parse(saved) : [productsData[0].id, productsData[3].id];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Navigation / Page Routing
  const [currentPage, setCurrentPage] = useState('home'); // home, shop, product, cart, checkout, about, stores, contact, account
  const [selectedProductId, setSelectedProductId] = useState('gc-101');
  const [shopCategoryFilter, setShopCategoryFilter] = useState('All');

  // Navigation Helper
  const navigateTo = (page, param = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'product' && param) {
      setSelectedProductId(param);
    }
    if (page === 'shop' && param) {
      setShopCategoryFilter(param);
    }
    setCurrentPage(page);
  };

  // User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('glow_user');
      return saved ? JSON.parse(saved) : {
        name: 'Elena Vance',
        email: 'elena.vance@example.com',
        phone: '+91 98201 55678',
        isLoggedIn: true,
      };
    } catch {
      return null;
    }
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('glow_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ORD-98421',
          date: '24 Sep 2026',
          status: 'Delivered',
          total: 3198,
          items: [
            { id: 'gc-101', name: 'Botanical Radiance Illuminating Serum', price: 1499, quantity: 1, image: productsData[0].images[0] },
            { id: 'gc-102', name: 'Velvet Peptide Barrier Repair Crème', price: 1699, quantity: 1, image: productsData[1].images[0] }
          ],
          trackingNumber: 'DEL-IND-883921',
          shippingAddress: '402, Sea Breeze Apts, Bandra West, Mumbai, MH 400050',
          paymentMethod: 'UPI (GPay)'
        }
      ];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('glow_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('glow_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('glow_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('glow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('glow_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('glow_coupon');
    }
  }, [appliedCoupon]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your bag`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Free shipping threshold: ₹999
  const freeShippingThreshold = 999;
  const freeShippingLeft = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 99;

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountFixed) {
      discountAmount = appliedCoupon.discountFixed;
    }
  }
  discountAmount = Math.min(discountAmount, cartSubtotal);

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!DEFAULT_COUPONS[cleanCode]) {
      showToast('Invalid coupon code. Try GLOW10 or WELCOME20', 'error');
      return false;
    }
    const coupon = { code: cleanCode, ...DEFAULT_COUPONS[cleanCode] };
    if (cartSubtotal < coupon.minSpend) {
      showToast(`Minimum order of ₹${coupon.minSpend.toLocaleString('en-IN')} required for this coupon`, 'error');
      return false;
    }
    setAppliedCoupon(coupon);
    showToast(`Promo code ${cleanCode} applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== product.id));
      showToast(`Removed from your wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product.id]);
      showToast(`Added to your wishlist`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // User Authentication
  const loginUser = (email, name = 'Valued Customer') => {
    setUser({
      name,
      email,
      phone: '+91 98201 00000',
      isLoggedIn: true,
    });
    setIsAuthOpen(false);
    showToast(`Welcome back, ${name}!`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  // Add Review
  const addProductReview = (productId, review) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newReviews = [review, ...(p.reviews || [])];
        const newRating = (newReviews.reduce((acc, r) => acc + r.rating, 0) / newReviews.length).toFixed(1);
        return {
          ...p,
          reviews: newReviews,
          reviewCount: newReviews.length,
          rating: parseFloat(newRating)
        };
      }
      return p;
    }));
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  // Place Order
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Confirmed - Processing',
      total: cartTotal,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      trackingNumber: `GC-TRACK-${Math.floor(100000 + Math.random() * 900000)}`,
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider value={{
      // Theme
      isDark,
      toggleTheme,
      // Data
      products,
      stores,
      // Navigation
      currentPage,
      selectedProductId,
      shopCategoryFilter,
      navigateTo,
      setShopCategoryFilter,
      // Cart
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartSubtotal,
      cartItemCount,
      freeShippingThreshold,
      freeShippingLeft,
      shippingFee,
      appliedCoupon,
      discountAmount,
      cartTotal,
      applyCouponCode,
      removeCoupon,
      // Wishlist
      wishlist,
      toggleWishlist,
      isInWishlist,
      // Toasts
      toasts,
      showToast,
      removeToast,
      // User & Orders
      user,
      loginUser,
      logoutUser,
      orders,
      placeOrder,
      addProductReview,
      // Modals
      isSearchOpen,
      setIsSearchOpen,
      isAuthOpen,
      setIsAuthOpen,
      authMode,
      setAuthMode,
      isConsultationOpen,
      setIsConsultationOpen,
      quickViewProduct,
      setQuickViewProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};
