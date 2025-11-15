import { Shield, Zap, Users, Award } from 'lucide-react';
import Link from 'next/link';

const badges = [
  { icon: Shield, text: 'Bank-level Security' },
  { icon: Zap, text: 'Real-time Data' },
  { icon: Users, text: 'Built for Investors' },
  { icon: Award, text: 'Powered by TradingView' }
];

const TrustBadges = () => {
  return (
    <section id="pricing" className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="container relative">
        {/* Trust Badges */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Built for serious investors
            </h3>
            <p className="text-gray-400">Trusted infrastructure, real-time data</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center gap-3 p-6 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-400 text-center font-medium">{badge.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-xl blur-xl" />
            
            <div className="relative bg-white/[0.02] border border-white/10 rounded-xl p-8 md:p-12 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Start completely free
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Get full access to real-time data, watchlists, and comparisons. No credit card required.
                </p>
                
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="text-4xl font-bold text-white mb-1">$0</div>
                    <div className="text-xs text-gray-500">Forever free</div>
                  </div>
                  <div className="text-gray-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="text-4xl font-bold text-white mb-1">$?</div>
                    <div className="text-xs text-gray-500">Premium soon</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link 
                    href="/auth/sign-up"
                    className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:scale-105 transition-transform"
                  >
                    Get Started Free
                  </Link>
                  <button className="px-8 py-3 bg-white/5 text-white border border-white/10 font-medium rounded-lg hover:bg-white/10 transition-colors">
                    Join Waitlist for Pro
                  </button>
                </div>

                <p className="mt-6 text-xs text-gray-500">
                  Free tier includes everything you need to track and analyze stocks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;