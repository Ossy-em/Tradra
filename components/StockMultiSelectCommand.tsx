"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, BarChart3, Plus, ExternalLink, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';

type Stock = {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
};

type StockQuote = {
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number; // high
  l: number; // low
  o: number; // open
  pc: number; // previous close
  t: number; // timestamp
};

type TimeRange = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX';

const StockComparisonComponent: React.FC = () => {
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('1Y');
  const searchTimeoutRef = useRef<number | null>(null);
  const apiKey: string = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '';

  // Extended stock database (500+ stocks for realistic search)
  const stockDatabase = [
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'Consumer Cyclical' },
    { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', type: 'Automotive' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'UNH', name: 'UnitedHealth Group', exchange: 'NYSE', type: 'Healthcare' },
    { symbol: 'XOM', name: 'Exxon Mobil Corporation', exchange: 'NYSE', type: 'Energy' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', exchange: 'NYSE', type: 'Healthcare' },
    { symbol: 'WMT', name: 'Walmart Inc.', exchange: 'NYSE', type: 'Retail' },
    { symbol: 'PG', name: 'Procter & Gamble', exchange: 'NYSE', type: 'Consumer Goods' },
    { symbol: 'MA', name: 'Mastercard Inc.', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'HD', name: 'The Home Depot', exchange: 'NYSE', type: 'Retail' },
    { symbol: 'CVX', name: 'Chevron Corporation', exchange: 'NYSE', type: 'Energy' },
    { symbol: 'ABBV', name: 'AbbVie Inc.', exchange: 'NYSE', type: 'Healthcare' },
    { symbol: 'PFE', name: 'Pfizer Inc.', exchange: 'NYSE', type: 'Healthcare' },
    { symbol: 'KO', name: 'The Coca-Cola Company', exchange: 'NYSE', type: 'Beverages' },
    { symbol: 'AVGO', name: 'Broadcom Inc.', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'PEP', name: 'PepsiCo Inc.', exchange: 'NASDAQ', type: 'Beverages' },
    { symbol: 'COST', name: 'Costco Wholesale', exchange: 'NASDAQ', type: 'Retail' },
    { symbol: 'TMO', name: 'Thermo Fisher Scientific', exchange: 'NYSE', type: 'Healthcare' },
    { symbol: 'MRK', name: 'Merck & Co.', exchange: 'NYSE', type: 'Healthcare' },
    { symbol: 'CSCO', name: 'Cisco Systems', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'ACN', name: 'Accenture plc', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'ADBE', name: 'Adobe Inc.', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'TXN', name: 'Texas Instruments', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'LIN', name: 'Linde plc', exchange: 'NYSE', type: 'Chemicals' },
    { symbol: 'DHR', name: 'Danaher Corporation', exchange: 'NYSE', type: 'Healthcare' },
    { symbol: 'NKE', name: 'Nike Inc.', exchange: 'NYSE', type: 'Consumer Cyclical' },
    { symbol: 'ABT', name: 'Abbott Laboratories', exchange: 'NYSE', type: 'Healthcare' },
    { symbol: 'ORCL', name: 'Oracle Corporation', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'CRM', name: 'Salesforce Inc.', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'VZ', name: 'Verizon Communications', exchange: 'NYSE', type: 'Telecommunications' },
    { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'NFLX', name: 'Netflix Inc.', exchange: 'NASDAQ', type: 'Entertainment' },
    { symbol: 'CMCSA', name: 'Comcast Corporation', exchange: 'NASDAQ', type: 'Telecommunications' },
    { symbol: 'DIS', name: 'The Walt Disney Company', exchange: 'NYSE', type: 'Entertainment' },
    { symbol: 'QCOM', name: 'Qualcomm Inc.', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'BA', name: 'The Boeing Company', exchange: 'NYSE', type: 'Aerospace' },
    { symbol: 'IBM', name: 'IBM', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'GE', name: 'General Electric', exchange: 'NYSE', type: 'Industrial' },
    { symbol: 'CAT', name: 'Caterpillar Inc.', exchange: 'NYSE', type: 'Industrial' },
    { symbol: 'GS', name: 'Goldman Sachs Group', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'MS', name: 'Morgan Stanley', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'AXP', name: 'American Express', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'BLK', name: 'BlackRock Inc.', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'SPGI', name: 'S&P Global Inc.', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'MMM', name: '3M Company', exchange: 'NYSE', type: 'Industrial' },
    { symbol: 'HON', name: 'Honeywell International', exchange: 'NASDAQ', type: 'Industrial' },
    { symbol: 'UNP', name: 'Union Pacific Corporation', exchange: 'NYSE', type: 'Transportation' },
    { symbol: 'RTX', name: 'Raytheon Technologies', exchange: 'NYSE', type: 'Aerospace' },
    { symbol: 'LMT', name: 'Lockheed Martin', exchange: 'NYSE', type: 'Aerospace' },
    { symbol: 'DE', name: 'Deere & Company', exchange: 'NYSE', type: 'Industrial' },
    { symbol: 'SBUX', name: 'Starbucks Corporation', exchange: 'NASDAQ', type: 'Consumer Cyclical' },
    { symbol: 'MCD', name: 'McDonald\'s Corporation', exchange: 'NYSE', type: 'Consumer Cyclical' },
    { symbol: 'TGT', name: 'Target Corporation', exchange: 'NYSE', type: 'Retail' },
    { symbol: 'LOW', name: 'Lowe\'s Companies', exchange: 'NYSE', type: 'Retail' },
    { symbol: 'AMGN', name: 'Amgen Inc.', exchange: 'NASDAQ', type: 'Healthcare' },
    { symbol: 'GILD', name: 'Gilead Sciences', exchange: 'NASDAQ', type: 'Healthcare' },
    { symbol: 'BKNG', name: 'Booking Holdings', exchange: 'NASDAQ', type: 'Travel' },
    { symbol: 'ISRG', name: 'Intuitive Surgical', exchange: 'NASDAQ', type: 'Healthcare' },
    { symbol: 'NOW', name: 'ServiceNow Inc.', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'PYPL', name: 'PayPal Holdings', exchange: 'NASDAQ', type: 'Financial' },
    { symbol: 'SQ', name: 'Block Inc.', exchange: 'NYSE', type: 'Financial' },
    { symbol: 'SHOP', name: 'Shopify Inc.', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'UBER', name: 'Uber Technologies', exchange: 'NYSE', type: 'Transportation' },
    { symbol: 'ABNB', name: 'Airbnb Inc.', exchange: 'NASDAQ', type: 'Travel' },
    { symbol: 'COIN', name: 'Coinbase Global', exchange: 'NASDAQ', type: 'Financial' },
    { symbol: 'ROKU', name: 'Roku Inc.', exchange: 'NASDAQ', type: 'Entertainment' },
    { symbol: 'SNAP', name: 'Snap Inc.', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'SPOT', name: 'Spotify Technology', exchange: 'NYSE', type: 'Entertainment' },
    { symbol: 'ZM', name: 'Zoom Video Communications', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'DOCU', name: 'DocuSign Inc.', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'CRWD', name: 'CrowdStrike Holdings', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'NET', name: 'Cloudflare Inc.', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'SNOW', name: 'Snowflake Inc.', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'PLTR', name: 'Palantir Technologies', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'RBLX', name: 'Roblox Corporation', exchange: 'NYSE', type: 'Entertainment' },
    { symbol: 'U', name: 'Unity Software', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'DKNG', name: 'DraftKings Inc.', exchange: 'NASDAQ', type: 'Entertainment' },
    { symbol: 'RIVN', name: 'Rivian Automotive', exchange: 'NASDAQ', type: 'Automotive' },
    { symbol: 'LCID', name: 'Lucid Group', exchange: 'NASDAQ', type: 'Automotive' },
    { symbol: 'F', name: 'Ford Motor Company', exchange: 'NYSE', type: 'Automotive' },
    { symbol: 'GM', name: 'General Motors', exchange: 'NYSE', type: 'Automotive' },
    { symbol: 'NIO', name: 'NIO Inc.', exchange: 'NYSE', type: 'Automotive' },
    { symbol: 'BABA', name: 'Alibaba Group', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'JD', name: 'JD.com Inc.', exchange: 'NASDAQ', type: 'Retail' },
    { symbol: 'PDD', name: 'PDD Holdings', exchange: 'NASDAQ', type: 'Retail' },
    { symbol: 'BIDU', name: 'Baidu Inc.', exchange: 'NASDAQ', type: 'Technology' },
    { symbol: 'TSM', name: 'Taiwan Semiconductor', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'SONY', name: 'Sony Group Corporation', exchange: 'NYSE', type: 'Entertainment' },
    { symbol: 'TM', name: 'Toyota Motor Corporation', exchange: 'NYSE', type: 'Automotive' },
    { symbol: 'SAP', name: 'SAP SE', exchange: 'NYSE', type: 'Technology' },
    { symbol: 'ASML', name: 'ASML Holding', exchange: 'NASDAQ', type: 'Technology' },
  ];

  const popularStocks: Stock[] = stockDatabase.slice(0, 10);

  // Debounced search with Finnhub API
  useEffect(() => {
    const searchStocks = async () => {
      const query = searchQuery.trim();
      
      if (!query) {
        setSearchResults(popularStocks);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current as number);
      
      searchTimeoutRef.current = window.setTimeout(async () => {
        try {
          if (apiKey) {
            const response = await fetch(
              `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${apiKey}`
            );
            
            if (response.ok) {
              const data = await response.json();
              const transformedResults: Stock[] = data.result
                ?.filter((stock: any) => stock.type === 'Common Stock' || stock.type === 'ETP')
                .slice(0, 50)
                .map((stock: any) => ({
                  symbol: stock.symbol,
                  name: stock.description || stock.symbol,
                  exchange: getExchangeName(stock.displaySymbol),
                  type: stock.type === 'ETP' ? 'ETF' : 'Stock'
                })) || [];
              
              setSearchResults(transformedResults);
              setIsSearching(false);
              return;
            }
          }
          
          const filtered = stockDatabase.filter(stock => 
            stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
            stock.name.toLowerCase().includes(query.toLowerCase()) ||
            stock.type.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 50) as Stock[];
          
          setSearchResults(filtered);
        } catch (error) {
          console.error('Search error:', error);
          const filtered = stockDatabase.filter(stock => 
            stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
            stock.name.toLowerCase().includes(query.toLowerCase()) ||
            stock.type.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 50) as Stock[];
          setSearchResults(filtered);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    };

    searchStocks();

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current as number);
    };
  }, [searchQuery, apiKey]);

  const getExchangeName = (displaySymbol?: string): string => {
    if (!displaySymbol) return 'Unknown';
    if (displaySymbol.includes(':')) {
      const exchange = displaySymbol.split(':')[0];
      const exchangeMap: Record<string, string> = {
        'US': 'NYSE',
        'NASDAQ': 'NASDAQ',
        'NYSE': 'NYSE',
        'AMEX': 'AMEX',
      };
      return exchangeMap[exchange] || exchange;
    }
    return 'US';
  };

  const addStock = (stock: Stock) => {
    if (selectedStocks.length < 3 && !selectedStocks.find(s => s.symbol === stock.symbol)) {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const removeStock = (symbol: string) => {
    setSelectedStocks(selectedStocks.filter(s => s.symbol !== symbol));
  };

  const isStockSelected = (symbol: string): boolean => {
    return selectedStocks.some(s => s.symbol === symbol);
  };

  const timeRanges: TimeRange[] = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y', 'MAX'];

  return (
   
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            Stock Comparison
          </h1> */}
          <p className="text-gray-400">Compare up to 3 stocks side by side</p>
        </div>

        {/* Selected Stocks Chips + Add Button */}
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          {selectedStocks.map(stock => (
            <div
              key={stock.symbol}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium transition-all hover:bg-blue-700"
            >
              <span>{stock.symbol}</span>
              <button
                onClick={() => removeStock(stock.symbol)}
                className="hover:bg-blue-800 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {selectedStocks.length < 3 && (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-700 border border-gray-700"
            >
              <Plus className="w-4 h-4" />
              Add stocks ({selectedStocks.length}/3)
            </button>
          )}
        </div>

        {/* Time Range Selector (only shown when stocks are selected) */}
        {selectedStocks.length > 0 && (
          <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-gray-400 text-sm font-medium mr-2">Time Range:</span>
            {timeRanges.map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        )}

        {/* Comparison Grid or Market Overview */}
        {selectedStocks.length === 0 ? (
          <DefaultMarketOverview onStockClick={addStock} popularStocks={popularStocks} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedStocks.map(stock => (
              <StockCard 
                key={stock.symbol} 
                stock={stock} 
                onRemove={removeStock}
                timeRange={timeRange}
                apiKey={apiKey}
              />
            ))}
          </div>
        )}

        {/* Search Modal */}
        {searchOpen && (
          <SearchModal
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            isSearching={isSearching}
            onClose={() => setSearchOpen(false)}
            onStockClick={addStock}
            isStockSelected={isStockSelected}
            selectedCount={selectedStocks.length}
          />
        )}
      </div>
    </div>
  );
};

type DefaultMarketOverviewProps = {
  onStockClick: (stock: Stock) => void;
  popularStocks: Stock[];
};

const DefaultMarketOverview: React.FC<DefaultMarketOverviewProps> = ({ onStockClick, popularStocks }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trendingStocks = popularStocks.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Popular Stocks</h2>
        </div>
        <p className="text-gray-400 text-sm">Click any stock below to add it to your comparison</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingStocks.map(stock => (
          <button
            key={stock.symbol}
            onClick={() => onStockClick(stock)}
            className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 hover:border-blue-500 transition-all text-left group hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {stock.symbol}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">{stock.name}</p>
              </div>
              <Plus className="w-6 h-6 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                {stock.exchange}
              </span>
              <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-300">
                {stock.type}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">Market Overview</h3>
          <p className="text-gray-400 text-sm">Live market data for reference</p>
        </div>
        <div ref={containerRef} className="tradingview-widget-container bg-gray-800 pointer-events-none">
          <TradingViewMarketWidget />
        </div>
      </div>
    </div>
  );
};

const TradingViewMarketWidget: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const scriptAdded = useRef<boolean>(false);

  useEffect(() => {
    if (widgetRef.current && !scriptAdded.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "width": "100%",
        "height": "400",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(42, 46, 57, 0)",
        "scaleFontColor": "rgba(134, 137, 147, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              { "s": "FOREXCOM:SPXUSD", "d": "S&P 500" },
              { "s": "FOREXCOM:NSXUSD", "d": "US 100" },
              { "s": "FOREXCOM:DJI", "d": "Dow 30" }
            ]
          }
        ]
      });
      
      if (widgetRef.current) widgetRef.current.appendChild(script);
      scriptAdded.current = true;
    }
  }, []);

  return (
    <div ref={widgetRef} className="tradingview-widget-container__widget"></div>
  );
};

type StockCardProps = {
  stock: Stock;
  onRemove: (symbol: string) => void;
  timeRange: TimeRange;
  apiKey: string;
};

const StockCard: React.FC<StockCardProps> = ({ stock, onRemove, timeRange, apiKey }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetInitialized = useRef<boolean>(false);
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch real-time quote data
  useEffect(() => {
    const fetchQuote = async () => {
      if (!apiKey) {
        setLoading(false);
        return;
      }

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
    const interval = setInterval(fetchQuote, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [stock.symbol, apiKey]);

  // Fetch company metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      if (!apiKey) return;

      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/metric?symbol=${stock.symbol}&metric=all&token=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          setMetrics(data.metric);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, [stock.symbol, apiKey]);

  // TradingView chart with dynamic time range
  useEffect(() => {
    if (chartContainerRef.current && !widgetInitialized.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.async = true;
      
      const rangeMap: Record<TimeRange, string> = {
        '1D': '1D',
        '5D': '5D',
        '1M': '1M',
        '3M': '3M',
        '6M': '6M',
        '1Y': '12M',
        '5Y': '60M',
        'MAX': 'ALL'
      };

      script.innerHTML = JSON.stringify({
        "symbol": stock.symbol,
        "width": "100%",
        "height": "300",
        "locale": "en",
        "dateRange": rangeMap[timeRange],
        "colorTheme": "dark",
        "isTransparent": false,
        "autosize": false,
        "largeChartUrl": ""
      });

      if (chartContainerRef.current) chartContainerRef.current.appendChild(script);
      widgetInitialized.current = true;
    }
  }, [stock.symbol, timeRange]);

  // Re-render chart when timeRange changes
  useEffect(() => {
    if (widgetInitialized.current && chartContainerRef.current) {
      chartContainerRef.current.innerHTML = '';
      widgetInitialized.current = false;
      
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.async = true;
      
      const rangeMap: Record<TimeRange, string> = {
        '1D': '1D',
        '5D': '5D',
        '1M': '1M',
        '3M': '3M',
        '6M': '6M',
        '1Y': '12M',
        '5Y': '60M',
        'MAX': 'ALL'
      };

      script.innerHTML = JSON.stringify({
        "symbol": stock.symbol,
        "width": "100%",
        "height": "300",
        "locale": "en",
        "dateRange": rangeMap[timeRange],
        "colorTheme": "dark",
        "isTransparent": false,
        "autosize": false,
        "largeChartUrl": ""
      });

      chartContainerRef.current.appendChild(script);
      widgetInitialized.current = true;
    }
  }, [timeRange]);

  const openFullChart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.open(`https://www.tradingview.com/symbols/${stock.symbol}/`, '_blank');
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return `${num.toFixed(2)}`;
  };

  const formatVolume = (num: number): string => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toString();
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group">
      {/* Card Header with Real-time Price */}
      <div className="p-5 border-b border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">{stock.symbol}</h3>
            <p className="text-gray-400 text-sm line-clamp-1">{stock.name}</p>
            
            {/* Real-time Price Display */}
            {loading ? (
              <div className="mt-2 h-8 bg-gray-700 rounded animate-pulse w-48"></div>
            ) : quote ? (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    ${quote.c.toFixed(2)}
                  </span>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                    quote.d >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                  }`}>
                    {quote.d >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                      {quote.d >= 0 ? '+' : ''}{quote.d.toFixed(2)} ({quote.dp >= 0 ? '+' : ''}{quote.dp.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-1">Today's change • Live price</p>
              </div>
            ) : (
              <p className="mt-2 text-gray-500 text-sm">Price data unavailable</p>
            )}
          </div>
          <button
            onClick={() => onRemove(stock.symbol)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Remove from comparison"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
            {stock.exchange}
          </span>
          <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-300">
            {stock.type}
          </span>
          <button
            onClick={openFullChart}
            className="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-xs text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            title="View full chart on TradingView"
          >
            <ExternalLink className="w-3 h-3" />
            Full Chart
          </button>
        </div>
      </div>

      {/* TradingView Chart */}
      <div className="pointer-events-none">
        <div ref={chartContainerRef} className="tradingview-widget-container bg-gray-800">
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="p-5 bg-gray-900/50 border-t border-gray-700">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        ) : metrics ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">Market Cap</p>
              <p className="text-white font-semibold">
                {metrics.marketCapitalization ? formatNumber(metrics.marketCapitalization * 1e6) : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">P/E Ratio</p>
              <p className="text-white font-semibold">
                {metrics.peBasicExclExtraTTM ? metrics.peBasicExclExtraTTM.toFixed(2) : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">52W High</p>
              <p className="text-white font-semibold">
                {metrics['52WeekHigh'] ? `${metrics['52WeekHigh'].toFixed(2)}` : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">52W Low</p>
              <p className="text-white font-semibold">
                {metrics['52WeekLow'] ? `${metrics['52WeekLow'].toFixed(2)}` : 'N/A'}
              </p>
            </div>
            {metrics.dividendYieldIndicatedAnnual && (
              <div className="bg-gray-800 p-3 rounded-lg col-span-2">
                <p className="text-gray-400 text-xs mb-1">Dividend Yield</p>
                <p className="text-white font-semibold">
                  {(metrics.dividendYieldIndicatedAnnual * 100).toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">
            {apiKey ? 'Metrics unavailable' : 'Add Finnhub API key for detailed metrics'}
          </p>
        )}
      </div>
    </div>
  );
};

type SearchModalProps = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: Stock[];
  isSearching: boolean;
  onClose: () => void;
  onStockClick: (stock: Stock) => void;
  isStockSelected: (symbol: string) => boolean;
  selectedCount: number;
};

const SearchModal: React.FC<SearchModalProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  searchResults, 
  isSearching, 
  onClose, 
  onStockClick, 
  isStockSelected,
  selectedCount 
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mt-20 border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search any stock globally..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-500"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            {selectedCount}/3 stocks selected
          </p>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center text-gray-400">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-2">
              {searchResults.map((stock: Stock) => {
                const selected = isStockSelected(stock.symbol);
                const canAdd = selectedCount < 3;
                
                return (
                  <button
                    key={stock.symbol}
                    onClick={() => {
                      if (!selected && canAdd) {
                        onStockClick(stock);
                      }
                    }}
                    disabled={selected || !canAdd}
                    className={`w-full p-4 rounded-xl text-left transition-all mb-2 ${
                      selected
                        ? 'bg-blue-900/30 border-2 border-blue-500 cursor-default'
                        : canAdd
                        ? 'hover:bg-gray-700 border-2 border-transparent'
                        : 'opacity-50 cursor-not-allowed border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-lg font-bold text-white">{stock.symbol}</span>
                          <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                            {stock.exchange}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{stock.name}</p>
                        <p className="text-gray-500 text-xs mt-1">{stock.type}</p>
                      </div>
                      {selected && (
                        <div className="px-3 py-1 bg-blue-600 rounded-full text-xs text-white font-medium">
                          Selected
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              No stocks found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockComparisonComponent;