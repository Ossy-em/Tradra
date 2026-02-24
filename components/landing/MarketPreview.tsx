import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const MarketPreview = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs text-gray-400 font-medium">No signup required</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              See it in action
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experience live market data and powerful analytics before you commit
            </p>
          </div>

          {/* Preview Card */}
          <div className="relative">
            <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1 backdrop-blur-sm">
              <div className="rounded-lg bg-black/40 backdrop-blur-xl border border-white/5 overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  {/* <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div> */}
                  <div className="flex-1 mx-4">
                    <div className="h-6 bg-white/5 rounded text-xs flex items-center px-3 text-gray-500">
                      tradra.app/market-overview
                    </div>
                  </div>
                </div>
                
                {/* Preview content */}
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="h-16 bg-white/5 rounded border border-white/5 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">S&P 500</div>
                        <div className="text-sm font-bold text-green-500">+1.2%</div>
                      </div>
                    </div>
                    <div className="h-16 bg-white/5 rounded border border-white/5 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">NASDAQ</div>
                        <div className="text-sm font-bold text-green-500">+0.8%</div>
                      </div>
                    </div>
                    <div className="h-16 bg-white/5 rounded border border-white/5 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">DOW</div>
                        <div className="text-sm font-bold text-red-500">-0.3%</div>
                      </div>
                    </div>
                    <div className="h-16 bg-white/5 rounded border border-white/5 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">CRYPTO</div>
                        <div className="text-sm font-bold text-green-500">+2.1%</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-32 bg-white/5 rounded border border-white/5 mb-3" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-24 bg-white/5 rounded border border-white/5" />
                    <div className="h-24 bg-white/5 rounded border border-white/5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Live badge */}
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-white">Live Data</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link 
              href="/market-overview"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-medium rounded-lg hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all group"
            >
              Explore Market Overview
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="mt-6 text-sm text-gray-500">
              Sign up to unlock watchlists, comparisons, and AI-powered insights
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPreview;