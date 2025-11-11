// hooks/useWatchlist.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseWatchlistReturn {
  watchlist: string[];
  watchlistDetails: Array<{ symbol: string; company: string; addedAt: Date }>;
  isInWatchlist: (symbol: string) => boolean;
  toggleWatchlist: (symbol: string, company: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useWatchlist(): UseWatchlistReturn {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [watchlistDetails, setWatchlistDetails] = useState<Array<{ symbol: string; company: string; addedAt: Date }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch watchlist on mount
  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/watchlist');
      
      if (res.status === 401) {
        // User not authenticated
        setWatchlist([]);
        setWatchlistDetails([]);
        setError(null);
        setLoading(false);
        return;
      }
      
      if (!res.ok) {
        throw new Error('Failed to fetch watchlist');
      }
      
      const data = await res.json();
      setWatchlist(data.items || []);
      setWatchlistDetails(data.details || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const isInWatchlist = useCallback(
    (symbol: string) => {
      return watchlist.includes(symbol.toUpperCase());
    },
    [watchlist]
  );

  const toggleWatchlist = async (symbol: string, company: string) => {
    const upperSymbol = symbol.toUpperCase();
    const isCurrentlyInWatchlist = isInWatchlist(upperSymbol);
    const action = isCurrentlyInWatchlist ? 'remove' : 'add';

    // Optimistic update
    setWatchlist((prev) =>
      isCurrentlyInWatchlist
        ? prev.filter((s) => s !== upperSymbol)
        : [...prev, upperSymbol]
    );

    try {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: upperSymbol, company, action }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update watchlist');
      }

      const data = await res.json();
      
      // Sync with server response
      setWatchlist(data.items || []);
      setError(null);
      
      // Refresh full details
      await fetchWatchlist();
    } catch (err) {
      console.error('Error toggling watchlist:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Revert optimistic update on error
      setWatchlist((prev) =>
        isCurrentlyInWatchlist
          ? [...prev, upperSymbol]
          : prev.filter((s) => s !== upperSymbol)
      );
    }
  };

  return {
    watchlist,
    watchlistDetails,
    isInWatchlist,
    toggleWatchlist,
    loading,
    error,
  };
}