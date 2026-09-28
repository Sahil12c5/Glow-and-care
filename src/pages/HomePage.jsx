import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Star,
  Calendar,
  Gift,
  Flame,
  ChevronRight,
  ExternalLink,
  Heart
} from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';

export const HomePage = () => {
  const { products, navigateTo, setIsConsultationOpen } = useStore();

  // Active Tab for product showcase
  const [activeTab, setActiveTab] = useState('bestsellers');

  // Countdown timer for special offers banner
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const displayedProducts = activeTab === 'bestsellers' ? bestSellers : newArrivals;

  const categories = [
    {
      name: 'Skincare',
      count: '8 Formulations',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
      desc: 'Clean active serums, barrier repair crèmes & soothing rose cleansers'
    },
    {
      name: 'Hair Care',
      count: '4 Rituals',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop',
      desc: 'Argan scalp elixirs, volumizing shampoos & peptide hair masks'
    },
    {
      name: 'Makeup',
      count: '4 Enhancers',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop',
      desc: 'Dewy pH lip oils, mineral SPF 50 tints & pressed powders'
    },
    {
      name: 'Body Care',
      count: '3 Delights',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop',
      desc: 'Whipped sandalwood soufflés, dry body oils & rose salt polish'
    },
    {
      name: "Men's Grooming",
      count: '3 Essentials',
      image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=600&auto=format&fit=crop',
      desc: 'Alcohol-free aftershave balms, beard oils & charcoal face wash'
    },
    {
      name: 'Gift Sets',
      count: '2 Collections',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
      desc: 'Curated royal ritual boxes & travel vanity sets'
    }
  ];

  const testimonials = [
    {
      name: 'Ananya Mehra',
      location: 'Mumbai (Flagship Visitor)',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      rating: 5,
      comment: 'The in-store AI Dermascan consultation at their Bandra sanctuary blew me away. The esthetician pinpointed my barrier dehydration and recommended the Velvet Peptide Crème. My skin has never looked this luminous and plump!'
    },
    {
      name: 'Dr. Radhika Sen',
      location: 'New Delhi',
      role: 'Dermatologist & Customer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
      rating: 5,
      comment: 'As a dermatologist, I scrutinize ingredient decks ruthlessly. Glow and Care formulations are genuinely remarkable—zero synthetic fillers, potent 15% Vitamin C, and clean lipid ratios that honor skin biology.'
    },
    {
      name: 'Rohan Kapoor',
      location: 'Bengaluru',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      rating: 5,
      comment: 'The Cedarwood & Vetiver aftershave balm solved years of razor irritation for me in 48 hours. Plus, their click-and-collect pickup at the Indiranagar store was ready in 20 minutes with zero hassle.'
    }
  ];

  const instagramPosts = [
    {
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop',
      likes: '1.2k',
      caption: 'Golden hour rituals with our Botanical Radiance Elixir'
    },
    {
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=500&auto=format&fit=crop',
      likes: '984',
      caption: 'A peek inside our Bandra Flagship experience sanctuary'
    },
    {
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500&auto=format&fit=crop',
      likes: '1.8k',
      caption: 'Whipped cloud texture that your skin barrier will adore'
    },
    {
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=500&auto=format&fit=crop',
      likes: '2.1k',
      caption: 'pH-activated glass lip stain in morning light'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-20 sm:pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-24 bg-gradient-to-b from-cream-100/80 via-cream-50 to-cream-50 dark:from-[#18231f] dark:via-[#141a17] dark:to-[#141a17]">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-gold-300/20 dark:bg-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-blush-300/25 dark:bg-blush-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-sage-100/90 dark:bg-sage-950/70 border border-sage-300/60 dark:border-sage-800 text-sage-800 dark:text-gold-300 text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-500" />
                <span>The New Science of Botanical Radiance</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-cream-100 leading-[1.18]">
                Glow Naturally. <br />
                <span className="italic font-normal text-sage-700 dark:text-gold-300">Care Deeply.</span>
              </h1>

              <p className="text-sm sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Where clinical botanical efficacy meets sensorial luxury. Formulated with potent bio-actives, cold-pressed elixirs, and zero harsh fillers. Available online and in our physical sanctuaries.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full sage-gradient-btn text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sage-700/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group min-h-[44px]"
                >
                  <span>Shop The Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('stores')}
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border-2 border-sage-700/40 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 hover:bg-cream-100 dark:hover:bg-stone-800 text-stone-800 dark:text-cream-100 font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 text-sage-600 dark:text-gold-400" />
                  <span>Visit Our Store</span>
                </button>
              </div>

              {/* Trust Highlight Chips */}
              <div className="pt-4 sm:pt-6 border-t border-cream-200/90 dark:border-stone-800/90 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
                <div>
                  <div className="font-serif text-lg sm:text-2xl font-bold text-sage-800 dark:text-gold-300">100%</div>
                  <div className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400">Authentic & Clean</div>
                </div>
                <div>
                  <div className="font-serif text-lg sm:text-2xl font-bold text-sage-800 dark:text-gold-300">4.9 / 5</div>
                  <div className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400">1,200+ Reviews</div>
                </div>
                <div>
                  <div className="font-serif text-lg sm:text-2xl font-bold text-sage-800 dark:text-gold-300">3 Boutiques</div>
                  <div className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400">Mumbai • Delhi • BLR</div>
                </div>
              </div>

            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 dark:border-stone-800/80 bg-cream-200">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop"
                  alt="Glow and Care Store Skincare"
                  className="w-full h-full object-cover"
                />

                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

                {/* Floating Product Highlight Card */}
                <div
                  onClick={() => navigateTo('product', 'gc-101')}
                  className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 p-3 sm:p-4 rounded-2xl glass-panel shadow-xl flex items-center justify-between gap-2 sm:gap-3 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-gold-300">
                      <img
                        src="/logo.jpg"
                        alt="Product badge"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-gold-600 dark:text-gold-400">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gold-400 text-gold-400" />
                        <span>Award-Winning Radiance Elixir</span>
                      </div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-stone-900 dark:text-white line-clamp-1">
                        Botanical Radiance Serum
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-300 font-semibold">
                        ₹1,499 <span className="line-through text-stone-400 font-normal">₹1,999</span>
                      </p>
                    </div>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-full bg-sage-600 text-white shrink-0 shadow">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Floating Top In-Store Consultation Badge */}
                <div
                  onClick={() => setIsConsultationOpen(true)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md border border-gold-300/40 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-sage-900 dark:text-gold-300 cursor-pointer hover:scale-105 transition-transform"
                >
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-500" />
                  <span>Free Skin Scan</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
            Curated Formulations
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 mt-1 sm:mt-2">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 sm:mt-2">
            Targeted rituals designed to nurture your skin, scalp, and soul with pure botanicals.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigateTo('shop', cat.name)}
              className="group cursor-pointer flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-2 sm:mb-3 p-0.5 sm:p-1 border-2 border-cream-300/70 dark:border-stone-700 group-hover:border-sage-500 dark:group-hover:border-gold-400 transition-colors bg-cream-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xs sm:text-base font-bold text-stone-900 dark:text-cream-100 group-hover:text-sage-600 dark:group-hover:text-gold-300 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[10px] sm:text-[11px] text-stone-400 dark:text-stone-500 mt-0.5 font-medium hidden sm:block">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS & NEW ARRIVALS TABBED SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
              Customer Favorites
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 mt-0.5 sm:mt-1">
              Radiance Bestsellers
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="flex p-1 bg-cream-200/80 dark:bg-stone-900 rounded-2xl">
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 sm:px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-cream-100 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('newarrivals')}
              className={`px-4 sm:px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'newarrivals'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-cream-100 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Grid (2 columns on mobile, 4 on desktop!) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 border-sage-700/60 dark:border-stone-700 text-sage-800 dark:text-gold-300 font-bold text-xs uppercase tracking-wider hover:bg-sage-700 hover:text-white dark:hover:bg-gold-500 dark:hover:text-stone-950 transition-all shadow-sm min-h-[44px]"
          >
            <span>Explore All 12 Formulations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. SPECIAL OFFERS BANNER WITH LIVE COUNTDOWN TIMER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sage-900 via-sage-800 to-[#283a34] text-white p-5 sm:p-12 lg:p-16 shadow-2xl border border-gold-400/20">
          {/* Subtle background graphics */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-[11px] sm:text-xs font-bold border border-gold-400/30">
                <Flame className="w-3.5 h-3.5" />
                <span>Limited Boutique & Online Flash Radiance Sale</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Unlock Up To 25% Off <br />
                <span className="italic text-gold-300">Complete Radiance Rituals</span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed">
                Experience our dermatologist-approved 4-step ritual box or refresh your daily Vitamin C elixirs. Complimentary luxury gift bag and miniature travel cleanser with every order above ₹1,999.
              </p>

              {/* Countdown Clocks */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <div className="flex flex-col items-center justify-center w-13 h-13 sm:w-16 sm:h-16 p-2 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
                  <span className="font-serif text-base sm:text-2xl font-bold text-gold-300">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase text-stone-400">Hours</span>
                </div>
                <span className="font-serif text-xl sm:text-2xl text-gold-400">:</span>
                <div className="flex flex-col items-center justify-center w-13 h-13 sm:w-16 sm:h-16 p-2 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
                  <span className="font-serif text-base sm:text-2xl font-bold text-gold-300">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase text-stone-400">Mins</span>
                </div>
                <span className="font-serif text-xl sm:text-2xl text-gold-400">:</span>
                <div className="flex flex-col items-center justify-center w-13 h-13 sm:w-16 sm:h-16 p-2 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
                  <span className="font-serif text-base sm:text-2xl font-bold text-gold-300">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase text-stone-400">Secs</span>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gold-400 hover:bg-gold-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-gold-400/20 min-h-[44px]"
                >
                  Claim Special Offer
                </button>
                <div className="text-xs text-stone-300 flex items-center gap-1.5">
                  <span>Use Coupon:</span>
                  <span className="font-mono bg-white/15 px-2.5 py-1 rounded font-bold text-white border border-white/20">
                    WELCOME20
                  </span>
                </div>
              </div>
            </div>

            {/* Right Product Image Spotlight */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden border-2 border-gold-300/30 shadow-2xl relative bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=700&auto=format&fit=crop"
                  alt="Royal Ritual Gift Hamper"
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 bg-stone-900/90 backdrop-blur-md">
                  <span className="text-[11px] uppercase tracking-wider text-gold-400 font-bold">Featured Box</span>
                  <h4 className="font-serif text-base font-bold text-white">The Royal Glow Ritual Gift Set</h4>
                  <p className="text-xs text-stone-400 mt-0.5">4 Full-size products + Jade Roller</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-lg text-gold-300">₹3,499 <span className="line-through text-xs text-stone-500 font-normal">₹4,599</span></span>
                    <button
                      onClick={() => navigateTo('product', 'gc-110')}
                      className="text-xs bg-gold-400 hover:bg-gold-500 text-stone-950 font-bold px-3 py-1.5 rounded-lg"
                    >
                      View Hamper
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (VALUES & PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
            Our Standard of Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 mt-2">
            Why Discerning Clients Choose Us
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            We bridge the gap between clean botanical integrity and clinic-level performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-stone-800 flex items-center justify-center text-sage-700 dark:text-gold-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
              100% Genuine & Clean
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              Every formula is made from certified botanicals, clinical actives, and free from parabens, phthalates, and harsh sulfates.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-stone-800 flex items-center justify-center text-sage-700 dark:text-gold-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
              Free Express Shipping
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              Enjoy complimentary doorstep shipping on all orders over ₹999 with premium temperature-controlled eco packaging.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-stone-800 flex items-center justify-center text-sage-700 dark:text-gold-400 mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
              14-Day Radiance Guarantee
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              Not completely delighted with your skin transformation? Exchange or return hassle-free online or in our boutique.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-stone-800 flex items-center justify-center text-sage-700 dark:text-gold-400 mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
              Expert In-Store Advice
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              Access complimentary AI skin profiling and 1-on-1 consultations with licensed estheticians at our physical stores.
            </p>
          </div>
        </div>
      </section>

      {/* 6. ONLINE + OFFLINE SECTION (PHYSICAL STORE SHOWCASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1a231f] rounded-3xl border border-cream-200/90 dark:border-stone-800 p-8 sm:p-12 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-gold-400">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span>Experience Our Boutiques In-Person</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 leading-tight">
                Step Inside Our Flagship Sanctuary
              </h2>

              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                Discover the tactile sensation of our textures, experience calming eucalyptus aromas, and receive complimentary multi-spectral skin scans with our master estheticians.
              </p>

              <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100 text-sm">Bandra Flagship Sanctuary</strong>
                    <span>Shop 4 & 5, Hill Road, Bandra West, Mumbai, MH 400050 (Opp. St. Peter&apos;s Church)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0" />
                  <span>Open 7 Days a Week: 10:00 AM – 9:30 PM</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sage-600 dark:text-gold-400 shrink-0" />
                  <span>Concierge Hotline: +91 98201 44521</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="px-6 py-3.5 rounded-full sage-gradient-btn text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  Book Free Consultation
                </button>

                <a
                  href="https://maps.google.com/?q=Hill+Road+Bandra+West+Mumbai"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-full border border-cream-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs uppercase tracking-wider hover:bg-cream-100 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => navigateTo('stores')}
                  className="px-6 py-3.5 rounded-full bg-cream-100 dark:bg-stone-800 text-sage-800 dark:text-gold-300 font-bold text-xs uppercase tracking-wider hover:bg-sage-100 transition-colors"
                >
                  All 3 Stores
                </button>
              </div>
            </div>

            {/* Right: Store Showcase Image & Embedded Map Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] shadow-md border border-cream-200 dark:border-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop"
                  alt="Glow & Care Store Sanctuary interior"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 dark:bg-stone-900 border border-cream-200 dark:border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    Boutique Currently Open • In-Store Pickup in 60 Mins
                  </span>
                </div>
                <button
                  onClick={() => navigateTo('stores')}
                  className="text-sage-700 dark:text-gold-300 font-bold hover:underline"
                >
                  View Details & Map →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
            Real Stories, Real Radiance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 mt-2">
            Loved By Skin Enthusiasts
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            Over 25,000+ satisfied clients across our physical sanctuaries and online store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-gold-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 italic leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-200/80 dark:border-stone-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-gold-300"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-cream-100">
                    {t.name}
                  </h4>
                  <span className="text-[11px] text-sage-600 dark:text-gold-400 block font-medium">
                    {t.role} • {t.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTAGRAM COMMUNITY GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
              #GlowAndCareRitual
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-cream-100 mt-1">
              Join Our Radiance Community
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sage-700 dark:text-gold-300 hover:underline"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @GlowAndCareStore</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-100 dark:bg-stone-800 shadow-sm cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-white">
                <InstagramIcon className="w-6 h-6 text-gold-300 mb-2" />
                <p className="text-xs font-medium line-clamp-2">{post.caption}</p>
                <div className="flex items-center gap-1 text-[11px] text-gold-300 mt-2">
                  <Heart className="w-3.5 h-3.5 fill-gold-400" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
