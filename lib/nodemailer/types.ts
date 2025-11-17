

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface BaseEmailData {
  to: string;
}

export interface WelcomeEmailData extends BaseEmailData {
  name: string;
  intro?: string;
}

export interface WatchlistSummaryData extends BaseEmailData {
  name: string;
  date: string;
  stocks: Array<{
    symbol: string;
    company: string;
    price: string; 
    change: string; 
    changePercent: string;
    isPositive: boolean;
    
  }>;
  totalPortfolioValue?: number;
}

export interface NewsSummaryData extends BaseEmailData {
  name: string;
  date: string; 
  newsContent: string; 
}

export interface StockAlertData extends BaseEmailData {
  name: string;
  symbol: string;
  stockName: string;
  alertType: "upper" | "lower";
  triggerPrice: number;
  currentPrice: number;
}

export interface VolumeAlertData extends BaseEmailData {
  name: string;
  symbol: string;
  stockName: string;
  volume: number;
  averageVolume: number;
  percentIncrease: number;
}

export interface InactiveUserData extends BaseEmailData {
  name: string;
  lastLoginDate: string;
  daysInactive: number;
}

export type EmailType = 
  | "welcome"
  | "watchlist-summary"
  | "news-summary"
  | "stock-alert"
  | "volume-alert"
  | "inactive-user";


export type EmailDataMap = {
  "welcome": WelcomeEmailData;
  "watchlist-summary": WatchlistSummaryData;
  "news-summary": NewsSummaryData;
  "stock-alert": StockAlertData;
  "volume-alert": VolumeAlertData;
  "inactive-user": InactiveUserData;
};

export interface SendEmailParams<T extends EmailType> {
  type: T;
  to: string;
  data: Omit<EmailDataMap[T], "to">;
}