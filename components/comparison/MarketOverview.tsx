'use client';
import { useEffect, useRef } from 'react';
import { TrendingUp, Plus, Sparkles } from 'lucide-react';
import { Stock } from '@/types/stocks';

type Props = {
  onStockClick: (stock: Stock) => void;
};

const popularStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'Consumer' },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', type: 'Automotive' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', type: 'Technology' },
];

const MarketOverview = ({ onStockClick }: Props) => {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="relative bg-white/[0.02] border border-white/5 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white">Popular Stocks</h2>
        </div>
        <p className="text-sm text-gray-400">Click any stock to add it to your comparison</p>
      </div>

      {/* Popular Stocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularStocks.map(stock => (
          <button
            key={stock.symbol}
            onClick={() => onStockClick(stock)}
            className="group relative bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
                  {stock.symbol}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">{stock.name}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">
                {stock.exchange}
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">
                {stock.type}
              </span>
            </div>
            
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/0 to-purple-500/0 group-hover:from-teal-500/5 group-hover:to-purple-500/5 transition-all duration-300 -z-10" />
          </button>
        ))}
      </div>

      {/* TradingView Market Widget */}
      <div className="relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Market Overview</h3>
            <p className="text-sm text-gray-400">Live indices data</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400 font-medium">Live</span>
          </div>
        </div>
        <div className="pointer-events-none bg-black/20">
          <TradingViewMarketWidget />
        </div>
      </div>
    </div>
  );
};

const TradingViewMarketWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      width: '100%',
      height: '400',
      isTransparent: false,
      showSymbolLogo: true,
      plotLineColorGrowing: 'rgba(16, 185, 129, 1)',
      plotLineColorFalling: 'rgba(255, 73, 91, 1)',
      gridLineColor: 'rgba(42, 46, 57, 0)',
      tabs: [
        {
          title: 'Indices',
          symbols: [
            { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
            { s: 'FOREXCOM:NSXUSD', d: 'US 100' },
            { s: 'FOREXCOM:DJI', d: 'Dow 30' }
          ]
        }
      ]
    });

    widgetRef.current.appendChild(script);
  }, []);

  return <div ref={widgetRef} className="tradingview-widget-container__widget" />;
};

export default MarketOverview;