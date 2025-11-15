import { Model } from 'mongoose';
import type { WatchlistItem } from './watchlist.model';

let WatchlistModel: Model<WatchlistItem> | null = null;

export async function getWatchlistModel(): Promise<Model<WatchlistItem>> {
  if (WatchlistModel) return WatchlistModel;

  const { Watchlist } = await import('./watchlist.model');
  WatchlistModel = Watchlist;
  return WatchlistModel;
}