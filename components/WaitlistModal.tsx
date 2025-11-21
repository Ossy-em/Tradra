// components/WaitlistModal.tsx
'use client';
import { useState } from 'react';
import { X, Loader2, CheckCircle2, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';

export default function WaitlistModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: 'pro' }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to join waitlist');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail('');
      }, 2500);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl max-w-lg w-full relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -z-10" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {success ? (
          // Success State
          <div className="text-center py-12 px-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list! 🎉</h3>
            <p className="text-gray-400 mb-6">
              We&apos;ll notify you as soon as Pro features launch.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-gray-400">Early access reserved</span>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-8 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-xs text-gray-400 font-medium">Limited spots available</span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                Join the Pro Waitlist
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Be the first to unlock advanced features and take your investing to the next level.
              </p>
            </div>

            {/* Features */}
            <div className="px-8 pb-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-lg">
                <TrendingUp className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-xs text-gray-400">Portfolio Integration</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-lg">
                <Sparkles className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-xs text-gray-400">AI Watchlist Summaries</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-lg">
                <Zap className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-xs text-gray-400">Real-time Alerts</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-lg">
                <Shield className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-xs text-gray-400">Premium Features</span>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-colors"
                  />
                </div>

                {error && (
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-white text-black font-medium rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-xl shadow-white/10"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Joining waitlist...
                    </>
                  ) : (
                    <>
                      Reserve Your Spot
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                No spam. Ever. Unsubscribe anytime.
              </p>
            </div>

            {/* Footer Stats */}
            <div className="px-8 pb-8 pt-4 border-t border-white/5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">2.5K+</div>
                  <div className="text-xs text-gray-500">On waitlist</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">Q2 2025</div>
                  <div className="text-xs text-gray-500">Launch date</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">Free</div>
                  <div className="text-xs text-gray-500">Early access</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}