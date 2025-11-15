'use server';

import { connectToDatabase } from '@/database/mongoose';
import { getWatchlistModel } from '@/database/models';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const Watchlist = await getWatchlistModel(); // Lazy load
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function getWatchlistByEmail(email: string): Promise<Array<{ symbol: string; company: string; addedAt: Date }>> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const Watchlist = await getWatchlistModel(); // Lazy load
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();
    return items.map((i) => ({
      symbol: String(i.symbol),
      company: String(i.company),
      addedAt: i.addedAt,
    }));
  } catch (err) {
    console.error('getWatchlistByEmail error:', err);
    return [];
  }
}

export async function addToWatchlist(email: string, symbol: string, company: string): Promise<{ success: boolean; message: string }> {
  if (!email || !symbol || !company) {
    return { success: false, message: 'Missing required fields' };
  }

  try {
    const mongoose = await connectToDatabase();
    const Watchlist = await getWatchlistModel(); // Lazy load
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) {
      return { success: false, message: 'Invalid user ID' };
    }

    const existing = await Watchlist.findOne({ userId, symbol: symbol.toUpperCase() });
    if (existing) {
      return { success: false, message: 'Already in watchlist' };
    }

    await Watchlist.create({
      userId,
      symbol: symbol.toUpperCase(),
      company,
      addedAt: new Date(),
    });

    return { success: true, message: 'Added to watchlist' };
  } catch (err) {
    console.error('addToWatchlist error:', err);
    return { success: false, message: 'Failed to add to watchlist' };
  }
}

export async function removeFromWatchlist(email: string, symbol: string): Promise<{ success: boolean; message: string }> {
  if (!email || !symbol) {
    return { success: false, message: 'Missing required fields' };
  }

  try {
    const mongoose = await connectToDatabase();
    const Watchlist = await getWatchlistModel(); // Lazy load
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) {
      return { success: false, message: 'Invalid user ID' };
    }

    await Watchlist.deleteOne({ userId, symbol: symbol.toUpperCase() });

    return { success: true, message: 'Removed from watchlist' };
  } catch (err) {
    console.error('removeFromWatchlist error:', err);
    return { success: false, message: 'Failed to remove from watchlist' };
  }
}

export async function isInWatchlist(email: string, symbol: string): Promise<boolean> {
  if (!email || !symbol) return false;

  try {
    const mongoose = await connectToDatabase();
    const Watchlist = await getWatchlistModel(); // Lazy load
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) return false;

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return false;

    const exists = await Watchlist.exists({ userId, symbol: symbol.toUpperCase() });
    return Boolean(exists);
  } catch (err) {
    console.error('isInWatchlist error:', err);
    return false;
  }
}