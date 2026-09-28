import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Heart,
  Leaf,
  ShieldCheck,
  Award,
  ArrowRight,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo, setIsConsultationOpen } = useStore();

  const values = [
    {
      icon: <Leaf className="w-6 h-6 text-sage-600 dark:text-gold-400" />,
      title: 'Botanical Purity, Clinical Efficacy',
      desc: 'We never compromise between nature and science. Every formula blends bio-compatible cold-pressed plant oils with clinically validated actives like Vitamin C, Ceramides, and Bakuchiol.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sage-600 dark:text-gold-400" />,
      title: 'Zero Harsh Compromises',
      desc: 'Formulated strictly without parabens, synthetic sulfates, mineral oils, formaldehydes, or micro-plastics. Every batch undergoes dermatologist safety profiling.'
    },
    {
      icon: <Award className="w-6 h-6 text-sage-600 dark:text-gold-400" />,
      title: 'Ethical & Cruelty-Free',
      desc: 'Certified cruelty-free by international welfare bodies. We never test on animals, and our suppliers adhere to fair-trade ethical botanical harvesting.'
    },
    {
      icon: <Heart className="w-6 h-6 text-sage-600 dark:text-gold-400" />,
      title: 'Sensorial Self-Care Rituals',
      desc: 'Skincare should never feel like a chore. From whipped soufflé creams to damask rose elixirs, each product is crafted to transform daily routines into mindful sanctuary moments.'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-24 sm:pb-16">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50 dark:from-[#18231f] dark:via-[#141a17] dark:to-[#141a17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto shadow-md border-2 border-gold-300">
            <img src="/logo.jpg" alt="Glow & Care Logo" className="w-full h-full object-cover" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
            Our Origin & Philosophy
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-cream-100 leading-tight">
            Glow Naturally. <br />
            <span className="italic font-normal text-sage-700 dark:text-gold-300">Care Deeply.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
            Founded with a singular conviction: genuine skincare radiance isn&apos;t achieved by harsh abrasives or synthetic camouflage, but through botanical nourishment that honors your skin barrier.
          </p>
        </div>
      </section>

      {/* Story & Founder Letter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-xl border-4 border-white dark:border-stone-800 bg-cream-200">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop"
                alt="Founder of Glow and Care Store"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl glass-panel shadow-lg max-w-xs hidden sm:block">
              <span className="text-xs font-serif font-bold text-sage-800 dark:text-gold-300 block">
                &ldquo;True glow is the quiet confidence of healthy skin.&rdquo;
              </span>
              <span className="text-[10px] text-stone-500 mt-1 block">
                Aria Sterling, Founder & Lead Formulator
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
              The Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 leading-tight">
              From an Apothecary Studio to Physical Boutiques
            </h2>
            <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              <p>
                Glow and Care Store began in a small botanical compounding workshop in Mumbai. Frustrated by commercial beauty products laden with synthetic perfumes and sensitizing alcohols, Aria Sterling partnered with bio-chemists to formulate elixirs rooted in barrier-friendly lipid restoration.
              </p>
              <p>
                What started as bespoke serums for close clients grew into our flagship sanctuary on Hill Road, Bandra. Today, we bridge physical touchpoints where clients experience free multi-spectral skin scans, with our seamless nationwide digital store.
              </p>
              <p>
                Whether you walk into our tranquil boutiques in Mumbai, Delhi, or Bengaluru, or unbox your gold-embossed order at home, you receive the same uncompromising craftsmanship.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3.5 rounded-full sage-gradient-btn text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                Shop Our Formulations
              </button>
              <button
                onClick={() => navigateTo('stores')}
                className="px-6 py-3.5 rounded-full border border-cream-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-cream-100 dark:hover:bg-stone-800 transition-colors"
              >
                Visit Our Sanctuaries
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-gold-400">
            Our Guiding Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 mt-2">
            The Glow & Care Promise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white dark:bg-[#1a231f] border border-cream-200/90 dark:border-stone-800 shadow-sm space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-sage-50 dark:bg-stone-800 flex items-center justify-center mb-2">
                {v.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
                {v.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* In-Store Sanctuary Experience Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sage-800 to-sage-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Personalized In-Person Care
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Experience the Touch of Clinical Botanical Care
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Book a complimentary 30-minute skin consultation at any of our 3 boutique sanctuaries. Enjoy customized hydration mapping and exclusive in-store formulation blending.
            </p>
          </div>
          <button
            onClick={() => setIsConsultationOpen(true)}
            className="px-8 py-4 rounded-full bg-gold-400 hover:bg-gold-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105 shrink-0"
          >
            Book Free In-Store Visit
          </button>
        </div>
      </section>

    </div>
  );
};
