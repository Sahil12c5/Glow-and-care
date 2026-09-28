import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, Mail, User, Sparkles, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    authMode,
    setAuthMode,
    loginUser
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const displayName = authMode === 'signup' ? name || 'New Radiant Member' : 'Elena Vance';
    loginUser(email, displayName);
  };

  const handleFillDemo = () => {
    setEmail('elena.vance@example.com');
    setPassword('••••••••••••');
    setName('Elena Vance');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthOpen(false)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white dark:bg-[#1a231f] rounded-3xl shadow-2xl border border-cream-200 dark:border-stone-800 overflow-hidden z-10 p-6 sm:p-8">
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-3 border-2 border-gold-300 shadow">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100">
            {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {authMode === 'login'
              ? 'Access your glow orders, wishlist & tier privileges'
              : 'Unlock exclusive member rewards and personalized skin advice'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-cream-100 dark:bg-stone-900 p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'login'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-cream-100 shadow-sm'
                : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-cream-100 shadow-sm'
                : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Vance"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-sage-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-sage-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-cream-300 dark:border-stone-700 bg-cream-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-sage-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl sage-gradient-btn text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>{authMode === 'login' ? 'Sign In to Your Account' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Fill button */}
        <div className="mt-4 pt-4 border-t border-cream-200 dark:border-stone-800 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-sage-700 dark:text-gold-300 font-semibold hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Click here to autofill Demo VIP Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
