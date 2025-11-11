// app/watchlist/page.tsx
'use client';

import { useWatchlist } from '@/hooks/useWatchlist';
import WatchlistButton from '@/components/WatchlistButton';
import { TrendingUp, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function WatchlistPage() {
  const { watchlist, loading, error } = useWatchlist();
  const [stockData, setStockData] = useState<Record<string, StockData>>({});
  const [loadingPrices, setLoadingPrices] = useState(false);

  useEffect(() => {
    if (watchlist.length > 0) {
      fetchStockPrices();
    }
  }, [watchlist]);

  const fetchStockPrices = async () => {
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
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          Error loading watchlist: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
        <p className="text-gray-600">
          Track your favorite stocks and receive daily updates
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Start adding stocks by clicking the star icon on any stock page
          </p>
          <Link
            href="/stocks"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Stocks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlist.map((symbol) => {
            const stock = stockData[symbol];
            const isPositive = stock ? stock.change >= 0 : true;

            return (
              <Link
                key={symbol}
                href={`/stocks/${symbol}`}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue-600 transition">
                    {symbol}
                  </h3>
                  <WatchlistButton symbol={symbol} className="opacity-0 group-hover:opacity-100" />
                </div>
                
                {loadingPrices ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                ) : stock ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">${stock.price.toFixed(2)}</span>
                      <div className={`flex items-center gap-1 text-sm font-semibold ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)}</span>
                        <span>({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No data available</div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-blue-600 text-sm font-medium group-hover:underline">
                    View Details →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}