// app/stocks/[symbol]/page.tsx
import dynamic from 'next/dynamic'; 
import TradingViewWidget from "@/components/TradingViewWidget";

import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";

// ADD THESE 2 LINES
const LazyTradingViewWidget = dynamic(() => import('@/components/TradingViewWidget'))
const LazyWatchlistButton = dynamic(() => import('@/components/WatchlistButton'))

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col gap-6">
          {/* Keep first 2 widgets as-is for fast initial load */}
          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />
          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            height={600}
          />

          {/* Change 3rd widget to lazy version */}
          <LazyTradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={BASELINE_WIDGET_CONFIG(symbol)}
            height={600}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            {/* Change to lazy version */}
            <LazyWatchlistButton symbol={symbol.toUpperCase()} company={symbol.toUpperCase()} />
          </div>

          {/* Change all right-side widgets to lazy versions */}
          <LazyTradingViewWidget
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={400}
          />
          <LazyTradingViewWidget
            scriptUrl={`${scriptUrl}company-profile.js`}
            config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            height={440}
          />
          <LazyTradingViewWidget
            scriptUrl={`${scriptUrl}financials.js`}
            config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            height={464}
          />
        </div>
      </section>
    </div>
  );
}