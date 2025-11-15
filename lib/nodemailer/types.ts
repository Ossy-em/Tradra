

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
}

export interface WatchlistSummaryData extends BaseEmailData {
  name: string;
  stocks: Array<{
    symbol: string;
    name: string;
    currentPrice: number;
    change: number;
    changePercent: number;
  }>;
  totalPortfolioValue?: number;
}

export interface NewsSummaryData extends BaseEmailData {
  name: string;
  articles: Array<{
    title: string;
    summary: string;
    url: string;
    source: string;
    publishedAt: string;
  }>;
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