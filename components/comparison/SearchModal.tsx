'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Stock } from '@/types/stocks';


interface FinnhubSearchResult {
  symbol: string;
  description?: string;
  displaySymbol?: string;
  type: string;
}

type Props = {
  onClose: () => void;
  onStockClick: (stock: Stock) => void;
  isStockSelected: (symbol: string) => boolean;
  selectedCount: number;
  apiKey: string;
};

const SearchModal = ({ onClose, onStockClick, isStockSelected, selectedCount, apiKey }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const searchStocks = async () => {
      const query = searchQuery.trim();
      
      if (!query) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      
      searchTimeoutRef.current = window.setTimeout(async () => {
        try {
          if (apiKey) {
            const response = await fetch(
              `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${apiKey}`
            );
            
            if (response.ok) {
              const data: { result?: FinnhubSearchResult[] } = await response.json();
              const results: Stock[] = data.result
                ?.filter((s: FinnhubSearchResult) => s.type === 'Common Stock' || s.type === 'ETP')
                .slice(0, 50)
                .map((s: FinnhubSearchResult) => ({
                  symbol: s.symbol,
                  name: s.description || s.symbol,
                  exchange: s.displaySymbol?.split(':')[0] || 'US',
                  type: s.type === 'ETP' ? 'ETF' : 'Stock'
                })) || [];
              
              setSearchResults(results);
            }
          }
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    };

    searchStocks();
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery, apiKey]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 z-50 animate-in fade-in duration-200" 
      onClick={onClose}
    >
      <div 
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl max-w-2xl w-full mt-20 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <input
              type="text"
              placeholder="Search any stock globally..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-500"
              autoFocus
            />
            <button 
              onClick={onClose} 
              className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{selectedCount}/3 stocks selected</span>
            {selectedCount === 3 && (
              <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">Maximum reached</span>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[500px] overflow-y-auto">
          {isSearching ? (
            <div className="p-12 text-center">
              <Loader2 className="inline-block w-8 h-8 animate-spin text-white mb-3" />
              <p className="text-sm text-gray-400">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-3 space-y-2">
              {searchResults.map(stock => {
                const selected = isStockSelected(stock.symbol);
                const canAdd = selectedCount < 3;
                
                return (
                  <button
                    key={stock.symbol}
                    onClick={() => !selected && canAdd && onStockClick(stock)}
                    disabled={selected || !canAdd}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selected 
                        ? 'bg-white/10 border border-white/20 cursor-default' 
                        : canAdd 
                        ? 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10' 
                        : 'opacity-40 cursor-not-allowed bg-white/[0.02] border border-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-white">{stock.symbol}</span>
                          <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-400">
                            {stock.exchange}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-1">{stock.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{stock.type}</p>
                      </div>
                      {selected && (
                        <span className="px-3 py-1 bg-white text-black rounded-lg text-xs font-medium flex-shrink-0">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : searchQuery ? (
            <div className="p-12 text-center">
              <p className="text-sm text-gray-500">No stocks found</p>
              <p className="text-xs text-gray-600 mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Start typing to search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;