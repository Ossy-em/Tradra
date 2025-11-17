// lib/watchlist-context.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import useSWR, { mutate } from 'swr';

interface WatchlistContextValue {
  watchlist: string[];
  watchlistDetails: Array<{ symbol: string; company: string; addedAt: Date }>;
  isInWatchlist: (symbol: string) => boolean;
  toggleWatchlist: (symbol: string, company: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

const fetcher = (url: string) => fetch(url).then(async (res) => {
  if (res.status === 401) return { items: [], details: [] };
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
});

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { data, error, isLoading } = useSWR('/api/watchlist', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // Cache for 1 minute
  });

  const watchlist = data?.items || [];
  const watchlistDetails = data?.details || [];

  const isInWatchlist = (symbol: string) => {
    return watchlist.includes(symbol.toUpperCase());
  };

  const toggleWatchlist = async (symbol: string, company: string) => {
    const upperSymbol = symbol.toUpperCase();
    const isCurrentlyIn = isInWatchlist(upperSymbol);
    const action = isCurrentlyIn ? 'remove' : 'add';

    // Optimistic update
mutate(
  '/api/watchlist',
  {
    items: isCurrentlyIn
      ? watchlist.filter((s: string) => s !== upperSymbol)
      : [...watchlist, upperSymbol],
    details: watchlistDetails,
  },
  false
);

    try {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: upperSymbol, company, action }),
      });

      if (!res.ok) throw new Error('Failed to update');

      // Revalidate from server
      mutate('/api/watchlist');
    } catch (err) {
      // Revert on error
      mutate('/api/watchlist');
      throw err;
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        watchlistDetails,
        isInWatchlist,
        toggleWatchlist,
        loading: isLoading,
        error: error?.message || null,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error('useWatchlist must be used within WatchlistProvider');
  return context;
}