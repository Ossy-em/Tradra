// components/WatchlistButton.tsx
'use client';

import { Star } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useState } from 'react';

interface WatchlistButtonProps {
  symbol: string;
  company: string; // Now required
  className?: string;
  showLabel?: boolean;
  onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
}

export default function WatchlistButton({
  symbol,
  company,
  className = '',
  showLabel = false,
  onWatchlistChange,
}: WatchlistButtonProps) {
  const { isInWatchlist, toggleWatchlist, loading } = useWatchlist();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isAdded = isInWatchlist(symbol);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click handlers
    
    setIsAnimating(true);
    await toggleWatchlist(symbol, company);
    
    // Callback for parent components
    if (onWatchlistChange) {
      onWatchlistChange(symbol, !isAdded);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-lg
        transition-all duration-200
        ${isAdded 
          ? 'bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${isAnimating ? 'scale-110' : 'scale-100'}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label={isAdded ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
    >
      <Star
        className={`w-4 h-4 transition-all ${
          isAdded ? 'fill-current' : ''
        }`}
      />
      {showLabel && (
        <span className="text-sm font-medium">
          {isAdded ? 'Watching' : 'Watch'}
        </span>
      )}
    </button>
  );
}