export interface StockWithWatchlistStatus {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  inWatchlist?: boolean; // optional depending on your app context
}
