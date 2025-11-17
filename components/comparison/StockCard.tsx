'use client';
import { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';
import { Stock, StockQuote, TimeRange } from '@/types/stocks';
import Link from 'next/link';

interface StockMetrics {
  marketCapitalization?: number;
  peBasicExclExtraTTM?: number;
  '52WeekHigh'?: number;
  '52WeekLow'?: number;
}

type Props = {
  stock: Stock;
  onRemove: (symbol: string) => void;
  timeRange: TimeRange;
  apiKey: string;
};

const StockCard = ({ stock, onRemove, timeRange, apiKey }: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [metrics, setMetrics] = useState<StockMetrics | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!apiKey) {
      setLoading(false);
      return;
    }

    const fetchQuote = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          setQuote(data);
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 30000);
    return () => clearInterval(interval);
  }, [stock.symbol, apiKey]);


  useEffect(() => {
    if (!apiKey) return;

    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/metric?symbol=${stock.symbol}&metric=all&token=${apiKey}`
        );
        if (response.ok) {
          const data: { metric: StockMetrics } = await response.json();
          setMetrics(data.metric);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, [stock.symbol, apiKey]);


  useEffect(() => {
    if (!chartContainerRef.current) return;

    const rangeMap: Record<TimeRange, string> = {
      '1D': '1D', '5D': '5D', '1M': '1M', '3M': '3M',
      '6M': '6M', '1Y': '12M', '5Y': '60M', 'MAX': 'ALL'
    };

    chartContainerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: stock.symbol,
      width: '100%',
      height: '280',
      locale: 'en',
      dateRange: rangeMap[timeRange],
      colorTheme: 'dark',
      isTransparent: false,
      autosize: false,
    });

    chartContainerRef.current.appendChild(script);
  }, [stock.symbol, timeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toFixed(2);
  };

  return (
    <div className="relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">{stock.symbol}</h3>

              <Link
                href={`https://www.tradingview.com/symbols/${stock.symbol}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>
            <p className="text-sm text-gray-400 line-clamp-1 mb-3">{stock.name}</p>


            {loading ? (
              <div className="h-12 bg-white/5 rounded-lg animate-pulse w-48" />
            ) : quote ? (
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  ${quote.c.toFixed(2)}
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-semibold ${quote.d >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                  {quote.d >= 0 ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                  <span>
                    {quote.d >= 0 ? '+' : ''}{quote.d.toFixed(2)} ({quote.dp >= 0 ? '+' : ''}{quote.dp.toFixed(2)}%)
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Price unavailable</p>
            )}
          </div>

          <button
            onClick={() => onRemove(stock.symbol)}
            className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        <div className="flex gap-2">
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">
            {stock.exchange}
          </span>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">
            {stock.type}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="pointer-events-none bg-black/20">
        <div ref={chartContainerRef} className="tradingview-widget-container" />
      </div>

      {/* Metrics */}
      <div className="p-5 border-t border-white/5 bg-black/20">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />)}
          </div>
        ) : metrics ? (
          <div className="grid grid-cols-2 gap-3">
            <MetricBox label="Market Cap" value={metrics.marketCapitalization ? formatNumber(metrics.marketCapitalization * 1e6) : 'N/A'} />
            <MetricBox label="P/E Ratio" value={metrics.peBasicExclExtraTTM?.toFixed(2) || 'N/A'} />
            <MetricBox label="52W High" value={metrics['52WeekHigh'] ? `$${metrics['52WeekHigh'].toFixed(2)}` : 'N/A'} />
            <MetricBox label="52W Low" value={metrics['52WeekLow'] ? `$${metrics['52WeekLow'].toFixed(2)}` : 'N/A'} />
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">Metrics unavailable</p>
        )}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/0 to-purple-500/0 group-hover:from-teal-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none -z-10" />
    </div>
  );
};

const MetricBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 hover:bg-white/[0.04] transition-colors">
    <p className="text-xs text-gray-500 mb-1.5">{label}</p>
    <p className="text-base font-semibold text-white">{value}</p>
  </div>
);

export default StockCard;