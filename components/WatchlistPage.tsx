'use client';

import { useWatchlist } from '@/hooks/useWatchlist';
import WatchlistButton from '@/components/WatchlistButton';
import { TrendingUp, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react'; 

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function WatchlistPage() {
  const { watchlist, loading, error, watchlistDetails } = useWatchlist();
  const [stockData, setStockData] = useState<Record<string, StockData>>({});
  const [loadingPrices, setLoadingPrices] = useState(false);


  const fetchStockPrices = useCallback(async () => {
    setLoadingPrices(true);
    try {
      const response = await fetch('/api/stocks/batch-quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols: watchlist }),
      });

      if (response.ok) {
        const data = await response.json();
        setStockData(data);
      }
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    } finally {
      setLoadingPrices(false);
    }
  }, [watchlist]); // Add watchlist as dependency

  useEffect(() => {
    if (watchlist.length > 0) {
      fetchStockPrices();
    }
  }, [watchlist, fetchStockPrices]); // Add fetchStockPrices to dependencies

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500">
          Error loading watchlist: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
          My Watchlist
        </h1>
        <p className="text-gray-400">
          Track your favorite stocks with real-time updates
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Start building your watchlist
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Search for stocks and add them to your watchlist to track their performance in real-time
            </p>
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: true,
                  ctrlKey: true,
                });
                window.dispatchEvent(event);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:scale-105 transition-transform"
            >
              Search Stocks
            </button>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-sm text-gray-500">or press</span>
              <kbd className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400 font-mono">
                ⌘K
              </kbd>
              <span className="text-sm text-gray-500">to search</span>
            </div>
          </div>
        </div>
      ) : (
        <>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Stocks</p>
                  <p className="text-2xl font-bold text-white">{watchlist.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <ArrowUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Gainers</p>
                  <p className="text-2xl font-bold text-white">
                    {Object.values(stockData).filter(s => s.change >= 0).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Losers</p>
                  <p className="text-2xl font-bold text-white">
                    {Object.values(stockData).filter(s => s.change < 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlistDetails.map((item) => {
              const symbol = item.symbol;
              const stock = stockData[symbol];
              const isPositive = stock ? stock.change >= 0 : true;

              return (
                <Link
                  key={symbol}
                  href={`/stocks/${symbol}`}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
                        {symbol}
                      </h3>
                    </div>
                    <WatchlistButton 
                      symbol={symbol} 
                      company={item.company}
                      className="opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                  
                  {loadingPrices ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                    </div>
                  ) : stock ? (
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-white">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-semibold ${
                        isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {isPositive ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                        <span>
                          {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <p className="text-sm text-gray-500">No data available</p>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors flex items-center gap-1">
                      View Details
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>

           
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/0 to-purple-500/0 group-hover:from-teal-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none -z-10" />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}