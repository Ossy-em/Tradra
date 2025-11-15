'use client';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import StockCard from '@/components/comparison/StockCard';
import SearchModal from '@/components/comparison/SearchModal';
import MarketOverview from '@/components/comparison/MarketOverview';
import TimeRangeSelector from '@/components/comparison/TimeRangeSelector';
import { Stock, TimeRange } from '@/types/stocks';

const StockComparison = () => {
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('1Y');
  
  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '';

  const addStock = (stock: Stock) => {
    if (selectedStocks.length < 3 && !selectedStocks.find(s => s.symbol === stock.symbol)) {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const removeStock = (symbol: string) => {
    setSelectedStocks(selectedStocks.filter(s => s.symbol !== symbol));
  };

  const isStockSelected = (symbol: string) => {
    return selectedStocks.some(s => s.symbol === symbol);
  };

  return (
    <div className="container py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <p className="text-gray-400 text-base">Compare up to 3 stocks side by side</p>
      </div>

      {/* Selected Stocks Chips */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        {selectedStocks.map(stock => (
          <div
            key={stock.symbol}
            className="flex items-center gap-2 bg-teal-400 text-gray-900 px-4 py-2 rounded-full font-medium"
          >
            <span>{stock.symbol}</span>
            <button
              onClick={() => removeStock(stock.symbol)}
              className="hover:bg-teal-600 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {selectedStocks.length < 3 && (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 bg-gray-800 text-gray-400 px-4 py-2 rounded-full font-medium hover:bg-gray-700 border border-gray-600"
          >
            <Plus className="w-4 h-4" />
            Add stocks ({selectedStocks.length}/3)
          </button>
        )}
      </div>

      {/* Time Range Selector */}
      {selectedStocks.length > 0 && (
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      )}

      {/* Comparison Grid or Market Overview */}
      {selectedStocks.length === 0 ? (
        <MarketOverview onStockClick={addStock} />
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
          onClose={() => setSearchOpen(false)}
          onStockClick={addStock}
          isStockSelected={isStockSelected}
          selectedCount={selectedStocks.length}
          apiKey={apiKey}
        />
      )}
    </div>
  );
};

export default StockComparison;