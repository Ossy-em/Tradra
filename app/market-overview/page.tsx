import TradingViewWidget from '@/components/TradingViewWidget';
import { MARKET_OVERVIEW_WIDGET_CONFIG } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Eye, GitCompare } from 'lucide-react';
import {TradraLogo1, TradraLogo6} from "@/components/logo/TradraLog";

const linkURL = 'https://s3.tradingview.com/external-embedding/embed-widget-';

export default function PublicMarketOverview() {
  return (
    <div className="min-h-screen bg-black">

      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="container">
          <div className="flex justify-between items-center h-16">
          <Link href="/" className="group">
  <TradraLogo1 className="transition-transform group-hover:scale-105" />
</Link>

            <div className="flex items-center gap-3">
              <Link 
                href="/sign-in" 
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/sign-up" 
                className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
      
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-400 font-medium">Live market data</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Global Market Overview
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Real-time data, charts, and heatmaps powered by TradingView. 
              No login required.
            </p>


            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-lg backdrop-blur-sm">
              <span className="text-sm text-gray-500">Want more?</span>
              <Link href="/sign-up" className="text-sm text-white font-medium hover:text-gray-300 transition-colors">
                Sign up free
              </Link>
              <span className="text-sm text-gray-500">for watchlists & comparisons</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
     
            <div className="relative bg-white/[0.02] border border-white/5 rounded-xl p-1 backdrop-blur-sm overflow-hidden">
              <div className="bg-black/40 rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Market Overview</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                </div>
                <TradingViewWidget
                  title=""
                  scriptUrl={`${linkURL}market-overview.js`}
                  config={MARKET_OVERVIEW_WIDGET_CONFIG}
                  height={550}
                />
              </div>
            </div>

 
            <div className="relative bg-white/[0.02] border border-white/5 rounded-xl p-1 backdrop-blur-sm overflow-hidden">
              <div className="bg-black/40 rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Stock Heatmap</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                </div>
                <TradingViewWidget
                  title=""
                  scriptUrl={`${linkURL}stock-heatmap.js`}
                  config={MARKET_OVERVIEW_WIDGET_CONFIG}
                  height={550}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                Unlock the full experience
              </h2>
              <p className="text-gray-400">
                Create a free account to access these powerful features
              </p>
            </div>

  
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Personal Watchlist</h3>
                <p className="text-sm text-gray-400">
                  Track your favorite stocks with custom alerts and notifications
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <GitCompare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Stock Comparison</h3>
                <p className="text-sm text-gray-400">
                  Compare up to 3 stocks side-by-side with detailed metrics
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI Insights</h3>
                <p className="text-sm text-gray-400">
                  Get intelligent recommendations and portfolio analytics
                </p>
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-xl blur-xl" />
              
              <div className="relative bg-white/[0.02] border border-white/10 rounded-xl p-8 md:p-12 backdrop-blur-sm text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready to get started?
                </h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Join thousands of investors making smarter decisions with Tradra
                </p>
                
                <Link 
                  href="/sign-up"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-medium rounded-lg hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all group"
                >
                  Create Free Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="mt-6 text-xs text-gray-500">
                  No credit card required • Free forever
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

  ]
      <footer className="relative border-t border-white/5 py-8 px-4">
        <div className="absolute inset-0 bg-black" />
        <div className="container relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/landing" className="text-lg font-bold text-white hover:text-gray-300 transition-colors">
             <TradraLogo6 /> 
            </Link>
            <div className="flex gap-6">
              <Link href="/landing" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                Home
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}